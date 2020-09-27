import IStocksRepository from '@modules/stocks/repositories/IStocksRepository';

import Stock from '../../infra/typeorm/entities/Stock';

class StocksRepository implements IStocksRepository {
  private stocks: Stock[] = [
    {
      id: '1',
      name: 'Estoque teste',
      created_at: new Date(),
      updated_at: new Date(),
      productToStocks: [],
    },
  ];

  public async find(): Promise<Stock[] | undefined> {
    return this.stocks;
  }

  public async findOne(id: string): Promise<Stock | undefined> {
    const foundStocks = this.stocks.find(stockFilter => stockFilter.id === id);

    return foundStocks;
  }

  public async findById(id: string): Promise<Stock | undefined> {
    const foundStocks = this.stocks.find(stockFilter => stockFilter.id === id);

    return foundStocks;
  }
}

export default StocksRepository;
