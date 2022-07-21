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
import './mainView.scss';
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

const Header = styled(Col)<{ width?: number }>`
	width: ${({ width }) => (width ? toPx(width) : undefined)};
`;

const Hading = styled(Text)`
	color: #ed4c3a;
	font-family: 'Sora';
	font-weight: 500;
	font-size: 2rem;
	line-height: 50px;
`;

const CreateIloText = styled(Text)`
	color: #ed4c3a;
`;

const FilterContainer = styled.div`
	/* background-color: antiquewhite; */
	display: flex;
	border: 1px solid #7079b9;
	/* width: 100%; */
	row-gap: 1rem;
	column-gap: 1rem;
	border-radius: ${({ theme }) => toPx(theme.buttonBorderRadius * 2)};
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		border: none;
	}
	@media screen and (max-width: 767px) {
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
	background: #ed4c3a;
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
	border: 1px solid #4650a8;
	background: rgb(112 121 185 / 30%);
`;

const StyledSelector = styled.div`
	color: white;
	width: 100%;
	justify-content: space-around;
	background: #4650a8;
	border: none;
	border-radius: 0.5rem 0rem 0rem 0.5rem;
	height: 48px;
	max-width: 16rem;
	min-width: 15rem;
	display: flex;
	align-items: center;
	margin-left: -1.5px;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		display: none;
	}
`;

const Select = styled.select`
	color: white;
	width: 100%;
	background: transparent;
	border: none;
	border-radius: 0.5rem 0rem 0rem 0.5rem;
	height: 48px;
	max-width: 13rem;
	align-items: center;
	outline: none;
	font-size: 18px;
	font-weight: 300;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		display: none;
	}
`;

const Option = styled.option`
	background: #4650a8;
	:focus-visible {
		outline: none;
	}
`;

const OptionText = styled.option`
	color: #fff;
	background-color: transparent;
	font-size: 18px;
	font-weight: 300;
	opacity: 1;
	margin: 0px;
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
	:focus-visible {
		outline: none;
	}
	::placeholder {
		color: #7079b9;
	}
`;

const StyledHeading = styled(Text)`
	font-weight: 500;
	max-width: 50rem;
	margin-top: 3rem;
	margin-bottom: 1rem;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		margin-top: 0.25rem;
		margin-bottom: 0rem;
	}
`;

const CreateIlo = styled(BaseButton)`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0.35rem;
	max-width: 8.5rem;
	background-color: transparent;
	border: 1px solid #ed4c3a;
	width: 100%;
	height: 45px;
	min-height: 45px;
	max-height: 45px;
	min-width: 8rem;
`;

const SecondaryButton = styled(Button)`
	background-color: #ed4c3a;
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
		gap: 0rem;
	}
`;
const SearchIcon = styled(Icon)`
	display: none;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		display: block;
	}
`;

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
	const [apiData, setApiData] = useState([]);
	const [filterValue, setFilterValue] = useState('');

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
		const searchedResult: any = ilos?.filter((x) =>
			x.iloName?.toLowerCase()?.includes(filterValue.toLocaleLowerCase())
		);
		if (searchedResult) {
			setApiData(searchedResult);
		} else setApiData([]);
	};

	const handleSelect = () => {
		console.log('Select Me');
	};

	console.log('apiData', apiData);

	const filterData = (e: any) => {
		const data = e.target?.value;
		setFilterValue(data);
	};

	return (
		<StyledContainer id={elementId} className={isMobile ? 'center' : undefined}>
			<Header className="heading_width" width={isMobile ? width : undefined}>
				<SubHeader>
					<Hading fontSize="xl" mobileFontSize="s">
						Launchpad
					</Hading>
					<CreateIlo onClick={onCreateIlo}>
						<CreateIloText fontSize="s">Create ILO</CreateIloText>
						<Icon icon="plusOutline" width={30} color="undefined" />
					</CreateIlo>
				</SubHeader>
				<Spacing vertical="l" />
				<StyledSearchBar>
					<SearchFilterArea>
						<StyledSelector>
							<Icon icon="non_profit" color="primary" width={30} />
							<Select>
								<OptionText onClick={handleSelect} value="" hidden>
									Non Profitable
								</OptionText>
								<Option value="1">Ilo 1</Option>
								<Option value="2">Ilo 2</Option>
								<Option value="3">Ilo 3</Option>
								<Option value="4">Ilo 4</Option>
							</Select>
						</StyledSelector>
						<StyledSearchInput placeholder="Type here to Search..." onChange={filterData} />
						<SearchIcon icon="searchIcon" width={22} color="undefined" />
						<Spacing horizontal="s" mobileOnly />
					</SearchFilterArea>
					<SearchBtn label="Search" onClick={handleSearchFilter} />
					{filterValue &&
						apiData
							?.filter((item: any) => item?.title?.toLowerCase()?.includes(filterValue?.toLowerCase()))
							?.map((items: any) => <div>{JSON.stringify(items?.title)}</div>)}
					{apiData.map((item: any) => (
						<div>{item.iloName}</div>
					))}
				</StyledSearchBar>
				<Spacing vertical="l" />
				<StyledButtonCol>
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
			<Col align="center" className="space_bottom">
				{isDesktop
					? filledIlos.map((outerIlo, outerIndex) => {
							if (outerIndex % 3 === 0) {
								return (
									<Col key={outerIlo ? outerIlo.launchpadAddress : outerIndex}>
										{outerIndex > 0 && <Spacing vertical="m" />}
										<Row>
											{filledIlos.slice(outerIndex, outerIndex + 3).map((innerIlo, innerIndex) => (
												<Row key={innerIlo ? innerIlo.launchpadAddress : innerIndex}>
													{innerIlo === undefined ? <div /> : <IloCard data={innerIlo} width={width} />}
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
