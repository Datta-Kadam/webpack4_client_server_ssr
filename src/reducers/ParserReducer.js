import { XML_VALID } from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case XML_VALID:
            return { ...state, valid: action.payload };    
        default:
            return state;
    }
}
