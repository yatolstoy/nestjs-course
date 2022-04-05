import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { InjectModel } from 'nestjs-typegoose';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './user.model';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
		private readonly jwtService: JwtService,
	) {}

	async createUser({ login, password }: AuthDto) {
		const salt = genSaltSync(8);
		const passwordHash = hashSync(password, salt);
		const newUser = new this.userModel({
			email: login,
			passwordHash,
		});
		return newUser.save();
	}

	async findUser(email: string) {
		return this.userModel.findOne({ email }).exec();
	}

	async validateUser({ login, password }: AuthDto) {
		const user = await this.findUser(login);
		if (!user) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		}
		const comparePassword = compareSync(password, user.passwordHash);
		if (!comparePassword) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
		}
		return {
			login: user.email,
		};
	}

	async login(email: string) {
		const payload = { email };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
