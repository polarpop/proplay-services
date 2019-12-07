import { Column, PrimaryGeneratedColumn, ManyToOne, TreeLevelColumn, CreateDateColumn, UpdateDateColumn, Entity, OneToMany, ManyToMany, Tree, TreeChildren, TreeParent } from "typeorm";
import { Field, ObjectType, ID, Int, Directive } from "type-graphql";
import { IsDate, IsInt, IsBoolean, MaxLength } from "class-validator";
import { Type } from 'class-transformer';
import { Post } from './Post';
import { User } from '../graphql/User';

@Entity()
@Tree("materialized-path")
@Directive(`@key(fields: "id")`)
@ObjectType()
export class Category {

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

  @Field(type => Boolean)
  @Column({ default: false })
  @IsBoolean()
  active: boolean;

  @Field(type => String)
  @Column({ primary: true, unique: true })
  @MaxLength(50)
  name: string;

  @Field(type => [Post])
  @ManyToMany(type => Post, post => post.categories)
  posts: Post[];

  @Field(type => [Category])
  @TreeChildren({ cascade: ["remove", "update"] })
  children: Category[];

  @Field(type => Category, { nullable: true })
  @TreeParent()
  parent: Category;
}