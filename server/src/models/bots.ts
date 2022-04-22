import {
    Schema,
    model,
} from 'mongoose';

const BotsSchema = new Schema({
    userid: String,
    link: String,
    tag: String
});

const Bots = model('bots', BotsSchema);

export default Bots;