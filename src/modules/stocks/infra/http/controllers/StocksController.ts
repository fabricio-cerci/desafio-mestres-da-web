import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IndexStocksService from '@modules/stocks/services/IndexStocksService';

export default class StocksController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexStocksService = container.resolve(IndexStocksService);

    const stocks = await indexStocksService.execute();

    return response.json(stocks);
  }
}
