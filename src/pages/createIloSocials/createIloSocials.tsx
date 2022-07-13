/* eslint-disable */
import axios from 'axios';
import BigNumber from 'bignumber.js';
import { IRouterProps, IWeb3Props } from 'components/types';
import { loadState, saveState, withRouter, withWeb3 } from 'components/utils';
import { LAUNCHPAD_GENERATOR_ADDRESS } from 'constants/env';
import { CreateIloSocialsView } from 'pages/createIloSocials/createIloSocialsView';
import React, { Component } from 'react';
import reactImageSize from 'react-image-size';
import { connect } from 'react-redux';
import {
	updateDescription,
	updateHeaderImageURL,
	updateLogoURL,
	updateTelegramURL,
	updateTwitterURL,
	updateWebsiteURL,
	updateWhitepaperURL,
} from 'store/createIlo/actions';
import { addError } from 'store/error/actions';
import { updateShowConnectModal } from 'store/ethereum/actions';
import { IDispatch, IRootState } from 'store/store';
import { updateShowLoadingModal } from 'store/utils/actions';
import { IBaseToken } from 'types';
import { createIlo } from 'utils/api';
import {
	approveERC20,
	blobToBase64,
	createLaunchpad,
	createSignature,
	downloadFile,
	getBaseTokenAddress,
} from 'utils/utils';
import Web3 from 'web3';

interface ICreateIloSocialsProps extends IRouterProps, IWeb3Props {
	isCloseUpdateShowConnectModal: boolean;
	showConnectModal: boolean;
	iloName: string;
	saleTokenAddress: string;
	baseToken: IBaseToken | undefined;
	presaleAmount: BigNumber;
	hardcap: BigNumber;
	softcap: BigNumber;
	liquidityRatePercent: number;
	listingRatePercent: number;
	startBlockDate: Date;
	endBlockDate: Date;
	saleTokenTotalRequired: BigNumber;
	tokenFeePercent: number;
	maxSpendPerBuyer: BigNumber;
	liquidityLockPeriod: bigint;
	updateShowConnectModal: (showConnectModal: boolean) => void;
	updateShowLoadingModal: (showLoadingModal: boolean) => void;
	updateLogoURL: (logoURL: string) => void;
	updateHeaderImageURL: (headerImageURL: string) => void;
	updateTelegramURL: (telegramURL: string) => void;
	updateTwitterURL: (twitterURL: string) => void;
	updateWebsiteURL: (websiteURL: string) => void;
	updateWhitepaperURL: (whitepaperURL: string) => void;
	updateDescription: (description: string) => void;
	addError: (error: unknown) => void;
}

interface ICreateIloSocialsState {
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
	r: string;
	s: string;
	v: string;
	signed: boolean;
	approved: boolean;
}

class CreateIloSocials extends Component<ICreateIloSocialsProps, ICreateIloSocialsState> {
	constructor(props: ICreateIloSocialsProps) {
		super(props);
		this.state = loadState<ICreateIloSocialsState>(props.location.key, (state) => {
			if (state) {
				return state;
			}
			return {
				logoURL: '',
				logoURLIssue: '',
				headerImageURL: '',
				headerImageURLIssue: '',
				telegramURL: '',
				telegramURLIssue: '',
				twitterURL: '',
				twitterURLIssue: '',
				websiteURL: '',
				websiteURLIssue: '',
				whitepaperURL: '',
				whitepaperURLIssue: '',
				description: '',
				descriptionIssue: '',
				r: '',
				s: '',
				v: '',
				signed: false,
				approved: false,
			};
		});
	}

	async componentDidUpdate(prevProps: ICreateIloSocialsProps, prevState: ICreateIloSocialsState) {
		const {
			location,
			web3: { active },
			showConnectModal,
			isCloseUpdateShowConnectModal
		} = this.props;
		if (prevState !== this.state) {
			saveState(location.key, this.state);
		}
		if (!active && !showConnectModal && !isCloseUpdateShowConnectModal) {
			this.props.updateShowConnectModal(true);
		}
	}

	handleChangeLogoURL = (logoURL: string) => {
		this.setState({ logoURL });
	};

	handleChangeHeaderImageURL = (headerImageURL: string) => {
		this.setState({ headerImageURL });
	};

	handleChangeTelegramURL = (telegramURL: string) => {
		this.setState({ telegramURL });
	};

	handleChangeTwitterURL = (twitterURL: string) => {
		this.setState({ twitterURL });
	};

	handleChangeWebsiteURL = (websiteURL: string) => {
		this.setState({ websiteURL });
	};

	handleChangeWhitepaperURL = (whitepaperURL: string) => {
		this.setState({ whitepaperURL });
	};

	handleChangeDescription = (description: string) => {
		this.setState({ description });
	};

