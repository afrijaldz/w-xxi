import React from 'react'
import './HeroImage.css'

const HeroImage = props => (
  <div
    className="wln-heroimage"
    style={{
      background: `
        linear-gradient(to bottom, rgba(0, 0, 0, 0) 39%, rgba(0, 0, 0, 0.2) 41%, rgba(0, 0, 0, 0.9) 100%), url('${props.image}'), #1c1c1c
      `
    }}
  >
    <div className="wln-heroimage-content">
      <div className="wln-heroimage-text">
        <h1>{props.title}</h1>
        <p>{props.text}</p>
      </div>
    </div>
  </div>
)

export default HeroImage