import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput, UpdateUserInput } from '../dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
    /**
     * constructor
     * @param $repo
     */
    constructor(
        @InjectRepository(User) private readonly $repo: Repository<User>,
    ) {}
    /**
     * create
     * @param createUserInput
     * @returns
     */
    async create(createUserInput: CreateUserInput) {
        const user = this.$repo.create(new User(createUserInput));
        const saveResp = await user.save();
        if (saveResp) return saveResp;
        throw new InternalServerErrorException();
    }
    /**
     *
     * @returns
     */
    async findAll() {
        return this.$repo.find();
    }
    /**
     * findOne
     * @param where
     * @returns
     */
    async findOne(where: { email?: string; id?: number }) {
        return await this.$repo.findOne({ where });
    }
    /**
     * update
     * @param id
     * @param updateUserInput
     * @returns
     */
    async update(id: number, updateUserInput: UpdateUserInput) {
        const user = await this.findOne({ id });
        if (user) return this.$repo.update(id, updateUserInput);
        throw new BadRequestException();
    }
    /**
     *
     * @param id
     * @returns
     */
    async remove(id: number) {
        const user = await this.findOne({ id });
        if (user) return this.$repo.delete(id);
        throw new BadRequestException();
    }
}
