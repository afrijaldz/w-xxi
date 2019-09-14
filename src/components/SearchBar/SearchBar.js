import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './SearchBar.css'

class SearchBar extends React.Component {
  state = {
    value: '',
  }

  timeout = null

  doSearch = event => {
    this.setState({ value: event.target.value })
    clearTimeout(this.timeout)

    this.timeout = setTimeout(() => {
      this.props.callback(this.state.value)
    }, 500)
  }

  render() {
    return (
      <div className="wln-searchbar">
        <div className="wln-searchbar-content">
          <FontAwesomeIcon className="wln-fa-search" size="2x" icon={faSearch} />
          <input
            type="text"
            className="wln-searchbar-input"
            placeholder="Search"
            onChange={this.doSearch}
            value={this.state.value}
          />
        </div>
      </div>
    )
  }
}

export default SearchBar