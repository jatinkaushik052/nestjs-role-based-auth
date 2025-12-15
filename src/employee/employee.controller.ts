import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UpdateEmloyeeDto } from './dto/update-emloyee.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeService } from './employee.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/entities/role.enum';

@Controller('employee')
export class EmloyeeController {
  constructor(private readonly emloyeeService: EmployeeService) {}

  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(Role.ADMIN)
  @Post('register')
  create(@Body() CreateEmployeeDto: CreateEmployeeDto) {
    return this.emloyeeService.create(CreateEmployeeDto);
  }

  @Get('list')
  findAll() {
    return this.emloyeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emloyeeService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEmloyeeDto: UpdateEmloyeeDto) {
    return this.emloyeeService.update(id, updateEmloyeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emloyeeService.remove(id);
  }
}
