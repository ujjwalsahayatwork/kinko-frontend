import React, { FC, useMemo } from 'react';
import Svg from 'react-inlinesvg';
import styled from 'styled-components';

import angleDown from 'assets/images/icons/angle-down-solid.svg';
import angleRight from 'assets/images/icons/angle-right-solid.svg';
import avax from 'assets/images/icons/avax.svg';
import bars from 'assets/images/icons/bars-solid.svg';
import bsc from 'assets/images/icons/bsc.svg';
import calendar from 'assets/images/icons/calendar-solid.svg';
import calendarOutlined from 'assets/images/icons/calendar.svg';
import chartPie from 'assets/images/icons/chart-pie-solid.svg';
import check from 'assets/images/icons/check-solid.svg';
import circleCheck from 'assets/images/icons/circle-check-solid.svg';
import circleInfo from 'assets/images/icons/circle-info-solid.svg';
import circleXMark from 'assets/images/icons/circle-xmark-solid.svg';
import clock from 'assets/images/icons/clock.svg';
import clockOutlined from 'assets/images/icons/greenClock.svg';
import live from 'assets/images/icons/live.svg';
import coingecko from 'assets/images/icons/coingecko.svg';
import coinmarketcap from 'assets/images/icons/coinmarketcap.svg';
import copy from 'assets/images/icons/copy-solid.svg';
import copyOutlined from 'assets/images/icons/copy-outlined.svg';
import cube from 'assets/images/icons/cube-solid.svg';
import envelope from 'assets/images/icons/envelope-solid.svg';
import globe from 'assets/images/icons/globe-solid.svg';
import lock from 'assets/images/icons/lock-solid.svg';
import medium from 'assets/images/icons/medium-brands.svg';
import telegram from 'assets/images/icons/telegram.svg';
import near from 'assets/images/icons/near.svg';
import paperPlane from 'assets/images/icons/paper-plane-solid.svg';
import plus from 'assets/images/icons/plus-solid.svg';
import plusOutline from 'assets/images/icons/plus.svg';
import thumbsDown from 'assets/images/icons/thumbs-down-solid.svg';
import triangleExclamation from 'assets/images/icons/triangle-exclamation-solid.svg';
import trophy from 'assets/images/icons/trophy-solid.svg';
import twitter from 'assets/images/icons/twitter-brands.svg';
import upRightFromSquare from 'assets/images/icons/up-right-from-square-solid.svg';
import urlRedirect from 'assets/images/icons/url-redirect.svg';
import user from 'assets/images/icons/user-solid.svg';
import wifi from 'assets/images/icons/wifi-solid.svg';
import xmark from 'assets/images/icons/xmark-solid.svg';
import downarrow from 'assets/images/icons/downarrow.svg';
import telegrameIcon from 'assets/images/icons/telegrameIcon-2.svg';
import importI from 'assets/images/icons/importI.svg';
import non_profit from 'assets/images/icons/non-profit.svg';
import browserI from 'assets/images/icons/browserI.svg';
import addI from 'assets/images/icons/addI.svg';
import chainsulting from 'assets/images/icons/chainsulting.svg';
import sfIcon from 'assets/images/icons/SFIcon.svg';
import searchIcon from 'assets/images/icons/searchIcon.svg';
import { IColor } from 'components/types';
import { getColor, toPx } from 'components/utils';

