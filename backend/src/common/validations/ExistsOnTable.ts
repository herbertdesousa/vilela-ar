import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../services/prisma/prisma.service';

@ValidatorConstraint({ name: 'ExistsOnTable', async: true })
@Injectable()
export class ExistsOnTableRule implements ValidatorConstraintInterface {
  constructor(private prisma: PrismaService) {}

  async validate(id: string, obj: ValidationArguments) {
    const findedCustomer = await this.prisma[obj.constraints[0]].findFirst({
      where: { id },
    });

    return !!findedCustomer;
  }

  defaultMessage() {
    return 'inválido';
  }
}

export function ExistsOnTable(
  table: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'ExistsOnTable',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [table],
      validator: ExistsOnTableRule,
    });
  };
}
