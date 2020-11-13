const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const port = 3500

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
    return res.send('pong');
});

app.listen(port || 8080);