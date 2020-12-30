import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import roomAPI from '../../services/apis/room';
import './style.scss';
import {
    Button,
    Card,
    Divider,
    Input,
    notification,
    Rate,
    Spin,
    Typography,
} from 'antd';
import { Comment } from 'antd';
import moment from 'moment';
import { AlertFilled, HeartFilled } from '@ant-design/icons';
const desc = [
    'Phòng tệ.',
    'Phòng xấu.',
    'Phòng ở được.',
    'Phòng tốt',
    'Phòng tuyệt vời !',
];

const RoomComment = (props) => {
    const { id, room } = props;
    const [roomRating, setRoomRating] = useState({
        average_rating: 5,
        ratings: [],
    });
    const [isRating, setIsRating] = useState(false);
    const [rated, setRated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [star, setStar] = useState(0);
    const [comment, setComment] = useState('');
    const user = useSelector((state) => state.user);
    useEffect(() => {
        const data = {
            accommodation_id: id,
        };
        console.log(data);
        roomAPI.getRating(data).then((res) => {
            setRoomRating(res.data);
            setIsLoading(false);
        });
    }, []);

    const sendRating = () => {
        const data = {
            star: star,
            accommodation_id: id,
            comment: comment,
        };
        roomAPI.createRating(data).then((res) => {
            setIsRating(false);
            setRated(true);
        });
    };
    const openNotification = (message) => {
        const args = {
            message: message,

            duration: 3,
        };
        notification.open(args);
    };

    const addFavorite = () => {
        let message = 'Vui lòng đăng nhập để thực hiện chức năng này';
        if (user.access_token) {
            message = 'Phòng đã được lưu vào danh sách ưa thích';
            const data = {
                accommodation_id: id,
            };
            openNotification(message);
            roomAPI.addFavorite(data).then((res) => {});
        } else openNotification(message);
    };

    const createRating = () => {
        if (user.access_token) setIsRating(!isRating);
    };

    if (isLoading) return <Spin></Spin>;

    return (
        <React.Fragment>
            <div className='comment-title'>
                <div className='title'>
                    Khách hàng đánh giá &nbsp;<b>{room.title}</b>
                </div>
                <div>
                    <Rate
                        style={{ margin: '12px 12px' }}
                        disabled
                        defaultValue={roomRating.average_rating}></Rate>
                    ({roomRating.ratings.length} đánh giá)
                    <Button
                        style={{ margin: '12px 12px' }}
                        onClick={() => createRating()}>
                        {' '}
                        Thêm đánh giá của bạn{' '}
                    </Button>
                    <Button
                        shape='round'
                        style={{ margin: '12px 12px', float: 'right' }}>
                        <AlertFilled />
                        Báo cáo bài đăng
                    </Button>
                    <Button
                        onClick={addFavorite}
                        shape='round'
                        style={{ margin: '12px 12px', float: 'right' }}>
                        <HeartFilled style={{ color: 'red' }} />
                        Lưu tin
                    </Button>
                </div>
            </div>
            {!user.access_token && (
                <Typography.Text type='danger'>
                    Bạn chưa đăng nhập nên không thể đăng bình luận !
                </Typography.Text>
            )}
            {isRating ? (
                <Card className='create-rating'>
                    {!rated ? (
                        <div>
                            <div className='rating'>
                                Chọn mức đánh giá&nbsp;&nbsp;
                                <Rate
                                    onChange={(value) => setStar(value)}
                                    value={star}
                                />
                                {star ? (
                                    <span className='ant-rate-text'>
                                        {desc[star - 1]}
                                    </span>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className='create-comment'>
                                <span>Bình luận</span>
                                <Input.TextArea
                                    onChange={(e) => setComment(e.target.value)}
                                    value={comment}
                                    rows={4}
                                    showCount
                                    maxLength={100}
                                    placeholder={
                                        'Nhập đánh giá về sản phẩm (tối đa 100 kí tự)'
                                    }></Input.TextArea>
                            </div>
                            <Button type='primary' onClick={sendRating}>
                                Gửi đánh giá
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Typography.Text type='success'>
                                Đánh giá của bạn đã được gửi, sẽ được xác minh
                                và gửi trong thời gian sớm nhất !
                            </Typography.Text>
                        </>
                    )}
                </Card>
            ) : (
                <></>
            )}
            <Divider />
            {roomRating.ratings.map((rating) => {
                return (
                    <div>
                        <Comment
                            author={rating.user_name}
                            content={
                                <div>
                                    <Rate disabled defaultValue={rating.star} />
                                    <p>{rating.comment}</p>
                                </div>
                            }
                            datetime={
                                <span>
                                    {moment(rating.created_at)
                                        .utc()
                                        .local()
                                        .fromNow()}
                                </span>
                            }
                        />
                        {/* <div>{rating.user_name}</div>
                        <Rate disabled defaultValue={rating.star}></Rate> */}
                    </div>
                );
            })}
        </React.Fragment>
    );
};

export default RoomComment;
