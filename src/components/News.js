import React, { Component } from 'react'
import NewsItem from './NewsItem';
import  Spinner  from './spinner';
import PropTypes from 'prop-types';


export default class News extends Component {

  static defaultProps ={
      country:'in',
      pageSize: 8,
      category: 'general',
}

static propTypes ={
  country: PropTypes.string ,
  pageSize:PropTypes.number,
  category:PropTypes.string,
}


        constructor() {
    super();
    console.log("this is a constructor")
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }
async updateNews()
{


  this.setState({loading: true})    
    console.log("this cdm");
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5381166695784a70b752143c927c3ff0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
  
    let parsedData = await data.json()
  
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false 
    })
  

}

  async componentDidMount() {
this.updateNews();
  }
    handlePrevClick = async () => {
    console.log("previous")
     this.setState({page: this.state.page-1})
     this.updateNews();
  }
  handleNextClick = async () => {
    console.log("Next");
    this.setState({page: this.state.page+1})
    this.updateNews();
  
  }



  render() {
    return (

      <div className="container my-3">
        
        <h2 className="text-center">AK news top headlines </h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title} description={element.description ? element.description: ""} source={element.source.name} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
            </div>
          })}
           </div>

          <div class="d-flex justify-content-between">

          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} >&larr; Previous  </button>
          <button disabled={this.state.page+1> Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
