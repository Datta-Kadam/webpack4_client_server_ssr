import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import moxios from 'moxios';
import { expect } from '../test_helper';
import * as actions from '../../src/actions/index';
import {getReleasesMock} from '../../src/mocks/getReleasesMock';
import {getProjectsMock} from '../../src/mocks/getProjectsMock';
import { getReleaseData,getProjectData } from '../../src/actions/index';
import { GET_RELEASE,GET_PROJECT,GET_API,DEFAULT_REQRES} from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

//const createStoreWithMiddleware = applyMiddleware(thunk,logger)(createStore);
describe('Actions',()=>{

  describe('GET_RELEASE', () => {
    beforeEach(function () {
      moxios.install();
    });
    afterEach(function () {
      moxios.uninstall();
    });
  
    it('creates GET_RELEASE after successfuly fetching release data', () => {  
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: getReleasesMock(),
        });
      });
      const expectedActions = [GET_RELEASE];
      const store = mockStore({ release: [] })
      return store.dispatch(actions.getReleaseData()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        //console.log(actionTypes);
        expect(actionTypes).to.be.eql(expectedActions);
      });
    });
  });

describe('GET_PROJECT', () => {
    beforeEach(function () {
      moxios.install();
    });
    afterEach(function () {
      moxios.uninstall();
    });
  
    it('creates GET_PROJECT after successfuly fetching projects', () => {  
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: getProjectsMock(),
        });
      });
      const expectedActions = [GET_PROJECT];
      const store = mockStore({ project: [] });
      
      return store.dispatch(actions.getProjectData('1802')).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        //console.log(actionTypes);
        //console.log('Output -> ',store.getActions()[0].payload)
        expect(actionTypes).to.be.eql(expectedActions);
        expect(store.getActions()[0].payload).to.be.eql(['1802_project_First', '1802_project_Two']);
      });
    });
  });


});
