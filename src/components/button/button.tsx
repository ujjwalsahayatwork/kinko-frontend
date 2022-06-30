import { BaseButton } from 'components/baseButton/baseButton';
import { Icon } from 'components/icon/icon';
import { Spacing } from 'components/spacing/spacing';
import { Text } from 'components/text/text';
import { IColor } from 'components/types';
import { toPx } from 'components/utils';
import React, { FC } from 'react';
import styled from 'styled-components';

type IButtonStyle = 'default' | 'primaryBrand' | 'secondaryBrand';

const StyledButton = styled(BaseButton)<{ arrow: boolean }>`
	border: ${({ theme }) => `1px solid ${theme.primaryBrandColor}`};
	border-radius: ${({ theme }) => toPx(theme.buttonBorderRadius)};
	flex-direction: row;
	align-items: center;
	padding-left: ${({ theme }) => toPx(theme.inputHeight / 2)};
	padding-right: ${({ theme }) => toPx(theme.inputHeight / 2)};
	justify-content: ${({ arrow }) => (arrow ? 'space-between' : 'center')};
`;

const PrimaryBrandButton = styled(StyledButton)`
	background-color: ${({ theme }) => theme.primaryBrandColor};
	border-radius: ${({ theme }) => toPx(theme.inputHeight)};
`;

const SecondaryBrandButton = styled(StyledButton)`
	color: ${({ theme }) => theme.onSecondaryBrandColor};
	background-color: ${({ theme }) => theme.secondaryBrandColor};
	border-color: ${({ theme }) => theme.secondaryBrandColor};
	border-radius: ${({ theme }) => toPx(theme.inputHeight)};
`;

const StyledLabel = styled(Text)`
	font-weight: 600;
`;

interface IButtonProps {
	className?: string;
	label: string;
	arrow?: boolean;
	disabled?: boolean;
	buttonStyle?: IButtonStyle;
	onClick: () => void;
}

export const Button: FC<IButtonProps> = ({ className, label, arrow, disabled, buttonStyle, onClick }) => {
	const color: IColor = disabled ? 'secondary' : 'primary';

	switch (buttonStyle) {
		case 'primaryBrand':
			return (
				<PrimaryBrandButton className={className} arrow={false} onClick={onClick}>
					<Text color={color} fontSize="s" fontWeight="bold" whiteSpace="nowrap">
						{label}
					</Text>
				</PrimaryBrandButton>
			);
		case 'secondaryBrand':
			return (
				<SecondaryBrandButton className={className} arrow={false} onClick={onClick}>
					<Text color={color} fontSize="s" fontWeight="bold" whiteSpace="nowrap">
						{label}
					</Text>
				</SecondaryBrandButton>
			);
		default:
			return (
				<StyledButton className={className} arrow={arrow ?? false} disabled={disabled} onClick={onClick}>
					{arrow ? (
						<>
							<Spacing horizontal={8} />
							<Text color={color} fontSize="s" fontWeight="bold" whiteSpace="nowrap">
								{label}
							</Text>
							<Icon icon="angleRight" color={color} width={8} />
						</>
					) : (
						<StyledLabel color={color} fontSize="xs" fontWeight="normal" whiteSpace="nowrap">
							{label}
						</StyledLabel>
					)}
				</StyledButton>
			);
	}
};
