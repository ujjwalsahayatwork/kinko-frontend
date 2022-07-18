import { IWeb3Props } from 'components/types';
import { withWeb3 } from 'components/utils';
import { ethereumConnectors } from 'constants/constants';
import { ETHEREUM_CHAIN_ID } from 'constants/env';
import { Component } from 'react';
import { connect } from 'react-redux';
import { addError } from 'store/error/actions';
import { updateConnectorIndex, updateShowWrongChainModal } from 'store/ethereum/actions';
import { IDispatch, IRootState } from 'store/store';

interface IEthereumHandlerProps extends IWeb3Props {
	connectorIndex: number;
	updateShowWrongChainModal: (showWrongChainModal: boolean) => void;
	updateConnectorIndex: (connectorIndex: number) => void;
	addError: (error: unknown) => void;
}

interface IEthereumHandlerState {
	reconnecting: boolean;
}

class EthereumHandler extends Component<IEthereumHandlerProps, IEthereumHandlerState> {
	constructor(props: IEthereumHandlerProps) {
		super(props);
		this.state = {
			reconnecting: true,
		};
	}

	async componentDidMount() {
		await this.reconnect();
	}

	async componentDidUpdate(prevProps: IEthereumHandlerProps) {
		const {
			web3,
			web3: { chainId },
		} = this.props;
		if (web3 !== prevProps.web3) {
			await this.reconnect();
		}
		if (prevProps.web3.chainId !== chainId) {
			this.handleChainChange();
		}
	}

	reconnect = async () => {
		try {
			const {
				web3: { active },
				connectorIndex,
			} = this.props;
			if (connectorIndex > -1 && !active && (await ethereumConnectors[connectorIndex].isAuthorized())) {
				const connector = ethereumConnectors[connectorIndex].getConnector();
				await this.props.web3.activate(connector);
			}
		} catch (e) {
			this.props.updateConnectorIndex(-1);
			this.props.addError(e);
		} finally {
			this.setState({ reconnecting: false });
		}
	};

	handleChainChange = () => {
		const {
			web3: { chainId },
		} = this.props;
		if (chainId && chainId === ETHEREUM_CHAIN_ID) {
			this.props.updateShowWrongChainModal(false);
		} else {
			this.props.updateShowWrongChainModal(true);
		}
	};

	render() {
		const { children } = this.props;
		const { reconnecting } = this.state;

		if (!reconnecting) {
			return children;
		}
		return null;
	}
}

const mapStateToProps = ({ ethereum }: IRootState) => ({
	connectorIndex: ethereum.connectorIndex,
});

const mapDispatchToProps = (dispatch: IDispatch) => ({
	updateShowWrongChainModal: (showWrongChainModal: boolean) => dispatch(updateShowWrongChainModal(showWrongChainModal)),
	updateConnectorIndex: (connectorIndex: number) => dispatch(updateConnectorIndex(connectorIndex)),
	addError: (error: unknown) => dispatch(addError(error)),
});

const ethereumHandler = connect(mapStateToProps, mapDispatchToProps)(withWeb3(EthereumHandler));

export { ethereumHandler as EthereumHandler };
