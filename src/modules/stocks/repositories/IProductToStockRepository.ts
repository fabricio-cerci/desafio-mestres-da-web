import IAddProductToStockDTO from '../dtos/IAddProductToStockDTO';

export default interface IProductToStockRepository {
  save(data: IAddProductToStockDTO[]): Promise<void>;
}
