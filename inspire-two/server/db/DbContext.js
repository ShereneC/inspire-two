import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { TaskSchema } from '../models/Task'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Tasks = mongoose.model('Task', TaskSchema);
}

export const dbContext = new DbContext()
