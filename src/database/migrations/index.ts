import { MigrationObject } from '@mikro-orm/core';

import { Migration20230118161211 } from './Migration20230118161211';

const migrations = [
  Migration20230118161211,
];

export const migrationsList: MigrationObject[] = migrations.map(
  (migrationObject) => ({
    name: `${migrationObject.prototype.constructor.name}`,
    class: migrationObject,
  }),
);