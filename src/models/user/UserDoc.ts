import { Document } from 'mongoose';
// An interface that describe the properties
// of User Document has  
export interface UserDoc extends Document {
  email: string,
  password: string
}