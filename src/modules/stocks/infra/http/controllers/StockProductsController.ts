import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AddProductToStockService from '@modules/stocks/services/AddProductToStockService';

import ShowStockProductsService from '@modules/stocks/services/ShowStockProductsService';

export default class StockProductsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showStockProductsService = container.resolve(
      ShowStockProductsService,
    );

    const stock = await showStockProductsService.execute({ id });

    return response.json(stock);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { productIds } = request.body;
    const { id } = request.params;

    const addProductToStockService = container.resolve(
      AddProductToStockService,
    );

    const stock = await addProductToStockService.execute({
      productIds,
      stockId: id,
    });

    return response.json(stock);
  }
}
