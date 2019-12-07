import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn, 
  CreateDateColumn, 
  ManyToMany,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
  JoinTable
} from 'typeorm';
import { IsIn } from 'class-validator';
import { ObjectType, Field, ID, Directive } from '@proplay/type-graphql';

import { Profile } from './Profile';
import { Device } from './Device';

@Entity()
@Directive(`@key(fields: "id")`)
@ObjectType()
export class User {

  @Field(type => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Field(type => Date)
  @CreateDateColumn({ name: 'created_at' })
  readonly createdAt: Date;

  @Field(type => Date)
  @UpdateDateColumn({ name: 'updated_at' })
  readonly updatedAt: Date;

  @Column({ name: 'external_id', nullable: true })
  externalId: string;

  @Field(type => String)
  @Column({ default: 'unknown' })
  @IsIn(['google', 'facebook', 'apple', 'instagram', 'unknown'])
  source: string;

  @Field(type => Boolean)
  @Column({ default: true })
  active: boolean;

  @Field(type => Boolean)
  @Column({ default: false, name: 'premium' })
  premium: boolean;

  @Field(type => String)
  @Column({ default: 'user' })
  @IsIn([ 'pro', 'user', 'admin' ])
  role: string;

  @Column({ name: 'last_login' })
  @Field(type => Date)
  lastLogin: Date;

  @Field(type => Profile)
  @OneToOne(type => Profile, profile => profile.user)
  @JoinColumn()
  profile: Profile;

  @Field(type => User)
  @OneToMany(type => User, user => user.conversions)
  convertedBy: User;

  @Field(type => [User])
  @ManyToOne(type => User, user => user.convertedBy)
  conversions: User[];

  @Field(type => [User])
  @ManyToMany(type => User, user => user.followers)
  @JoinTable()
  following: User[];

  @Field(type => [User])
  @ManyToMany(type => User, user => user.following)
  followers: User[];

  @Field(type => [Device])
  @OneToMany(type => Device, device => device.user)
  devices: Device[];

  isAdmin() {
    return this.role === 'admin';
  }

  isUser() {
    return this.role === 'user';
  }

  isPro() {
    return this.role === 'pro';
  }
}