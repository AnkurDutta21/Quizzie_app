const express = require("express");
const dbConnect = require("./config/dbConfig");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require('./routes/auth')


const app = express();
const port = 4000;
app.use(express.json())
app.use("/api/v1/auth",authRoutes)


app.use(errorHandler)

dbConnect()
app.listen(port, () => {
  console.log(`server connected successfully at http://localhost:${port}`);
});
