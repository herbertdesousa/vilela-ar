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
} from '@nestjs/common';
import { Finance } from '@prisma/client';

import { SaveFinanceDto } from './dto/save-finance.dto';

import { FinanceService } from './finance.service';

@Controller('finances')
export class FinanceController {
  constructor(private financeService: FinanceService) {}

  @Post()
  async create(@Body() body?: SaveFinanceDto): Promise<Finance> {
    return await this.financeService.create(body);
  }

  @Get()
  async list(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('filter_date') date: string,
  ): Promise<Finance[]> {
    if (date) {
      return await this.financeService.listInDay(date, {
        limit: limit || 5,
        page: page || 0,
      });
    }
    return await this.financeService.list({
      limit: limit || 5,
      page: page || 0,
    });
  }

  @Put()
  async update(
    @Query('id', ParseUUIDPipe) id: string,
    @Body() body?: SaveFinanceDto,
  ): Promise<Finance> {
    return await this.financeService.update(id, body);
  }

  @Delete()
  async delete(@Query('id', ParseUUIDPipe) id: string): Promise<Finance> {
    try {
      return await this.financeService.delete(id);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }
}
