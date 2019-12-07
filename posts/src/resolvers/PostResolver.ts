import { 
  Resolver, 
  Query, 
  Mutation, 
  Ctx,
  Args,
  Arg,
  FieldResolver, 
  Root,
  UseMiddleware
} from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Post, View, Category, Video } from '../entity';
import { User } from '../graphql/User'
import { Context } from './common';


@Resolver(of => Post)
export class PostResolver {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>
  ) {}

  @Query(returns => [Post], { nullable: true })
  async Posts(
    @Arg("userId", { nullable: true }) userId?: string,
  ): Promise<Post[]> {
    if (userId) {
      return await this.postRepository.find({
        where: {
          ownerId: userId,
          active: true
        },
        relations: ["categories", "views", "video"]
      });
    }

    return await this.postRepository.find({
      where: {
        active: true
      },
      relations: ["categories", "views", "video"]
    });
  }

  @FieldResolver(returns => [Category])
  async categories(@Root() post: Post): Promise<Category[]> {
    return post.categories;
  }

  @FieldResolver(returns => Video)
  async video(@Root() post: Post): Promise<Video> {
    return post.video;
  }
  
  @FieldResolver(returns => [View])
  async views(@Root() post: Post): Promise<View[]> {
    return post.views;
  }
}