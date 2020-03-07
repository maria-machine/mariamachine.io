import { Reducer, combineReducers } from 'redux';

import { langReducer, LangActionsType } from './lang';
import { layoutReducer, LayoutActionsType } from './layout';

import { IState } from '../interfaces/state.interface';

type IAction = LangActionsType | LayoutActionsType;

export const rootReducer: Reducer<IState, IAction> = combineReducers({
    lang: langReducer,
    layout: layoutReducer
});
