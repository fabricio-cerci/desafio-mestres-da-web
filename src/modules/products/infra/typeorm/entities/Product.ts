import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import ProductType from './ProductType';
import Brand from './Brand';
import ProductAttributeValue from './ProductAttributeValue';
import ProductToStock from './ProductToStock';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  sku: string;

  @Column()
  description?: string;

  @Column('decimal')
  price: number;

  @Column()
  product_type_id: string;

  @ManyToOne(() => ProductType)
  @JoinColumn({ name: 'product_type_id' })
  product_type: ProductType;

  @Column()
  brand_id: string;

  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToMany(() => ProductAttributeValue)
  @JoinTable()
  productAttributeValues: ProductAttributeValue[];

  @OneToMany(() => ProductToStock, productToStock => productToStock.product)
  public productToStocks!: ProductToStock[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
