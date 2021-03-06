const express = require('express');
const app = express();
const server = require('http').Server(app);
const routes = require('./routes');
const path = require('path');
const startDb = require('./db');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

app.use(express.static(path.join(__dirname, '/../node_modules')));
app.use(express.static(path.join(__dirname, "/../public")));
app.use(express.static(path.join(__dirname, "/../bin")));
app.use(favicon(path.join(__dirname, '/../public/favicon.ico')));


app.use('/api', routes);

app.get('/*', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

const port = process.env.PORT || 1337;

startDb.then(() => server.listen(port, () => console.log('Chillin on Port: ', port)))
	   .catch(error => console.error(error));

