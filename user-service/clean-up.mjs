import { PrismaConfigs } from './app.config.mjs';
import { Logger } from './services/logger/logger.mjs';

const cleanUp = async (eventType, eventDetails) => {
  Logger.log('info', `Server is stop from event::${eventType}`, eventDetails);

  if (PrismaConfigs.ENABLE_PRISMA) {
    await Prisma.disconnect();
    Logger.log('info', `Prisma connection closed`);
  }

  process.exit();
};

export { cleanUp };

