import { MongoDBConfigs } from '../../app.config.mjs';
import { Logger } from '../logger/logger.mjs';
import * as mongoose from 'mongoose';

const disconnect = async () => {
  await mongoose.disconnect();
};

const bootstrap = async () => {
  if (MongoDBConfigs.ENABLE_MONGO) {
    try {
      await mongoose.connect(MongoDBConfigs.MONGO_URI);
      Logger.log('info', `Mongoose is ready to use`);
    } catch (error) {
      Logger.log('error', `Can't connect to MongoDB due to: ${JSON.stringify(error)}`);
    }
  }
};

export { bootstrap, disconnect, mongoose };
