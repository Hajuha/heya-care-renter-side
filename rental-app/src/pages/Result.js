import * as React from 'react';
import { useLocation } from 'react-router-dom';
import ResultPage from '../components/ResultPage';
const search = window.location.search;
const query = new URLSearchParams(search);
const Result = () => {
    let searchQuery = query.get('q');
    console.log(searchQuery);
    return <ResultPage searchQuery={searchQuery} />;
};

export default Result;
