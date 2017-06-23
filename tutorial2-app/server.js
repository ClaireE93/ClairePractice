// console.log('Yoyoyoyoyoyo');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect('mongodb://ClaireE93:3.Pencil@ds133582.mlab.com:33582/practiceapp', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(3000, () => {
    console.log('listening on 3000');
  });
});

//set view engine to ejs
app.set('view engine', 'ejs');

//Body parser middleware to deal with form data
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(bodyParser.json());

//Create server that browsers can connect to
// app.listen(3000, function () {
//   console.log('listening on 3000');
// });

//GET/READ request. app.get(path, callback)
app.get('/', (req, res) => {
  // res.send('hello world');
  // res.sendFile(__dirname + '/index.html');
  db.collection('quotes').find().toArray(function (err, result) {
    if (err) return console.log(err);
    res.render('index.ejs', {quotes: result});
  })
});


app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

//MongoDB Collections findOneAndUpdate(query, update, options, callback)
app.put('/quotes', (req, res) => {
  db.collection('quotes').findOneAndUpdate(
    {name: 'Yoda'},
    {$set: {
      name: req.body.name,
      quote: req.body.quote
    }},
    {sort: {_id: -1},
     upsert: true
   }, (err, result) => {
     if (err) return res.send(err);
     res.send(result);
   }
 );
});

//findOneAndDelete(query, options, callback)
app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete(
    {name: req.body.name},
    (err, result) => {
      if(err) return res.send(500, err);
      res.send({message: 'Vader quote got deleted'});
    });
});
