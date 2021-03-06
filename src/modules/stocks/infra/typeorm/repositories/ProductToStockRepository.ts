import { getRepository, Repository } from 'typeorm';

import IProductToStockRepository from '@modules/stocks/repositories/IProductToStockRepository';
import IAddProductToStockDTO from '@modules/stocks/dtos/IAddProductToStockDTO';

import ProductToStock from '@modules/products/infra/typeorm/entities/ProductToStock';

class ProductToStockRepository implements IProductToStockRepository {
  private ormRepository: Repository<ProductToStock>;

  constructor() {
    this.ormRepository = getRepository(ProductToStock);
  }

  public async save(
    data: IAddProductToStockDTO[],
  ): Promise<(IAddProductToStockDTO & ProductToStock)[]> {
    const productToStock = await this.ormRepository.save(data);

    return productToStock;
  }
}

export default ProductToStockRepository;
