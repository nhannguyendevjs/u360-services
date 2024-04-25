import * as MongooseService from '../services/mongoose/mongoose.mjs';

const UsersModel = MongooseService.mongoose.model(
  'Users',
  new MongooseService.mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    accountId: MongooseService.mongoose.Types.ObjectId,
    role: String,
    avatar: String,
  })
);

export default UsersModel;
