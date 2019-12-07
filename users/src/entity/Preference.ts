import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID, Directive } from '@proplay/type-graphql';
import { Profile } from './Profile';

@Entity()
@Directive(`@key(fields: "id")`)
@ObjectType()
export class Preference {
  
  @Field(type => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @CreateDateColumn({ name: 'created_at', update: false })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  readonly updatedAt: Date;

  @Field(type => [Profile])
  @ManyToOne(type => Profile, profile => profile.preferences)
  profile: Profile;

  @Field(type => String)
  @Column()
  name: string;

  @Field(type => Boolean)
  @Column({ default: true })
  enabled: boolean;

  @Field(type => String, { nullable: true })
  @Column({ nullable: true })
  category?: string;

  @Field(type => String, { nullable: true })
  @Column({ nullable: true })
  categoryClassification?: string;
}