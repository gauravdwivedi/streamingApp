import streams from '../apis/streams';
import {
     CREATE_STREAM,
     SIGN_IN,
     SIGN_OUT,
     FETCH_STREAM,
     FETCH_STREAMS,
     DELETE_STREAM,
     EDIT_STREAM,  } from './types';

export const signIn =(userId)=>{
    return{
        type:SIGN_IN,
        payload:userId

    }
}


export const signOut=()=>{
    return{ 
        type:SIGN_OUT
    }
}

export const createStream=(formValues)=>{
    //anytime we are creating a asyncronous action creator we use redux thunk

    return async (disptach)=>{
           const response = await streams.post('/streams', formValues);

           disptach({type:CREATE_STREAM,payload:response.data});
    }
}



export const fetchStreams =()=>async dispatch=>{
            const response = await streams.get('./streams');

            dispatch({ type:FETCH_STREAMS, payload:response.data});
}

export const fetchStream =(id)=> async dispatch=>{
        const response = await streams.get(`/streams/${id}`);

        dispatch({ type:FETCH_STREAM, payload:response.data})
}


export const editStream =(id,formValues)=> async dispatch =>{
    const response = streams.put(`/streams/${id}`,formValues);

    dispatch({type:EDIT_STREAM,payload:response.data});
}

export const deleteStream =(id)=>async dispatch=>{
    await streams.delete(`/streams/${id}`);

    dispatch({type:DELETE_STREAM,payload:id})
}