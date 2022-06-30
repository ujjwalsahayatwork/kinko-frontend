import BigNumber from 'bignumber.js';
import { ICreateIloAction } from 'store/createIlo/types';
import { IBaseToken } from 'types';
import { getBaseTokenAddress, getBaseTokenDecimals, getBaseTokenSymbol } from 'utils/utils';

export const updateIloName = (iloName: string): ICreateIloAction => ({ type: 'updateIloName', payload: { iloName } });

export const updateSaleToken = (
	saleTokenAddress: string,
	saleTokenSymbol: string,
	saleTokenTotalSupply: BigNumber
): ICreateIloAction => ({
	type: 'updateSaleToken',
	payload: { saleTokenAddress, saleTokenSymbol, saleTokenTotalSupply },
});

export const updateBaseToken = (baseToken: IBaseToken): ICreateIloAction => ({
	type: 'updateBaseToken',
	payload: {
		baseToken,
		baseTokenAddress: getBaseTokenAddress(baseToken),
		baseTokenSymbol: getBaseTokenSymbol(baseToken),
		baseTokenDecimals: getBaseTokenDecimals(baseToken),
	},
});

export const updateTokenFee = (tokenFeePercent: number): ICreateIloAction => ({
	type: 'updateTokenFee',
	payload: { tokenFeePercent },
});

export const updatePresaleCreator = (presaleCreator: string): ICreateIloAction => ({
	type: 'updatePresaleCreator',
	payload: { presaleCreator },
});

export const updatePresaleAmount = (presaleAmount: BigNumber): ICreateIloAction => ({
	type: 'updatePresaleAmount',
	payload: { presaleAmount },
});

export const updateSoftcap = (softcap: BigNumber): ICreateIloAction => ({
	type: 'updateSoftcap',
	payload: { softcap },
});

export const updateHardcap = (hardcap: BigNumber): ICreateIloAction => ({
	type: 'updateHardcap',
	payload: { hardcap },
});

export const updateLiquidityRatePercent = (liquidityRatePercent: number): ICreateIloAction => ({
	type: 'updateLiquidityRatePercent',
	payload: { liquidityRatePercent },
});

export const updateListingRatePercent = (listingRatePercent: number): ICreateIloAction => ({
	type: 'updateListingRatePercent',
	payload: { listingRatePercent },
});

export const updateMaxSpendPerBuyer = (maxSpendPerBuyer: BigNumber): ICreateIloAction => ({
	type: 'updateMaxSpendPerBuyer',
	payload: { maxSpendPerBuyer },
});

export const updateStartBlock = (startBlockDate: Date): ICreateIloAction => ({
	type: 'updateStartBlock',
	payload: { startBlockDate },
});

export const updateEndBlock = (endBlockDate: Date): ICreateIloAction => ({
	type: 'updateEndBlock',
	payload: { endBlockDate },
});

export const updateLiquidityLockPeriod = (liquidityLockPeriod: bigint): ICreateIloAction => ({
	type: 'updateLiquidityLockPeriod',
	payload: { liquidityLockPeriod },
});

export const updateSaleTokenTotalRequired = (saleTokenTotalRequired: BigNumber): ICreateIloAction => ({
	type: 'updateSaleTokenTotalRequired',
	payload: { saleTokenTotalRequired },
});

export const updateLogoURL = (logoURL: string): ICreateIloAction => ({ type: 'updateLogoURL', payload: { logoURL } });

export const updateHeaderImageURL = (headerImageURL: string): ICreateIloAction => ({
	type: 'updateHeaderImageURL',
	payload: { headerImageURL },
});

export const updateTelegramURL = (telegramURL: string): ICreateIloAction => ({
	type: 'updateTelegramURL',
	payload: { telegramURL },
});

export const updateTwitterURL = (twitterURL: string): ICreateIloAction => ({
	type: 'updateTwitterURL',
	payload: { twitterURL },
});

export const updateWebsiteURL = (websiteURL: string): ICreateIloAction => ({
	type: 'updateWebsiteURL',
	payload: { websiteURL },
});

export const updateWhitepaperURL = (whitepaperURL: string): ICreateIloAction => ({
	type: 'updateWhitepaperURL',
	payload: { whitepaperURL },
});

export const updateDescription = (description: string): ICreateIloAction => ({
	type: 'updateDescription',
	payload: { description },
});
