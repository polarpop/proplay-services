import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity, OneToOne, JoinColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Field, ObjectType, ID, Int, Directive } from "type-graphql";
import { IsDate, IsInt, IsBoolean, Max, Min, MaxLength, MinLength } from "class-validator";
import { Type } from 'class-transformer';

import { Video } from './Video';
import { Category } from './Category';
import { View } from './PostView';
import { User } from '../graphql/User';


@Entity()
@Directive(`@key(fields: "id")`)
@ObjectType()
export class Post {

  @Field(type => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Field(type => Date)
  @CreateDateColumn()
  @IsDate()
  readonly created_at: Date;

  @Field(type => Date)
  @UpdateDateColumn()
  @IsDate()
  readonly updated_at: Date;

  @Field(type => String)
  @Column()
  @MaxLength(1000)
  @MinLength(10)
  title: string;

  @Field(type => Boolean)
  @Column({ default: false })
  @IsBoolean()
  active: boolean;

  @Field(type => Boolean)
  @Column({ default: false })
  @IsBoolean()
  is_premium: boolean;

  @Field(type => Video)
  @OneToOne(type => Video, video => video.post)
  @JoinColumn()
  video: Video;

  @Column({ name: 'owner_id' })
  @Field(type => String)
  ownerId: string;

  @Field(type => [Category])
  @ManyToMany(type => Category, category => category.posts)
  @JoinTable()
  categories: Category[];

  @Field(type => [View], { nullable: true })
  @ManyToMany(type => View, view => view.post)
  @JoinTable()
  views: View[];

}