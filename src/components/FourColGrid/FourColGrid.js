import React from 'react'
import './FourColGrid.css'

function FourColGrid(props) {
  const renderElements = () => {
    const gridElements = props.children.map((element, i) => (
      <div key={i} className="wln-grid-element">
        {element}
      </div>
    ))

    return gridElements
  }

  return (
    <div className="wln-grid">
      {props.header && !props.loading ? <h1>{props.header}</h1> : null}
      <div className="wln-grid-content">
        {renderElements()}
      </div>
    </div>
  )
}

export default FourColGrid