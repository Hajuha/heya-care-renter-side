import Room from '../../pages/Room';

const RoomPage = (props) => {
    const { id } = props;
    return <div style={{ marginTop: '100px' }}>Room id: {id}</div>;
};

export default RoomPage;
