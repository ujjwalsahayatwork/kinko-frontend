import { ConnectModal } from 'modals/connectModal/connectModal';
import { LoadingModal } from 'modals/loadingModal/loadingModal';
import { WrongChainModal } from 'modals/wrongChainModal/wrongChainModal';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'store/store';

export const ModalHandler: FC = () => {
	const { showLoadingModal } = useSelector((state: IRootState) => state.utils);
	const { showConnectModal, showWrongChainModal } = useSelector((state: IRootState) => state.ethereum);

	if (showConnectModal) {
		return <ConnectModal />;
	}
	if (showWrongChainModal) {
		return <WrongChainModal />;
	}
	if (showLoadingModal) {
		return <LoadingModal />;
	}
	return null;
};
