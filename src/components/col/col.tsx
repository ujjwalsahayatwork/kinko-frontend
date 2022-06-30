import { IAlign, IColor, IDistance, IFlexDirection, IJustify, IOverflow } from 'components/types';
import { getColor, getDistance, toPx } from 'components/utils';
import React, { FC } from 'react';
import styled from 'styled-components';

const StyledCol = styled.div<{
	justify?: IJustify;
	align?: IAlign;
	maxWidth: boolean;
	horizontalMargin: IDistance;
	verticalMargin: IDistance;
	horizontalPadding: IDistance;
	verticalPadding: IDistance;
	roundTop: boolean;
	roundBottom: boolean;
	overflow?: IOverflow;
	backgroundColor: IColor;
	shadow: boolean;
	mobileDirection: IFlexDirection;
	flexGrow?: number;
}>`
	display: flex;
	flex-direction: column;
	justify-content: ${({ justify }) => justify};
	align-items: ${({ align }) => align};
	width: ${({ maxWidth }) => (maxWidth ? '100%' : undefined)};
	background-color: ${({ theme, backgroundColor }) => getColor(theme, backgroundColor)};
	margin-left: ${({ theme, horizontalMargin }) => toPx(getDistance(theme, horizontalMargin))};
	margin-right: ${({ theme, horizontalMargin }) => toPx(getDistance(theme, horizontalMargin))};
	margin-top: ${({ theme, verticalMargin }) => toPx(getDistance(theme, verticalMargin))};
	margin-bottom: ${({ theme, verticalMargin }) => toPx(getDistance(theme, verticalMargin))};
	padding-left: ${({ theme, horizontalPadding }) => toPx(getDistance(theme, horizontalPadding))};
	padding-right: ${({ theme, horizontalPadding }) => toPx(getDistance(theme, horizontalPadding))};
	padding-top: ${({ theme, verticalPadding }) => toPx(getDistance(theme, verticalPadding))};
	padding-bottom: ${({ theme, verticalPadding }) => toPx(getDistance(theme, verticalPadding))};
	border-top-left-radius: ${({ theme, roundTop }) => (roundTop ? toPx(theme.borderRadius) : '0px')};
	border-top-right-radius: ${({ theme, roundTop }) => (roundTop ? toPx(theme.borderRadius) : '0px')};
	border-bottom-left-radius: ${({ theme, roundBottom }) => (roundBottom ? toPx(theme.borderRadius) : '0px')};
	border-bottom-right-radius: ${({ theme, roundBottom }) => (roundBottom ? toPx(theme.borderRadius) : '0px')};
	overflow: ${({ overflow }) => overflow};
	box-shadow: ${({ theme, shadow }) => (shadow ? `0px 0px 10px ${theme.shadowColor}` : 'none')};
	flex-grow: ${({ flexGrow }) => flexGrow};

	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		flex-direction: ${({ mobileDirection }) => mobileDirection};
	}
`;

interface IColProps {
	className?: string;
	id?: string;
	ref?: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null;
	justify?: IJustify;
	align?: IAlign;
	maxWidth?: boolean;
	horizontalMargin?: IDistance;
	verticalMargin?: IDistance;
	horizontalPadding?: IDistance;
	verticalPadding?: IDistance;
	roundTop?: boolean;
	roundBottom?: boolean;
	overflow?: IOverflow;
	backgroundColor?: IColor;
	shadow?: boolean;
	mobileDirection?: IFlexDirection;
	flexGrow?: number;
}

export const Col: FC<IColProps> = ({
	children,
	className,
	id,
	ref,
	justify,
	align,
	maxWidth,
	horizontalMargin,
	verticalMargin,
	horizontalPadding,
	verticalPadding,
	roundTop,
	roundBottom,
	overflow,
	backgroundColor,
	shadow,
	mobileDirection,
	flexGrow,
}) => (
	<StyledCol
		className={className}
		id={id}
		ref={ref}
		justify={justify}
		align={align}
		maxWidth={maxWidth ?? false}
		horizontalMargin={horizontalMargin ?? 'none'}
		verticalMargin={verticalMargin ?? 'none'}
		horizontalPadding={horizontalPadding ?? 'none'}
		verticalPadding={verticalPadding ?? 'none'}
		roundTop={roundTop ?? false}
		roundBottom={roundBottom ?? false}
		overflow={overflow}
		backgroundColor={backgroundColor ?? 'transparent'}
		shadow={shadow ?? false}
		mobileDirection={mobileDirection ?? 'column'}
		flexGrow={flexGrow}
	>
		{children}
	</StyledCol>
);
