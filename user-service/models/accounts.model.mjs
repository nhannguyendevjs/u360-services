import * as MongooseService from '../services/mongoose/mongoose.mjs';

const AccountsModel = MongooseService.mongoose.model(
  'Accounts',
  new MongooseService.mongoose.Schema({
    username: String,
    password: {
      iv: String,
      content: String,
    },
  })
);

export default AccountsModel;
