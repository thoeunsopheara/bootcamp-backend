import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "@users/users.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // const user = await this.usersService.findOne(email);
    // if(user && user.password === password){
    //   const { password, ...result } = user;
    //   return result
    // }
    return null;
  }

  async signJwt(user: any){
    return {
      token: this.jwtService.sign(user, {
        expiresIn: '30d',
        secret: this.configService.get('JWT_SECRET') || 'secret'
      })
    }
  }

}
