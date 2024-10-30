import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoModule } from './app/todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configservice: ConfigService) => ({
        type: 'mariadb',
        host: configservice.get('DB_HOST', 'localhost'),
        port: Number(configservice.get('DB_PORT', 3306)),
        username: configservice.get('DB_USERNAME', 'root'),
        password: configservice.get('DB_PASSWORD', '123'),
        database: configservice.get('DB_DATABASE', 'todo'),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: true,
      }),
    }),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
