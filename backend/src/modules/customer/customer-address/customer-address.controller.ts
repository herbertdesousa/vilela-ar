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
import { CustomerAddress } from '@prisma/client';

import { CustomerAddressService } from './customer-address.service';
import { SaveCustomerAddressDto } from './dto/save-customer-address.dto';

@Controller('customers/address')
export class CustomerAddressController {
  constructor(private customerService: CustomerAddressService) {}

  @Post()
  async create(@Body() body?: SaveCustomerAddressDto): Promise<any> {
    return await this.customerService.create(body);
  }

  @Get()
  async findAllFromCustomer(
    @Query('customerId', ParseUUIDPipe) customerId: string,
  ): Promise<CustomerAddress[]> {
    return await this.customerService.findAllFromCustomer(customerId);
  }

  @Put()
  async update(
    @Query('id', ParseUUIDPipe) id: string,
    @Body() body?: SaveCustomerAddressDto,
  ): Promise<CustomerAddress> {
    try {
      return await this.customerService.update(id, body);
    } catch (err) {
      throw new NotFoundException('not found customer with id ' + id);
    }
  }

  @Delete()
  async delete(
    @Query('id', ParseUUIDPipe) id: string,
  ): Promise<CustomerAddress> {
    try {
      return await this.customerService.delete(id);
    } catch (err) {
      console.log(err);

      throw new NotFoundException('not found customer with id ' + id);
    }
  }
}
