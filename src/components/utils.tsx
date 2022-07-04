import { getWeb3ReactContext } from '@web3-react/core';
import {
	IColor,
	IDevice,
	IDeviceProps,
	IDimensions,
	IDistance,
	IFontSize,
	IOpacity,
	IRouterProps,
	IWeb3Props,
} from 'components/types';
import { detect } from 'detect-browser';
import React, { ComponentType, FC, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DefaultTheme, useTheme } from 'styled-components';

export const browser = detect();

export const toPx = (value: number): string => `${value}px`;

export const getColor = (theme: DefaultTheme, color: IColor): string | undefined => {
	// eslint-disable-next-line default-case
	switch (color) {
		case 'undefined':
			return undefined;
		case 'transparent':
			return 'transparent';
		case 'primary':
			return theme.primaryColor;
		case 'secondary':
			return theme.secondaryColor;
		case 'tertiary':
			return theme.tertiaryColor;
		case 'primaryBrand':
			return theme.primaryBrandColor;
		case 'secondaryBrand':
			return theme.secondaryBrandColor;
		case 'greeny':
			return theme.greenyColor;
		case 'lightBlack':
			return theme.lightBlackColor;
		case 'onPrimaryBrand':
			return theme.onPrimaryBrandColor;
		case 'onSecondaryBrand':
			return theme.onSecondaryBrandColor;
		case 'primaryBackground':
			return theme.primaryBackgroundColor;
		case 'secondaryBackground':
			return theme.secondaryBackgroundColor;
		case 'tertiaryBackground':
			return theme.tertiaryBackgroundColor;
		case 'primaryError':
			return theme.primaryErrorColor;
		case 'onError':
			return theme.onErrorColor;
		case 'errorBackground':
			return theme.errorBackgroundColor;
	}
};

export const getDistance = (theme: DefaultTheme, distance: IDistance): number => {
	// eslint-disable-next-line default-case
	switch (distance) {
		case 'none':
			return 0;
		case 'xs':
			return theme.distanceXS;
		case 's':
			return theme.distanceS;
		case 'm':
			return theme.distanceM;
		case 'l':
			return theme.distanceL;
		case 'xl':
			return theme.distanceXL;
		case 'xxl':
			return theme.distanceXXL;
	}
};

export const getFontSize = (theme: DefaultTheme, fontSize: IFontSize | number): string => {
	if (typeof fontSize === 'number') {
		return toPx(fontSize);
	}
	// eslint-disable-next-line default-case
	switch (fontSize) {
		case 'xxs':
			return toPx(theme.fontSizeXXS);
		case 'xs':
			return toPx(theme.fontSizeXS);
		case 's':
			return toPx(theme.fontSizeS);
		case 'm':
			return toPx(theme.fontSizeM);
		case 'l':
			return toPx(theme.fontSizeL);
		case 'xl':
			return toPx(theme.fontSizeXL);
		case 'xxl':
			return toPx(theme.fontSizeXXL);
	}
};

export const getOpacity = (theme: DefaultTheme, opacity: IOpacity): number => {
	// eslint-disable-next-line default-case
	switch (opacity) {
		case 'light':
			return theme.opacityLight;
		case 'normal':
			return theme.opacityNormal;
		case 'heavy':
			return theme.opacityHeavy;
		case 'full':
			return 1;
	}
};

export const withRouter = <
	T extends string,
	P extends IRouterProps<T> = IRouterProps<T>,
	R = Omit<P, keyof IRouterProps<T>>
>(
	Component: ComponentType<P>
): ComponentType<R> => {
	// eslint-disable-next-line  @typescript-eslint/no-explicit-any
	const Wrapper: FC<R> = (props: any) => {
		const location = useLocation();
		const navigate = useNavigate();
		const params = useParams<T>();

		// eslint-disable-next-line react/jsx-props-no-spreading
		return <Component location={location} navigate={navigate} params={params} {...props} />;
	};

	return Wrapper;
};

const getWindowDimensions = () => {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
};

export const useWindowDimensions = (): IDimensions => {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		const handleResize = () => {
			setWindowDimensions(getWindowDimensions());
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [setWindowDimensions]);

	return windowDimensions;
};

export const useDimensions = (): IDimensions => {
	const [height, setHeight] = useState(getWindowDimensions().height);
	const [width, setWidth] = useState(getWindowDimensions().width);

	useEffect(() => {
		const handleResize = () => {
			setHeight(getWindowDimensions().height);
		};
		window.addEventListener('resize', handleResize);

		const resizeObserver = new ResizeObserver((entries) => {
			setWidth(entries[0].contentRect.width);
		});
		const root = document.getElementById('root');
		if (root) {
			resizeObserver.observe(root);
		}

		return () => {
			window.removeEventListener('resize', handleResize);
			resizeObserver.disconnect();
		};
	}, [setHeight, setWidth, getWindowDimensions, window]);

	const dimensions = useMemo(() => ({ height, width }), [height, width]);

	return dimensions;
};

export const useDevice = (): IDevice => {
	const theme = useTheme();
	const { width } = useWindowDimensions();

	const device = useMemo(() => {
		if (width < theme.mobileThreshold) {
			return { isMobile: true, isDesktop: false };
		}
		return { isMobile: false, isDesktop: true };
	}, [width, theme]);

	return device;
};

export const withDevice = <P extends IDeviceProps, R = Omit<P, keyof IDeviceProps>>(
	Component: ComponentType<P>
): ComponentType<R> => {
	// eslint-disable-next-line  @typescript-eslint/no-explicit-any
	const Wrapper: FC<R> = (props: any) => {
		const device = useDevice();

		// eslint-disable-next-line react/jsx-props-no-spreading
		return <Component device={device} {...props} />;
	};

	return Wrapper;
};

export const withWeb3 =
	<P extends IWeb3Props, R = Omit<P, keyof IWeb3Props>>(Component: ComponentType<P> | FC<P>): FC<R> =>
		// eslint-disable-next-line  @typescript-eslint/no-explicit-any
		(props: any) => {
			const Web3ReactContext = getWeb3ReactContext();

			// eslint-disable-next-line react/jsx-props-no-spreading
			return <Web3ReactContext.Consumer>{(value) => <Component {...props} web3={value} />}</Web3ReactContext.Consumer>;
		};

export const loadState = <T,>(key: string, deserialise: (state: T | undefined) => T): T => {
	const item = sessionStorage.getItem(key);
	if (item) {
		return deserialise(JSON.parse(item));
	}
	return deserialise(undefined);
};

export const saveState = <T,>(key: string, state: T, serialise: (state: T) => unknown = (state: T) => state): void => {
	sessionStorage.setItem(key, JSON.stringify(serialise(state)));
};
