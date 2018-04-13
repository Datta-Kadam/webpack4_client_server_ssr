import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';
import universal from 'react-universal-component';
import Simulate_form from '../src/components/simulate_form';
import Simulate_form_Update from '../src/components/simulate_form_update';
import Headers from '../src/components/header';
import RequireAuth from './components/auth/req_auth';


const UniversalComponent = universal(props => import(`./${props.page}`));

const routes = (  
    <div>
      <Headers />
       <Switch>
        <Redirect from="/" exact to="/AddRequestResponse" />
         <Route exact path="/AddRequestResponse">
            <UniversalComponent page="Simulate_form" />
         </Route>       
         <Route path="/UpdateRequestResponse">
            <UniversalComponent page="Simulate_form_Update" />
         </Route>   
       </Switch>
    </div>
);


export default routes;
