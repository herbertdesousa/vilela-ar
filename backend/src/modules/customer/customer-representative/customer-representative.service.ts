import { Injectable } from '@nestjs/common';

import { CustomerRepresentative } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

import { SaveCustomerRepresentativeDto } from './dto/save-customer-representative.dto';

@Injectable()
export class CustomerRepresentativeService {
  constructor(private prisma: PrismaService) {}

  async create(
    payload: SaveCustomerRepresentativeDto,
  ): Promise<CustomerRepresentative> {
    return await this.prisma.customerRepresentative.create({ data: payload });
  }

  async update(
    id: string,
    payload: SaveCustomerRepresentativeDto,
  ): Promise<CustomerRepresentative> {
    return await this.prisma.customerRepresentative.update({
      where: { id },
      data: payload,
    });
  }

  async findAllFromCustomer(
    customerId: string,
  ): Promise<CustomerRepresentative[]> {
    return await this.prisma.customerRepresentative.findMany({
      where: { customerId },
    });
  }

  async delete(id: string): Promise<CustomerRepresentative> {
    return await this.prisma.customerRepresentative.delete({
      where: { id },
    });
  }
}
