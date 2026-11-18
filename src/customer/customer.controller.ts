import { Controller, Get, Post, Headers, Body, Patch, Param, Delete,BadRequestException  } from '@nestjs/common';
import { CustomerService } from './customer.service.js';
import { CreateCustomerDto } from './dto/create-customer.dto.js';
import { UpdateCustomerDto } from './dto/update-customer.dto.js';
import { ParseMongoIdPipe } from './Pipes/parse-mongo-id.pipe.js'


@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto,

  @Headers('idempotency-key') idempotencyKey:string)
      
  {
    
    return this.customerService.create(createCustomerDto, idempotencyKey);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);

  }
  @Get('pending')
  findPending() {
    return this.customerService.findPending();
  }
 
  @Patch(':id/approve')
  approve(@Param('id', ParseMongoIdPipe) id: string) {
    return this.customerService.approve(id);
  }

  @Patch(':id/reject')
  reject(@Param('id', ParseMongoIdPipe) id: string) {
    return this.customerService.reject(id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
