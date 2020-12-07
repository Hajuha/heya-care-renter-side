import * as React from 'react';
import { Typography } from 'antd';
import { useParams } from 'react-router-dom';

const Result = () => {

    let { id } = useParams()
    return (
        <React.Fragment>
            <Typography.Title> {id} </Typography.Title>
        </React.Fragment>
    );
};

export default Result;
