import { IErrorAction, IErrorState } from './types';

export const initialErrorState: IErrorState = {
	errorIdSequence: 3,
	errors: [],
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const errorReducer = (state = initialErrorState, action: IErrorAction): IErrorState => {
	switch (action.type) {
		case 'addError':
			return {
				...state,
				errorIdSequence: state.errorIdSequence + 1,
				errors: [...state.errors, { errorId: state.errorIdSequence, errorMessage: action.payload.errorMessage }],
			};
		case 'removeError':
			return {
				...state,
				errors: state.errors.filter((error) => error.errorId !== action.payload.errorId),
			};
		default:
			return state;
	}
};
