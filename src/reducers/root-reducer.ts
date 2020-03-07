import { Reducer, combineReducers } from 'redux';

import { langReducer, LangActionsType } from './lang';
import { layoutReducer, LayoutActionsType } from './layout';
import { subscriptionReducer, SubscriptionActionsType } from './subscription';

import { IState } from '../interfaces/state.interface';

type IAction = LangActionsType | LayoutActionsType | SubscriptionActionsType;

export const rootReducer: Reducer<IState, IAction> = combineReducers({
    subscription: subscriptionReducer,
    lang: langReducer,
    layout: layoutReducer
});
