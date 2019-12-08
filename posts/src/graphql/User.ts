import { Directive, ObjectType, Field, ID } from '@proplay/type-graphql';
import { Profile } from './Profile';
  
import { Type } from "class-transformer";

@Directive("@extends")
@Directive(`@key(fields: "id")`)
@ObjectType()
export class User {
  @Directive("@external")
  @Field(type => ID)
  id: string;

  @Type(() => Profile)
  @Directive("@external")
  @Directive(`@provides(fields: "name username picture title company")`)
  @Field(type => Profile)
  profile: Profile;

}