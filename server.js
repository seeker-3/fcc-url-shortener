const log = console.log;
const {MongoClient} = require('mongodb');
const express = require('express')
const app = express()
app.listen(process.env.PORT || 3000);

const mLabUrl = process.env.MONGODB_URI;

function logObj(obj) {
  for (let x in obj) {
    console.log(x);
  }
  console.log(obj);
}


MongoClient.connect(mLabUrl, function (err, client) {
  if (err) console.log(err);
  else {
    client.db('fcc-url-shortener').collection('urls').find().toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      client.close();
    });
  }
});

app.get('/', (req, res) => 
  res.sendFile(__dirname + '/views/root.html')
);

app.get(/\/.+/, (req, res) => {
  res.json({
    original: null,
    shortened: null,
  });
});
