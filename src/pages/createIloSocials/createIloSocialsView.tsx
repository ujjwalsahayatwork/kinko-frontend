import { Button } from 'components/button/button';
import { Col } from 'components/col/col';
import { CreationSteps } from 'components/creationSteps/creationSteps';
import { Row } from 'components/row/row';
import { Spacing } from 'components/spacing/spacing';
import { TextInput } from 'components/textInput/textInput';
import { toPx, useDevice } from 'components/utils';
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import "./createSocialView.scss";

const StyledMainCol = styled(Col)`
	width: 100%;
	max-width: 1152px;
	margin: 0 auto;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		
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
	border: 1px solid #F97A48;
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
			<CreationSteps reachedStepType="socials" />
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
			<Row >
				<NextButton label="Sign" disabled={signed || approved} onClick={onSign} />
				<Spacing horizontal="m" vertical="s" />
				<NextButton label="Approve" disabled={signed || approved} onClick={onApprove} />
				<Spacing horizontal="m" vertical="s" />
				<NextButton label="Create Presale" disabled={signed || approved} onClick={onSubmit} />
			</Row>
			<Spacing vertical="xl" />
		</StyledMainCol>
	);
};
