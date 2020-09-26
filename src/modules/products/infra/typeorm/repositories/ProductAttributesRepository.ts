import { getRepository, Repository } from 'typeorm';

import IProductAttributesRepository from '@modules/products/repositories/IProductAttributesRepository';

import ProductAttribute from '../entities/ProductAttribute';

class ProductAttributesRepository implements IProductAttributesRepository {
  private ormRepository: Repository<ProductAttribute>;

  constructor() {
    this.ormRepository = getRepository(ProductAttribute);
  }

  public async findById(id: string): Promise<ProductAttribute | undefined> {
    const productAttribute = await this.ormRepository.findOne(id);

    return productAttribute;
  }
}

export default ProductAttributesRepository;
