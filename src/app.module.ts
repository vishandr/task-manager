import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
// import { ConfigModule } from '@nestjs/config';

// console.log('ENV CONFIG:', {
//   DB_HOST: process.env.DB_HOST,
//   DB_PORT: process.env.DB_PORT,
//   DB_USERNAME: process.env.DB_USERNAME,
//   DB_PASSWORD: process.env.DB_PASSWORD,
//   DB_NAME: process.env.DB_NAME,
//   DB_SSL: process.env.DB_SSL,
// });
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT as string),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl:
        process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    console.log('Database connection successful');
  }
}
