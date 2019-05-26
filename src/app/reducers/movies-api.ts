import * as MoviesApi from '../actions/movies-api';

export function reducer(state = [], action: MoviesApi.Actions): {} {
  switch (action.type) {

    case MoviesApi.RECIEVE_MOVIES:
      return action.payload;

    case MoviesApi.ADD_MOVIE_SUCCESS:
      return [...state, action.payload];

    case MoviesApi.EDIT_MOVIE_SUCCESS:
      const index = state.findIndex((movie) => movie.imdbID === action.payload.imdbID);
      return [
        ...state.slice(0, index),
        action.payload,
        ...state.slice(index + 1)
      ];

    case MoviesApi.DELETE_MOVIE_SUCCESS:
      return state.filter(movie => {
        return movie.imdbID !== action.payload.imdbID;
      });

    default:
      return state;

  }
}
