import { Injectable } from "@nestjs/common"

import { User } from "./user.entity"

@Injectable()
export class UserRepository implements Repository<User> {

    private document: User[] = [
        { id: 1, name: 'Uedson Reis', username: 'uedsonreis', password: '123456' }
    ]

    public async findAll(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            resolve(this.document)
        })
    }
    
    public async findByPk(id: number): Promise<User> {
        return new Promise((resolve, reject) => {
            resolve(this.document.find(user => user.id == id))
        })
    }
    
    public async create(record: User): Promise<User> {
        return new Promise((resolve, reject) => {
            const last = this.document[this.document.length-1]
            record.id = last.id + 1
            this.document.push(record)
            resolve(record)
        })
    }
    
    public async update(record: User): Promise<User> {
        const finded = await this.findByPk(record.id)

        return new Promise((resolve, reject) => {
            if (finded.password) {
                finded.password = record.password
            } else {
                finded.name = record.name
            }
            resolve(finded)
        })
    }
    
    public async delete(id: number): Promise<Boolean> {
        const finded = await this.findByPk(id)
        return new Promise((resolve, reject) => {
            if (finded) {
                this.document = this.document.filter(user => user.id != id)
                resolve(true)
            } else {
                resolve(false)
            }
        })
    }

}