import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn, 
  CreateDateColumn,
  ManyToOne
} from 'typeorm';
import { ObjectType, ID, Field, Directive } from '@proplay/type-graphql';

import { User } from './User';

@Entity()
@Directive(`@key(fields: "id")`)
@ObjectType()
export class Device {
  
  @Field(type => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @CreateDateColumn({ name: 'created_at', update: false })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  readonly updatedAt: Date;

  @Column({ name: 'installation_id' })
  installationId: string;

  @Field(type => String)
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  os: string;

  @Field(type => String)
  @Column({ nullable: true, name: 'ip_address' })
  ipAddress: string;

  @Column({ nullable: true, name: 'push_token' })
  pushToken: string;

  @Field(type => User)
  @ManyToOne(type => User, user => user.devices)
  user: User;
}