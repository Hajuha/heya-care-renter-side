import * as React from 'react';
import { useParams } from 'react-router-dom';
import RoomPage from '../components/RoomPage';

const Room = () => {
    let { id } = useParams();
    return <RoomPage id={id} />;
};

export default Room;
