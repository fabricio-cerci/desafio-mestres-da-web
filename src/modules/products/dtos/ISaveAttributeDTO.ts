import Product from '../infra/typeorm/entities/Product';
import ProductAttributeValue from '../infra/typeorm/entities/ProductAttributeValue';

export default interface ISaveProductDTO {
  product: Product;
  attributes: ProductAttributeValue[];
}
