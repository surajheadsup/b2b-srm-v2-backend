import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PoController } from './po.controller';
import { PoService } from './po.service';
import { Po, PoSchema } from './schemas/po.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Po.name, schema: PoSchema }]),
  ],
  controllers: [PoController],
  providers: [PoService],
  exports: [PoService, MongooseModule],
})
export class PoModule {}
