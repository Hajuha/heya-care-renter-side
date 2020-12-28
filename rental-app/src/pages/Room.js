import * as React from 'react';
import { useParams } from 'react-router-dom';
import RoomPage from '../components/RoomPage';

const Room = (props) => {
    let { id } = useParams();
    return <RoomPage id={id} />;
};

export default Room;
