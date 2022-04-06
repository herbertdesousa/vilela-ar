import { IsISO8601, IsNotEmpty, IsUUID } from 'class-validator';
import { ExistsOnTable } from 'src/common/validations/ExistsOnTable';

export class SaveDocumentDto {
  @IsNotEmpty({ message: 'obrigatório' })
  @IsUUID('4', { message: 'inválido' })
  @ExistsOnTable('customer')
  customerId: string;

  @IsNotEmpty({ message: 'obrigatório' })
  @IsUUID('4', { message: 'inválido' })
  @ExistsOnTable('customerAddress')
  customerAddressId: string;

  @IsUUID('4', { message: 'inválido' })
  @ExistsOnTable('customerRepresentative')
  customerRepresentativeId?: string;

  @IsNotEmpty({ message: 'obrigatório' })
  @IsISO8601({}, { message: 'inválido' })
  date: Date;

  type?: 'RECIPT' | 'BUDGET';
}
