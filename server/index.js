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
const PORT = process.env.PORT || '3001'

const AWS = require('aws-sdk');
const uuid = require('uuid');

const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const BUCKET = process.env.BUCKET;

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

app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!"
  });
});

AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
    console.log("Region: ", AWS.config.region);
  }
});

// Create unique bucket name
const bucketName = 'node-sdk-sample-' + uuid.v4();
// Create name for uploaded object key
const keyName = 'hello_world.txt';

// Create a promise on S3 service object
var bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();

// Handle promise fulfilled/rejected states
bucketPromise.then(
  function(data) {
    // Create params for putObject call
    var objectParams = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
    // Create object upload promise
    var uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
    uploadPromise.then(
      function(data) {
        console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
      });
}).catch(
  function(err) {
    console.error(err, err.stack);
});

// app.get('/upload', (req, res) => {
//   upload(req.query).then(url => {
//     res.json({url: url});
//   }).catch(e => {
//     console.log(e);
//   });
// });

app.listen(PORT, error => {
  if (error) {
    console.error(error);
  } else {
    console.info('listen: ', PORT);
  }
});

// aws.config.update({
//   accessKeyId: AWS_ACCESS_KEY,
//   secretAccessKey: AWS_SECRET_KEY
// });

// function upload(file) {
//   const s3 = new aws.S3();
//   const params = {
//     Bucket: BUCKET,
//     Key: file.filename,
//     Expires: 60,
//     ContentType: file.filetype
//   };

//   return new Promise((resolve, reject) => {
//     s3.getSignedUrl('putObject', params, (err, url) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(url);
//     });
//   });
// }