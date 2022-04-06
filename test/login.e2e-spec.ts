import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import {
	USER_NOT_FOUND_ERROR,
	WRONG_PASSWORD_ERROR,
} from '../src/auth/auth.constants';

const loginDto = {
	login: 'a2a@a.ru',
	password: '123',
};

describe('Auth controller (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) - success login', async () => {
		const result = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto);

		expect(result.statusCode).toBe(200);
		expect(result.body.access_token).toBeDefined();
	});

	it('/auth/login (POST) - login error', async () => {
		const result = await request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, login: 'aaaaaaaaaaaaaaaa' });

		expect(result.statusCode).toBe(401);
		expect(result.body.message).toBe(USER_NOT_FOUND_ERROR);
	});

	it('/auth/login (POST) - password error', async () => {
		const result = await request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, password: 'aaaaaaaaaaaaaaaa' });

		expect(result.statusCode).toBe(401);
		expect(result.body.message).toBe(WRONG_PASSWORD_ERROR);
	});

	it('/auth/login (POST) - password should be string', async () => {
		const result = await request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, password: 111111111111111 });

		expect(result.statusCode).toBe(400);
		expect(result.body.message.length).toBeGreaterThanOrEqual(1);
	});

	afterAll(async () => {
		await disconnect();
	});
});