	checkImageURL = async (imageURL: string, type: 'logo' | 'headerImage'): Promise<string> =>
		axios
			.get<Blob>(imageURL, { responseType: 'blob' })
			.then(async (response) => {
				const { type: mimeType, size } = response.data;
				if (!['image/png', 'image/jpeg'].includes(mimeType)) {
					return 'Invalid image';
				}
				if (size > 1024 * 1024) {
					return 'File size too big';
				}
				const { width, height }: { width: number; height: number } = await reactImageSize(imageURL);
				if (!height || !width) {
					return 'Invalid image';
				}
				const aspectRatio = width / height;
				if (type === 'logo') {
					if (aspectRatio !== 1) {
						return 'Aspect ratio must be 1:1';
					}
				} else if (type === 'headerImage') {
					if (aspectRatio < 2 || aspectRatio > 2.5) {
						return 'Aspect ratio must be between 2.5:1 and 2:1 (e.g. 800x360)';
					}
				}
				return '';
			})
			.catch((e) => {
				// eslint-disable-next-line no-console
				console.log(e);
				return 'Invalid link';
			});

	checkFields = async () => {
		const { logoURL, headerImageURL, telegramURL, twitterURL, websiteURL, whitepaperURL, description } = this.state;
		let logoURLIssue = '';
		let headerImageURLIssue = '';
		let telegramURLIssue = '';
		let twitterURLIssue = '';
		let websiteURLIssue = '';
		let whitepaperURLIssue = '';
		let descriptionIssue = '';
		const httpsRegex = /^https:\/\//gm;
		// eslint-disable-next-line no-useless-escape
		const twitterRegex = /^https:\/\/twitter\.com\/[^?#\/]+$/gm;
		// eslint-disable-next-line no-useless-escape
		const telegramRegex = /^https:\/\/t\.me\/[^?#\/]+$/gm;
		if (!logoURL) {
			logoURLIssue = 'Please fill out';
		} else {
			logoURLIssue = await this.checkImageURL(logoURL, 'logo');
		}
		if (!headerImageURL) {
			headerImageURLIssue = 'Please fill out';
		} else {
			headerImageURLIssue = await this.checkImageURL(headerImageURL, 'headerImage');
		}
		if (telegramURL && !telegramURL.match(telegramRegex)) {
			telegramURLIssue = 'Must be empty or valid address e.g. https://t.me/Energyfi_official';
		}
		if (twitterURL && !twitterURL.match(twitterRegex)) {
			twitterURLIssue = 'Must be empty or valid address e.g. https://twitter.com/Energyfi_io';
		}
		if (!websiteURL) {
			websiteURLIssue = 'Please fill out';
		} else if (!websiteURL.match(httpsRegex)) {
			websiteURLIssue = 'Must be https address';
		}
		if (whitepaperURL && !whitepaperURL.match(httpsRegex)) {
			whitepaperURLIssue = 'Must be https address';
		}
		if (!description) {
			descriptionIssue = 'Please fill out';
		}
		this.setState({
			logoURLIssue,
			headerImageURLIssue,
			telegramURLIssue,
			twitterURLIssue,
			websiteURLIssue,
			whitepaperURLIssue,
			descriptionIssue,
		});
		return !(
			logoURLIssue ||
			headerImageURLIssue ||
			telegramURLIssue ||
			twitterURLIssue ||
			websiteURLIssue ||
			whitepaperURLIssue ||
			descriptionIssue
		);
	};

	handleSign = async () => {
		const {
			web3: { library, account },
		} = this.props;
		if ((await this.checkFields()) && library && account) {
			const web3 = new Web3(library);
			try {
				this.props.updateShowLoadingModal(true);
				const { r, s, v } = await createSignature(web3, account, 'energyfi');
				this.setState({ r, s, v, signed: true });
			} finally {
				this.props.updateShowLoadingModal(false);
			}
		}
	};

	handleApprove = async () => {
		
		const {
			web3: { library, account },
			saleTokenAddress,
			baseToken,
			saleTokenTotalRequired,
		} = this.props;
		const { signed } = this.state;
		console.log("webbbbb3",await this.checkFields(),
		"1" ,library ,
		"2", account , 
		"3", baseToken ,
		 "4", signed)
		
		if ((await this.checkFields()) && library && account && baseToken && signed) {
			const web3 = new Web3(library);
			try {
				this.props.updateShowLoadingModal(true);
				await approveERC20(web3, saleTokenAddress, account, LAUNCHPAD_GENERATOR_ADDRESS, saleTokenTotalRequired);
			} finally {
				this.props.updateShowLoadingModal(false);
			}
			// this.setState({ approved: false });
			this.setState({ approved: true });
		}
	};

	handleSubmit = async () => {
		const {
			web3: { library, account },
			iloName,
			saleTokenAddress,
			baseToken,
			presaleAmount,
			hardcap,
			softcap,
			liquidityRatePercent,
			listingRatePercent,
			startBlockDate,
			endBlockDate,
			maxSpendPerBuyer,
			liquidityLockPeriod,
		} = this.props;
		const {
			logoURL,
			headerImageURL,
			telegramURL,
			twitterURL,
			websiteURL,
			whitepaperURL,
			description,
			r,
			s,
			v,
			signed,
			approved,
		} = this.state;
		debugger
		if ((await this.checkFields()) && library && account && baseToken && signed && approved) {
			const web3 = new Web3(library);
			const baseTokenAddress = getBaseTokenAddress(baseToken);
			const logo = await blobToBase64(await downloadFile(logoURL));
			const headerImage = await blobToBase64(await downloadFile(headerImageURL));
			try {
				this.props.updateShowLoadingModal(true);
				const launchpadAddress = await createLaunchpad({
					web3,
					walletAddress: account,
					saleTokenAddress,
					baseTokenAddress,
					referralAddress: '0x0000000000000000000000000000000000000000',
					amount: presaleAmount,
					hardcap,
					softcap,
					liquidityRatePercent,
					listingRatePercent,
					startBlockDate,
					endBlockDate,
					maxSpendPerBuyer,
					liquidityLockPeriod,
				});
				debugger
				await createIlo({
					iloName,
					launchpadAddress,
					r,
					s,
					v,
					logo,
					headerImage,
					telegramURL,
					twitterURL,
					websiteURL,
					whitepaperURL,
					description,
				});
				this.props.navigate(`/ilo/${launchpadAddress}`);
			} finally {
				this.props.updateShowLoadingModal(false);
			}
		}
	};

	render() {
		const {
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
		} = this.state;
		return (
			<CreateIloSocialsView
				logoURL={logoURL}
				logoURLIssue={logoURLIssue}
				headerImageURL={headerImageURL}
				headerImageURLIssue={headerImageURLIssue}
				telegramURL={telegramURL}
				telegramURLIssue={telegramURLIssue}
				twitterURL={twitterURL}
				twitterURLIssue={twitterURLIssue}
				websiteURL={websiteURL}
				websiteURLIssue={websiteURLIssue}
				whitepaperURL={whitepaperURL}
				whitepaperURLIssue={whitepaperURLIssue}
				description={description}
				descriptionIssue={descriptionIssue}
				signed={signed}
				approved={approved}
				onChangeLogoURL={this.handleChangeLogoURL}
				onChangeHeaderImageURL={this.handleChangeHeaderImageURL}
				onChangeTelegramURL={this.handleChangeTelegramURL}
				onChangeTwitterURL={this.handleChangeTwitterURL}
				onChangeWebsiteURL={this.handleChangeWebsiteURL}
				onChangeWhitepaperURL={this.handleChangeWhitepaperURL}
				onChangeDescription={this.handleChangeDescription}
				onSign={this.handleSign}
				onApprove={this.handleApprove}
				onSubmit={this.handleSubmit}
			/>
		);
	}
}

const mapStateToProps = ({ ethereum, createIlo }: IRootState) => ({
	isCloseUpdateShowConnectModal: ethereum.isCloseUpdateShowConnectModal,
	showConnectModal: ethereum.showConnectModal,
	iloName: createIlo.iloName,
	saleTokenAddress: createIlo.saleTokenAddress,
	baseToken: createIlo.baseToken,
	presaleAmount: createIlo.presaleAmount,
	hardcap: createIlo.hardcap,
	softcap: createIlo.softcap,
	liquidityRatePercent: createIlo.liquidityRatePercent,
	listingRatePercent: createIlo.listingRatePercent,
	startBlockDate: createIlo.startBlockDate,
	endBlockDate: createIlo.endBlockDate,
	saleTokenTotalRequired: createIlo.saleTokenTotalRequired,
	tokenFeePercent: createIlo.tokenFeePercent,
	maxSpendPerBuyer: createIlo.maxSpendPerBuyer,
	liquidityLockPeriod: createIlo.liquidityLockPeriod,
});

const mapDispatchToProps = (dispatch: IDispatch) => ({
	updateShowConnectModal: (showConnectModal: boolean) => dispatch(updateShowConnectModal(showConnectModal)),
	updateShowLoadingModal: (showLoadingModal: boolean) => dispatch(updateShowLoadingModal(showLoadingModal)),
	updateLogoURL: (logoURL: string) => dispatch(updateLogoURL(logoURL)),
	updateHeaderImageURL: (headerImageURL: string) => dispatch(updateHeaderImageURL(headerImageURL)),
	updateTelegramURL: (telegramURL: string) => dispatch(updateTelegramURL(telegramURL)),
	updateTwitterURL: (twitterURL: string) => dispatch(updateTwitterURL(twitterURL)),
	updateWebsiteURL: (websiteURL: string) => dispatch(updateWebsiteURL(websiteURL)),
	updateWhitepaperURL: (whitepaperURL: string) => dispatch(updateWhitepaperURL(whitepaperURL)),
	updateDescription: (description: string) => dispatch(updateDescription(description)),
	addError: (error: unknown) => dispatch(addError(error)),
});

const createIloSocials = connect(mapStateToProps, mapDispatchToProps)(withRouter(withWeb3(CreateIloSocials)));

export { createIloSocials as CreateIloSocials };
