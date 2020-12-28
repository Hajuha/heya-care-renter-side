import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ResultPage from '../components/ResultPage';
const search = window.location.search;
const query = new URLSearchParams(search);
const Result = () => {

    const [searchQuery, setSearchQuery] = useState('')
    const location = useLocation();
    console.log(location);
    useEffect(() => {
        setSearchQuery(query.get('q'))
        console.log('aaaaaaaaa');
    },[location])

    return <ResultPage searchQuery={searchQuery} />;
};

export default Result;
