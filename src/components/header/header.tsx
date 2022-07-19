/* eslint-disable */
import React, { FC, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useClickAway } from 'react-use'

import { Col } from 'components/col/col';
import { ConnectButton } from 'components/connectButton/connectButton';
import { HeaderMenu } from 'components/headerMenu/headerMenu';
import { Link } from 'components/link/link';
import { NetworkButton } from 'components/networkButton/networkButton';
import { RouterLink } from 'components/routerLink/routerLink';
import { Row } from 'components/row/row';
import { Spacing } from 'components/spacing/spacing';
import { Text } from 'components/text/text';
import { toPx, useDevice, useDimensions } from 'components/utils';
import kinkoLogo from 'assets/images/kinkoLogo.svg';
import kLogo from 'assets/images/icons/kLogo.svg';

import './header.scss';
import { Icon } from 'components/icon/icon';

const StyledCol = styled(Col)`
	width: 100%;
	margin: 0 auto;
	background-color: #161718;
`;

const StyledHeader = styled(Row)`
	height: 71px;
	width: 100%;
	max-width: 1152px;
	margin: 0 auto;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		height: 64px;
	}
`;
const StyledHeaderMenu = styled(Row)`
	align-items: center;
	justify-content: space-around;
`;
const LogoWrapper = styled.div<{ width?: number }>`
	display: flex;
	max-width: ${({ width }) => (width === undefined ? undefined : toPx(width))};
`;

const Logo = styled.img`
	width: 50px;
	/* height: 29px; */

	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		max-width: 120px;
	}
`;

const StyledConnectButton = styled(ConnectButton)`
	max-width: 200px;
	height: 40px;
	width: 146px;

	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		max-width: 80px;
	}
`;

const StyledUl = styled.ul`
	list-style: none;
  	margin: 0;
  	padding: 0;
`;

const StyledLi = styled.li`
	color: white;
	&:hover{
		color: #F97A48;
	}
`;

const StyledLink = styled(Link)`
	color: white;
	display: flex;
	align-items: center;
	font-weight: 500;
	font-size: 0.875rem;
	line-height: 1.25rem;
	&:hover{
		color: #F97A48;
	}
`;

const StyledAnchor = styled.a`
	color: white;
	display: flex;
	align-items: center;
	font-size: 0.875rem;
	line-height: 1.25rem;
	&:hover{
		color: #F97A48;
	}
`;

const StyledMenuText = styled(Text)`
	color: white;
	/* font-family: "Sora",sans-serif; */
	display: flex;
	align-items: center;
	font-size: .875rem !important;
	line-height: 1.25rem;
	font-weight: 500;
	&:hover{
		color: #F97A48;
	}
`;

const StyledDropDown = styled.div`
	background: #252123;
  	border-radius: 6px;
  	position: absolute;
  	width: 150px;
  	padding: 8px 6px;
  	top: 56px;
  	box-shadow: 0px 0px 60px rgb(0 0 0 / 29%);
  	border: 1px solid #4b4b4b;
`;

const StyledMobileView = styled(Row)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;

const StyledKlogo = styled.img`
	max-width: 148px;
	height: auto;
	padding-right:1rem ;
	width: 51px;
`;
interface IHeaderProps {
	bodyWidth: number;
}


export const Header: FC<IHeaderProps> = ({ bodyWidth }) => {
	const { isDesktop, isMobile } = useDevice();
	const { width } = useDimensions();
	const theme = useTheme();
	const [isShowSubMenu, setIsShowSubMenu] = useState(false);
	const [isShowFarmSubmenu, setIsShowFarmSubmenu] = useState(false);

	const subMenuRef = useRef(null)
	const subFarmMenuRef = useRef(null)
	// useClickAway(subMenuRef, (e) => {
	// 	setIsShowFarmSubmenu(false)
	// 	setIsShowSubMenu(false)
	// })
	// useClickAway(subFarmMenuRef, (e) => {
	// 	setIsShowFarmSubmenu(false)
	// 	setIsShowSubMenu(false)
	// })


	const handlePoolMenu = () => {
		setIsShowFarmSubmenu(false)
		setIsShowSubMenu(!isShowSubMenu)
	}
	const handleFarmMenu = () => {
		setIsShowSubMenu(false);
		setIsShowFarmSubmenu(!isShowFarmSubmenu);
	}
	const logoWidth = isDesktop
		? Math.max((width - bodyWidth) / 2 + theme.distanceM, 2 * theme.distanceL + 237)
		: undefined;

	return (
		<StyledCol>
			<StyledHeader align="center" justify="space-between" className="header mob_logo_space">
				{isMobile && (
					<StyledMobileView maxWidth>
						<HeaderMenu />
						<Link href='/'>
							<StyledKlogo src={kLogo} />
						</Link>
					</StyledMobileView>
				)}
				<Row>
					{isDesktop && (
						<Row align="center">
							<LogoWrapper width={logoWidth}>
								<Link href="/">
									<Logo src={kinkoLogo} />
								</Link>
							</LogoWrapper>
						</Row>
					)}
				</Row>

				<Row align="center" className='flex_row'>
					<div className='header_menu1'>
						<StyledHeaderMenu>
							{isDesktop && (
								<>
									<Spacing className="header_menu" />
									<StyledLink href="/" newTab={true}>
										<StyledMenuText fontSize="s">
											Swap
										</StyledMenuText>
									</StyledLink>
									<Spacing className="header_menu" />
									<div ref={subMenuRef} className="pool-drop poollink" onClick={handlePoolMenu}>
										<StyledAnchor>
											<div className='extraheight'>
												<StyledMenuText fontSize="s">
													Stake
												</StyledMenuText>
												<Icon icon="downarrow" title="downarrow" color="primary" height={5} />
											</div>
										</StyledAnchor>
										<StyledDropDown className='padding_drop ddl'>
											<StyledUl>
												<StyledLi>
													<StyledLink href="/" newTab={true}>
														<Icon icon="browserI" title="browserI" color="primary" height={26} />
														<Spacing horizontal="s" vertical="l" />
														Browse
													</StyledLink>
												</StyledLi>
												<StyledLi>
													<StyledLink href="/" newTab={true}>
														<Icon icon="addI" title="addI" color="primary" height={26} />
														<Spacing horizontal="s" vertical="l" />
														Add
													</StyledLink>
												</StyledLi>
												<StyledLi>
													<StyledLink href="/" newTab={true}>
														<Icon icon="importI" title="importI" color="primary" height={26} />
														<Spacing horizontal="s" vertical="l" />
														Import
													</StyledLink>
												</StyledLi>
											</StyledUl>
										</StyledDropDown>
									</div>
									<Spacing className="header_menu" />
									<StyledLink newTab={false} href="/" className='active-color'>
										<StyledMenuText fontSize="s">Launchpad</StyledMenuText>
									</StyledLink>
									<Spacing className="header_menu" />
									<StyledLink href="/" newTab={false}>
										<StyledMenuText fontSize="s">
											Charity
										</StyledMenuText>
									</StyledLink>
									<Spacing className='header_menu' />
									<NetworkButton />
									<Spacing horizontal="s" mobile="s" className='space_btn_width' />
									<StyledConnectButton />
								</>
							)}

						</StyledHeaderMenu>
					</div>
				</Row>
			</StyledHeader>
		</StyledCol>
	);
};
