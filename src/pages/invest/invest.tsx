/* eslint-disable */
import BigNumber from 'bignumber.js';
import { IRouterProps, IWeb3Props } from 'components/types';
import { loadState, saveState, withRouter, withWeb3 } from 'components/utils';
import { InvestView, IPercentage } from 'pages/invest/investView';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addError } from 'store/error/actions';
import { updateShowConnectModal } from 'store/ethereum/actions';
import { IDispatch, IRootState } from 'store/store';
import { updateShowLoadingModal } from 'store/utils/actions';
import { IIlo } from 'types';
import { getIlo, referBaseUrl } from 'utils/api';
import { getBuyer, getLaunchpadInformation, userDeposit } from 'utils/launchpad';
import { approveERC20, getBalance, getERC20Balance, sleep } from 'utils/utils';
import Web3 from 'web3';

interface IInvestProps extends IRouterProps<'launchpadAddress'>, IWeb3Props {
	isCloseUpdateShowConnectModal: boolean;
	showConnectModal: boolean;
	updateShowConnectModal: (showConnectModal: boolean) => void;
	updateShowLoadingModal: (showLoadingModal: boolean) => void;
	addError: (error: unknown) => void;
	iloReferral: any;
}

interface IInvestState {
	ilo: IIlo | undefined;
	investAmount: string;
	baseTokenBalance: BigNumber;
	maxSpendableBaseToken: BigNumber;
	earlyAccessTokenBalance: BigNumber;
	saleTokenAmount: BigNumber;
	selectedPercentage: IPercentage | undefined;
	accepted: boolean;
	approved: boolean;
}

class Invest extends Component<IInvestProps, IInvestState> {
	constructor(props: IInvestProps) {
		super(props);
		this.state = loadState<IInvestState>(props.location.key, (state) => {
			if (state) {
				const { baseTokenBalance, earlyAccessTokenBalance, saleTokenAmount, maxSpendableBaseToken } = state;

				return {
					...state,
					ilo: undefined,
					baseTokenBalance: new BigNumber(baseTokenBalance ?? 0),
					earlyAccessTokenBalance: new BigNumber(earlyAccessTokenBalance ?? 0),
					saleTokenAmount: new BigNumber(saleTokenAmount ?? 0),
					maxSpendableBaseToken: new BigNumber(maxSpendableBaseToken ?? 0),
				};
			}
			return {
				ilo: undefined,
				investAmount: '',
				baseTokenBalance: new BigNumber(0),
				maxSpendableBaseToken: new BigNumber(0),
				earlyAccessTokenBalance: new BigNumber(0),
				saleTokenAmount: new BigNumber(0),
				selectedPercentage: undefined,
				accepted: false,
				approved: false,
			};
		});
	}

	async componentDidMount() {
		const { params } = this.props;
		if (params.launchpadAddress) {
			const ilo = await getIlo(params.launchpadAddress);
			this.setState({ ilo });
		}
	}

	async componentDidUpdate(prevProps: IInvestProps, prevState: IInvestState) {
		const {
			location,
			web3,
			web3: { active },
			showConnectModal,
			isCloseUpdateShowConnectModal,
		} = this.props;
		const { investAmount, ilo, baseTokenBalance, maxSpendableBaseToken } = this.state;
		if (prevState !== this.state) {
			saveState(location.key, this.state, (state) => {
				const { baseTokenBalance, earlyAccessTokenBalance, saleTokenAmount, maxSpendableBaseToken } = state;
				return {
					...state,
					ilo: undefined,
					baseTokenBalance: baseTokenBalance.toString(),
					earlyAccessTokenBalance: earlyAccessTokenBalance.toString(),
					saleTokenAmount: saleTokenAmount.toString(),
					maxSpendableBaseToken: maxSpendableBaseToken.toString(),
				};
			});
		}
		if (!active && !showConnectModal && !isCloseUpdateShowConnectModal) {
			this.props.updateShowConnectModal(true);
		}
		if (prevProps.web3 !== web3 || prevState.ilo !== ilo) {
			await this.updateBalances();
		}
		if (prevProps.web3 !== web3 || !prevState.baseTokenBalance.eq(baseTokenBalance) || prevState.ilo !== ilo) {
			await this.updateMaxSpendableBaseToken();
		}
		if (prevState.investAmount !== investAmount || !prevState.maxSpendableBaseToken.eq(maxSpendableBaseToken)) {
			this.updateSaleTokenAmount();
		}
	}

