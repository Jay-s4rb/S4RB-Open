const 
  app = require('express')()
  ,bodyParser = require('body-parser');
  
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/cpmu', require('./routes/cpmu'));

app.listen(3001, () => {
  console.log('App listening on port 3001');
});