import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import metaMask from 'assets/images/wallets/metamask.svg';
import trustWallet from 'assets/images/wallets/trustwallet.png';
import walletConnect from 'assets/images/wallets/walletconnect.svg';
import { IDropDownOption } from 'components/dropDown/dropDown';
import { IEthereumConnector } from 'components/types';
import { BSC_CHAIN_ID, ETHEREUM_CHAIN_ID, ETHEREUM_RPC_URL } from 'constants/env';
import { chain } from 'lodash';
import { IBaseToken } from 'types';
import { createBaseTokenDropDownOption } from 'utils/utils';

export const ethereumConnectors: Array<IEthereumConnector> = [
	{
		label: 'MetaMask',
		icon: metaMask,
		getConnector: () => new InjectedConnector({}),
		isAuthorized: (): Promise<boolean> => {
			const injected = new InjectedConnector({});
			return injected.isAuthorized();
		},
	},
	{
		label: 'WalletConnect',
		icon: walletConnect,
		getConnector: () =>
			new WalletConnectConnector({
				supportedChainIds: [ETHEREUM_CHAIN_ID,BSC_CHAIN_ID],
				chainId: ETHEREUM_CHAIN_ID,
				rpc:
					ETHEREUM_CHAIN_ID === 1287
						? { 1287: ETHEREUM_RPC_URL }
						: BSC_CHAIN_ID === 56
						? { 56: ETHEREUM_RPC_URL }
						: undefined,
			}),
		isAuthorized: async () => Promise.resolve(false),
	},
	{
		label: 'TrustWallet',
		icon: trustWallet,
		getConnector: () => new InjectedConnector({}),
		isAuthorized: (): Promise<boolean> => {
			const injected = new InjectedConnector({});
			return injected.isAuthorized();
		},
	},
];

export const baseTokenOptions: Array<IDropDownOption<IBaseToken>> = [ 

	createBaseTokenDropDownOption('dev'),
	createBaseTokenDropDownOption('dai'),
	// createBaseTokenDropDownOption('wbtc'),
	createBaseTokenDropDownOption('usdc'),
];

export const bscBaseTokenOptions: Array<IDropDownOption<IBaseToken>> = [ 

	createBaseTokenDropDownOption('bnb'),
	createBaseTokenDropDownOption('bscdai'),
	// createBaseTokenDropDownOption('bscwbtc'),
	createBaseTokenDropDownOption('bscusdc'),
];	


export const minLiquidityRatePercent = 25;

export const maxLiquidityRatePercent = 100;

export const minListingRatePercent = 0;

export const maxListingRatePercent = 50;

export const tropicalYear2000ms = BigInt(31556925261);

export const hiddenLaunchpadAddresses: Array<string> = [
	'0xd0cc47a35b89ae75fd064a89b78ca4e7ea521819',
	'0xe9bce3cfa2c8d8c800a17a7d737f4b2c85cda983',
	'0xdc0bfab237d1489d0b424bd0ad9152dcf7f69aca',
	'0x624f1dfbc9f2112d934f9413b8952eb246047bd4',
	'0x7e50b5eac0d54659efc3b88294ce87e7c2b5885d',
	'0x3b64c370a95ff16cbd79318a3d87f4643e009a3c',
	'0xfd107aed4de42485d6a50a77b188806d03cbb442',
	'0x9ce672e096292a42904dd6d92af7f1af037146ef',
	'0x8ad46747621e922c28eb682d7518fbd0f3e50197',
	'0x46974a8a01472daebfe85a8d03162d78b8230e0b',
	'0xbb6a92e2d456126a3e2d3529b3aa94e2c09fdd16', // Failed EFI ILO
];
