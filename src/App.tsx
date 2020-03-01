import React, { FunctionComponent } from 'react';
import { Router, Route, Switch } from 'react-router';
import { Provider } from 'react-redux';

import { GlobalStyle } from './App.styles';

import IntlProviderWrapper from './components/IntlProviderWrapper';

import Main from './components/Main';
import Category from './components/Category';
import SinglePost from './components/SinglePost';

import history from './utils/history';

import { configureStore } from './store';

const App: FunctionComponent = () => {
    const store = configureStore();

    return (
        <Provider store={store}>
            <IntlProviderWrapper>
                <GlobalStyle />
                <Router history={history}>
                    <Switch>
                        <Route exact path='/' component={Main} />
                        <Route path='/posts/:name' component={SinglePost} />
                        <Route path='/:category' component={Category} />
                    </Switch>
                </Router>
            </IntlProviderWrapper>
        </Provider>
    );
};

export default App;
