/* eslint-disable */
import BigNumber from 'bignumber.js';
import { IRouterProps, IWeb3Props } from 'components/types';
import { loadState, saveState, withRouter, withWeb3 } from 'components/utils';
import { baseTokenOptions } from 'constants/constants';
import { CreateIloGeneralView } from 'pages/createIloGeneral/createIloGeneralView';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	updateBaseToken,
	updateIloName,
	updatePresaleAmount,
	updatePresaleCreator,
	updateSaleToken,
	updateTokenFee,
	updateIloCategory,
} from 'store/createIlo/actions';
import { addError } from 'store/error/actions';
import { updateShowConnectModal } from 'store/ethereum/actions';
import { IDispatch, IRootState } from 'store/store';
import { IBaseToken } from 'types';
import { isIloNameAvailable, isSaleTokenAvailable } from 'utils/api';
import { getTokenFeePercent } from 'utils/launchpadSettings';
import { getPair } from 'utils/fundexFactory';
import {
	getBaseTokenAddress,
	getERC20Balance,
	getERC20Name,
	getERC20Symbol,
	getERC20TotalSupply,
	isZeroAddress,
} from 'utils/utils';
import Web3 from 'web3';

interface ICreateIloGeneralProps extends IRouterProps, IWeb3Props {
	isCloseUpdateShowConnectModal: boolean;
	showConnectModal: boolean;
	updateShowConnectModal: (showConnectModal: boolean) => void;
	updateIloName: (iloName: string) => void;
	updateIloCategory: (category: string) => void;
	updateSaleToken: (saleTokenAddress: string, saleTokenSymbol: string, saleTokenTotalSupply: BigNumber) => void;
	updateBaseToken: (baseToken: IBaseToken) => void;
	updateTokenFee: (tokenFeePercent: number) => void;
	updatePresaleCreator: (presaleCreator: string) => void;
	updatePresaleAmount: (presaleAmount: BigNumber) => void;
	addError: (error: unknown) => void;
}

interface ICreateIloGeneralState {
	iloName: string;
	category: string;
	iloNameIssue: string;
	saleTokenAddress: string;
	saleTokenAddressIssue: string;
	saleTokenName: string;
	saleTokenSymbol: string;
	saleTokenTotalSupply: BigNumber | undefined;
	selectedBaseToken: string;
	baseToken: IBaseToken;
	baseTokenName: string;
	presaleCreator: string;
	presaleAmount: string;
	showWarning: boolean;
	counter: number;
	isLoading: boolean;
}

class CreateIloGeneral extends Component<ICreateIloGeneralProps, ICreateIloGeneralState> {
	constructor(props: ICreateIloGeneralProps) {
		super(props);
		this.state = loadState<ICreateIloGeneralState>(props.location.key, (state) => {
			if (state) {
				const { saleTokenTotalSupply } = state;
				return {
					...state,
					saleTokenTotalSupply: saleTokenTotalSupply ? new BigNumber(saleTokenTotalSupply) : undefined,
					presaleCreator: props.web3.account ?? '',
				};
			}
			return {
				iloName: '',
				category: '',
				iloNameIssue: '',
				saleTokenAddress: '',
				saleTokenAddressIssue: '',
				saleTokenName: '',
				saleTokenSymbol: '',
				saleTokenTotalSupply: undefined,
				selectedBaseToken: baseTokenOptions[0].key,
				baseToken: baseTokenOptions[0].payload,
				baseTokenName: baseTokenOptions[0].label,
				presaleCreator: props.web3.account ?? '',
				presaleAmount: '',
				showWarning: false,
				counter: 1,
				isLoading: false,
			};
		});
	}

	async componentDidMount() {
		this.updatePresaleCreator();
		await this.updateSaleToken();
		await this.updateWarning();
	}

	async componentDidUpdate(prevProps: ICreateIloGeneralProps, prevState: ICreateIloGeneralState) {
		const {
			location,
			web3,
			web3: { account, active },
			showConnectModal,
			isCloseUpdateShowConnectModal,
		} = this.props;
		const {
			web3: { library },
		} = this.props;

		const web_3 = new Web3(library);
		const chainId = await web_3.eth.getChainId();
		const selectedBaseToken = baseTokenOptions[0].key;
		const baseTokenName = baseTokenOptions[0].label;
		this.setState({
			selectedBaseToken,
			baseTokenName,
		});

		const { saleTokenAddress, presaleAmount } = this.state;
		if (prevState !== this.state) {
			saveState(location.key, this.state, (state) => {
				const { saleTokenTotalSupply } = state;
				return {
					...state,
					saleTokenTotalSupply: saleTokenTotalSupply ? saleTokenTotalSupply.toString() : undefined,
				};
			});
		}
		if (!active && !showConnectModal && !isCloseUpdateShowConnectModal) {
			this.props.updateShowConnectModal(true);
		}
		if (prevProps.web3.account !== account) {
			this.updatePresaleCreator();
		}
		if (
			prevProps.web3 !== web3 ||
			prevState.saleTokenAddress !== saleTokenAddress ||
			prevState.presaleAmount !== presaleAmount
		) {
			await this.updateSaleToken();
			await this.updateWarning();
		}
	}

