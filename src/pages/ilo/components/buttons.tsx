import React, { FC, useMemo } from 'react';
import styled from 'styled-components';

import { Button } from 'components/button/button';
import { Col } from 'components/col/col';
import { useDevice } from 'components/utils';
import { IIloStatus } from 'types';

const StyledButton = styled(Button)`
	background-color: #F97A48;
	border: none;
	/* width: 70%; */
	height: 3rem;
`

interface IButtonsProps {
	isConnected: boolean;
	iloStatus: IIloStatus;
	hasEarlyAccess: boolean;
	canClaimTokens: boolean;
	canWithdrawLpTokens: boolean;
	onConnect: () => void;
	onInvest: () => void;
	onFinalise: () => void;
	onClaim: () => void;
	onWithdrawLpTokens: () => void;
}

export const Buttons: FC<IButtonsProps> = ({
	isConnected,
	iloStatus,
	hasEarlyAccess,
	canClaimTokens,
	canWithdrawLpTokens,
	onConnect,
	onInvest,
	onFinalise,
	onClaim,
	onWithdrawLpTokens,
}) => {
	const { isDesktop } = useDevice();

	const label = useMemo<string>(() => {
		if (!isConnected) {
			return 'Connect wallet';
		}
		if ((iloStatus === 'round1' && hasEarlyAccess) || iloStatus === 'round2') {
			return 'Invest now';
		}
		if (iloStatus === 'saleDone') {
			return 'Finalise ILO';
		}
		if (iloStatus === 'success' && canClaimTokens) {
			return 'Claim Tokens';
		}
		if (iloStatus === 'failed' && canClaimTokens) {
			return 'Refund My Investment';
		}
		if (iloStatus === 'success' && canWithdrawLpTokens) {
			return 'Withdraw LP Tokens';
		}
		return '';
	}, [isConnected, iloStatus, canClaimTokens, hasEarlyAccess, canWithdrawLpTokens]);

	const onClick = useMemo<(() => void) | undefined>(() => {
		if (!isConnected) {
			return onConnect;
		}
		if ((iloStatus === 'round1' && hasEarlyAccess) || iloStatus === 'round2') {
			return onInvest;
		}
		if (iloStatus === 'saleDone') {
			return onFinalise;
		}
		if ((iloStatus === 'success' || iloStatus === 'failed') && canClaimTokens) {
			return onClaim;
		}
		if (iloStatus === 'success' && canWithdrawLpTokens) {
			return onWithdrawLpTokens;
		}
		return undefined;
	}, [
		isConnected,
		iloStatus,
		hasEarlyAccess,
		canClaimTokens,
		canWithdrawLpTokens,
		onConnect,
		onInvest,
		onFinalise,
		onClaim,
		onWithdrawLpTokens,
	]);

	if (!label || !onClick) {
		return null;
	}
	if (isDesktop) {
		return (
			<StyledButton label={label} onClick={onClick} />
		);
	}
	return (
		<Col>
			<StyledButton label={label} onClick={onClick} />
		</Col>
	);
};
