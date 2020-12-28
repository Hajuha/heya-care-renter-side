import * as React from 'react';
import { useLocation } from 'react-router-dom';
import ResultPage from '../components/ResultPage';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const Result = () => {
    console.log('222222222');
    let { searchQuery } = useQuery().get('q');
    console.log('aaa', searchQuery);
    return <ResultPage searchQuery={searchQuery} />;
};

export default Result;
