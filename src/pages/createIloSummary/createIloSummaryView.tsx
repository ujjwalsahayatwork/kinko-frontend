import BigNumber from 'bignumber.js';
import { Button } from 'components/button/button';
import { Col } from 'components/col/col';
import { CreationMobileSteps } from 'components/creationSteps/creationMobileSteps';
import { CreationSteps } from 'components/creationSteps/creationSteps';
import { Doughnut } from 'components/doughnut/doughnut';
import { InfoCard } from 'components/infoCard/infoCard';
import { Row } from 'components/row/row';
import { Spacing } from 'components/spacing/spacing';
import { Text } from 'components/text/text';
import { toPx, useDevice } from 'components/utils';
import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import './createSummary.scss';

const StyledMainCol = styled(Col)`
	width: 100%;
	max-width: 1152px;
	margin: 0 auto;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		width: 100%;
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
const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between !important;
`;

const BoxContain = styled.div`
	max-width: 650px;
	display: flex;
	flex-direction: column;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		max-width: 100%;
		align-items: center;
	}
`;

const Box = styled.div`
	display: grid;
	grid-template-columns: 18% 3% 75%;
	gap: 1rem;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		grid-template-columns: 100%;
	}
`;

const StyledStatus = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		flex-direction: column;
		align-items: center;
	}
`;

const DoughnutWrapper = styled.div`
	display: flex;
	width: 300px;

	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		width: 140px;
	}
`;

const ColorRect = styled.div<{ colorIndex: number }>`
	display: flex;
	background-color: ${({ theme, colorIndex }) => theme.doughnutColors[colorIndex]};
	height: 30px;
	border-radius: 5px;
	width: 150px;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		height: 25px;
		width: 200px;
		color: red;
	}
`;

const NextButton = styled(Button)`
	box-sizing: border-box;
	width: 172px;
	height: 47px;
	background: #f97a48;
	border: 1px solid #f97a48;
	border-radius: 5px;
	text-align: center;
	padding-left: 15px;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		width: 150px;
	}
`;

const BackButton = styled(Button)`
	border: 1px solid #f97a48;
	border-radius: 5px;
	width: 172px;
	height: 47px;
	/* padding: 10px 20px 10px 0px; */
	text-align: center;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		width: 150px;
	}
`;

const Forcolor = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 10px;
	color: white;
	font-size: 18px;
	justify-content: space-between;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		font-size: 16px;
		display: grid;
		max-width: 250px;
		justify-content: center;
		grid-template-columns: 30% 70%;
	}
`;

const StyledCardBox = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	justify-content: space-between;
	gap: 1rem;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		display: flex;
		width: 100%;
		flex-direction: column;
		gap: 1rem;
	}
`;

const StyledCardRow = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		display: flex;
	}
`;

const ButtonsContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const StyledCard = styled(Col)`
	background: #002545;
	border: 1px solid #4b4b4b;
	border-radius: 5px;
	padding: 1rem;
	height: 50px;
	/* width: 100%; */
	max-width: 280px;
	min-width: 280px;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-width: 210px;
	}
`;

interface ICreateIloSummaryViewProps {
	saleTokenSymbol: string;
	presalePercent: number;
	liquidityPercent: number;
	feesPercent: number;
	freePercent: number;
	saleTokenTotalRequired: BigNumber;
	presaleAmount: BigNumber;
	liquidityAmount: BigNumber;
	feesAmount: BigNumber;
	showDEVIssue: boolean;
	onSubmit: () => void;
}

export const CreateIloSummaryView: FC<ICreateIloSummaryViewProps> = ({
	saleTokenSymbol,
	presalePercent,
	liquidityPercent,
	feesPercent,
	freePercent,
	saleTokenTotalRequired,
	presaleAmount,
	liquidityAmount,
	feesAmount,
	showDEVIssue,
	onSubmit,
}) => {
	const { isDesktop, isMobile } = useDevice();

	const doughnutData = useMemo(
		() => [presalePercent, liquidityPercent, feesPercent, freePercent],
		[presalePercent, liquidityPercent, feesPercent, freePercent]
	);

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
							<CreationSteps reachedStepType="summary" />
						</Col>
						<VerticalLine />
					</>
				) : (
					<CreationMobileSteps reachedStepType="summary" />
				)}
				<BoxContain>
					<Spacing vertical="m" />
					<StyledStatus>
						<Forcolor>
							Presale
							<ColorRect colorIndex={0} />
						</Forcolor>
						<Spacing vertical="m" />
						<Forcolor>
							Liquidity
							<ColorRect colorIndex={1} />
						</Forcolor>
						<Spacing vertical="m" />
						<Forcolor>
							Fees
							<ColorRect colorIndex={2} />
						</Forcolor>
						<Spacing vertical="m" />
						<Forcolor>
							Free
							<ColorRect colorIndex={3} />
						</Forcolor>
					</StyledStatus>
					<Spacing horizontal="m" vertical="l" />
					<Row justify={isDesktop ? 'center' : 'space-between'}>
						<StyledCardBox>
							<StyledCardRow>
								<StyledCard>
									<Text fontSize="s" fontWeight="normal" whiteSpace="nowrap" className="mob_text_size">
										Total {saleTokenSymbol} required
									</Text>
									<Spacing vertical="s" />
									<Text fontSize="l" fontWeight="bold" color="greeny">
										{saleTokenTotalRequired.toFixed(3)} {saleTokenSymbol}
									</Text>
									<Spacing vertical="s" />
								</StyledCard>
								<StyledCard>
									<Text fontSize="s" fontWeight="normal" whiteSpace="nowrap" className="mob_text_size">
										Amount for sale
									</Text>
									<Spacing vertical="s" />

									<Text fontSize="l" fontWeight="bold" color="greeny">
										{presaleAmount.toFixed(3)} {saleTokenSymbol}
									</Text>
									<Spacing vertical="s" />
								</StyledCard>
							</StyledCardRow>
							<StyledCardRow>
								<StyledCard>
									<Text fontSize="s" fontWeight="normal" whiteSpace="nowrap" className="mob_text_size">
										Amount for liquidity
									</Text>
									<Spacing vertical="s" />

									<Text fontSize="l" fontWeight="bold" color="greeny">
										{liquidityAmount.toFixed(3)} {saleTokenSymbol}
									</Text>
									<Spacing vertical="s" />
								</StyledCard>
								<StyledCard>
									<Text fontSize="s" fontWeight="normal" whiteSpace="nowrap" className="mob_text_size">
										Fees
									</Text>
									<Spacing vertical="s" />

									<Text fontSize="l" fontWeight="bold" color="greeny">
										{feesAmount.toFixed(3)} {saleTokenSymbol}
									</Text>
									<Spacing vertical="s" />
								</StyledCard>
							</StyledCardRow>
						</StyledCardBox>
					</Row>

					{showDEVIssue && (
						<>
							<Spacing vertical="xl" mobile="m" />
							<InfoCard type="issue">
								<Text fontSize="m">
									You do not have enough GLMR in your wallet to perform this transaction. 1.5 GLMR required.
								</Text>
							</InfoCard>
						</>
					)}
					<Spacing vertical="l" desktopOnly />
					<Spacing vertical="m" mobileOnly />
					<Row align={isDesktop ? undefined : 'center'} justify={isDesktop ? 'space-between' : 'space-between'}>
						<BackButton label="Back" onClick={onSubmit} />
						<NextButton label="Next to Period" arrow onClick={onSubmit} />
					</Row>
				</BoxContain>
			</Box>
			<Spacing vertical="xl" />
		</StyledMainCol>
	);
};
