/* eslint-disable */
import BigNumber from 'bignumber.js';
import { IRouterProps, IWeb3Props } from 'components/types';
import { loadState, saveState, withRouter, withWeb3 } from 'components/utils';
import { IloView } from 'pages/ilo/iloView';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addError } from 'store/error/actions';
import { updateShowConnectModal } from 'store/ethereum/actions';
import { IDispatch } from 'store/store';
import { updateShowLoadingModal } from 'store/utils/actions';
import { IIlo } from 'types';
import { addLiquidityTransactionHash, getIlo } from 'utils/api';
import {
	addLiquidity,
	getBuyer,
	ownerWithdrawTokens,
	userWithdrawBaseTokens,
	userWithdrawTokens,
} from 'utils/launchpad';
import { getPair } from 'utils/energyFiFactory';
import { getUserLockForTokenAtIndex, withdraw } from 'utils/energyFiLocker';
import { copyToClipboard, getERC20Balance, sleep } from 'utils/utils';
import Web3 from 'web3';

interface IIloProps extends IRouterProps<'launchpadAddress'>, IWeb3Props {
	updateShowConnectModal: (showConnectModal: boolean) => void;
	updateShowLoadingModal: (showLoadingModal: boolean) => void;
	addError: (error: unknown) => void;
}

interface IIloState {
	ilo: IIlo | undefined;
	earlyAccessTokenBalance: BigNumber;
	showSafetyAlert: boolean;
	canClaimSaleTokens: boolean;
	canClaimBaseTokens: boolean;
	canClaimOwnerTokens: boolean;
	canWithdrawLpTokens: boolean;
}

