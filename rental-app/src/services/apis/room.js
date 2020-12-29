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

    getTrendingRooms: () =>
        axios({
            method: 'get',
            url: `${server_endpoint}/accommodation/top10-view`,
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

    getRating: (data) =>
        axios({
            method: 'post',
            data: {
                star: data.star,
                accommodation_id: data.accommodation_id,
                _page: 1,
                _limit: 10000,
            },
            url: `${server_endpoint}/accommodation/rating/get`,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            return res.data;
        }),

    createRating: (data) =>
        axios({
            method: 'post',
            data: {
                star: data.star || 0,
                accommodation_id: data.accommodation_id,
                comment: data.comment,
            },
            url: `${server_endpoint}/accommodation/rating/create`,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            return res.data;
        }),
};
