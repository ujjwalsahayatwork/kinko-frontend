import { Col } from 'components/col/col';
import { Row } from 'components/row/row';
import { Spacing } from 'components/spacing/spacing';
import { Text } from 'components/text/text';
import { toPx, useDevice } from 'components/utils';
import uniqueId from 'lodash/uniqueId';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import './creationSteps.scss';
import check from 'assets/images/icons/checkIcon.svg';

type IStepType = 'general' | 'caps' | 'prediction' | 'period' | 'summary' | 'socials';

const steps: Array<{ type: IStepType; title: string }> = [
	{ type: 'general', title: 'General' },
	{ type: 'caps', title: 'Caps' },
	// { type: 'prediction', title: 'Prediction' },
	{ type: 'period', title: 'Period' },
	{ type: 'summary', title: 'Summary' },
	{ type: 'socials', title: 'Socials' },
];

const isReached = (currentStepType: IStepType, reachedStepType: IStepType): boolean => {
	const currentStepIndex = steps.findIndex((step) => step.type === currentStepType);
	const reachedStepIndex = steps.findIndex((step) => step.type === reachedStepType);
	return currentStepIndex <= reachedStepIndex;
};

const getStepIndex = (stepType: IStepType): number => steps.findIndex((step) => step.type === stepType);

const ScrollingRow = styled(Row)<{ width: number }>`
	/* max-width: ${({ width }) => toPx(width)}; */
	/* overflow-x: scroll; */
	-ms-overflow-style: none; // IE
	scrollbar-width: none; // Firefox
	position: relative;
	z-index: 0;
	margin: 0 auto;
	left: -0.75rem;
	// Chrome, Edge, Opera, Safari
	::-webkit-scrollbar {
		display: none;
	}
	@media (max-width: 330px) {
		left: 0.25rem;
	}
`;

const StyledCreateIlo = styled(Text)`
	font-style: normal;
	font-weight: 400;
	font-size: 40px;
	line-height: 50px;
	text-align: center;
`;

const StyledTabText = styled(Text)`
	font-style: normal;
	font-weight: 600;
	font-size: 18px;
	line-height: 23px;
	/* text-align: center; */
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		font-size: 14px;
		line-height: 18px;
		/* margin-left: 8px; */
		text-align: center;
	}
	@media (max-width: 653px) {
		font-size: 10px;
		line-height: 14px;
	}
`;

const StyledHorizontal = styled.div`
	/* height: 3rem; */
	display: flex;
	align-items: center;
	/* height: 0px; */
	width: 12vw;
	max-width: 272px;
	/* background-color: #7079B9; */
	border: 1px dashed #7079b9;
	justify-content: center;
	position: relative;
	left: 5.5rem !important;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		left: 15px;
	}
	@media (max-width: 1088px) {
		left: 35px;
	}
	@media (max-width: 1024px) {
		left: 67px;
	}
	@media (max-width: 820px) {
		left: 4.5rem !important;
	}
	@media (max-width: 767px) {
		left: 3.3rem !important;
		width: 8vw;
	}
	@media (max-width: 330px) {
		width: 6.5vw;
		left: 2.8rem !important;
	}
	&::before {
		content: '';
		position: absolute;
		background: transparent;
		height: 35px;
		width: 35px;
		border-radius: 50px;
		border: 2px solid #7079b9;
		justify-content: center;
		left: 1px;
		margin-left: -2.3rem;
		@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
			height: 22px;
			width: 22px;
		}
		@media (max-width: 653px) {
			height: 18px;
			width: 18px;
			margin-left: -1.8rem;
			/* left: 11px; */
		}
	}
`;

const StyledHorizontalLine = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	&::before {
		content: '';
		position: absolute;
		background: transparent;
		height: 35px;
		width: 35px;
		border-radius: 50px;
		border: 2px solid #7079b9;
		justify-content: center;
		margin-left: -0.3rem;
		@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
			height: 22px;
			width: 22px;
		}
		@media (max-width: 653px) {
			height: 18px;
			width: 18px;
			margin-left: 0.8rem;
		}
		@media (max-width: 330px) {
			margin-left: 0.2rem;
		}
	}
