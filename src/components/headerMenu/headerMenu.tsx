/* eslint-disable */
import { BaseButton } from 'components/baseButton/baseButton';
import { Col } from 'components/col/col';
import { ConnectButton } from 'components/connectButton/connectButton';
import { Icon } from 'components/icon/icon';
import { Link } from 'components/link/link';
import { NetworkButton } from 'components/networkButton/networkButton';
import { Spacing } from 'components/spacing/spacing';
import { Text } from 'components/text/text';
import { toPx } from 'components/utils';
import uniqueId from 'lodash/uniqueId';
import React, { Component } from 'react';
import styled from 'styled-components';
import './headerMenu.scss';

const clickClass = 'cce293d0475a03b38d3e7778dae11d82297f71b0bc530281561c94a590fa4431';

const DropDownButton = styled(BaseButton)`
	background-color: transparent;
	padding: 10px;
`;

const Relative = styled(Col)`
	position: relative;
	direction: ltr;
	opacity: 1;
	`;

const Absolute = styled(Col)`
	position: absolute;
	direction: initial;
	`;

const Container = styled.div`
	height: 100vh;
    width: 100vw;
    background-color: rgba(37, 33, 35, 0.8);
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    padding: 0px 0px 30px 0px;
	z-index: 9999;
`;

const OptionContainer = styled(Col)`
	background-color: #252525;
	z-index: 1000;
	width: 280px;
	height:100vh;
	padding: 0px 0px 30px 0px;
`;

const StyledMenuText = styled(Text)`
	color: white;
	font-family: sans-serif;
	display: flex;
	align-items: center;
	font-size: 1rem;
	line-height: 1.25rem;
	font-weight: 500;
	&:hover{
		color: #A466FF;
	}
`;

const OptionLink = styled(Link) <{ disabled: boolean }>`
	color: ${({ theme, disabled }) => (disabled ? theme.secondaryColor : theme.primaryColor)};
	background-color: transparent;
	padding-top: 5px;
	padding-bottom: 15px;
	padding-left: 32px;
	padding-right: 10px;
	border-radius: 8px;
	:hover {
		color: ${({ theme }) => theme.onSecondaryBrandColor};
		background-color: transparent;
	}
	filter: ${({ disabled }) => (disabled ? 'grayscale(100%)' : undefined)};
`;

const StyledConnectButton = styled(ConnectButton)`
	max-width: 94%;
	height: 40px;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		width: 100%;
	}
`;

const StyledDropDown = styled.div`
	background: #252123;
  	border-radius: 6px;
  	position: absolute;
  	width: 150px;
  	padding: 12px 10px;
  	top: 8px;
	  z-index:9999;
  	box-shadow: 0px 0px 60px rgb(0 0 0 / 29%);
  	border: 1px solid #4b4b4b;
	margin-left: 1rem;
`;

const StyledUl = styled.ul`
	list-style: none;
  	margin: 0;
  	padding: 0;
`;

const StyledLi = styled.li`
	color: white;
	&:hover{
		color: #A466FF;
	}
`;
const StyledLink = styled(Link)`
	color: white;
	font-family: sans-serif;
	display: flex;
	align-items: center;
	&:hover{
		color: #A466FF;
	}
`;

type IHeaderMenuProps = Record<string, never>;

interface IHeaderMenuState {
	openFarmSubMenu: boolean;
	openSubMenu: boolean;
	open: boolean;
	options: Array<{ label: string; href: string; disabled: boolean, subMenus?: any }>;
	uniqueClickClass: string;
}

class HeaderMenu extends Component<IHeaderMenuProps, IHeaderMenuState> {
	constructor(props: IHeaderMenuProps) {
		super(props);
		this.state = {
			openFarmSubMenu: false,
			openSubMenu: false,
			open: false,
			options: [
				{ label: 'Dashboard', href: '/', disabled: false },
				{ label: 'Swap', href: '/', disabled: false },
				{ label: 'Pool', href: '/', disabled: false },
				{
					label: 'Farm', href: '/', disabled: false,
					subMenus: [{ label: 'Browse', href: '', disabled: false },
					{ label: 'Add', href: '', disabled: false },
					{ label: 'Import', href: '', disabled: false }]
				},
				{ label: 'Bridge', href: '/', disabled: false },
				{ label: 'Stack', href: '/', disabled: false },
				{ label: 'Launchpad', href: '/', disabled: false },
			],
			uniqueClickClass: uniqueId(clickClass),
		};
	}

	componentDidMount(): void {
		window.addEventListener('click', this.handleClickEvent);
	}

	componentWillUnmount(): void {
		window.removeEventListener('click', this.handleClickEvent);
	}

	handleDropDownButton = (): void => {
		const { open } = this.state;
		this.setState({ open: !open });
	};

