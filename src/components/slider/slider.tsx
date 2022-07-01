import minus from 'assets/images/icons/minus-solid.svg';
import plus from 'assets/images/icons/plus-solid.svg';
import { BaseButton } from 'components/baseButton/baseButton';
import { Col } from 'components/col/col';
import { Row } from 'components/row/row';
import { Text } from 'components/text/text';
import { browser, toPx } from 'components/utils';
import uniqueId from 'lodash/uniqueId';
import React, { ChangeEvent, Component } from 'react';
import Svg from 'react-inlinesvg';
import styled from 'styled-components';

type ISliderSize = 's' | 'm';

const thumbSize = (sliderSize: ISliderSize) => (sliderSize === 's' ? 21 : 44);

const buttonSize = (sliderSize: ISliderSize) => (sliderSize === 's' ? 48 : 64);

const ThumbTextSpacing = styled.div<{ sliderSize: ISliderSize }>`
	display: flex;
	width: ${({ theme, sliderSize }) => toPx(buttonSize(sliderSize) + theme.distanceM + thumbSize(sliderSize) / 2)};
`;

const ThumbTextWrapper = styled.div<{ height: number }>`
	display: flex;
	height: ${({ height }) => toPx(height)};
	flex: 1;
	position: relative;
`;

const ThumbText = styled(Text)`
	position: absolute;
	transform: translateX(-50%);
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 18px;
`;

const SliderWrapper = styled.div`
	display: flex;
	width: 100%;
	margin-left: ${({ theme }) => toPx(theme.distanceM)};
	margin-right: ${({ theme }) => toPx(theme.distanceM)};
`;

const LinesRelative = styled.div`
	display: flex;
	position: relative;
	flex: 1;
`;

const LinesAbsolute = styled.div<{ sliderSize: ISliderSize; height: number; width: number }>`
	display: flex;
	position: absolute;
	height: ${({ height }) => toPx(height)};
	width: ${({ sliderSize, width }) => toPx(width - thumbSize(sliderSize))};
	margin-left: ${({ sliderSize }) => toPx(thumbSize(sliderSize) / 2)};
	justify-content: space-between;
	align-items: center;
`;

const VertialcLineWrapper = styled(Col)``;

const VerticalLine = styled.div<{ reached: boolean }>`
	display: flex;
	height: 20px;
	width: 4px;
	background-color: ${({ theme, reached }) => (reached ? theme.secondaryBrandColor : theme.tertiaryColor)};
`;

const LineTextRelative = styled.div`
	display: flex;
	position: relative;
`;

const LineTextAbsolute = styled.div`
	display: flex;
	position: absolute;
	transform: translateX(-50%);
`;

const StyledSlider = styled.input<{ sliderSize: ISliderSize }>`
	display: flex;
	margin: 0px;
	width: 100%;
	z-index: 100;
	background-color: transparent;
	-webkit-appearance: none; // Chrome, Edge, Opera, Safari
	appearance: none;

	// Firefox
	::-moz-range-track {
		height: 9px;
		cursor: pointer;
		border: none;
		border-radius: 9px;
		background-color: ${({ theme }) => theme.tertiaryColor};
		z-index: 100;
	}

	// Firefox
	::-moz-range-progress {
		height: 9px;
		border: none;
		border-radius: 9px;
		background-color: ${({ theme }) => theme.secondaryBrandColor};
		z-index: 100;
	}

	// Firefox
	::-moz-range-thumb {
		height: ${({ sliderSize }) => toPx(thumbSize(sliderSize))};
		width: ${({ sliderSize }) => toPx(thumbSize(sliderSize))};
		border: none;
		border-radius: ${({ sliderSize }) => toPx(thumbSize(sliderSize))};
		background-color: ${({ theme }) => theme.secondaryBrandColor};
		cursor: pointer;
	}

	// Chrome, Edge, Opera, Safari
	::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		height: ${({ sliderSize }) => toPx(thumbSize(sliderSize))};
		width: ${({ sliderSize }) => toPx(thumbSize(sliderSize))};
		border: none;
		border-radius: ${({ sliderSize }) => toPx(thumbSize(sliderSize))};
		background-color: ${({ theme }) => theme.secondaryBrandColor};
		cursor: pointer;
		transform: ${({ sliderSize }) => `translateY(${toPx(-(thumbSize(sliderSize) / 2 - 9 / 2))})`};
	}

	// Chrome, Edge, Opera, Safari
	::-webkit-slider-runnable-track {
		height: 9px;
		cursor: pointer;
		border: none;
		border-radius: 9px;
		background-color: ${({ theme }) => theme.tertiaryColor};
	}
`;

const StyledButton = styled(BaseButton)<{ sliderSize: ISliderSize }>`
	color: ${({ theme }) => theme.secondaryBrandColor};
	background-color: ${({ theme }) => theme.secondaryBackgroundColor};
	height: ${({ sliderSize }) => toPx(buttonSize(sliderSize))};
	min-height: ${({ sliderSize }) => toPx(buttonSize(sliderSize))};
	max-height: ${({ sliderSize }) => toPx(buttonSize(sliderSize))};
	width: ${({ sliderSize }) => toPx(buttonSize(sliderSize))};
	min-width: ${({ sliderSize }) => toPx(buttonSize(sliderSize))};
	max-width: ${({ sliderSize }) => toPx(buttonSize(sliderSize))};
	border-radius: ${({ sliderSize }) => toPx(buttonSize(sliderSize))};
	justify-content: center;
	align-items: center;
	box-shadow: ${({ theme }) => `0px 0px 10px ${theme.shadowColor}`};
`;

