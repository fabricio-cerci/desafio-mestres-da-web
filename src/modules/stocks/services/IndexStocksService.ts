import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStocksRepository from '@modules/stocks/repositories/IStocksRepository';

import Stock from '../infra/typeorm/entities/Stock';

@injectable()
class IndexStocksService {
  constructor(
    @inject('StocksRepository')
    private stocksRepository: IStocksRepository,
  ) {}

  public async execute(): Promise<Stock[]> {
    const stocks = await this.stocksRepository.find();

    if (!stocks) {
      throw new AppError('Stocks does not exist');
    }

    return stocks;
  }
}

export default IndexStocksService;
