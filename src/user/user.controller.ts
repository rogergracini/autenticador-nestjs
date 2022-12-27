import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller('/users')
export class UserController {

    constructor(
        private readonly service: UserService
    ) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    public index() {
        return this.service.getList()
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    public get(@Param('id') id: string) {
        return this.service.getById(Number(id))
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    public store(@Body() body: User) {
        return this.service.create(body)
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    public update(@Param('id') id: string, @Body() body: User) {
        return this.service.update(Number(id), body)
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    public remove(@Param('id') id: string) {
        return this.service.remove(Number(id))
    }

}