import { v4 as uuid } from 'uuid';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import ISaveAttributeDTO from '@modules/products/dtos/ISaveAttributeDTO';

import Product from '../../infra/typeorm/entities/Product';

class ProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async findBySku(sku: string): Promise<Product | undefined> {
    const foundProduct = this.products.find(
      productFilter => productFilter.sku === sku,
    );

    return foundProduct;
  }

  public async find(): Promise<Product[] | undefined> {
    return undefined;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const foundProduct = this.products.find(
      productFilter => productFilter.id === id,
    );

    return foundProduct;
  }

  public async create({
    name,
    sku,
    description,
    price,
    brand_id,
    product_type_id,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      id: uuid(),
      name,
      sku,
      description,
      price,
      brand_id,
      product_type_id,
    });

    this.products.push(product);

    return product;
  }

  public async remove(product: Product): Promise<void> {
    const productIndex = this.products.findIndex(
      productFilter => productFilter.id === product.id,
    );

    this.products.splice(productIndex, 1);
  }

  public async saveAttributes({
    product,
    attributes,
  }: ISaveAttributeDTO): Promise<Product> {
    const productIndex = this.products.findIndex(
      productFilter => productFilter.id === product.id,
    );

    let foundProduct = this.products[productIndex];

    product.productAttributeValues = attributes;
    foundProduct = product;

    return foundProduct;
  }
}

export default ProductsRepository;
