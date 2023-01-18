import { BeforeCreate, Property } from '@mikro-orm/core';

import { BaseSoftDeletable } from './base-soft-deletable.model';

export class User extends BaseSoftDeletable {

	@Property()
	email: string;

  @Property()
	firstName: string;

  @Property()
	lastName: string;
}