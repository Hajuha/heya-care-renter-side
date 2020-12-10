export default function user(state = [0], action) {
    switch (action.type) {
        case 'LOGGED_IN':
            return state;
        default:
            return state;
    }
}
