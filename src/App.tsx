import React, { FunctionComponent } from 'react';
import { Router, Route, Switch } from 'react-router';

import { GlobalStyle } from './App.styles';

import Main from './components/Main';
import Category from './components/Category';
import SinglePost from './components/SinglePost';

import history from './utils/history';

const App: FunctionComponent = () => (
    <>
        <GlobalStyle />
        <Router history={history}>
            <Switch>
                <Route exact path='/' component={Main} />
                <Route path='/posts/:name' component={SinglePost} />
                <Route path='/:category' component={Category} />
            </Switch>
        </Router>
    </>
);

export default App;
