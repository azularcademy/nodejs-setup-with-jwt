
import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName: {
        type: String,
        default: null
    },
    middleName: {
        type: String,
        default: null
    },
    lastName: {
        type: String,
        default: null
    },
    fullName: {
        type: String,
        default: null
    },
    password: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null,
        unique:true
    },
}, { timestamps: true });

userSchema.path('email').validate(async (value) => {
    const emailCount = await mongoose.models.User.countDocuments({email: value });
    return !emailCount;
  }, 'Email already exists');

export default mongoose.model('User', userSchema);