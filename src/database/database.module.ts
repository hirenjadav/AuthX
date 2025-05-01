import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const username = configService.get<string>('DB_USERNAME');
        const password = configService.get<string>('DB_PASSWORD');
        const host = configService.get<string>('DB_HOST');
        const dbName = configService.get<string>('DB_NAME');

        let uri: string = `mongodb://${host}/${dbName}`;

        if (username && password) {
          uri = `mongodb://${username}:${password}@${host}/${dbName}`;
        }

        return { uri };
      },
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
