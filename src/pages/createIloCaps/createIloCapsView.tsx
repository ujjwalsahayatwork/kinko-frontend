import BigNumber from 'bignumber.js';
import { Button } from 'components/button/button';
import { Col } from 'components/col/col';
import { CreationMobileSteps } from 'components/creationSteps/creationMobileSteps';
import { CreationSteps } from 'components/creationSteps/creationSteps';
import { CurrencyInput } from 'components/currencyInput/currencyInput';
import { InfoCard } from 'components/infoCard/infoCard';
import { Row } from 'components/row/row';
import { Slider } from 'components/slider/slider';
import { Spacing } from 'components/spacing/spacing';
import { Text } from 'components/text/text';
import { toPx, useDevice } from 'components/utils';
import React, { FC } from 'react';
import styled from 'styled-components';
import './createCaps.scss';

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

const LeftSide = styled(Col)`
	flex: 2;

	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		width: 100%;
	}
`;

const RightCol = styled(Col)`
	flex: 1;
`;

const StyledCardBox = styled.div`
	display: flex;
	gap: 1.5rem;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		flex-direction: column;
	}
`;

const RightRow = styled(Row)`
	flex: 1;
	border-radius: 0.35rem;
	background: #002545;
	border: 1px solid #7079b9;
`;

const StyledCurrency = styled(CurrencyInput)`
	flex: 1;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
	}
`;

const StyledInfoCard = styled(InfoCard)`
	flex: 1;
	background: #7079b9;
	opacity: 0.7;
`;
const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const NextButton = styled(Button)`
	box-sizing: border-box;
	width: 172px;
	height: 47px;
	background: #f97a48;
	border: 1px solid #f97a48;
	border-radius: 5px;
	text-align: center;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		background: transparent;
	}
`;

const BackButton = styled(Button)`
	border: 1px solid #f97a48;
	border-radius: 5px;
	width: 172px;
	height: 47px;
	/* padding: 10px 20px 10px 0px; */
	text-align: center;
`;

const StyledTextHeading = styled(Text)`
	font-style: normal;
	font-weight: 600;
	font-size: 18px;
	line-height: 23px;
`;

const StyledInfoText = styled(Text)`
	display: flex;
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 17px;
`;

interface ICreateIloCapsViewProps {
	saleTokenSymbol: string;
	baseTokenSymbol: string;
	softcap: string;
	softcapIssue: string;
	tokenPrice: string;
	tokenPriceIssue: string;
	hardcap: BigNumber;
	minLiquidityRatePercent: number;
	maxLiquidityRatePercent: number;
	liquidityRatePercent: number;
	presaleRate: BigNumber;
	minListingRatePercent: number;
	maxListingRatePercent: number;
	listingRatePercent: number;
	listingRateAmount: BigNumber;
	additionalTokenAmount: BigNumber;
	maxSpendPerBuyer: string;
	maxSpendPerBuyerIssue: string;
	onChangeSoftcap: (softcap: string) => void;
	onChangeTokenPrice: (tokenPrice: string) => void;
	onChangeLiquidityRatePercent: (liquidityRatePercent: number) => void;
	onDecLiquidityRatePercent: () => void;
	onIncLiquidityRatePercent: () => void;
	onChangeListingRatePercent: (listingRate: number) => void;
	onDecListingRatePercent: () => void;
	onIncListingRatePercent: () => void;
	onChangeMaxSpendPerBuyer: (maxSpendPerBuyer: string) => void;
	onMaxSpendPerBuyer: () => void;
	onSubmit: () => void;
}