export type IIcon =
	| 'angleDown'
	| 'angleRight'
	| 'avax'
	| 'bars'
	| 'bsc'
	| 'calendar'
	| 'calendarOutlined'
	| 'chartPie'
	| 'check'
	| 'circleCheck'
	| 'circleInfo'
	| 'circleXMark'
	| 'clock'
	| 'clockOutlined'
	| 'coingecko'
	| 'coinmarketcap'
	| 'copy'
	| 'copyOutlined'
	| 'cube'
	| 'non_profit'
	| 'envelope'
	| 'globe'
	| 'lock'
	| 'medium'
	| 'telegram'
	| 'near'
	| 'paperPlane'
	| 'plus'
	| 'plusOutline'
	| 'thumbsDown'
	| 'triangleExclamation'
	| 'telegrameIcon'
	| 'trophy'
	| 'twitter'
	| 'upRightFromSquare'
	| 'urlRedirect'
	| 'user'
	| 'wifi'
	| 'xmark'
	| 'chainsulting'
	| 'sfIcon'
	| 'importI'
	| 'browserI'
	| 'addI'
	| 'downarrow'
	| 'searchIcon'
	| 'live';

const StyledSvg = styled(Svg) <{ _color: IColor; _height?: number; _width?: number }>`
	display: flex;
	color: ${({ theme, _color }) => getColor(theme, _color)};
	height: ${({ _height }) => (_height === undefined ? 'auto' : toPx(_height))};
	min-height: ${({ _height }) => (_height === undefined ? 'auto' : toPx(_height))};
	max-height: ${({ _height }) => (_height === undefined ? 'auto' : toPx(_height))};
	width: ${({ _width }) => (_width === undefined ? 'auto' : toPx(_width))};
	min-width: ${({ _width }) => (_width === undefined ? 'auto' : toPx(_width))};
	max-width: ${({ _width }) => (_width === undefined ? 'auto' : toPx(_width))};
`;

interface IIconProps {
	className?: string;
	icon: IIcon;
	title?: string;
	color: IColor;
	height?: number;
	width?: number;
}

export const Icon: FC<IIconProps> = ({ className, icon, title, color, height, width }) => {
	const src: string = useMemo(() => {
		// eslint-disable-next-line default-case
		switch (icon) {
			case 'importI':
				return importI;
			case 'browserI':
				return browserI;
			case 'searchIcon':
				return searchIcon;
			case 'addI':
				return addI;
			case 'downarrow':
				return downarrow;
			case 'angleDown':
				return angleDown;
			case 'angleRight':
				return angleRight;
			case 'non_profit':
				return non_profit;
			case 'avax':
				return avax;
			case 'bars':
				return bars;
			case 'bsc':
				return bsc;
			case 'calendar':
				return calendar;
			case 'calendarOutlined':
				return calendarOutlined;
			case 'chartPie':
				return chartPie;
			case 'check':
				return check;
			case 'circleCheck':
				return circleCheck;
			case 'circleInfo':
				return circleInfo;
			case 'circleXMark':
				return circleXMark;
			case 'clock':
				return clock;
			case 'clockOutlined':
				return clockOutlined;
			case 'coingecko':
				return coingecko;
			case 'coinmarketcap':
				return coinmarketcap;
			case 'copy':
				return copy;
			case 'copyOutlined':
				return copyOutlined;
			case 'cube':
				return cube;
			case 'envelope':
				return envelope;
			case 'globe':
				return globe;
			case 'lock':
				return lock;
			case 'medium':
				return medium;
			case 'telegram':
				return telegram;
			case 'near':
				return near;
			case 'paperPlane':
				return paperPlane;
			case 'plus':
				return plus;
			case 'plusOutline':
				return plusOutline;
			case 'thumbsDown':
				return thumbsDown;
			case 'triangleExclamation':
				return triangleExclamation;
			case 'telegrameIcon':
				return telegrameIcon;
			case 'trophy':
				return trophy;
			case 'twitter':
				return twitter;
			case 'upRightFromSquare':
				return upRightFromSquare;
			case 'urlRedirect':
				return urlRedirect;
			case 'user':
				return user;
			case 'wifi':
				return wifi;
			case 'xmark':
				return xmark;
			case 'chainsulting':
				return chainsulting;
			case 'sfIcon':
				return sfIcon;
			case 'live':
				return live;
		}
	}, [icon]);

	return <StyledSvg className={className} src={src} title={title} _color={color} _height={height} _width={width} />;
};
