import { MikroORM } from '@mikro-orm/core';
import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class MigrationRunner implements OnApplicationBootstrap {
  constructor(@Inject(MikroORM) private readonly mikroOrm: MikroORM) {}

  async onApplicationBootstrap() {
    // uncomment the following line to perform the migration
    //await this.mikroOrm.getMigrator().up();
  }
}