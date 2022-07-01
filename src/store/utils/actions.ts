import { IUtilsAction } from 'store/utils/types';

export const updateShowLoadingModal = (showLoadingModal: boolean): IUtilsAction => ({
	type: 'updateShowLoadingModal',
	payload: { showLoadingModal },
});
