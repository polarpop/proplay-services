import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity, ManyToMany, JoinTable } from "typeorm";
import { Field, ObjectType, ID, Int, Directive } from "@proplay/type-graphql";
import { IsDate, IsInt, IsBoolean, Max, Min, MaxLength, MinLength } from "class-validator";
import { Post } from './Post';
import { User } from '../graphql/User';

@Entity()
@ObjectType()
export class View {

  @Field(type => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Field(type => Date)
  @CreateDateColumn()
  @IsDate()
  readonly created_at: Date;

  @Field(type => User)
  @Directive(`@provides(fields: "profile")`)
  @Column()
  viewer: string;

  @Field(type => [Post])
  @ManyToMany(type => Post, post => post.views)
  post: Post[];
}