import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import { Schema, Document, PassportLocalModel } from "mongoose";
import passport from 'passport';
import bodyParser from 'body-parser';

const LocalStrategy = require('passport-local').Strategy;

import User from './models/user';

const app = express();
const config = {
  mongo: {
    uri: //process.env.MONGO_URL ||
      'mongodb://user:9TF5KKZSu9kDQbxj@database/BattlecodeWeb',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  port: process.env.port ||
    '8080'
};

// Connect to MongoDB
console.log('Connection to mongoDb on uri: ' + config.mongo.uri);
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function (err) {
  console.error('MongoDB connection error: ' + err);
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {
  console.log("DB Connection Successful!");

  // Parsers for POST data
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(User.createStrategy());

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  // Cross Origin middleware
  app.use(function (req: any, res: any, next: any) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  });

  app.get('/', (req: any, res: any) => res.send('Hello World!'));

  // http://localhost:8080/register?user=1&email=2&passwd=3
  app.get('/register', function (req, res) {
    var Users = new User({ email: req.query.email, username: req.query.user });

    User.register(Users, req.query.passwd!.toString(), function (err: any, user: any) {
      if (err) {
        res.json({
          success: false, message: "Your account could not be saved.", err
        })
      } else {
        res.json({
          success: true, message: "Your account has been saved"
        })
      }
    });
  });

  app.listen(config.port, () => console.log(`Example app listening on ${config.port}!`));
});