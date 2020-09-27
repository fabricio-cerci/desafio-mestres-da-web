import AppError from '@shared/errors/AppError';
import FakeBrandsRepository from '../repositories/fakes/FakeBrandsRepository';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import FakeProductTypesRepository from '../repositories/fakes/FakeProductTypesRepository';
import FakeProductAttributesRepository from '../repositories/fakes/FakeProductAttributesRepository';
import FakeProductAttributeValuesRepository from '../repositories/fakes/FakeProductAttributeValuesRepository';
import CreateProductService from './CreateProductService';

let fakeBrandsRepository: FakeBrandsRepository;
let fakeProductsRepository: FakeProductsRepository;
let fakeProductTypesRepository: FakeProductTypesRepository;
let fakeProductAttributesRepository: FakeProductAttributesRepository;
let fakeProductAttributeValuesRepository: FakeProductAttributeValuesRepository;
let createProductService: CreateProductService;

describe('Create Product', () => {
  beforeEach(() => {
    fakeBrandsRepository = new FakeBrandsRepository();
    fakeProductsRepository = new FakeProductsRepository();
    fakeProductTypesRepository = new FakeProductTypesRepository();
    fakeProductAttributesRepository = new FakeProductAttributesRepository();
    fakeProductAttributeValuesRepository = new FakeProductAttributeValuesRepository();
    createProductService = new CreateProductService(
      fakeProductsRepository,
      fakeProductTypesRepository,
      fakeBrandsRepository,
      fakeProductAttributesRepository,
      fakeProductAttributeValuesRepository,
    );
  });

  it('should be able to create a new product without attribute', async () => {
    const product = await createProductService.execute({
      name: 'Camisa Ricky and Morty',
      sku: 'CABKMW2',
      description: 'CAMISA BRANCA DA BROOKSFIELD DO RICK MORTY',
      price: 40.0,
      product_type_id: '88218b81-93b0-4818-a605-0b77a832ea08',
      brand_id: '0cb45f9e-947b-4fc1-9010-84b1605ce4f0',
    });

    expect(product).toHaveProperty('id');
    expect(product.brand_id).toBe('0cb45f9e-947b-4fc1-9010-84b1605ce4f0');
    expect(product.product_type_id).toBe(
      '88218b81-93b0-4818-a605-0b77a832ea08',
    );
  });

  it('should be able to create a new product with attribute', async () => {
    const product = await createProductService.execute({
      name: 'Camisa Ricky and Morty',
      sku: 'CABKMW2',
      description: 'CAMISA BRANCA DA BROOKSFIELD DO RICK MORTY',
      price: 40.0,
      product_type_id: '88218b81-93b0-4818-a605-0b77a832ea08',
      brand_id: '0cb45f9e-947b-4fc1-9010-84b1605ce4f0',
      attributes: [
        {
          id: '6bc48ec5-14ec-4e50-898c-0314b2d5120e',
          values_ids: [
            '50715a7d-d599-480f-9fa3-a63dbf50dd41',
            'af943b55-8c9c-404a-be77-883c3210fcda',
          ],
        },
      ],
    });

    expect(product).toHaveProperty('id');
    expect(product.brand_id).toBe('0cb45f9e-947b-4fc1-9010-84b1605ce4f0');
    expect(product.product_type_id).toBe(
      '88218b81-93b0-4818-a605-0b77a832ea08',
    );
    expect(product.productAttributeValues).toHaveLength(2);
  });

  it('should not be able to create a new product without attribute and with inexistent product type', async () => {
    expect(
      createProductService.execute({
        name: 'Camisa Ricky and Morty',
        sku: 'CABKMW2',
        description: 'CAMISA BRANCA DA BROOKSFIELD DO RICK MORTY',
        price: 40.0,
        product_type_id: '88218b81-93b0-4818-a605-21',
        brand_id: '0cb45f9e-947b-4fc1-9010-84b1605ce4f0',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new product without attribute and with inexistent brand', async () => {
    expect(
      createProductService.execute({
        name: 'Camisa Ricky and Morty',
        sku: 'CABKMW2',
        description: 'CAMISA BRANCA DA BROOKSFIELD DO RICK MORTY',
        price: 40.0,
        product_type_id: '88218b81-93b0-4818-a605-0b77a832ea08',
        brand_id: '0cb45f9e-947b-4fc1-9010-84b1605ce420',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new product without attribute with repeated sku', async () => {
    expect(
      createProductService.execute({
        name: 'Camisa Ricky and Morty',
        sku: 'CABKMW1',
        description: 'CAMISA BRANCA DA BROOKSFIELD DO RICK MORTY',
        price: 40.0,
        product_type_id: '88218b81-93b0-4818-a605-0b77a832ea08',
        brand_id: '0cb45f9e-947b-4fc1-9010-84b1605ce420',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new product without attribute and negative price', async () => {
    expect(
      createProductService.execute({
        name: 'Camisa Ricky and Morty',
        sku: 'CABKMW2',
        description: 'CAMISA BRANCA DA BROOKSFIELD DO RICK MORTY',
        price: -40.0,
        product_type_id: '88218b81-93b0-4818-a605-0b77a832ea08',
        brand_id: '0cb45f9e-947b-4fc1-9010-84b1605ce4f0',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new product with invalid attribute', async () => {
    expect(
      createProductService.execute({
        name: 'Camisa Ricky and Morty',
        sku: 'CABKMW2',
        description: 'CAMISA BRANCA DA BROOKSFIELD DO RICK MORTY',
        price: 40.0,
        product_type_id: '88218b81-93b0-4818-a605-0b77a832ea08',
        brand_id: '0cb45f9e-947b-4fc1-9010-84b1605ce4f0',
        attributes: [
          {
            id: '6bc48ec5-14ec-4e50-898c-0314b2d5120',
            values_ids: [
              '50715a7d-d599-480f-9fa3-a63dbf50dd41',
              'af943b55-8c9c-404a-be77-883c3210fcda',
            ],
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new product with incorrect product type', async () => {
    expect(
      createProductService.execute({
        name: 'Camisa Ricky and Morty',
        sku: 'CABKMW2',
        description: 'CAMISA BRANCA DA BROOKSFIELD DO RICK MORTY',
        price: 40.0,
        product_type_id: '88218b81-93b0-4818-a605-0b77a832ea08',
        brand_id: '0cb45f9e-947b-4fc1-9010-84b1605ce4f0',
        attributes: [
          {
            id: '6bc48ec5-14ec-4e50-898c-0314b2d51220',
            values_ids: [
              '50715a7d-d599-480f-9fa3-a63dbf50dd41',
              'af943b55-8c9c-404a-be77-883c3210fcda',
            ],
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new product with invalid attribute value', async () => {
    expect(
      createProductService.execute({
        name: 'Camisa Ricky and Morty',
        sku: 'CABKMW2',
        description: 'CAMISA BRANCA DA BROOKSFIELD DO RICK MORTY',
        price: 40.0,
        product_type_id: '88218b81-93b0-4818-a605-0b77a832ea08',
        brand_id: '0cb45f9e-947b-4fc1-9010-84b1605ce4f0',
        attributes: [
          {
            id: '6bc48ec5-14ec-4e50-898c-0314b2d5120e',
            values_ids: ['asdasd', 'asdasd'],
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
