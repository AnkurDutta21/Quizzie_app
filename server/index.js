require('dotenv').config()
const express = require("express");
const dbConnect = require("./config/dbConfig");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require('./routes/auth')
const pollRoutes = require('./routes/poll')
const quizRoutes = require('./routes/quiz')
const userStatsRoutes = require('./routes/userStats')
const cors =  require('cors')


const app = express();
const port = process.env.PORT || 4000;
app.use(express.json())
app.use(cors())
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/poll",pollRoutes)
app.use("/api/v1/quiz",quizRoutes)
app.use("/api/v1/userStats",userStatsRoutes)


app.use(errorHandler)

dbConnect()
app.listen(port, () => {
  console.log(`server connected successfully at http://localhost:${port}`);
});
