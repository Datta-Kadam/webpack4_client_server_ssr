import { GET_RELEASE, GET_PROJECT, 
        GET_API, DEFAULT_REQRES
     } from '../../src/actions/types';

const INITIAL_STATE = {
    release: [],
    count: 0
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_RELEASE:
           // console.log({...state,release:action.payload});
            return { ...state, release: action.payload };
        case GET_PROJECT:
            //console.log({...state,project:action.payload});
            debugger;
            return { ...state, project: action.payload };
        case GET_API:
           // console.log({...state,api:action.payload});
            return { ...state, api: action.payload };
        case DEFAULT_REQRES:
            //console.log(action.payload.request);
            debugger;
        return { ...state, 
                defaultReq: action.payload.request, 
                defaultRes: action.payload.response, 
                count: state.count + 1 
            };
                debugger;
        default:
        return state;  
    }
}
