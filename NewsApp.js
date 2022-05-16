import React, { Component } from 'react';
import NewsItem from "./NewsItem";
 import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class NewsApp extends Component {

    static defaultProps = {
        country: 'us',
        pageSize: 8,
        category: 'technology',
    }

    static _PropTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }


    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            Loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.props.category} - My News`;
    }

    async update() {
        this.props.setProgress(10)
        const url = `https:newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7af2434e5fb74b6e8ab2179e4e7a3e22&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ Loading: true });
        let data = await fetch(url)
        this.props.setProgress(50)
        let parsedData = await data.json()
        this.props.setProgress(70)
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            Loading: false
        })
        this.props.setProgress(100)
    }


    async componentDidMount() {
        this.update();
    }
   
    fetchMoreData = async() => {
        this.setState({page: this.state.page + 1})
        const url = `https:newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7af2434e5fb74b6e8ab2179e4e7a3e22&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ Loading: false });
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            Loading: false
        })
      };




    render() {
        return (
            <>
                <div className="my-3">
                    <h2 className='text-2xl text-zinc-800 font-semibold text-center ' >Hot News - {this.props.category}</h2>
                    {this.state.Loading && <Spinner />}
                    <InfiniteScroll 
                    dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length !== this.state.totalResults} 
                    loader={<Spinner/>} >
                        <div className="grid grid-cols-4 gap-4 px-8">
                            {this.state.articles.map((element) => {
                                return <div key={element.url}>
                                    {/* if image is not exist then use !imgurl?"https":imgUrl */}
                                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} />
                                </div>
                            })}
                        </div>
                    </InfiniteScroll>
                        
                </div>
            </>
        );
    }
}

