import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn, 
  CreateDateColumn,
  OneToMany,
  OneToOne
} from 'typeorm';
import { IsUrl, IsEmail } from 'class-validator';
import { ObjectType, Field, ID, Directive } from '@proplay/type-graphql';

import { Preference } from './Preference';
import { User } from './User';


@Entity()
@Directive(`@key(fields: "id")`)
@ObjectType()
export class Profile {

  @Field(type => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @CreateDateColumn({ name: 'created_at', update: false })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  readonly updatedAt: Date;

  @Field(type => User, { nullable: true })
  @OneToOne(type => User, user => user.profile)
  user: User;

  @Field(type => String)
  @Column()
  name: string;

  @Field(type => String)
  @Column()
  username: string;

  @Field(type => String)
  @Column({ nullable: true })
  @IsEmail()
  email: string;

  @Field(type => String)
  @Column({ nullable: true })
  @IsUrl()
  picture: string;

  @Field(type => String)
  @Column({ nullable: true })
  title: string;

  @Field(type => String)
  @Column({ nullable: true })
  company: string;

  @Column({ name: 'stripe_account', nullable: true })
  stripeAccount: string;

  @Column({ nullable: true, name: 'facebook_access_token' })
  facebookAccessToken: string;

  @Column({ nullable: true, name: 'instagram_access_token' })
  instagramAccessToken: string;

  @Column({ nullable: true, name: 'twitter_access_token' })
  twitterAccessToken: string;

  @Field(type => [Preference])
  @OneToMany(type => Preference, preference => preference.profile)
  preferences: Preference[];
}