import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseTimeStampEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true, select: false })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, select: false })
  deletedAt: Date;
}
