import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EditUsersTables extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('name').alter();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
