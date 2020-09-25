import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class RelationAttributeValueProduct1601002590917
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products_product_attribute_values_product_attribute_values',
        columns: [
          {
            name: 'productAttributeValuesId',
            type: 'uuid',
          },
          {
            name: 'productsId',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'products_product_attribute_values_product_attribute_values',
      new TableForeignKey({
        name: 'ProductAttributeValue',
        columnNames: ['productAttributeValuesId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_attribute_values',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'products_product_attribute_values_product_attribute_values',
      new TableForeignKey({
        name: 'Product',
        columnNames: ['productsId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'products_product_attribute_values_product_attribute_values',
      'ProductAttributeValue',
    );

    await queryRunner.dropForeignKey(
      'products_product_attribute_values_product_attribute_values',
      'Product',
    );

    await queryRunner.dropTable(
      'products_product_attribute_values_product_attribute_values',
    );
  }
}
