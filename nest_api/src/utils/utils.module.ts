import { Module } from '@nestjs/common';
import { AppErrorService } from './appError.service';


@Module({
  providers: [AppErrorService]
})