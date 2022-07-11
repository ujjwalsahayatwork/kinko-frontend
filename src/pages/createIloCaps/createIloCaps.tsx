/* eslint-disable */
import BigNumber from 'bignumber.js';
import { IRouterProps, IWeb3Props } from 'components/types';
import { loadState, saveState, withRouter, withWeb3 } from 'components/utils';
import {
	maxLiquidityRatePercent,
	maxListingRatePercent,
	minLiquidityRatePercent,
	minListingRatePercent,
} from 'constants/constants';
import { CreateIloCapsView } from 'pages/createIloCaps/createIloCapsView';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	updateHardcap,
	updateLiquidityRatePercent,
	updateListingRatePercent,
	updateMaxSpendPerBuyer,
	updateSoftcap,
} from 'store/createIlo/actions';
import { addError } from 'store/error/actions';
import { updateShowConnectModal } from 'store/ethereum/actions';
import { IDispatch, IRootState } from 'store/store';

interface ICreateIloCapsProps extends IRouterProps, IWeb3Props {
	isCloseUpdateShowConnectModal: boolean;
	showConnectModal: boolean;
	saleTokenAddress: string;
	saleTokenSymbol: string;
	baseTokenAddress: string;
	baseTokenSymbol: string;
	baseTokenDecimals: number;
	tokenFeePercent: number;
	presaleAmount: BigNumber;
	updateShowConnectModal: (showConnectModal: boolean) => void;
	updateSoftcap: (softcap: BigNumber) => void;
	updateHardcap: (hardcap: BigNumber) => void;
	updateLiquidityRatePercent: (liquidityRatePercent: number) => void;
	updateListingRatePercent: (listingRagePercent: number) => void;
	updateMaxSpendPerBuyer: (maxSpendPerBuyer: BigNumber) => void;

	addError: (error: unknown) => void;
}

interface ICreateIloCapsState {
	softcap: string;
	softcapIssue: string;
	tokenPrice: string;
	tokenPriceIssue: string;
	hardcap: BigNumber;
	liquidityRatePercent: number;
	listingRatePercent: number;
	listingRateAmount: BigNumber;
	presaleRateAmount: BigNumber;
	additionalSaleTokenAmount: BigNumber;
	maxSpendPerBuyer: string;
	maxSpendPerBuyerIssue: string;
}

class CreateIloCaps extends Component<ICreateIloCapsProps, ICreateIloCapsState> {
	constructor(props: ICreateIloCapsProps) {
		super(props);
		this.state = loadState<ICreateIloCapsState>(props.location.key, (state) => {
			if (state) {
				const { listingRateAmount, presaleRateAmount, additionalSaleTokenAmount, hardcap } = state;
				return {
					...state,
					listingRateAmount: new BigNumber(listingRateAmount ?? 0),
					presaleRateAmount: new BigNumber(presaleRateAmount ?? 0),
					additionalSaleTokenAmount: new BigNumber(additionalSaleTokenAmount ?? 0),
					hardcap: new BigNumber(hardcap ?? 0),
				};
			}
			return {
				softcap: '',
				softcapIssue: '',
				tokenPrice: '',
				tokenPriceIssue: '',
				hardcap: new BigNumber(0),
				hardcapIssue: '',
				liquidityRatePercent: 25,
				listingRatePercent: 0,
				listingRateAmount: new BigNumber(0),
				presaleRateAmount: new BigNumber(0),
				additionalSaleTokenAmount: new BigNumber(0),
				maxSpendPerBuyer: '',
				maxSpendPerBuyerIssue: '',
			};
		});
	}

	async componentDidMount() {
		this.updatePresaleRateAmount();
		this.updateListingRateAmount();
		await this.updateAdditionalSaleTokenAmount();
	}

