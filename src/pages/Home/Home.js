import React from 'react'

import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
} from '../../config'

import HeroImage from '../../components/HeroImage/HeroImage'
import './Home.css'

class Home extends React.Component {
  state = {
    heroImage: null,
    loading: false,
    movies: [],
  }

  componentDidMount() {
    this.setState({ loading: true })
    const endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    this.fetchItems(endpoint)
  }

  fetchItems = endpoint => {
    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        this.setState({
          movies: [ ...this.state.movies, ...result.results  ],
          heroImage: this.state.heroImage || result.results[Math.floor(Math.random() * result.results.length)],
        })
      })
  }

  render() {
    return (
      <div className="wln-home">
        {this.state.heroImage ? (
          <div>
            <HeroImage
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
              title={this.state.heroImage.original_title}
              text={this.state.heroImage.overview}
            />
          </div>
        ) : null}
      </div>
    )
  }
}

export default Home