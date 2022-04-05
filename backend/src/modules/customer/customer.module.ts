import { Module } from '@nestjs/common';

import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerAddressModule } from './customer-address/customer-address.module';
import { CustomerRepresentativeModule } from './customer-representative/customer-representative.module';

@Module({
  imports: [CustomerAddressModule, CustomerRepresentativeModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
