import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto.js';
import { UpdateCustomerDto } from './dto/update-customer.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isValidObjectId } from 'mongoose';

import { KycDocument, Kyc } from './Schema/schema.js';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  ConflictException
} from '@nestjs/common';
import { kycStatus } from './Enum/enum.js';
@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Kyc.name) private kycModel: Model<KycDocument>
  ) { }
  async create(createCustomerDto: CreateCustomerDto, idempotencyKey: string) {
    const existingCustomer = await this.kycModel.findOne({ idempotencyKey })

    if (existingCustomer) {
      throw new ConflictException('Customer exists');
    }

    const existingEmail = await this.kycModel.findOne({ email: createCustomerDto.email.toLowerCase() })
    if (existingEmail) {
      throw new ConflictException('Email Exists');

    }
    const create = new this.kycModel({ ...createCustomerDto, idempotencyKey, kycStatus: kycStatus.PENDING, })

    const saveCustomer = await create.save()

    return saveCustomer

  }

  async findAll() {

    return this.kycModel.find().exec()
  }

  async findOne(id: string) {
    const found = await this.kycModel.findById(id).exec()
    if (!found) {
      throw new NotFoundException('record not found')

    } else {
      return found;

    }
  }

  async approve(id: string) {
    return this.transition(id, kycStatus.APPROVED);
  }

  async reject(id: string) {
    return this.transition(id, kycStatus.REJECTED);
  }

  async findPending() {
    return this.kycModel
      .find({ status: kycStatus.PENDING })
      .sort({ createdAt: 1 });
  }

  private async transition(id: string, to: kycStatus) {
    const customer = await this.kycModel.findOneAndUpdate(
      { _id: id, status: kycStatus.PENDING },
      { status: to, completedAt: new Date() },
      { new: true },
    );

    if (customer) return customer;

    const existing = await this.kycModel.findById(id);
    if (!existing) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    throw new ConflictException(
      `Cannot ${to.toLowerCase()} customer in ${existing.status} state`,
    );

  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
function newErrorHandler() {
  throw new Error('Function not implemented.');
}

