import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ResultPage from '../components/ResultPage';
import queryString from 'query-string';

const Result = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    
    useEffect(() => {
        console.log(location);
        setSearchQuery(queryString.parse(location.search).q);
        setIsLoading(false);
    }, [location]);

    if (isLoading) return <Spin></Spin>;

    return <ResultPage searchQuery={searchQuery} />;
};

export default Result;