	updatePresaleCreator = () => {
		const {
			web3: { account },
		} = this.props;
		this.setState({ presaleCreator: account ?? '' });
	};

	updateSaleToken = async () => {
		try {
			const {
				web3: { library, account },
			} = this.props;
			const { saleTokenAddress } = this.state;
			if (library && account && saleTokenAddress.match(/^0x[0-9A-Fa-f]{40}$/gm)) {
				const web3 = new Web3(library);
				const saleTokenName = await getERC20Name(web3, saleTokenAddress);
				const saleTokenSymbol = await getERC20Symbol(web3, saleTokenAddress);
				const saleTokenTotalSupply = await getERC20TotalSupply(web3, saleTokenAddress);
				this.setState({ saleTokenName, saleTokenSymbol, saleTokenTotalSupply });
			} else {
				this.setState({ saleTokenName: '', saleTokenSymbol: '', saleTokenTotalSupply: undefined });
			}
		} catch (e) {
			const { saleTokenName: tokenLabel } = this.state;
			if (tokenLabel) {
				this.setState({ saleTokenName: '', saleTokenSymbol: '', saleTokenTotalSupply: undefined });
			}
		}
	};

	updateWarning = async (): Promise<boolean> => {
		let showWarning = false;
		try {
			const {
				web3: { library, account },
			} = this.props;
			const { saleTokenAddress, presaleAmount } = this.state;
			if (presaleAmount) {
				const amount = new BigNumber(presaleAmount);
				// if (!amount.isFinite() || amount.isLessThan(10000))
				if (!amount.isFinite() || amount.isLessThan(10)) {
					showWarning = true;
				}
			}
			if (!showWarning && library && account && saleTokenAddress.match(/^0x[0-9A-Fa-f]{40}$/gm)) {
				const web3 = new Web3(library);
				const balance = await getERC20Balance(web3, account, saleTokenAddress);
				if (balance.isLessThan(new BigNumber(presaleAmount))) {
					showWarning = true;
				}
			}
		} catch (e) {
			showWarning = true;
		}
		this.setState({ showWarning });
		return showWarning;
	};

	checkFields = async (): Promise<boolean> => {
		const {
			web3: { library },
		} = this.props;
		const { iloName, saleTokenAddress, baseToken } = this.state;
		let iloNameIssue = '';
		let saleTokenAddressIssue = '';
		if (iloName?.length > 20) {
			iloNameIssue = 'Max length is 20';
		} else if (!(await isIloNameAvailable(iloName))) {
			iloNameIssue = 'ILO Name is already in use';
		}
		if (!saleTokenAddress.match(/^0x[0-9A-Fa-f]{40}$/gm)) {
			saleTokenAddressIssue = 'Invalid address';
		} else if (library && saleTokenAddress && baseToken) {
			const baseTokenAddress = getBaseTokenAddress(baseToken);
			const web3 = new Web3(library);
			const chainId = await web3.eth.getChainId();

			// if(chainId === ETHEREUM_CHAIN_ID){

			const pairAddress = await getPair(web3, saleTokenAddress, baseTokenAddress);
			if (!isZeroAddress(pairAddress)) {
				saleTokenAddressIssue = 'Pair does already exist';
			}
			// }
			// else{
			// 	const pairAddress = await getPairBsc(web3, saleTokenAddress, baseTokenAddress);
			// 	if (!isZeroAddress(pairAddress)) {
			// 		saleTokenAddressIssue = 'Pair does already exist';
			// 	}
			// }
		}
		if (!saleTokenAddressIssue && !(await isSaleTokenAvailable(saleTokenAddress))) {
			saleTokenAddressIssue = 'ILO with this token does already exist';
		}
		this.setState({ iloNameIssue, saleTokenAddressIssue });
		return !(iloNameIssue || saleTokenAddressIssue);
	};

	handleChangeIloName = (iloName: string) => {
		this.setState({ iloName });
	};

	handleSetIloCategory = (category: string) => {
		this.setState({ category });
	};

	handleChangeSaleTokenAddress = (saleTokenAddress: string) => {
		this.setState({ saleTokenAddress });
	};

