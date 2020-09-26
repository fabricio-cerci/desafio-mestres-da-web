import ProductAttribute from '../infra/typeorm/entities/ProductAttribute';

export default interface IProductAttributesRepository {
  findById(id: string): Promise<ProductAttribute | undefined>;
}
