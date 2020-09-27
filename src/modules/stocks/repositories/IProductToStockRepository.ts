import ProductToStock from '@modules/products/infra/typeorm/entities/ProductToStock';
import IAddProductToStockDTO from '../dtos/IAddProductToStockDTO';

export default interface IProductToStockRepository {
  save(
    data: IAddProductToStockDTO[],
  ): Promise<(IAddProductToStockDTO & ProductToStock)[]>;
}
