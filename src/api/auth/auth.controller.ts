import { Controller, Request, UseGuards, Post, HttpCode } from '@nestjs/common';
import { Local } from './guards/local';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @UseGuards(Local)
  async login(@Request() req) {
    return this.authService.signJwt(req.user);
  }
}
