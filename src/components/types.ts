import { AbstractConnector } from '@web3-react/abstract-connector';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { Location, NavigateFunction, Params } from 'react-router-dom';

export type IColor =
	| 'undefined'
	| 'transparent'
	| 'primary'
	| 'secondary'
	| 'tertiary'
	| 'lightBlack'
	| 'primaryBrand'
	| 'secondaryBrand'
	| 'greeny'
	| 'onPrimaryBrand'
	| 'onSecondaryBrand'
	| 'primaryBackground'
	| 'secondaryBackground'
	| 'tertiaryBackground'
	| 'primaryError'
	| 'onError'
	| 'errorBackground';

export type IOpacity = 'light' | 'normal' | 'heavy' | 'full';

export type IJustify = 'center' | 'flex-end' | 'space-between' | 'space-around'| 'start';

export type IAlign = 'center' | 'flex-end' | 'baseline'| 'start';

export type IFlexDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse';

export type IOverflow = 'hidden';

export type IDistance = 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export type IWordBreak = 'break-all' | 'break-word';

export type IWhiteSpace = 'nowrap';

export type IFontSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export type IFontWeight = 'normal' | 'bold';

export interface IRouterProps<T extends string = string> {
	location: Location;
	navigate: NavigateFunction;
	params: Readonly<Params<T>>;
}

export interface IDevice {
	isDesktop: boolean;
	isMobile: boolean;
}

export interface IDeviceProps {
	device: IDevice;
}

export interface IEthereumConnector {
	label: string;
	icon: string;
	getConnector: () => AbstractConnector;
	isAuthorized: () => Promise<boolean>;
}

export interface IWeb3Props {
	web3: Web3ReactContextInterface;
}

export interface IDimensions {
	height: number;
	width: number;
}
