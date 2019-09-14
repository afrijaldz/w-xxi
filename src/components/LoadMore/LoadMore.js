import React from 'react'
import './LoadMore.css'

const LoadMore = props => (
  <div className="wln-loadmorebtn" onClick={props.onClick}>
    <p>{props.text}</p>
  </div>
)

export default LoadMore