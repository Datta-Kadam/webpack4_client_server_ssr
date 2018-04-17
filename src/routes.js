import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';
import universal from 'react-universal-component';
// import Simulate_form from '../src/components/simulate_form';
// import Simulate_form_Update from './components/simulate_form_update';
import Headers from '../src/components/header';
//import RequireAuth from './components/auth/req_auth';


const UniversalComponent = universal(props => import(`./routerComponents/${props.page}`));

const routes = (  
    <div>
      <Headers />
       <Switch>
         <Route exact path="/AddRequestResponse">
            <UniversalComponent page="SimulateAdd" />
         </Route>       
         <Route path="/UpdateRequestResponse">
            <UniversalComponent page="SimulateUpdate" />
         </Route>   
       </Switch>
    </div>
);


export default routes;
