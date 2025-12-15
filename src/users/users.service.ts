import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private repo: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.repo.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const savedUser = await this.repo.save(user);
    const { password, ...userWithoutPassword } = savedUser;
    return {
      status: 200,
      message: 'User Created Successfully',
      data: userWithoutPassword,
    };

  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    console.log("Id ", id)
    const userData = await this.repo.findOne({ where: { id } })
    return {
      status: 200,
      message: 'Data By Id',
      data: userData
    }
  }

  async findByEmail(email: string) {
    const isEmail = await this.repo.findOne({ where: { email } })
    return {
      status: 200,
      message: 'Data By Email Id',
      data: isEmail
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    const updatedUser = Object.assign(user, updateUserDto);
    await this.repo.save(updatedUser);

    return {
      status: 200,
      message: "Updated successfully",
      data: updatedUser,
    };
  }

  async remove(id: string) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    await this.repo.remove(user);

    return {
      status: 200,
      message: "Deleted successfully",
      data: user,
    };
  }
}
