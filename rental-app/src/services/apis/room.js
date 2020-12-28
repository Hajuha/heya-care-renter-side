/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
const server_endpoint = process.env.REACT_APP_BACKEND_URL;

export default {
    get: (id) =>
        axios({
            method: 'get',
            url: `${server_endpoint}/accommodation/${id}`,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            return res.data;
        }),

    getAll: () =>
        axios({
            method: 'post',
            data: {},
            url: `${server_endpoint}/accommodation/search`,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            return res.data;
        }),

    search: (data) =>
        axios({
            method: 'post',
            data: data,
            url: `${server_endpoint}/accommodation/search`,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            return res.data;
        }),
};
