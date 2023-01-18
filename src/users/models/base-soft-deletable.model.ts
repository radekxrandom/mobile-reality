import { Property } from '@mikro-orm/core';

import { BaseModel } from './base.model';

export abstract class BaseSoftDeletable extends BaseModel {
  @Property()
  deletedAt: Date;

  setAsDeleted(): void {
    this.deletedAt = new Date();
			  }
}