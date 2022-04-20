import { Injectable } from '@nestjs/common';

import { Document } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

import { SaveDocumentDto } from './dto/save-document.dto';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  async create(payload: SaveDocumentDto): Promise<Document> {
    return await this.prisma.document.create({
      data: {
        ...(({ blocks, ...rest }) => rest)(payload),
        documentBlock: {
          create: payload.blocks.map(({ places, materials, name, ...r }) => ({
            documentRefBlockNameId: name,
            ...r,
            documentBlockMaterial: {
              create: materials.map((i) => ({ documentRefMaterialId: i })),
            },
            documentBlockPlace: {
              create: places.map((place) => ({
                documentRefPlaceFloorId: place.floor,
                documentRefPlaceRoomId: place.room,
                documentBlockPlaceDevice: {
                  create: place.devices.map((device) => ({
                    quantity: device.quantity,
                    type: device.type,
                    documentRefDeviceBrandId: device.brand,
                    documentRefDeviceCapacityId: device.capacity,
                    documentRefDeviceModeId: device.mode,
                  })),
                },
              })),
            },
          })),
        },
      },
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
