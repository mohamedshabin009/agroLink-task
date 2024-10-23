import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { CropModule } from './crop/crop.module';
import { AgrochemicalModule } from './agrochemical/agrochemical.module';
import { RequestModule } from './request/request.module';
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root@123',
      database: 'agri_link',
      entities: [join(__dirname, '**/*.entity{.ts,.js}')],
      synchronize: true,
      //logging: true,
    }),
    CropModule,
    AgrochemicalModule,
    RequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
