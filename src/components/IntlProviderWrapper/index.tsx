import React, { FunctionComponent } from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';

import messagesRu from '../../translations/ru';
import messagesEn from '../../translations/en';

import { IStateLang } from '../../interfaces/state-lang.interface';
import { IState } from '../../interfaces/state.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const messages: {[key: string]: any} = {
    'ru': messagesRu,
    'en': messagesEn
};

const IntlProviderWrapper: FunctionComponent = ({children}) => {
    const { locale }: IStateLang = useSelector(
        (state: IState) => state.lang
    );

    return (
        <IntlProvider
            locale={locale}
            key={locale}
            messages={messages[locale]}
        >
            {children}
        </IntlProvider>
    );
};

export default IntlProviderWrapper;
