import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/reviews/dto/create.review.dto';
import { Types, disconnect } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/reviews/review.constants';
import { send } from 'process';

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
	name: 'ТЕСТ',
	title: 'Заголовок',
	description: 'Описание теста',
	rating: 5,
	productId,
};

const loginDto = {
	login: 'a2a@a.ru',
	password: '123',
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;
	let token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		const res = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto);

		token = res.body.access_token;
	});

	it('/reviews/create (POST) - success', async () => {
		const result = await request(app.getHttpServer())
			.post('/reviews/create')
			.send(testDto);

		expect(result.statusCode).toBe(201);
		createdId = result.body._id;
		expect(createdId).toBeDefined();
	});

	it('/reviews/create (POST) - check validation', async () => {
		const result = await request(app.getHttpServer())
			.post('/reviews/create')
			.send({ ...testDto, rating: 0 });

		expect(result.statusCode).toBe(400);
	});

	it('/reviews/byProduct/:productId (GET) - success', async () => {
		const result = await request(app.getHttpServer()).get(
			'/reviews/byProduct/' + productId,
		);

		expect(result.statusCode).toBe(200);
		expect(result.body.length).toBe(1);
	});

	it('/reviews/byProduct/:productId (GET) - unsuccess', async () => {
		const result = await request(app.getHttpServer()).get(
			'/reviews/byProduct/' + new Types.ObjectId().toHexString(),
		);

		expect(result.statusCode).toBe(200);
		expect(result.body.length).toBe(0);
	});

	it('/reviews/:id (DELETE) - success', async () => {
		await request(app.getHttpServer())
			.delete('/reviews/' + createdId)
			.set('Authorization', 'Bearer ' + token)
			.expect(200);
	});

	it('/reviews/:id (DELETE) - unsuccess', async () => {
		await request(app.getHttpServer())
			.delete('/reviews/' + new Types.ObjectId().toHexString())
			.set('Authorization', 'Bearer ' + token)
			.expect(404, {
				statusCode: 404,
				message: REVIEW_NOT_FOUND,
			});
	});

	afterAll(async () => {
		await disconnect();
	});
});
