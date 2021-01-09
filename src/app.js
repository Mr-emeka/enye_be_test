const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// set port
const PORT = process.env.PORT || 8080;

// app get /
app.get(`/`, (req, res) => {
  res.status(200).send({
    message: "welcome to test api",
    error: false,
  });
});
// route to api/rates
app.get(`/api/rates`, async (req, res) => {
  try {
    const { base, currency } = req.query;
    let response;
    if (base && currency) {
      response = await axios.get(
        `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currency}`
      );
    } else {
      response = await axios.get(`https://api.exchangeratesapi.io/latest`);
    }

    let { data } = response;
    res.status(200).send({
      results: {
        base: data.base,
        date: data.date,
        rates: { ...data.rates },
      },
    });
  } catch (err) {
    return res.status(500).send({
      error: true,
      message: err,
    });
  }
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
