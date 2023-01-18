import { Logger } from '@nestjs/common';

import { BaseSoftDeletable } from '../users/models/base-soft-deletable.model';
import { User } from '../users/models/user.model';
import { BaseModel } from '../users/models/base.model';

const mikroOrmConfigFactory = (config, migrationsList) => {
  const logger = new Logger('MikroORM');
  const mikroOrmOptions = {
    ssl: { rejectUnauthorized: false },
    forceUtcTimezone: true,
    entities: [
      BaseModel,
      BaseSoftDeletable,
      User
    ],
    type: 'postgresql',
    debug: true,
    logger: logger.log.bind(logger),
    dbName: 'dbname',
    user: 'user',
    password: 'password',
    migrations: {
      migrationsList,
    },
    filters: {
      isNotDeleted: {
        cond: { deletedAt: { $eq: null } },
      },
    },
  };
  return mikroOrmOptions;
};

export default mikroOrmConfigFactory;