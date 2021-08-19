import { combineReducers } from 'redux';

import googleAuthReducer from './googleAuthReducer';
import streamReducer from './streamReducer';

export default combineReducers({
  loginStatus: googleAuthReducer,
  streams: streamReducer,
});
