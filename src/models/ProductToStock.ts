import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Product from './Product';
import Stock from './Stock';

@Entity()
class ProductToStock {
  @PrimaryGeneratedColumn('uuid')
  public productToStockId!: string;

  @Column()
  public productId!: string;

  @Column()
  public stockId!: string;

  @CreateDateColumn()
  public entry_date!: Date;

  @Column('timestamp')
  public leave_date!: Date;

  @ManyToOne(() => Product, product => product.productToStocks)
  public product!: Product;

  @ManyToOne(() => Stock, stock => stock.productToStocks)
  public stock!: Stock;
}

export default ProductToStock;
