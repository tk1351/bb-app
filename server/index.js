const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/dev')
const bodyParser = require('body-parser')
const usersRoutes = require('./routes/users')
const profileRoutes = require('./routes/profile')
const postRoutes = require('./routes/post')
const categoryRoutes = require('./routes/category')
const productsRoutes = require('./routes/products')
const searchPostRoutes = require('./routes/searchPost')

const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const authConfig = require("./auth_config.json");

const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB connected')
})

app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/profile', profileRoutes)
app.use('/api/v1/post', postRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/products', productsRoutes)
app.use('/api/v1/search', searchPostRoutes)

if (!authConfig.domain || !authConfig.audience) {
  throw new Error(
    "Please make sure that auth_config.json is in place and populated"
  );
}

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"]
});

const PORT = process.env.PORT || '3001'

app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!"
  });
});

app.listen(PORT, () => console.log(`I am running on port ${PORT}`));
