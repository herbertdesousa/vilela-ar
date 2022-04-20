import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmpty,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ExistsOnTable } from 'src/common/validations/ExistsOnTable';

export class SaveDocumentDto {
  @IsNotEmpty({ message: 'obrigatório' })
  @IsUUID('4', { message: 'inválido' })
  @ExistsOnTable({ table: 'customer' })
  customerId: string;

  @IsOptional()
  @IsUUID('4', { message: 'inválido' })
  @ExistsOnTable({ table: 'customerAddress' })
  customerAddressId?: string;

  @IsOptional()
  @IsUUID('4', { message: 'inválido' })
  @ExistsOnTable({ table: 'customerRepresentative' })
  customerRepresentativeId?: string;

  @IsNotEmpty({ message: 'obrigatório' })
  @IsISO8601({}, { message: 'inválido' })
  date: Date;

  type?: 'RECIPT' | 'BUDGET';

  @IsArray({ message: 'inválido' })
  @ValidateNested({ each: true })
  @Type(() => SaveDocumentBlock)
  blocks: SaveDocumentBlock[];
}

class SaveDocumentBlock {
  @IsNotEmpty({ message: 'obrigatório' })
  @ExistsOnTable({ table: 'documentRefBlockName', field: 'name' })
  name: string;

  price?: number;

  description?: string;

  @IsOptional()
  @IsArray({ message: 'inválido' })
  @IsString({ each: true })
  @ExistsOnTable({ table: 'documentRefMaterial', field: 'name', each: true })
  materials?: string[];

  @IsArray({ message: 'inválido' })
  @ValidateNested({ each: true })
  @Type(() => SaveDocumentBlockPlace)
  places: SaveDocumentBlockPlace[];
}

class SaveDocumentBlockPlace {
  @IsNotEmpty({ message: 'obrigatório' })
  @ExistsOnTable({ table: 'documentRefPlaceRoom', field: 'name' })
  room: string;

  @IsOptional()
  @ExistsOnTable({ table: 'documentRefPlaceFloor', field: 'name' })
  floor?: string;

  @IsArray({ message: 'inválido' })
  @ValidateNested({ each: true })
  @Type(() => SaveDocumentBlockPlaceDevice)
  devices: SaveDocumentBlockPlaceDevice[];
}

class SaveDocumentBlockPlaceDevice {
  quantity?: number;

  @IsNotEmpty({ message: 'obrigatório' })
  @IsEnum(['INSIDE', 'OUTSIDE', 'BOTH'])
  type: 'INSIDE' | 'OUTSIDE' | 'BOTH';

  @IsNotEmpty({ message: 'obrigatório' })
  @ExistsOnTable({ table: 'documentRefDeviceBrand', field: 'name' })
  brand: string;

  @IsNotEmpty({ message: 'obrigatório' })
  @ExistsOnTable({ table: 'documentRefDeviceCapacity', field: 'name' })
  capacity: string;

  @IsNotEmpty({ message: 'obrigatório' })
  @ExistsOnTable({ table: 'documentRefDeviceMode', field: 'name' })
  mode: string;
}
