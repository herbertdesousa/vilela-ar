import { Module } from '@nestjs/common';

import { CustomerRepresentativeService } from './customer-representative.service';
import { CustomerRepresentativeController } from './customer-representative.controller';

@Module({
  controllers: [CustomerRepresentativeController],
  providers: [CustomerRepresentativeService],
})
export class CustomerRepresentativeModule {}
