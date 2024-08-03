import React, { useEffect, useState } from "react";
import { movieDetails, nowPlayingMovies } from "../api/tmdbApi";
import { useDispatch } from "react-redux";
import { addCurrentMovie } from "../redux/movieReudx";
import { useNavigate } from "react-router-dom";

const Card = ({ data }) => {
  //   console.log("data", data);
  //   const [movieid, setMovieId] = useState(data);
  const [movieDetail, setMovieDetails] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movieData = async (dataId) => {
    let res = await fetch(nowPlayingMovies(dataId));
    let movieData = await res.json();
    console.log("moviesdata", movieData, typeof movieData);
    setMovieDetails((prev) => movieData);
  };
  useEffect(() => {
    movieData(data);
  }, []);
  return (
    <>
   { movieDetail &&
    <div
      className="flex flex-col gap-2 px-2 py-4 border border-slate-300 h-[60vh] overflow-hidden hover:cursor-pointer"
      onClick={() => {
        dispatch(addCurrentMovie(movieDetail));
        navigate("/dashboard");
      }}
    >
      <div className="">
        <img
          className="xs:w-[40vw]  sm:w-[8vw] sm:h-[20vh] md:w-[14vw] md:h-[34vh]"
          src={movieDetail?.Poster}
          alt="poster not available"
        ></img>
      </div>
      <div className="text-blue-600 font-bold text-lg text-center ">
        {movieDetail?.Title ? movieDetail.Title : "Title not available"}
      </div>
      
     
      <div>
        <p className="text-[12px] overflow-hidden overflow-ellipsis pb-2">
          {movieDetail.Plot ? movieDetail.Plot : ""}
        </p>
      </div>
    </div>}
    </>
  );
};

export default Card;
