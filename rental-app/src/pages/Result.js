import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ResultPage from '../components/ResultPage';
const search = window.location.search;
const query = new URLSearchParams(search);
const Result = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    useEffect(() => {
        setSearchQuery(query.get('q'));
        setIsLoading(false);
    }, [location]);

    if (isLoading) return <Spin></Spin>;

    return <ResultPage searchQuery={searchQuery} />;
};

export default Result;
