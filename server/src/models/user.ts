import {
    Schema,
    model,
    PassportLocalDocument,
    PassportLocalSchema
} from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

interface User extends PassportLocalDocument {
    _id: string;
    username: string;
    email: string;
    hash: string;
    salt: string;
}

const UserSchema = new Schema({
    username: String,
    email: String,
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