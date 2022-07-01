import { IPayloadAction } from '../types';

export interface IErrorState {
	errorIdSequence: number;
	errors: Array<{ errorId: number; errorMessage: string }>;
}

type IAddErrorAction = IPayloadAction<'addError', { errorMessage: string }>;

type IRemoveErrorAction = IPayloadAction<'removeError', { errorId: number }>;

export type IErrorAction = IAddErrorAction | IRemoveErrorAction;