	updateBalances = async () => {
		const {
			web3: { library, account },
		} = this.props;

		const { ilo } = this.state;
		let baseTokenBalance = new BigNumber(0);
		let earlyAccessTokenBalance = new BigNumber(0);

		console.log('ilo', ilo);
		try {
			if (library && account && ilo) {
				const web3 = new Web3(library);
				const launchpadInfo = await getLaunchpadInformation(web3, ilo.launchpadAddress);

				const { baseTokenAddress, earlyAccessTokenAddress, isBnb } = ilo;
				console.log('object', launchpadInfo.launchpadinfo.isBnb);

				baseTokenBalance = launchpadInfo.launchpadinfo.isBNB
					? await getBalance(web3, account)
					: await getERC20Balance(web3, account, baseTokenAddress);
				// if (earlyAccessTokenAddress) {
				// 	earlyAccessTokenBalance = await getERC20Balance(web3, account, earlyAccessTokenAddress);
				// }
			}
		} finally {
			this.setState({ baseTokenBalance, earlyAccessTokenBalance });
		}
	};

	updateMaxSpendableBaseToken = async () => {
		const {
			web3: { library, account },
		} = this.props;
		const { baseTokenBalance, earlyAccessTokenBalance, ilo } = this.state;
		let maxSpendableBaseToken = new BigNumber(0);
		try {
			if (library && account && ilo) {
				const {
					launchpadAddress,
					saleTokenAddress,
					baseTokenAddress,
					maxSpendPerBuyer,
					hardcap,
					totalBaseCollected,
					earlyAccessTokenAmount,
				} = ilo;
				// if (earlyAccessTokenBalance.gte(earlyAccessTokenAmount)) {
				const web3 = new Web3(library);
				const { baseDeposited } = await getBuyer(web3, account, launchpadAddress, saleTokenAddress, baseTokenAddress);
				const maxSpend = maxSpendPerBuyer.minus(baseDeposited);
				const maxTotalSpend = hardcap.minus(totalBaseCollected);
				maxSpendableBaseToken = baseTokenBalance;
				if (maxSpend.lt(maxSpendableBaseToken)) {
					maxSpendableBaseToken = maxSpend;
				}
				if (maxTotalSpend.lt(maxSpendableBaseToken)) {
					maxSpendableBaseToken = maxTotalSpend;
				}
			}
			// }
		} finally {
			this.setState({ maxSpendableBaseToken });
		}
	};

	updateSaleTokenAmount = () => {
		const { ilo, investAmount, maxSpendableBaseToken } = this.state;
		const amount = new BigNumber(investAmount);
		let saleTokenAmount = new BigNumber(0);
		try {
			if (ilo && amount.isFinite() && amount.lte(maxSpendableBaseToken)) {
				const { presaleAmount, hardcap } = ilo;

				saleTokenAmount = presaleAmount.div(hardcap).times(amount);
			}
		} finally {
			this.setState({ saleTokenAmount });
		}
	};

	handleChangeInvestAmount = (investAmount: string) => {
		this.setState({ investAmount, selectedPercentage: undefined });
	};

	handleMaxSpendableBaseToken = () => {
		const { maxSpendableBaseToken } = this.state;
		this.setState({ investAmount: maxSpendableBaseToken.toString(), selectedPercentage: undefined });
	};

	handleSelectPercentage = (percentage: IPercentage) => {
		const { maxSpendableBaseToken } = this.state;
		const investAmount = maxSpendableBaseToken.div(100).times(percentage).toString();
		this.setState({ selectedPercentage: percentage, investAmount });
	};

