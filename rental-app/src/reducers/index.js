import { combineReducers } from 'redux';
import user from './user';
import comments from './comment';
const reducers = combineReducers({
    comments,
    user,
});

export default reducers;
