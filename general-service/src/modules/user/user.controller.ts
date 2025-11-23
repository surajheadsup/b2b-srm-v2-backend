import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { ResponseUtil } from '../../common/utils/response.util';
import { TimeoutInterceptor } from '../../common/interceptors/timeout.interceptor';

@Controller()
@UseInterceptors(TimeoutInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return ResponseUtil.created(user, 'User created successfully');
  }

  @Post('get-users')
  async findAll(@Body() queryDto: QueryUserDto) {
    const result = await this.userService.findAll(queryDto);
    return ResponseUtil.paginated(
      result.data,
      result.total,
      result.page,
      result.limit,
      'Users retrieved successfully'
    );
  }

  @Post('update-user')
  async update(@Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(updateUserDto);
    return ResponseUtil.success(user, 'User updated successfully');
  }

  @Post('delete-user')
  async remove(@Body() deleteUserDto: DeleteUserDto) {
    const result = await this.userService.remove(deleteUserDto);
    return ResponseUtil.success(result.message);
  }
}
