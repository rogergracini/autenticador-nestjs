import { Body, Controller, Post } from '@nestjs/common'

import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {

    constructor(private readonly service: AuthService) {}

    @Post('login')
    public async login(@Body() { username, password }: { username: string, password: string }) {
        return await this.service.signIn(username, password)
    }

}
