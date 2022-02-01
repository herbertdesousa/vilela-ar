import { IsNotEmpty, IsEnum, MaxLength, MinLength } from 'class-validator';

export class SaveCustomerDto {
  @IsNotEmpty({ message: 'obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'obrigatório' })
  @MinLength(11, { message: 'inválido' })
  @MaxLength(18, { message: 'inválido' })
  document: string;

  @IsEnum(['PERSONAL', 'ENTITY'], { message: 'inválido' })
  type: 'PERSONAL' | 'ENTITY';

  representative?: string;
}
