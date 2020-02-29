import React, { FunctionComponent } from 'react';
import { Router, Route, Switch } from 'react-router';

import { GlobalStyle } from './App.styles';

import Main from './components/Main';

import history from './utils/history';

const App: FunctionComponent = () => (
    <>
        <GlobalStyle />
        <Router history={history}>
            <Switch>
                <Route exact path='/' component={Main} />
            </Switch>
        </Router>
    </>
);

export default App;
