import React, { Suspense, useEffect } from 'react';
// import { Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Result from './pages/Result';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SignupSuccess from './components/SignupPage/SignupSuccess.js';
import './styles/app.scss';
import 'font-awesome/css/font-awesome.min.css';
import AppHeader from './components/Layout/header';
import Footer from './components/Layout/footer';
import Room from './pages/Room';
import UserRoute from './routes/UserRoute'
import GuestRoute from './routes/GuestRoute'
import { browserHistory } from './helpers';
import { createBrowserHistory } from "history";
import { Redirect, Route, Router, Switch, useLocation } from "react-router-dom";
    
require('dotenv').config();
export const history = createBrowserHistory();
const App = () => {
    return (
        <React.Fragment>
            <Router history={history}>
                <AppHeader />

                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact path='/' component={Homepage} />
                        <GuestRoute exact path='/login' component={Login} />
                        <GuestRoute exact path='/register' component={Signup} />
                        <GuestRoute
                            exact
                            path='/register/success'
                            component={SignupSuccess}
                        />

                        <Route path='/results/' children={<Result />} />
                        <Route path='/room/:id' children={<Room />} />
                    </Switch>
                </Suspense>
                <Footer/>
            </Router>
        </React.Fragment>
    );
};

export default App;
