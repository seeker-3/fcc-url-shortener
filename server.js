const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient
const express = require('express')
const app = express()
app.listen(process.env.PORT || 3000);

const mLabUrl = 'mongodb://master:password@ds159926.mlab.com:59926/shortened-urls'

MongoClient.connect(mLabUrl, function (err, db) {
  if (err) console.log(err);
  else db.close();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/root.html');
});
