import IProductTypesRepository from '@modules/products/repositories/IProductTypesRepository';

import ProductType from '../../infra/typeorm/entities/ProductType';

class ProductTypesRepository implements IProductTypesRepository {
  private productTypes: ProductType[] = [
    {
      id: '88218b81-93b0-4818-a605-0b77a832ea08',
      name: 'Camisa',
      description: 'CAMISA',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '88218b81-93b0-4818-a605-0b77a832ea20',
      name: 'Camiseta',
      description: 'CAMISA',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  public async findById(id: string): Promise<ProductType | undefined> {
    const foundProductType = this.productTypes.find(
      productType => productType.id === id,
    );

    return foundProductType;
  }
}

export default ProductTypesRepository;
