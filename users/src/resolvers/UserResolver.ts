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
} from '@proplay/type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User, Profile } from '../entity';

@Resolver(of => User)
export class UserResolver {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}
  
  @Query(returns => User)
  async getUser(
    @Arg("id") id: string
  ): Promise<User|undefined> {
    return await this.userRepository.findOne(id, {
      relations: ['profile', 'followers']
    });
  }

  @Query(returns => [User])
  async getPros(
    @Arg("filter") filter: any
  ): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        role: 'PRO'
      },
      relations: ['profile', 'followers']
    });
  }

  @FieldResolver(returns => Profile)
  profile(@Root() user: User): Profile {
    return user.profile;
  }

  @FieldResolver(returns => [User])
  followers(@Root() user: User): User[] {
    return user.followers;
  }

  @FieldResolver(returns => [User])
  following(@Root() user: User): User[] {
    return user.following;
  }
}