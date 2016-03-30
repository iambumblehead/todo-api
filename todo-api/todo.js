// Filename: express.js  
// Timestamp: 2016.03.29-20:33:18 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var express = require('express'),
    morgan = require('morgan'),
    winston = require('winston'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    errorhandler = require('errorhandler'),
    expressWinston = require('express-winston'),
    methodOverride = require('method-override'),
    http = require('http'),
    app,

    todo_db_user = require('./todo_db_user'),    
    todo_db_todolist = require('./todo_db_todolist');

app = express();
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(expressWinston.logger({
  transports : [
    new winston.transports.File({ 
      json: true, 
      colorize: true, 
      maxsize : 104857600, // 100mb
      maxFiles : 10,
      filename: './log_err.log'
    })]
}));

app.use(expressWinston.logger({
  transports : [
    new winston.transports.File({ 
      json: true, 
      colorize: true, 
      maxsize : 104857600, // 100mb
      maxFiles : 10,
      filename: './log_req.log'
    })]
}));

app.use(compression());
app.use(errorhandler({
  dumpExceptions : true, 
  showStack : true
}));


//todo_db_user.seed((err, success) => {
//  todo_db_todolist.seed((err, success) => {
//    todo_db_todolist.getall((err, res) => {
//      console.log(err, res);
//    });
//  });
//});

app.get('/test', (req, res) => {
  res.status(200).json({ success : 'get' });
});

app.get('/save', (req, res) => {
  
  res.status(200).json({ success : 'get' });
});



app.post('/save', (req, res) => {
  console.log(req.body);

  res.status(200).json({ success : true });  
});

app.put('/save', (req, res) => {
  const data = req.query && req.query.data;
  console.log('data is', data);

  res.status(200).json({ success : true });    
});

app.delete('/save', (req, res) => {
  console.log(req.body);

  res.status(200).json({ success : true });      
});

http.createServer(app).listen(4500);

console.log('[...] http://:name::porthttp'
            .replace(/:name/gi, 'localhost')
            .replace(/:porthttp/, 4500));



module.exports = app;
