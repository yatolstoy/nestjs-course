import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from 'src/reviews/dto/create.review.dto';
import { Types, disconnect } from 'mongoose';

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
	name: 'ТЕСТ',
	title: 'Заголовок',
	description: 'Описание теста',
	rating: 5,
	productId,
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/reviews/create (POST)', async () => {
		const result = await request(app.getHttpServer())
			.post('/reviews/create')
			.send(testDto);

		expect(result.statusCode).toBe(201);
		expect(result.body._id).toBeDefined();
	});

	afterAll(async () => {
		await disconnect();
	});
});
