import { getCustomRepository, getRepository } from 'typeorm';

import Product from '../models/Product';
import ProductsRepository from '../repositories/ProductsRepository';
import ProductAttribute from '../models/ProductAttribute';
import ProductAttributeValue from '../models/ProductAttributeValue';
import ProductType from '../models/ProductType';
import Brand from '../models/Brand';

import AppError from '../errors/AppError';

interface Attribute {
  id: string;
  values_ids: string[];
}

interface Request {
  name?: string;
  sku?: string;
  description?: string;
  price?: number;
  product_type_id?: string;
  brand_id?: string;
  productId: string;
  attributes?: Attribute[];
}

class UpdateProductService {
  public async execute({
    name,
    sku,
    description,
    price,
    product_type_id,
    productId,
    brand_id,
    attributes,
  }: Request): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const productAttributesRepository = getRepository(ProductAttribute);
    const productAttributeValuesRepository = getRepository(
      ProductAttributeValue,
    );
    const productTypeRepository = getRepository(ProductType);
    const brandRepository = getRepository(Brand);

    const product = await productsRepository.findOne(productId, {
      relations: ['product_type', 'productAttributeValues'],
    });

    if (!product) {
      throw new AppError('Product does not exist');
    }

    if (name) {
      product.name = name;
    }

    if (sku) {
      const foundWithSameSku = await productsRepository.findBySku(sku);

      if (foundWithSameSku) {
        throw new AppError('This sku already exists');
      }

      product.sku = sku;
    }

    if (description) {
      product.description = description;
    }

    if (product_type_id) {
      const existProductType = await productTypeRepository.findOne(
        product_type_id,
      );

      if (!existProductType) {
        throw new AppError('Product Type does not exist');
      }

      product.product_type_id = product_type_id;
    }

    if (brand_id) {
      const existBrand = await brandRepository.findOne(brand_id);

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

    if (attributes) {
      const attributesValuesPromise = attributes.map(async attribute => {
        const attributeData = await productAttributesRepository.findOne(
          attribute.id,
        );

        if (!attributeData) {
          throw new AppError('Invalid attribute');
        }

        if (product.product_type_id !== attributeData.product_type_id) {
          throw new AppError('Incorrect product type');
        }

        const attributeValues = await productAttributeValuesRepository.findByIds(
          attribute.values_ids,
        );

        if (!attributeValues) {
          throw new AppError('Incorrect attribute value');
        }

        return attributeValues;
      });

      const attributesValues = await Promise.all(attributesValuesPromise);

      const attributesValuesReduced = attributesValues.reduce((arr, e) =>
        arr.concat(e),
      );

      product.productAttributeValues = attributesValuesReduced;
    }

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
