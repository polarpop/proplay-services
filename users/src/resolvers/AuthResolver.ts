import { 
  Resolver,
  Mutation, 
  Ctx,
  Arg
} from '@proplay/type-graphql';
import { user as userBroker } from '../brokers';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { User, Profile, Preference, Device } from '../entity';
import { SignUpInput } from './inputs';
import { getUserFromAccessToken } from '../utils/getUserFromAccessToken';


@Resolver(of => User)
export class AuthResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Device) private readonly deviceRepository: Repository<Device>,
    @InjectRepository(Preference) private readonly preferenceRepository: Repository<Preference>
  ) {}

  @Mutation(type => User)
  async login(@Arg("accessToken") token: string, @Arg("deviceId") deviceId?: string) {
    // @ts-ignore
    const user: User|undefined = await getUserFromAccessToken(token); 
    const exists = await userBroker.retrieve(`${user?.id}`);
    if (!exists && user) {
      return user;
    } else {
      return exists;
    }
  }

  @Mutation(type => User)
  async signUp(
    @Arg("input") input: SignUpInput
  ) {
    const metadata = await getUserFromAccessToken(input.accessToken, { returnMetadataOnly: true });
    console.log(metadata);
    const preferences = input.preferences ? await Promise.all(input.preferences.map(pref => {
      return this.preferenceRepository.create(pref);
    })) : [];

    const profile = await this.profileRepository.create({
      email: metadata?.profile.email,
      name: metadata?.profile.name,
      username: metadata?.profile.username,
      picture: metadata?.profile.picture,
      company: input.profile?.company,
      title: input.profile?.title,
      preferences
    });
    

    const user = await this.userRepository.create({
      externalId: metadata?.id,
      source: metadata?.source,
      profile
    });
    console.log(user);
    await userBroker.set(user);

    return user;
  }
}