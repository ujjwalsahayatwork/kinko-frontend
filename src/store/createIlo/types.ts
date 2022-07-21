import BigNumber from 'bignumber.js';
import { IPayloadAction } from 'store/types';
import { IBaseToken } from 'types';

export interface ICreateIloState {
	iloName: string;
	saleTokenAddress: string;
	saleTokenSymbol: string;
	saleTokenTotalSupply: BigNumber;
	baseToken: IBaseToken | undefined;
	baseTokenAddress: string;
	baseTokenSymbol: string;
	baseTokenDecimals: number;
	tokenFeePercent: number;
	presaleCreator: string;
	presaleAmount: BigNumber;
	softcap: BigNumber;
	hardcap: BigNumber;
	liquidityRatePercent: number;
	listingRatePercent: number;
	maxSpendPerBuyer: BigNumber;
	startBlockDate: Date;
	endBlockDate: Date;
	liquidityLockPeriod: bigint;
	saleTokenTotalRequired: BigNumber;
	logoURL: string;
	headerImageURL: string;
	telegramURL: string;
	twitterURL: string;
	websiteURL: string;
	whitepaperURL: string;
	description: string;
	iloReferral: any;
	IloCategory: string;
}

type IUpdateIloCategory = IPayloadAction<'updateIloCategory', { category: string }>;

type IUpdateIloName = IPayloadAction<'updateIloName', { iloName: string }>;

type IUpdateSaleToken = IPayloadAction<
	'updateSaleToken',
	{
		saleTokenAddress: string;
		saleTokenSymbol: string;
		saleTokenTotalSupply: BigNumber;
	}
>;

type IUpdateBaseToken = IPayloadAction<
	'updateBaseToken',
	{ baseToken: IBaseToken; baseTokenAddress: string; baseTokenSymbol: string; baseTokenDecimals: number }
>;

type IUpdateTokenFee = IPayloadAction<'updateTokenFee', { tokenFeePercent: number }>;

type IUpdatePresaleCreator = IPayloadAction<'updatePresaleCreator', { presaleCreator: string }>;

type IUpdatePresaleAmount = IPayloadAction<'updatePresaleAmount', { presaleAmount: BigNumber }>;

type IUpdateSoftcap = IPayloadAction<'updateSoftcap', { softcap: BigNumber }>;

type IUpdateHardcap = IPayloadAction<'updateHardcap', { hardcap: BigNumber }>;

type IUpdateLiquidityRatePercent = IPayloadAction<'updateLiquidityRatePercent', { liquidityRatePercent: number }>;

type IUpdateListingRatePercent = IPayloadAction<'updateListingRatePercent', { listingRatePercent: number }>;

type IUpdateMaxSpendPerBuyer = IPayloadAction<'updateMaxSpendPerBuyer', { maxSpendPerBuyer: BigNumber }>;

type IUpdateStartBlock = IPayloadAction<'updateStartBlock', { startBlockDate: Date }>;

type IUpdateEndBlock = IPayloadAction<'updateEndBlock', { endBlockDate: Date }>;

type IUpdateLiquidityLockPeriod = IPayloadAction<'updateLiquidityLockPeriod', { liquidityLockPeriod: bigint }>;

type IUpdateSaleTokenTotalRequired = IPayloadAction<
	'updateSaleTokenTotalRequired',
	{ saleTokenTotalRequired: BigNumber }
>;

type IUpdateLogoURL = IPayloadAction<'updateLogoURL', { logoURL: string }>;

type IUpdateHeaderImageURL = IPayloadAction<'updateHeaderImageURL', { headerImageURL: string }>;

type IUpdateTelegramURL = IPayloadAction<'updateTelegramURL', { telegramURL: string }>;

type IUpdateTwitterURL = IPayloadAction<'updateTwitterURL', { twitterURL: string }>;

type IUpdateWebsiteURL = IPayloadAction<'updateWebsiteURL', { websiteURL: string }>;

type IUpdateWhitepaperURL = IPayloadAction<'updateWhitepaperURL', { whitepaperURL: string }>;

type IUpdateDescription = IPayloadAction<'updateDescription', { description: string }>;

type IreferralResponse = IPayloadAction<'updateReferralResponse', { data: unknown }>;

export type ICreateIloAction =
	| IUpdateIloName
	| IUpdateSaleToken
	| IUpdateBaseToken
	| IUpdateTokenFee
	| IUpdatePresaleCreator
	| IUpdatePresaleAmount
	| IUpdateSoftcap
	| IUpdateHardcap
	| IUpdateLiquidityRatePercent
	| IUpdateListingRatePercent
	| IUpdateMaxSpendPerBuyer
	| IUpdateStartBlock
	| IUpdateEndBlock
	| IUpdateLiquidityLockPeriod
	| IUpdateSaleTokenTotalRequired
	| IUpdateLogoURL
	| IUpdateHeaderImageURL
	| IUpdateTelegramURL
	| IUpdateTwitterURL
	| IUpdateWebsiteURL
	| IUpdateWhitepaperURL
	| IUpdateDescription
	| IreferralResponse
	| IUpdateIloCategory;
