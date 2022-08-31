import { Controller, Request, UseGuards, Post, HttpCode } from "@nestjs/common";
import { Local } from "./guards/local";
import { AuthService } from "./auth.service";


@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @UseGuards(Local)
  async login(@Request() req){
    return this.authService.signJwt(req.user);
  }

}
