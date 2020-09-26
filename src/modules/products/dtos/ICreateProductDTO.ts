export default interface ICreateProductDTO {
  name: string;
  sku: string;
  description?: string;
  price: number;
  product_type_id: string;
  brand_id: string;
}
