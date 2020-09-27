import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import FakeUndefinedProductsRepository from '../repositories/fakes/FakeUndefinedProductsRepository';
import IndexProductsService from './IndexProductsService';

let fakeProductsRepository: FakeProductsRepository;
let fakeUndefinedProductsRepository: FakeUndefinedProductsRepository;
let indexProductsService: IndexProductsService;
let indexUndefinedProductsService: IndexProductsService;

describe('Index Product', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    indexProductsService = new IndexProductsService(fakeProductsRepository);
    fakeUndefinedProductsRepository = new FakeUndefinedProductsRepository();
    indexUndefinedProductsService = new IndexProductsService(
      fakeUndefinedProductsRepository,
    );
  });

  it('should be able to index products', async () => {
    const products = await indexProductsService.execute();

    expect(products).toBeTruthy();
  });

  it('should be not able to return undefined', async () => {
    expect(indexUndefinedProductsService.execute()).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
