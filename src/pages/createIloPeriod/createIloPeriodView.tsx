import { Button } from 'components/button/button';
import { Col } from 'components/col/col';
import { CreationMobileSteps } from 'components/creationSteps/creationMobileSteps';
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

const StyledCreateIlo = styled(Text)`
	font-family: 'Sora';
	font-style: normal;
	font-weight: 400;
	font-size: 24px;
	line-height: 30px;
`;

const SubText = styled(Text)`
	font-family: 'Sora';
	font-weight: 400;
	font-size: 14px !important;
	line-height: 18px;
	color: #7079b9;
`;

const HorizontalLine = styled.div`
	background: rgba(112, 121, 185, 0.3);
	height: 1.5px;
`;

const VerticalLine = styled.div`
	background: rgba(112, 121, 185, 0.3);
	width: 1.5px;
`;

const BoxContain = styled.div`
	max-width: 605px;
`;

const Box = styled.div`
	display: grid;
	grid-template-columns: 18% 3% 75%;
	gap: 1rem;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		grid-template-columns: 100%;
		margin: auto;
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
	border-radius: 5px;
	@media (min-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		flex: 1;
	}
`;

const StyledDateLabel = styled(Text)`
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	color: #828282;
	line-height: 23px;
`;

const NextButton = styled(Button)`
	box-sizing: border-box;
	width: 175px;
	height: 47px;
	background: #ed4c3a;
	border: 1px solid #ed4c3a;
	border-radius: 5px;
	text-align: center;
	padding-left: 15px;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		width: 175px;
	}
`;

const BackButton = styled(Button)`
	border: 1px solid #ed4c3a;
	border-radius: 5px;
	width: 172px;
	height: 47px;
	/* padding: 10px 20px 10px 0px; */
	text-align: center;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		width: 120px;
	}
`;

// const ButtonContainer = styled.div`
// 	display: flex;
// 	justify-content: space-between;
// `;


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
			<Spacing vertical="s" />
			{isDesktop && (
				<>
					<Row>
						<StyledCreateIlo fontSize="xxl" className="" fontWeight="bold" backgroundColor="transparent">
							Create ILO
						</StyledCreateIlo>
					</Row>
					<Spacing vertical="s" />
					<SubText fontSize="xs">Follow the simple 5 steps to create your ILO</SubText>
					<Spacing vertical="m" />
					<HorizontalLine />
				</>
			)}
			<Box>
				{isDesktop ? (
					<>
						<Col>
							<Spacing vertical="l" />
							<CreationSteps reachedStepType="period" />
						</Col>
						<VerticalLine />
					</>
				) : (
					<CreationMobileSteps reachedStepType="period" />
				)}
				<BoxContain>
					<Spacing vertical="m" />
					<Row mobileDirection="column">
						<LeftCol>
							<StyledDateLabel fontSize="s">
								Start Date
							</StyledDateLabel>
							<DateTimestampPicker date={startBlockDate} onChangeDate={onChangeStartBlockDate} />
						</LeftCol>
					</Row>
					<Spacing vertical="l" />
					<Row mobileDirection="column">
						<LeftCol>
							<StyledDateLabel fontSize="s">
								End Date
							</StyledDateLabel>
							<DateTimestampPicker date={endBlockDate} onChangeDate={onChangeEndBlockDate} />
						</LeftCol>
					</Row>
					<Spacing vertical="l" />
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
					{showAwareness ? (
						<>
							<Spacing horizontal="l" vertical="m" />
							<StyledInfoCard type="info">
								<Text fontSize="m" color='primary'>
									Presale should ideally start 1 week from today to give you time to raise awareness.
								</Text>
							</StyledInfoCard>
						</>
					) : (
						null
					)}
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
					<Spacing vertical="l" desktopOnly />
					<Spacing vertical="m" mobileOnly />
					<Row align={isDesktop ? undefined : 'center'} justify={isDesktop ? 'space-between' : 'space-between'}>
						<BackButton label="Back" onClick={onSubmit} />
						<NextButton label="Next to Period" arrow onClick={onSubmit} />
					</Row>
					<Spacing vertical="xl" />
				</BoxContain>
			</Box>
			<Spacing vertical="xl" />

		</StyledMainCol>
	);
};
