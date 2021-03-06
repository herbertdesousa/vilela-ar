import { Injectable } from '@nestjs/common';

import { Customer } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

import { SaveCustomerDto } from './dto/save-customer.dto';

const formatDocument = (value: string): string => {
  const parsedValue = value.replace(/\D/g, '');

  const cnpj = (value: string): string => {
    const part1 = value.slice(0, 2);
    const part2 = value.slice(2, 5);
    const part3 = value.slice(5, 8);
    const part4 = value.slice(8, 12);
    const part5 = value.slice(12, 14);

    if (value.length <= 2) {
      return value;
    }

    if (value.length <= 5) {
      return `${part1}.${part2}`;
    }

    if (value.length <= 8) {
      return `${part1}.${part2}.${part3}`;
    }

    if (value.length <= 12) {
      return `${part1}.${part2}.${part3}/${part4}`;
    }

    return `${part1}.${part2}.${part3}/${part4}-${part5}`;
  };

  const cpf = (value: string): string => {
    const part1 = value.slice(0, 3);
    const part2 = value.slice(3, 6);
    const part3 = value.slice(6, 9);
    const part4 = value.slice(9);

    if (value.length <= 3) {
      return value;
    }

    if (value.length <= 6) {
      return `${part1}.${part2}`;
    }

    if (value.length <= 9) {
      return `${part1}.${part2}.${part3}`;
    }

    return `${part1}.${part2}.${part3}-${part4}`;
  };

  if (parsedValue.length <= 11) {
    return cpf(parsedValue);
  }

  return cnpj(parsedValue);
};

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async create(payload: SaveCustomerDto): Promise<Customer> {
    return await this.prisma.customer.create({
      data: {
        ...payload,
        document: formatDocument(payload.document),
      },
    });
  }

  async update(id: string, payload: SaveCustomerDto): Promise<Customer> {
    return await this.prisma.customer.update({
      where: { id },
      data: {
        ...payload,
        document: formatDocument(payload.document),
      },
    });
  }

  async findAll(): Promise<Customer[]> {
    return await this.prisma.customer.findMany();
  }

  async delete(id: string): Promise<Customer> {
    return await this.prisma.customer.delete({
      where: { id },
    });
  }

  async findOne(id: string): Promise<Customer> {
    return await this.prisma.customer.findFirst({
      where: { id },
    });
  }
}
