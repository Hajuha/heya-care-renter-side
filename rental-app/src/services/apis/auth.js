/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
const server_endpoint = process.env.REACT_APP_BACKEND_URL;

export default {
    register: (data) =>
        axios({
            method: 'post',
            url: `${server_endpoint}/register/`,
            data: {
                email: data.email,
                fullname: data.fullName,
                password: data.password,
                address: data.address || '',
                gender: data.gender || 0,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            return res.data;
        }),

    login: (data) =>
        axios({
            method: 'post',
            url: `${server_endpoint}/users/login`,
            data: {
                username: data.username,
                password: data.password,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            return res.data;
        }),
    getUser: (data) =>
        axios({
            method: 'get',
            url: `${server_endpoint}/users/get_status`,
            data: data,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            return res.data;
        }),
};
