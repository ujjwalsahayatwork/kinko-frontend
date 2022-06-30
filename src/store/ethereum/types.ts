import { IPayloadAction } from 'store/types';

export interface IEthereumState {
	isCloseUpdateShowConnectModal:boolean;
	showConnectModal: boolean;
	showWrongChainModal: boolean;
	connectorIndex: number;
}

type IisCloseUpdateConnectModal = IPayloadAction<'updateIsCloseShowConnectModal', { isCloseUpdateShowConnectModal: boolean }>;

type IUpdateConnectModal = IPayloadAction<'updateShowConnectModal', { showConnectModal: boolean }>;

type IUpdateShowWrongChainModal = IPayloadAction<'updateShowWrongChainModal', { showWrongChainModal: boolean }>;

type IUpdateConnectorIndex = IPayloadAction<'updateConnectorIndex', { connectorIndex: number }>;

export type IEthereumAction = IUpdateConnectModal | IUpdateShowWrongChainModal | IUpdateConnectorIndex | IisCloseUpdateConnectModal;
