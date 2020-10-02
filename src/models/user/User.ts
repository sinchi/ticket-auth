import mongoose, { Schema } from 'mongoose';

import { UserDoc, UserModel, UserAttrs } from '.'
import { Password } from '../../services/Password';

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

userSchema.pre('save', async function(done){
  if(this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
})

userSchema.statics.buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


export { User }
