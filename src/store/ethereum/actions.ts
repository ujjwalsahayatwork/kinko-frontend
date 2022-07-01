import { IEthereumAction } from 'store/ethereum/types';

export const isCloseUpdateShowConnectModal = (isCloseUpdateShowConnectModal: boolean): IEthereumAction => ({
	type: 'updateIsCloseShowConnectModal',
	payload: { isCloseUpdateShowConnectModal },
});
export const updateShowConnectModal = (showConnectModal: boolean): IEthereumAction => ({
	type: 'updateShowConnectModal',
	payload: { showConnectModal },
});

export const updateShowWrongChainModal = (showWrongChainModal: boolean): IEthereumAction => ({
	type: 'updateShowWrongChainModal',
	payload: { showWrongChainModal },
});

export const updateConnectorIndex = (connectorIndex: number): IEthereumAction => ({
	type: 'updateConnectorIndex',
	payload: { connectorIndex },
});
