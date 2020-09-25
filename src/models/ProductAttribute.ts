import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import ProductType from './ProductType';

@Entity('product_attributes')
class ProductAttribute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  product_type_id: string;

  @ManyToOne(() => ProductType)
  @JoinColumn({ name: 'product_type_id' })
  product_type: ProductType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ProductAttribute;
