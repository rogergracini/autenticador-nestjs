import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserService } from 'src/user/user.service'


@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    public async signIn(username: string, password: string): Promise<string | null> {
        const user = await this.userService.getByUsername(username)

        if (user && password === user.password) {
            return this.jwtService.sign(
                this.userService.removePassword(user)
            )
        }

        throw new HttpException('Invalid login!', HttpStatus.UNAUTHORIZED)
    }

}
