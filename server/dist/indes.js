"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
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
mongoose_1.default.connect(config.mongo.uri, config.mongo.options);
mongoose_1.default.connection.on('error', function (err) {
    console.error('MongoDB connection error: ' + err);
});
// Parsers for POST data
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// Cross Origin middleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', (req, res) => res.send('Hello World!'));
require('./routes')(app);
app.listen(config.port, () => console.log(`Example app listening on ${config.port}!`));
//# sourceMappingURL=indes.js.map