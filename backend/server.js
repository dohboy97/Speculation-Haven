const express = require("express")
const app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Origin", req.headers.origin)
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  )
  if ("OPTIONS" == req.method) {
    res.send(200)
  } else {
    next()
  }
})

const path = require("path")
const passport = require("passport")
const session = require("express-session")
const connectDB = require("./config/database")
const cors = require("cors")
require("dotenv").config()

require("./config/passport")(passport)
// passport google oauth2.0

//routes

const watchListRoute = require("./routes/watchList")
const searchRoute = require("./routes/search")
const portfolioRoute = require("./routes/portfolio")
const authRoute = require("./routes/auth")

connectDB()

app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
)

app.use(
  session({
    secret: "keyboard cat",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 86400000 },
  })
)
//session middleware
app.use(passport.initialize())
app.use(passport.session())

//passport middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, "../frontend/build")))

app.use("/watchlist", watchListRoute)
app.use("/search", searchRoute)
app.use("/portfolio", portfolioRoute)
app.use("/auth", authRoute)
app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`)
})
