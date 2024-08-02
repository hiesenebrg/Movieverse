const apikey = "77cd1d545bbe0819f5aaab6a8f828d05";
export const baseImagePath = (size, path) => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
export const nowPlayingMovies = (page) => {
  return `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&page=${page}`;
};
export const upcomingMovies = (page) => {
  return `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}&page=${page}`;
};
export const popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`;
export const searchMovies = (keyword) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${keyword}`;
};
export const movieDetails = (id) => {
  return `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`;
};
export const movieCastDetails = (id) => {
  return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`;
};
