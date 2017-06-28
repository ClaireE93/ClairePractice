const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;


var db;

MongoClient.connect('mongodb://claire:johnson@ds133582.mlab.com:33582/practiceapp', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(3000, () => {
    console.log('listening on 3000');
  });
})


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  db.collection('markers').find().toArray(function (err, result) {
    if (err) return console.log(err);
    res.render('pages/index', {markers: result});
  });
});

//use below format for other pages
// app.get(about/, (req, res) => {
//   res.render('pages/about');
// })

// app.post('/markers', (req, res) => {
//   db.collection('markers').save(req.body, (err, result) => {
//     if (err) return console.log(err);
//     console.log('saved to database');
//     res.redirect('/'); //Instead of this, can the box just close?
//   });
// });

app.post('/done', (req, res) => {
  db.collection('markers').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/'); //Instead of this, can the box just close?
  });
});

app.post('/cancel', (req, res) => {
  res.redirect('/');
});
