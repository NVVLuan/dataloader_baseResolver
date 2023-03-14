import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { AppDataSource } from '../../configs/database.config';
import { User } from '../../modules/user.module/user.entity';

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
    async validate(userName: any): Promise<boolean> {
        return AppDataSource.getRepository(User)
            .findOne({ where: { firstName: userName } })
            .then(user => {
                if (user) return false;
                return true;
            });
    }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserAlreadyExistConstraint,
        });
    };
}
