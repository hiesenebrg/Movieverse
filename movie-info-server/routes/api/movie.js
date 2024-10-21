const express = require("express");
const router = express.Router();
const passport = require("passport");
const movieController = require("../../controllers/movie");

router.get("/getAllMovies/:pageNumber", movieController.getAllMovies);
router.get(
  "/getAllFavs",
  passport.authenticate("jwt", { session: false }),
  movieController.getAllFavorite
);

router.get(
  "/get-link/:movieId",
  movieController.getLink
);

router.post(
  "/add-link",
  passport.authenticate("jwt", { session: false }),
  movieController.addLink
);

router.post(
  "/earning-data",
  passport.authenticate("jwt", { session: false }),
  movieController.webScrapping
);

router.put(
  "/update-link",
  passport.authenticate("jwt", { session: false }),
  movieController.updateMovieLink
);

module.exports = router;
