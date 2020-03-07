import React, { FunctionComponent } from 'react';
import { Router, Route, Switch } from 'react-router';
import { Provider } from 'react-redux';

import { GlobalStyle } from './App.styles';

import IntlProviderWrapper from './components/IntlProviderWrapper';

import Main from './components/Main';
import Category from './components/Category';
import SinglePost from './components/SinglePost';
import Page404 from './components/Page404';
import Layout from './components/Layout';

import history from './utils/history';

import { configureStore } from './store';

const App: FunctionComponent = () => {
    const store = configureStore();

    return (
        <Provider store={store}>
            <IntlProviderWrapper>
                <GlobalStyle />
                <Router history={history}>
                    <Layout>
                        <Switch>
                            <Route exact path='/' component={Main} />
                            <Route path='/posts/:publicUrl' component={SinglePost} />
                            <Route path='/categories/:category' component={Category} />
                            <Route component={Page404} />
                        </Switch>
                    </Layout>
                </Router>
            </IntlProviderWrapper>
        </Provider>
    );
};

export default App;
