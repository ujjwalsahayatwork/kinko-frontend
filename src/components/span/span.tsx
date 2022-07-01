import { IColor, IFontSize, IFontWeight, IOpacity } from 'components/types';
import { getColor, getFontSize, getOpacity, toPx } from 'components/utils';
import React, { FC } from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span<{
	color?: IColor;
	backgroundColor?: IColor;
	fontSize?: IFontSize | number;
	lineHeight?: IFontSize | number;
	fontWeight?: IFontWeight;
	opacity: IOpacity;
	mobileFontSize?: IFontSize | number;
}>`
	color: ${({ theme, color }) => getColor(theme, color ?? 'undefined')};
	background-color: ${({ theme, backgroundColor }) => getColor(theme, backgroundColor ?? 'undefined')};
	font-size: ${({ theme, fontSize }): string | undefined =>
		fontSize === undefined ? undefined : getFontSize(theme, fontSize)};
	line-height: ${({ theme, lineHeight }): string | undefined =>
		lineHeight === undefined ? undefined : getFontSize(theme, lineHeight)};
	font-weight: ${({ theme, fontWeight }) =>
		fontWeight === undefined ? undefined : fontWeight === 'normal' ? theme.fontWeightNormal : theme.fontWeightBold};
	opacity: ${({ theme, opacity }) => getOpacity(theme, opacity)};

	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		font-size: ${({ theme, mobileFontSize }): string | undefined =>
			mobileFontSize === undefined ? undefined : getFontSize(theme, mobileFontSize)};
	}
`;

interface SpanProps {
	className?: string;
	color?: IColor;
	backgroundColor?: IColor;
	fontSize?: IFontSize | number;
	lineHeight?: IFontSize | number;
	fontWeight?: IFontWeight;
	opacity?: IOpacity;
	mobileFontSize?: IFontSize | number;
}

export const Span: FC<SpanProps> = ({
	children,
	className,
	color,
	backgroundColor,
	fontSize,
	lineHeight,
	fontWeight,
	opacity = 'full',
	mobileFontSize,
}) => (
	<StyledSpan
		className={className}
		color={color}
		backgroundColor={backgroundColor}
		fontSize={fontSize}
		lineHeight={lineHeight}
		fontWeight={fontWeight}
		opacity={opacity}
		mobileFontSize={mobileFontSize ?? fontSize}
	>
		{children}
	</StyledSpan>
);
