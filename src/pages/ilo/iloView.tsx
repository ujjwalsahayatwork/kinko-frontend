import React, { FC, useEffect, useMemo, useState } from 'react';
import Svg from 'react-inlinesvg';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import uniqueId from 'lodash/uniqueId';
import moment from 'moment';

import { BaseButton } from 'components/baseButton/baseButton';
import { Col } from 'components/col/col';
import { Doughnut } from 'components/doughnut/doughnut';
import { Icon } from 'components/icon/icon';
import { Link } from 'components/link/link';
import { PercentDoughnut } from 'components/percentDoughnut/percentDoughnut';
import { ProgressBar } from 'components/progressBar/progressBar';
import { Row } from 'components/row/row';
import { Spacing } from 'components/spacing/spacing';
import { Text } from 'components/text/text';
import { toPx, useDevice } from 'components/utils';
import { EXPLORER_URL, IMAGES_URL } from 'constants/env';
import { Buttons } from 'pages/ilo/components/buttons';
import { IIlo } from 'types';
import kinkoLogo from 'assets/images/kinkoLogo.svg';
import './iloView.scss';

const StyledContainer = styled.div`
	width: 100%;
	max-width: 1152px;
	margin: 0 auto;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
	}
	/* padding: 5rem 0;
	margin-bottom: 10rem; */
`;
const ButtonContainer = styled.div`
	display: flex;
	width: 100%;
	/* gap: 10; */
	/* background-color: red; */
	justify-content: space-between;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		flex-direction: column;
	}
	/* padding: 5rem 0;
	margin-bottom: 10rem; */
`;


const StyledColumn = styled(Row)`
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		margin: 0 auto;
		max-width: 100%;
	}
`;
const StyledCol = styled(Col)`
	margin: 0 auto;
`;

const StyledHeader = styled(Col)`
	background: rgb(71 81 168 / 20%);
	border: 1px solid rgb(112 121 185 / 20%);
	border-radius: 0.35rem;
`;

const MainArea = styled(Col) <{ width: number }>`
	max-width: ${({ width }) => toPx(width)};
	background: rgb(71 81 168 / 20%);
	border: 1px solid rgb(112 121 185 / 20%);
	border-radius: 0.35rem;
`;

const StyledHeaderImage = styled.img`
	border-radius: 50%;
	width: 120px;
	height: 120px;
	object-fit: cover;
	margin: 0 auto;
`;

const UnderstandButton = styled(BaseButton)`
	height: 3rem;
	width: 100%;
	min-width: 10rem;
	max-width: 10rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid #f97a48;
	border-radius: 0.35rem;
	background-color: transparent;
`;
const ReferButton = styled(BaseButton)`
width: 30%;
	height: 3rem;
	/* width: 100%; */
	/* min-width: 10rem;
	max-width: 10rem; */
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid #f97a48;
	border-radius: 0.35rem;
	background-color: transparent;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		width: 100%;
	}
`;
const ConnectButton = styled(Buttons)`
    width: 68% !important;
	height: 3rem;
	/* width: 100px; */
	background-color: red;
	/* min-width: 10rem;
	max-width: 10rem; */
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid #f97a48;
	border-radius: 0.35rem;
	background-color: transparent;
`;

const Social = styled(Row)`
	padding-left: ${({ theme }) => toPx(theme.distanceM)};
	padding-right: ${({ theme }) => toPx(theme.distanceM)};
	padding-top: ${({ theme }) => toPx(theme.distanceXS)};
	padding-bottom: ${({ theme }) => toPx(theme.distanceXS)};
`;

const SocialAddress = styled(Text)`
	font-weight: 400;
	margin-left: 1.1rem;
`;
const StyledDesc = styled(Text)`
	font-weight: 600;
	overflow: auto;
	width: 100%;
	height: 2.8rem;
	::-webkit-scrollbar {
		display: none;
	}
`;

const ColorRect = styled.div<{ colorIndex: number }>`
	display: flex;
	background-color: ${({ theme, colorIndex }) => theme.doughnutColors[colorIndex]};
	height: 15px;
	width: 15px;
	border-radius: 100%;
`;

const DoughnutWrapper = styled.div`
	display: flex;
	width: 10rem;
`;