	handleChangeBaseToken = (selectedBaseToken: string, baseToken: IBaseToken) => {
		const option = baseTokenOptions.find((el) => el.key === selectedBaseToken);

		if (option) {
			this.setState({ baseTokenName: option.label });
		}
		this.setState({ selectedBaseToken, baseToken });
	};

	handleChangePresaleAmount = (presaleAmount: string) => {
		this.setState({ presaleAmount });
	};

	handleSubmit = async () => {
		const {
			web3: { library },
		} = this.props;
		const {
			iloName,
			category,
			saleTokenAddress,
			saleTokenSymbol,
			saleTokenTotalSupply,
			baseToken,
			presaleCreator,
			presaleAmount,
		} = this.state;

		this.setState({ isLoading: true });
		if ((await this.checkFields()) && library) {
			const web3 = new Web3(library);
			const tokenFeePercent = await getTokenFeePercent(web3);
			this.setState({ isLoading: false });
			if (
				iloName &&
				category &&
				saleTokenAddress &&
				saleTokenTotalSupply &&
				baseToken &&
				presaleCreator &&
				new BigNumber(presaleAmount).isFinite() &&
				!(await this.updateWarning())
			) {
				this.props.updateIloName(iloName);
				this.props.updateIloCategory(category);
				this.props.updateSaleToken(saleTokenAddress, saleTokenSymbol, saleTokenTotalSupply);
				this.props.updateBaseToken(baseToken);
				this.props.updateTokenFee(tokenFeePercent);
				this.props.updatePresaleCreator(presaleCreator);
				this.props.updatePresaleAmount(new BigNumber(presaleAmount));
				this.props.navigate('/createIloCaps');
			}
			// this.props.navigate('/createIloCaps');
		}
	};
	render() {
		this.setState({ isLoading: false });
		const {
			iloName,
			iloNameIssue,
			saleTokenAddress,
			saleTokenAddressIssue,
			saleTokenName,
			saleTokenSymbol,
			selectedBaseToken,
			baseTokenName,
			presaleCreator,
			presaleAmount,
			showWarning,
			category,
			isLoading,
		} = this.state;
		return (
			<CreateIloGeneralView
				iloName={iloName}
				isLoading={isLoading}
				iloNameIssue={iloNameIssue}
				saleTokenAddress={saleTokenAddress}
				saleTokenAddressIssue={saleTokenAddressIssue}
				saleTokenName={saleTokenName}
				saleTokenSymbol={saleTokenSymbol}
				baseTokenOptions={baseTokenOptions}
				selectedBaseToken={selectedBaseToken}
				baseTokenName={baseTokenName}
				presaleCreator={presaleCreator}
				presaleAmount={presaleAmount}
				showWarning={showWarning}
				category={category}
				onChangeIloName={this.handleChangeIloName}
				onClickIloCategory={this.handleSetIloCategory}
				onChangeTokenAddress={this.handleChangeSaleTokenAddress}
				onChangeBuyersParticipateWith={this.handleChangeBaseToken}
				onChangePresaleAmount={this.handleChangePresaleAmount}
				onSubmit={this.handleSubmit}
			/>
		);
	}
}

const mapStateToProps = ({ ethereum }: IRootState) => ({
	showConnectModal: ethereum.showConnectModal,
	isCloseUpdateShowConnectModal: ethereum.isCloseUpdateShowConnectModal,
});

const mapDispatchToProps = (dispatch: IDispatch) => ({
	updateShowConnectModal: (showConnectModal: boolean) => dispatch(updateShowConnectModal(showConnectModal)),
	updateIloName: (iloName: string) => dispatch(updateIloName(iloName)),
	updateIloCategory: (category: string) => dispatch(updateIloCategory(category)),
	updateSaleToken: (saleTokenAddress: string, saleTokenSymbol: string, saleTokenTotalSupply: BigNumber) =>
		dispatch(updateSaleToken(saleTokenAddress, saleTokenSymbol, saleTokenTotalSupply)),
	updateBaseToken: (baseToken: IBaseToken) => dispatch(updateBaseToken(baseToken)),
	updateTokenFee: (tokenFeePercent: number) => dispatch(updateTokenFee(tokenFeePercent)),
	updatePresaleCreator: (presaleCreator: string) => dispatch(updatePresaleCreator(presaleCreator)),
	updatePresaleAmount: (presaleAmount: BigNumber) => dispatch(updatePresaleAmount(presaleAmount)),
	addError: (error: unknown) => dispatch(addError(error)),
});

const createIloGeneral = connect(mapStateToProps, mapDispatchToProps)(withRouter(withWeb3(CreateIloGeneral)));

export { createIloGeneral as CreateIloGeneral };
