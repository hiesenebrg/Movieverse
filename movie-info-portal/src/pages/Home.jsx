import React, { useEffect, useState } from "react";
import {
  processRequest,
  movieDetails,
  nowPlayingMovies,
  searchMovies,
  upcomingMovies,
} from "../api/tmdbApi";
import Card from "../components/Card";
import { useDispatch } from "react-redux";
import { addCurrentMovie } from "../redux/movieReudx";
import { InputAdornment, Pagination, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { getPopularMovies } from "../api/user";

const Home = () => {
  const [allMovies, setAllMovies] = useState(null);
  const [movieWithDetails, setMovieWithDetails] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedMovies, setSearchedMovies] = useState(null);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(null);
  const hanglePageChange = (event, value) => {
    setPage(value);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const fetchUpcomingMovies = async () => {
    setIsLoading(true);
    let resp = await getPopularMovies(page);
    if (resp) {
      let res = resp.popularMovies;
      console.log("ressss", resp);
      console.log("fetch");
      // let res = await fetch(nowPlayingMovies(page));
      // let data = await res.json();
      setMovieWithDetails((prev) => res);
      let movieIds = res.map((item) => item.split("/")[2]);
      console.log("movieIds", movieIds);
      setAllMovies((prev) => movieIds);
    }

    setTotalCount((prev) => 100);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUpcomingMovies();
  }, [page]);

  const handleCurrentMovie = async () => {
    let res = await fetch(nowPlayingMovies(currentMovie));
    let data = await res.json();
    console.log("current movie data", data);
    dispatch(addCurrentMovie(data));
    navigate("/dashboard");
  };
  useEffect(() => {
    if (currentMovie) {
      handleCurrentMovie();
    }
  }, [currentMovie]);
  useEffect(() => {
    console.log("searchText", searchText);

    const fetchSearchedMovies = async () => {
      try {
        const res = await fetch(searchMovies(searchText));
        const data = await res.json();
        console.log("data", data);
        setSearchedMovies((prev) => data.Search);
      } catch (error) {
        console.log("error", error);
      }
    };
    if (searchText) {
      fetchSearchedMovies();
    }
  }, [searchText]);
  return (
    <div>
      {!isLoading ? (
        <>
          <div className="xs:ml-[-10vw] md:ml-[0vw] xs:mt-[-3vh] md:mt-[-2vh]  fixed z-10">
            <div className="min-h-[2vh] bg-white "></div>
            <div className="xs:w-[88vw] md:w-[84vw]">
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="w-full"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                InputProps={{
                  className: "bg-white",
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {searchedMovies && searchText.length !== 0 && (
                <div className="flex flex-col gap-2 max-h-[40vh] overflow-auto z-1 pt-2 text-sm z-100 bg-white">
                  {searchedMovies.map((movie) => (
                    <div
                      key={movie.imdbID}
                      className="flex gap-2 border-b border-b-slate-300 pb-1 hover:cursor-pointer"
                      onClick={() => {
                        setCurrentMovie(movie.imdbID);
                        setSearchText("");
                      }}
                    >
                      <img
                        className="w-10 h-12 rounded-sm"
                        // src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        src={movie.Poster}
                        alt="movie"
                      />
                      <div className="flex flex-col relative">
                        <p>{movie.Title}</p>
                        <p>{movie.Year}</p>
                        <p className="flex absolute left-[46vw] min-w-[10vw] gap-2 ">
                          {/* Rating: {movie.vote_average} */}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className=" min-h-[2vh] bg-white "></div>
          </div>
          <div className="xs:ml-[-12vw] md:ml-[0vw] p-3 grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-[10vh]">
            {allMovies?.map((movieId) => {
              return (
                <div key={movieId.id} className="col-span-1">
                  <Card data={movieId} />
                </div>
              );
            })}
          </div>
          <div className="flex w-full justify-center py-4 xs:ml-[-10vw]">
            <Pagination
              count={totalCount ? Math.ceil(totalCount / 10) : 1}
              variant="outlined"
              color="primary"
              page={page}
              className=""
              onChange={hanglePageChange}
            />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-[90vh]">
          Loading...
        </div>
      )}
    </div>
  );
};

export default Home;