	async componentDidUpdate(prevProps: ICreateIloCapsProps, prevState: ICreateIloCapsState) {
		const {
			location,
			presaleAmount,
			web3: { active },
			showConnectModal,
			tokenFeePercent,
			isCloseUpdateShowConnectModal,
		} = this.props;
		const { hardcap, presaleRateAmount, listingRatePercent, liquidityRatePercent, tokenPrice } = this.state;
		if (prevState !== this.state) {
			saveState(location.key, this.state, (state) => {
				const { listingRateAmount, presaleRateAmount, additionalSaleTokenAmount, hardcap } = state;
				return {
					...state,
					listingRateAmount: listingRateAmount.toString(),
					presaleRateAmount: presaleRateAmount.toString(),
					additionalSaleTokenAmount: additionalSaleTokenAmount.toString(),
					hardcap: hardcap.toString(),
				};
			});
		}
		if (!active && !showConnectModal && !isCloseUpdateShowConnectModal) {
			this.props.updateShowConnectModal(true);
		}


		if (prevState.tokenPrice !== tokenPrice) {
			this.updateHardcap();
		}
		if (!prevProps.presaleAmount.eq(presaleAmount) || !prevState.hardcap.eq(hardcap)) {
			this.updatePresaleRateAmount();
		}
		if (!prevState.presaleRateAmount.eq(presaleRateAmount) || prevState.listingRatePercent !== listingRatePercent) {
			this.updateListingRateAmount();
		}
		if (
			!prevProps.presaleAmount.eq(presaleAmount) ||
			prevProps.tokenFeePercent !== tokenFeePercent ||
			prevState.listingRatePercent !== listingRatePercent ||
			prevState.liquidityRatePercent !== liquidityRatePercent ||
			!prevState.hardcap.eq(hardcap)
		) {
			await this.updateAdditionalSaleTokenAmount();
		}
	}

	updateHardcap = () => {
		const { presaleAmount, baseTokenDecimals } = this.props;
		const { tokenPrice } = this.state;
		let hardcap = new BigNumber(0);
		try {
			const numberedTokenPrice = new BigNumber(tokenPrice)
				.times(new BigNumber(10).pow(baseTokenDecimals))
				.integerValue(BigNumber.ROUND_DOWN)
				.div(new BigNumber(10).pow(baseTokenDecimals));
			if (numberedTokenPrice.isFinite()) {
				hardcap = presaleAmount.times(numberedTokenPrice);
			}
		} finally {
			this.setState({ hardcap });
		}
	};

	updatePresaleRateAmount = () => {
		const { presaleAmount } = this.props;
		const { hardcap } = this.state;
		let presaleRateAmount = presaleAmount.div(hardcap);
		if (!presaleRateAmount.isFinite()) {
			presaleRateAmount = new BigNumber(0);
		}
		this.setState({ presaleRateAmount });
	};

	updateListingRateAmount = () => {
		const { presaleRateAmount, listingRatePercent } = this.state;
		const listingRateAmount = presaleRateAmount.div(100).times(100 - listingRatePercent);
		this.setState({ listingRateAmount });
	};

	updateAdditionalSaleTokenAmount = async () => {
		const { presaleAmount, tokenFeePercent } = this.props;
		const { listingRatePercent, liquidityRatePercent, hardcap } = this.state;
		let additionalSaleTokenAmount = new BigNumber(0);
		try {
			const numberedHardcap = new BigNumber(hardcap);
			if (numberedHardcap.isFinite()) {
				additionalSaleTokenAmount = presaleAmount.times(tokenFeePercent / 100).plus(
					presaleAmount
						.times((100 - listingRatePercent) / 100)
						.times(liquidityRatePercent / 100)
						.times((100 - tokenFeePercent) / 100)
				);
			}
		} finally {
			this.setState({ additionalSaleTokenAmount });
		}
	};

