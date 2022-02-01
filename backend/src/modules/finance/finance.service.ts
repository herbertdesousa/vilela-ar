import { Injectable } from '@nestjs/common';

import { Finance, FinanceIncome, FinanceOutcome } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

import { SaveFinanceDto } from './dto/save-finance.dto';

@Injectable()
export class FinanceService {
  constructor(private prisma: PrismaService) {}

  async paginate(
    limit: number,
    page: number,
  ): Promise<(FinanceIncome | FinanceOutcome)[]> {
    const finance = await this.prisma.finance.findMany({
      skip: limit * page,
      take: limit,
      include: {
        financeIncome: true,
        financeOutcome: true,
      },
    });
    return finance.map((i) => ({
      type: i.financeIncomeId ? 'income' : 'outcome',
      ...(i.financeIncomeId ? i.financeIncome : i.financeOutcome),
    }));
  }

  async create(
    payload: SaveFinanceDto,
  ): Promise<FinanceIncome | FinanceOutcome> {
    if (payload.type === 'income') {
      const financeIncome = await this.prisma.financeIncome.create({
        data: {
          date: payload.date,
          description: payload.description,
          customerId: payload.customerId,
          value: payload.value,
        },
      });
      await this.prisma.finance.create({
        data: {
          financeIncomeId: financeIncome.id,
        },
      });

      return financeIncome;
    }

    const financeOutcome = await this.prisma.financeOutcome.create({
      data: {
        date: payload.date,
        description: payload.description,
        value: payload.value,
      },
    });
    await this.prisma.finance.create({
      data: {
        financeOutcomeId: financeOutcome.id,
      },
    });
    return financeOutcome;
  }

  async update(
    id: string,
    payload: SaveFinanceDto,
  ): Promise<FinanceIncome | FinanceOutcome> {
    if (payload.type === 'income') {
      return await this.prisma.financeIncome.update({
        where: { id },
        data: {
          date: payload.date,
          description: payload.description,
          customerId: payload.customerId,
          value: payload.value,
        },
      });
    }

    return await this.prisma.financeOutcome.update({
      where: { id },
      data: {
        date: payload.date,
        description: payload.description,
        value: payload.value,
      },
    });
  }

  async delete(
    id: string,
    type: 'income' | 'outcome',
  ): Promise<FinanceIncome | FinanceOutcome> {
    if (type === 'income') {
      return await this.prisma.financeIncome.delete({
        where: { id },
      });
    }
    return await this.prisma.financeOutcome.delete({
      where: { id },
    });
  }
}
