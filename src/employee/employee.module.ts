import { Module } from '@nestjs/common';

import { EmloyeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { EmployeeService } from './employee.service';


@Module({
  imports :[TypeOrmModule.forFeature([Employee])],
  controllers: [EmloyeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
