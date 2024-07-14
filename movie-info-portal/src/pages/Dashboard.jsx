import React, { useEffect, useState } from "react";
import GaugeBar from "../components/GaugeBar";
import Rightbar from "../components/Rightbar";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import { movieDetails, searchMovies } from "../api/tmdbApi";
import { useDispatch } from "react-redux";
import { addCurrentMovie } from "../redux/movieReudx";
import Areabar from "../components/Areabar";
import Cardbar from "../components/Cardbar";
import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import ActivePie from "../components/ActivePie";
const Dashboard = () => {
  const selectedMovie = useSelector((state) => state.movies.currentMovie);
  const [searchText, setSearchText] = useState("");
  const [searchedMovies, setSearchedMovies] = useState(null);
  const [currentMovie, setCurrentMovie] = useState(null);
  const dispatch = useDispatch();

  const handleCurrentMovie = async () => {
    let res = await fetch(movieDetails(currentMovie));
    let data = await res.json();
    console.log("current movie data", data);
    dispatch(addCurrentMovie(data));
  };
  useEffect(() => {
    console.log("searchText", searchText);

    const fetchSearchedMovies = async () => {
      try {
        const res = await fetch(searchMovies(searchText));
        const data = await res.json();
        console.log("data", data);
        setSearchedMovies((prev) => data.results);
      } catch (error) {
        console.log("error", error);
      }
    };
    if (searchText) {
      fetchSearchedMovies();
    }
  }, [searchText]);
  useEffect(() => {
    if (currentMovie) {
      handleCurrentMovie();
    }
  }, [currentMovie]);
  return (
    <div className="h-[86vh] flex p-2 pt-1 relative">
      <div className="h-fit flex flex-col justify-start min-w-[64vw] px-4  ">
        <div className="">
          <TextField
            id="outlined-basic"
            variant="outlined"
            className="w-full"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {searchedMovies && searchText.length !== 0 && (
            <div className="flex flex-col gap-2 max-h-[40vh] overflow-auto z-1 pt-2 text-sm z-100">
              {searchedMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="flex gap-2 border-b border-b-slate-300 pb-1 hover:cursor-pointer"
                  onClick={() => {
                    setCurrentMovie(movie.id);
                    setSearchText("");
                  }}
                >
                  <img
                    className="w-10 h-12 rounded-sm"
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt="movie"
                  />
                  <div className="flex flex-col relative">
                    <p>{movie.title}</p>
                    <p>{movie.release_date}</p>
                    <p className="flex absolute left-[46vw] min-w-[10vw] gap-2 ">
                      Rating: {movie.vote_average}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-full grid grid-cols-3 gap-4  p-3">
          <div className="col-span-1 ">
            <Cardbar title="Total Revenue" data={selectedMovie?.revenue} />
          </div>
          <div className="col-span-1 ">
            <Cardbar title="Total Budget" data={selectedMovie?.budget} />
          </div>
          <div className="col-span-1 ">
            <Cardbar title="Total Runtime" data={selectedMovie?.runtime} />
          </div>
        </div>
        <div className="flex gap-2 p-2">
          <GaugeBar />
          <GaugeBar />
          <ActivePie />
        </div>
        <div className="py-2">
          <Areabar />
        </div>
      </div>
      <div className="max-w-[20vw]">
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;
