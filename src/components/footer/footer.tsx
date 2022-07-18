import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { Col } from 'components/col/col';
import { Icon } from 'components/icon/icon';
import { Link } from 'components/link/link';
import { Row } from 'components/row/row';
import { Spacing } from 'components/spacing/spacing';
import { Text } from 'components/text/text';
import { toPx } from 'components/utils';
import kinkoLogo from 'assets/images/kinkoLogo.svg';
import './footer.scss';

const StyledDiv = styled.div`
	background-color: #001a23;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	z-index: 10;
	/* min-height: calc(430px - 64px); */

	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		padding: 0rem 1rem 0rem 1rem;
		max-width: 100%;
		width: auto;
	}
`;
const StyledFooterCol = styled(Col)`
	display: flex;
	max-width: 72rem;
	margin: 0 auto;

	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		padding: 0 0rem;
	}
`;

const StyledFooterData = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 0.75rem;
	/* padding: 1rem; */

	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		grid-template-columns: 1fr;
		gap: 1.25rem;
		padding: 0rem;
	}
	@media (min-width: 768px) {
		grid-template-columns: 1fr 1fr;
	}
`;
const StyledData = styled.div`
	width: 100%;
	max-width: 20rem;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		max-width: 23.5rem;
	}
`;

const LogoWrapper = styled.div<{ width?: number }>`
	display: flex;
	flex-direction: column;
	margin-top: 0.5rem;
	margin-bottom: 15px;
	max-width: ${({ width }) => (width === undefined ? undefined : toPx(width))};
`;

const Logo = styled.img`
	width: 50px;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		width: 6.8rem;
	}
	@media (min-width: 768px) {
		width: 50px;
	}
`;

const StyledDescText = styled.div`
	color: rgb(255 255 255 / 0.8);
	font-size: 0.875rem;
	line-height: 1.25rem;
	font-weight: 400 !important;
`;

const StyledDivider = styled.div`
	height: 1px;
	width: 100%;
	margin-bottom: 0.75rem;
	background: #4f4f4f;
`;

const StyledDividerFooter = styled.div`
	height: 1px;
	width: 85%;
	margin-bottom: 0.75rem;
	background: #4f4f4f;
`;

const StyledCopyrightCol = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.85rem 0;
	max-width: 72rem;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		flex-direction: column;
		justify-content: center;
		padding-top: 20px;
	}
`;

const StyledFormContainer = styled.div`
	max-width: 350px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	padding-top: 2rem;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		max-width: 100%;
	}
`;

const StyledForm = styled.form`
	background: transparent;
	width: 100%;
	text-indent: 0.75rem;
`;

const StyledFooter = styled(Col)`
	background-color: #001a23;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		padding-top: 1rem;
	}
`;
const StyledFooterText = styled(Text)`
	font-weight: 500;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 4rem;
	justify-content: center;
`;

const StyledInput = styled.input`
	background: transparent;
	height: 2rem;
	font-family: inherit;
	font-size: 100%;
	line-height: inherit;
	border: none;
	color: white;
	width: 100%;
	:focus-visible {
		outline: none;
		background: transparent;
	}
`;

const SubscribeArea = styled.div`
	display: flex;
	/* align-items: end; */
	justify-content: end;
	width: 100%;
`;

const StyledSubTextArea = styled.div`
	display: grid;
	grid-template-columns: 40% 60%;
	border-top: 2px solid white;
	border-bottom: 2px solid white;
	padding: 2rem 0;
	width: 100%;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		grid-template-columns: 1fr;
		padding: 1.5rem 0;
	}
`;

const StyledSubscribeButton = styled.button`
	height: 40px;
	width: 100%;
	border: none;
	font-size: 1rem;
	border-radius: 0.35rem;
	margin-top: 0.5rem;
	background: #f97a48;
	color: white;
	font-family: 400;
	font-family: inherit;
	line-height: inherit;
	margin: 0;
	padding: 0;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
	}
`;

const StyledNewsletter = styled(Text)`
	color: rgb(255 255 255 / 0.8);
	line-height: 1.25rem;
	font-weight: 400;
	font-size: 0.875rem;
	padding-top: 0.25rem;
`;

const StyledStayText = styled(Text)`
	font-weight: 600;
	font-size: 1.125rem;
	line-height: 1.5rem;
`;

const CopyrightText = styled(Text)`
	color: #fff;
	background-color: transparent;
	font-size: 0.875rem;
	font-weight: 300;
	opacity: 1;
`;
export const Footer: FC = () => {
	const [email, setEmail] = useState('');

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setEmail(value);
	};
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setEmail('');
	};
	return (
		<>
			<StyledDiv>
				<Spacing vertical="m" />
				<StyledFooterCol maxWidth>
					<StyledFooterData>
						<StyledData>
							<LogoWrapper>
								<Link href="/">
									<Logo src={kinkoLogo} />
								</Link>
								<Spacing vertical="s" mobile="s" />
								<StyledDescText>
									Fundex is designing green and cost-effective Decentralized Finance by providing a complete set of DeFi
									features on Bsc while accelerating their adoption.
								</StyledDescText>
							</LogoWrapper>
							<StyledCopyrightCol>
								<CopyrightText fontSize="xs">contact@Fundex.com</CopyrightText>
							</StyledCopyrightCol>
						</StyledData>
						<SubscribeArea>
							<StyledFormContainer>
								<div>
									<StyledStayText fontSize="m">Stay Informed</StyledStayText>
									<StyledNewsletter fontSize="xs">Subscribe to our newsletter.</StyledNewsletter>
								</div>
								<Spacing vertical="l" />
								<StyledForm onSubmit={handleSubmit}>
									<StyledInput
										name="email_address"
										placeholder="Your Email"
										required
										type="email"
										onChange={handleEmailChange}
										value={email}
									/>
									<StyledDivider />
									<StyledSubscribeButton onClick={() => handleSubmit}>Subscribe</StyledSubscribeButton>
								</StyledForm>
							</StyledFormContainer>
						</SubscribeArea>
					</StyledFooterData>
				</StyledFooterCol>
				<Spacing vertical="s" />
			</StyledDiv>
			<StyledFooter maxWidth>
				<StyledFooterText fontSize="s" mobileFontSize="xxs">
					<StyledDividerFooter />
					<div style={{ marginRight: '10px', fontSize: '.875rem' }}>© 2022 by Kinko</div>
					<Spacing horizontal="s" desktopOnly />
				</StyledFooterText>
			</StyledFooter>
		</>
	);
};
