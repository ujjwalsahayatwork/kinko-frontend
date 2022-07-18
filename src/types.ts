import BigNumber from 'bignumber.js';
import { IIcon } from 'components/icon/icon';

export type IBaseToken = 'dai' | 'wbtc' | 'usdc' | 'bnb';

export type IIloStatus = 'upcoming' | 'round1' | 'round2' | 'saleDone' | 'success' | 'failed';

export type ITimeline = { reached: boolean; icon: IIcon; title: string; subtitle: string };

export interface IIlo {
	iloName: string;
	creatorAddress: string;
	launchpadAddress: string;
	saleTokenAddress: string;
	saleTokenName: string;
	saleTokenSymbol: string;
	baseTokenAddress: string;
	baseTokenName: string;
	baseTokenSymbol: string;
	startBlockDate: Date;
	endBlockDate: Date;
	logoFileName: string;
	headerImageFileName: string;
	telegramURL: string;
	twitterURL: string;
	websiteURL: string;
	whitepaperURL: string;
	description: string;
	numBuyers: number;
	timeline: Array<ITimeline>;
	status: IIloStatus;
	earlyAccessTokenAddress: string;
	earlyAccessTokenAmount: BigNumber;
	liquidityRatePercent: number;
	hardcap: BigNumber;
	softcap: BigNumber;
	totalBaseCollected: BigNumber;
	round1EndDate: Date;
	lockPeriod: bigint;
	maxSpendPerBuyer: BigNumber;
	presaleAmount: BigNumber;
	kinkoTokenFeePercent: number;
	saleTokenTotalSupply: BigNumber;
	listingRatePercent: number;
	isGlmr: boolean;
	totalTokensSold: BigNumber;
	lpGenerationTimestamp: bigint;
	addLiquidityTransactionHash: string;
}

export interface ECSignature {
	r: string;
	s: string;
	v: string;
}


export interface IResponseIlo {
	iloName: string;
	creatorAddress: string;
	launchpadAddress: string;
	saleTokenAddress: string;
	saleTokenName: string;
	saleTokenSymbol: string;
	baseTokenAddress: string;
	baseTokenName: string;
	baseTokenSymbol: string;
	hardcap: string;
	softcap: string;
	startBlockDate: string;
	endBlockDate: string;
	logoFileName: string;
	headerImageFileName: string;
	telegramURL: string;
	twitterURL: string;
	websiteURL: string;
	whitepaperURL: string;
	description: string;
	status: IIloStatus;
	earlyAccessTokenAddress: string;
	earlyAccessTokenAmount: string;
	forceFailed: boolean;
	lpGenerationComplete: boolean;
	whitelistOnly: boolean;
	totalBaseCollected: string;
	totalBaseWithdrawn: string;
	totalTokensSold: string;
	totalTokensWithdrawn: string;
	numBuyers: number;
	round1Length: number;
	liquidityRatePercent: number;
	round1EndDate: string;
	lockPeriod: string;
	maxSpendPerBuyer: string;
	presaleAmount: string;
	kinkoTokenFeePercent: number;
	saleTokenTotalSupply: string;
	listingRatePercent: number;
	isGlmr: boolean;
	lpGenerationTimestamp: string;
	addLiquidityTransactionHash: string;
}
