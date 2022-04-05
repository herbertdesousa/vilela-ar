import { IsNotEmpty, IsUUID } from 'class-validator';

export class SaveCustomerRepresentativeDto {
  @IsNotEmpty({ message: 'obrigatório' })
  @IsUUID('4', { message: 'inválido' })
  customerId: string;

  @IsNotEmpty({ message: 'obrigatório' })
  name: string;

  role: string;
}
