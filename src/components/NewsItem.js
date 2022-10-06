import React, { Component } from 'react'

export class NewsItem extends Component {
 
  render() {
    let {title, description,imageUrl,newsUrl,author,date,source} = this.props
    return (
      <div>
        <div className="card" >
  <img alt="not finding " src={imageUrl?imageUrl:"https://images.indianexpress.com/2022/09/Rupee.jpg"}/> 
  <div className="card-body">
    <h5 className="card-title">{title} <span  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left:"50%",zIndex:1}}> {source} </span> </h5>
    <p className="card-text">{description?description:"Well its a miscellaneous news try to read further in this by clicking read more available here  its a news containing unknown description"}</p>
      <p className="card-text"><small className='text-muted' > By {author?author:"Unknown"} on {new Date(date).toGMTString() } </small></p>
    <a href={newsUrl}  rel="noreferrer" target ="_blank"className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
       
      </div>
      
    )
  }
}

export default NewsItem