import { getRepository, Repository } from 'typeorm';

import IProductTypesRepository from '@modules/products/repositories/IProductTypesRepository';

import ProductType from '../entities/ProductType';

class ProductTypesRepository implements IProductTypesRepository {
  private ormRepository: Repository<ProductType>;

  constructor() {
    this.ormRepository = getRepository(ProductType);
  }

  public async findById(id: string): Promise<ProductType | undefined> {
    const productType = await this.ormRepository.findOne(id);

    return productType;
  }
}

export default ProductTypesRepository;