	checkFields = (): boolean => {
		const { softcap, tokenPrice, maxSpendPerBuyer, hardcap } = this.state;
		let softcapIssue = '';
		let tokenPriceIssue = '';
		let maxSpendPerBuyerIssue = '';

		// Checks if softcap is valid
		if (!softcap) {
			softcapIssue = 'Please fill out';
		} else {
			const numberedSoftcap = new BigNumber(softcap);
			if (!numberedSoftcap.isFinite()) {
				softcapIssue = 'Invalid value';
			} else if (!numberedSoftcap.gt(0)) {
				softcapIssue = 'Must be greater than zero';
			}
		}

		// Checks if tokenPrice is valid
		if (!tokenPrice) {
			tokenPriceIssue = 'Please fill out';
		} else {
			const numberedTokenPrice = new BigNumber(tokenPrice);
			if (!numberedTokenPrice.isFinite()) {
				tokenPriceIssue = 'Invalid value';
			} else if (!numberedTokenPrice.gt(0)) {
				tokenPriceIssue = 'Must be greater than zero';
			}
		}

		// Checks softcap and hardcap relations
		if (!softcapIssue && !tokenPriceIssue) {
			const numberedSoftcap = new BigNumber(softcap);
			if (hardcap.lt(numberedSoftcap)) {
				tokenPriceIssue = 'Resulting hardcap must be greater or equal softcap';
			}
		}

		// Checks if maxSpendPerBuyer is valid
		if (!maxSpendPerBuyer) {
			maxSpendPerBuyerIssue = 'Please fill out';
		} else {
			const numberedMaxSpendPerBuyer = new BigNumber(maxSpendPerBuyer);
			if (!numberedMaxSpendPerBuyer.isFinite()) {
				maxSpendPerBuyerIssue = 'Invalid value';
			} else if (!numberedMaxSpendPerBuyer.gt(0)) {
				maxSpendPerBuyerIssue = 'Must be greater than zero';
			} else if (numberedMaxSpendPerBuyer.gt(hardcap)) {
				maxSpendPerBuyerIssue = 'Must be lower or equal to hardcap';
			}
		}

		this.setState({ softcapIssue, tokenPriceIssue, maxSpendPerBuyerIssue });
		return !(softcapIssue || tokenPriceIssue || maxSpendPerBuyerIssue);
	};

	handleChangeSoftcap = (softcap: string) => {
		this.setState({ softcap });
	};

	handleChangeTokenPrice = (tokenPrice: string) => {
		this.setState({ tokenPrice });
	};

	handleChangeLiquidityRatePercent = (liquidityRatePercent: number) => {
		this.setState({ liquidityRatePercent });
	};

	handleDecLiquidityRatePercent = () => {
		const { liquidityRatePercent } = this.state;
		this.setState({ liquidityRatePercent: Math.max(liquidityRatePercent - 1, minLiquidityRatePercent) });
	};

	handleIncLiquidityRatePercent = () => {
		const { liquidityRatePercent } = this.state;
		this.setState({ liquidityRatePercent: Math.min(liquidityRatePercent + 1, maxLiquidityRatePercent) });
	};

	handleChangeListingRatePercent = (listingRate: number) => {
		this.setState({ listingRatePercent: listingRate });
	};

	handleDecListingRatePercent = () => {
		const { listingRatePercent } = this.state;
		this.setState({ listingRatePercent: Math.max(listingRatePercent - 1, minListingRatePercent) });
	};

	handleIncListingRatePercent = () => {
		const { listingRatePercent } = this.state;
		this.setState({ listingRatePercent: Math.min(listingRatePercent + 1, maxListingRatePercent) });
	};

	handleChangeMaxSpendPerBuyer = (maxSpendPerBuyer: string) => {
		this.setState({ maxSpendPerBuyer });
	};

	handleMaxSpendPerBuyer = () => {
		const { hardcap } = this.state;
		this.setState({ maxSpendPerBuyer: hardcap.toString() });
	};

	handleSubmit = () => {
		const { softcap, hardcap, liquidityRatePercent, listingRatePercent, maxSpendPerBuyer } = this.state;
		if (this.checkFields() && hardcap.gt(0)) {
			this.props.updateSoftcap(new BigNumber(softcap));
			this.props.updateHardcap(hardcap);
			this.props.updateLiquidityRatePercent(liquidityRatePercent);
			this.props.updateListingRatePercent(listingRatePercent);
			this.props.updateMaxSpendPerBuyer(new BigNumber(maxSpendPerBuyer));
			this.props.navigate('/createIloPeriod');
		}
		// this.props.navigate('/createIloPeriod');
	};

