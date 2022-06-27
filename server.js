const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/async", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("Hello From Express");
});
app.listen(port, () => console.log(`Listening on port ${port}`));
