import { BaseButton } from 'components/baseButton/baseButton';
import { Col } from 'components/col/col';
import { Row } from 'components/row/row';
import { Spacing } from 'components/spacing/spacing';
import { Text } from 'components/text/text';
import { getOpacity, toPx } from 'components/utils';
import React, { ChangeEvent, FC, useCallback } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
	display: flex;
	border: 1px solid #103859;
	color: ${({ theme }) => theme.primaryColor};
	background: rgba(2, 34, 63, 0.8) !important;
	height: 46px;
	font-size: ${({ theme }) => toPx(theme.fontSizeM)};
	font-weight: ${({ theme }) => theme.fontWeightNormal};
	opacity: ${({ theme, readOnly }) => (readOnly ? getOpacity(theme, 'normal') : getOpacity(theme, 'full'))};
	margin: 0px;
	padding-left: 10px;
	padding-right: 10px;
	box-shadow: none;
	border-radius: 0.35rem;
	flex: 1;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		font-size: 14px;
	}

	&:focus {
		outline: none;
	}
`;

const CurrencyText = styled(Text)`
	align-items: flex-end;
	padding-bottom: 0.5rem;
`;

const MaxButtonWrapper = styled.div`
	display: flex;
	padding-bottom: 0.5rem;
`;

const MaxButton = styled(BaseButton)`
	background-color: ${({ theme }) => theme.primaryBrandColor};
	align-items: center;
	border-radius: 8px;
	margin-bottom: 1px;
	margin-left: ${({ theme }) => toPx(theme.distanceS)};
	padding-top: 4px;
	padding-bottom: 4px;
	padding-left: 6px;
	padding-right: 6px;
`;

const StyledInputContainer = styled(Row)`
	height: 46px;
	/* width: 605px; */
`;

const StyledLabel = styled(Text)`
	color: #828282;
`;

interface ICurrencyInputProps {
	className?: string;
	label: string;
	value: string;
	currency: string;
	readOnly?: boolean;
	balance?: string;
	balanceLabel?: string;
	errorMessage?: string;
	onChangeText: (value: string) => void;
	onMax?: () => void;
}

export const CurrencyInput: FC<ICurrencyInputProps> = ({
	className,
	label,
	value,
	currency,
	readOnly,
	balance,
	balanceLabel,
	errorMessage,
	onChangeText,
	onMax,
}) => {
	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			onChangeText(event.currentTarget.value);
		},
		[onChangeText]
	);

	return (
		<Col className={className}>
			<StyledLabel fontSize="xs">{label}</StyledLabel>
			<Spacing vertical="s" />
			<StyledInputContainer align="center">
				<StyledInput value={value} readOnly={readOnly} onChange={handleChange} />
				<CurrencyText fontSize="s">{currency}</CurrencyText>
				{onMax && (
					<MaxButtonWrapper>
						<MaxButton onClick={onMax}>
							<Text fontSize="xs" fontWeight="bold">
								MAX
							</Text>
						</MaxButton>
					</MaxButtonWrapper>
				)}
			</StyledInputContainer>
			<Spacing vertical="xs" />
			{(errorMessage || balance) && (
				<>
					<Spacing vertical="xs" />
					<Row>
						{errorMessage && (
							<Text fontSize="s" color="primaryError">
								{errorMessage}
							</Text>
						)}
						{balance && (
							<Text fontSize="xs" color="secondary">
								{balanceLabel ?? 'Balance:'} {balance}
							</Text>
						)}
					</Row>
				</>
			)}
		</Col>
	);
};
