import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CustomerModule } from './customer/customer.module.js';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com,
    // then run `npx @nestjs/observe link` to write your key pair into .env.
    MongooseModule.forRoot( 'mongodb://localhost:27017/kyc'), CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
