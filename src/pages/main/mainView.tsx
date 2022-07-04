import React, { FC, useEffect, useMemo, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import uniqueId from 'lodash/uniqueId';

import { Button } from 'components/button/button';
import { Col } from 'components/col/col';
import { Row } from 'components/row/row';
import { Spacing } from 'components/spacing/spacing';
import { Text } from 'components/text/text';
import { toPx, useDevice } from 'components/utils';
import { hiddenLaunchpadAddresses } from 'constants/constants';
import { FilterButton } from 'pages/main/components/filterButton';
import { IloCard } from 'pages/main/components/iloCard';
import { IIlo } from 'types';
import "./mainView.scss";
import { Link } from 'components/link/link';
import { BaseButton } from 'components/baseButton/baseButton';
import { Icon } from 'components/icon/icon';

export type IIloFilter = 'upcoming' | 'live' | 'success' | 'failed';

const StyledContainer = styled(Col)`
	width: 100%;
	max-width: 1152px;
	margin: 0 auto;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		
	}
`;

const Header = styled(Col) <{ width?: number }>`
	width: ${({ width }) => (width ? toPx(width) : undefined)};
`;

const Hading = styled(Text)`
	color: #F97A48;
	font-family: 'Sora';
	font-weight: 500;
	font-size: 2rem;
	line-height: 50px;
`

const CreateIloText = styled(Text)`
	color: #F97A48;
`

const FilterContainer = styled.div`
	/* background-color: antiquewhite; */
	display: flex;
	border: 1px solid #7079B9;
	/* width: 100%; */
	row-gap: 1rem;
    column-gap: 1rem;
	border-radius: ${({ theme }) => toPx(theme.buttonBorderRadius * 2)};
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		border: none;
	}
	@media screen and (max-width:767px){
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		width: 100%;
	}
`;

const StyledSearchBar = styled(Row)`
	display: grid;
	grid-template-columns: 75% 25%;
	gap: 0.87rem;
	/* height: 2.5rem; */
	align-items: center;
	/* justify-content: center; */
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
	width: 100%;
	grid-template-columns: 1fr;
	}
`;

const SearchBtn = styled(Button)`
	background: #F97A48;
	border: none;
	height: 46px;
	max-width: 13rem;
	/* min-width: 12rem; */
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		display: none;
	}
`;

const SearchFilterArea = styled(Row)`
	width: 100%;
	border-radius: 0.5rem;
	border: 1px solid #4650A8;
`;

const StyledSelector = styled(BaseButton)`
	color: white;
	width: 100%;
    justify-content: space-around;
	background: #4650A8;
	border: none;
	border-radius: 0.5rem 0rem 0rem 0.5rem;
	height: 46px;
	max-width: 16rem;
	min-width: 15rem;
	display: flex;
	align-items: center;
	margin-left: -1.5px;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		display: none;
	}
`;

const StyledIcon = styled(Row)`
	display: flex;
	justify-content: end;
`;

const StyledSearchInput = styled.input`
	width: 100%;
	background: transparent;
	border-radius: 0rem 0.5rem 0.5rem 0rem;
    border: none;
	color: white;
	padding-left: 1rem;
	font-size: 0.875rem;
	height: 46px;
	font-weight: 500;
	font-family: 'Sora';
	letter-spacing: 0.1em;
	:focus-visible{
		outline: none;
	}
	::placeholder{
		color: #7079B9;
	}
`;


const StyledHeading = styled(Text)`
	font-weight: 500;
	max-width: 50rem;
	margin-top: 3rem;
	margin-bottom: 1rem;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		margin-top: .25rem;	
		margin-bottom: 0rem;
	}
`;

const CreateIlo = styled(BaseButton)`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0.350rem;
	max-width: 8.5rem;
	background-color: transparent;
    border: 1px solid #F97A48;
	width: 100%;
	height: 45px;
	min-height: 45px;
	max-height: 45px;
	min-width: 8rem;
`;

const SecondaryButton = styled(Button)`
	background-color: #a873F7;
	width: 100%;
	height: 45px;
	min-height: 45px;
	max-height: 45px;
	border-radius: 5px;
	min-width: 8rem;
`;

const StyledButtonCol = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	row-gap: 1.5rem;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		flex-wrap: wrap;
		flex-direction: column-reverse;
	}
`;

const StyledBtnCol = styled(Row)`
	display: flex;
    column-gap: 1rem;
	border-radius: ${({ theme }) => toPx(theme.buttonBorderRadius * 2)};
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		width: 100%;
	}
`;

const StyledSpan = styled.span`
	font-weight: 600;
	color: #0fff9b;
`;

const SubHeader = styled(Row)`
 gap: 2rem;
 align-items: center;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		justify-content: space-between;
	}
`;
const SearchIcon = styled(Icon)`
 display: none;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		display: block;
	}
