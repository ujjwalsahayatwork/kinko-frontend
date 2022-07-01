import { BaseButton } from 'components/baseButton/baseButton';
import { BaseModal } from 'components/baseModal/baseModal';
import { Col } from 'components/col/col';
import { Icon } from 'components/icon/icon';
import { Row } from 'components/row/row';
import { Spacing } from 'components/spacing/spacing';
import { Text } from 'components/text/text';
import { toPx } from 'components/utils';
import { ethereumConnectors } from 'constants/constants';
import React, { FC } from 'react';
import styled from 'styled-components';

const HeaderClose = styled(BaseButton)`
	display: flex;
	height: 20px;
	width: 20px;
	border-radius: 0px;
	background-color: transparent;
`;

const ConnectorWrapper = styled(BaseButton)`
	display: flex;
	flex-direction: row;
	padding: ${({ theme }) => toPx(theme.distanceS)};
	padding-left: ${({ theme }) => toPx(theme.distanceM)};
	cursor: pointer;
	align-items: center;
	border-radius: 100px;
	color: ${({ theme }) => theme.primaryColor};
	background-color: transparent;

	:hover {
		color: ${({ theme }) => theme.primaryColor};
		background-color: ${({ theme }) => theme.secondaryBrandColor};
	}
`;

const ConnectorIcon = styled.img<{ _height?: number; _width?: number }>`
	height: ${({ _height }) => (_height === undefined ? 'auto' : toPx(_height))};
	min-height: ${({ _height }) => (_height === undefined ? 'auto' : toPx(_height))};
	max-height: ${({ _height }) => (_height === undefined ? 'auto' : toPx(_height))};
	width: ${({ _width }) => (_width === undefined ? 'auto' : toPx(_width))};
	min-width: ${({ _width }) => (_width === undefined ? 'auto' : toPx(_width))};
	max-width: ${({ _width }) => (_width === undefined ? 'auto' : toPx(_width))};
`;

interface IConnectModalViewProps {
	onSelect: (index: number) => void;
	onClose: () => void;
}

export const ConnectModalView: FC<IConnectModalViewProps> = ({ onSelect, onClose }) => (
	<BaseModal onClose={onClose}>
		<Col roundTop roundBottom backgroundColor="primaryBackground" horizontalPadding="m" verticalPadding="m">
			<Row justify="space-between" align="center">
				<Text fontSize="l" fontWeight="bold">
					Connect to a wallet
				</Text>
				<Spacing horizontal="m" />
				<HeaderClose onClick={onClose}>
					<Icon icon="xmark" color="primary" height={20} />
				</HeaderClose>
			</Row>
			<Spacing vertical="m" />
			{ethereumConnectors.map(({ label, icon }, index) => (
				<ConnectorWrapper key={label} onClick={() => onSelect(index)}>
					<ConnectorIcon src={icon} _width={24} _height={24} />
					<Spacing horizontal="m" />
					<Text fontSize="m" color="undefined">
						{label}
					</Text>
				</ConnectorWrapper>
			))}
		</Col>
	</BaseModal>
);
