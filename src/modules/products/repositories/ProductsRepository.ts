import { EntityRepository, Repository } from 'typeorm';

import Product from '../infra/typeorm/entities/Product';

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  public async findBySku(sku: string): Promise<Product | null> {
    const findProduct = await this.findOne({
      where: { sku },
    });

    return findProduct || null;
  }
}

export default ProductRepository;