	handleAccpept = () => {
		this.setState({ accepted: true });
	};

	handleApprove = async () => {
		const {
			web3: { library, account },
		} = this.props;
		const { ilo, investAmount, accepted } = this.state;
		const amount = new BigNumber(investAmount);
		if (library && account && ilo && amount.isFinite() && accepted) {
			const { baseTokenAddress, launchpadAddress } = ilo;
			const web3 = new Web3(library);
			try {
				this.props.updateShowLoadingModal(true);
				await approveERC20(web3, baseTokenAddress, account, launchpadAddress, amount);
			} finally {
				this.props.updateShowLoadingModal(false);
			}
			this.setState({ approved: true });
		}
	};

	handleSubmit = async () => {
		const {
			web3: { library, account },
			params,
		} = this.props;
		const { accepted, approved, ilo, investAmount, saleTokenAmount } = this.state;
		console.log('saletoeknAmount', saleTokenAmount.gt(0));

		if (ilo && saleTokenAmount) {

			const { launchpadAddress, baseTokenAddress, isBnb } = ilo;

			const amount = new BigNumber(investAmount);
			if (accepted && (isBnb || approved) && library && account && amount.isFinite()) {
				const web3 = new Web3(library);
				try {
					this.props.updateShowLoadingModal(true);
					if(this.props.iloReferral.length > 0 ){

						const referralAddress: string[]= this.props.iloReferral.map((item: any)=> item.referral_address)
						const referralSign: string[]= this.props.iloReferral.map((item: any)=> item.referral_sign)
						

						await userDeposit(web3, account, launchpadAddress, baseTokenAddress, isBnb, amount,referralAddress,referralSign);
					}
					await sleep(1000);
				} finally {
					this.props.updateShowLoadingModal(false);
				}
				this.props.navigate(`/ilo/${params.launchpadAddress}`);
			}
		}
	};

	render() {
		const { ilo, investAmount, saleTokenAmount, selectedPercentage, accepted, approved, maxSpendableBaseToken } =
			this.state;

			console.log("this.props.iloReferral invest:: ", this.props.iloReferral)
		if (!ilo) {
			return null;
		}
		const { iloName, baseTokenSymbol, saleTokenSymbol, isBnb } = ilo;

		return (
			<InvestView
				iloName={iloName}
				investAmount={investAmount}
				baseTokenSymbol={baseTokenSymbol}
				maxSpendableBaseToken={maxSpendableBaseToken}
				saleTokenAmount={saleTokenAmount}
				saleTokenSymbol={saleTokenSymbol}
				selectedPercentage={selectedPercentage}
				isBnb={isBnb}
				accepted={accepted}
				approved={approved}
				onChangeInvestAmount={this.handleChangeInvestAmount}
				onMaxSpendableBaseToken={this.handleMaxSpendableBaseToken}
				onSelectPercentage={this.handleSelectPercentage}
				onAccept={this.handleAccpept}
				onApprove={this.handleApprove}
				onSubmit={this.handleSubmit}
			/>
		);
	}
}

const mapStateToProps = ({ ethereum, createIlo }: IRootState) => ({
	showConnectModal: ethereum.showConnectModal,
	isCloseUpdateShowConnectModal: ethereum.isCloseUpdateShowConnectModal,
	iloReferral: createIlo.iloReferral,
});

const mapDispatchToProps = (dispatch: IDispatch) => ({
	updateShowConnectModal: (showConnectModal: boolean) => dispatch(updateShowConnectModal(showConnectModal)),
	updateShowLoadingModal: (showLoadingModal: boolean) => dispatch(updateShowLoadingModal(showLoadingModal)),
	addError: (error: unknown) => dispatch(addError(error)),
});

const invest = connect(mapStateToProps, mapDispatchToProps)(withRouter<'launchpadAddress'>(withWeb3(Invest)));

export { invest as Invest };
