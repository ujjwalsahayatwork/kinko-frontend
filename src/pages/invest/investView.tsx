import BigNumber from 'bignumber.js';
import { BaseButton } from 'components/baseButton/baseButton';
import { Button } from 'components/button/button';
import { Col } from 'components/col/col';
import { CurrencyInput } from 'components/currencyInput/currencyInput';
import { RadioButton } from 'components/radioButton/radioButton';
import { Row } from 'components/row/row';
import { Spacing } from 'components/spacing/spacing';
import { Text } from 'components/text/text';
import { toPx, useDevice } from 'components/utils';
import React, { FC } from 'react';
import styled from 'styled-components';

export type IPercentage = 20 | 40 | 60 | 80;

const StyledContainer = styled(Col)`
	width: 100%;
	max-width: 1152px;
	margin: 0 auto;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		
	}
`;

const StyledHeading = styled(Text)`
	font-weight: 500;
	max-width: 50rem;
	margin-top: 3rem;
	margin-bottom: 1rem;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		margin-top: .25rem;	
		margin-bottom: 0rem;
	}
`;

const StyledSubHeading = styled(Text)`
	font-weight: 500;
	max-width: 50rem;
	margin-top: 3rem;
	margin-bottom: 1rem;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		margin-top: .25rem;	
		margin-bottom: 0rem;
	}
`;

const LeftSide = styled(Row)`
	gap: 1rem;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		width: 100%;
	}
`;

const StyledSpendCol = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 2rem;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		grid-template-columns: 1fr;
	}
`;

const StyledInfoCard = styled(Col)`
	border-radius: 0.350rem;
	padding: 1rem;
	background: rgba(255, 81, 58, 0.6);
`;

const StyledCurrency = styled(CurrencyInput)`
	background: transparent;
`;

const AcceptButton = styled(BaseButton)`
	background-color: transparent;
	border-radius: 0px;
`;

const NextButton = styled(Button)`
	width: 170px;
	padding: 10px 20px 10px 0px;
	text-align: center;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		width: 100%;
	}
`;

interface IInvestViewProps {
	iloName: string;
	investAmount: string;
	baseTokenSymbol: string;
	maxSpendableBaseToken: BigNumber;
	saleTokenAmount: BigNumber;
	saleTokenSymbol: string;
	selectedPercentage: IPercentage | undefined;
	isGlmr: boolean;
	accepted: boolean;
	approved: boolean;
	onChangeInvestAmount: (investAmount: string) => void;
	onMaxSpendableBaseToken: () => void;
	onSelectPercentage: (percentage: IPercentage) => void;
	onAccept: () => void;
	onApprove: () => void;
	onSubmit: () => void;
}

export const InvestView: FC<IInvestViewProps> = ({
	iloName,
	investAmount,
	baseTokenSymbol,
	maxSpendableBaseToken,
	saleTokenAmount,
	saleTokenSymbol,
	selectedPercentage,
	isGlmr,
	accepted,
	approved,
	onChangeInvestAmount,
	onMaxSpendableBaseToken,
	onSelectPercentage,
	onAccept,
	onApprove,
	onSubmit,
}) => {
	const { isDesktop, isMobile } = useDevice();

	return (
		<StyledContainer className={isMobile ? 'center' : undefined}>
			<Col maxWidth>
				<Col>
					<Row>
						<Col>
							<StyledHeading fontSize={isDesktop ? 40 : 20} align="start">
								Invest in {iloName}
							</StyledHeading>
						</Col>
					</Row>
					<Col>
						<StyledSubHeading fontSize="xl">
							Spend how much {baseTokenSymbol}?
						</StyledSubHeading>
						<StyledSpendCol>
							<Col>
								<StyledCurrency
									label=""
									currency={baseTokenSymbol}
									value={investAmount}
									balance={maxSpendableBaseToken.toFixed(3)}
									balanceLabel="Max spendable"
									onChangeText={onChangeInvestAmount}
									onMax={onMaxSpendableBaseToken}
								/>
							</Col>
							<Col>
								<Text fontSize="l" fontWeight='bold'>You get</Text>
								<Text fontSize={20} fontWeight="normal">
									{saleTokenAmount.toFixed(3)} {saleTokenSymbol}
								</Text>
							</Col>
						</StyledSpendCol>
					</Col>
					<Spacing vertical="m" mobile="s" />
					<LeftSide maxWidth>
						<RadioButton title="20%" selected={selectedPercentage === 20} onClick={() => onSelectPercentage(20)} />
						<RadioButton title="40%" selected={selectedPercentage === 40} onClick={() => onSelectPercentage(40)} />
						<RadioButton title="60%" selected={selectedPercentage === 60} onClick={() => onSelectPercentage(60)} />
						<RadioButton title="80%" selected={selectedPercentage === 80} onClick={() => onSelectPercentage(80)} />
					</LeftSide>
					<Spacing vertical="l" />
					<Text fontSize="m" mobileFontSize="xs" color="secondary">
						Please be aware if the token you are purchasing has deflationary mechanisms such as burn on transfer. You may
						receive less than the amount stated. Your tokens will be locked in the contract until the presale has
						concluded.
					</Text>
					{!accepted && (
						<>
							<Spacing vertical="xxl" mobile="l" />
							<StyledInfoCard>
								<Text fontSize="xl" fontWeight="bold">
									Safety Alert
								</Text>
								<Spacing vertical="m" mobile="s" />
								<Text fontSize="m">
									This is a decentralised and open presale platform. Similar to Pancakeswap anyone can create and name a
									presale freely including fake version of existing tokens. It is also possible for developers to mint
									near infinite tokens and dumb them on locked liquidity. Please do your own research before using this
									platform.
								</Text>
								<Spacing vertical="m" mobile="s" />
								<Row mobileDirection="column" justify="flex-end" align="flex-end">
									<AcceptButton onClick={onAccept}>
										<Text fontSize="m" fontWeight="bold">
											Accept and proceed
										</Text>
									</AcceptButton>
								</Row>
							</StyledInfoCard>
						</>
					)}
					<Spacing vertical="xl" mobile="m" />
					<Col mobileDirection="column-reverse" align={isDesktop ? 'flex-end' : undefined}>
						<Row justify={isDesktop ? 'flex-end' : undefined} align="center" mobileDirection="column">
							{!isGlmr && (
								<>
									<NextButton label="Approve" disabled={!accepted || approved} onClick={onApprove} />
									<Spacing horizontal="m" vertical="s" />
								</>
							)}
							<NextButton label="Purchase" disabled={!accepted || (!isGlmr && !approved)} onClick={onSubmit} />
						</Row>
						<Spacing vertical="m" mobile="s" />
						<Text fontSize="s" mobileFontSize="xs" color="primary">
							Any excess {baseTokenSymbol} above your allowance is immediately refunded.
						</Text>
					</Col>
				</Col>
			</Col>
		</StyledContainer>
	);
};