class Ilo extends Component<IIloProps, IIloState> {
	constructor(props: IIloProps) {
		super(props);
		this.state = loadState<IIloState>(props.location.key, (state) => {
			if (state) {
				const { earlyAccessTokenBalance } = state;
				return {
					...state,
					ilo: undefined,
					earlyAccessTokenBalance: new BigNumber(earlyAccessTokenBalance ?? 0),
				};
			}
			return {
				ilo: undefined,
				earlyAccessTokenBalance: new BigNumber(0),
				showSafetyAlert: true,
				canClaimSaleTokens: false,
				canClaimBaseTokens: false,
				canClaimOwnerTokens: false,
				canWithdrawLpTokens: false,
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

	async componentDidUpdate(prevProps: IIloProps, prevState: IIloState) {
		const { location, web3 } = this.props;
		const { ilo } = this.state;
		if (prevState !== this.state) {
			saveState(location.key, this.state, (state) => {
				const { earlyAccessTokenBalance } = state;
				return {
					...state,
					ilo: undefined,
					earlyAccessTokenBalance: earlyAccessTokenBalance.toString(),
				};
			});
		}
		if (prevProps.web3 !== web3 || prevState.ilo !== ilo) {
			await this.updateEarlyAccessBalance();
		}
		if (prevProps.web3 !== web3 || prevState.ilo !== ilo) {
			await this.updateClaims();
		}
		if (prevProps.web3 !== web3 || prevState.ilo !== ilo) {
			await this.updateWithdrawLiquidity();
		}
	}

	updateEarlyAccessBalance = async () => {
		const {
			web3: { library, account },
		} = this.props;
		const { ilo } = this.state;
		let earlyAccessTokenBalance = new BigNumber(0);
		try {
			if (ilo && library && account) {
				const { earlyAccessTokenAddress } = ilo;
				if (earlyAccessTokenAddress) {
					const web3 = new Web3(library);
					earlyAccessTokenBalance = await getERC20Balance(web3, account, earlyAccessTokenAddress);
				}
			}
		} finally {
			this.setState({ earlyAccessTokenBalance });
		}
	};

	updateClaims = async () => {
		const {
			web3: { library, account },
		} = this.props;
		const { ilo } = this.state;
		let canClaimSaleTokens = false;
		let canClaimBaseTokens = false;
		let canClaimOwnerTokens = false;
		try {
			if (library && account && ilo) {
				const { launchpadAddress, saleTokenAddress, baseTokenAddress, creatorAddress } = ilo;
				const web3 = new Web3(library);
				const buyer = await getBuyer(web3, account, launchpadAddress,saleTokenAddress, baseTokenAddress);
				const { baseDeposited, tokensOwed } = buyer;
				canClaimSaleTokens = tokensOwed.gt(0);
				canClaimBaseTokens = baseDeposited.gt(0);
				if (creatorAddress.toLowerCase() === account.toLowerCase()) {
					const launchpadSaleTokenBalance = await getERC20Balance(web3, launchpadAddress, saleTokenAddress);
					canClaimOwnerTokens = launchpadSaleTokenBalance.gt(0);
				}
			}
		} finally {
			this.setState({
				canClaimSaleTokens,
				canClaimBaseTokens,
				canClaimOwnerTokens,
			});
		}
	};

	updateWithdrawLiquidity = async () => {
		const {
			web3: { library, account },
		} = this.props;
		const { ilo } = this.state;
		let canWithdrawLpTokens = false;
		try {
			if (library && account && ilo) {
				const { saleTokenAddress, baseTokenAddress, creatorAddress, lpGenerationTimestamp, lockPeriod } = ilo;
				if (
					lpGenerationTimestamp + lockPeriod < BigInt(Date.now()) / BigInt(1000) &&
					account.toLowerCase() === creatorAddress.toLowerCase()
				) {
					const web3 = new Web3(library);
					const lpTokenAddress = await getPair(web3, saleTokenAddress, baseTokenAddress);
					const userLock = await getUserLockForTokenAtIndex(web3, creatorAddress, lpTokenAddress, BigInt(0));
					const { amount, unlockDate } = userLock;
					canWithdrawLpTokens = Date.now() > unlockDate.getTime() && amount.gt(0);
				}
			}
		} finally {
			this.setState({ canWithdrawLpTokens });
		}
	};

	handleHideSafetyAlert = () => {
		this.setState({ showSafetyAlert: false });
	};

	handleCopySaleTokenAddress = () => {
		const { ilo } = this.state;
		if (ilo) {
			copyToClipboard(ilo.saleTokenAddress);
		}
	};

	handleConnect = () => {
		this.props.updateShowConnectModal(true);
	};

	handleInvest = () => {
		const { ilo } = this.state;
		if (ilo) {
			this.props.navigate(`/invest/${ilo.launchpadAddress}`);
		}
	};

	handleFinalise = async () => {
		const {
			web3: { library, account },
			params,
		} = this.props;
		const { ilo } = this.state;
		if (library && account && ilo) {
			const { launchpadAddress } = ilo;
			const web3 = new Web3(library);
			try {
				this.props.updateShowLoadingModal(true);
				const transactionHash = await addLiquidity(web3, account, launchpadAddress);
				await addLiquidityTransactionHash(transactionHash);
				if (params.launchpadAddress) {
					const newIlo = await getIlo(params.launchpadAddress);
					this.setState({ ilo: newIlo });
				}
			} finally {
				this.props.updateShowLoadingModal(false);
			}
		}
	};

	handleClaim = async () => {
		const {
			web3: { library, account },
		} = this.props;
		const { ilo, canClaimBaseTokens, canClaimOwnerTokens } = this.state;
		if (library && account && ilo) {
			const { status, launchpadAddress } = ilo;
			const web3 = new Web3(library);
			try {
				this.props.updateShowLoadingModal(true);
				if (status === 'success') {
					await userWithdrawTokens(web3, account, launchpadAddress);
				} else if (status === 'failed') {
					if (canClaimBaseTokens) {
						await userWithdrawBaseTokens(web3, account, launchpadAddress);
					} else if (canClaimOwnerTokens) {
						await ownerWithdrawTokens(web3, account, launchpadAddress);
					}
				}
				await sleep(1000);
				await this.updateClaims();
			} finally {
				this.props.updateShowLoadingModal(false);
			}
		}
	};

	handleWidthdrawLpTokens = async () => {
		const {
			web3: { library, account },
		} = this.props;
		const { ilo } = this.state;
		if (library && account && ilo) {
			const { saleTokenAddress, baseTokenAddress, creatorAddress } = ilo;
			const web3 = new Web3(library);
			try {
				this.props.updateShowLoadingModal(true);
				const lpTokenAddress = await getPair(web3, saleTokenAddress, baseTokenAddress);
				const userLock = await getUserLockForTokenAtIndex(web3, creatorAddress, lpTokenAddress, BigInt(0));
				const { lockId, amount } = userLock;
				await withdraw(web3, account, lpTokenAddress, BigInt(0), lockId, amount);
				await sleep(1000);
				await this.updateWithdrawLiquidity();
			} finally {
				this.props.updateShowLoadingModal(false);
			}
		}
	};

	render() {
		const {
			web3: { active },
		} = this.props;
		const {
			ilo,
			earlyAccessTokenBalance,
			showSafetyAlert,
			canClaimSaleTokens,
			canClaimBaseTokens,
			canClaimOwnerTokens,
			canWithdrawLpTokens,
		} = this.state;
		if (!ilo) {
			return null;
		}
		const { status, earlyAccessTokenAmount } = ilo;
		const canClaimTokens =
			(status === 'success' && canClaimSaleTokens) ||
			(status === 'failed' && (canClaimBaseTokens || canClaimOwnerTokens));
		const hasEarlyAccess = earlyAccessTokenBalance.gte(earlyAccessTokenAmount);
		return (
			<IloView
				data={ilo}
				earlyAccessTokenBalance={earlyAccessTokenBalance}
				showSafetyAlert={showSafetyAlert}
				isConnected={active}
				hasEarlyAccess={hasEarlyAccess}
				canClaimTokens={canClaimTokens}
				canWithdrawLpTokens={canWithdrawLpTokens}
				onHideSafetyAlert={this.handleHideSafetyAlert}
				onCopySaleTokenAddress={this.handleCopySaleTokenAddress}
				onConnect={this.handleConnect}
				onInvest={this.handleInvest}
				onFinalise={this.handleFinalise}
				onClaim={this.handleClaim}
				onWithdrawLpTokens={this.handleWidthdrawLpTokens}
			/>
		);
	}
}

const mapDispatchToProps = (dispatch: IDispatch) => ({
	updateShowConnectModal: (showConnectModal: boolean) => dispatch(updateShowConnectModal(showConnectModal)),
	updateShowLoadingModal: (showLoadingModal: boolean) => dispatch(updateShowLoadingModal(showLoadingModal)),
	addError: (error: unknown) => dispatch(addError(error)),
});

const ilo = connect(null, mapDispatchToProps)(withRouter<'launchpadAddress'>(withWeb3(Ilo)));

export { ilo as Ilo };
