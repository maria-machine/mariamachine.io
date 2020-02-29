import React from 'react';
import ReactDOM from 'react-dom';
import * as contentful from 'contentful';

import { config } from './config';

import * as serviceWorker from './serviceWorker';

import App from './App';

declare global {
    // eslint-disable-next-line @typescript-eslint/interface-name-prefix
    interface Window {
        contentful: contentful.ContentfulClientApi;
    }
}

const init = (callback: () => void) => {
    const contentfulClient = contentful.createClient({
        space: config.contentful.space || '',
        accessToken: config.contentful.token || ''
    });

    window.contentful = contentfulClient;

    callback();
};

init(
    () => {
        ReactDOM.render(<App />, document.getElementById('root'));
    }
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
