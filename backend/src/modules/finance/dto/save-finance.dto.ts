import { IsNotEmpty, IsEnum, IsInt, IsISO8601 } from 'class-validator';

export class SaveFinanceDto {
  @IsNotEmpty({ message: 'obrigatório' })
  @IsISO8601({}, { message: 'inválido' })
  date: Date;

  @IsNotEmpty({ message: 'obrigatório' })
  @IsInt({ message: 'inválido, apenas INT' })
  value: number;

  @IsEnum(['income', 'outcome'], { message: 'inválido' })
  @IsNotEmpty({ message: 'obrigatório' })
  type: 'income' | 'outcome';

  description?: string;
}
