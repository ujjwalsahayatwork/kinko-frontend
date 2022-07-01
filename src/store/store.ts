import BigNumber from 'bignumber.js';
import merge from 'lodash/merge';
import { Action, applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { createIloReducer, initialCreateIloState } from 'store/createIlo/reducer';
import { ICreateIloState } from 'store/createIlo/types';
import { ethereumReducer, initialEthereumState } from 'store/ethereum/reducer';
import { IEthereumState } from 'store/ethereum/types';
import { DeepPartial, IActionType } from 'store/types';
import { initialUtilsState, utilsReducer } from 'store/utils/reducer';
import { IUtilsState } from 'store/utils/types';
import { errorReducer, initialErrorState } from './error/reducer';
import { IErrorState } from './error/types';

interface IState {
	utils: IUtilsState;
	error: IErrorState;
	ethereum: IEthereumState;
	createIlo: ICreateIloState;
}

const rootReducer = combineReducers({
	utils: utilsReducer,
	error: errorReducer,
	ethereum: ethereumReducer,
	createIlo: createIloReducer,
});

const storageKey = '9a210e5b90918caf22d56f16a8533525b08cb234004dd447adf9060890d02d21';

const loadSessionState = (): DeepPartial<IState> | undefined => {
	const serialisedState = sessionStorage.getItem(storageKey);
	if (serialisedState) {
		const state: DeepPartial<IState> = JSON.parse(serialisedState);
		if (state.createIlo) {
			const {
				saleTokenTotalSupply,
				saleTokenTotalRequired,
				presaleAmount,
				softcap,
				hardcap,
				maxSpendPerBuyer,
				startBlockDate,
				endBlockDate,
				liquidityLockPeriod,
			} = state.createIlo as ICreateIloState;
			return {
				...state,
				createIlo: {
					...state.createIlo,
					saleTokenTotalSupply: new BigNumber(saleTokenTotalSupply ?? 0),
					saleTokenTotalRequired: new BigNumber(saleTokenTotalRequired ?? 0),
					presaleAmount: new BigNumber(presaleAmount ?? 0),
					softcap: new BigNumber(softcap ?? 0),
					hardcap: new BigNumber(hardcap ?? 0),
					maxSpendPerBuyer: new BigNumber(maxSpendPerBuyer ?? 0),
					startBlockDate: new Date(startBlockDate ?? new Date()),
					endBlockDate: new Date(endBlockDate ?? new Date()),
					liquidityLockPeriod: BigInt(liquidityLockPeriod ?? 0),
				},
			};
		}
	}
	return undefined;
};

const saveSessionState = (state: IState) => {
	const {
		saleTokenTotalSupply,
		saleTokenTotalRequired,
		presaleAmount,
		softcap,
		hardcap,
		maxSpendPerBuyer,
		startBlockDate,
		endBlockDate,
		liquidityLockPeriod,
	} = state.createIlo;
	const sessionState: DeepPartial<IState> = {
		createIlo: {
			...state.createIlo,
			saleTokenTotalSupply: saleTokenTotalSupply.toString(),
			presaleAmount: presaleAmount.toString(),
			softcap: softcap.toString(),
			hardcap: hardcap.toString(),
			startBlockDate: startBlockDate.toISOString(),
			endBlockDate: endBlockDate.toISOString(),
			maxSpendPerBuyer: maxSpendPerBuyer.toString(),
			saleTokenTotalRequired: saleTokenTotalRequired.toString(),
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			liquidityLockPeriod: liquidityLockPeriod.toString() as any,
		},
	};
	sessionStorage.setItem(storageKey, JSON.stringify(sessionState));
};

const loadLocalState = (): DeepPartial<IState> | undefined => {
	const serialisedState = localStorage.getItem(storageKey);
	if (serialisedState) {
		const state: DeepPartial<IState> = JSON.parse(serialisedState);
		return state;
	}
	return undefined;
};

const saveLocalState = (state: IState) => {
	const localState: DeepPartial<IState> = {
		ethereum: {
			connectorIndex: state.ethereum.connectorIndex,
		},
	};
	localStorage.setItem(storageKey, JSON.stringify(localState));
};

const loadState = (): Partial<IState> => {
	const initialState: IState = {
		utils: initialUtilsState,
		ethereum: initialEthereumState,
		error: initialErrorState,
		createIlo: initialCreateIloState,
	};
	return merge(initialState, merge(loadSessionState(), loadLocalState())) as Partial<IState>;
};

const middleware = applyMiddleware(thunkMiddleware);

export const store = createStore(rootReducer, loadState(), middleware);

store.subscribe(() => {
	saveSessionState(store.getState());
	saveLocalState(store.getState());
});

export type IRootState = ReturnType<typeof rootReducer>;

export type IThunkResult<R> = ThunkAction<Promise<R>, IRootState, unknown, Action<IActionType>>;

interface IThunkDispatch<TState, TExtraThunkArg, TBasicAction extends Action> {
	<TReturnType>(thunkAction: ThunkAction<TReturnType, TState, TExtraThunkArg, TBasicAction>): TReturnType;
	<A extends TBasicAction>(action: A): A;
	// This overload is the union of the two above (see TS issue #14107).
	<TReturnType, TAction extends TBasicAction>(
		action: TAction | ThunkAction<TReturnType, TState, TExtraThunkArg, TBasicAction>
	): TAction | TReturnType;
}

export type IDispatch = IThunkDispatch<IRootState, undefined, Action<IActionType>>;
