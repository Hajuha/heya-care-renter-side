/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
const server_endpoint = process.env.REACT_APP_BACKEND_URL;

export default {

    create: (data) =>
        axios({
            method: 'post',
            url: `${server_endpoint}/api/v1/domain/`,
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((res) => {
            return res.data;
        }),

    update: (data) =>
        axios({
            method: 'put',
            url: `${server_endpoint}/api/content/${data.id}`,
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
};
