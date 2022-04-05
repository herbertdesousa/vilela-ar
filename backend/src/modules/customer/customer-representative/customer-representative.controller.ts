import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  ParseUUIDPipe,
  Post,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { CustomerRepresentative } from '@prisma/client';

import { CustomerRepresentativeService } from './customer-representative.service';
import { SaveCustomerRepresentativeDto } from './dto/save-customer-representative.dto';

@Controller('customers/representative')
export class CustomerRepresentativeController {
  constructor(private customerService: CustomerRepresentativeService) {}

  @Post()
  async create(@Body() body?: SaveCustomerRepresentativeDto): Promise<any> {
    try {
      return await this.customerService.create(body);
    } catch (err) {
      throw new NotFoundException(
        'not found customer with id ' + body.customerId,
      );
    }
  }

  @Get()
  async findAllFromCustomer(
    @Query('customerId', ParseUUIDPipe) customerId: string,
  ): Promise<CustomerRepresentative[]> {
    return await this.customerService.findAllFromCustomer(customerId);
  }

  @Put()
  async update(
    @Query('id', ParseUUIDPipe) id: string,
    @Body() body?: SaveCustomerRepresentativeDto,
  ): Promise<CustomerRepresentative> {
    try {
      return await this.customerService.update(id, body);
    } catch (err) {
      throw new NotFoundException('not found customer with id ' + id);
    }
  }

  @Delete()
  async delete(
    @Query('id', ParseUUIDPipe) id: string,
  ): Promise<CustomerRepresentative> {
    try {
      return await this.customerService.delete(id);
    } catch (err) {
      console.log(err);

      throw new NotFoundException('not found customer with id ' + id);
    }
  }
}
