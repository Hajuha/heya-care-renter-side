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
            url: `${server_endpoint}/register/`,
            data: data,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            return res.data;
        }),

    delete: (id) =>
        axios({
            method: 'delete',
            url: `${server_endpoint}/api/v1/domain/${id}`,
        }).then((res) => {
            return res.data;
        }),

    get: (data) =>
        axios({
            method: 'get',
            url: `${server_endpoint}/apis/accommodation/search`,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            return res.data;
        }),
};
