import Brand from '../infra/typeorm/entities/Brand';

export default interface IBrandsRepository {
  findById(id: string): Promise<Brand | undefined>;
}
