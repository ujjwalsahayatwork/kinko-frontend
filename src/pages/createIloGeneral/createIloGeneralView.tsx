import { useWeb3React } from '@web3-react/core';
import { Button } from 'components/button/button';
import { Col } from 'components/col/col';
import { CreationSteps } from 'components/creationSteps/creationSteps';
import { DropDown, IDropDownOption } from 'components/dropDown/dropDown';
import { InfoCard } from 'components/infoCard/infoCard';
import { Row } from 'components/row/row';
import { Spacing } from 'components/spacing/spacing';
import { Text } from 'components/text/text';
import { TextInput } from 'components/textInput/textInput';
import { toPx, useDevice } from 'components/utils';
import { ETHEREUM_CHAIN_ID } from 'constants/env';
import { chain, values } from 'lodash';
import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import { IBaseToken } from 'types';
import "./createGeneral.scss";

const StyledMainCol = styled(Row)`
	width: 100%;
	max-width: 1152px;
	margin: 0 auto;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		
	}
`;

const LeftTextInput = styled(TextInput)`
	width: 100%;
	flex: 1;
`;

const RightTextInput = styled(TextInput)`
	flex: 1;
	font-size: 10px;

	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		width: 100%;
	font-size: 16px;

	}
`;

const LeftDropDown = styled(Row)`
	flex: 1;

	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		width: 100%;
	}
`;

const RightText = styled(Text)`
	flex: 1;
	color: white;
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 22px;
	display: flex;
    align-items: end;
`;

const RightInfoCard = styled(InfoCard)`
	flex: 1;
`;

const RightSpacing = styled(Spacing)`
	flex: 1;
`;

const BottomSpacing = styled.div`
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		display: flex;
		height: 30px;
    	min-height: 30px;
    	max-height: 30px;
	}
`;

const RightSpacing2 = styled(Spacing)`
	flex: 0.8;
`;

const NextButton = styled(Button)`
	width: 170px;
	padding: 10px 20px 10px 0px;
	text-align: center;
`;

interface ICreateIloGeneralViewProps {
	iloName: string;
	iloNameIssue: string;
	saleTokenAddress: string;
	saleTokenAddressIssue: string;
	saleTokenName: string;
	saleTokenSymbol: string;
	baseTokenOptions: Array<IDropDownOption<IBaseToken>>;
	bscBaseTokenOptions: Array<IDropDownOption<IBaseToken>>;
	selectedBaseToken: string;
	baseTokenName: string;
	presaleCreator: string;
	presaleAmount: string;
	showWarning: boolean;
	onChangeIloName: (iloName: string) => void;
	onChangeTokenAddress: (tokenAddress: string) => void;
	onChangeBuyersParticipateWith: (key: string, payload: IBaseToken) => void;
	onChangePresaleAmount: (presaleAmount: string) => void;
	onSubmit: () => void;
}

export const CreateIloGeneralView: FC<ICreateIloGeneralViewProps> = ({
	iloName,
	iloNameIssue,
	saleTokenAddress,
	saleTokenAddressIssue,
	saleTokenName,
	saleTokenSymbol,
	baseTokenOptions,
	bscBaseTokenOptions,
	selectedBaseToken,
	baseTokenName,
	presaleCreator,
	presaleAmount,
	showWarning,
	onChangeIloName,
	onChangeTokenAddress,
	onChangeBuyersParticipateWith,
	onChangePresaleAmount,
	onSubmit,
}) => {
	const { chainId } = useWeb3React();
	const { isDesktop } = useDevice();
	const tokenUnit = useMemo(() => {
		if (saleTokenSymbol) {
			return saleTokenSymbol;
		}
		return 'Tokens';
	}, [saleTokenSymbol]);

	return (
		<StyledMainCol className="input_bg_color">
			<CreationSteps reachedStepType="general" />
			<Spacing vertical="xl" />
			<Row mobileDirection="column" align={isDesktop ? undefined : 'center'}>
				<LeftTextInput label="ILO Name" value={iloName} errorMessage={iloNameIssue} onChangeText={onChangeIloName} />
				<Spacing horizontal="xl" />
				<BottomSpacing />
				<RightTextInput label="Label" value={saleTokenName} readOnly onChangeText={() => undefined} />
			</Row>
			<Spacing vertical="l" />
			<Row mobileDirection="column" align={isDesktop ? undefined : 'center'}>
				<LeftTextInput
					label="Token Address"
					value={saleTokenAddress}
					errorMessage={saleTokenAddressIssue}
					onChangeText={onChangeTokenAddress}
				/>
				<Spacing horizontal="xl" />
				<BottomSpacing />
				<RightTextInput
					label="Pancakeswap V2 pair to be created"
					value={`${baseTokenName} / ${tokenUnit}`}
					readOnly
					onChangeText={() => undefined}
				/>
			</Row>
			<Spacing vertical="l" />
			<Row mobileDirection="column" align={isDesktop ? undefined : 'center'}>
				<LeftDropDown key={chainId}>
					<DropDown<IBaseToken>
						label="Buyers participate with"
						options={chainId === ETHEREUM_CHAIN_ID ? baseTokenOptions : bscBaseTokenOptions}
						selected={selectedBaseToken}
						startEmpty={false}
						onSelect={onChangeBuyersParticipateWith}
					/>
				</LeftDropDown>
				<Spacing horizontal="xl" />
				{isDesktop &&
					<>
						<BottomSpacing />
						<RightText fontSize="xl" mobileFontSize="xs">
							This account will be the only account capable of adding presale information, editing presale contract
							parameters and unlocking liquidity.
						</RightText>
					</>
				}
			</Row>
			<Spacing vertical="l" />
			<Row mobileDirection="column" align={isDesktop ? undefined : 'center'}>
				<LeftTextInput label="Presale Creator" value={presaleCreator} readOnly onChangeText={() => undefined} />
				<Spacing horizontal="xl" />
				<BottomSpacing />
				<RightSpacing />
			</Row>
			<Spacing vertical="l" />
			<Row mobileDirection="column" align={isDesktop ? undefined : 'center'}>
				<LeftTextInput
					label={`How many ${tokenUnit} are up for presale?`}
					value={presaleAmount}
					onChangeText={onChangePresaleAmount}
				/>
				{/* {
					!presaleAmount  ?
						<RightText fontSize="s" mobileFontSize="xs">
							Invalid
						</RightText>
						: null
				} */}
				<RightSpacing2 />
				{!isDesktop &&
					<>
						<BottomSpacing />
						<RightText fontSize="s" mobileFontSize="xs">
							This account will be the only account capable of adding presale information, editing presale contract
							parameters and unlocking liquidity.
						</RightText>
					</>
				}
				<BottomSpacing />
				<NextButton label="Next to Caps" arrow onClick={onSubmit} />
			</Row>
			<Spacing vertical="l" />
			<Row mobileDirection="column" align={isDesktop ? undefined : 'center'}>
				{showWarning ? (
					<RightInfoCard type="alert">
						<Text fontSize="m">You do not have enough tokens. A minimum of 10000 units is required.</Text>
					</RightInfoCard>
				) : (
					<RightSpacing />
				)}
			</Row>
			<Spacing vertical="m" />
		</StyledMainCol>
	);
};
