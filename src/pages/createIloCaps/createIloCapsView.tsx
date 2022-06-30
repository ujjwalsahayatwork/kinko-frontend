import BigNumber from 'bignumber.js';
import { Button } from 'components/button/button';
import { Col } from 'components/col/col';
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
import "./createCaps.scss";

const StyledMainCol = styled(Col)`
	width: 100%;
	max-width: 1152px;
	margin: 0 auto;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		
	}
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
`

const RightRow = styled(Row)`
	flex: 1;
	border-radius: .350rem;
	background: #252123;
	border: 0.901596px solid #4B4B4B;
`;

const StyledCurrency = styled(CurrencyInput)`
	flex: 1;
`;

const StyledInfoCard = styled(InfoCard)`
	flex: 1;
	background: rgba(164, 102, 255, 0.3);
`;

const NextButton = styled(Button)`
	width: 170px;
	padding: 10px 20px 10px 0px;
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
		<StyledMainCol className="input_bg_color w-100">
			<CreationSteps reachedStepType="caps" />
			<Spacing vertical="xxl" />
			<Row>
				<LeftSide className="bgcolor_hide">
					<Row mobileDirection="column">
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
					</Row>
				</LeftSide>
			</Row>
			<Spacing vertical="xl" />
			<Row>
				<LeftSide>
					<StyledTextHeading fontSize="m">
						Percent of raised {baseTokenSymbol} used for liquidity
					</StyledTextHeading>
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
					<StyledTextHeading fontSize="m">
						Listing rate
					</StyledTextHeading>
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
						<StyledTextHeading fontSize="m">
							Hardcap
						</StyledTextHeading>
						<Spacing vertical="s" />
						<Text fontSize="m" color="secondaryBrand">
							{hardcap.toFixed(3)} {baseTokenSymbol}
						</Text>
					</Col>
					<Spacing horizontal="m" />
				</RightRow>
				<RightRow shadow backgroundColor="secondaryBackground" verticalPadding="m">
					<Spacing horizontal="m" />
					<Col>
						<StyledTextHeading fontSize="m">
							Presale rate
						</StyledTextHeading>
						<Spacing vertical="s" />
						<Row>
							<Text fontSize="m">1 {baseTokenSymbol} =&nbsp;</Text>
							<Text fontSize="m" color="secondaryBrand">
								{presaleRate.toFixed(3)} {saleTokenSymbol}
							</Text>
						</Row>
					</Col>
					<Spacing horizontal="m" />
				</RightRow>
				<RightRow shadow backgroundColor="secondaryBackground" verticalPadding="m">
					<Spacing horizontal="m" />
					<Col>
						<StyledTextHeading fontSize="m">
							Listing rate
						</StyledTextHeading>
						<Spacing vertical="s" />
						<Row>
							<Text fontSize="m">1 {baseTokenSymbol} =&nbsp;</Text>
							<Text fontSize="m" color="secondaryBrand">
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
			<Spacing vertical="xl" />
			<Row>
				<LeftSide className="bgcolor_hide">
					<StyledCurrency
						label="Max allocaton per user"
						value={maxSpendPerBuyer}
						currency={baseTokenSymbol}
						errorMessage={maxSpendPerBuyerIssue}
						onChangeText={onChangeMaxSpendPerBuyer}
						onMax={onMaxSpendPerBuyer}
					/>
				</LeftSide>
				{isDesktop ? (
					<>
						<Spacing horizontal="l" />
						<RightCol horizontalPadding="m" verticalPadding="m" />
						<Row justify={isDesktop ? 'flex-end' : 'center'}>
							<NextButton label="Next to Period" arrow onClick={onSubmit} />
						</Row>
					</>
				) : (
					<>
						<Spacing vertical="xl" />
						<Row justify={isDesktop ? 'flex-end' : 'center'}>
							<NextButton label="Next to Period" arrow onClick={onSubmit} />
						</Row>
					</>
				)
				}
			</Row>
			<Spacing vertical="xl" />
		</StyledMainCol>
	);
};
