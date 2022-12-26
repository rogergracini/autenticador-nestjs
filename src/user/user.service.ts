import { Injectable } from "@nestjs/common"

import { User } from "./user.entity"
import { UserRepository } from "./user.repository"

@Injectable()
export class UserService {

    constructor(
        private readonly repository: UserRepository
    ) {}

    private removePassword(user: User) {
        const { password, ...rest } = user
        return rest
    }

    public async getById(id: number) {
        return this.removePassword(
            await this.repository.findByPk(id)
        )
    }

    public async getList() {
        return (await this.repository.findAll()).map(user => {
            return this.removePassword(user)
        })
    }

    public async create(record: User) {
        return this.removePassword(
            await this.repository.create(record)
        )
    }

    public async update(id: number, record: User) {
        record.id = id
        return this.removePassword(
            await this.repository.update(record)
        )
    }

    public async remove(id: number) {
        return this.repository.delete(id)
    }

}