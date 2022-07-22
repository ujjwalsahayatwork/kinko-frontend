import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Col } from 'components/col/col';
import { Icon } from 'components/icon/icon';
import { ProgressBar } from 'components/progressBar/progressBar';
import { RouterLink } from 'components/routerLink/routerLink';
import { Row } from 'components/row/row';
import { Spacing } from 'components/spacing/spacing';
import { Text } from 'components/text/text';
import { IMAGES_URL } from 'constants/env';
import { IIlo } from 'types';
import iloImage from '../../../assets/images/demoImage.png';

const StyledCard = styled(Col)`
	margin: 10px;
	border: 1px solid transparent;
	:hover {
		border: 1px solid #4650a8;
		border-radius: 0.8rem;
		.card_bg {
			background: #4650a8 !important;
			border: 1px solid #4650a8;
			border-top: none;
		}
		.progress_bar {
			background: #120d25 !important;
		}
		.divider {
			background: #ffffff !important;
			mix-blend-mode: overlay;
		}
	}
`;

const StyledHeaderRow = styled(Row)``;
const Header = styled(Text)`
	display: flex;
	align-items: center;
	height: 20px;
	position: absolute;
	margin-top: 4rem;
	margin-right: 1rem;
	background-color: #fccd13;
	padding: 0.2rem 0.5rem;
	border-radius: 100px;
	color: black;
	font-size: 0.67rem;
`;

const Image = styled.img`
	border-top-left-radius: 0.7rem;
	border-top-right-radius: 0.7rem;
`;

const TitleWrapper = styled(Row)`
	min-height: 2.5rem;
	padding: 0.5rem 1rem 0.5rem 0.5rem;
`;

const StyledCardBackground = styled.div`
	background: #1b1632;
	height: 12.9rem;
	border: 1px solid #3f3955;
	border-top: none;
	border-bottom-left-radius: 0.7rem;
	border-bottom-right-radius: 0.7rem;
`;

const StyledDivider = styled(Col)`
	height: 1.3px;
	background: #3f3955;
`;

const StyledProgressBar = styled(Row)`
	background: #3f3955;
	height: 2.5rem;
	border-bottom-left-radius: 0.7rem;
	border-bottom-right-radius: 0.7rem;
`;

const IloDescription = styled(Row)`
	min-height: 4rem;
`;
const IloDuration = styled(Text)`
	font-style: normal;
	font-weight: 300;
	font-size: 14px;
	line-height: 18px;
	text-align: center;
	text-transform: uppercase;
`;
const IloDays = styled(Text)`
	font-style: normal;
	font-weight: 700;
	font-size: 14px;
	line-height: 18px;
	text-align: center;
	text-transform: uppercase;
	margin-left: 0.3rem;
`;

const CardInfo = styled(Row)`
	flex-direction: column;
	width: 100%;
	justify-content: space-between;
`;

const StatusBar = styled(Row)`
	justify-content: space-between;
	align-items: center;
`;

const StatusCol = styled(Col)`
	border: 1px solid #6fcf97;
	border-radius: 5px;
`;

const StatusText = styled(Text)`
	padding: 0.3rem;
	font-family: 'Sora';
	font-style: normal;
	font-weight: 400;
	font-size: 12px;
	line-height: 15px;
	text-align: center;
`;

const StyledStatusRow = styled(Row)`
	background: #120d25;
	border-radius: 10px;
	padding: 0.7rem;
`;

interface IIloCardProps {
	data: IIlo;
	width: number;
}

