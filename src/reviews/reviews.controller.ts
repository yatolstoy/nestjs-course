import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create.review.dto';
import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
	constructor(private readonly reviewService: ReviewsService) {}

	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedDoc = await this.reviewService.delete(id);
		if (!deletedDoc) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@Get('byProduct/:productId')
	async getbyProduct(@Param('productId') productId: string) {
		return this.reviewService.findByProductId(productId);
	}

	@Delete('byProduct/:productId')
	async deleteByProduct(@Param('productId') productId: string) {
		this.reviewService.deleteByProductId(productId);
	}
}
