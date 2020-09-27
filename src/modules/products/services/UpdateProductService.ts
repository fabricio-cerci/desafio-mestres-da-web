import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import IProductTypesRepository from '@modules/products/repositories/IProductTypesRepository';
import IBrandsRepository from '../repositories/IBrandsRepository';
import IProductAttributesRepository from '../repositories/IProductAttributesRepository';
import IProductAttributeValuesRepository from '../repositories/IProductAttributeValuesRepository';

import Product from '../infra/typeorm/entities/Product';

interface IAttribute {
  id: string;
  values_ids: string[];
}

interface IRequest {
  name?: string;
  sku?: string;
  description?: string;
  price?: number;
  product_type_id?: string;
  brand_id?: string;
  productId: string;
  attributes?: IAttribute[];
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('ProductTypesRepository')
    private productTypesRepository: IProductTypesRepository,
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,
    @inject('ProductAttributesRepository')
    private productAttributesRepository: IProductAttributesRepository,
    @inject('ProductAttributeValuesRepository')
    private productAttributeValuesRepository: IProductAttributeValuesRepository,
  ) {}

  public async execute({
    name,
    sku,
    description,
    price,
    product_type_id,
    productId,
    brand_id,
    attributes,
  }: IRequest): Promise<Product> {
    let product = await this.productsRepository.findById(productId, {
      relations: ['product_type', 'productAttributeValues'],
    });

    if (!product) {
      throw new AppError('Product does not exist');
    }

    if (name) {
      product.name = name;
    }

    if (sku) {
      const foundWithSameSku = await this.productsRepository.findBySku(sku);

      if (foundWithSameSku) {
        throw new AppError('This sku already exists');
      }

      product.sku = sku;
    }

    if (description) {
      product.description = description;
    }

    if (product_type_id) {
      const existProductType = await this.productTypesRepository.findById(
        product_type_id,
      );

      if (!existProductType) {
        throw new AppError('Product Type does not exist');
      }

      product.product_type_id = product_type_id;
    }

    if (brand_id) {
      const existBrand = await this.brandsRepository.findById(brand_id);

      if (!existBrand) {
        throw new AppError('Brand does not exist');
      }

      product.brand_id = brand_id;
    }

    if (price) {
      if (price < 0) {
        throw new AppError('Invalid price');
      }

      product.price = price;
    }

    if (attributes && attributes.length > 0) {
      const attributesValuesPromise = attributes.map(async attribute => {
        const attributeData = await this.productAttributesRepository.findById(
          attribute.id,
        );

        if (!attributeData) {
          throw new AppError('Invalid attribute');
        }

        if (product?.product_type_id !== attributeData.product_type_id) {
          throw new AppError('Incorrect product type');
        }

        const attributeValues = await this.productAttributeValuesRepository.findByIds(
          attribute.values_ids,
        );

        if (!attributeValues || attributeValues.length === 0) {
          throw new AppError('Incorrect or empty  attribute value');
        }

        return attributeValues;
      });

      const attributesValues = await Promise.all(attributesValuesPromise);

      const attributesValuesReduced = attributesValues.reduce((arr, e) =>
        arr.concat(e),
      );

      product = await this.productsRepository.saveAttributes({
        product,
        attributes: attributesValuesReduced,
      });
    }

    return product;
  }
}

export default UpdateProductService;
