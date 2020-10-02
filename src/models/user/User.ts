import mongoose, { Schema } from 'mongoose';

import { UserDoc, UserModel, UserAttrs } from '.'

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.statics.buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


export { User }