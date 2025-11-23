import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { DeleteVendorDto } from './dto/delete-vendor.dto';
import { QueryVendorDto } from './dto/query-vendor.dto';
import { ResponseUtil } from '../../common/utils/response.util';
import { TimeoutInterceptor } from '../../common/interceptors/timeout.interceptor';

@Controller()
@UseInterceptors(TimeoutInterceptor)
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post('create-vendor')
  async create(@Body() createVendorDto: CreateVendorDto) {
    const vendor = await this.vendorService.create(createVendorDto);
    return ResponseUtil.created(vendor, 'Vendor created successfully');
  }

  @Post('get-vendors')
  async findAll(@Body() queryDto: QueryVendorDto) {
    const result = await this.vendorService.findAll(queryDto);
    return ResponseUtil.paginated(
      result.data,
      result.total,
      result.page,
      result.limit,
      'Vendors retrieved successfully'
    );
  }

  @Post('update-vendor')
  async update(@Body() updateVendorDto: UpdateVendorDto) {
    const vendor = await this.vendorService.update(updateVendorDto);
    return ResponseUtil.success(vendor, 'Vendor updated successfully');
  }

  @Post('delete-vendor')
  async remove(@Body() deleteVendorDto: DeleteVendorDto) {
    const result = await this.vendorService.remove(deleteVendorDto);
    return ResponseUtil.success(result.message);
  }
}
