import _ from 'lodash';
import {
  DELETE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  UPDATE_STREAM,
} from '../actions/types';

const streamReducer = (state = {}, action) => {
  console.log(action);
  switch (action.type) {
    case FETCH_STREAMS: {
      // let data = {};
      // action.payload.forEach((stream) => {
      //   data = { ...data, [stream.id]: stream };
      // });
      // return { ...state, ...data };
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    }
    case UPDATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default streamReducer;
