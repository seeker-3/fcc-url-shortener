const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient
const express = require('express')
const app = express()
app.listen(process.env.PORT || 3000);

const mongoUrl = 'mongodb://master:password@ds159926.mlab.com:59926/shortened-urls'

MongoClient.connect(mongoUrl, function (err, db) {
  if (err) console.log(err);
  else db.close();
});