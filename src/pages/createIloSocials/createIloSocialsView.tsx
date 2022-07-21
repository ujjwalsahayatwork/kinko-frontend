import { Button } from 'components/button/button';
import { Col } from 'components/col/col';
import { CreationSteps } from 'components/creationSteps/creationSteps';
import { Row } from 'components/row/row';
import { Spacing } from 'components/spacing/spacing';
import { TextInput } from 'components/textInput/textInput';
import { Text } from 'components/text/text';
import { toPx, useDevice } from 'components/utils';
import React, { FC } from 'react';
import styled from 'styled-components';
import "./createSocialView.scss";
import { CreationMobileSteps } from 'components/creationSteps/creationMobileSteps';

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
`;

const SubText = styled(Text)`
	font-family: 'Sora';
	font-weight: 400;
	font-size: 14px !important;
	line-height: 18px;
	color: #7079b9;
`;

const HorizontalLine = styled.div`
	background: rgba(112, 121, 185, 0.3);
	height: 1.5px;
`;

const VerticalLine = styled.div`
	background: rgba(112, 121, 185, 0.3);
	width: 1.5px;
`;
const Box = styled.div`
	display: grid;
	grid-template-columns: 18% 3% 75%;
	gap: 1rem;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		grid-template-columns: 100%;
	}
`;
const BoxContain = styled.div``;
const ButtonContainer = styled.div`
display: flex;
@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		display: flex;
		flex-direction: column;
	}
`;

const MaxWidth = styled(Col)`
	display: flex;

	@media (min-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		max-width: 580px;
		width: 100%;
	}
`;

const StyledTextInput = styled(TextInput)`
	width: 100%;
`;

const StyledMultilineTextInput = styled(TextInput)`
border-radius: 5px;
	@media (min-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		max-width: ${({ theme }) => toPx(theme.distanceM + 2 * 580)};
	}
`;

const NextButton = styled(Button)`
	width: 170px; 
	border: 1px solid #ed4c3a;
	color: white;
	padding: 14px 0px;
	text-align: center;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		width: 100%;
	}
`;

interface ICreateIloSocialsViewProps {
	logoURL: string;
	logoURLIssue: string;
	headerImageURL: string;
	headerImageURLIssue: string;
	telegramURL: string;
	telegramURLIssue: string;
	twitterURL: string;
	twitterURLIssue: string;
	websiteURL: string;
	websiteURLIssue: string;
	whitepaperURL: string;
	whitepaperURLIssue: string;
	description: string;
	descriptionIssue: string;
	signed: boolean;
	approved: boolean;
	onChangeLogoURL: (logoURL: string) => void;
	onChangeHeaderImageURL: (headerImageURL: string) => void;
	onChangeTelegramURL: (telegramURL: string) => void;
	onChangeTwitterURL: (twitterURL: string) => void;
	onChangeWebsiteURL: (websiteURL: string) => void;
	onChangeWhitepaperURL: (whitepaperURL: string) => void;
	onChangeDescription: (description: string) => void;
	onSign: () => void;
	onApprove: () => void;
	onSubmit: () => void;
}

export const CreateIloSocialsView: FC<ICreateIloSocialsViewProps> = ({
	logoURL,
	logoURLIssue,
	headerImageURL,
	headerImageURLIssue,
	telegramURL,
	telegramURLIssue,
	twitterURL,
	twitterURLIssue,
	websiteURL,
	websiteURLIssue,
	whitepaperURL,
	whitepaperURLIssue,
	description,
	descriptionIssue,
	signed,
	approved,
	onChangeLogoURL,
	onChangeHeaderImageURL,
	onChangeTelegramURL,
	onChangeTwitterURL,
	onChangeWebsiteURL,
	onChangeWhitepaperURL,
	onChangeDescription,
	onSign,
	onApprove,
	onSubmit,
}) => {
	const { isDesktop } = useDevice();

	return (
		<StyledMainCol>
			<Spacing vertical="s" />
			{isDesktop && (
				<>
					<Row>
						<StyledCreateIlo fontSize="xxl" className="" fontWeight="bold" backgroundColor="transparent">
							Create ILO
						</StyledCreateIlo>
					</Row>
					<Spacing vertical="s" />
					<SubText fontSize="xs">Follow the simple 5 steps to create your ILO</SubText>
					<Spacing vertical="m" />
					<HorizontalLine />
				</>
			)}
			<Box>
				{isDesktop ? (
					<>
						<Col>
							<Spacing vertical="l" />
							<CreationSteps reachedStepType="socials" />
						</Col>
						<VerticalLine />
					</>
				) : (
					<CreationMobileSteps reachedStepType="socials" />
				)}
				<BoxContain>
					<Spacing vertical="xl" mobile="l" />
					<Row mobileDirection="column">
						<MaxWidth>
							<StyledTextInput
								label="Link to logo"
								value={logoURL}
								errorMessage={logoURLIssue}
								onChangeText={onChangeLogoURL}
							/>
						</MaxWidth>
						<Spacing horizontal="m" vertical="l" />
						<MaxWidth>
							<StyledTextInput
								label="Twitter URL"
								value={twitterURL}
								errorMessage={twitterURLIssue}
								icon="twitter"
								onChangeText={onChangeTwitterURL}
								height={25}
							/>
						</MaxWidth>
					</Row>
					<Spacing vertical="xl" mobile="l" />
					<Row mobileDirection="column">
						<MaxWidth>
							<StyledTextInput
								label="Link to header image"
								value={headerImageURL}
								errorMessage={headerImageURLIssue}
								onChangeText={onChangeHeaderImageURL}
							/>
						</MaxWidth>
						<Spacing horizontal="m" vertical="l" />
						<MaxWidth>
							<StyledTextInput
								label="Website URL"
								value={websiteURL}
								errorMessage={websiteURLIssue}
								onChangeText={onChangeWebsiteURL}
							/>
						</MaxWidth>
					</Row>
					<Spacing vertical="xl" mobile="l" />
					<Row mobileDirection="column">
						<MaxWidth>
							<StyledTextInput
								label="Telegram URL"
								value={telegramURL}
								errorMessage={telegramURLIssue}
								icon="paperPlane"
								onChangeText={onChangeTelegramURL}
							/>
						</MaxWidth>
						<Spacing horizontal="m" vertical="l" />
						<MaxWidth>
							<StyledTextInput
								label="Whitepaper URL"
								value={whitepaperURL}
								errorMessage={whitepaperURLIssue}
								onChangeText={onChangeWhitepaperURL}
							/>
						</MaxWidth>
					</Row>
					<Spacing vertical="xl" mobile="l" />
					<StyledMultilineTextInput
						multiline
						rows={isDesktop ? 6 : 4}
						maxLength={300}
						label="Describe"
						value={description}
						errorMessage={descriptionIssue}
						onChangeText={onChangeDescription}
					/>
					<Spacing vertical="xl" />
					<ButtonContainer >
						<NextButton label="Sign" disabled={signed || approved} onClick={onSign} />
						<Spacing horizontal="m" vertical="s" />
						<NextButton label="Approve" disabled={!signed || approved} onClick={onApprove} />
						<Spacing horizontal="m" vertical="s" />
						<NextButton label="Create Presale" disabled={!signed || !approved} onClick={onSubmit} />
					</ButtonContainer>
					<Spacing vertical="xl" />
				</BoxContain>
			</Box>
			<Spacing vertical="xl" />
		</StyledMainCol>
	);
};
