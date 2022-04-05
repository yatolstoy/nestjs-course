import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { USER_EXIST_EXCEPTION } from './auth.constants';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDto) {
		const isUserExist = await this.authService.findUser(dto.login);
		if (isUserExist) {
			throw new BadRequestException(USER_EXIST_EXCEPTION);
		}
		return this.authService.createUser(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto) {
		const user = await this.authService.validateUser(dto);
		const token = await this.authService.login(user.login);
		return token;
	}
}
