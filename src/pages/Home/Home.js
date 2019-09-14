import React from 'react'

import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
} from '../../config'

import HeroImage from '../../components/HeroImage/HeroImage'
import SearchBar from '../../components/SearchBar/SearchBar'
import FourColGrid from '../../components/FourColGrid/FourColGrid'
import MovieThumb from '../../components/MovieThumb/MovieThumb'
import Spinner from '../../components/Spinner/Spinner'
import LoadMore from '../../components/LoadMore/LoadMore'
import './Home.css'

class Home extends React.Component {
  state = {
    heroImage: null,
    loading: true,
    movies: [],
    currentPage: 0,
    totalPages: 0,
    searchTerm: '',
  }

  componentDidMount() {
    this.setState({ loading: true })
    const endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    this.fetchItems(endpoint)
  }

  searchItems = searchTerm => {
    let endpoint = ''
    this.setState({
      movies: [],
      loading: true,
      searchTerm,
    })

    if (searchTerm === '') {
      endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    } else {
      endpoint = `${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`
    }

    this.fetchItems(endpoint)
  }

  loadMoreItems = () => {
    let endpoint = ''
    this.setState({ loading: true })
    if (this.state.searchTerm === '') {
      endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1}`
    } else {
      endpoint = `${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${this.state.currentPage + 1}`
    }
    this.fetchItems(endpoint)
  }

  fetchItems = endpoint => {
    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        this.setState({
          movies: [ ...this.state.movies, ...result.results  ],
          heroImage: this.state.heroImage || result.results[Math.floor(Math.random() * result.results.length)],
          loading: false,
          currentPage: result.page,
          totalPages: result.total_pages,
        })
      })
  }

  render() {
    console.log(...this.state.movies)
    return (
      <div className="wln-home">
        {this.state.heroImage ? (
          <div>
            <HeroImage
              image={`${IMAGE_BASE_URL}/${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
              title={this.state.heroImage.original_title}
              text={this.state.heroImage.overview}
            />
            <SearchBar callback={this.searchItems} />
          </div>
        ) : null}
        <div className="wln-home-grid">
          <FourColGrid
            header={this.state.searchTerm ? "Search result" : "Popular movies"}
            loading={this.state.loading}
          >
            {this.state.movies.map((element, i) => (
              <MovieThumb
                key={i}
                clickable={true}
                image={
                  element.poster_path
                  ? `${IMAGE_BASE_URL}/${POSTER_SIZE}${element.poster_path}`
                  : './images/no_image.jpg'
                }
                movieId={element.id}
                movieName={element.original_title}
              />
            ))}
          </FourColGrid>
          {this.state.loading ? <Spinner /> : null }
          {this.state.currentPage <= this.state.totalPages && !this.state.loading ? (
            <LoadMore text="Load more" onClick={this.loadMoreItems} />
          ) : null}
        </div>
      </div>
    )
  }
}

export default Home