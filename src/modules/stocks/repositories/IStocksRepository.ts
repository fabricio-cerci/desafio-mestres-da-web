import Stock from '../infra/typeorm/entities/Stock';

export default interface IStocksInterface {
  find(options?: Record<string, unknown>): Promise<Stock[] | undefined>;
  findById(id: string): Promise<Stock | undefined>;
  findOne(
    id: string,
    options?: Record<string, unknown>,
  ): Promise<Stock | undefined>;
}
