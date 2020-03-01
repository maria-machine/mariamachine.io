export interface ISetLangLocale {
    type: 'SET_LANG_LOCALE';
    payload: string;
}

export const setLangLocale = (locale: string): ISetLangLocale => ({
    type: 'SET_LANG_LOCALE',
    payload: locale
});
