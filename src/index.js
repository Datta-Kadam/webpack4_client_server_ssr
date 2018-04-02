//Automatically added using tranform runtime plugin added in .babelrc
//import 'babel-plugin-transform-runtime';

import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import routes from './routes';
import reducers from './reducers';


const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

const Routes = (
    //<CookiesProvider>
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            {routes}
        </BrowserRouter>
    </Provider>
   // </CookiesProvider>
  );
  
  function render(value) {
      ReactDOM.render(      
        <AppContainer>   
             <Provider store={createStoreWithMiddleware(reducers)}>              
                <BrowserRouter>
                { value }
                </BrowserRouter>              
            </Provider>  
            </AppContainer>     
          , document.querySelector('.container'));
  }
  
  render(routes);
  
  // This is needed for Hot Module Replacement
  if (module.hot) {
    module.hot.accept('./routes.js', () => {
      const newRoutes = require('./routes.js').default;
  
      render(newRoutes);
    });
  }
  