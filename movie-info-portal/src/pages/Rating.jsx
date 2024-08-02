import React, { useEffect, useState } from "react";
import { getAllFavAPI } from "../api/user";
import Card from "../components/Card";

const Rating = () => {
  const [favData, setFavData] = useState(null);
  const getAllFav = async () => {
    let res = await getAllFavAPI();
    let data = res?.favorites?.map((item) => {
      // console.log("each item", item.movieID);
      return item.movie.movieID;
    });
    // console.log("data", data);
    setFavData((prev) => data);
  };

  useEffect(() => {
    console.log("Rating");
    getAllFav();
  }, []);
  return (
    <div className="p-3 grid xs:grid-cols-2 md:grid-cols-4 xs:ml-[-12vw] md:ml-0 lg:grid-cols-5 gap-4">
      {favData?.map((movieId) => {
        return (
          <div key={movieId.id} className="col-span-1">
            <Card data={movieId} />
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
