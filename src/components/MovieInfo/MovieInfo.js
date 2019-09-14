import React from 'react'
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../../config'
import MovieThumb from '../MovieThumb/MovieThumb'
import './MovieInfo.css'

const MovieInfo = props => (
  <div
    className="wln-movieinfo"
    style={{
      background: props.movie.backdrop_path ? `url('${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${props.movie.backdrop_path}')`
      : '#000'
    }}
  >
    <div className="wln-movieinfo-content">
      <div className="wln-movieinfo-thumb">
        <MovieThumb
          image={props.movie.poster_path ? `${IMAGE_BASE_URL}/${POSTER_SIZE}/${props.movie.poster_path}` : './images/no_image.jpg'}
          clickable={false}
        />
        <div className="wln-movieinfo-text">
          <h1>{props.movie.title}</h1>
          <h3>PLOT</h3>
          <p>{props.movie.overview}</p>
          <h3>IMDB Rating</h3>
          <div className="wln-rating">
            <meter
              min="0"
              max="100"
              optimum="100"
              low="40"
              high="70"
              value={props.movie.vote_average * 10}
            />
            <p className="wln-score">{props.movie.vote_average}</p>
          </div>
          {props.directors.length > 1 ? (
            <h3>Directors</h3>
          ) : (
            <h3>Director</h3>
          )}{" "}
          {props.directors.map((element, i) => (
            <p key={i} className="wln-director">{element.name}</p>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default MovieInfo