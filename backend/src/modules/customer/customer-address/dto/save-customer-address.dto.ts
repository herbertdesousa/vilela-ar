import { IsNotEmpty, IsUUID } from 'class-validator';
import { ExistsOnTable } from 'src/common/validations/ExistsOnTable';

export class SaveCustomerAddressDto {
  @IsNotEmpty({ message: 'obrigatório' })
  @IsUUID('4', { message: 'inválido' })
  @ExistsOnTable({ table: 'customer' })
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
