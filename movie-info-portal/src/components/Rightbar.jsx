import React, { useEffect, useState } from "react";
import {
  baseImagePath,
  movieCastDetails,
  nowPlayingMovies,
} from "../api/tmdbApi";
import { useDispatch } from "react-redux";
import { addCurrentMovie } from "../redux/movieReudx";
import { useSelector } from "react-redux";
const movie = {
  name: "Adipursuh",
  // Des
};
const Rightbar = () => {
  const currentMovie = useSelector((state) => state.movies.currentMovie);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentMovieCast, setCurrentMovieCast] = useState(null);
  useEffect(() => {
    const fetchCurrentMovieCast = async () => {
      let res = await fetch(movieCastDetails(currentMovie.id));

      let data = await res.json();
      console.log("cast", data);
      if (data) {
        let castData = data.cast;
        let cast = "";
        
        castData?.map((item ,i) => {
          console.log("each cast", item);
          i<=10 ? cast += item.name + ", " : null;
        });
        setCurrentMovieCast((prev) => cast);
      }
    };
    if (currentMovie) {
      fetchCurrentMovieCast();
    }
  }, [currentMovie]);

  return (
    <div className=" flex flex-col gap-2 border p-4 justify-center items-start">
      <div className="m-auto">
        <img
          className="w-26 h-36 rounded-xl"
          src={`https://image.tmdb.org/t/p/w780${currentMovie.poster_path}`}
          alt="movie"
        />
      </div>
      <div className="text-center font-bold m-auto">
        {currentMovie ? currentMovie.title : "Loading..."}
      </div>
      <p className="text-[12px] overflow-hidden overflow-ellipsis h-[13.4vh]">
        {currentMovie ? currentMovie.overview : "Loading..."}...
      </p>
      <div className="flex justify-start ">
        <p className="text-xs font-bold"> Release Date : </p>
        <span className="text-xs">
          &nbsp;{currentMovie ? currentMovie.release_date : "-"}
        </span>
      </div>
      <div className="flex justify-start ">
        <p className="text-xs font-bold"> Original Laungages : </p>
        <span className="text-xs">
          &nbsp;
          {currentMovie
            ? currentMovie.original_language === "en"
              ? "English"
              : currentMovie.original_language === "hi"
              ? "Hindi"
              : currentMovie.original_language === "ja"
              ? "Japanese"
              : "Others"
            : "-"}
        </span>
      </div>
      <div className="flex justify-start ">
        <p className="text-xs font-bold"> Casts: </p>
        <span className="text-xs">
          &nbsp;
          {currentMovie ? currentMovieCast : ""}
        </span>
      </div>
    </div>
  );
};

export default Rightbar;
