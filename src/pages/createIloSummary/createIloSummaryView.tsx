import BigNumber from 'bignumber.js';
import { Button } from 'components/button/button';
import { Col } from 'components/col/col';
import { CreationSteps } from 'components/creationSteps/creationSteps';
import { Doughnut } from 'components/doughnut/doughnut';
import { InfoCard } from 'components/infoCard/infoCard';
import { Row } from 'components/row/row';
import { Spacing } from 'components/spacing/spacing';
import { Text } from 'components/text/text';
import { toPx, useDevice } from 'components/utils';
import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import "./createSummary.scss";

const StyledMainCol = styled(Col)`
	width: 100%;
	max-width: 1152px;
	margin: 0 auto;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		
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
	width: 120px;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		height: 25px;
		width: 260px;
		color: red;
	}
`;

const NextButton = styled(Button)`
	width: 170px;
	background-color: #F97A48;
	border: 1px solid #F97A48;
	height: 47px;
	padding: 10px 20px 10px 0px;
	text-align: center;
`;
const BackButton = styled(Button)`
	width: 170px;
	border: 1px solid #F97A48;
	height: 47px;
	padding: 10px 20px 10px 0px;
	text-align: center;
`;

const Forcolor = styled.div`
	display: flex;
	flex-direction: column;
	width: 350px;
	gap: 10px;
	color: white;
	font-size: 18px;
	justify-content: space-between;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
	font-size: 16px;

	}
`;

const StyledCardBox = styled.div`
	display: flex;
	
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
`;

const StyledCardRow = styled(Row)`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const ButtonsContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const StyledCard = styled(Col)`
	background: #002545;
	border: 1px solid #4B4B4B;
	border-radius: 5px;
	padding: 1rem;
	height: 50px;
	max-width: 350px;
	min-width: 300px;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		display: flex;
		flex-direction: column;
		max-width: 320px;
		min-width: 320px;
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
		<StyledMainCol className="input_bg_color w-100">
			<CreationSteps reachedStepType="summary" />


			<Spacing vertical="xl" mobile="l" />
			{/* <Row justify="space-between" mobileDirection="column"> */}
			<Col mobileDirection="column-reverse">
				<Row mobileDirection="row-reverse" justify={isMobile ? 'center' : undefined}>
					<Row justify="space-between">
						<Row align="center">
							<Forcolor>
								Presale
								<ColorRect colorIndex={0} />
							</Forcolor>
						</Row>
						<Spacing vertical="m" />
						<Row align="center">
							<Forcolor>
								Liquidity
								<ColorRect colorIndex={1} />
							</Forcolor>
						</Row>
						<Spacing vertical="m" />

						<Row align="center">
							<Forcolor>
								Fees
								<ColorRect colorIndex={2} />
							</Forcolor>
						</Row>
						<Spacing vertical="m" />
						<Row align="center">
							<Forcolor>
								Free
								<ColorRect colorIndex={3} />
							</Forcolor>
						</Row>
						<Spacing vertical="m" />
					</Row>
				</Row>
			</Col>
			<Spacing horizontal="m" vertical="l" />
			<StyledCardBox>
				<StyledCardRow>
					<StyledCard>
						<Text fontSize="s" fontWeight="normal" whiteSpace="nowrap" className='mob_text_size'>
							Total {saleTokenSymbol} required
						</Text>
						<Spacing vertical="s" />
						<Text fontSize="l" fontWeight="bold" color="greeny">
							{saleTokenTotalRequired.toFixed(3)} {saleTokenSymbol}
						</Text>
						<Spacing vertical="s" />
					</StyledCard>
					<StyledCard>
						<Text fontSize="s" fontWeight="normal" whiteSpace="nowrap" className='mob_text_size'>
							Amount for sale
						</Text>
						<Spacing vertical="s" />

						<Text fontSize="l" fontWeight="bold" color="greeny">
							{presaleAmount.toFixed(3)} {saleTokenSymbol}
						</Text>
						<Spacing vertical="s" />
					</StyledCard>
				</StyledCardRow>
				{
					isDesktop && <Spacing vertical="m" horizontal="m" mobile="s" />
				}
				<StyledCardRow>
					<StyledCard>
						<Text fontSize="s" fontWeight="normal" whiteSpace="nowrap" className='mob_text_size'>
							Amount for liquidity
						</Text>
						<Spacing vertical="s" />

						<Text fontSize="l" fontWeight="bold" color="greeny">
							{liquidityAmount.toFixed(3)} {saleTokenSymbol}
						</Text>
						<Spacing vertical="s" />
					</StyledCard>
					<StyledCard>
						<Text fontSize="s" fontWeight="normal" whiteSpace="nowrap" className='mob_text_size'>
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
			{/* </Row> */}
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
			<Spacing vertical="l" />

			<ButtonsContainer>
				<BackButton label="Back" onClick={onSubmit} />
				<NextButton label="Next to Caps" arrow onClick={onSubmit} />
			</ButtonsContainer>
			<Spacing vertical="xl" />
		</StyledMainCol>
	);
};
