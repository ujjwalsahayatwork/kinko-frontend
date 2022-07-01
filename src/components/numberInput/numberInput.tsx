import { Col } from 'components/col/col';
import { Text } from 'components/text/text';
import { getOpacity, toPx } from 'components/utils';
import React, { ChangeEvent, FC, useCallback } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
	display: flex;
	width: 100%;
	border: none;
	border-bottom: ${({ theme }) => `1px solid ${theme.primaryColor}`};
	color: ${({ theme }) => theme.primaryColor};
	background-color: transparent;
	font-size: ${({ theme }) => toPx(theme.fontSizeM)};
	font-weight: ${({ theme }) => theme.fontWeightNormal};
	opacity: ${({ theme, readOnly }) => (readOnly ? getOpacity(theme, 'normal') : getOpacity(theme, 'full'))};
	margin: 0px;
	padding-left: 0px;
	padding-right: 0px;

	&:focus {
		outline: none;
	}
`;

interface INumberInputProps {
	className?: string;
	label: string;
	value: string;
	readOnly?: boolean;
	showButtons?: boolean;
	onChangeText: (value: string) => void;
}

export const NumberInput: FC<INumberInputProps> = ({
	className,
	label,
	value,
	readOnly,
	showButtons,
	onChangeText,
}) => {
	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const { value } = event.currentTarget;
			if (value.length === 0 || !Number.isFinite(Number(value))) {
				onChangeText(value);
			}
		},
		[onChangeText]
	);

	return (
		<Col className={className}>
			<Text fontSize="xs" color="secondary">
				{label}
			</Text>
			<StyledInput type={showButtons ? 'number' : 'text'} value={value} readOnly={readOnly} onChange={handleChange} />
		</Col>
	);
};