`



interface IMainViewProps {
	ilos: Array<IIlo>;
	iloFilter: IIloFilter;
	onChangeIloFilter: (iloFilter: IIloFilter) => void;
	onCreateIlo: () => void;
}

export const MainView: FC<IMainViewProps> = ({ ilos, iloFilter, onChangeIloFilter, onCreateIlo }) => {
	const { isDesktop, isMobile } = useDevice();
	const { distanceM } = useTheme();
	const [elementId] = useState(uniqueId('MainView-Col-'));
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

	const width = isDesktop
		? Math.min(Math.max((elementWidth - 2 * distanceM) / 3, 0), 400)
		: Math.min(elementWidth, 400);

	const filteredIlos = useMemo(() => {
		const visibleIlos = ilos.filter(
			({ launchpadAddress }) => !hiddenLaunchpadAddresses.includes(launchpadAddress.toLowerCase())
		);
		switch (iloFilter) {
			case 'upcoming':
				return visibleIlos.filter(({ status }) => status === 'upcoming');
			case 'live':
				return visibleIlos.filter(({ status }) => status === 'round1' || status === 'round2' || status === 'saleDone');
			case 'success':
				return visibleIlos.filter(({ status }) => status === 'success');
			case 'failed':
				return visibleIlos.filter(({ status }) => status === 'failed');
			default:
				return [];
		}
	}, [ilos, iloFilter]);

	const filledIlos = useMemo(() => {
		const fillUp: Array<undefined> = [];
		for (let i = 0; (3 - (filteredIlos.length % 3)) % 3 > i; i++) {
			fillUp.push(undefined);
		}
		return (filteredIlos as Array<IIlo | undefined>).concat(fillUp);
	}, [filteredIlos]);


	const handleSearchFilter = () => {
		console.log('SearchFilter')
	}

	const handleSelect = () => {
		console.log('Select Me')
	}

	return (
		<StyledContainer id={elementId} className={isMobile ? 'center' : undefined}>
			<Header className="heading_width" width={isMobile ? width : undefined}>
				<SubHeader >
					<Hading fontSize="xl">
						Launchpad
					</Hading>
					<CreateIlo onClick={onCreateIlo}>
						<CreateIloText fontSize="s">Create Ilo</CreateIloText>
						<Icon icon="plusOutline" width={30} color="undefined" />
					</CreateIlo>
				</SubHeader>
				<Spacing vertical="m" />
				<StyledSearchBar>
					<SearchFilterArea>
						<StyledSelector onClick={handleSelect}>
							<Row align='center'>
								<Icon icon='non_profit' color='primary' />
								<Text fontSize="m">
									Non Profitable
								</Text>
							</Row>
							<StyledIcon>
								<Icon icon='downarrow' color='primary' />
							</StyledIcon>
						</StyledSelector>
						<StyledSearchInput placeholder='Type here to Search...' />
						<SearchIcon icon="searchIcon" width={22} color="undefined" />
						<Spacing horizontal='s' mobileOnly />

					</SearchFilterArea>
					<SearchBtn label='Search' onClick={handleSearchFilter} />
				</StyledSearchBar>
				<Spacing vertical="m" />
				<StyledButtonCol >
					<FilterContainer>
						<FilterButton
							icon="clock"
							title="Upcoming"
							selected={iloFilter === 'upcoming'}
							onClick={() => onChangeIloFilter('upcoming')}
							FilterBtnCss="first_filter_btn"
						/>
						<FilterButton
							icon="live"
							title="Live"
							selected={iloFilter === 'live'}
							onClick={() => onChangeIloFilter('live')}
						/>
						<FilterButton
							icon="circleCheck"
							title="Success"
							selected={iloFilter === 'success'}
							onClick={() => onChangeIloFilter('success')}
						/>
						<FilterButton
							icon="circleXMark"
							title="Failed"
							selected={iloFilter === 'failed'}
							onClick={() => onChangeIloFilter('failed')}
							FilterBtnCss="last_filter_btn"
						/>
					</FilterContainer>
				</StyledButtonCol>
			</Header>
			<Spacing vertical="l" />
			<Col align='center' className="space_bottom">
				{isDesktop
					? filledIlos.map((outerIlo, outerIndex) => {
						if (outerIndex % 3 === 0) {
							return (
								<Col key={outerIlo ? outerIlo.launchpadAddress : outerIndex}>
									{outerIndex > 0 && <Spacing vertical="m" />}
									<Row>
										{filledIlos.slice(outerIndex, outerIndex + 3).map((innerIlo, innerIndex) => (
											<Row key={innerIlo ? innerIlo.launchpadAddress : innerIndex}>
												{innerIlo === undefined ? (
													<div />
												) : (
													<IloCard data={innerIlo} width={width} />
												)}
											</Row>
										))}
									</Row>
								</Col>
							);
						}
						return null;
					})
					: filteredIlos.map((ilo, index) => (
						<Col key={ilo.launchpadAddress}>
							{index > 0 && <Spacing vertical="m" />}
							<IloCard data={ilo} width={width} />
						</Col>
					))}
			</Col>
		</StyledContainer>
	);
};
