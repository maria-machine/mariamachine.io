import { Reducer, combineReducers } from 'redux';

import { langReducer, LangActionsType } from './lang';
import { layoutReducer, LayoutActionsType } from './layout';
import { subscriptionReducer, SubscriptionActionsType } from './subscription';
import { postsReducer, PostsActionsType } from './posts';

import { IState } from '../interfaces/state.interface';

export type ActionType = LangActionsType | LayoutActionsType | SubscriptionActionsType | PostsActionsType;

export const rootReducer: Reducer<IState, ActionType> = combineReducers({
    subscription: subscriptionReducer,
    lang: langReducer,
    layout: layoutReducer,
    posts: postsReducer
});
