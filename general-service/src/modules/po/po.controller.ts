import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { PoService } from './po.service';
import { CreatePoDto } from './dto/create-po.dto';
import { UpdatePoDto } from './dto/update-po.dto';
import { DeletePoDto } from './dto/delete-po.dto';
import { QueryPoDto } from './dto/query-po.dto';
import { ResponseUtil } from '../../common/utils/response.util';
import { TimeoutInterceptor } from '../../common/interceptors/timeout.interceptor';

@Controller()
@UseInterceptors(TimeoutInterceptor)
export class PoController {
  constructor(private readonly poService: PoService) {}

  @Post('create-po')
  async create(@Body() createPoDto: CreatePoDto) {
    const po = await this.poService.create(createPoDto);
    return ResponseUtil.created(po, 'PO created successfully');
  }

  @Post('get-pos')
  async findAll(@Body() queryDto: QueryPoDto) {
    const result = await this.poService.findAll(queryDto);
    return ResponseUtil.paginated(
      result.data,
      result.total,
      result.page,
      result.limit,
      'POs retrieved successfully'
    );
  }

  @Post('update-po')
  async update(@Body() updatePoDto: UpdatePoDto) {
    const po = await this.poService.update(updatePoDto);
    return ResponseUtil.success(po, 'PO updated successfully');
  }

  @Post('delete-po')
  async remove(@Body() deletePoDto: DeletePoDto) {
    const result = await this.poService.remove(deletePoDto);
    return ResponseUtil.success(result.message);
  }
}
