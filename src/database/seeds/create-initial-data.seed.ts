import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';

import Brand from '../../models/Brand';
import ProductType from '../../models/ProductType';
import ProductAttribute from '../../models/ProductAttribute';
import ProductAttributeValue from '../../models/ProductAttributeValue';

export default class CreateInitialData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Brand)
      .values([
        { name: 'Tommy', description: 'Teste 123' },
        { name: 'Adidas', description: '///' },
        { name: 'Nike', description: 'Right' },
        { name: 'Lacoste', description: 'Alligator' },
        { name: 'Hurley', description: 'H' },
        { name: 'Dolce e Gabana', description: 'DG' },
        { name: 'Everlast', description: 'Fight' },
        { name: 'Brooksfield', description: 'Goose' },
        { name: 'Puma', description: 'puma' },
        { name: 'Calvin Klein', description: 'CK' },
      ])
      .execute();

    const { identifiers: productTypeIds } = await connection
      .createQueryBuilder()
      .insert()
      .into(ProductType)
      .values([
        { name: 'Camisa' },
        { name: 'Camiseta' },
        { name: 'Tênis' },
        { name: 'Bota' },
        { name: 'Sapato' },
        { name: 'Casaco' },
        { name: 'Moletom' },
        { name: 'Meia' },
        { name: 'Vestidos' },
        { name: 'Calça Jeans' },
      ])
      .execute();

    const { identifiers: productAttributeIds } = await connection
      .createQueryBuilder()
      .insert()
      .into(ProductAttribute)
      .values([
        { name: 'Tamanho', product_type_id: productTypeIds[0].id },
        { name: 'Cor', product_type_id: productTypeIds[1].id },
        { name: 'Tamanho', product_type_id: productTypeIds[2].id },
        { name: 'Cano', product_type_id: productTypeIds[3].id },
        { name: 'Tamanho', product_type_id: productTypeIds[4].id },
        { name: 'Tipo', product_type_id: productTypeIds[5].id },
        { name: 'Tamanho', product_type_id: productTypeIds[6].id },
        { name: 'Tipo', product_type_id: productTypeIds[7].id },
        { name: 'Tamanho', product_type_id: productTypeIds[8].id },
        { name: 'Tamanho', product_type_id: productTypeIds[9].id },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(ProductAttributeValue)
      .values([
        { value: 'P', product_attribute_id: productAttributeIds[0].id },
        { value: 'M', product_attribute_id: productAttributeIds[0].id },
        { value: 'G', product_attribute_id: productAttributeIds[0].id },
        { value: 'Branca', product_attribute_id: productAttributeIds[1].id },
        { value: 'Azul', product_attribute_id: productAttributeIds[1].id },
        { value: 'Laranja', product_attribute_id: productAttributeIds[1].id },
        { value: 'Vermelha', product_attribute_id: productAttributeIds[1].id },
        { value: '38', product_attribute_id: productAttributeIds[2].id },
        { value: '39', product_attribute_id: productAttributeIds[2].id },
        { value: '40', product_attribute_id: productAttributeIds[2].id },
        { value: 'Curto', product_attribute_id: productAttributeIds[3].id },
        { value: 'Longo', product_attribute_id: productAttributeIds[3].id },
        { value: '39', product_attribute_id: productAttributeIds[4].id },
        { value: '40', product_attribute_id: productAttributeIds[4].id },
        { value: '41', product_attribute_id: productAttributeIds[4].id },
        { value: '42', product_attribute_id: productAttributeIds[4].id },
        {
          value: 'Aberto com capuz',
          product_attribute_id: productAttributeIds[5].id,
        },
        {
          value: 'Aberto sem capuz',
          product_attribute_id: productAttributeIds[5].id,
        },
        {
          value: 'Fechado com capuz',
          product_attribute_id: productAttributeIds[5].id,
        },
        {
          value: 'Fechado sem capuz',
          product_attribute_id: productAttributeIds[5].id,
        },
        { value: 'P', product_attribute_id: productAttributeIds[6].id },
        { value: 'M', product_attribute_id: productAttributeIds[6].id },
        { value: 'G', product_attribute_id: productAttributeIds[6].id },
        { value: 'GG', product_attribute_id: productAttributeIds[6].id },
        {
          value: 'Cano Curto',
          product_attribute_id: productAttributeIds[7].id,
        },
        {
          value: 'Cano Longo',
          product_attribute_id: productAttributeIds[7].id,
        },
        { value: 'Comprida', product_attribute_id: productAttributeIds[7].id },
        { value: 'P', product_attribute_id: productAttributeIds[8].id },
        { value: 'M', product_attribute_id: productAttributeIds[8].id },
        { value: 'G', product_attribute_id: productAttributeIds[8].id },
        { value: 'GG', product_attribute_id: productAttributeIds[8].id },
        { value: 'P', product_attribute_id: productAttributeIds[9].id },
        { value: 'M', product_attribute_id: productAttributeIds[9].id },
        { value: 'G', product_attribute_id: productAttributeIds[9].id },
        { value: 'GG', product_attribute_id: productAttributeIds[9].id },
      ])
      .execute();
  }
}
