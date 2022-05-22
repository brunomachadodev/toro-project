import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      host: 'localhost',
      username: 'root',
      password: 'root',
      database: 'toro',
      migrations: ['dist/database/migrations/**/*.{js,ts}'],
      entities: ['dist/**/*.entity.{js,ts}'],
      synchronize: false,
    }),
  ],
})
export class DatabaseModule {}
