import { IPayloadAction } from '../types';

export interface IUtilsState {
	showLoadingModal: boolean;
}

type IUpdateShowLoadingModal = IPayloadAction<'updateShowLoadingModal', { showLoadingModal: boolean }>;

export type IUtilsAction = IUpdateShowLoadingModal;
