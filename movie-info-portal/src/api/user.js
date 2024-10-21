import { publicRequest, userRequest } from "../requestMethod";
export const signIn = async (user, credentials) => {
  try {
    let res = await publicRequest.post("user/sign-in", credentials);
    return res.data;
  } catch (error) {
    console.log("There is an error while login", error);
    return error;
  }
};

export const AddtoFavAPI = async (movieID) => {
  try {
    const token = localStorage.getItem("token");

    let res = await userRequest(token).post("user/add-fav", movieID);
    return res.data;
  } catch (error) {
    console.log("There is an error while login", error);
    return error;
  }
};

export const isFavAPI = async (isfavId) => {
  try {
    const token = localStorage.getItem("token");

    let res = await userRequest(token).get(`user/is-fav/${isfavId}`);
    return res.data;
  } catch (error) {
    console.log("There is an error while login", error);
    return error;
  }
};

export const getAllFavAPI = async () => {
  try {
    const token = localStorage.getItem("token");

    let res = await userRequest(token).get("movie/getAllFavs");
    return res.data;
  } catch (error) {
    console.log("There is an error while login", error);
    return error;
  }
};
export const addMOvieLinkAPI = async (movieId, type, link, seasonNumber = null) => {
  try {
    const token = localStorage.getItem("token");

    let payload = {
      movieId,
      type,
      link,
    };

    if (type === 'series' && seasonNumber !== null) {
      payload.seasonNumber = seasonNumber;
    }

    let res = await userRequest(token).post("movie/add-link", payload);
    return res.data;
  } catch (error) {
    console.log("There is an error while adding movie/series link", error);
    return error;
  }
};

export const addAllSeriesLinksAPI = async (movieId, links) => {
  try {
    const token = localStorage.getItem("token");

    let res = await userRequest(token).post("movie/add-all-series-links", {
      movieId,
      links,
    });
    return res.data;
  } catch (error) {
    console.log("There is an error while adding all series links", error);
    return error;
  }
};

export const getMovieLinkAPI = async (movieId, seasonNumber = null) => {
  try {
    const token = localStorage.getItem("token");

    let url = `movie/get-link/${movieId}`;
    

    let res = await publicRequest.get(url);
    return res.data;
  } catch (error) {
    console.log("There is an error while getting movie/series link", error);
    return error;
  }
};

export const getPopularMovies = async ( pageNumber) => {
  try {
    const token = localStorage.getItem("token");

    let res = await publicRequest.get(`movie/getAllMovies/${pageNumber}`);
    return res.data;
  } catch (error) {
    console.log("There is an error while login", error);
    return error;
  }
};

