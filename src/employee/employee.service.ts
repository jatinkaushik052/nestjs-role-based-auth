import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateEmloyeeDto } from './dto/update-emloyee.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
// import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(@InjectRepository(Employee) private repo: Repository<Employee>) { }

  async create(CreateEmployeeDto: CreateEmployeeDto) {
    const isEmp = await this.repo.findOne({ where: { mobile: CreateEmployeeDto.mobile } })
    if (isEmp) {
      throw new BadRequestException("Employee Number Already Exists")
    }
    const employee = this.repo.create(CreateEmployeeDto)
    const savedEmp = await this.repo.save(employee)

    return {
      status : 200,
      message: "Employee Created Successfully",
      data: savedEmp
    };
  }

  findAll() {
    return this.repo.find();
  }

 async findOne(id: string) {
    const empID = await this.repo.findOne({where : {id}})

    return {
      status :200,
      message: "Data fetch successfully",
      data: empID

    };
  }

  async update(id: string, updateEmloyeeDto: UpdateEmloyeeDto) {
    const empID = await this.repo.findOne({where: {id}})
    if(!empID) throw new BadRequestException ("Employee Not Found")

      const updateEmployee = Object.assign(empID, updateEmloyeeDto)
      await this.repo.save(updateEmployee)

    return {
      status : 200,
      message: "Employee Updated Successfully",
      data: updateEmployee
    };
  }

  async remove(id: string) {
     const empID = await this.repo.findOne({where: {id}})
    if(!empID) throw new BadRequestException ("Employee Not Found")

      const deleteEmployee= await this.repo.remove(empID)
    return {
      status : 200,
      message: "Employee Deleted Successfully",
      data: deleteEmployee
    }
  }
}
