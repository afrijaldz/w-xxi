import React from 'react'

import { API_URL, API_KEY } from '../../config'

import Navigation from '../../components/Navigation/Navigation'

class Movie extends React.Component {
  state = {
    movie: null,
    loading: false,
  }

  componentDidMount() {
    if (localStorage.getItem(this.props.match.params.movieId)) {
      const state = JSON.parse(localStorage.getItem(this.props.match.params.movieId))
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
                  localStorage.setItem(this.props.match.params.movieId, JSON.stringify(this.state))
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
            <Navigation movie={this.props.location.movieName} />
          </div>
        ) : null}
      </div>
    )
  }

}

export default Movie