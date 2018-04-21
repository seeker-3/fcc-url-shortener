const port          = process.env.PORT || 3000;
const dbUrl         = process.env.MONGODB_URI;
const collection    = process.env.COLLECTION;
const {MongoClient} = require('mongodb');
const validator     = require('validator');
const URL           = require('url');
const pug           = require('pug');
const express       = require('express');
const app           = express();

const genCode = col => new Promise((resolve, reject) => {
	function loop() {
		let code = Math.random() * 9000 + 1000 | 0;
		findArr(col, {code: code}).then(arr => {
			arr.length && loop();
			resolve(code);
		}).catch(err => {throw err});
	}
	loop();
});

const findArr = (col, query) => new Promise((resolve, reject) =>
	col.find(query).toArray((err, arr) => {
		if (err) reject(err);
		resolve(arr);
})).catch(err => {throw err});

const getClient = url => new Promise((resolve, reject) => {
	MongoClient.connect(url, (err, client) => {
			if (err) reject(err);
			resolve(client);
	});
}).catch(err => {throw err});

app.set('view engine', 'pug');
app.listen(port);

app.use((req, res, next) => {
	req.fullUrl = req.protocol+'://'+req.get('host')+'/';
	next();
});

app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/', (req, res) => res.render('index'));

app.get(/\//, async (req, res) => {
	try {
		var client = await getClient(dbUrl);
		const col = client.db().collection(collection);
		const input = req.url.slice(1);

		var arr = await findArr(col, {code: +input});

		if (arr.length) res.redirect(arr[0].url);
		else if (validator.isURL(input)) {
			arr = await findArr(col, {url: input});
			const doc = arr.length? arr[0] : {
				url: input,
				code: await genCode(col),
			};

			if (!arr.length) col.insert(doc, err => {
				if (err) throw err;
				console.log('successful insert')
			});
			res.json({
				original: doc.url,
				shortened: req.fullUrl + doc.code,
			});
		}
		else res.send('invalid code or url');
	}
	catch(err) {
		console.log(err);
	}
	finally {
		client.close(() => console.log('client closed'));
		res.end();
	}
});
