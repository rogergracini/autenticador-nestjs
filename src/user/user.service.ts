import { HttpException, HttpStatus, Injectable } from "@nestjs/common"

import { User } from "./user.entity"
import { UserRepository } from "./user.repository"

@Injectable()
export class UserService {

    constructor(
        private readonly repository: UserRepository
    ) {}

    public removePassword(user: User) {
        const { password, ...rest } = user
        return rest
    }

    public async getById(id: number) {
        const result = await this.repository.findByPk(id)
        if (result) return this.removePassword(result)
        else throw new HttpException('User does not found!', HttpStatus.NOT_FOUND)
    }

    public async getByUsername(username: string) {
        return await this.repository.findByUsername(username)
    }

    public async getList() {
        return (await this.repository.findAll()).map(user => {
            return this.removePassword(user)
        })
    }

    public async create(record: User) {
        const result = await this.repository.create(record)
        if (result) return this.removePassword(result)
        else throw new HttpException('Username already exists!', HttpStatus.BAD_REQUEST)
    }

    public async update(id: number, record: User) {
        record.id = id
        const result = await this.repository.update(record)
        if (result) return this.removePassword(result)
        else throw new HttpException('User does not found!', HttpStatus.NOT_FOUND)
    }

    public async remove(id: number) {
        if (await this.repository.delete(id)) return true
        else throw new HttpException('User does not found!', HttpStatus.NOT_FOUND)
    }

}