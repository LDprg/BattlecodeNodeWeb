import express from "express";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const config = {
    mongo: {
        uri: process.env.MONGO_URL ||
        'mongodb://127.0.0.1/mean-app',
        options: {
            useNewUrlParser: true
        }
    },
    port: process.env.port ||
    '8080'
};


// Connect to MongoDB
console.log('Connection to mongoDb on uri: ' + config.mongo.uri);
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
});

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cross Origin middleware
app.use(function(req : any, res : any, next : any) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/', (req : any, res : any) => res.send('Hello World!'))

app.listen(config.port, () => console.log(`Example app listening on ${config.port}!`))
