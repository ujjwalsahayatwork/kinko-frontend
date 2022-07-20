import axios from 'axios';
import BigNumber from 'bignumber.js';
import { BACKEND_URL_BSC, ETHEREUM_CHAIN_ID, FRONTEND_URL } from 'constants/env';
import { IIlo, IResponseIlo } from 'types';
import { getTimeline } from 'utils/utils';
import Web3 from 'web3';

export const frontendUlr = FRONTEND_URL;

let instance = axios.create({ baseURL: BACKEND_URL_BSC });

const createInstance = async () => {
	const web3 = new Web3(Web3.givenProvider);
	const chainId = await web3.eth.getChainId();
	if (chainId === ETHEREUM_CHAIN_ID) {
		instance = axios.create({ baseURL: BACKEND_URL_BSC });
	}
};

export const createIlo = async (params: {
	iloName: string;
	launchpadAddress: string;
	r: string;
	s: string;
	v: string;
	logo: string;
	headerImage: string;
	telegramURL: string;
	twitterURL: string;
	websiteURL: string;
	whitepaperURL: string;
	description: string;
	category: string;
}): Promise<void> => {
	const {
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
		category,
	} = params;
	createInstance();
	await instance.post('/api/v1/create_ilo', {
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
		category,
	});
};

const castIlo = (ilo: IResponseIlo): IIlo => {
	const {
		iloName,
		creatorAddress,
		launchpadAddress,
		saleTokenAddress,
		saleTokenName,
		saleTokenSymbol,
		baseTokenAddress,
		baseTokenName,
		baseTokenSymbol,
		startBlockDate,
		endBlockDate,
		logoFileName,
		headerImageFileName,
		telegramURL,
		twitterURL,
		websiteURL,
		whitepaperURL,
		description,
		status,
		earlyAccessTokenAddress,
		earlyAccessTokenAmount,
		totalBaseCollected,
		hardcap,
		softcap,
		referral,
		round1Length,
		lpGenerationComplete,
		liquidityRatePercent,
		round1EndDate,
		lockPeriod,
		numBuyers,
		maxSpendPerBuyer,
		presaleAmount,
		kinkoTokenFeePercent,
		saleTokenTotalSupply,
		listingRatePercent,
		isBnb,
		totalTokensSold,
		lpGenerationTimestamp,
		addLiquidityTransactionHash,
		category,
	} = ilo;
	const timeline = getTimeline({
		startBlockDate: new Date(startBlockDate),
		endBlockDate: new Date(endBlockDate),
		totalBaseCollected: new BigNumber(totalBaseCollected),
		hardcap: new BigNumber(hardcap),
		softcap: new BigNumber(softcap),
		round1Length,
		lpGenerationComplete,
	});
	return {
		iloName,
		creatorAddress,
		launchpadAddress,
		saleTokenAddress,
		saleTokenName,
		saleTokenSymbol,
		baseTokenAddress,
		baseTokenName,
		baseTokenSymbol,
		startBlockDate: new Date(startBlockDate),
		endBlockDate: new Date(endBlockDate),
		logoFileName,
		headerImageFileName,
		telegramURL,
		twitterURL,
		websiteURL,
		whitepaperURL,
		description,
		status,
		numBuyers,
		timeline,
		earlyAccessTokenAddress,
		earlyAccessTokenAmount: new BigNumber(earlyAccessTokenAmount),
		liquidityRatePercent,
		hardcap: new BigNumber(hardcap),
		softcap: new BigNumber(softcap),
		referral,
		totalBaseCollected: new BigNumber(totalBaseCollected),
		round1EndDate: new Date(round1EndDate),
		lockPeriod: BigInt(lockPeriod),
		maxSpendPerBuyer: new BigNumber(maxSpendPerBuyer),
		presaleAmount: new BigNumber(presaleAmount),
		kinkoTokenFeePercent,
		saleTokenTotalSupply: new BigNumber(saleTokenTotalSupply),
		listingRatePercent,
		isBnb,
		totalTokensSold: new BigNumber(totalTokensSold),
		lpGenerationTimestamp: BigInt(lpGenerationTimestamp),
		addLiquidityTransactionHash,
		category,
	};
};

interface IGetIloResponse {
	ilo: IResponseIlo;
}

export const getIlo = (launchpadAddress: string): Promise<IIlo> =>
	instance
		.post<IGetIloResponse>('/api/v1/get_ilo', { launchpadAddress })
		.then((response) => castIlo(response.data.ilo));

interface IGetIlosResponse {
	ilos: Array<IResponseIlo>;
}

export const getIlos = (): Promise<Array<IIlo>> =>
	instance
		.post<IGetIlosResponse>('/api/v1/get_ilos')
		.then((response) => response.data.ilos.map<IIlo>((ilo) => castIlo(ilo)));

interface IIsIloNameAvailableResponse {
	isAvailable: boolean;
}

export const isIloNameAvailable = (iloName: string): Promise<boolean> =>
	instance
		.post<IIsIloNameAvailableResponse>('/api/v1/is_ilo_name_available', { iloName })
		.then((response) => response.data.isAvailable);

interface IIsSaleTokenAvailableResponse {
	isAvailable: boolean;
}

export const isSaleTokenAvailable = (saleTokenAddress: string): Promise<boolean> =>
	instance
		.post<IIsSaleTokenAvailableResponse>('/api/v1/is_sale_token_available', { saleTokenAddress })
		.then((response) => response.data.isAvailable);

export const addLiquidityTransactionHash = (transactionHash: string): Promise<void> =>
	instance.post('/api/v1/add_liquidity_transaction', { transactionHash });
createInstance();

export const createReferral = async (params: {
	launchpadAddress: string;
	referralAddress: string;
	referralSign: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
}): Promise<any> => {
	const { launchpadAddress, referralAddress, referralSign } = params;
	createInstance();
	const res = await instance.post('/api/v1/create-referral', {
		launchpadAddress,
		referralAddress,
		referralSign,
	});
	return res;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const referBaseUrl = (referralId: string): Promise<any> =>
	instance.post('/api/v1/get-referral-by-id', { referralId }).then((res) => castIlo(res.data.result));
