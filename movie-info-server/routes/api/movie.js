const express = require("express");
const router = express.Router();
const passport = require("passport");
const cardController = require("../../controllers/movie");

router.get("/getAllMovies/:pageNumber", cardController.getAllMovies);
router.get(
  "/getAllFavs",
  passport.authenticate("jwt", { session: false }),
  cardController.getAllFavorite
);

router.get(
  "/get-link/:movieId",

  cardController.getMovieLink
);

router.post(
  "/add-link",
  passport.authenticate("jwt", { session: false }),
  cardController.addMovieLink
);

router.post(
  "/earning-data",
  passport.authenticate("jwt", { session: false }),
  cardController.webScrapping
);

router.put(
  "/update-link",
  passport.authenticate("jwt", { session: false }),
  cardController.updateMovieLink
);

module.exports = router;
