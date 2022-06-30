import { BaseButton } from 'components/baseButton/baseButton';
import { Text } from 'components/text/text';
import { toPx } from 'components/utils';
import React, { FC } from 'react';
import styled from 'styled-components';

const StyledButton = styled(BaseButton)<{ selected: boolean }>`
	color: ${({ theme, selected }) => (selected ? theme.onPrimaryBrandColor : theme.tertiaryColor)};
	background-color: ${({ theme, selected }) => (selected ? theme.primaryBrandColor : theme.secondaryBackgroundColor)};
	height: ${({ theme }) => toPx(theme.inputHeight)};
	min-height: ${({ theme }) => toPx(theme.inputHeight)};
	max-height: ${({ theme }) => toPx(theme.inputHeight)};
	padding-left: ${({ theme }) => toPx(theme.inputHeight / 3)};
	padding-right: ${({ theme }) => toPx(theme.inputHeight / 3)};
	align-items: center;
	border: ${({ theme }) => `1px solid ${theme.primaryBrandColor}`};
`;

interface IRadioButtonProps {
	title: string;
	selected: boolean;
	onClick: () => void;
}

export const RadioButton: FC<IRadioButtonProps> = ({ title, selected, onClick }) => (
	<StyledButton selected={selected} onClick={onClick}>
		<Text color={selected ? 'onPrimaryBrand' : 'secondary'} fontSize="l" fontWeight="bold">
			{title}
		</Text>
	</StyledButton>
);
