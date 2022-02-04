import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';


export default function NewsInfiniteScroll(props) {

    const capitalize = (string) => {
        let low = string.toLowerCase();
        return low.charAt(0).toUpperCase() + low.slice(1);
    }

    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(0);

    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parseData = await data.json();
        props.setProgress(70);
        setArticles(parseData.articles);
        setLoading(false);
        setTotalResults(parseData.totalResults);
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `News Application - ${capitalize(props.category)}`
        updateNews(); 
        //eslint-disable-next-line
    }, []);

    const fatchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setLoading(true);
        setPage(page + 1);
        let data = await fetch(url);
        let parseData = await data.json();
        setArticles(articles.concat(parseData.articles));
        setLoading(false);
        setTotalResults(parseData.totalResults);
    }
    return (
        <>
            <InfiniteScroll
                dataLength={articles.length}
                next={fatchMoreData}
                hasMore={articles.length !== totalResults}
                loader={loading && <Spinner />}
            >
                <div className='container'>
                    <h2 style={{marginTop:'80px'}}>{`${capitalize(props.category)} - Top Head Lines`}</h2>
                    {loading && <Spinner />}
                    {<div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4 mt-5" key={element.url}>
                                <NewsItem title={element.title/*.slice(0, 65)*/} description={element.description/*.slice(0, 135)*/} imgUrl={element.urlToImage} newsUrl={element.url} time={element.publishedAt} author={element.author} source={element.source.name} />
                            </div>
                        })}
                    </div>}
                </div>
            </InfiniteScroll>

        </>
    )
}

NewsInfiniteScroll.defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general'
}

NewsInfiniteScroll.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}