	render() {
		const { saleTokenSymbol, baseTokenSymbol } = this.props;
		const {
			softcap,
			softcapIssue,
			tokenPrice,
			tokenPriceIssue,
			hardcap,
			liquidityRatePercent,
			presaleRateAmount,
			listingRatePercent,
			listingRateAmount,
			additionalSaleTokenAmount,
			maxSpendPerBuyer,
			maxSpendPerBuyerIssue,
		} = this.state;
		return (
			<CreateIloCapsView
				saleTokenSymbol={saleTokenSymbol}
				baseTokenSymbol={baseTokenSymbol}
				softcap={softcap}
				softcapIssue={softcapIssue}
				tokenPrice={tokenPrice}
				tokenPriceIssue={tokenPriceIssue}
				hardcap={hardcap}
				minLiquidityRatePercent={minLiquidityRatePercent}
				maxLiquidityRatePercent={maxLiquidityRatePercent}
				liquidityRatePercent={liquidityRatePercent}
				presaleRate={presaleRateAmount}
				minListingRatePercent={minListingRatePercent}
				maxListingRatePercent={maxListingRatePercent}
				listingRatePercent={listingRatePercent}
				listingRateAmount={listingRateAmount}
				additionalTokenAmount={additionalSaleTokenAmount}
				maxSpendPerBuyer={maxSpendPerBuyer}
				maxSpendPerBuyerIssue={maxSpendPerBuyerIssue}
				onChangeSoftcap={this.handleChangeSoftcap}
				onChangeTokenPrice={this.handleChangeTokenPrice}
				onChangeLiquidityRatePercent={this.handleChangeLiquidityRatePercent}
				onDecLiquidityRatePercent={this.handleDecLiquidityRatePercent}
				onIncLiquidityRatePercent={this.handleIncLiquidityRatePercent}
				onChangeListingRatePercent={this.handleChangeListingRatePercent}
				onDecListingRatePercent={this.handleDecListingRatePercent}
				onIncListingRatePercent={this.handleIncListingRatePercent}
				onChangeMaxSpendPerBuyer={this.handleChangeMaxSpendPerBuyer}
				onMaxSpendPerBuyer={this.handleMaxSpendPerBuyer}
				onSubmit={this.handleSubmit}
			/>
		);
	}
}

const mapStateToProps = ({ ethereum, createIlo }: IRootState) => ({
	isCloseUpdateShowConnectModal: ethereum.isCloseUpdateShowConnectModal,
	showConnectModal: ethereum.showConnectModal,
	saleTokenAddress: createIlo.saleTokenAddress,
	saleTokenSymbol: createIlo.saleTokenSymbol,
	baseTokenAddress: createIlo.baseTokenAddress,
	baseTokenDecimals: createIlo.baseTokenDecimals,
	tokenFeePercent: createIlo.tokenFeePercent,
	presaleAmount: createIlo.presaleAmount,
	baseTokenSymbol: createIlo.baseTokenSymbol,
});

const mapDispatchToProps = (dispatch: IDispatch) => ({
	updateShowConnectModal: (showConnectModal: boolean) => dispatch(updateShowConnectModal(showConnectModal)),
	updateSoftcap: (softcap: BigNumber) => dispatch(updateSoftcap(softcap)),
	updateHardcap: (hardcap: BigNumber) => dispatch(updateHardcap(hardcap)),
	updateLiquidityRatePercent: (liquidityRatePercent: number) =>
		dispatch(updateLiquidityRatePercent(liquidityRatePercent)),
	updateListingRatePercent: (listingRagePercent: number) => dispatch(updateListingRatePercent(listingRagePercent)),
	updateMaxSpendPerBuyer: (maxSpendPerBuyer: BigNumber) => dispatch(updateMaxSpendPerBuyer(maxSpendPerBuyer)),
	addError: (error: unknown) => dispatch(addError(error)),
});

const createIloCaps = connect(mapStateToProps, mapDispatchToProps)(withRouter(withWeb3(CreateIloCaps)));

export { createIloCaps as CreateIloCaps };
