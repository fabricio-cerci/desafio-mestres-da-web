import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class RelationProductStock21601062275483
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product_to_stock',
        columns: [
          {
            name: 'productToStockId',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'productId',
            type: 'uuid',
          },
          {
            name: 'stockId',
            type: 'uuid',
          },
          {
            name: 'entry_date',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'leave_date',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'product_to_stock',
      new TableForeignKey({
        name: 'Product',
        columnNames: ['productId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'product_to_stock',
      new TableForeignKey({
        name: 'Stock',
        columnNames: ['stockId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'stocks',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('product_to_stock', 'Product');

    await queryRunner.dropForeignKey('product_to_stock', 'Stock');

    await queryRunner.dropTable('product_to_stock');
  }
}
