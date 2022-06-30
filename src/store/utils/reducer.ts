import { IUtilsAction, IUtilsState } from 'store/utils/types';

export const initialUtilsState: IUtilsState = {
	showLoadingModal: false,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const utilsReducer = (state = initialUtilsState, action: IUtilsAction): IUtilsState => {
	switch (action.type) {
		case 'updateShowLoadingModal':
			return {
				...state,
				showLoadingModal: action.payload.showLoadingModal,
			};
		default:
			return state;
	}
};
