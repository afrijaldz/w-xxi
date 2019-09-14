import React from 'react'

import { API_URL, API_KEY, APP_NAME } from '../../config'

import Navigation from '../../components/Navigation/Navigation'
import FourColGrid from '../../components/FourColGrid/FourColGrid'
import MovieInfo from '../../components/MovieInfo/MovieInfo'
import Actor from '../../components/Actor/Actor'

class Movie extends React.Component {
  state = {
    movie: null,
    loading: false,
    directors: [],
    actors: null,
  }

  componentDidMount() {
    if (localStorage.getItem(`${APP_NAME}-${this.props.match.params.movieId}`)) {
      const state = JSON.parse(localStorage.getItem(`${APP_NAME}-${this.props.match.params.movieId}`))
      this.setState({ ...state })
    } else {
      this.setState({ loading: true })
      const endpoint = `${API_URL}/movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`
      this.fetchMovieData(endpoint)
    }
  }

  fetchMovieData = endpoint => (
    fetch(endpoint)
      .then(result => result.json())
      .then(movie => {
        if (!movie.status_code) {
          this.setState({ movie }, () => {
            const creditEndpoint = `${API_URL}/movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}&language=en-US`
            fetch(creditEndpoint)
              .then(result => result.json())
              .then(credit => {
                const directors = credit.crew.filter(member => member.job === 'Director')
                this.setState({
                  actors: credit.cast,
                  loading: false,
                  directors,
                }, () => {
                  localStorage.setItem(`${APP_NAME}-${this.props.match.params.movieId}`, JSON.stringify(this.state))
                })
              })
              .catch(error => {
                console.error('Error: ', error)
              })
          })
        } else {
          this.setState({ loading: false })
        }
      })
  )

  render() {
    return (
      <div>
        {this.state.movie ? (
          <div>
            <Navigation movie={this.state.movie.original_title} />
            <MovieInfo
              movie={this.state.movie}
              directors={this.state.directors}
            />
          </div>
        ) : null}

        {this.state.actors ? (
          <div className="wln-moviegrid">
            <FourColGrid header={'Actors'}>
              {this.state.actors.map((actor, i) => (
                <Actor actor={actor} key={i} />
              ))}
            </FourColGrid>
          </div>
        ) : null}
      </div>
    )
  }

}

export default Movie