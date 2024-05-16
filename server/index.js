const express = require("express");
const dbConnect = require("./config/dbConfig");

const app = express();
const port = 4000;

dbConnect()
app.listen(port, () => {
  console.log(`server connected successfully at http://localhost:${port}`);
});
