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
    let res = await fetch(nowPlayingMovies(currentMovie));
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
    <div className="md:h-[86vh] flex p-2 pt-1 relative xs:border md:border-none xs:ml-[-10vw] md:ml-0 xs:h-fit">
      <div className="h-fit flex flex-col justify-start min-w-[64vw] xs:px-1 md:px-4">
        <div className="w-full grid xs:frid-rows-3  md:grid-cols-3 gap-4  p-3">
          <div className="xs:flex md:hidden  md:m-0  w-full">
            <Rightbar />
          </div>
          <div className="xs:row-span-1 md:col-span-1 ">
            <Cardbar title="Total Revenue" data={selectedMovie?.BoxOffice} />
          </div>
          <div className="xs:row-span-1 md:col-span-1 ">
            <Cardbar title="Total Budget" data={selectedMovie?.Production} />
          </div>
          <div className="xs:row-span-1 md:col-span-1 ">
            <Cardbar title="Total Runtime" data={parseInt(selectedMovie?.Runtime)} />
          </div>
        </div>
        <div className="flex md:flex-row xs:flex-col xs:justify-center xs:items-center gap-2 p-2 ">
       <GaugeBar type={"Internet Movie Database"} />
           <GaugeBar type={"Rotten Tomato"} />
          <ActivePie />  
        </div>
        <div className="xs:hidden md:flex py-2">
          <Areabar />
        </div>
      </div>
      <div className="xs:hidden md:flex md:fixed md:right-2 md:max-w-[20vw] xs:w-full">
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;
