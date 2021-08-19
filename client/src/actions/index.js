import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
  UPDATE_STREAM,
} from './types';
import { streams } from '../apis/streams';
import history from '../history';

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
    payload: null,
  };
};

export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().loginStatus;
  const response = await streams.post('/streams', {
    ...formValues,
    userId: userId,
  });
  dispatch({
    type: CREATE_STREAM,
    payload: response.data,
  });

  // programmatic navigation to redirect user back to list
  history.push('/');
};

export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get('/streams');

  //console.log(data);
  dispatch({
    type: FETCH_STREAMS,
    payload: response.data,
  });
};

export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);
  console.log(response);
  dispatch({
    type: FETCH_STREAM,
    payload: response.data,
  });

  //history.push(`streams/edit/${id}`);
};

export const updateStream = (id, formValues) => async (dispatch, getState) => {
  const response = await streams.patch(`/streams/${id}`, formValues);
  dispatch({
    type: UPDATE_STREAM,
    payload: response.data,
  });

  history.push('/');
};

export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams/${id}`);
  dispatch({
    type: DELETE_STREAM,
    payload: id,
  });

  history.push('/');
};
