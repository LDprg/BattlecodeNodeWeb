import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bodyParser from 'body-parser';

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
    secret: 'keyboard dog',
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(User.authenticate()));

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  // Cross Origin middleware
  app.use(function (req: any, res: any, next: any) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/', (req: any, res: any) => res.send('Hello World!'));
  app.post('/', (req: any, res: any) => res.send('Hello World!'));

  // http://localhost:8080/register?name=user&email=user@battlecode.com&passwd=123
  app.get('/register', function (req, res) {
    console.log("Register");
    var Users = new User({ email: req.query.email, username: req.query.name });

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

  app.post('/login', passport.authenticate('local'), (req, res) => {
    console.log("login");
    res.json({ success: req.isAuthenticated() });
  });

  app.get('/islogin', (req, res) => {
    console.log("islogin");
    res.json({ success: req.isAuthenticated() });
  });

  app.get('/logout', function (req, res) {
    console.log("Logout");
    req.logout();
    res.send('You are logged out');
  });

  app.listen(config.port, () => console.log(`Example app listening on ${config.port}!`));
});