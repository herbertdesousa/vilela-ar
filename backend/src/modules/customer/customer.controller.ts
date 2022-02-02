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
import { Customer } from '@prisma/client';

import { CustomerService } from './customer.service';
import { SaveCustomerDto } from './dto/save-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  async create(@Body() body?: SaveCustomerDto): Promise<any> {
    return await this.customerService.create(body);
  }

  @Get()
  async findAll(): Promise<Customer[]> {
    return await this.customerService.findAll();
  }

  @Put()
  async update(
    @Query('id', ParseUUIDPipe) id: string,
    @Body() body?: SaveCustomerDto,
  ): Promise<Customer> {
    try {
      return await this.customerService.update(id, body);
    } catch (err) {
      throw new NotFoundException('not found customer with id ' + id);
    }
  }

  @Delete()
  async delete(@Query('id', ParseUUIDPipe) id: string): Promise<Customer> {
    try {
      return await this.customerService.delete(id);
    } catch (err) {
      console.log(err);

      throw new NotFoundException('not found customer with id ' + id);
    }
  }
}
