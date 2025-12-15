import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';
import { LeaveModule } from './leave/leave.module';


@Module({
  imports: [AuthModule, UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',       // default username
      password: '1234',  // enter your PG password
      database: 'nest_crud_1',      // DB name created in pgAdmin
      autoLoadEntities: true,     // automatically loads all entities
      synchronize: true,          // auto create DB tables (only for dev)
    }),
    EmployeeModule,
    LeaveModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
