import { toPx } from 'components/utils';
import React, { FC } from 'react';
import styled from 'styled-components';

export type IButtonType = 'primary' | 'secondary';

const StyledButton = styled.button`
	display: flex;
	background-color: transparent;
	border: none;
	border-radius: ${({ theme }) => toPx(theme.inputHeight)};
	cursor: pointer;
	margin: 0px;
	padding: 0px;
	-webkit-touch-callout: none; // iOS Safari
	-webkit-user-select: none; // Safari
	-khtml-user-select: none; // Konqueror HTML
	-moz-user-select: none; // Firefox
	-ms-user-select: none; // Internet Explorer/Edge
	user-select: none; // Non-prefixed version, currently supported by Chrome and Opera
`;

interface IBaseButtonProps {
	className?: string;
	disabled?: boolean;
	title?: string;
	onClick: () => void;
}

export const BaseButton: FC<IBaseButtonProps> = ({ children, className, disabled, title, onClick }) => (
	<StyledButton className={className} disabled={disabled} title={title} onClick={onClick}>
		{children}
	</StyledButton>
);
