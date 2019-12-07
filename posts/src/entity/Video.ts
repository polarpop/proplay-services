import { Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Entity, OneToOne } from "typeorm";
import { Field, ObjectType, ID, Int } from "type-graphql";
import { IsDate, IsUrl, IsInt, IsBoolean, Max, Min } from "class-validator";
import { Post } from './Post';

@Entity()
@ObjectType()
export class Video {

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

  @Field(type => String, { nullable: true })
  @Column({ nullable: true })
  @IsUrl()
  src?: string;

  @Field(type => Int, { nullable: true })
  @Column({ nullable: true })
  @Max(1*60*60*1000 + 30*60*1000)
  @Min(30*60*1000)
  duration?: number;

  @Field(type => Post)
  @OneToOne(type => Post)
  post: Post;

}