import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  ParseUUIDPipe,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { Document } from '@prisma/client';

import { DocumentService } from './document.service';
import { SaveDocumentDto } from './dto/save-document.dto';

@Controller('document')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Post()
  async create(@Body() body?: SaveDocumentDto): Promise<any> {
    return await this.documentService.create(body);
  }

  @Get()
  async findAll(): Promise<Document[]> {
    return await this.documentService.findAll();
  }

  @Delete()
  async delete(@Query('id', ParseUUIDPipe) id: string): Promise<Document> {
    try {
      return await this.documentService.delete(id);
    } catch (err) {
      console.log(err);

      throw new NotFoundException('not found customer with id ' + id);
    }
  }

  // @Get()
  // async findAllFromCustomer(
  //   @Query('customerId', ParseUUIDPipe) customerId: string,
  // ): Promise<Document[]> {
  //   return await this.documentService.findAllFromCustomer(customerId);
  // }
}
