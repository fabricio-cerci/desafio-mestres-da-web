import AppError from '@shared/errors/AppError';
import FakeStocksRepository from '../repositories/fakes/FakeStocksRepository';
import ShowStockProductsService from './ShowStockProductsService';

let fakeStocksRepository: FakeStocksRepository;
let showStockProductsService: ShowStockProductsService;

describe('Show stock', () => {
  beforeEach(() => {
    fakeStocksRepository = new FakeStocksRepository();
    showStockProductsService = new ShowStockProductsService(
      fakeStocksRepository,
    );
  });

  it('should be able to show a stock', async () => {
    const stock = await showStockProductsService.execute({ id: '1' });

    expect(stock).toBeTruthy();
  });

  it('should not be able to show a stock with invalid stock id', async () => {
    expect(
      showStockProductsService.execute({ id: '2' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
