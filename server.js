<<<<<<< HEAD
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient
=======
>>>>>>> f977617e12cdd3181a395adcdab6edee56f114eb
const express = require('express')
const app = express()
app.listen(process.env.PORT || 3000);

<<<<<<< HEAD
const mLabUrl = 'mongodb://master:password@ds159926.mlab.com:59926/shortened-urls'

MongoClient.connect(mLabUrl, function (err, db) {
  if (err) console.log(err);
  else db.close();
});
=======
>>>>>>> f977617e12cdd3181a395adcdab6edee56f114eb
