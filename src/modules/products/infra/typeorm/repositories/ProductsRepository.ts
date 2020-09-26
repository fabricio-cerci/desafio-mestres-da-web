import { getRepository, Repository } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import ISaveAttributeDTO from '@modules/products/dtos/ISaveAttributeDTO';

import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findBySku(sku: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { sku },
    });

    return product;
  }

  public async find(
    options?: Record<string, unknown>,
  ): Promise<Product[] | undefined> {
    const products = await this.ormRepository.find(options);

    return products;
  }

  public async findById(
    id: string,
    options?: Record<string, unknown>,
  ): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id, options);

    return product;
  }

  public async create({
    name,
    sku,
    description,
    price,
    brand_id,
    product_type_id,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      sku,
      description,
      price,
      brand_id,
      product_type_id,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }

  public async saveAttributes({
    product,
    attributes,
  }: ISaveAttributeDTO): Promise<Product> {
    product.productAttributeValues = attributes;

    await this.ormRepository.save(product);

    return product;
  }
}

export default ProductsRepository;
