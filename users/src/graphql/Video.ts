import { Directive, ObjectType, Field, ID } from '@proplay/type-graphql';

@Directive("@extends")
@Directive(`@key(fields: "id")`)
@ObjectType()
export class Video {
  @Directive("@external")
  @Field(type => ID)
  id: string;

  @Directive("@external")
  @Field()
  src: string;

  @Directive("@external")
  @Field()
  duration: number;
}