import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service.js';
import { CustomerController } from './customer.controller.js';
import {Kyc, KycSchema } from './Schema/schema.js'
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([{ name: Kyc.name, schema: KycSchema },
    {name : Kyc.name, schema : KycSchema}])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
