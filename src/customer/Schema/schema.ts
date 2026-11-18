import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { kycStatus } from "./../Enum/enum.js";

export type KycDocument  = Kyc & Document;

 @Schema({ timestamps: true})

 export class Kyc {
    @Prop({required : true })
    name : string

    
    @Prop({ required: true, unique: true, index: true, lowercase: true, trim: true })
    email: string;
    
    @Prop({required : true })
    balance : number

  
    @Prop({type: String, default: kycStatus.PENDING, enum: kycStatus  })
    status: kycStatus;
  
    @Prop()
    completedAt: Date;

    @Prop({ required: true, unique: true, index: true })
    idempotencyKey: string
   

 }

 export const  KycSchema = SchemaFactory.createForClass(Kyc)