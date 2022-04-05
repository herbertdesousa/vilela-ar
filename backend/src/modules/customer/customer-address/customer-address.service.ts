import { Injectable } from '@nestjs/common';

import { CustomerAddress } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

import { SaveCustomerAddressDto } from './dto/save-customer-address.dto';

@Injectable()
export class CustomerAddressService {
  constructor(private prisma: PrismaService) {}

  async create(payload: SaveCustomerAddressDto): Promise<CustomerAddress> {
    return await this.prisma.customerAddress.create({ data: payload });
  }

  async update(
    id: string,
    payload: SaveCustomerAddressDto,
  ): Promise<CustomerAddress> {
    return await this.prisma.customerAddress.update({
      where: { id },
      data: payload,
    });
  }

  async findAllFromCustomer(customerId: string): Promise<CustomerAddress[]> {
    return await this.prisma.customerAddress.findMany({
      where: { customerId },
    });
  }

  async delete(id: string): Promise<CustomerAddress> {
    return await this.prisma.customerAddress.delete({
      where: { id },
    });
  }
}
