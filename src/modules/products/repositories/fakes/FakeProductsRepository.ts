import { v4 as uuid } from 'uuid';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import ISaveAttributeDTO from '@modules/products/dtos/ISaveAttributeDTO';

import Product from '../../infra/typeorm/entities/Product';

class ProductsRepository implements IProductsRepository {
  private products: Product[] = [
    {
      id: '88218b81-93b0-4818-a605-0b77a832ea23',
      name: 'Camisa Ricky and Morty',
      sku: 'CABKMW1',
      description: 'CAMISA BRANCA DA BROOKSFIELD DO RICK MORTY',
      price: 40.0,
      product_type_id: '88218b81-93b0-4818-a605-0b77a832ea08',
      brand_id: '0cb45f9e-947b-4fc1-9010-84b1605ce4f0',
      product_type: {
        id: '88218b81-93b0-4818-a605-0b77a832ea08',
        name: 'Camisa',
        description: 'CAMISA',
        created_at: new Date(),
        updated_at: new Date(),
      },
      brand: {
        id: '0cb45f9e-947b-4fc1-9010-84b1605ce4f0',
        name: 'Tommy',
        description: 'HILIFIGER',
        created_at: new Date(),
        updated_at: new Date(),
      },
      productAttributeValues: [],
      productToStocks: [],
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  public async findBySku(sku: string): Promise<Product | undefined> {
    const foundProduct = this.products.find(
      productFilter => productFilter.sku === sku,
    );

    return foundProduct;
  }

  public async find(): Promise<Product[] | undefined> {
    return this.products;
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
