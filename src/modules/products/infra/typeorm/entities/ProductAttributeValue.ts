import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import ProductAttribute from './ProductAttribute';

@Entity('product_attribute_values')
class ProductAttributeValue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;

  @Column()
  product_attribute_id: string;

  @ManyToOne(() => ProductAttribute, { eager: true })
  @JoinColumn({ name: 'product_attribute_id' })
  product_attribute: ProductAttribute;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ProductAttributeValue;
