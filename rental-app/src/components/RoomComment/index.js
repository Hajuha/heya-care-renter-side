import React, { useEffect, useState } from 'react';
import roomAPI from '../../services/apis/room';
import './style.scss';
import { Button, Card, Divider, Input, Rate, Spin, Typography } from 'antd';
import { Comment } from 'antd';
import moment from 'moment';
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
        console.log(data);
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
                        disabled
                        defaultValue={roomRating.average_rating}></Rate>
                    ({roomRating.ratings.length} đánh giá)
                    <Button
                        style={{ marginLeft: '12px' }}
                        onClick={() => setIsRating(!isRating)}>
                        {' '}
                        Thêm đánh giá của bạn{' '}
                    </Button>
                </div>
            </div>
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
