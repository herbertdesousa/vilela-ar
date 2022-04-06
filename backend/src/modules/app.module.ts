import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from 'src/common/services/prisma/prisma.module';
import { ExistsOnTableRule } from 'src/common/validations/ExistsOnTable';
import { CustomerModule } from './customer/customer.module';
import { DocumentModule } from './document/document.module';
import { FinanceModule } from './finance/finance.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    CustomerModule,
    FinanceModule,
    DocumentModule,
  ],
  providers: [ExistsOnTableRule],
})
export class AppModule {}
