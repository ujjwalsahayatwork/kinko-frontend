import { IWeb3Props } from 'components/types';
import { withWeb3 } from 'components/utils';
import { ethereumConnectors } from 'constants/constants';
import { ConnectModalView } from 'modals/connectModal/connectModalView';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addError } from 'store/error/actions';
import { isCloseUpdateShowConnectModal, updateConnectorIndex, updateShowConnectModal, updateShowWrongChainModal } from 'store/ethereum/actions';
import { IDispatch } from 'store/store';
import { errorToString } from 'utils/utils';

interface IConnectModalProps extends IWeb3Props {
	isCloseUpdateShowConnectModal: (showConnectModal: boolean) => void;
	updateShowConnectModal: (showConnectModal: boolean) => void;
	updateShowWrongChainModal: (showWrongChainModal: boolean) => void;
	updateConnectorIndex: (connectorIndex: number) => void;
	addError: (error: unknown) => void;
}

class ConnectModal extends Component<IConnectModalProps> {
	handleSelect = async (index: number) => {
		try {
			await this.props.web3.activate(ethereumConnectors[index].getConnector(), undefined, true);
			this.props.updateConnectorIndex(index);
		} catch (e) {
			if (errorToString(e).includes('UnsupportedChainIdError')) {
				this.props.updateShowWrongChainModal(true);
			} else if (!errorToString(e).includes('The user rejected the request')) {
				this.props.addError(e);
			}
		} finally {
			this.handleClose();
		}
	};

	handleClose = () => {
		this.props.updateShowConnectModal(false);
		this.props.isCloseUpdateShowConnectModal(true);
	};

	render() {
		return <ConnectModalView onSelect={this.handleSelect} onClose={this.handleClose} />;
	}
}

const mapDispatchToProps = (dispatch: IDispatch) => ({
	isCloseUpdateShowConnectModal: (showConnectModal: boolean) => dispatch(isCloseUpdateShowConnectModal(showConnectModal)),
	updateShowConnectModal: (showConnectModal: boolean) => dispatch(updateShowConnectModal(showConnectModal)),
	updateShowWrongChainModal: (showWrongChainModal: boolean) => dispatch(updateShowWrongChainModal(showWrongChainModal)),
	updateConnectorIndex: (connectorIndex: number) => dispatch(updateConnectorIndex(connectorIndex)),
	addError: (error: unknown) => dispatch(addError(error)),
});

const connectModal = connect(null, mapDispatchToProps)(withWeb3(ConnectModal));

export { connectModal as ConnectModal };
