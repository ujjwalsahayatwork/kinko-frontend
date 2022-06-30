import { Action } from 'redux';

export type DeepPartial<T> = {
	[P in keyof T]?: DeepPartial<T[P]>;
};

export type IActionType =
	| 'updateShowLoadingModal'
	| 'addError'
	| 'removeError'
	| 'updateShowConnectModal'
	| 'updateShowWrongChainModal'
	| 'updateConnectorIndex'
	| 'updateIloName'
	| 'updateSaleToken'
	| 'updateBaseToken'
	| 'updateTokenFee'
	| 'updatePresaleCreator'
	| 'updatePresaleAmount'
	| 'updateSoftcap'
	| 'updateHardcap'
	| 'updateLiquidityRatePercent'
	| 'updateListingRatePercent'
	| 'updateMaxSpendPerBuyer'
	| 'updateStartBlock'
	| 'updateEndBlock'
	| 'updateLiquidityLockPeriod'
	| 'updateSaleTokenTotalRequired'
	| 'updateLogoURL'
	| 'updateHeaderImageURL'
	| 'updateTelegramURL'
	| 'updateTwitterURL'
	| 'updateWebsiteURL'
	| 'updateWhitepaperURL'
	| 'updateDescription'
	| 'updateIsCloseShowConnectModal'

export interface IPayloadAction<T extends IActionType, U extends object> extends Action<IActionType> {
	type: T;
	payload: U;
}
