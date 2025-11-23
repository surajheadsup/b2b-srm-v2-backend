import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { VendorModule } from './modules/vendor/vendor.module';
import { CustomerModule } from './modules/customer/customer.module';
import { QuotationModule } from './modules/quotation/quotation.module';
import { OrderModule } from './modules/order/order.module';
import { PoModule } from './modules/po/po.module';
import { PipelineModule } from './modules/pipeline/pipeline.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
        ...configService.get('database.options'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ProductModule,
    UserModule,
    RoleModule,
    VendorModule,
    CustomerModule,
    QuotationModule,
    OrderModule,
    PoModule,
    PipelineModule,
  ],
})
export class AppModule {}