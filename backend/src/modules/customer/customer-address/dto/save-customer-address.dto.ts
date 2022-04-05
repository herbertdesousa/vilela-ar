import { IsNotEmpty, IsUUID } from 'class-validator';

export class SaveCustomerAddressDto {
  @IsNotEmpty({ message: 'obrigatório' })
  @IsUUID('4', { message: 'inválido' })
  customerId: string;

  @IsNotEmpty({ message: 'obrigatório' })
  street: string;

  number: string;

  complement: string;

  neighborhood: string;

  city: string;

  state: string;

  postalCode: string;
}
