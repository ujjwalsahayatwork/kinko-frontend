import { IEthereumAction, IEthereumState } from './types';

export const initialEthereumState: IEthereumState = {
	isCloseUpdateShowConnectModal: false,
	showConnectModal: false,
	showWrongChainModal: false,
	connectorIndex: -1,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const ethereumReducer = (state = initialEthereumState, action: IEthereumAction): IEthereumState => {
	switch (action.type) {
		case 'updateIsCloseShowConnectModal':
			return { ...state, isCloseUpdateShowConnectModal: action.payload.isCloseUpdateShowConnectModal };
		case 'updateShowConnectModal':
			return { ...state, showConnectModal: action.payload.showConnectModal };
		case 'updateShowWrongChainModal':
			return { ...state, showWrongChainModal: action.payload.showWrongChainModal };
		case 'updateConnectorIndex':
			return { ...state, connectorIndex: action.payload.connectorIndex };
		default:
			return state;
	}
};
