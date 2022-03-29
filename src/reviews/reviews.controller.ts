import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewsModel } from './reviews.model';

@Controller('reviews')
export class ReviewsController {
	@Post('create')
	async create(@Body() dto: Omit<ReviewsModel, '_id'>) {}

	@Delete(':id')
	async delete(@Param() id: string) {}

	@Get('byProduct/:productId')
	async getbyProduct(@Param() productId: string) {}
}
