import HeyaCareClient from './request';

const baseUrl = 'auth/';

const login = (username, password) => {
    HeyaCareClient.post(baseUrl, JSON.stringify({ username, password }));
};

export {
    login,
};
