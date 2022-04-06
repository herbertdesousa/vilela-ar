import { IsNotEmpty, IsUUID } from 'class-validator';
import { ExistsOnTable } from 'src/common/validations/ExistsOnTable';

export class SaveCustomerRepresentativeDto {
  @IsNotEmpty({ message: 'obrigatório' })
  @IsUUID('4', { message: 'inválido' })
  @ExistsOnTable('customer')
  customerId: string;

  @IsNotEmpty({ message: 'obrigatório' })
  name: string;

  role: string;
}
