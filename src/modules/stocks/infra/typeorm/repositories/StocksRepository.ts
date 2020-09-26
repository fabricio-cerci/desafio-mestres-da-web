import { getRepository, Repository } from 'typeorm';

import IStocksRepository from '@modules/stocks/repositories/IStocksRepository';

import Stock from '../entities/Stock';

class StocksRepository implements IStocksRepository {
  private ormRepository: Repository<Stock>;

  constructor() {
    this.ormRepository = getRepository(Stock);
  }

  public async find(
    options?: Record<string, unknown>,
  ): Promise<Stock[] | undefined> {
    const stocks = await this.ormRepository.find(options);

    return stocks;
  }

  public async findOne(
    id: string,
    options?: Record<string, unknown>,
  ): Promise<Stock | undefined> {
    const stock = await this.ormRepository.findOne(id, options);

    return stock;
  }

  public async findById(id: string): Promise<Stock | undefined> {
    const stock = await this.ormRepository.findOne(id, {
      relations: ['productToStocks'],
    });

    return stock;
  }
}

export default StocksRepository;
