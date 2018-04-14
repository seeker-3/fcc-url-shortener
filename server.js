const log = console.log;
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient
const express = require('express')
const app = express()
app.listen(process.env.PORT || 3000);

const mLabUrl = process.env.MLABURL

function logObj(obj) {
  for (let x in obj) {
    console.log(x);
  }
  console.log(obj);
}


MongoClient.connect(mLabUrl, function (err, client) {
  if (err) console.log(err);
  else {
    console.log('connected');
    //logObj(client.db());
    //   .collection('chat').find().toArray(function(err, docs) {
    //   console.log(JSON.stringify(docs));
    // });
    client.close();
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
