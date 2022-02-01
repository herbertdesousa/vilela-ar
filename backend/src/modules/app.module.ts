import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from 'src/common/services/prisma/prisma.module';
import { CustomerModule } from './customer/customer.module';
import { FinanceModule } from './finance/finance.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    CustomerModule,
    FinanceModule,
  ],
})
export class AppModule {}
