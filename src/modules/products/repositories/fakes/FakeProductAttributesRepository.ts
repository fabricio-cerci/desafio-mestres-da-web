import IProductAttributesRepository from '@modules/products/repositories/IProductAttributesRepository';

import ProductAttribute from '../../infra/typeorm/entities/ProductAttribute';

class ProductAttributesRepository implements IProductAttributesRepository {
  private productAttributes: ProductAttribute[] = [
    {
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
    {
      id: '6bc48ec5-14ec-4e50-898c-0314b2d51220',
      name: 'Tamanho',
      product_type_id: '88218b81-93b0-4818-a605-0b77a832ea20',
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
  ];

  public async findById(id: string): Promise<ProductAttribute | undefined> {
    const foundProductAttributes = this.productAttributes.find(
      productAttribute => productAttribute.id === id,
    );

    return foundProductAttributes;
  }
}

export default ProductAttributesRepository;
