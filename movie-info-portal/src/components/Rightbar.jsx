import React, { useEffect, useState } from "react";
import {
  baseImagePath,
  movieCastDetails,
  nowPlayingMovies,
} from "../api/tmdbApi";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentMovie, updateCurrentMovie } from "../redux/movieReudx";
import {
  AddtoFavAPI,
  addMOvieLinkAPI,
  addAllSeriesLinksAPI,
  getMovieLinkAPI,
  isFavAPI,
} from "../api/user";
import { BeatLoader } from "react-spinners";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

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
  const [movieLink, setMovieLink] = useState(null);
  const dispatch = useDispatch();
  const { loginWithRedirect, user, isAuthenticated, isLoading, logout } =
    useAuth0();
  const [isLoadings, setIsLoading] = useState(false);
  const [isLinkAddLoading, setisLinkAddLoading] = useState(false);
  const [isMovie, setIsMovie] = useState(true);
  const [seasonCount, setSeasonCount] = useState(1);
  const [seasonLinks, setSeasonLinks] = useState([]);

  const addtoFav = async () => {
    setIsLoading(true);
    let res = await AddtoFavAPI({ movieID: currentMovie.imdbID.toString() });
    console.log("fav res", res);
    setIsFavorite(true);
    setIsLoading(false);
  };
  
  const handleAddMovie = async () => {
    setisLinkAddLoading(true);
    try {
      if (isMovie) {
        if (movieLink !== "" && movieLink !== null) {
          let res = await addMOvieLinkAPI(currentMovie.imdbID, 'movie', movieLink);
          if (res && res.success) {
            alert("Movie link added/updated");
          } else {
            alert("Something went wrong!");
          }
        }
      } else {
        if (seasonLinks.length > 0) {
          let allLinksAdded = true;
          for (let i = 0; i < seasonLinks.length; i++) {
            if (seasonLinks[i] !== "") {
              let res = await addMOvieLinkAPI(currentMovie.imdbID, 'series', seasonLinks[i], i + 1);
              if (!res || !res.success) {
                allLinksAdded = false;
                alert(`Failed to add/update link for Season ${i + 1}`);
                break;
              }
            }
          }
          if (allLinksAdded) {
            alert("All series links added/updated successfully");
          }
        }
      }
    } catch (error) {
      console.error("Error adding link:", error);
      alert("An error occurred while adding the link");
    }
    setisLinkAddLoading(false);
  };
  // const handleAddSeriesLink = async (seriesLinkIndex) => {
  //   setisLinkAddLoading(true);
  //   try {
  //     if (isMovie) {
  //       if (movieLink !== "" && movieLink !== null) {
  //         let res = await addMOvieLinkAPI(currentMovie.imdbID, 'movie', movieLink);
  //         if (res && res.success) {
  //           alert("Movie link added/updated");
  //         } else {
  //           alert("Something went wrong!");
  //         }
  //       }
  //     } else {
  //       if (seasonLinks.length > 0) {
  //         let allLinksAdded = true;
  //         for (let i = 0; i < seasonLinks.length; i++) {
  //           if (seasonLinks[i] !== "") {
  //             let res = await addMOvieLinkAPI(currentMovie.imdbID, 'series', seasonLinks[i], i + 1);
  //             if (!res || !res.success) {
  //               allLinksAdded = false;
  //               alert(`Failed to add/update link for Season ${i + 1}`);
  //               break;
  //             }
  //           }
  //         }
  //         if (allLinksAdded) {
  //           alert("All series links added/updated successfully");
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error adding link:", error);
  //     alert("An error occurred while adding the link");
  //   }
  //   setisLinkAddLoading(false);
  // };
  const isFav = async () => {
    let res = await isFavAPI(currentMovie.imdbID);
    setIsFavorite(res.success);
  };

  const getMovieLinkApi = async () => {
    setisLinkAddLoading(true);
    try {
      let res = await getMovieLinkAPI(currentMovie.imdbID);
      if (res.success) {
        if (res.link) {
          setMovieLink(res.link);
          setIsMovie(true);
        } else if (res.seasons) {
          setSeasonLinks(res.seasons.map(season => season.link));
          setSeasonCount(res.seasons.length);
          setIsMovie(false);
        }
      }
    } catch (error) {
      console.error("Error getting movie/series link:", error);
    }
    setisLinkAddLoading(false);
  };

  useEffect(() => {
    const fetchCurrentMovieCast = async () => {
      let res = await fetch(movieCastDetails(currentMovie.imdbID));
      let data = await res.json();
      if (data) {
        let castData = data.cast;
        let cast = "";
        castData?.slice(0, 10).forEach((item) => {
          cast += item.name + ", ";
        });
        setCurrentMovieCast(cast.slice(0, -2));
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
          {currentMovie.Language}
        </span>
      </div>
      <div className="flex justify-start ">
        <p className="text-xs font-bold"> Generes : </p>
        <span className="text-xs">
          &nbsp;
          {currentMovie.Genre}
        </span>
      </div>
      <div className="flex justify-start ">
        <p className="text-xs font-bold"> Country : </p>
        <span className="text-xs">
          &nbsp;
          {currentMovie.Country}
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
          {!isLoadings ? (
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
          ) : (
            <BeatLoader />
          )}
        </span>
      </div>
      <div className="flex flex-col justify-start ">
        <p className="text-xs font-bold">Link : </p>
        {!isLinkAddLoading ? (
          <>
            {userDetails?.user?.admin ? (
              <>
                <div className="flex items-center mt-2">
                  <label className="mr-2 text-xs">
                    <input
                      type="radio"
                      checked={isMovie}
                      onChange={() => setIsMovie(true)}
                    />
                    Movie
                  </label>
                  <label className="text-xs">
                    <input
                      type="radio"
                      checked={!isMovie}
                      onChange={() => setIsMovie(false)}
                    />
                    Series
                  </label>
                </div>
                {isMovie ? (
                  <input
                    value={movieLink}
                    onChange={(e) => setMovieLink(e.target.value)}
                    className="mt-2 border border-slate-500 rounded-xl text-xs px-2 py-1"
                    type="text"
                    placeholder="Enter Movie Link"
                  />
                ) : (
                  <>
                    <input
                      type="number"
                      min="1"
                      value={seasonCount}
                      onChange={(e) => {
                        const count = parseInt(e.target.value);
                        setSeasonCount(count);
                        setSeasonLinks(prevLinks => {
                          const newLinks = [...prevLinks];
                          while (newLinks.length < count) newLinks.push("");
                          return newLinks;
                        });
                      }}
                      className="mt-2 border border-slate-500 rounded-xl text-xs px-2 py-1"
                      placeholder="Number of Seasons"
                    />
                    {seasonLinks.map((link, index) => (
                      <div key={index} className="flex items-center mt-2">
                        <input
                          value={link}
                          onChange={(e) => {
                            const newLinks = [...seasonLinks];
                            newLinks[index] = e.target.value;
                            setSeasonLinks(newLinks);
                          }}
                          className="border border-slate-500 rounded-xl text-xs px-2 py-1 flex-grow"
                          type="text"
                          placeholder={`Enter Link for Season ${index + 1}`}
                        />
                        <button
                          className="ml-2 bg-blue-600 px-2 py-1 text-white rounded-xl text-xs"
                          onClick={() => handleAddMovie()}
                        >
                          {link ? "Update" : "Add"}
                        </button>
                      </div>
                    ))}
                  </>
                )}
                {isMovie && (
                  <button
                    className="mt-2 bg-blue-600 px-2 py-1 text-white rounded-xl text-xs"
                    onClick={handleAddMovie}
                  >
                    {movieLink ? "Update" : "Add"}
                  </button>
                )}
              </>
            ) : (
              <span className="text-xs mt-2 px-2 py-1 text-white rounded-xl ">
                {isMovie ? (
                  movieLink ? (
                    <a href={movieLink} target="_blank" rel="noopener noreferrer">
                      <button className="px-2 py-1 rounded-xl bg-blue-500">
                        Watch Now
                      </button>
                    </a>
                  ) : (
                    <p className="text-black">Link will be added soon</p>
                  )
                ) : (
                  seasonLinks.map((link, index) => (
                    link ? (
                      <Link key={index} to={link} target="_blank" rel="noopener noreferrer" className="block mt-1">
                        <button className="px-2 py-1 rounded-xl bg-blue-500">
                          Watch Season {index + 1}
                        </button>
                      </Link>
                    ) : (
                      <p key={index} className="text-black mt-1">Season {index + 1} link will be added soon</p>
                    )
                  ))
                )}
              </span>
            )}
          </>
        ) : (
          <BeatLoader />
        )}
      </div>
    </div>
  );
};

export default Rightbar;
