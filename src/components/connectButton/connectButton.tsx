import { BaseButton } from 'components/baseButton/baseButton';
import { Text } from 'components/text/text';
import { IWeb3Props } from 'components/types';
import { toPx, withWeb3 } from 'components/utils';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addError } from 'store/error/actions';
import { updateConnectorIndex, updateShowConnectModal } from 'store/ethereum/actions';
import { IDispatch } from 'store/store';
import styled from 'styled-components';

const StyledButton = styled(BaseButton)`
	background-color: #ed4c3a;
	/* border: ${({ theme }) => `1px solid ${theme.primaryBrandColor}`}; */
	border-radius: 0.35rem;
	height: 3rem;
	width: 8.5rem;
	padding-left: 15px;
	padding-right: 15px;
	justify-content: center;
	align-items: center;

	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		height: 33px;
		padding-left: 5px;
		padding-right: 5px;
	}
`;

const Address = styled(Text)`
	display: inline;
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

interface IConnectButtonProps extends IWeb3Props {
	className?: string;
	updateShowConnectModal: (showConnectModal: boolean) => void;
	updateConnectorIndex: (connectorIndex: number) => void;
	addError: (error: unknown) => void;
}

class ConnectButton extends Component<IConnectButtonProps> {
	handleClick = () => {
		try {
			if (this.props.web3.active) {
				this.props.updateConnectorIndex(-1);
				this.props.web3.deactivate();
			} else {
				this.props.updateShowConnectModal(true);
			}
		} catch (e) {
			this.props.addError(e);
		}
	};

	render() {
		const { className, web3 } = this.props;

		return (
			<StyledButton className={className} onClick={this.handleClick}>
				<Address fontSize="xs" mobileFontSize="xxs" fontWeight="normal">
					{web3.account ? web3.account : 'Connect Wallet'}
				</Address>
			</StyledButton>
		);
	}
}

const mapDispatchToProps = (dispatch: IDispatch) => ({
	updateShowConnectModal: (showConnectModal: boolean) => dispatch(updateShowConnectModal(showConnectModal)),
	updateConnectorIndex: (connectorIndex: number) => dispatch(updateConnectorIndex(connectorIndex)),
	addError: (error: unknown) => dispatch(addError(error)),
});

const connectButton = connect(null, mapDispatchToProps)(withWeb3(ConnectButton));

export { connectButton as ConnectButton };
