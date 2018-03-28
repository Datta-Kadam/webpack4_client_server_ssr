import _$ from 'jquery';
//import React from 'react';
//import ReactDOM from 'react-dom';
//import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {  applyMiddleware } from 'redux';
import reducers from '../src/reducers';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import logger from 'redux-logger';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;
const $ = _$(global.window);
//window=global.window;
//document=global.document;

chaiJquery(chai, chai.util, $);

//import React from 'react';
//import ReactDOM from 'react-dom';
//import TestUtils from 'react-addons-test-utils';
// const chai = require('chai');
// const expect = require('chai');
// const chaiJquery = require('chai-jquery');
// const Provider  = require('react-redux').Provider;
// const createStore = require('redux').createStore();
// const applyMiddleware  = require('redux').applyMiddleware();
// const reducers = require('../src/reducers');
// const thunk = require('redux-thunk');
// const logger = require('redux-logger');
const React = require('react');
const ReactDOM =require('react-dom');
const TestUtils =require('react-addons-test-utils');


global.document.createRange = () => {
  return {
    setEnd: () => {},
    setStart: () => {},
    getBoundingClientRect: () => {}
  }
}

chaiJquery(chai, chai.util, $);

const createStoreWithMiddleware = applyMiddleware(thunk,logger)(createStore);

function renderComponent(ComponentClass, props = {}, state = {}) {
  const componentInstance =  TestUtils.renderIntoDocument(
    <Provider store={createStoreWithMiddleware(reducers,state)}>
      <ComponentClass {...props} />
    </Provider>
  );

  return $(ReactDOM.findDOMNode(componentInstance));
}

$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};

export {renderComponent, expect};
