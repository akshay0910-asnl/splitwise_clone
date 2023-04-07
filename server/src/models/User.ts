import { Schema, model } from 'mongoose';

// interface IUser {
//     name: string;
//     email: string;
//     password: string;
// }

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,

    },
},{
    timestamps: true
});

const userModel = model('user', userSchema);

export default userModel;