export const CreateIloCapsView: FC<ICreateIloCapsViewProps> = ({
	saleTokenSymbol,
	baseTokenSymbol,
	softcap,
	softcapIssue,
	tokenPrice,
	tokenPriceIssue,
	hardcap,

	minLiquidityRatePercent,
	maxLiquidityRatePercent,
	liquidityRatePercent,
	presaleRate,
	minListingRatePercent,
	maxListingRatePercent,
	listingRatePercent,
	listingRateAmount,
	additionalTokenAmount,
	maxSpendPerBuyer,
	maxSpendPerBuyerIssue,
	onChangeSoftcap,
	onChangeTokenPrice,
	onChangeLiquidityRatePercent,
	onDecLiquidityRatePercent,
	onIncLiquidityRatePercent,
	onChangeListingRatePercent,
	onDecListingRatePercent,
	onIncListingRatePercent,
	onChangeMaxSpendPerBuyer,
	onMaxSpendPerBuyer,
	onSubmit,
}) => {
	const { isDesktop, isMobile } = useDevice();

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
							<CreationSteps reachedStepType="caps" />
						</Col>
						<VerticalLine />
					</>
				) : (
					<CreationMobileSteps reachedStepType="caps" />
				)}
				<BoxContain>
					<Spacing vertical="l" />
					<Row>
						<LeftSide>
							<StyledCurrency
								label="Softcap"
								value={softcap}
								currency={baseTokenSymbol}
								errorMessage={softcapIssue}
								onChangeText={onChangeSoftcap}
							/>
							<Spacing horizontal="m" />
							<Spacing vertical="l" />
							<StyledCurrency
								label="IDO price"
								value={tokenPrice}
								currency={baseTokenSymbol}
								errorMessage={tokenPriceIssue}
								onChangeText={onChangeTokenPrice}
							/>
						</LeftSide>
					</Row>
					<Spacing vertical="l" />
					<Row>
						<LeftSide>
							<StyledTextHeading fontSize="m">Percent of raised {baseTokenSymbol} used for liquidity</StyledTextHeading>
							<Spacing vertical="m" />
							<Slider
								min={minLiquidityRatePercent}
								max={maxLiquidityRatePercent}
								value={liquidityRatePercent}
								size={isMobile ? 's' : 's'}
								unit="%"
								lineNum={16}
								lineText={(index: number) => `${minLiquidityRatePercent + 5 * index}%`}
								onChange={onChangeLiquidityRatePercent}
								onDec={onDecLiquidityRatePercent}
								onInc={onIncLiquidityRatePercent}
							/>
						</LeftSide>
					</Row>
					<Spacing vertical="xl" />
					<Row>
						<LeftSide>
							<StyledTextHeading fontSize="m">Listing rate</StyledTextHeading>
							<Spacing vertical="m" />
							<Slider
								min={minListingRatePercent}
								max={maxListingRatePercent}
								value={listingRatePercent}
								size={isMobile ? 's' : 's'}
								unit="%"
								lineNum={11}
								lineText={(index: number) => (index % 2 ? '' : `${minListingRatePercent + 5 * index}%`)}
								onChange={onChangeListingRatePercent}
								onDec={onDecListingRatePercent}
								onInc={onIncListingRatePercent}
							/>
						</LeftSide>
					</Row>
					<Spacing vertical="l" />
					<StyledCardBox>
						<RightRow shadow backgroundColor="secondaryBackground" verticalPadding="m">
							<Spacing horizontal="m" />
							<Col>
								<StyledTextHeading fontSize="m">Hardcap</StyledTextHeading>
								<Spacing vertical="s" />
								<Text fontSize="m" color="greeny">
									{hardcap.toFixed(3)} {baseTokenSymbol}
								</Text>
							</Col>
							<Spacing horizontal="m" />
						</RightRow>
						<RightRow shadow backgroundColor="darkPurple" verticalPadding="m">
							<Spacing horizontal="m" />
							<Col>
								<StyledTextHeading fontSize="m">Presale rate</StyledTextHeading>
								<Spacing vertical="s" />
								<Row>
									<Text fontSize="m">1 {baseTokenSymbol} =&nbsp;</Text>
									<Text fontSize="m" color="greeny">
										{presaleRate.toFixed(3)} {saleTokenSymbol}
									</Text>
								</Row>
							</Col>
							<Spacing horizontal="m" />
						</RightRow>
						<RightRow shadow backgroundColor="secondaryBackground" verticalPadding="m">
							<Spacing horizontal="m" />
							<Col>
								<StyledTextHeading fontSize="m">Listing rate</StyledTextHeading>
								<Spacing vertical="s" />
								<Row>
									<Text fontSize="m">1 {baseTokenSymbol} =&nbsp;</Text>
									<Text fontSize="m" color="greeny">
										{listingRateAmount.toFixed(3)} {saleTokenSymbol}
									</Text>
								</Row>
							</Col>
							<Spacing horizontal="m" />
						</RightRow>
					</StyledCardBox>
					<Spacing vertical="l" />
					<StyledInfoCard type="info">
						<Col>
							<StyledInfoText fontSize="s">
								Additional tokens required for liquidity if hardcap is met
								<Spacing horizontal="s" />
								{additionalTokenAmount.toFixed(3)} {saleTokenSymbol}
							</StyledInfoText>
						</Col>
					</StyledInfoCard>
					<Spacing vertical="l" desktopOnly />
					<Row align={isDesktop ? undefined : 'center'} justify={isDesktop ? 'space-between' : 'center'}>
						{isDesktop && <BackButton label="Back" onClick={onSubmit} />}
						<NextButton label="Next to Period" arrow onClick={onSubmit} />
					</Row>
				</BoxContain>
			</Box>
			<Spacing vertical="xl" />
		</StyledMainCol>
	);
};
