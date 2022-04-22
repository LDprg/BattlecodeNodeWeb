import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bodyParser from 'body-parser';
import cors from 'cors';

import User from './models/user';
import Bots from './models/bots';

const app = express();
const config = {
  mongo: {
    uri: //process.env.MONGO_URL ||
      'mongodb://user:9TF5KKZSu9kDQbxj@database/BattlecodeWeb',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
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

  /*// Cross Origin middleware
  app.use(function (req: any, res: any, next: any) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Allow-Origin-With-Credentials", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });*/
  app.use(cors({
    credentials: true,
    origin: true,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
  }));

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
    var user: any = req.user;
    user.hash = undefined;
    user.salt = undefined;
    res.json(user);
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

  app.get('/addbot', function (req, res) {
    console.log("Addbot");
    if (req.isAuthenticated()) {
      var bot = {
        userid: req.user.id,
        link: req.query.link,
        tag: req.query.tag
      };
      db.collection("bots").insertOne(bot);
      res.json({ success: true });
    }
    else
      res.json({ success: false, error: "Login first!" });
  });

  app.get('/getbot', function (req: any, res: any) {
    console.log("Getbot");
    if (req.isAuthenticated()) {
      Bots.find({ userid: req.user.id }).sort([['_id', 'descending']]).then((val: any) => {
        res.json({ success: true, data: val });
      });
    }
    else
      res.json({ success: false, error: "Login first!" });
  });

  app.get('/rmbot', function (req: any, res: any) {
    console.log("rmbot");
    if (req.isAuthenticated()) {
      Bots.deleteOne({ $and: [{ _id: req.query.id }, { userid: req.user.id }] }).then((val: any) => {
        if (val.deletedCount > 0)
          res.json({ success: true });
        else
          res.json({ success: false, error: "Item not exists!" });
      });
    }
    else
      res.json({ success: false, error: "Login first!" });
  });

  app.get('/editbot', function (req: any, res: any) {
    console.log("editbot");
    if (req.isAuthenticated()) {
      Bots.findOneAndUpdate({ $and: [{ _id: req.query.id }, { userid: req.user.id }] }, { tag: req.query.tag }).then((val: any) => {
        res.json({ success: true });
      });
    }
    else
      res.json({ success: false, error: "Login first!" });
  });

  app.listen(config.port, () => console.log(`Example app listening on ${config.port}!`));
});