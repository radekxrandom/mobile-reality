import { Migration } from '@mikro-orm/migrations';

export class Migration20230118161211 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      this.getKnex()
        .schema.createTable('user', function (table) {
          table.uuid('id').primary();
          table.string('email');
          table.string('firstName');
          table.string('lastName');
          table.dateTime('deleted_at').nullable();
          table.timestamps(true, true);
        })
        .toQuery(),
    );
  }

  async down(): Promise<void> {}
}