const iconSize = (sliderSize: ISliderSize) => (sliderSize === 's' ? 15 : 32);

interface ISliderProps {
	className?: string;
	min: number;
	max: number;
	step?: number;
	value: number;
	size: ISliderSize;
	unit?: string;
	lineNum?: number;
	lineText?: (index: number) => string;
	onChange: (value: number) => void;
	onDec: () => void;
	onInc: () => void;
}

interface ISliderState {
	thumbTextId: string;
	thumbTextHeight: number;
	inputId: string;
	inputHeight: number;
	inputWidth: number;
}

export class Slider extends Component<ISliderProps, ISliderState> {
	thumbTextResizeObserver: ResizeObserver | undefined;

	inputResizeObserver: ResizeObserver | undefined;

	constructor(props: ISliderProps) {
		super(props);
		this.state = {
			thumbTextId: uniqueId('Slider-ThumbText-'),
			thumbTextHeight: 0,
			inputId: uniqueId('Slider-StyledSlider-'),
			inputHeight: 0,
			inputWidth: 0,
		};
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	componentDidMount() {
		const { thumbTextId, inputId } = this.state;

		this.thumbTextResizeObserver = new ResizeObserver((entries) => {
			if (entries.length > 0) {
				this.setState({ thumbTextHeight: entries[0].contentRect.height });
			}
		});
		const thumbTextElement = document.getElementById(thumbTextId);
		if (thumbTextElement) {
			this.thumbTextResizeObserver.observe(thumbTextElement);
		}
		this.inputResizeObserver = new ResizeObserver((entries) => {
			if (entries.length > 0) {
				const { height, width } = entries[0].contentRect;
				this.setState({ inputHeight: height, inputWidth: width });
			}
		});
		const inputElement = document.getElementById(inputId);
		if (inputElement) {
			this.inputResizeObserver.observe(inputElement);
		}
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	componentDidUpdate(prevProps: ISliderProps, prevState: ISliderState) {
		const { value } = this.props;
		const { inputWidth } = this.state;
		if (prevProps.value !== value || prevState.inputWidth !== inputWidth) {
			this.calcPos();
		}
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	componentWillUnmount() {
		this.thumbTextResizeObserver?.disconnect();
		this.inputResizeObserver?.disconnect();
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	calcPos = () => {
		const { min, max, value, size } = this.props;
		const { inputWidth, thumbTextId } = this.state;
		const thumbText = document.getElementById(thumbTextId);
		if (thumbText) {
			const a = ((value - min) / (max - min)) * (inputWidth - thumbSize(size));
			thumbText.style.left = `${a}px`;
		}
	};

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		this.props.onChange(Number(event.currentTarget.value));
	};

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	render() {
		const { className, min, max, step, value, size, unit, lineNum, lineText, onDec, onInc } = this.props;
		const { thumbTextId, thumbTextHeight, inputId, inputHeight, inputWidth } = this.state;

		return (
			<Col className={className}>
				<Row>
					<ThumbTextSpacing sliderSize={size} />
					<ThumbTextWrapper height={thumbTextHeight}>
						<ThumbText id={thumbTextId} fontSize="s" mobileFontSize="s" fontWeight="normal">
							{value}
							{unit}
						</ThumbText>
					</ThumbTextWrapper>
					<ThumbTextSpacing sliderSize={size} />
				</Row>
				<Row>
					<StyledButton title="Less" sliderSize={size} onClick={onDec}>
						<Svg src={minus} height={iconSize(size)} width={iconSize(size)} />
					</StyledButton>
					<SliderWrapper>
						{lineNum && size === 'm' && (
							<LinesRelative>
								<LinesAbsolute sliderSize={size} height={inputHeight} width={inputWidth}>
									{Array.from(new Array(lineNum)).map((_, index) => {
										const reached =
											browser?.name === 'firefox' ? ((max - min) / (lineNum - 1)) * index < value - min : false;
										return (
											// eslint-disable-next-line react/no-array-index-key
											<VertialcLineWrapper key={index} align="center">
												<VerticalLine reached={reached} />
												{lineText && (
													<LineTextRelative>
														<LineTextAbsolute>
															<Text fontSize="xxs" color="secondary">
																{lineText(index)}
															</Text>
														</LineTextAbsolute>
													</LineTextRelative>
												)}
											</VertialcLineWrapper>
										);
									})}
								</LinesAbsolute>
							</LinesRelative>
						)}
						<StyledSlider
							id={inputId}
							sliderSize={size}
							type="range"
							min={min}
							max={max}
							step={step}
							value={value}
							onChange={this.handleChange}
						/>
					</SliderWrapper>
					<StyledButton title="More" sliderSize={size} onClick={onInc}>
						<Svg src={plus} height={iconSize(size)} width={iconSize(size)} />
					</StyledButton>
				</Row>
			</Col>
		);
	}
}
