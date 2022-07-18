/* eslint-disable */
import BigNumber from 'bignumber.js';
import { IRouterProps, IWeb3Props } from 'components/types';
import { loadState, saveState, withRouter, withWeb3 } from 'components/utils';
import { CreateIloSummaryView } from 'pages/createIloSummary/createIloSummaryView';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSaleTokenTotalRequired } from 'store/createIlo/actions';
import { addError } from 'store/error/actions';
import { updateShowConnectModal } from 'store/ethereum/actions';
import { IDispatch, IRootState } from 'store/store';
import { getDEVCreationFee } from 'utils/launchpadSettings';
import { getBalance } from 'utils/utils';
import Web3 from 'web3';

interface ICreateIloSummaryProps extends IRouterProps, IWeb3Props {
	isCloseUpdateShowConnectModal: boolean;
	showConnectModal: boolean;
	saleTokenSymbol: string;
	saleTokenTotalSupply: BigNumber;
	tokenFeePercent: number;
	presaleAmount: BigNumber;
	liquidityRatePercent: number;
	listingRatePercent: number;
	saleTokenTotalRequired: BigNumber;
	saleTokenAddress: string;
	baseTokenAddress: string;
	hardcap: BigNumber;
	updateShowConnectModal: (showConnectModal: boolean) => void;
	updateSaleTokenTotalRequired: (saleTokenTotalRequired: BigNumber) => void;
	addError: (error: unknown) => void;
}

interface ICreateIloSummaryState {
	saleTokenTotalRequired: BigNumber;
	liquidityAmount: BigNumber;
	feesAmount: BigNumber;
	presalePercent: number;
	liquidityPercent: number;
	feesPercent: number;
	freePercent: number;
	showDEVIssue: boolean;
}

class CreateIloSummary extends Component<ICreateIloSummaryProps, ICreateIloSummaryState> {
	constructor(props: ICreateIloSummaryProps) {
		super(props);
		const { presaleAmount, saleTokenTotalSupply } = props;
		this.state = loadState<ICreateIloSummaryState>(props.location.key, (state) => {
			if (state) {
				const { saleTokenTotalRequired, liquidityAmount, feesAmount } = state;
				return {
					...state,
					saleTokenTotalRequired: new BigNumber(saleTokenTotalRequired ?? 0),
					liquidityAmount: new BigNumber(liquidityAmount ?? 0),
					feesAmount: new BigNumber(feesAmount ?? 0),
				};
			}
			return {
				saleTokenTotalRequired: new BigNumber(0),
				presaleWithoutFeesAmount: new BigNumber(0),
				liquidityAmount: new BigNumber(0),
				feesAmount: new BigNumber(0),
				presalePercent: presaleAmount.div(saleTokenTotalSupply).times(100).toNumber(),
				liquidityPercent: 0,
				feesPercent: 0,
				freePercent: 0,
				showDEVIssue: false,
			};
		});
	}

	async componentDidMount() {
		this.updateLiquidity();
		this.updateFees();
		this.updateFreePercent();
		await this.updateSaleTokenTotalRequired();
		await this.updateDEVWarning();
	}

	async componentDidUpdate(prevProps: ICreateIloSummaryProps, prevState: ICreateIloSummaryState) {
		const {
			web3,
			web3: { active },
			isCloseUpdateShowConnectModal,
			showConnectModal,
			location,
			saleTokenTotalSupply,
			presaleAmount,
			tokenFeePercent,
			listingRatePercent,
			liquidityRatePercent,
		} = this.props;
		const { liquidityPercent, feesPercent, liquidityAmount, feesAmount } = this.state;
		if (prevState !== this.state) {
			saveState(location.key, this.state, (state) => {
				const { saleTokenTotalRequired, liquidityAmount, feesAmount } = state;
				return {
					...state,
					saleTokenTotalRequired: saleTokenTotalRequired.toString(),
					liquidityAmount: liquidityAmount.toString(),
					feesAmount: feesAmount.toString(),
				};
			});
		}
		if (!active && !showConnectModal && !isCloseUpdateShowConnectModal) {
			this.props.updateShowConnectModal(true);
		}
		if (
			!prevProps.saleTokenTotalSupply.eq(saleTokenTotalSupply) ||
			prevProps.tokenFeePercent !== tokenFeePercent ||
			!prevProps.presaleAmount.eq(presaleAmount) ||
			prevProps.listingRatePercent !== listingRatePercent ||
			prevProps.liquidityRatePercent !== liquidityRatePercent
		) {
			this.updateLiquidity();
		}
		if (
			!prevProps.saleTokenTotalSupply.eq(saleTokenTotalSupply) ||
			prevProps.tokenFeePercent !== tokenFeePercent ||
			!prevProps.presaleAmount.eq(presaleAmount)
		) {
			this.updateFees();
		}
		if (prevState.liquidityPercent !== liquidityPercent || prevState.feesPercent !== feesPercent) {
			this.updateFreePercent();
		}
		if (!prevState.liquidityAmount.eq(liquidityAmount) || !prevState.feesAmount.eq(feesAmount)) {
			await this.updateSaleTokenTotalRequired();
		}
		if (prevProps.web3 !== web3) {
			await this.updateDEVWarning();
		}
	}

