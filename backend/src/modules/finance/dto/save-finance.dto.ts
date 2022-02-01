import { IsNotEmpty, IsEnum, IsInt } from 'class-validator';

export class SaveFinanceDto {
  @IsNotEmpty({ message: 'obrigatório' })
  date: Date;

  @IsNotEmpty({ message: 'obrigatório' })
  @IsInt({ message: 'inválido, apenas INT' })
  value: number;

  @IsEnum(['income', 'outcome'], { message: 'inválido' })
  @IsNotEmpty({ message: 'obrigatório' })
  type: 'income' | 'outcome';

  description?: string;

  customerId?: string;
}
