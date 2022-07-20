import { Col } from 'components/col/col';
import { Icon, IIcon } from 'components/icon/icon';
import { Row } from 'components/row/row';
import { Spacing } from 'components/spacing/spacing';
import { Text } from 'components/text/text';
import { IColor } from 'components/types';
import { getOpacity, toPx } from 'components/utils';
import React, { ChangeEvent, FC, useCallback } from 'react';
import styled from 'styled-components';

const StyledTextarea = styled.textarea`
	display: flex;
	color: #ffffff;
	background: rgba(2, 34, 63, 0.8) !important;
	border: none;
	border-bottom: 1px solid #103859;
	font-size: ${({ theme }) => toPx(theme.fontSizeM)};
	font-weight: ${({ theme }) => theme.fontWeightNormal};
	opacity: ${({ theme, readOnly }) => (readOnly ? getOpacity(theme, 'normal') : getOpacity(theme, 'full'))};
	margin: 0px;
	padding-left: 0px;
	padding-right: 0px;
	outline: none;
	box-shadow: none;
	border-radius: 5px;
`;

// const StyledInputContainer = styled.div`
// 	display: flex;
// 	border: none;
// 	border: 1px solid #103859;
// 	color: ${({ theme }) => theme.primaryColor};
// 	background: rgba(2, 34, 63, 0.8);
// 	font-size: ${({ theme }) => toPx(theme.fontSizeM)};
// 	font-weight: ${({ theme }) => theme.fontWeightNormal};
// 	margin: 0px;
// 	padding-left: 0px;
// 	padding-right: 0px;
// 	box-shadow: none;
// 	border-radius: 5px;
// 	height: 46px;
// 	flex: 1;
// 	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
// 		font-size: 14px;
// 	}
// `;

const InputBox = styled(Row)`
	position: relative;
`

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

const StyledIcon = styled(Icon)``;

const IconWrapper = styled.div`
	display: flex;
	align-items: center;
	padding-bottom: ${({ theme }) => toPx(theme.distanceXS)};
	padding-right: 1rem;
	position: absolute;
    right: 0;
    height: 46px;
`;

const StyledLabel = styled(Text)`
	color: #828282;
`;

interface ITextInputProps {
	className?: string;
	label: string;
	value: string;
	readOnly?: boolean;
	multiline?: boolean;
	rows?: number;
	maxLength?: number;
	icon?: IIcon;
	iconColor?: IColor;
	errorMessage?: string;
	onChangeText: (value: string) => void;
	InputCss?: string;
	height?: number;
}

export const TextInput: FC<ITextInputProps> = ({
	className,
	label,
	value,
	readOnly,
	multiline,
	rows,
	maxLength,
	icon,
	iconColor,
	errorMessage,
	onChangeText,
	InputCss,
	height,
}) => {
	const handleTextareaChange = useCallback(
		(event: ChangeEvent<HTMLTextAreaElement>) => {
			onChangeText(event.currentTarget.value);
		},
		[onChangeText]
	);

	const handleInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			onChangeText(event.currentTarget.value);
		},
		[onChangeText]
	);

	return (
		<Col className={className}>
			<StyledLabel fontSize="xs">{label}</StyledLabel>
			<Spacing vertical="s" />
			{multiline ? (
				<>
					<StyledTextarea rows={rows} value={value} maxLength={maxLength} onChange={handleTextareaChange} />
					{maxLength && (
						<Row maxWidth justify="space-between" verticalPadding="s">
							<Text fontSize="s" color="primaryError">
								{errorMessage}
							</Text>

							<Text fontSize="xs" color="secondary">
								{value.length} / {maxLength}
							</Text>
						</Row>
					)}
				</>
			) : (
				<>
					<InputBox>
						<StyledInput
							className={InputCss}
							type="text"
							value={value}
							readOnly={readOnly}
							onChange={handleInputChange}
						/>
						{icon && (
							<IconWrapper>
								<StyledIcon icon={icon} color={iconColor ?? 'primary'} height={height || 22} />
							</IconWrapper>
						)}
					</InputBox>
					<Text fontSize="s" color="primaryError">
						{errorMessage}
					</Text>
				</>
			)}
		</Col>
	);
};
