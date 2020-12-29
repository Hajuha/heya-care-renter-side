/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default (token = null) => {
    if (token) {
        axios.defaults.headers.common.['x-access-token'] = `${token}`;
    } else {
        delete axios.defaults.headers.common.authorization;
    }
};
