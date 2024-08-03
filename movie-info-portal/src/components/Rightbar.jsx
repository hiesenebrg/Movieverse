import React, { useEffect, useState } from "react";
import {
  baseImagePath,
  movieCastDetails,
  nowPlayingMovies,
} from "../api/tmdbApi";
import { useDispatch } from "react-redux";
import { addCurrentMovie, updateCurrentMovie } from "../redux/movieReudx";
import { useSelector } from "react-redux";
import {
  AddtoFavAPI,
  addMOvieLinkAPI,
  getMovieLinkAPI,
  isFavAPI,
} from "../api/user";
import { useAuth0 } from "@auth0/auth0-react";

const movie = {
  name: "Adipursuh",
  // Des
};
const Rightbar = () => {
  const currentMovie = useSelector((state) => state.movies.currentMovie);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentMovieCast, setCurrentMovieCast] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const userDetails = useSelector((state) => state.user.currentUser);
  const [movieLinkState, setMovieLinkState] = useState("");
  const dispatch = useDispatch();
  const [movieLink, setMovieLink] = useState(null);
  const { loginWithRedirect, user, isAuthenticated, isLoading, logout } =
    useAuth0();
  const addtoFav = async () => {
    let res = await AddtoFavAPI({ movieID: currentMovie.imdbID.toString() });
    console.log("res", res);
    setIsFavorite(true);
  };
  const handleAddMovie = async () => {
    if (movieLink !== "" && movieLink !== null) {
      console.log("mivieLink", movieLink);
      let res = await addMOvieLinkAPI(currentMovie.id, movieLink);
      console.log("res", res);
    }
  };
  const isFav = async () => {
    console.log("isFAav");
    let res = await isFavAPI(currentMovie.id);
    console.log("res", res.success);
    setIsFavorite(res.success);
  };
  const getMovieLinkApi = async () => {
    let res = await getMovieLinkAPI(currentMovie.id);
    console.log("get res", res);
    setMovieLink((prev) => res.link);
  };

  useEffect(() => {
    const fetchCurrentMovieCast = async () => {
      let res = await fetch(movieCastDetails(currentMovie.id));

      let data = await res.json();
      console.log("cast", data);
      if (data) {
        let castData = data.cast;
        let cast = "";

        castData?.map((item, i) => {
          console.log("each cast", item);
          i <= 10 ? (cast += item.name + ", ") : null;
        });
        setCurrentMovieCast((prev) => cast);
      }
    };
    if (currentMovie) {
      fetchCurrentMovieCast();
      isFav();
      getMovieLinkApi();
    }
  }, [currentMovie]);

  return (
    <div className=" flex flex-col gap-2 border p-4 justify-center items-start">
      <div className="xs:m-0 md:m-auto">
        <img
          className="xs:w-[80vw] xs:h-70 xs:rounded-xl  md:w-26 md:h-36 md:rounded-xl"
          src={currentMovie.Poster}
          alt="movie"
        />
      </div>
      <div className="text-center font-bold m-auto">
        {currentMovie ? currentMovie.Title : "Loading..."}
      </div>
      <p className="text-[12px] overflow-hidden overflow-ellipsis h-[13.4vh]">
        {currentMovie ? currentMovie.Plot : "Loading..."}...
      </p>
      <div className="flex justify-start ">
        <p className="text-xs font-bold"> Release Date : </p>
        <span className="text-xs">
          &nbsp;{currentMovie ? currentMovie.Released : "-"}
        </span>
      </div>
      <div className="flex justify-start ">
        <p className="text-xs font-bold"> Original Laungages : </p>
        <span className="text-xs">
          &nbsp;
          {currentMovie.Language
            }
        </span>
      </div>
      <div className="flex justify-start ">
        <p className="text-xs font-bold"> Generes : </p>
        <span className="text-xs">
          &nbsp;
          {currentMovie.Genre
            }
        </span>
      </div>
      <div className="flex justify-start ">
        <p className="text-xs font-bold"> Country : </p>
        <span className="text-xs">
          &nbsp;
          {currentMovie.Country
            }
        </span>
      </div>
      <div className="flex justify-start ">
        <p className="text-xs font-bold"> Casts: </p>
        <span className="text-xs">
          &nbsp;
          {currentMovie ? currentMovie.Actors : ""}
        </span>
      </div>

      <div className="flex justify-start ">
        <p className="text-xs font-bold">Favroites : </p>
        <span className="text-xs ml-2 mt-[-6px] px-2 py-1 text-white rounded-xl ">
          <button
            className={`px-2 py-1 rounded-xl ${
              isFavorite ? "px-4 bg-blue-500" : "bg-yellow-400"
            }`}
            disabled={isFavorite}
            onClick={() => {
              user ? addtoFav() : alert("Please Login");
            }}
          >
            {isFavorite ? "Favorited" : "Add to Favorites"}
          </button>
        </span>
      </div>
      <div className="flex justify-start ">
        <p className="text-xs font-bold">Link : </p>
        {userDetails?.user?.admin ? (
          <>
            <input
              value={movieLink}
              onChange={(e) => setMovieLink(e.target.value)}
              className="mt-[-4px] ml-2 border border-slate-500 rounded-xl text-xs px-2"
              type="text"
              placeholder="Enter Link"
            ></input>

            <button
              className="ml-1 bg-blue-600 px-2 py-1 mt-[-4px]  text-white rounded-xl text-xs"
              onClick={() => handleAddMovie()}
            >
              {movieLink ? "U" : "A"}
            </button>
          </>
        ) : (
          <span className="text-xs ml-2 mt-[-6px] px-2 py-1 text-white rounded-xl ">
            {movieLink ? (
              <a
                href={
                  movieLink
                  // : "https://www.themoviedb.org/movie/now-playing"
                }
                target="_blank"
              >
                <button className="px-2 py-1 rounded-xl bg-blue-500">
                  Watch Now
                </button>
              </a>
            ) : (
              <p className="text-black">Link will be added soon</p>
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Rightbar;
