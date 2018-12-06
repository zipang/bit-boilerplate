'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const router = express.Router();
require('./routes/')(router); // Apply every routes
app.use(router);

app.get('/', (req, res) => {
	res.send('OK');
});

app.listen(8080, () => {
	console.log('Listening on port 8080...');
});