	updateLiquidity = () => {
		const { saleTokenTotalSupply, tokenFeePercent, presaleAmount, listingRatePercent, liquidityRatePercent } =
			this.props;
		const liquidityAmount = presaleAmount
			.times((100 - tokenFeePercent) / 100)
			.times((100 - listingRatePercent) / 100)
			.times(liquidityRatePercent / 100);
		const liquidityPercent = new BigNumber(100).div(saleTokenTotalSupply).times(liquidityAmount).toNumber();
		this.setState({ liquidityAmount, liquidityPercent });
	};

	updateFees = () => {
		const { tokenFeePercent, saleTokenTotalSupply, presaleAmount } = this.props;
		const feesAmount = presaleAmount.times(tokenFeePercent / 100);
		const feesPercent = feesAmount.div(saleTokenTotalSupply).times(100).toNumber();
		this.setState({ feesAmount, feesPercent });
	};

	updateFreePercent = () => {
		// const { saleTokenTotalSupply, presaleAmount } = this.props;
		// const { liquidityPercent, feesPercent } = this.state;
		// const presalePercent = presaleAmount.div(saleTokenTotalSupply).times(100).toNumber();
		// const freePercent = 100 - presalePercent - liquidityPercent - feesPercent;
		// this.setState({ freePercent });
	};

	updateSaleTokenTotalRequired = async () => {
		const {
			web3: { library },
			presaleAmount,
		} = this.props;
		const { liquidityAmount, feesAmount } = this.state;
		if (library) {
			const saleTokenTotalRequired = presaleAmount.plus(liquidityAmount).plus(feesAmount);
			this.setState({ saleTokenTotalRequired });
		}
	};

	updateDEVWarning = async () => {
		const {
			web3: { library, account },
		} = this.props;
		let showDEVIssue = true;
		if (library && account) {
			const web3 = new Web3(library);
			const balance = await getBalance(web3, account);
			const creationFee = await getDEVCreationFee(web3);
			if (balance.isGreaterThanOrEqualTo(creationFee)) {
				showDEVIssue = false;
			}
		}
		this.setState({ showDEVIssue });
	};

	handleSubmit = () => {
		const { saleTokenTotalRequired, showDEVIssue } = this.state;
		if (!showDEVIssue && saleTokenTotalRequired.gt(0)) {
			this.props.updateSaleTokenTotalRequired(saleTokenTotalRequired);
					this.props.navigate('/createIloSocials');
		}
		// this.props.navigate('/createIloSocials');
	};

	render() {
		const { saleTokenSymbol, presaleAmount } = this.props;
		const {
			presalePercent,
			liquidityPercent,
			feesPercent,
			freePercent,
			saleTokenTotalRequired,
			liquidityAmount,
			feesAmount,
			showDEVIssue,
		} = this.state;

		return (
			<CreateIloSummaryView
				saleTokenSymbol={saleTokenSymbol}
				presalePercent={presalePercent}
				liquidityPercent={liquidityPercent}
				feesPercent={feesPercent}
				freePercent={freePercent}
				saleTokenTotalRequired={saleTokenTotalRequired}
				presaleAmount={presaleAmount}
				liquidityAmount={liquidityAmount}
				feesAmount={feesAmount}
				showDEVIssue={showDEVIssue}
				onSubmit={this.handleSubmit}
			/>
		);
	}
}

const mapStateToProps = ({ ethereum, createIlo }: IRootState) => ({
	isCloseUpdateShowConnectModal: ethereum.isCloseUpdateShowConnectModal,
	showConnectModal: ethereum.showConnectModal,
	saleTokenSymbol: createIlo.saleTokenSymbol,
	saleTokenTotalSupply: createIlo.saleTokenTotalSupply,
	tokenFeePercent: createIlo.tokenFeePercent,
	presaleAmount: createIlo.presaleAmount,
	liquidityRatePercent: createIlo.liquidityRatePercent,
	listingRatePercent: createIlo.listingRatePercent,
	saleTokenTotalRequired: createIlo.saleTokenTotalRequired,
	saleTokenAddress: createIlo.saleTokenAddress,
	baseTokenAddress: createIlo.baseTokenAddress,
	hardcap: createIlo.hardcap,
});

const mapDispatchToProps = (dispatch: IDispatch) => ({
	updateShowConnectModal: (showConnectModal: boolean) => dispatch(updateShowConnectModal(showConnectModal)),
	updateSaleTokenTotalRequired: (saleTokenTotalRequired: BigNumber) =>
		dispatch(updateSaleTokenTotalRequired(saleTokenTotalRequired)),
	addError: (error: unknown) => dispatch(addError(error)),
});

const createIloSummary = connect(mapStateToProps, mapDispatchToProps)(withRouter(withWeb3(CreateIloSummary)));

export { createIloSummary as CreateIloSummary };
