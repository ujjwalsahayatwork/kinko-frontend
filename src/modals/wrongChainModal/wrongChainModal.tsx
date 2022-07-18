import { BaseModal } from 'components/baseModal/baseModal';
import { Col } from 'components/col/col';
import { Spacing } from 'components/spacing/spacing';
import { Text } from 'components/text/text';
import { ETHEREUM_NETWORK_NAME} from 'constants/env';
import React, { FC } from 'react';

export const WrongChainModal: FC = () => (
	<BaseModal onClose={() => undefined}>
		<Col roundTop roundBottom backgroundColor="primaryBackground" horizontalPadding="m" verticalPadding="m">
			<Text fontSize="l" fontWeight="bold">
				Wrong network
			</Text>
			<Spacing vertical="m" />
			<Text fontSize="m">Please select {ETHEREUM_NETWORK_NAME  } </Text>
		</Col>
	</BaseModal>
);
