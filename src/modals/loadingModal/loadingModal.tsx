import { BaseModal } from 'components/baseModal/baseModal';
import React, { FC } from 'react';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

export const LoadingModal: FC = () => {
	const theme = useTheme();

	return (
		<BaseModal onClose={() => undefined}>
			<PulseLoader color={theme.secondaryBrandColor} />
		</BaseModal>
	);
};
