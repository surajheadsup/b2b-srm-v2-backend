import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { PipelineService } from './pipeline.service';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
import { DeletePipelineDto } from './dto/delete-pipeline.dto';
import { QueryPipelineDto } from './dto/query-pipeline.dto';
import { ResponseUtil } from '../../common/utils/response.util';
import { TimeoutInterceptor } from '../../common/interceptors/timeout.interceptor';

@Controller()
@UseInterceptors(TimeoutInterceptor)
export class PipelineController {
  constructor(private readonly pipelineService: PipelineService) {}

  @Post('create-pipeline')
  async create(@Body() createPipelineDto: CreatePipelineDto) {
    const pipeline = await this.pipelineService.create(createPipelineDto);
    return ResponseUtil.created(pipeline, 'Pipeline created successfully');
  }

  @Post('get-pipelines')
  async findAll(@Body() queryDto: QueryPipelineDto) {
    const result = await this.pipelineService.findAll(queryDto);
    return ResponseUtil.paginated(
      result.data,
      result.total,
      result.page,
      result.limit,
      'Pipelines retrieved successfully'
    );
  }

  @Post('update-pipeline')
  async update(@Body() updatePipelineDto: UpdatePipelineDto) {
    const pipeline = await this.pipelineService.update(updatePipelineDto);
    return ResponseUtil.success(pipeline, 'Pipeline updated successfully');
  }

  @Post('delete-pipeline')
  async remove(@Body() deletePipelineDto: DeletePipelineDto) {
    const result = await this.pipelineService.remove(deletePipelineDto);
    return ResponseUtil.success(result.message);
  }
}
