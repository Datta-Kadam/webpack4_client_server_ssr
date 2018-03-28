import React,{component} from 'react';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom';
import Simulate_form from '../src/components/simulate_form';
import Simulate_form_Update from '../src/components/simulate_form_update';
import Headers from '../src/components/header';
import RequireAuth from './components/auth/req_auth';

const routes=(  
    <div>
        <Headers />
        <Switch>
            <Redirect from="/" exact to="/AddRequestResponse" />
            <Route exact={true} path="/AddRequestResponse" component={RequireAuth(Simulate_form)}/>                
            <Route path="/UpdateRequestResponse" component={RequireAuth(Simulate_form_Update)}/>
        </Switch>
    </div>
);


export default routes;