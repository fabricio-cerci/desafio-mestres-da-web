import ProductAttributeValue from '../infra/typeorm/entities/ProductAttributeValue';

export default interface IProductAttributeValuesRepository {
  findByIds(ids: string[]): Promise<ProductAttributeValue[] | undefined>;
}
