import _ from 'lodash';

import {
    FETCH_STREAM,
    FETCH_STREAMS,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/types';


export default (state={},action)=>{
    switch(action.type){

        //fetching all records
        case FETCH_STREAMS:
            return {...state, ..._.mapKeys(action.payload,'id')}
        //for single record 
        case FETCH_STREAM:
            return {...state,[action.payload.id]:action.payload}
        
        case CREATE_STREAM:
            return {...state,[action.payload.id]:action.payload}

        case EDIT_STREAM:
            return {...state,[action.payload.id]:action.payload}

        //deleting
        case DELETE_STREAM:
            return _.omit(state,action.payload);
        
        default:
            return state;
    }
}