import IBrandsRepository from '@modules/products/repositories/IBrandsRepository';

import Brand from '../../infra/typeorm/entities/Brand';

class ProductTypesRepository implements IBrandsRepository {
  private brands: Brand[] = [
    {
      id: '0cb45f9e-947b-4fc1-9010-84b1605ce4f0',
      name: 'Tommy',
      description: 'HILIFIGER',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  public async findById(id: string): Promise<Brand | undefined> {
    const foundBrand = this.brands.find(brand => brand.id === id);

    return foundBrand;
  }
}

export default ProductTypesRepository;
