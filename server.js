const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const ejs = require("ejs");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", ejs);

app.get("/", function (request, response) {
  response.render("index.ejs", { country: "" }); 
});

app.post("/", (req, res) => {
  let country = req.body.country;
  let url = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
  
  axios
    .get(url)
    .then(function (response) {
      // console.log(response.data);
      let countryObject = response.data[0];
      console.log(countryObject.languages[0].name);
      res.render("index.ejs", { country: countryObject });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server has started.");
});

