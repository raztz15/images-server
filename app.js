const express = require("express");
const axios = require("axios");
const cors = require("cors");
// opening server with express
const app = express();
// handling cors issues
app.use(cors());

const itemsPerPage = 9;
// fetching data from given DB
app.get("/:category/:page", (req, res) => {
  const category = req.params.category || "Animals";
  const page = parseInt(req.params.page || "1");

  axios
    .get(
      `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}`
    )
    .then((api_response) => {
      const data = api_response.data.hits.map((item) => ({
        id: item.id,
        image: item.largeImageURL,
        downloads: item.downloads,
        views: item.views,
        collections: item.collections,
        likes: item.likes,
        comments: item.comments,
      }));

      const zeroBased = page - 1;

      const currentPage = data.slice(
        zeroBased * itemsPerPage,
        zeroBased * itemsPerPage + itemsPerPage
      );

      res.send(currentPage);
      console.log(currentPage);
    })
    .catch((err) => res.send(err));
});

app.listen(8080, () => console.log("Server started at port 8080"));
