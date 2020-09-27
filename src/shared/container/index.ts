import { container } from 'tsyringe';

import '@modules/users/providers';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import IProductTypesRepository from '@modules/products/repositories/IProductTypesRepository';
import ProductTypesRepository from '@modules/products/infra/typeorm/repositories/ProductTypesRepository';

import IProductAttributesRepository from '@modules/products/repositories/IProductAttributesRepository';
import ProductAttributesRepository from '@modules/products/infra/typeorm/repositories/ProductAttributesRepository';

import IProductAttributeValuesRepository from '@modules/products/repositories/IProductAttributeValuesRepository';
import ProductAttributeValuesRepository from '@modules/products/infra/typeorm/repositories/ProductAttributeValuesRepository';

import IBrandsRepository from '@modules/products/repositories/IBrandsRepository';
import BrandsRepository from '@modules/products/infra/typeorm/repositories/BrandsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IStocksRepository from '@modules/stocks/repositories/IStocksRepository';
import StocksRepository from '@modules/stocks/infra/typeorm/repositories/StocksRepository';

import IProductToStockRepository from '@modules/stocks/repositories/IProductToStockRepository';
import ProductToStockRepository from '@modules/stocks/infra/typeorm/repositories/ProductToStockRepository';

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IProductTypesRepository>(
  'ProductTypesRepository',
  ProductTypesRepository,
);

container.registerSingleton<IProductAttributesRepository>(
  'ProductAttributesRepository',
  ProductAttributesRepository,
);

container.registerSingleton<IBrandsRepository>(
  'BrandsRepository',
  BrandsRepository,
);

container.registerSingleton<IProductAttributeValuesRepository>(
  'ProductAttributeValuesRepository',
  ProductAttributeValuesRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IStocksRepository>(
  'StocksRepository',
  StocksRepository,
);

container.registerSingleton<IProductToStockRepository>(
  'ProductToStockRepository',
  ProductToStockRepository,
);
