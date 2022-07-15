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
import iloImage from '../../../assets/images/demoImage.png'

const StyledCard = styled(Col)`
	margin: 10px;
`

const StyledHeaderRow = styled(Row)`
`
const Header = styled(Text)`
	display: flex;
	align-items: center;
	height: 20px;
	position: absolute;
    margin-top: 4rem;
    margin-right: 1rem;
    background-color: #FCCD13;
    padding: 0.2rem 0.5rem;
    border-radius: 100px;
    color: black;
    font-size: 0.670rem;
`;

const Image = styled.img`
	border-top-left-radius: 0.700rem;
	border-top-right-radius: 0.700rem;
`;

const TitleWrapper = styled(Row)`
	min-height: 2.5rem;
    padding: 0.5rem 1rem 0.5rem 0.5rem;
`;

const StyledCardBackground = styled.div`
	background: #1B1632;
	height: 11.7rem;
	border: 1px solid #3F3955;
	border-top: none;
	border-bottom-left-radius: 0.700rem;
	border-bottom-right-radius: 0.700rem;
`;

const StyledDivider = styled(Col)`
	height: 1.3px;
    background: #3F3955;
`;

const StyledProgressBar = styled(Row)`
	background: #3F3955;
	height: 2.5rem;
	border-bottom-left-radius: 0.700rem;
	border-bottom-right-radius: 0.700rem;
`;

const IloDescription = styled(Row)`
	min-height: 4rem;
`;
const IloDuration = styled(Text)`
	font-family: 'Sora';
	font-style: normal;
	font-weight: 300;
	font-size: 14px;
	line-height: 18px;
	text-align: center;
	text-transform: uppercase;
`;
const IloDays = styled(Text)`
	font-family: 'Sora';
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
`

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
				<StyledHeaderRow className='@@@@@@@@@@' align='center' justify="flex-end">
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
				{/* <Image src={`${IMAGES_URL}/${headerImageFileName}`} height={242} width={width} /> */}
				<Image src={`${iloImage}`} height={242} width={width} />
				<StyledCardBackground>
					<TitleWrapper justify="space-between" align="center">
						<Text fontSize="m" fontWeight="bold">
							{iloName}	
						</Text>
						<Icon icon="angleRight" color="secondaryBrand" height={13} />
					</TitleWrapper>
					<StyledDivider />
					<IloDescription
						justify="space-between"
						horizontalPadding="m"
						verticalPadding="m"
					>
						<CardInfo>
							<StatusBar>
								<Col>
									<Row>
										{status === 'upcoming' ? (
											<Col>
												<Text fontSize="xxs" className='font-weight-400'>
													Starts in
												</Text>
												<Text fontSize="xxs">{moment(startBlockDate).diff(moment(), 'days') + 1} days</Text>
											</Col>
										) : status === 'round1' ? (
											<Col>
												<Text fontSize="xxs" className='font-weight-400'>
													Round 1
												</Text>
												<Text fontSize="xxs">{moment(round1EndDate).diff(moment(), 'days')} days</Text>
											</Col>
										) : status === 'round2' ? (
											<Col>
												<Text fontSize="xxs" className='font-weight-400'>
													Round 2
												</Text>
												<Text fontSize="xxs">{moment(endBlockDate).diff(moment(), 'days')} days</Text>
											</Col>
										) : status === 'saleDone' ? (
											<Col>
												<Text fontSize="xxs" className='font-weight-400'>
													Round 2 ended
												</Text>
											</Col>
										) : status === 'success' ? (
											<Col>
												<Text fontSize="xxs">
													Successful
												</Text>
											</Col>
										) : status === 'failed' ? (
											<Col>
												<Text fontSize="xxs">
													Failed
												</Text>
											</Col>
										) : null}
									</Row>
								</Col>
								<Col>
									<Row>
										<IloDuration fontSize='xxs'>Duration:</IloDuration>
										<IloDays fontSize="xs">{moment(endBlockDate).diff(moment(startBlockDate), 'days')} days</IloDays>
									</Row>

								</Col>
							</StatusBar>
							<StatusBar>
								<Col>
									<Row align="center" flex={1}>
										<Icon icon="lock" color="secondaryBrand" height={17} width={17} />
										<Spacing horizontal="xs" />
										<Text fontSize="m" fontWeight="bold">
											{liquidityRatePercent}%
										</Text>
									</Row>
								</Col>
								<Col>
									<Row align="center" justify='flex-end' flex={1}>
										<Icon icon="user" color="primaryBrand" height={17} width={17} />
										<Spacing horizontal="xs" />
										<Text fontSize="m" fontWeight="bold" style={{}}>
											{numBuyers}
										</Text>
									</Row>
								</Col>
							</StatusBar>
						</CardInfo>
						{/* <Col>
							<Row>
								{status === 'upcoming' ? (
									<Col>
										<Text fontSize="xxs" className='font-weight-400'>
											Starts in
										</Text>
										<Text fontSize="xxs">{moment(startBlockDate).diff(moment(), 'days') + 1} days</Text>
									</Col>
								) : status === 'round1' ? (
									<Col>
										<Text fontSize="xxs" className='font-weight-400'>
											Round 1
										</Text>
										<Text fontSize="xxs">{moment(round1EndDate).diff(moment(), 'days')} days</Text>
									</Col>
								) : status === 'round2' ? (
									<Col>
										<Text fontSize="xxs" className='font-weight-400'>
											Round 2
										</Text>
										<Text fontSize="xxs">{moment(endBlockDate).diff(moment(), 'days')} days</Text>
									</Col>
								) : status === 'saleDone' ? (
									<Col>
										<Text fontSize="xxs" className='font-weight-400'>
											Round 2 ended
										</Text>
									</Col>
								) : status === 'success' ? (
									<Col>
										<Text fontSize="xxs">
											Successful
										</Text>
									</Col>
								) : status === 'failed' ? (
									<Col>
										<Text fontSize="xxs">
											Failed
										</Text>
									</Col>
								) : null}
							</Row>
							<Spacing vertical="s" />
							<Row align="center" flex={1}>
								<Icon icon="lock" color="secondaryBrand" height={17} width={17} />
								<Spacing horizontal="xs" />
								<Text fontSize="m" fontWeight="bold">
									{liquidityRatePercent}%
								</Text>
							</Row>
						</Col>
						<Col>
							<Col align="flex-end">
								<Row>
									<IloDuration fontSize='xxs'>Duration:</IloDuration>
									<IloDays fontSize="xs">{moment(endBlockDate).diff(moment(startBlockDate), 'days')} days</IloDays>
								</Row>
							</Col>
							<Row align="center" justify='flex-end' flex={1}>
								<Icon icon="user" color="primaryBrand" height={17} width={17} />
								<Spacing horizontal="xs" />
								<Text fontSize="m" fontWeight="bold" style={{}}>
									{numBuyers}
								</Text>
							</Row>
							<Spacing vertical="s" />
						</Col> */}
					</IloDescription>
					<ProgressBar
						value={totalBaseCollected.toNumber()}
						max={hardcap.toNumber()}
						color="primaryBrand"
						backgroundColor="tertiaryBackground"
					>
						<StyledProgressBar maxHeight maxWidth justify="center" align='center' whiteSpace="nowrap" overflow="hidden" horizontalPadding="m">
							<Text fontSize="xxs" fontWeight='bold'>
								{totalBaseCollected.toFixed(3)} ⁄ {hardcap.toFixed(3)} {baseTokenSymbol}
							</Text>
						</StyledProgressBar>
					</ProgressBar>
				</StyledCardBackground>

			</StyledCard>
		</RouterLink>
	);
};
