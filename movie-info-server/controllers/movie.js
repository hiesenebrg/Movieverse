const { PrismaClient } = require("@prisma/client");
const generateText = require("../config/open-ai");
const webdriver = require("selenium-webdriver");
const redisClient = require("../config/redis");
const By = webdriver.By;
const axios = require("axios");
const prisma = new PrismaClient({ log: ["query"] });
module.exports.getAllMovies = async (req, res) => {
  try {
    let pageNumber = req.params.pageNumber;
    let currentMovies = await redisClient.get(`CURRENT_MOVIES:${pageNumber}`);
    if (currentMovies) {
      console.log("not calling imdb api");
      return res.status(200).json({
        success: true,
        message: "Dashboard Movies",
        popularMovies: JSON.parse(currentMovies),
      });
    }
    console.log("calling imdb api");
    let apiResponse = await axios.get(
      `https://imdb8.p.rapidapi.com/title/get-most-popular-movies?homeCountry=US&purchaseCountry=US&currentCountry=US&page=${pageNumber}`,
      {
        headers: {
          "x-rapidapi-key":
            "d54328eb1amsh00ad5f27d3b7418p11103djsnd4e3d86241c0",
          "x-rapidapi-host": "imdb8.p.rapidapi.com",
        },
      }
    );
    if (apiResponse.data) {
      await redisClient.setex(
        `CURRENT_MOVIES:${pageNumber}`,
        14400,
        JSON.stringify(apiResponse.data)
      );

      return res.status(200).json({
        success: true,
        message: "Dashboard Movies",
        popularMovies: apiResponse.data,
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};
module.exports.getAllFavorite = async (req, res) => {
  try {
    const favorites = await prisma.movieToVideo.findMany({
      where: {
        userId: req.user.id,
      },
      select: {
        movie: {
          select: {
            movieID: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "All Favorite Movies",
      favorites: favorites,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

module.exports.addMovieLink = async (req, res) => {
  try {
    const { movieId, link } = req.body;
    console.log("movieId", link);
    const movie = await prisma.movie.findUnique({
      where: {
        movieID: movieId.toString(),
      },
    });

    if (!movie) {
      return res.status(400).json({
        success: false,
        message: "Movie not found",
      });
    }

    const movieLink = await prisma.movie.update({
      where: {
        id: movie.id,
      },
      data: {
        movieLink: link,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Movie Link added",
      movieLink: movieLink,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};
module.exports.getMovieLink = async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await prisma.movie.findUnique({
      where: {
        movieID: movieId.toString(),
      },
    });
    if (movie) {
      return res.status(200).json({
        success: true,
        message: "Movie Link",
        link: movie.movieLink,
      });
    }
    return res.status(400).json({
      success: false,
      message: "Movie not found",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

module.exports.updateMovieLink = async (req, res) => {
  try {
    const { movieId, link } = req.body;
    const movie = await prisma.movie.findUnique({
      where: {
        movieID: movieId.toString(),
      },
    });
    const updatedMovieLink = await prisma.movie.update({
      where: {
        id: movie.id,
      },
      data: {
        movieLink: link,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Movie Link updated",
      movie: updatedMovieLink,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};
module.exports.fetchMovieEarningData = async (req, res) => {
  try {
    let movie_name = req.body.movie_name;
    propmt = `can you give tabular view of day to day collection of movie ${movie_name}`;
    let response = await generateText(propmt);
    return res.status(200).json({
      success: true,
      message: "Earning Data",
      data: response,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

module.exports.webScrapping = async (req, res) => {
  try {
    let currentMovie = req.body.movie_name;
    const driver = await new webdriver.Builder().forBrowser("chrome").build();
    await driver.get(
      "https://www.sacnilk.com/entertainmenttopbar/Box_Office_Collection?hl=en"
    );

    // Find all the movie elements
    const movieElements = await driver.findElement(By.css(".table"));
    const movieRows = await movieElements.findElements(By.tagName("tr"));

    const movieNames = [];
    const collectionDetails = {};

    // Iterate over each movie row (skip the first row as it's header)
    for (let i = 1; i < movieRows.length; i++) {
      const movieRow = movieRows[i];

      // Find the movie name element
      const tdTag = await movieRow.findElement(By.tagName("td"));
      const movieLinkElement = await tdTag.findElement(By.tagName("a"));
      const movieNameElement = await movieLinkElement.findElement(
        By.tagName("b")
      );
      // Extract the movie name
      const movieName = await movieNameElement.getText();
      console.log("movieName", movieName);

      movieNames.push(movieName);
      if (movieName === currentMovie) {
        // Click on the movie link to go to the movie's page
        await movieLinkElement.click();

        // Wait for the page to load
        await driver.sleep(5000); // Replace with implicit wait

        // Find the daily collection element (assuming class is 'boxofficecollection')
        const collections = await driver.findElements(
          By.css(".boxofficecollection")
        );

        for (const collection of collections) {
          console.log("inside collection");
          const table = await collection.findElement(By.tagName("table"));
          const tableRowsDay = await table.findElements(By.tagName("tr"))[0];
          const tableRowsMoney = await table.findElements(By.tagName("tr"))[1];
          console.log("tableRowsMoney", tableRowsMoney, typeof tableRowsMoney);
          const perDayCollectionArr = await tableRowsMoney.findElements(
            By.tagName("td")
          );

          const money = {};
          for (let j = 1; j < tableRowsDay.length; j++) {
            const day = await tableRowsDay
              .findElements(By.tagName("th"))
              [j].getText();
            const moneyValue = await perDayCollectionArr[j].getText();
            money[day] = moneyValue;
          }

          collectionDetails[movieName] = money;
          console.log("collectionDetails", collectionDetails);
        }
        // Go back to the previous page
        await driver.navigate().back();
      }
    }
    console.log(movieNames);
    console.log(collectionDetails);

    // You can now use the scraped data (movieNames and collectionDetails) in your Node.js server controller
    // ... your Node.js server controller logic here ...

    await driver.quit();
  } catch (error) {
    console.log("erroe", error);
  }
};
