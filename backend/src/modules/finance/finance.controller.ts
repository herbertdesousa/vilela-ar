import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  ParseArrayPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { FinanceIncome, FinanceOutcome } from '@prisma/client';

import { SaveFinanceDto } from './dto/save-finance.dto';

import { FinanceService } from './finance.service';

@Controller('finances')
export class FinanceController {
  constructor(private financeService: FinanceService) {}

  @Post()
  async create(
    @Body() body?: SaveFinanceDto,
  ): Promise<FinanceIncome | FinanceOutcome> {
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
