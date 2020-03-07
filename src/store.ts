import { createStore } from 'redux';

import { rootReducer } from './reducers/root-reducer';

import { config } from './config';

import { LocaleEnum } from './enums/locale.enum';

const initialStateDefault = {
    subscription: localStorage.getItem(config.localStorage.subscription) === 'true' || false,
    lang: {
        locale: localStorage.getItem(config.localStorage.locale) || navigator.language.split(/[-_]/)[0] || LocaleEnum.EN
    },
    layout: {
        categories: {}
    }
};

export const configureStore = (initialState = initialStateDefault) => {
    const store = createStore(
        rootReducer,
        {...initialState},
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};
