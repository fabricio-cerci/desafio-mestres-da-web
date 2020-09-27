import AppError from '@shared/errors/AppError';
import FakeStocksRepository from '../repositories/fakes/FakeStocksRepository';
import FakeUndefinedStocksRepository from '../repositories/fakes/FakeUndefinedStocksRepository';
import IndexStocksService from './IndexStocksService';

let fakeStocksRepository: FakeStocksRepository;
let fakeUndefinedStocksRepository: FakeUndefinedStocksRepository;
let indexStocksService: IndexStocksService;
let indexUndefinedStocksService: IndexStocksService;

describe('Index stocks', () => {
  beforeEach(() => {
    fakeStocksRepository = new FakeStocksRepository();
    fakeUndefinedStocksRepository = new FakeUndefinedStocksRepository();
    indexStocksService = new IndexStocksService(fakeStocksRepository);
    indexUndefinedStocksService = new IndexStocksService(
      fakeUndefinedStocksRepository,
    );
  });

  it('should be able to index stocks', async () => {
    const stocks = await indexStocksService.execute();

    expect(stocks).toBeTruthy();
  });

  it('should not be able to return undefined', async () => {
    expect(indexUndefinedStocksService.execute()).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
