import { errorToString } from 'utils/utils';
import { IErrorAction } from './types';

export const addError = (error: unknown): IErrorAction => ({
	type: 'addError',
	payload: { errorMessage: errorToString(error) },
});

export const removeError = (errorId: number): IErrorAction => ({ type: 'removeError', payload: { errorId } });
