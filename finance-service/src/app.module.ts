import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FinanceModule } from './modules/finance/finance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('NODE_ENV') === 'development'
          ? configService.get<string>('MONGODB_URI_LOCAL')
          : configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    FinanceModule,
  ],
})
export class AppModule {}
