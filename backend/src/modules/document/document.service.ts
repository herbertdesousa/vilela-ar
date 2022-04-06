import { Injectable } from '@nestjs/common';

import { Document } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

import { SaveDocumentDto } from './dto/save-document.dto';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  async create(payload: SaveDocumentDto): Promise<Document> {
    return await this.prisma.document.create({ data: payload });
  }

  async update(id: string, payload: SaveDocumentDto): Promise<Document> {
    return await this.prisma.document.update({
      where: { id },
      data: payload,
    });
  }

  async findAll(): Promise<Document[]> {
    return await this.prisma.document.findMany();
  }

  async delete(id: string): Promise<Document> {
    return await this.prisma.document.delete({
      where: { id },
    });
  }

  // async findAllFromCustomer(customerId: string): Promise<Document[]> {
  //   return await this.prisma.document.findMany({
  //     where: { customerId },
  //   });
  // }
}
