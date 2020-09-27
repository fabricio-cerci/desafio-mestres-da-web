import IProductAttributeValuesRepository from '@modules/products/repositories/IProductAttributeValuesRepository';

import ProductAttributeValue from '../../infra/typeorm/entities/ProductAttributeValue';

class ProductAttributeValuesRepository
  implements IProductAttributeValuesRepository {
  private productAttributeValues: ProductAttributeValue[] = [
    {
      id: '50715a7d-d599-480f-9fa3-a63dbf50dd41',
      value: 'P',
      product_attribute_id: '6bc48ec5-14ec-4e50-898c-0314b2d5120e',
      product_attribute: {
        id: '6bc48ec5-14ec-4e50-898c-0314b2d5120e',
        name: 'Tamanho',
        product_type_id: '88218b81-93b0-4818-a605-0b77a832ea08',
        product_type: {
          id: '88218b81-93b0-4818-a605-0b77a832ea08',
          name: 'Camisa',
          description: 'CAMISA',
          created_at: new Date(),
          updated_at: new Date(),
        },
        created_at: new Date(),
        updated_at: new Date(),
      },
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 'af943b55-8c9c-404a-be77-883c3210fcda',
      value: 'M',
      product_attribute_id: '6bc48ec5-14ec-4e50-898c-0314b2d5120e',
      product_attribute: {
        id: '6bc48ec5-14ec-4e50-898c-0314b2d5120e',
        name: 'Tamanho',
        product_type_id: '88218b81-93b0-4818-a605-0b77a832ea08',
        product_type: {
          id: '88218b81-93b0-4818-a605-0b77a832ea08',
          name: 'Camisa',
          description: 'CAMISA',
          created_at: new Date(),
          updated_at: new Date(),
        },
        created_at: new Date(),
        updated_at: new Date(),
      },
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  public async findByIds(
    ids: string[],
  ): Promise<ProductAttributeValue[] | undefined> {
    const foundProductAttributeValues = this.productAttributeValues.filter(
      productAttributeValue => ids.includes(productAttributeValue.id),
    );

    return foundProductAttributeValues;
  }
}

export default ProductAttributeValuesRepository;