	handleClickEvent = (event: MouseEvent): void => {
		const { uniqueClickClass } = this.state;
		if (event.target && event.target instanceof HTMLElement && !event.target.className.includes(uniqueClickClass)) {
			if (event.target.className.includes("poolmenu") ||  event.target.className.includes("HelloTest")) {
				return
			}
			this.setState({ open: false });
		}
	};

	handleClickSubMenu = (): void => {
		this.setState({ openFarmSubMenu: false })
		this.setState({ openSubMenu: !this.state.openSubMenu })
	}

	handleClickFormMenu = (): void => {
		this.setState({ openSubMenu: false })
		this.setState({ openFarmSubMenu: !this.state.openFarmSubMenu })
	}

	render(): JSX.Element {
		const { open, options, uniqueClickClass } = this.state;
		return (
			<Col roundTop className='mob_menu1'>
				<DropDownButton className={uniqueClickClass} onClick={this.handleDropDownButton}>
					<Icon icon="bars" color="primary" height={35} />
				</DropDownButton>
				{open && (
					<Relative>
						<Absolute>
							<Container className='hide-scrollbar'>
								<OptionContainer horizontalPadding="m" verticalPadding="m">
									<Spacing vertical="s" />
									<OptionLink className={uniqueClickClass} href="/" disabled newTab={false}>
										<StyledMenuText fontSize="m" color="undefined">
											Swap
										</StyledMenuText>
									</OptionLink>
									<div className="extra-div">
										<div className='block-data' onClick={this.handleClickSubMenu}>
											<Spacing vertical="s" />
											<StyledMenuText fontSize="m" color="undefined" className='poolmenu'>
												<span className='pool-width poolmenu'>Stake</span>
												<Icon icon="downarrow" title="downarrow" color="primary" height={5} />
											</StyledMenuText>
										</div>
										{
											this.state.openSubMenu &&
											<div className='mobilesubmenu'>
												<StyledDropDown>
													<StyledUl>
														<StyledLi>
															<StyledLink href="/">
																<Icon icon="browserI" title="browserI" color="primary" height={26} />
																<Spacing className="space_mobile" horizontal="s" vertical="l" />
																Browse
															</StyledLink>
														</StyledLi>
														<StyledLi>
															<StyledLink href="/">
																<Icon icon="addI" title="addI" color="primary" height={26} />
																<Spacing className="space_mobile" horizontal="s" vertical="l" />
																Add
															</StyledLink>
														</StyledLi>
														<StyledLi>
															<StyledLink href="/">
																<Icon icon="importI" title="importI" color="primary" height={26} />
																<Spacing className="space_mobile" horizontal="s" vertical="l" />
																Import
															</StyledLink>
														</StyledLi>
													</StyledUl>
												</StyledDropDown>
											</div>
										}
									</div>
									{/* <div className="extra-div">
										<Spacing vertical="m" />
										<div className='block-data' onClick={this.handleClickFormMenu}>
											<StyledMenuText fontSize="m" color="undefined" className='poolmenu'>
												<span className='pool-width poolmenu'>Farm</span>
												<Icon icon="downarrow" title="downarrow" color="primary" height={5} />
											</StyledMenuText>
										</div>
										{
											this.state.openFarmSubMenu &&
											<div className='mobilesubmenu'>
												<StyledDropDown>
													<StyledUl>
														<StyledLi>
															<StyledLink href="/">
																<Spacing className="space_mobile" horizontal="s" vertical="l" />
																Your Farms
															</StyledLink>
														</StyledLi>
														<StyledLi>
															<StyledLink href="/">
																<Spacing className="space_mobile" horizontal="s" vertical="l" />
																All Farms
															</StyledLink>
														</StyledLi>
													</StyledUl>
												</StyledDropDown>
											</div>
										}
									</div> */}
									<Spacing vertical="s" />
									<OptionLink className={uniqueClickClass} href="/" disabled newTab={false}>
										<Spacing vertical="m" />
										<StyledMenuText fontSize="m" color="undefined">
											Launchpad
										</StyledMenuText>
									</OptionLink>
									<Spacing vertical="m" />
									<OptionLink className={uniqueClickClass} href="/" disabled newTab={false}>
										<Spacing vertical="m" />
										<StyledMenuText fontSize="m" color="undefined">
											Stake
										</StyledMenuText>
									</OptionLink>
									<Spacing vertical="m" />

									<div className='border-hr'></div>
									<div className='bottom-buttonpadd'>
										<NetworkButton />
										<Spacing vertical="m" mobile="s" />
										<StyledConnectButton />
									</div>
								</OptionContainer>
							</Container>
						</Absolute>
					</Relative>
				)}
			</Col>
		);
	}
}

const headerMenu = HeaderMenu;

export { headerMenu as HeaderMenu };
