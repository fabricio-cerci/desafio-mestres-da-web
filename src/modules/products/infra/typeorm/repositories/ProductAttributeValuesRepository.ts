import { getRepository, Repository } from 'typeorm';

import IProductAttributeValuesRepository from '@modules/products/repositories/IProductAttributeValuesRepository';

import ProductAttributeValue from '../entities/ProductAttributeValue';

class ProductAttributeValuesRepository
  implements IProductAttributeValuesRepository {
  private ormRepository: Repository<ProductAttributeValue>;

  constructor() {
    this.ormRepository = getRepository(ProductAttributeValue);
  }

  public async findByIds(
    ids: string[],
  ): Promise<ProductAttributeValue[] | undefined> {
    const productAttribute = await this.ormRepository.findByIds(ids);

    return productAttribute;
  }
}

export default ProductAttributeValuesRepository;
