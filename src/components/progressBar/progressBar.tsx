import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import uniqueId from 'lodash/uniqueId';

import { Col } from 'components/col/col';
import { Row } from 'components/row/row';
import { IColor } from 'components/types';
import { getColor } from 'components/utils';

const StyledProgress = styled.progress<{ color: IColor; backgroundColor: IColor }>`
	/* display: flex;
	height: 26px;
	background-color: ${({ theme, backgroundColor }) => getColor(theme, backgroundColor)};
	width: 100%;
	justify-content:center; */

	// Firefox
	::-moz-progress-bar {
		background-color: ${({ theme, color }) => getColor(theme, color)};
	}

	// Chrome, Edge, Opera, Safari
	::-webkit-progress-value {
		background-color: ${({ theme, color }) => getColor(theme, color)};
	}

	// Chrome, Edge, Opera, Safari
	::-webkit-progress-bar {
		background-color: ${({ theme, backgroundColor }) => getColor(theme, backgroundColor)};
	}
`;

const ProgressBarContentWrapper = styled(Row) <{ height: number; width: number }>`
	position: absolute;
	height: ${({ height }) => `${height}px`};
	max-height: ${({ height }) => `${height}px`};
	width: ${({ width }) => `${width}px`};
	max-width: ${({ width }) => `${width}px`};
`;

interface IProgressBarProps {
	className?: string;
	value: number;
	max: number;
	color: IColor;
	backgroundColor: IColor;
}

export const ProgressBar: FC<IProgressBarProps> = ({ children, className, value, max, color, backgroundColor }) => {
	const [elementId] = useState(uniqueId('ProgressBar-'));
	const [height, setHeight] = useState(0);
	const [width, setWidth] = useState(0);

	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			const { height, width } = entries[0].contentRect;
			setHeight(height);
			setWidth(width);
		});
		const element = document.getElementById(elementId);
		if (element) {
			resizeObserver.observe(element);
		}

		return () => resizeObserver.disconnect();
	}, [elementId, setHeight, setWidth]);

	return (
		<Col className={className} id={elementId}>
			<StyledProgress value={value} max={max} color={color} backgroundColor={backgroundColor} />
			<ProgressBarContentWrapper height={height} width={width} justify="center" align="center">
				{children}
			</ProgressBarContentWrapper>
		</Col>
	);
};
