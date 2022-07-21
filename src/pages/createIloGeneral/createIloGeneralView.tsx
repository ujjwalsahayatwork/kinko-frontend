import { useWeb3React } from '@web3-react/core';
import { Button } from 'components/button/button';
import { Col } from 'components/col/col';
import { CreationMobileSteps } from 'components/creationSteps/creationMobileSteps';
import { CreationSteps } from 'components/creationSteps/creationSteps';
import { DropDown, IDropDownOption } from 'components/dropDown/dropDown';
import { InfoCard } from 'components/infoCard/infoCard';
import { Row } from 'components/row/row';
import { Spacing } from 'components/spacing/spacing';
import { Text } from 'components/text/text';
import { TextInput } from 'components/textInput/textInput';
import { toPx, useDevice } from 'components/utils';
import { LoadingModal } from 'modals/loadingModal/loadingModal';
import React, { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IBaseToken } from 'types';
import './createGeneral.scss';

const StyledMainCol = styled(Col)`
	width: 100%;
	max-width: 1152px;
	margin: 0 auto;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
	}
`;

const StyledCreateIlo = styled(Text)`
	font-family: 'Sora';
	font-style: normal;
	font-weight: 400;
	font-size: 24px;
	line-height: 30px;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		margin-left: 1rem;
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

// const RightSpacing2 = styled(Spacing)`
// 	flex: 0.8;
// `;

const NextButton = styled(Button)`
	box-sizing: border-box;
	width: 172px;
	height: 47px;
	background: #ed4c3a;
	border: 1px solid #ed4c3a;
	border-radius: 5px;
	text-align: center;
	padding-left: 15px;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		width: 150px;
	}
`;

const BackButton = styled(Button)`
	border: 1px solid #ed4c3a;
	border-radius: 5px;
	width: 172px;
	height: 47px;
	/* padding: 10px 20px 10px 0px; */
	text-align: center;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		width: 150px;
	}
`;

const Box = styled.div`
	display: grid;
	grid-template-columns: 18% 3% 75%;
	gap: 1rem;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		grid-template-columns: 95%;
		margin: auto;
		justify-content: center;
	}
`;

const SubText = styled(Text)`
	font-family: 'Sora';
	font-weight: 400;
	font-size: 14px !important;
	line-height: 18px;
	color: #7079b9;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		margin-left: 1rem;
	}
`;

const HorizontalLine = styled.div`
	background: rgba(112, 121, 185, 0.3);
	height: 1.5px;
`;

const VerticalLine = styled.div`
	background: rgba(112, 121, 185, 0.3);
	width: 1.5px;
`;

const BoxContain = styled.div``;

const CatButton = styled(Button)`
	border: 1px solid #7079b9;
	border-radius: 40px;
	padding: 10px 20px;
	:hover {
		border: 1px solid #ed4c3a;
		background: rgb(249 122 72 / 20%);
	}
`;

const FieldsBox = styled(Row)`
	flex-wrap: wrap;
	gap: 5px;
`;

const FieldsText = styled.div`
	font-family: 'Sora';
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 18px;
	color: #828282;
`;

interface ICreateIloGeneralViewProps {
	iloName: string;
	iloNameIssue: string;
	saleTokenAddress: string;
	saleTokenAddressIssue: string;
	saleTokenName: string;
	saleTokenSymbol: string;
	baseTokenOptions: Array<IDropDownOption<IBaseToken>>;
	selectedBaseToken: string;
	baseTokenName: string;
	presaleCreator: string;
	presaleAmount: string;
	showWarning: boolean;
	category: string;
	onClickIloCategory: (category: string) => void;
	onChangeIloName: (iloName: string) => void;
	onChangeTokenAddress: (tokenAddress: string) => void;
	onChangeBuyersParticipateWith: (key: string, payload: IBaseToken) => void;
	onChangePresaleAmount: (presaleAmount: string) => void;
	onSubmit: () => void;
	isLoading: boolean;
}

const FieldsObj = [
	{ name: 'Agriculture', values: 'Agriculture' },
	{ name: 'Retail', values: 'Retail' },
	{ name: 'Food & beverage', values: 'Food & beverage' },
];

