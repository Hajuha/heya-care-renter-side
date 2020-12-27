import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types';
import authAPI from '../services/apis/auth';
import setAuthorizationHeader from '../utils/setAuthorizationHeader';

export const userLoggedIn = (user) => ({
    type: USER_LOGGED_IN,
    user,
});

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT,
});

export const login = (credentials) =>
    authAPI.login(credentials).then((user) => {
        console.log('sssss');
        localStorage.token = user.token;
        setAuthorizationHeader(user.token);
    });

// export const logout = () => dispatch => {
//   localStorage.removeItem("token");
//   setAuthorizationHeader();
//   dispatch(userLoggedOut());
// };

// export const reset_password = email => () => {
//   api.user.reset_password(email);
// };

// export const refreshToken = token => dispatch =>
//   api.user.refreshToken(token).then(user => {
//     localStorage.token = user.token;
//     setAuthorizationHeader(user.token);
//     dispatch(userLoggedIn(user));
//   });
