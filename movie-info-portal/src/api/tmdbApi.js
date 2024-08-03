import axios from "axios";

export const processRequest = async (page) => {
  // let res = await axios.get(`https://imdb8.p.rapidapi.com/titles?genre=Action&startYear=2024&titleType=movie&sort=year.incr&limit=20&page=${page}`, {
  let res = await axios.get(
    `https://imdb8.p.rapidapi.com/title/get-most-popular-movies?homeCountry=US&purchaseCountry=US&currentCountry=US&page=${page}`,
    {
      headers: {
        "x-rapidapi-key": "d54328eb1amsh00ad5f27d3b7418p11103djsnd4e3d86241c0",
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
      },
    }
  );
  console.log("ressss", res);
  return res.data;
};
export const currentMovie = async (imbdID) => {
  let res = await axios.get(
    `https://moviesdatabase.p.rapidapi.com/titles/${imbdID}`,
    {
      headers: {
        "x-rapidapi-key": "d54328eb1amsh00ad5f27d3b7418p11103djsnd4e3d86241c0",
        "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
      },
    }
  );
  console.log("ressss", res);
  return res.data;
};

const apikey = "77cd1d545bbe0819f5aaab6a8f828d05";
const omdbAPIkey = "723032e5";
export const baseImagePath = (size, path) => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
export const nowPlayingMovies = (imdbId) => {
  return `https://www.omdbapi.com?apikey=${omdbAPIkey}&i=${imdbId}&plot=full`;
};
export const upcomingMovies = (page) => {
  return `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}&page=${page}`;
};
export const popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`;
export const searchMovies = (keyword) => {
  return `https://www.omdbapi.com/?s=${keyword}&apikey=${omdbAPIkey}`;
};

export const movieDetails = (id) => {
  return `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`;
};
export const movieCastDetails = (id) => {
  return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`;
};
