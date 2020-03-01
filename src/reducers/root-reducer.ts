import { Reducer, combineReducers } from 'redux';

import { langReducer, LangActionsType } from './lang';

import { IState } from '../interfaces/state.interface';

type IAction = LangActionsType;

export const rootReducer: Reducer<IState, IAction> = combineReducers({
    lang: langReducer
});
