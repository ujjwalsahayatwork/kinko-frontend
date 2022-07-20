import { Col } from 'components/col/col';
import { Footer } from 'components/footer/footer';
import { Header } from 'components/header/header';
import { ScrollToTop } from 'components/scrollToTop/scrollToTop';
import { toPx, useDimensions } from 'components/utils';
import uniqueId from 'lodash/uniqueId';
import { CreateIloCaps } from 'pages/createIloCaps/createIloCaps';
import { CreateIloGeneral } from 'pages/createIloGeneral/createIloGeneral';
import { CreateIloPeriod } from 'pages/createIloPeriod/createIloPeriod';
import { CreateIloSocials } from 'pages/createIloSocials/createIloSocials';
import { CreateIloSummary } from 'pages/createIloSummary/createIloSummary';
import { Ilo } from 'pages/ilo/ilo';
import { Invest } from 'pages/invest/invest';
import { Main } from 'pages/main/main';
import { NotFound } from 'pages/notFound/notFound';
import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import banner from './assets/images/banner.png';
// import mobBanner from './assets/images/banner.png';

const OuterBody = styled.div`
	display: flex;
	width: 100%;
	height: 100vh;
	flex: 100;
	justify-content: center;
	flex-direction: column;
	justify-content: space-between;
	background-image: url(${banner});
	background-size: cover;
	background-position: bottom;
	background-repeat: no-repeat;
	@media (min-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
	}
`;

const InnerBody = styled(Col) <{ width: number }>`
	max-width: 100%;
	padding: 1rem;
	display: flex;
	min-height: 60vh;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		min-height: 48vh;
	}
`;

export const Router: FC = () => {
	const { width } = useDimensions();
	const [innerBodyId] = useState(uniqueId('Body-InnerBody-'));
	const [bodyWidth, setBodyWidth] = useState(0);

	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			setBodyWidth(entries[0].contentRect.width);
		});
		const innerBody = document.getElementById(innerBodyId);
		if (innerBody) {
			resizeObserver.observe(innerBody);
		}

		return () => resizeObserver.disconnect();
	}, [innerBodyId, setBodyWidth]);

	return (
		<BrowserRouter>
			<Col maxWidth align="center">
				<Header bodyWidth={bodyWidth} />
				<OuterBody>
					<InnerBody id={innerBodyId} width={width}  >
						<ScrollToTop />
						<Routes>
							<Route path="/createIloGeneral" element={<CreateIloGeneral />} />
							<Route path="/createIloCaps" element={<CreateIloCaps />} />
							{/* <Route path="/createIloPrediction" element={<CreateIloPrediction />} /> */}
							<Route path="/createIloPeriod" element={<CreateIloPeriod />} />
							<Route path="/createIloSummary" element={<CreateIloSummary />} />
							<Route path="/createIloSocials" element={<CreateIloSocials />} />
							<Route path="/ilo/:launchpadAddress/:referralId" element={<Ilo />} />
							<Route path="/ilo/:launchpadAddress" element={<Ilo />} />
							<Route path="/invest/:launchpadAddress/:referralId" element={<Invest />} />
							<Route path="/invest/:launchpadAddress" element={<Invest />} />
							<Route path="/" element={<Main />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</InnerBody>
					<Footer />
				</OuterBody>
			</Col>
		</BrowserRouter>
	);
};
