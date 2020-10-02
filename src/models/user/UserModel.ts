import { Model } from 'mongoose';
import { UserDoc } from './UserDoc';
import { UserAttrs } from './UserAttrs';

// An interface that describe the properties
// of User Model has  
export interface UserModel extends Model<UserDoc> {

  buildUser(attrs: UserAttrs): UserDoc;
}
