import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Result from './pages/Result';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SignupSuccess from './components/SignupPage/SignupSuccess.js';
import './styles/app.scss';
import 'font-awesome/css/font-awesome.min.css';
import AppHeader from './components/Layout/header';
import Room from './pages/Room';

require('dotenv').config();

const App = () => {
    return (
        <React.Fragment>
            <AppHeader />
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path='/' component={Homepage} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Signup} />
                    <Route exact path='/register/success' component={SignupSuccess} />
                    <Route path='/result/:id' children={<Result />} />
                    <Route path='/room/:id' children={<Room />} />
                </Switch>
            </Suspense>
        </React.Fragment>
    );
};

export default App;