`;

const HorizontalBar = styled.div<{ roundLeft: boolean; roundRight: boolean }>`
	display: flex;
	/* height: 2px; */
	width: 100%;
	/* background-color: #ed4c3a; */
	border: 1px dashed #ed4c3a;
	align-items: center;
	justify-content: center;
	border-top-left-radius: ${({ roundLeft }) => (roundLeft ? '0px' : '0px')};
	border-bottom-left-radius: ${({ roundLeft }) => (roundLeft ? '0px' : '0px')};
	border-top-right-radius: ${({ roundRight }) => (roundRight ? '0px' : '0px')};
	border-bottom-right-radius: ${({ roundRight }) => (roundRight ? '0px' : '0px')};
	box-shadow: none;
	border-radius: 0px;
	position: absolute;
	left: 0px;
	&::before {
		position: absolute;
		content: '';
		height: 35px;
		width: 35px;
		background-image: url(${check}) !important;
		background: #ed4c3a;
		border-radius: 50px;
		background-position: center;
		background-size: 50%;
		background-repeat: no-repeat;
		border: 2px solid #ed4c3a;
		left: 0px;
		margin-left: -2.3rem;
		@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
			height: 25px;
			width: 25px;
		}
		@media (max-width: 653px) {
			height: 18px;
			width: 18px;
			margin-left: -1.8rem;
		}
	}
`;
const HorizontalLine = styled.div<{ roundLeft: boolean; roundRight: boolean }>`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	&::before {
		position: absolute;
		content: '';
		height: 35px;
		width: 35px;
		background-image: url(${check}) !important;
		background: #ed4c3a;
		border-radius: 50px;
		background-position: center;
		background-size: 50%;
		background-repeat: no-repeat;
		border: 2px solid #ed4c3a;
		margin-left: -0.3rem;
		@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
			height: 25px;
			width: 25px;
		}
		@media (max-width: 653px) {
			height: 18px;
			width: 18px;
			margin-left: 0.8rem;
		}
	}
`;

const NextCol = styled(Col)`
	@media (min-width: 768px) and (max-width: 1024px) {
		align-items: center;
	}
`;

interface ICreationStepsProps {
	reachedStepType: IStepType;
}

export const CreationMobileSteps: FC<ICreationStepsProps> = ({ reachedStepType }) => {
	const { isDesktop } = useDevice();
	const [elementId] = useState(uniqueId('CreationSteps-'));
	const [width, setWidth] = useState(0);

	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			setWidth(entries[0].contentRect.width);
		});
		const element = document.getElementById(elementId);
		if (element) {
			resizeObserver.observe(element);
		}

		return () => resizeObserver.disconnect();
	}, [elementId, setWidth]);

	return (
		<Col id={elementId}>
			{isDesktop && (
				<>
					<Row>
						<StyledCreateIlo fontSize="xxl" className="" fontWeight="bold" backgroundColor="transparent">
							Create ILO
						</StyledCreateIlo>
					</Row>
					<Spacing vertical="l" />
				</>
			)}
			<ScrollingRow maxWidth justify="space-between" width={width}>
				{steps.map((step) => (
					<NextCol key={step.type} maxWidth>
						{step.type === 'socials' ? (
							<StyledHorizontalLine>
								{isReached(step.type, reachedStepType) && (
									<HorizontalLine
										roundLeft={getStepIndex(step.type) === 0}
										roundRight={getStepIndex(step.type) === getStepIndex(reachedStepType)}
									/>
								)}
							</StyledHorizontalLine>
						) : (
							<StyledHorizontal>
								{isReached(step.type, reachedStepType) && (
									<HorizontalBar
										roundLeft={getStepIndex(step.type) === 0}
										roundRight={getStepIndex(step.type) === getStepIndex(reachedStepType)}
									/>
								)}
							</StyledHorizontal>
						)}
						<Spacing vertical="l" mobile="m" />
						<Col>
							<StyledTabText
								fontSize="m"
								color={getStepIndex(step.type) <= getStepIndex(reachedStepType) ? 'secondaryBrand' : 'tertiary'}
							>
								{step.title}
							</StyledTabText>
						</Col>
					</NextCol>
				))}
			</ScrollingRow>
		</Col>
	);
};
