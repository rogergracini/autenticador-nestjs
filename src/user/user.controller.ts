import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller('/users')
export class UserController {

    constructor(
        private readonly service: UserService
    ) {}

    @Get()
    public index() {
        return this.service.getList()
    }

    @Get(':id')
    public get(@Param('id') id: string) {
        return this.service.getById(Number(id))
    }

    @Post()
    public store(@Body() body: User) {
        return this.service.create(body)
    }

    @Put(':id')
    public update(@Param('id') id: string, @Body() body: User) {
        return this.service.update(Number(id), body)
    }

    @Delete(':id')
    public remove(@Param('id') id: string) {
        return this.service.remove(Number(id))
    }

}