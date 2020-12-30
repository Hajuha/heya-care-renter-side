import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types';

const user = (state = {}, action = {}) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            console.log(`1`);
            console.log(action);
            console.log(action.user);
            return action.user;
        case USER_LOGGED_OUT:
            console.log('out');
            return {};
        default:
        
            console.log('default');
            return state;
    }
};

export default user;
