import IProductToStockRepository from '@modules/stocks/repositories/IProductToStockRepository';
import IAddProductToStockDTO from '@modules/stocks/dtos/IAddProductToStockDTO';

import ProductToStock from '@modules/products/infra/typeorm/entities/ProductToStock';

class ProductToStockRepository implements IProductToStockRepository {
  private productToStocks: ProductToStock[] = [];

  public async save(
    data: IAddProductToStockDTO[],
  ): Promise<(IAddProductToStockDTO & ProductToStock)[]> {
    const productToStock = data.map(product => ({
      productId: product.productId,
      entry_date: new Date(),
      leave_date: new Date(),
      productToStockId: '2',
      product: {
        id: '88218b81-93b0-4818-a605-0b77a832ea23',
        name: 'Camisa Ricky and Morty',
        sku: 'CABKMW1',
        description: 'CAMISA BRANCA DA BROOKSFIELD DO RICK MORTY',
        price: 40.0,
        product_type_id: '88218b81-93b0-4818-a605-0b77a832ea08',
        brand_id: '0cb45f9e-947b-4fc1-9010-84b1605ce4f0',
        product_type: {
          id: '88218b81-93b0-4818-a605-0b77a832ea08',
          name: 'Camisa',
          description: 'CAMISA',
          created_at: new Date(),
          updated_at: new Date(),
        },
        brand: {
          id: '0cb45f9e-947b-4fc1-9010-84b1605ce4f0',
          name: 'Tommy',
          description: 'HILIFIGER',
          created_at: new Date(),
          updated_at: new Date(),
        },
        productAttributeValues: [],
        productToStocks: [],
        created_at: new Date(),
        updated_at: new Date(),
      },
      stock: {
        id: '1',
        name: 'Estoque teste',
        created_at: new Date(),
        updated_at: new Date(),
        productToStocks: [],
      },
      stockId: '1',
    }));

    this.productToStocks.push(...productToStock);

    return productToStock;
  }
}

export default ProductToStockRepository;
