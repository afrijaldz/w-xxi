import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => (
  <div className="wln-header">
    <div className="wln-header-content">
      <Link to="/">
        <h1>W-XXI</h1>
      </Link>
    </div>
  </div>
)

export default Header