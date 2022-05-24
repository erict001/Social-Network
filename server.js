// const express = require('express');
// // Run npm install mongodb and require mongodb and MongoClient class
// // const mongodb = require('mongodb').MongoClient;

// const app = express();
// const port = 3001;

// // Connection string to local instance of MongoDB including database name
// const connectionStringURI = `mongodb://127.0.0.1:27017/socialDB`;

// let db;

// mongodb.connect(
//   connectionStringURI,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (err, client) => {
//     db = client.db();
//     app.listen(port, () => {
//       console.log(`Example app listening at http://localhost:${port}`);
//     });
//   }
// );

// // Built in Express function that parses incoming requests to JSON
// app.use(express.json());

const express = require('express');
const PORT = process.env.PORT || 3001;
const db = require('./config/connection');
const app = express();
const routes = require('./routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for running on port ${PORT}!`);
  });
});