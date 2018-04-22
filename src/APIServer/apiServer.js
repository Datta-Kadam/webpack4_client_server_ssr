//import fallback from 'express-history-api-fallback';
// import express from 'express';
// import logger from 'morgan';
// import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import session from 'express-session';
// import mongoStr from 'connect-mongo';
var cors = require('cors');

var fallback = require('express-history-api-fallback');
var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
const session=require('express-session');
const MongoStore=require('connect-mongo')(session);

// import index from './routes/index';
// import users from './routes/users';
var index = require('./routes/index');
var users = require('./routes/users');


//const MongoStore = (mongoStr)(session);
const app = express();
app.use(cors());

//DB Set up
    mongoose.connect('mongodb://mongo:27017/dualsimulation');
    const _db= mongoose.connection;
    _db.on('error', console.error.bind(console, '#MongoDB -connection error'));
    app.use((req, res, next) => {
    res.locals.db = _db;
    next();
    });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use('/', (req, res, next) => {
        //console.log(req.session);
        console.log("Incoming Request", req.path);
        next();
    });
    
    app.use('/client', index);
    app.use('/users', users); 

//app.use(fallback('index.html', { root }))
// catch 404 and forward to error handler
//     app.use((req, res, next) => {
//     const err = new Error('Not Found');
//     err.status = 404;
//     next(err);
//     });

// // error handler
// app.use((err, req, res) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.send('error');
// });

//API Server listening on 3001 port
app.listen(3001,function(err){
    if(err){
      return console.log(err);
    }
    console.log('API Server is listening on http://localhost:3001');
  });
