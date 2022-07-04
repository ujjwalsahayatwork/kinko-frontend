import { Button } from 'components/button/button';
import { Col } from 'components/col/col';
import { CreationSteps } from 'components/creationSteps/creationSteps';
import { DateTimestampPicker } from 'components/dateTimestampPicker/dateTimestampPicker';
import { DropDown, IDropDownOption } from 'components/dropDown/dropDown';
import { InfoCard } from 'components/infoCard/infoCard';
import { Row } from 'components/row/row';
import { Spacing } from 'components/spacing/spacing';
import { Text } from 'components/text/text';
import { toPx, useDevice } from 'components/utils';
import React, { FC } from 'react';
import styled from 'styled-components';
import "./createPeriod.scss";

const StyledMainCol = styled(Col)`
	width: 100%;
	max-width: 1152px;
	margin: 0 auto;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		
	}
`;

const LeftCol = styled(Col)`
	flex: 1;
`;

const LeftDropDown = styled(Row)`
	flex: 1;

	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		min-width: 100%;
		width: 100%;
	}
`;

const StyledInfoCard = styled(InfoCard)`
	background:  #7079B9;
	opacity: 0.7;
	border-radius: 5px;
	@media (min-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		flex: 1;
	}
`;

const StyledDateLabel = styled(Text)`
	font-style: normal;
	font-weight: 600;
	font-size: 14px;
	color: #828282;
	line-height: 23px;
`;

const NextButton = styled(Button)`
	width: 190px;
	padding: 10px 20px 10px 0px;
	background-color: #F97A48;
	border: 1px solid #F97A48;
	height: 47px;
	text-align: center;
`;

const BackButton = styled(Button)`
	width: 190px;
	padding: 10px 20px 10px 0px;
	/* background-color: #F97A48; */
	border: 1px solid #F97A48;
	height: 47px;
	text-align: center;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;


interface ICreateIloPeriodViewProps {
	startBlockDate: Date | undefined;
	endBlockDate: Date | undefined;
	showAwareness: boolean;
	dateIssue: string;
	liquidityLockPeriodOptions: Array<IDropDownOption<bigint>>;
	selectedLockPeriod: string;
	onChangeStartBlockDate: (date: Date) => void;
	onChangeEndBlockDate: (date: Date) => void;
	onChangeLiquidityLockPeriod: (key: string, payload: bigint) => void;
	onSubmit: () => void;
}

export const CreateIloPeriodView: FC<ICreateIloPeriodViewProps> = ({
	startBlockDate,
	endBlockDate,
	showAwareness,
	dateIssue,
	liquidityLockPeriodOptions,
	selectedLockPeriod,
	onChangeStartBlockDate,
	onChangeEndBlockDate,
	onChangeLiquidityLockPeriod,
	onSubmit,
}) => {
	const { isDesktop } = useDevice();

	return (
		<StyledMainCol>
			<CreationSteps reachedStepType="period" />
			<Spacing vertical="xxl" />
			<Row mobileDirection="column">
				<LeftCol className="bgcolor_hide">
					<StyledDateLabel fontSize="s">
						Start Date
					</StyledDateLabel>
					<DateTimestampPicker date={startBlockDate} onChangeDate={onChangeStartBlockDate} />
				</LeftCol>
			</Row>
			<Spacing vertical="xl" />
			<Row mobileDirection="column">
				<LeftCol>
					<StyledDateLabel fontSize="s">
						End Date
					</StyledDateLabel>
					<DateTimestampPicker date={endBlockDate} onChangeDate={onChangeEndBlockDate} />
				</LeftCol>
			</Row>
			<Spacing vertical="xl" />
			<Row>
				<LeftDropDown>
					<DropDown<bigint>
						label="Lock liquidity for"
						options={liquidityLockPeriodOptions}
						selected={selectedLockPeriod}
						startEmpty={false}
						onSelect={onChangeLiquidityLockPeriod}
					/>
				</LeftDropDown>
			</Row>
			{dateIssue ? (
				<>
					<Spacing horizontal="l" vertical="m" />
					<StyledInfoCard type="alert">
						<Text fontSize="m">{dateIssue}</Text>
					</StyledInfoCard>
				</>
			) : (
				null
			)}
			{showAwareness ? (
				<>
					<Spacing horizontal="l" vertical="m" />
					<StyledInfoCard type="info">
						<Text fontSize="m">
							Presale should ideally start 1 week from today to give you time to raise awareness.
						</Text>
					</StyledInfoCard>
				</>
			) : (
				null
			)}

			<Spacing vertical="xl" />
			<ButtonContainer>
				<BackButton label="Back"  onClick={onSubmit} />
				<NextButton label="Next to Caps" arrow onClick={onSubmit} />
			</ButtonContainer>
			<Spacing vertical="xl" />
		</StyledMainCol>
	);
};
