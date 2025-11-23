import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PipelineController } from './pipeline.controller';
import { PipelineService } from './pipeline.service';
import { Pipeline, PipelineSchema } from './schemas/pipeline.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pipeline.name, schema: PipelineSchema }]),
  ],
  controllers: [PipelineController],
  providers: [PipelineService],
  exports: [PipelineService, MongooseModule],
})
export class PipelineModule {}
