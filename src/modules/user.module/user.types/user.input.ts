import { IsBoolean, MaxLength, IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsUserAlreadyExist } from '../../../utils/customValidates/user.custom';
import { User } from './../user.entity';

@InputType()
export class UserInput implements Partial<User> {
    @Field()
    @IsUserAlreadyExist({
        message: 'User $value already exists. Choose another name.',
    })
    firstName: string;

    @Field()
    @IsBoolean()
    isActive: boolean;

    @Field({ nullable: true })
    @IsEmail()
    email: string;

    @Field({ nullable: true })
    @MaxLength(30)
    lastName: string;
}