export const IloCard: FC<IIloCardProps> = ({ data, width }) => {
	const {
		iloName,
		launchpadAddress,
		baseTokenSymbol,
		startBlockDate,
		endBlockDate,
		liquidityRatePercent,
		numBuyers,
		hardcap,
		totalBaseCollected,
		status,
		round1EndDate,
		headerImageFileName,
	} = data;

	const height = useMemo<number>(() => width * 0.45, [width]);

	return (
		<RouterLink to={`/ilo/${launchpadAddress}`}>
			<StyledCard className="card_space">
				<StyledHeaderRow align="center" justify="flex-end">
					<Header fontSize="xxs" fontWeight="bold" justify="center" transform="uppercase">
						{status === 'upcoming'
							? `starts ${startBlockDate.toLocaleString()} your time`
							: status === 'round1'
							? `round 1 ends ${round1EndDate.toLocaleString()} your time`
							: status === 'round2'
							? `round 2 ends ${endBlockDate.toLocaleString()} your time`
							: status === 'saleDone'
							? `ended ${endBlockDate.toLocaleString()} your time`
							: status === 'success'
							? 'ilo successful'
							: status === 'failed'
							? 'ilo failed'
							: null}
					</Header>
				</StyledHeaderRow>
				<Image src={`${IMAGES_URL}/${headerImageFileName}`} height={242} width={width} />
				{/* <Image src={`${iloImage}`} height={242} width={width} /> */}
				<StyledCardBackground className="card_bg">
					<TitleWrapper justify="space-between" align="center">
						<Text fontSize="m" fontWeight="bold">
							{iloName}
						</Text>
						<Icon icon="angleRight" color="secondaryBrand" height={13} />
					</TitleWrapper>
					<StyledDivider className="divider" />
					<IloDescription justify="space-between" horizontalPadding="m" verticalPadding="m">
						<CardInfo>
							<StatusBar>
								<Col>
									<Row align="center">
										{status === 'upcoming' ? (
											<StatusCol>
												<StatusText fontSize="xxs">Starts in</StatusText>
												<Text fontSize="xxs">{moment(startBlockDate).diff(moment(), 'days') + 1} days</Text>
											</StatusCol>
										) : status === 'round1' ? (
											<StatusCol>
												<StatusText fontSize="xxs">Round 1</StatusText>
												<Text fontSize="xxs">{moment(round1EndDate).diff(moment(), 'days')} days</Text>
											</StatusCol>
										) : status === 'round2' ? (
											<StatusCol>
												<StatusText fontSize="xxs">Round 2</StatusText>
												<Text fontSize="xxs">{moment(endBlockDate).diff(moment(), 'days')} days</Text>
											</StatusCol>
										) : status === 'saleDone' ? (
											<StatusCol>
												<StatusText fontSize="xxs">Round 2 ended</StatusText>
											</StatusCol>
										) : status === 'success' ? (
											<StatusCol>
												<StatusText fontSize="xxs">Successful</StatusText>
											</StatusCol>
										) : status === 'failed' ? (
											<StatusCol>
												<StatusText fontSize="xxs">Failed</StatusText>
											</StatusCol>
										) : null}
									</Row>
								</Col>
								<Col>
									<Row>
										<IloDuration fontSize="xxs">Duration:</IloDuration>
										<IloDays fontSize="xs">{moment(endBlockDate).diff(moment(startBlockDate), 'days')} days</IloDays>
									</Row>
								</Col>
							</StatusBar>
							<Spacing vertical="s" />
							<StatusBar>
								<Col>
									<StyledStatusRow align="center" flex={1}>
										<Icon icon="lock" color="greeny" height={17} width={17} />
										<Spacing horizontal="xs" />
										<Text fontSize="m" fontWeight="bold" style={{ display: 'flex', gap: '5px' }}>
											{liquidityRatePercent}%
											<Text fontSize="m" fontWeight="normal">
												Liquidity
											</Text>
										</Text>
									</StyledStatusRow>
								</Col>
								<Col>
									<StyledStatusRow align="center" justify="flex-end" flex={1}>
										<Icon icon="user" color="purple" height={17} width={17} />
										<Spacing horizontal="xs" />
										<Text fontSize="m" fontWeight="bold" style={{ display: 'flex', gap: '5px' }}>
											{numBuyers}{' '}
											<Text fontSize="m" fontWeight="normal">
												Participants
											</Text>
										</Text>
									</StyledStatusRow>
								</Col>
							</StatusBar>
							<Spacing vertical="xs" />
						</CardInfo>
					</IloDescription>
					<ProgressBar
						value={totalBaseCollected.toNumber()}
						max={hardcap.toNumber()}
						color="primaryBrand"
						backgroundColor="tertiaryBackground"
					>
						<StyledProgressBar
							className="progress_bar"
							maxHeight
							maxWidth
							justify="center"
							align="center"
							whiteSpace="nowrap"
							overflow="hidden"
							horizontalPadding="m"
						>
							<Text fontSize="xxs" fontWeight="bold">
								{totalBaseCollected.toFixed(3)} ⁄ {hardcap.toFixed(3)} {baseTokenSymbol}
							</Text>
						</StyledProgressBar>
					</ProgressBar>
				</StyledCardBackground>
			</StyledCard>
		</RouterLink>
	);
};
