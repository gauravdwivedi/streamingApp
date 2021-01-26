import streams from '../apis/streams';
import history from '../history';
import {
  CREATE_STREAM,
  SIGN_IN,
  SIGN_OUT,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
  EDIT_STREAM,
} from './types';

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = (formValues) => {
  //anytime we are creating a asyncronous action creator we use redux thunk

  return async (disptach, getState) => {
    const { userId } = getState().auth;
    const response = await streams.post('/streams', { ...formValues, userId });

    disptach({ type: CREATE_STREAM, payload: response.data });
    //we pushs the route where we have to go, like in case
    //we want to go to our HomePage of streamlists after creating a stream
    history.push('/');
  };
};

export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get('./streams');

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async (dispatch) => {
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push('/');
};

export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
};
