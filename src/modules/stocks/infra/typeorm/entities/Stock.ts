import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ProductToStock from '@modules/products/infra/typeorm/entities/ProductToStock';

@Entity('stocks')
class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ProductToStock, productToStock => productToStock.stock)
  public productToStocks!: ProductToStock[];
}

export default Stock;
