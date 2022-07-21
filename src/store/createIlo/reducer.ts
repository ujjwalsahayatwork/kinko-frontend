import BigNumber from 'bignumber.js';
import { ICreateIloAction, ICreateIloState } from 'store/createIlo/types';

export const initialCreateIloState: ICreateIloState = {
	iloName: '',
	saleTokenAddress: '',
	saleTokenSymbol: '',
	saleTokenTotalSupply: new BigNumber(0),
	baseToken: undefined,
	baseTokenAddress: '',
	baseTokenSymbol: '',
	baseTokenDecimals: 0,
	tokenFeePercent: 0,
	presaleCreator: '',
	presaleAmount: new BigNumber(0),
	softcap: new BigNumber(0),
	hardcap: new BigNumber(0),
	liquidityRatePercent: 0,
	listingRatePercent: 0,
	maxSpendPerBuyer: new BigNumber(0),
	startBlockDate: new Date(),
	endBlockDate: new Date(),
	liquidityLockPeriod: BigInt(0),
	saleTokenTotalRequired: new BigNumber(0),
	logoURL: '',
	headerImageURL: '',
	telegramURL: '',
	twitterURL: '',
	websiteURL: '',
	whitepaperURL: '',
	description: '',
	iloReferral: [],
	IloCategory: ''
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const createIloReducer = (state = initialCreateIloState, action: ICreateIloAction): ICreateIloState => {
	switch (action.type) {
		case 'updateIloName':
			return { ...state, iloName: action.payload.iloName };
		case 'updateSaleToken':
			return {
				...state,
				saleTokenAddress: action.payload.saleTokenAddress,
				saleTokenSymbol: action.payload.saleTokenSymbol,
				saleTokenTotalSupply: action.payload.saleTokenTotalSupply,
			};
		case 'updateBaseToken':
			return {
				...state,
				baseToken: action.payload.baseToken,
				baseTokenAddress: action.payload.baseTokenAddress,
				baseTokenSymbol: action.payload.baseTokenSymbol,
				baseTokenDecimals: action.payload.baseTokenDecimals,
			};
		case 'updateTokenFee':
			return { ...state, tokenFeePercent: action.payload.tokenFeePercent };
		case 'updatePresaleCreator':
			return { ...state, presaleCreator: action.payload.presaleCreator };
		case 'updatePresaleAmount':
			return { ...state, presaleAmount: action.payload.presaleAmount };
		case 'updateSoftcap':
			return { ...state, softcap: action.payload.softcap };
		case 'updateHardcap':
			return { ...state, hardcap: action.payload.hardcap };
		case 'updateLiquidityRatePercent':
			return { ...state, liquidityRatePercent: action.payload.liquidityRatePercent };
		case 'updateListingRatePercent':
			return { ...state, listingRatePercent: action.payload.listingRatePercent };
		case 'updateMaxSpendPerBuyer':
			return { ...state, maxSpendPerBuyer: action.payload.maxSpendPerBuyer };
		case 'updateStartBlock':
			return { ...state, startBlockDate: action.payload.startBlockDate };
		case 'updateEndBlock':
			return { ...state, endBlockDate: action.payload.endBlockDate };
		case 'updateLiquidityLockPeriod':
			return { ...state, liquidityLockPeriod: action.payload.liquidityLockPeriod };
		case 'updateSaleTokenTotalRequired':
			return { ...state, saleTokenTotalRequired: action.payload.saleTokenTotalRequired };
		case 'updateLogoURL':
			return { ...state, logoURL: action.payload.logoURL };
		case 'updateHeaderImageURL':
			return { ...state, headerImageURL: action.payload.headerImageURL };
		case 'updateTelegramURL':
			return { ...state, telegramURL: action.payload.telegramURL };
		case 'updateTwitterURL':
			return { ...state, twitterURL: action.payload.twitterURL };
		case 'updateWebsiteURL':
			return { ...state, websiteURL: action.payload.websiteURL };
		case 'updateWhitepaperURL':
			return { ...state, whitepaperURL: action.payload.whitepaperURL };
		case 'updateDescription':
			return { ...state, description: action.payload.description };
		case 'updateReferralResponse':
			return { ...state, iloReferral: action.payload.data };
		case 'updateIloCategory':
			return { ...state, IloCategory: action.payload.category};
		default:
			return state;
	}
};
