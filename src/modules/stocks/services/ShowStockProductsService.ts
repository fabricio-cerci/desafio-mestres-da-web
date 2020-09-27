import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStocksRepository from '@modules/stocks/repositories/IStocksRepository';

import Stock from '../infra/typeorm/entities/Stock';

interface IRequest {
  id: string;
}

@injectable()
class ShowStockProductsService {
  constructor(
    @inject('StocksRepository')
    private stocksRepository: IStocksRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Stock> {
    const stock = await this.stocksRepository.findOne(id, {
      relations: ['productToStocks'],
    });

    if (!stock) {
      throw new AppError('Stock does not exist');
    }

    return stock;
  }
}

export default ShowStockProductsService;
