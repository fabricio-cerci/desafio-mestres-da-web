import ProductType from '../infra/typeorm/entities/ProductType';

export default interface IProductTypesRepository {
  findById(id: string): Promise<ProductType | undefined>;
}