export const CreateIloGeneralView: FC<ICreateIloGeneralViewProps> = ({
	iloName,
	iloNameIssue,
	saleTokenAddress,
	saleTokenAddressIssue,
	saleTokenName,
	saleTokenSymbol,
	baseTokenOptions,
	selectedBaseToken,
	baseTokenName,
	presaleCreator,
	presaleAmount,
	showWarning,
	category,
	onChangeIloName,
	onClickIloCategory,
	onChangeTokenAddress,
	onChangeBuyersParticipateWith,
	onChangePresaleAmount,
	onSubmit,
	isLoading,
}) => {
	const { chainId } = useWeb3React();
	const { isDesktop } = useDevice();
	const navigate = useNavigate();
	const tokenUnit = useMemo(() => {
		if (saleTokenSymbol) {
			return saleTokenSymbol;
		}
		return 'Tokens';
	}, [saleTokenSymbol]);

	// const handleBackPage = () => navigate.back();

	return (
		<StyledMainCol className="input_bg_color">
			<Spacing vertical="s" />
			<Row>
				<StyledCreateIlo fontSize="xxl" className="" fontWeight="bold" backgroundColor="transparent">
					Create ILO
				</StyledCreateIlo>
			</Row>
			<Spacing vertical="s" />
			<SubText fontSize="xs">Follow the simple 5 steps to create your ILO</SubText>
			<Spacing vertical="m" desktopOnly />
			<Spacing vertical="l" mobileOnly />
			{isDesktop && <HorizontalLine />}
			<Box>
				{isDesktop ? (
					<>
						<Col>
							<Spacing vertical="l" />
							<CreationSteps reachedStepType="general" />
						</Col>
						<VerticalLine />
					</>
				) : (
					<CreationMobileSteps reachedStepType="general" />
				)}
				<BoxContain>
					<Spacing vertical="l" desktopOnly />
					<Spacing vertical="s" mobileOnly />
					<Col>
						<FieldsText>Fields you work in</FieldsText>
						<Spacing vertical="s" />
						<FieldsBox>
							{FieldsObj.map((item) => (
								<div key={item.name}>
									<CatButton
										key={item.name}
										label={item.name}
										onClick={() => onClickIloCategory(item.values)}
										className={item.name === category ? 'active' : ''}
									/>
									<Spacing horizontal="s" />
								</div>
							))}
						</FieldsBox>
						<Spacing vertical="m" />
					</Col>
					<Row mobileDirection="column" align={isDesktop ? undefined : 'center'}>
						<LeftTextInput
							label="ILO Name"
							value={iloName}
							errorMessage={iloNameIssue}
							onChangeText={onChangeIloName}
						/>
						<Spacing horizontal="xl" />
						<BottomSpacing />
						<RightTextInput
							label={`How many ${tokenUnit} are up for presale?`}
							value={presaleAmount}
							onChangeText={onChangePresaleAmount}
						/>
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
						<RightTextInput label="Label" value={saleTokenName} readOnly onChangeText={() => undefined} />
					</Row>
					<Spacing vertical="l" />
					<Row mobileDirection="column" align={isDesktop ? undefined : 'center'}>
						<LeftDropDown key={chainId}>
							<DropDown<IBaseToken>
								label="Buyers participate with"
								options={baseTokenOptions}
								selected={selectedBaseToken}
								startEmpty={false}
								onSelect={onChangeBuyersParticipateWith}
							/>
						</LeftDropDown>
						<BottomSpacing />
						<Spacing horizontal="xl" />
						<RightTextInput
							label="Pancakeswap V2 pair to be created"
							value={`${baseTokenName} / ${tokenUnit}`}
							readOnly
							onChangeText={() => undefined}
						/>
					</Row>
					<Spacing vertical="l" />
					<Row mobileDirection="column" align={isDesktop ? undefined : 'center'}>
						<LeftTextInput label="Presale Creator" value={presaleCreator} readOnly onChangeText={() => undefined} />
						<Spacing horizontal="xl" />
						<BottomSpacing />
						<RightTextInput
							label={`How many ${tokenUnit} are up for presale?`}
							value={presaleAmount}
							onChangeText={onChangePresaleAmount}
						/>
					</Row>
					<Spacing vertical="l" desktopOnly />
					<Row mobileDirection="column" align={isDesktop ? undefined : 'center'}>
						<BottomSpacing />
						<RightText fontSize="s" mobileFontSize="xs">
							This account will be the only account capable of adding presale information, editing presale contract
							parameters and unlocking liquidity.
						</RightText>
						<BottomSpacing />
					</Row>
					<Spacing vertical="l" desktopOnly />
					<Row align={isDesktop ? undefined : 'center'} justify={isDesktop ? 'space-between' : 'space-between'}>
						<BackButton label="Back" onClick={() => navigate(-1)} />
						{isLoading && <LoadingModal />}
						<NextButton label="Next to Caps" arrow onClick={onSubmit} />
					</Row>
					<Spacing vertical="m" />
					<Row mobileDirection="column" align={isDesktop ? undefined : 'center'}>
						{showWarning ? (
							<RightInfoCard type="alert">
								<Text fontSize="m">You do not have enough tokens. A minimum of 10000 units is required.</Text>
							</RightInfoCard>
						) : (
							<RightSpacing />
						)}
					</Row>
				</BoxContain>
			</Box>
			<Spacing vertical="xl" />
		</StyledMainCol>
	);
};
