import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		primaryColor: string;
		secondaryColor: string;
		purpleColor: string;
		tertiaryColor: string;
		primaryBrandColor: string;
		secondaryBrandColor: string;
		onPrimaryBrandColor: string;
		onSecondaryBrandColor: string;
		primaryBackgroundColor: string;
		lightBlackColor:string
		secondaryBackgroundColor: string;
		greenyColor:string
		tertiaryBackgroundColor: string;
		quaternaryBackgroundColor: string;
		buttonBackgroundColor: string;
		underPrimaryBandColor: string;
		primaryErrorColor: string;
		errorBackgroundColor: string;
		onErrorColor: string;
		doughnutColors: Array<string>;
		shadowColor: string;

		fontSizeXXS: number;
		fontSizeXS: number;
		fontSizeS: number;
		fontSizeM: number;
		fontSizeL: number;
		fontSizeXL: number;
		fontSizeXXL: number;

		fontWeightNormal: string;
		fontWeightBold: string;

		opacityLight: number;
		opacityNormal: number;
		opacityHeavy: number;

		inputHeight: number;
		borderRadius: number;
		buttonBorderRadius: number;
		distanceXS: number;
		distanceS: number;
		distanceM: number;
		distanceL: number;
		distanceXL: number;
		distanceXXL: number;

		mobileThreshold: number;
	}
}
