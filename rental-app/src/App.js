import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Result from './pages/Result';

const App = () => {
    return (
        <React.Fragment>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path='/' component={Homepage} />
                    <Route path='/result/:id' children={<Result />} />
                </Switch>
            </Suspense>
        </React.Fragment>
    );
};

export default App;
