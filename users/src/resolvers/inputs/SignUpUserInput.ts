import { InputType, Field, ID } from '@proplay/type-graphql';
import { User, Profile, Preference, Device } from '../../entity';


@InputType({ description: "Device Inputs" })
class SignUpDeviceInput implements Partial<Device> {
  @Field(type => String)
  installationId: string;

  @Field(type => String, { nullable: true })
  name?: string;

  @Field(type => String, { nullable: true })
  os?: string;

  @Field(type => String, { nullable: true })
  ipAddress?: string;

  @Field(type => String, { nullable: true })
  pushToken?: string;
}

@InputType({ description: "Preference inputs" })
class SignUpPreferenceInput implements Partial<Preference> {

  @Field(type => String)
  name: string;

  @Field(type => Boolean)
  enabled: boolean;

  @Field(type => String, { nullable: true })
  category?: string;

  @Field(type => String, { nullable: true })
  categoryClassification?: string;
}

@InputType({ description: "Profile extra inputs" })
class SignUpProfileInput {

  @Field(type => String, { nullable: true })
  title?: string;

  @Field(type => String, { nullable: true })
  company?: string;

}


@InputType({ description: "Inputs for registering a user" })
export class SignUpInput {

  @Field(type => String)
  accessToken: string;

  @Field(type => Boolean, { nullable: true, defaultValue: false })
  isPro?: boolean;

  @Field(type => SignUpProfileInput, { nullable: true })
  profile?: SignUpProfileInput;

  @Field(type => [SignUpPreferenceInput], { nullable: true })
  preferences?: SignUpPreferenceInput[];

  @Field(type => SignUpDeviceInput)
  device: SignUpDeviceInput;
}