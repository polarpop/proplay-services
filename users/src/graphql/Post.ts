import { Directive, ObjectType, Field, ID } from '@proplay/type-graphql';
import { Type } from 'class-transformer';

//import { Category } from './Category';
import { Video } from './Video';

import { User } from '../entity';

@Directive("@extends")
@Directive(`@key(fields: "id")`)
@ObjectType()
export class Post {
  @Directive("@external")
  @Field(type => ID)
  id: string;

  @Directive("@external")
  @Field(type => String)
  ownerId: string;

  @Field(type => User)
  @Directive(`@requires(fields: "ownerId")`)
  owner: User;
}