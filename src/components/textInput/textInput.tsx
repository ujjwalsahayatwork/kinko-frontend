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
	border-radius: 0px;
`;

const StyledInput = styled.input`
	display: flex;
	border: 1px solid #103859;
	color: ${({ theme }) => theme.primaryColor};
	background: rgba(2, 34, 63, 0.8)  !important;
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
	border-bottom: 1px solid #4b4b4b;
	align-items: flex-end;
	padding-bottom: ${({ theme }) => toPx(theme.distanceXS)};
	padding-right: ${({ theme }) => toPx(theme.distanceS)};
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
					<Row>
						<StyledInput
							className={InputCss}
							type="text"
							value={value}
							readOnly={readOnly}
							onChange={handleInputChange}
						/>
						{icon && (
							<IconWrapper>
								<StyledIcon icon={icon} color={iconColor ?? 'primary'} height={22} />
							</IconWrapper>
						)}
					</Row>
					<Text fontSize="s" color="primaryError">
						{errorMessage}
					</Text>
				</>
			)}
		</Col>
	);
};
