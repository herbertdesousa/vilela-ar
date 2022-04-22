import { Injectable } from '@nestjs/common';

import { Finance } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

import { SaveFinanceDto } from './dto/save-finance.dto';

interface IPaginate {
  limit: number;
  page: number;
}

@Injectable()
export class FinanceService {
  constructor(private prisma: PrismaService) {}

  async listInDay(date: string, paginate: IPaginate): Promise<Finance[]> {
    return await this.prisma.finance.findMany({
      skip: paginate.limit * paginate.page,
      take: paginate.limit,
      where: {
        date: {
          in: new Date(date),
        },
      },
    });
  }

  async list(paginate: IPaginate): Promise<Finance[]> {
    return await this.prisma.finance.findMany({
      skip: paginate.limit * paginate.page,
      take: paginate.limit,
    });
  }

  async create(payload: SaveFinanceDto): Promise<Finance> {
    return await this.prisma.finance.create({
      data: {
        ...payload,
        type: payload.type.toUpperCase() as 'INCOME' | 'OUTCOME',
      },
    });
  }

  async update(id: string, payload: SaveFinanceDto): Promise<Finance> {
    return await this.prisma.finance.update({
      where: { id },
      data: {
        ...payload,
        type: payload.type.toUpperCase() as 'INCOME' | 'OUTCOME',
      },
    });
  }

  async delete(id: string): Promise<Finance> {
    return await this.prisma.finance.delete({
      where: { id },
    });
  }
}
