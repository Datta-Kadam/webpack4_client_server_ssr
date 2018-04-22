import axios from 'axios';
import { GET_RELEASE, GET_PROJECT,
         GET_API, DEFAULT_REQRES, XML_VALID
     } from '../actions/types';

//const ROOT_URL = 'http://localhost:3001';

export function getReleaseData() {
    return function (dispatch) {
        //GET THE RELEASE DATA FROM BACKEND AS INITIAL STATE
        return axios.get('/api/client/release')
        .then(response => {
           // console.log(response.data.release);
            dispatch({ type: GET_RELEASE, payload: response.data.release });
           // return response;
        });
    };
}

export function getProjectData(rel) {
    return function (dispatch) {
        //GET THE RELEASE DATA FROM BACKEND AS INITIAL STATE
        return axios.get(`/api/client/project/${rel}`)
        .then(response => {
            //console.log(response.data.release);
            dispatch({ type: GET_PROJECT, payload: response.data.project });
        });
    };
}

export function getApiData(proj) {
    return function (dispatch) {
        //GET THE RELEASE DATA FROM BACKEND AS INITIAL STATE
        return axios.get(`/api/client/api/${proj}`)
        .then(response => {
            //console.log(response.data.release);
            dispatch({ type: GET_API, payload: response.data.api });
        });
    };
}


export function getDefaultPair(release, projectName, apiName) {
    return function (dispatch) {
        //GET THE RELEASE DATA FROM BACKEND AS INITIAL STATE
        //console.log("release,projectName,apiName",release,projectName,apiName);
        return axios.get(`/api/client/reqrespair/${release}/${projectName}/${apiName}`)
        .then(response => {
           // console.log(response.data.request);
           debugger;
            dispatch({ type: DEFAULT_REQRES, payload: response.data });
        });
    };
}

export function simulateSubmit(formData) {    
    return function () {
        //GET THE RELEASE DATA FROM BACKEND AS INITIAL STATE
        return axios.post('/client/simulate', { credentials: 'same-origin' }, formData)
        .then(response => {
            console.log(response);
        });
    };
}

export function XmlParserAction(valid) {
    return function dispatch() {
        dispatch({ type: XML_VALID, payload: valid });
    };
 }
// /*Request/response actions to update the store with one instance of code mirror */

// export function codeMirredPresent(present){

//     return function(dispatch){
//         dispatch({type:CODE_MIRROR_PRESENT,payload:true});
//     }
// }
