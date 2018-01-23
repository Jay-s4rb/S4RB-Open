const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compositionRoot = require('./compositionRoot');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// routes
require('./routes/routes.js')(app);

compositionRoot.BuildContainer();

// listen
app.listen(port);
console.log(`App listening on port ${port}`);
