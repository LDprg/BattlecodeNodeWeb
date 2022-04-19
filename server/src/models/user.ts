import {
    Schema,
    model,
    Document,
    PassportLocalDocument,
    PassportLocalSchema,
    PassportLocalModel,
    PassportLocalOptions,
    PassportLocalErrorMessages,
} from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
/*
const UserSchema = new Schema({   
    email: {type: String, required:true, unique:true},
    username : {type: String, unique: true, required:true},
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema as PassportLocalSchema);

export default User;*/

interface User extends PassportLocalDocument {
    _id: string;
    username: string;
    email: string;
    hash: string;
    salt: string;
    attempts: number;
    last: Date;
}

const UserSchema = new Schema({
    username: String,
    email: String,
    hash: String,
    salt: String,
    attempts: Number,
    last: Date,
}) as PassportLocalSchema;

UserSchema.plugin(passportLocalMongoose);

const User = model('User', UserSchema);

type _User = User;

declare global {
    namespace Express {
        // tslint:disable-next-line:no-padding no-empty-interface
        interface User extends _User {}
    }
}

export default User;