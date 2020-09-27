import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import DeleteProductService from './DeleteProductService';

let fakeProductsRepository: FakeProductsRepository;
let deleteProductService: DeleteProductService;

describe('Delete Product', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    deleteProductService = new DeleteProductService(fakeProductsRepository);
  });

  it('should be able to delete a product', async () => {
    const products = await fakeProductsRepository.find();

    await deleteProductService.execute({
      productId: '88218b81-93b0-4818-a605-0b77a832ea23',
    });

    const foundProduct = products?.find(
      product => product.id === '88218b81-93b0-4818-a605-0b77a832ea23',
    );

    expect(foundProduct).toBeUndefined();
  });

  it('should be not able to delete with a invalid product', async () => {
    expect(
      deleteProductService.execute({
        productId: '88218b81-93b0-4818-a605-0b77a832ea20',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
