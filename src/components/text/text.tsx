import { IColor, IFontSize, IFontWeight, IJustify, IOpacity } from 'components/types';
import { getColor, getFontSize, getOpacity, toPx } from 'components/utils';
import React, { FC } from 'react';
import styled from 'styled-components';

type IAlign = 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent';

type IWhiteSpace = 'nowrap';

type ITransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'full-width' | 'full-size-kana';

const StyledText = styled.p<{
	color: IColor;
	backgroundColor: IColor;
	fontSize: IFontSize | number;
	lineHeight?: IFontSize | number;
	fontWeight: IFontWeight;
	opacity: IOpacity;
	align?: IAlign;
	whiteSpace?: IWhiteSpace;
	transform?: ITransform;
	justify?: IJustify;
	mobileFontSize: IFontSize | number;
}>`
	color: ${({ theme, color }) => getColor(theme, color)};
	background-color: ${({ theme, backgroundColor }) => getColor(theme, backgroundColor)};
	font-size: ${({ theme, fontSize }): string => getFontSize(theme, fontSize)};
	line-height: ${({ theme, lineHeight }): string | undefined =>
		lineHeight === undefined ? undefined : getFontSize(theme, lineHeight)};
	font-weight: ${({ theme, fontWeight }) => (fontWeight === 'normal' ? theme.fontWeightNormal : theme.fontWeightBold)};
	opacity: ${({ theme, opacity }) => getOpacity(theme, opacity)};
	text-align: ${({ align }) => align};
	white-space: ${({ whiteSpace }) => whiteSpace};
	text-transform: ${({ transform }) => transform};
	justify-content: ${({ justify }) => justify};
	margin: 0px;

	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		font-size: ${({ theme, mobileFontSize }): string => getFontSize(theme, mobileFontSize)};
	}
`;

interface TextProps {
	id?: string;
	className?: string;
	color?: IColor;
	backgroundColor?: IColor;
	fontSize: IFontSize | number;
	lineHeight?: IFontSize | number;
	fontWeight?: IFontWeight;
	opacity?: IOpacity;
	align?: IAlign;
	whiteSpace?: IWhiteSpace;
	transform?: ITransform;
	justify?: IJustify;
	mobileFontSize?: IFontSize | number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	style?: any;
}

export const Text: FC<TextProps> = ({
	children,
	id,
	className,
	color,
	backgroundColor,
	fontSize,
	lineHeight,
	fontWeight,
	opacity,
	align,
	whiteSpace,
	transform,
	justify,
	mobileFontSize,
	style,
}) => (
	<StyledText
		style={style}
		id={id}
		className={className}
		color={color ?? 'primary'}
		backgroundColor={backgroundColor ?? 'transparent'}
		fontSize={fontSize}
		lineHeight={lineHeight}
		fontWeight={fontWeight ?? 'normal'}
		opacity={opacity ?? 'full'}
		align={align}
		whiteSpace={whiteSpace}
		transform={transform}
		justify={justify}
		mobileFontSize={mobileFontSize ?? fontSize}
	>
		{children}
	</StyledText>
);
