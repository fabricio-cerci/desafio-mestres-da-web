import { getRepository, Repository } from 'typeorm';

import IBrandsRepository from '@modules/products/repositories/IBrandsRepository';

import Brand from '../entities/Brand';

class ProductTypesRepository implements IBrandsRepository {
  private ormRepository: Repository<Brand>;

  constructor() {
    this.ormRepository = getRepository(Brand);
  }

  public async findById(id: string): Promise<Brand | undefined> {
    const brand = await this.ormRepository.findOne(id);

    return brand;
  }
}

export default ProductTypesRepository;
