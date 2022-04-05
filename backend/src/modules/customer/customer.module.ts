import { Module } from '@nestjs/common';

import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerAddressModule } from './customer-address/customer.module';

@Module({
  imports: [CustomerAddressModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
