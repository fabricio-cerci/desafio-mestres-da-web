import Product from '../infra/typeorm/entities/Product';
import ICreateProductDTO from '../dtos/ICreateProductDTO';
import ISaveProductDTO from '../dtos/ISaveAttributeDTO';

interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  findById(
    id: string,
    options?: Record<string, unknown>,
  ): Promise<Product | undefined>;
  find(options?: Record<string, unknown>): Promise<Product[] | undefined>;
  remove(product: Product): Promise<void>;
  saveAttributes(data: ISaveProductDTO): Promise<Product>;
  findBySku(sku: string): Promise<Product | undefined>;
}

export default IProductsRepository;
