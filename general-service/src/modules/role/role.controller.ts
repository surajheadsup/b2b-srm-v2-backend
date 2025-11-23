import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { DeleteRoleDto } from './dto/delete-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { ResponseUtil } from '../../common/utils/response.util';
import { TimeoutInterceptor } from '../../common/interceptors/timeout.interceptor';

@Controller()
@UseInterceptors(TimeoutInterceptor)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create-role')
  async create(@Body() createRoleDto: CreateRoleDto) {
    const role = await this.roleService.create(createRoleDto);
    return ResponseUtil.created(role, 'Role created successfully');
  }

  @Post('get-roles')
  async findAll(@Body() queryDto: QueryRoleDto) {
    const result = await this.roleService.findAll(queryDto);
    return ResponseUtil.paginated(
      result.data,
      result.total,
      result.page,
      result.limit,
      'Roles retrieved successfully'
    );
  }

  @Post('update-role')
  async update(@Body() updateRoleDto: UpdateRoleDto) {
    const role = await this.roleService.update(updateRoleDto);
    return ResponseUtil.success(role, 'Role updated successfully');
  }

  @Post('delete-role')
  async remove(@Body() deleteRoleDto: DeleteRoleDto) {
    const result = await this.roleService.remove(deleteRoleDto);
    return ResponseUtil.success(result.message);
  }
}