const DataArea = styled(Col)`
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		max-width: 346px;
	}
`;

const DataAreaHeader = styled(Col)`
	background: rgb(71 81 168 / 20%);
	border: 1px solid rgb(112 121 185 / 20%);
	border-radius: 0.35rem;
	padding: 1rem 1.5rem;
`;

const StyledDataCol = styled(Col)`
	background: rgb(71 81 168 / 20%);
	border: 1px solid rgb(112 121 185 / 20%);
	border-radius: 0.35rem;
`;

const StyledDataStatus = styled(Col)`
	border-bottom: 1px solid rgb(112 121 185 / 20%);
`;

const Address = styled(Text)`
	display: inline;
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	background: rgba(2, 34, 63, 0.8);
	border: 1px solid rgb(112 121 185 / 20%);
	border-radius: 0.35rem;
	padding-left: ${({ theme }) => toPx(theme.distanceM)};
	padding-right: ${({ theme }) => toPx(theme.distanceL)};
	padding-top: ${({ theme }) => toPx(theme.distanceS)};
	padding-bottom: ${({ theme }) => toPx(theme.distanceS)};
`;

const CopyButton = styled(BaseButton)`
	background: rgba(2, 34, 63, 0.8);
	border: 1px solid rgb(112 121 185 / 20%);
	border-radius: 0.35rem;
	padding: 0.6rem;
`;

const StyledPercent = styled.div`
	display: flex;
	align-items: center;
`;

const PercentDoughnutWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 60px;
	margin-left: 4rem;
	align-items: center;
`;

const ProgressBarWrapper = styled.div`
	display: flex;
	height: 26px;
	border-radius: 26px;
	overflow: hidden;
`;

const StyledProgressText = styled.div`
	display: flex;
	justify-content: space-between;
`;

const ProgressText = styled(Text)`
	font-weight: 500;
	font-size: 12px;
`;

const StyledProgressBar = styled(ProgressBar)`
	flex: 1;
`;

const TimeLineWrapper = styled(Row)`
	height: 35px;
`;

const HorizontalBarMob = styled.div<{ reached: boolean }>`
	display: flex;
	height: 4px;
	width: 26px;
	background-color: ${({ theme, reached }) => (reached ? theme.secondaryBrandColor : theme.tertiaryBackgroundColor)};
	border-radius: 4px;
`;

const VerticalBarMob = styled.div<{ reached: boolean; roundTop: boolean; roundBottom: boolean }>`
	display: flex;
	height: 42px;
	width: 9px;
	background-color: ${({ theme, reached }) => (reached ? theme.secondaryBrandColor : theme.tertiaryBackgroundColor)};
	border-top-left-radius: ${({ roundTop }) => (roundTop ? '9px' : '0px')};
	border-top-right-radius: ${({ roundTop }) => (roundTop ? '9px' : '0px')};
	border-bottom-left-radius: ${({ roundBottom }) => (roundBottom ? '9px' : '0px')};
	border-bottom-right-radius: ${({ roundBottom }) => (roundBottom ? '9px' : '0px')};
	position: relative;
	::before{
		position: absolute;
		content: "";
		height: 15px;
		width: 15px;
		background: ${({ theme, reached }) => (reached ? theme.secondaryBrandColor : theme.tertiaryBackgroundColor)};
		border-radius: 50px;
		top: 0px;
		left: -3px;
	}
`;

const VerticalBar = styled.div<{ reached: boolean }>`
	display: flex;
	height: 8px;
	width: 80px;
	background-color: ${({ theme, reached }) => (reached ? theme.secondaryBrandColor : theme.tertiaryBackgroundColor)};
	border-radius: 50px;
`;

const HorizontalBar = styled.div<{ reached: boolean; roundTop: boolean; roundBottom: boolean }>`
	display: flex;
	height: 8px;
	width: 100px;
	background-color: ${({ theme, reached }) => (reached ? theme.secondaryBrandColor : theme.tertiaryBackgroundColor)};
	border-radius: 50px;
	position: relative;
	::before{
		position: absolute;
		content: "";
		height: 15px;
		width: 15px;
		background: ${({ theme, reached }) => (reached ? theme.secondaryBrandColor : theme.tertiaryBackgroundColor)};
		border-radius: 50px;
		top: -3px;
		left: -5px;
	}
