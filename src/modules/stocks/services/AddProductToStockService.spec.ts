import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FakeStocksRepository from '../repositories/fakes/FakeStocksRepository';
import FakeProductToStockRepository from '../repositories/fakes/FakeProductToStockRepository';
import AddProductToStockService from './AddProductToStockService';

let fakeProductsRepository: FakeProductsRepository;
let addProductToStockService: AddProductToStockService;
let fakeStocksRepository: FakeStocksRepository;
let fakeProductToStockRepository: FakeProductToStockRepository;

describe('Add Product to stock', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeStocksRepository = new FakeStocksRepository();
    fakeProductToStockRepository = new FakeProductToStockRepository();
    addProductToStockService = new AddProductToStockService(
      fakeProductsRepository,
      fakeStocksRepository,
      fakeProductToStockRepository,
    );
  });

  it('should be able to add a product to stock ', async () => {
    const productToStock = await addProductToStockService.execute({
      productIds: ['88218b81-93b0-4818-a605-0b77a832ea23'],
      stockId: '1',
    });

    expect(productToStock).toHaveLength(1);
  });

  it('should not be able to add a product to stock with invalid stockId', async () => {
    expect(
      addProductToStockService.execute({
        productIds: ['88218b81-93b0-4818-a605-0b77a832ea23'],
        stockId: '2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to add a product to stock with invalid productId', async () => {
    expect(
      addProductToStockService.execute({
        productIds: ['88218b81-93b0-4818-a605-0b77a832ea22'],
        stockId: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
