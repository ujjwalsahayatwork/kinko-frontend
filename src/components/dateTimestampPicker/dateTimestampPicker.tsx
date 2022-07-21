import { BaseButton } from 'components/baseButton/baseButton';
import { Button } from 'components/button/button';
import { Col } from 'components/col/col';
import { Icon } from 'components/icon/icon';
import { NumberInput } from 'components/numberInput/numberInput';
import { Row } from 'components/row/row';
import { Spacing } from 'components/spacing/spacing';
import { Text } from 'components/text/text';
import { toPx } from 'components/utils';
import moment from 'moment';
import React, { FC, useCallback, useState } from 'react';
import RDatePicker from 'react-datepicker';
import styled from 'styled-components';
import './react-datepicker.scss';

const BorderWrapper = styled(Row)`
	background: rgba(2, 34, 63, 0.8) !important;
	border-radius: 5px;
	border: 1px solid #103859;
`;

const DateText = styled(Text)`
	flex: 1;
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 20px;
	padding: 0.8rem 0.5rem;
`;

const IconContainer = styled(Row)`
	height: ${({ theme }) => toPx(theme.inputHeight)};
	min-height: ${({ theme }) => toPx(theme.inputHeight)};
	max-height: ${({ theme }) => toPx(theme.inputHeight)};
	padding-bottom: ${({ theme }) => toPx(theme.distanceXS)};
	flex-direction: row;
	align-items: center;
`;

const DateButton = styled(BaseButton)`
	background-color: transparent;
	border-radius: 0px;
`;

const TimestampButton = styled(BaseButton)`
	background-color: transparent;
	border-radius: 0px;
`;

const Relative = styled.div`
	display: flex;
	position: relative;
	align-self: flex-end;
	z-index: 1000;
`;

const Absolute = styled.div`
	display: flex;
	position: absolute;
	transform: translateX(-100%);
`;

const DatePickerWrapper = styled(Col)`
	background: #001a23;
	box-shadow: ${({ theme }) => `0px 0px 10px ${theme.shadowColor}`};
`;

const NumberInputWrapper = styled(Col)`
	background: #001a23 !important;
	min-width: 200px;
	box-shadow: ${({ theme }) => `0px 0px 10px ${theme.shadowColor}`};
`;

const AcceptButton = styled(Button)`
	border: 1px solid #ed4c3a;
	height: 2.5rem;
`;

const dateToTimestamp = (date: Date | undefined) => {
	if (date) {
		return Math.round(date.getTime() / 1000).toString();
	}
	return '';
};

interface IDateTimestampPickerProps {
	className?: string;
	date: Date | undefined;
	onChangeDate: (date: Date) => void;
}

export const DateTimestampPicker: FC<IDateTimestampPickerProps> = ({ className, date, onChangeDate }) => {
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showTimestampPicker, setShowTimestampPicker] = useState(false);
	const [internalDate, setInternalDate] = useState(date);
	const [internalTimestamp, setInternalTimestamp] = useState<string>(dateToTimestamp(date));

	const handleClickDatePicker = useCallback(() => {
		if (!showDatePicker) {
			setShowTimestampPicker(false);
			setInternalDate(date);
		}
		setShowDatePicker(!showDatePicker);
	}, [showDatePicker, date, setInternalDate, setShowDatePicker, setShowTimestampPicker]);

	const handleClickTimestampPicker = useCallback(() => {
		if (!showTimestampPicker) {
			setShowDatePicker(false);
			setInternalTimestamp(dateToTimestamp(date));
		}
		setShowTimestampPicker(!showTimestampPicker);
	}, [showTimestampPicker, date, setShowDatePicker, setShowTimestampPicker, setInternalTimestamp]);

	const handleChangeDate = useCallback(
		(date: Date | [Date | null, Date | null] | null) => {
			if (date && !Array.isArray(date)) {
				setInternalDate(date);
			}
		},
		[setInternalDate]
	);

	const handleSubmitDate = useCallback(() => {
		if (internalDate && !Array.isArray(internalDate)) {
			setShowDatePicker(false);
			onChangeDate(internalDate);
		}
	}, [internalDate, setShowDatePicker, onChangeDate]);

	const handleSubmitTimestamp = useCallback(() => {
		if (internalTimestamp.length === 0 || Number.isFinite(Number(internalTimestamp))) {
			setShowTimestampPicker(false);
			onChangeDate(internalTimestamp ? new Date(Number(internalTimestamp) * 1000) : new Date(0));
		}
	}, [internalTimestamp, setShowTimestampPicker, onChangeDate]);

	return (
		<Col className={className}>
			<Spacing vertical="s" />
			<BorderWrapper align="center">
				<DateText fontSize="s">{date ? date.toLocaleString() : ''}</DateText>
				<IconContainer>
					<Col>
						<DateButton onClick={handleClickDatePicker}>
							<Row align="center">
								<Icon icon="calendarOutlined" color="secondaryBrand" height={25} />
								<Spacing horizontal="s" />
								{/* <Icon icon="angleDown" color="secondaryBrand" height={8} /> */}
							</Row>
						</DateButton>
					</Col>
					<Spacing horizontal="m" mobile="s" />
					<TimestampButton onClick={handleClickTimestampPicker}>
						<Row align="center">
							<Icon icon="clockOutlined" color="secondaryBrand" height={25} />
							<Spacing horizontal="s" />
							{/* <Icon icon="angleDown" color="secondaryBrand" height={8} /> */}
						</Row>
					</TimestampButton>
					{showDatePicker && (
						<Relative className="datediv_color">
							<Absolute>
								<DatePickerWrapper
									roundTop
									roundBottom
									// backgroundColor="secondaryBackground"
									horizontalPadding="m"
									verticalPadding="m"
								>
									<RDatePicker
										selected={internalDate}
										onChange={handleChangeDate}
										showTimeInput
										inline
										// showYearDropdown
										scrollableYearDropdown
									/>
									<AcceptButton label="Accept" onClick={handleSubmitDate} />
								</DatePickerWrapper>
							</Absolute>
						</Relative>
					)}
					{showTimestampPicker && (
						<Relative>
							<Absolute>
								<NumberInputWrapper
									roundTop
									roundBottom
									horizontalPadding="m"
									verticalPadding="m"
									// backgroundColor="secondaryBackground"
								>
									<NumberInput label="Timestamp" value={internalTimestamp} onChangeText={setInternalTimestamp} />
									<Text fontSize="xs">Now {Math.round(Date.now() / 1000)}</Text>
									<Spacing vertical="s" />
									<AcceptButton label="Accept" onClick={handleSubmitTimestamp} />
								</NumberInputWrapper>
							</Absolute>
						</Relative>
					)}
				</IconContainer>
			</BorderWrapper>
			<Spacing vertical="s" />
			<Row justify="space-between">
				<Text fontSize="s" color="greeny">
					{moment(date).fromNow()}
				</Text>
				<Text fontSize="s" color="secondary" align="end">
					Timestamp {dateToTimestamp(date)}
				</Text>
			</Row>
		</Col>
	);
};