`;

const VerticalBarSpacing = styled.div<{ reached: boolean }>`
	display: flex;
	height: ${({ theme }) => toPx(theme.distanceS)};
	width: 9px;
	background-color: ${({ theme, reached }) => (reached ? theme.secondaryBrandColor : theme.primaryColor)};
`;

const StyledDivider = styled(Col)`
	border: 1px solid rgb(112 121 185 / 20%);
	height: 100%;
`;

const StyledTimeText = styled(Text)`
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		font-size: 1rem;
	}
`;

const StyledIloText = styled(Text)`
	width: 79px;
	text-align: center;
	padding-top: 15px;
	line-height: 20px;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		font-size: 0.9rem;
	}
`;

const StyledApproxText = styled(Text)`
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		font-size: 0.75rem;
	}
`;
const TimeStatus = styled.div`
display: flex;
justify-content: space-between;
/* border: 1px solid red; */
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		/* font-size: 0.75rem; */
		flex-direction: column;
	}
`;

interface IIloViewProps {
	data: IIlo;
	earlyAccessTokenBalance: BigNumber;
	showSafetyAlert: boolean;
	isConnected: boolean;
	hasEarlyAccess: boolean;
	canClaimTokens: boolean;
	canWithdrawLpTokens: boolean;
	onHideSafetyAlert: () => void;
	onCopySaleTokenAddress: () => void;
	onConnect: () => void;
	onInvest: () => void;
	onFinalise: () => void;
	onClaim: () => void;
	onWithdrawLpTokens: () => void;
}

export const IloView: FC<IIloViewProps> = ({
	data,
	earlyAccessTokenBalance,
	showSafetyAlert,
	isConnected,
	hasEarlyAccess,
	canClaimTokens,
	canWithdrawLpTokens,
	onHideSafetyAlert,
	onCopySaleTokenAddress,
	onConnect,
	onInvest,
	onFinalise,
	onClaim,
	onWithdrawLpTokens,
}) => {
	const {
		startBlockDate,
		endBlockDate,
		iloName,
		liquidityRatePercent,
		numBuyers,
		timeline,
		description,
		telegramURL,
		twitterURL,
		websiteURL,
		saleTokenAddress,
		earlyAccessTokenAmount,
		hardcap,
		softcap,
		totalBaseCollected,
		status,
		round1EndDate,
		lockPeriod,
		maxSpendPerBuyer,
		presaleAmount,
		kinkoTokenFeePercent,
		saleTokenTotalSupply,
		listingRatePercent,
		headerImageFileName,
		baseTokenSymbol,
		saleTokenName,
		saleTokenSymbol,
		totalTokensSold,
		lpGenerationTimestamp,
		addLiquidityTransactionHash,
	} = data;
	const { isDesktop, isMobile } = useDevice();
	const [elementId] = useState(uniqueId('IloView-Col-'));
	const [elementWidth, setElementWidth] = useState(0);

	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			setElementWidth(entries[0].contentRect.width);
		});
		const element = document.getElementById(elementId);
		if (element) {
			resizeObserver.observe(element);
		}

		return () => resizeObserver.disconnect();
	}, [elementId, setElementWidth]);

	const width = useMemo(() => Math.min(elementWidth, 350), [elementWidth]);
	const height = useMemo(() => width * 0.45, [width]);
	const telegramLabel = useMemo(() => {
		const regex = /(?:\/)(?!.*\/)(.*)/gm;
		const matches = regex.exec(telegramURL);
		if (!matches) {
			return '';
		}
		return `@${matches[1]} `;
	}, [telegramURL]);

	const twitterLabel = useMemo(() => {
		const regex = /(?:\/)(?!.*\/)(.*)/gm;
		const matches = regex.exec(twitterURL);
		if (!matches) {
			return '';
		}
		return `@${matches[1]} `;
	}, [twitterURL]);

	const presalePercent = useMemo(
		() => presaleAmount.div(saleTokenTotalSupply).times(100).toNumber(),
		[presaleAmount, saleTokenTotalSupply]
	);

	const liquidityPercent = useMemo(() => {
		const liquidityAmount = presaleAmount
			.times((100 - kinkoTokenFeePercent) / 100)
			.times((100 - listingRatePercent) / 100)
			.times(liquidityRatePercent / 100);
		return new BigNumber(100).div(saleTokenTotalSupply).times(liquidityAmount).toNumber();
	}, [presaleAmount, kinkoTokenFeePercent, listingRatePercent, liquidityRatePercent, saleTokenTotalSupply]);

	const feesPercent = useMemo(() => {
		const feesAmount = presaleAmount.times(kinkoTokenFeePercent / 100);
		return feesAmount.div(saleTokenTotalSupply).times(100).toNumber();
	}, [presaleAmount, kinkoTokenFeePercent, saleTokenTotalSupply]);

	const freePercent = useMemo(
		() => 100 - presalePercent - liquidityPercent - feesPercent,
		[presalePercent, liquidityPercent, feesPercent]
	);

	const doughnutData = useMemo(
		() => [presalePercent, liquidityPercent, feesPercent, freePercent],
		[presalePercent, liquidityPercent, feesPercent, freePercent]
	);

	const lockYears = useMemo(
		() => Math.round(Number(moment.unix(Number(lockPeriod)).diff(moment.unix(0), 'years', true))),
		[lockPeriod]
	);

	const saleTokenLiquidityAmount = useMemo(() => {
		const energyfiTokenFeeAmount = totalTokensSold.times(kinkoTokenFeePercent / 100);
		return totalTokensSold
			.minus(energyfiTokenFeeAmount)
			.times((100 - listingRatePercent) / 100)
			.times(liquidityRatePercent / 100);
	}, [totalTokensSold, kinkoTokenFeePercent, listingRatePercent, liquidityRatePercent]);

	const baseTokenLiquidityAmount = useMemo(() => {
		const energyfiBaseFeeAmount = totalBaseCollected.times(kinkoTokenFeePercent / 100);
		return totalBaseCollected
			.minus(energyfiBaseFeeAmount)
			.times(liquidityRatePercent / 100)
			.times((100 - listingRatePercent) / 100);
	}, [totalBaseCollected, kinkoTokenFeePercent, liquidityRatePercent, listingRatePercent]);

	const lockDate = useMemo(
		() => new Date(Number((lpGenerationTimestamp + lockPeriod) * BigInt(1000))),
		[lpGenerationTimestamp, lockPeriod]
	);

	return (
		<StyledContainer>
			<StyledCol id={elementId} maxWidth className="card_width_body">
				{showSafetyAlert && (
					<StyledHeader horizontalPadding="m" verticalPadding="m">
						<Row mobileDirection="column" align="center" justify="space-around">
							<Text fontSize="xs" className="font-weight-400">
								<Text fontSize="m" fontWeight="bold">
									DYOR
								</Text>
								<Spacing vertical="xs" />
								Investing in an ILO may involve risks. Energyfi is permissionless, anyone can create an ILO, we disclaim
								any responsibility for losses. Do your own research before investing.
							</Text>
							<Spacing horizontal="m" />
							<UnderstandButton className="btn_margin" onClick={onHideSafetyAlert}>
								<Text fontSize="m" fontWeight="normal" color="secondaryBrand">
									I Understand
								</Text>
							</UnderstandButton>
						</Row>
					</StyledHeader>
				)}
				<Spacing vertical="m" />
				<StyledColumn mobileDirection="column">
					<Col flexGrow={isDesktop ? 1 : undefined} align="center">
						<MainArea flexGrow={isDesktop ? 1 : undefined} overflow="hidden" width={width} className="mob_width">
							<Spacing vertical="m" />
							<StyledHeaderImage src={`${IMAGES_URL}/${headerImageFileName}`} alt="ILO" height={height} width={width} />
							<Spacing vertical="m" />
							<Col horizontalPadding="m">
								<Text fontSize="xl" align="center" fontWeight="bold">
									{iloName}
								</Text>
								<Spacing vertical="m" />
								<Row align="center">
									<Address fontSize="s">{saleTokenAddress}</Address>
									<Spacing horizontal="s" />
									<CopyButton onClick={onCopySaleTokenAddress}>
										<Icon icon="copyOutlined" color="primary" height={24} />
									</CopyButton>
								</Row>
								<Spacing vertical="m" />
								<Row align="center">
									<Icon icon="lock" color="secondaryBrand" height={24} />
									<Spacing horizontal="m" />
									<Text fontSize="m" fontWeight="bold">
										{liquidityRatePercent}% Liquidity
									</Text>
								</Row>
							</Col>
							<Spacing vertical="m" />
							{telegramURL && (
								<Link href={telegramURL}>
									<Spacing horizontal="xs" />
									<Social maxWidth>
										<Icon icon="telegram" color="primary" height={24} />
										<SocialAddress fontSize="xs" color="primary">
											{telegramLabel}
										</SocialAddress>
									</Social>
								</Link>
							)}
							{twitterURL && (
								<>
									<Spacing vertical="s" />
									<Link href={twitterURL}>
										<Spacing horizontal="xs" />
										<Social maxWidth>
											<Icon icon="twitter" color="primary" height={22} />
											<SocialAddress fontSize="xs" color="primary">
												{twitterLabel}
											</SocialAddress>
										</Social>
									</Link>
								</>
							)}
							<Spacing vertical="s" />
							<Link href={websiteURL}>
								<Social maxWidth>
									<Spacing horizontal="xs" />
									<Icon icon="globe" color="primary" height={24} />
									<SocialAddress fontSize="xs" color="primary">
										{websiteURL}
									</SocialAddress>
								</Social>
							</Link>
							<Spacing vertical="m" />
							<Col horizontalPadding="m">
								<StyledDesc fontSize="xs">{description}</StyledDesc>
								<Spacing vertical="l" />
								<Row justify="space-around">
									<DoughnutWrapper>
										<Doughnut data={doughnutData} />
									</DoughnutWrapper>
									<Col justify="space-between">
										<Row>
											<ColorRect colorIndex={0} />
											<Spacing horizontal="s" />
											<Text fontSize="xs">Presale</Text>
										</Row>
										<Row>
											<ColorRect colorIndex={1} />
											<Spacing horizontal="s" />
											<Text fontSize="xs">Liquidity</Text>
										</Row>
										<Row>
											<ColorRect colorIndex={2} />
											<Spacing horizontal="s" />
											<Text fontSize="xs">Fees</Text>
										</Row>
										<Row>
											<ColorRect colorIndex={3} />
											<Spacing horizontal="s" />
											<Text fontSize="xs">Free</Text>
										</Row>
									</Col>
								</Row>
							</Col>
							<Spacing vertical="m" />
						</MainArea>
					</Col>
					<Spacing horizontal="m" />
					<Col maxWidth flexGrow={isDesktop ? 1 : undefined}>
						<DataArea maxWidth flexGrow={isDesktop ? 1 : undefined} overflow="hidden" className="mob_width">
							<Col mobileDirection="column-reverse">
								<DataAreaHeader>
									<Col mobileDirection="column">
										<Col>
											{status === 'upcoming' ? (
												<Col>
													<Text fontSize="m" fontWeight="bold">
														Round 1 starts in {moment(startBlockDate).diff(moment(), 'days')} days
													</Text>
													<Text fontSize="s">{startBlockDate.toLocaleString()}</Text>
												</Col>
											) : status === 'round1' ? (
												<Col>
													<Text fontSize="m" fontWeight="bold">
														Round 1 ends in {moment(round1EndDate).diff(moment(), 'days')} days
													</Text>
													<Text fontSize="s">{round1EndDate.toLocaleString()}</Text>
												</Col>
											) : status === 'round2' ? (
												<Col>
													<Text fontSize="s" fontWeight="bold">
														Round 2 ends in {moment(endBlockDate).diff(moment(), 'days')} days
													</Text>
													<Text fontSize="s">{endBlockDate.toLocaleString()}</Text>
												</Col>
											) : status === 'saleDone' ? (
												<Col>
													<Text fontSize="s" fontWeight="bold">
														Round 2 ended
													</Text>
												</Col>
											) : status === 'success' ? (
												<Col>
													<Text fontSize="s" fontWeight="bold">
														ILO Successful
													</Text>
												</Col>
											) : status === 'failed' ? (
												<Col>
													<Text fontSize="s" fontWeight="bold">
														ILO Failed
													</Text>
												</Col>
											) : null}
										</Col>
										<Row maxWidth justify="space-between">
											<StyledPercent className="mob_text_percent">
												<Text fontSize="s" align="start">
													Lock liquidity {lockYears} {lockYears === 1 ? 'year' : 'years'}
												</Text>
												<PercentDoughnutWrapper>
													<PercentDoughnut value={liquidityRatePercent} />
													<Text fontSize="l" fontWeight="bold" color="secondaryBrand">
														{liquidityRatePercent}%
													</Text>
												</PercentDoughnutWrapper>
											</StyledPercent>
											<StyledDivider justify="center" />
											<Col justify="flex-end" className="right_mob_percent">
												<StyledPercent className="text-block">
													<Text align="center" fontSize="s">
														Participants
													</Text>
													<PercentDoughnutWrapper>
														<PercentDoughnut
															value={totalBaseCollected
																.div(maxSpendPerBuyer.times(numBuyers))
																.times(100)
																.integerValue()
																.toNumber()}
														/>
														<Text fontSize="l" fontWeight="bold" color="secondaryBrand">
															{numBuyers}
														</Text>
													</PercentDoughnutWrapper>
												</StyledPercent>
											</Col>
										</Row>
									</Col>
									<Col>
										<Spacing vertical="s" />
										<ProgressBarWrapper>
											<StyledProgressBar
												value={totalBaseCollected.toNumber()}
												max={hardcap.toNumber()}
												color="primaryBrand"
												backgroundColor="secondaryBackground"
											/>
										</ProgressBarWrapper>
										<Spacing vertical="s" />
										<StyledProgressText>
											<ProgressText fontSize="s" color="primary">
												{totalBaseCollected.div(hardcap).times(100).toFixed(1)}%{isDesktop && ' complete'}
											</ProgressText>
											<ProgressText fontSize="s" color="primary">
												{totalBaseCollected.toFixed(3)} ⁄ {hardcap.toFixed(3)} {baseTokenSymbol}
											</ProgressText>
										</StyledProgressText>
									</Col>
								</DataAreaHeader>
								<Spacing className="abc" vertical="s" />
								{isDesktop && (
									<ButtonContainer>
										{/* // <ButtonContainer> */}
										<ConnectButton
											isConnected={isConnected}
											iloStatus={status}
											hasEarlyAccess={hasEarlyAccess}
											canClaimTokens={canClaimTokens}
											canWithdrawLpTokens={canWithdrawLpTokens}
											onConnect={onConnect}
											onInvest={onInvest}
											onFinalise={onFinalise}
											onClaim={onClaim}
											onWithdrawLpTokens={onWithdrawLpTokens}
										/>
										{/* </ButtonContainer> */}
										{/* <Spacing horizontal="s" /> */}
										<ReferButton className="btn_margin" onClick={onHideSafetyAlert}>
											<Text fontSize="m" fontWeight="normal" color="secondaryBrand">
												Refer ILO
											</Text>
										</ReferButton>
									</ButtonContainer>
								)}

							</Col>
							{isMobile && (
								// <>
									<ButtonContainer>
										<Spacing vertical="s" />

										<ConnectButton
											isConnected={isConnected}
											iloStatus={status}
											hasEarlyAccess={hasEarlyAccess}
											canClaimTokens={canClaimTokens}
											canWithdrawLpTokens={canWithdrawLpTokens}
											onConnect={onConnect}
											onInvest={onInvest}
											onFinalise={onFinalise}
											onClaim={onClaim}
											onWithdrawLpTokens={onWithdrawLpTokens}
										/>
										{/* <Spacing horizontal="s" /> */}
										<ReferButton className="btn_margin" onClick={onHideSafetyAlert}>
											<Text fontSize="m" fontWeight="normal" color="secondaryBrand">
												Refer ILO
											</Text>
										</ReferButton>
									</ButtonContainer>
								// </>
							)}
							<Spacing vertical="s" />
							<StyledDataCol>
								<StyledDataStatus verticalPadding="m" horizontalPadding={isDesktop ? 'm' : undefined}>
									{status === 'upcoming' || status === 'round1' ? (
										<>
											<Text fontSize="m" fontWeight="bold">
												Round 1 Requirements
											</Text>
											<Text fontSize="s">
												To participate in round 1 you need to hold at least the specified amount of ONE of the following
												tokens.
											</Text>
											<Row align="center" roundBottom backgroundColor="tertiaryBackground">
												<Spacing horizontal="m" />
												<Svg src={kinkoLogo} height={60} width={60} />
												<Spacing horizontal="s" />
												<Row justify="space-between" maxWidth>
													<Col>
														<Text fontSize="m" fontWeight="bold">
															EFT
														</Text>
														<Text fontSize="s" mobileFontSize="xxs">
															Pancakeswap
														</Text>
													</Col>
													<Col align="flex-end">
														<Text fontSize="m" fontWeight="bold">
															{earlyAccessTokenAmount.toFixed(3)} EFT
														</Text>
														<Text fontSize="s" mobileFontSize="xxs">
															Your balance: {earlyAccessTokenBalance.toFixed(3)}
														</Text>
													</Col>
												</Row>
												<Spacing horizontal="m" />
											</Row>
										</>
									) : status === 'success' ? (
										<Row align="center" className="text_align_mob">
											{/* <Svg src={kinkoLogo} height={60} width={60} /> */}
											<Spacing horizontal="s" />
											<Row justify="space-between" maxWidth mobileDirection="column">
												{/* <Col>
													<Text fontSize="m" fontWeight="bold">
														{saleTokenName}
													</Text>
													<Text fontSize="xs" mobileFontSize="xxs" className="font-weight-400">
														Pancakeswap
													</Text>
												</Col> */}
												<Spacing vertical="m" mobileOnly />
												{/* <Col align={isDesktop ? 'flex-end' : undefined}> */}
												<Col>
													<Text fontSize="xs" style={{ fontWeight: 600 }}>
														{saleTokenLiquidityAmount.toFixed(3)} {saleTokenSymbol} ⁄{' '}
														{baseTokenLiquidityAmount.toFixed(3)} {baseTokenSymbol}
													</Text>
													<Row align="center">
														<Text fontSize="xs" mobileFontSize="xxs" className="font-weight-400">
															Locked until {lockDate.toLocaleString()}
														</Text>
														<Spacing horizontal="s" />
														<Link href={`${EXPLORER_URL}/tx/${addLiquidityTransactionHash}`}>
															<Icon icon="urlRedirect" color="primary" height={20} />
														</Link>
													</Row>
												</Col>
											</Row>
											<Spacing horizontal="m" />
										</Row>
									) : null}
								</StyledDataStatus>
								{isDesktop ? (
									<div>
										<div>
											<div style={{ display: 'flex',justifyContent: "center",marginTop: '43px'}} >
												{timeline.map((item, index) => (
													<HorizontalBar
														reached={item.reached}
														roundTop={index === 0}
														roundBottom={index === timeline.length - 1}
													/>
												))}
											</div>
											<Spacing vertical="s" />

											<div style={{ display: 'flex',paddingTop:'27px',columnGap:'22px',justifyContent: 'flex-start'}}>
												{timeline.map((item, index) => (
													<div>
														<Col align="center">
															<Icon
																icon={item.icon}
																color={item.reached ? 'greeny' : 'tertiaryBackground'}
																width={25}
															/>
														</Col>
														<Col>
															<StyledIloText
																fontSize="xs"
																className="font-weight-400"
																color={item.reached ? 'primary' : 'tertiaryBackground'}
															>
																{item.title}
															</StyledIloText>
															<Text fontSize="xs" color={item.reached ? 'primary' : 'tertiaryBackground'}>
																{item.subtitle}
															</Text>
														</Col>
													</div>
												))}
											</div>
										</div>
										<div>
											<Col horizontalPadding="s" verticalPadding="s">
												<TimeStatus>
													<div>
														<Spacing vertical="l" />

														<StyledTimeText fontSize="m" fontWeight="bold">
															Start time
														</StyledTimeText>
														<StyledApproxText fontSize="xs" className="font-weight-400">
															(Approx: {startBlockDate.toLocaleString()})
														</StyledApproxText>
													</div>
													<div>
														<Spacing vertical="l" />
														<StyledTimeText fontSize="m" fontWeight="bold">
															Softcap
														</StyledTimeText>
														<StyledApproxText fontSize="xs" className="font-weight-400">
															{softcap.toFixed(3)} {baseTokenSymbol}
														</StyledApproxText>
													</div>
												</TimeStatus>
												<TimeStatus>
													<div>
														<Spacing vertical="l" />
														<StyledTimeText fontSize="m" fontWeight="bold">
															End time
														</StyledTimeText>
														<StyledApproxText fontSize="xs" className="font-weight-400">
															(Approx: {endBlockDate.toLocaleString()})
														</StyledApproxText>




													</div>
													<div>
														<Spacing vertical="l" />
														<StyledTimeText fontSize="m" fontWeight="bold">
															Hardcap
														</StyledTimeText>
														<StyledApproxText fontSize="xs" className="font-weight-400">
															{hardcap.toFixed(3)} {baseTokenSymbol}
														</StyledApproxText>
													</div>
												</TimeStatus>
											</Col>
										</div>
									</div>
								) : (
									<Col horizontalPadding={isDesktop ? 'm' : undefined}>
										<Spacing vertical="s" />
										<Row maxWidth>
											<Col horizontalPadding="s" verticalPadding="s">
												<StyledTimeText fontSize="m" fontWeight="bold">
													Start time
												</StyledTimeText>
												<StyledApproxText fontSize="xs" className="font-weight-400">
													(Approx: {startBlockDate.toLocaleString()})
												</StyledApproxText>
												<Spacing vertical="l" />
												<StyledTimeText fontSize="m" fontWeight="bold">
													End time
												</StyledTimeText>
												<StyledApproxText fontSize="xs" className="font-weight-400">
													(Approx: {endBlockDate.toLocaleString()})
												</StyledApproxText>
												<Spacing vertical="l" />
												<StyledTimeText fontSize="m" fontWeight="bold">
													Softcap
												</StyledTimeText>
												<StyledApproxText fontSize="xs" className="font-weight-400">
													{softcap.toFixed(3)} {baseTokenSymbol}
												</StyledApproxText>
												<Spacing vertical="l" />
												<StyledTimeText fontSize="m" fontWeight="bold">
													Hardcap
												</StyledTimeText>
												<StyledApproxText fontSize="xs" className="font-weight-400">
													{hardcap.toFixed(3)} {baseTokenSymbol}
												</StyledApproxText>
											</Col>
											<Spacing vertical="l" mobileOnly />
											<Col align={isDesktop ? 'center' : undefined} maxWidth>
												<Col>
													{timeline.map((item, index) => (
														<Col key={item.title}>
															{/* {index > 0 && <VerticalBarSpacing reached={item.reached} />} */}
															<TimeLineWrapper align="center">
																<VerticalBarMob
																	reached={item.reached}
																	roundTop={index === 0}
							 										roundBottom={index === timeline.length - 1}
																/>
																<Spacing horizontal="s" />
																{/* <HorizontalBarMob reached={item.reached} /> */}
																<Spacing horizontal="s" />
																<Icon
																	icon={item.icon}
																	color={item.reached ? 'greeny' : 'tertiaryBackground'}
																	width={25}
																	className="ilo_cup_icon"
																/>
																<Spacing horizontal="s" />
																<Col>
																	<StyledIloText
																		fontSize="xs"
																		className="font-weight-400"
																		color={item.reached ? 'primary' : 'tertiaryBackground'}
																	>
																		{item.title}
																	</StyledIloText>
																	<Text fontSize="xs" color={item.reached ? 'primary' : 'tertiaryBackground'}>
																		{item.subtitle}
																	</Text>
																</Col>
															</TimeLineWrapper>
															{/* {index < timeline.length - 1 && <VerticalBarSpacing reached={item.reached} />} */}
														</Col>
													))}
												</Col>
											</Col>
										</Row>
										<Spacing vertical="s" />
									</Col>
								)}
							</StyledDataCol>
						</DataArea>
					</Col>
				</StyledColumn>
			</StyledCol>
		</StyledContainer>
	);
};
