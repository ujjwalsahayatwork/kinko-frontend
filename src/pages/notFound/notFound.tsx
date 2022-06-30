import { Col } from 'components/col/col';
import { Text } from 'components/text/text';
import React, { FC } from 'react';
import styled from 'styled-components';

const FullHeight = styled(Col)`
	height: 100%;
`;

export const NotFound: FC = () => (
	<FullHeight maxWidth justify="center" align="center" horizontalPadding="m">
		<Text fontSize="xxl" fontWeight="bold">
			404
		</Text>
	</FullHeight>
);
