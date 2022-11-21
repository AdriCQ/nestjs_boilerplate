import { Module } from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { UsersResolver } from './providers/users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersResolver, UsersService],
    exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}

export * from './providers/users.service';
export * from './entities/user.entity';
export * from './dto/create-user.input';
export * from './dto/update-user.input';
