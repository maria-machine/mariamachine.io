import { ISetLangLocale } from '../../actionCreators';

import { IStateLang } from '../../interfaces/state-lang.interface';

const initialState = {locale: 'en'};

export type LangActionsType = ISetLangLocale;

export const langReducer = (state: IStateLang = initialState, action: LangActionsType): IStateLang => {
    switch (action.type) {
        case 'SET_LANG_LOCALE':
            return {...state, locale: action.payload};
        default:
            return state;
    }
};
