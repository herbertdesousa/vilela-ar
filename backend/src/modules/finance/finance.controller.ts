import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FinanceIncome, FinanceOutcome } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

import { SaveFinanceDto } from './dto/save-finance.dto';

import { FinanceService } from './finance.service';

@Controller('finances')
export class FinanceController {
  constructor(
    private financeService: FinanceService,
    private prisma: PrismaService,
  ) {}

  @Post()
  async create(
    @Body() body?: SaveFinanceDto,
  ): Promise<FinanceIncome | FinanceOutcome> {
    if (
      body.customerId &&
      !(await this.prisma.customer.findFirst({
        where: { id: body.customerId },
      }))
    ) {
      throw new UnprocessableEntityException({
        message: 'The given data was invalid.',
        errors: {
          customerId: 'não encontrado',
        },
      });
    }

    return await this.financeService.create(body);
  }

  @Get()
  async paginate(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
  ): Promise<(FinanceIncome | FinanceOutcome)[]> {
    return await this.financeService.paginate(limit || 5, page || 0);
  }

  @Put()
  async update(
    @Query('id', ParseUUIDPipe) id: string,
    @Body() body?: SaveFinanceDto,
  ): Promise<FinanceIncome | FinanceOutcome> {
    return await this.financeService.update(id, body);
  }

  @Delete()
  async delete(
    @Query('id', ParseUUIDPipe) id: string,
    @Query('type') type: 'income' | 'outcome',
  ): Promise<FinanceIncome | FinanceOutcome> {
    try {
      return await this.financeService.delete(id, type);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }
}
