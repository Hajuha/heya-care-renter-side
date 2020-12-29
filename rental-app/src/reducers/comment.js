import { FETCH_COMMENTS, NEW_COMMENT } from '../types';
const initialState = {
    comments: [
        'This is just a mock data for comments.',
        'Just to show content placeholder twice.',
    ],
    ready: false,
    comment: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_COMMENTS:
            return {
                ...state,
                comments: action.payload,
                ready: true,
            };
        case NEW_COMMENT:
            return {
                ...state,
                comment: action.payload,
            };
        default:
            return state;
    }
}
