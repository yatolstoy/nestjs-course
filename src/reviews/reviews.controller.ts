import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { TelegramService } from 'src/telegram/telegram.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateReviewDto } from './dto/create.review.dto';
import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
	constructor(
		private readonly reviewService: ReviewsService,
		private readonly telegramService: TelegramService,
	) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@UsePipes(new ValidationPipe())
	@Post('notify')
	async notify(@Body() dto: CreateReviewDto) {
		const message =
			`Имя: ${dto.name}\n` +
			`Заголовок: ${dto.title}\n` +
			`Описание: ${dto.description}\n` +
			`Рейтинг: ${dto.rating}\n` +
			`ID продукта: ${dto.productId}\n`;
		return this.telegramService.sendMessage(message);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedDoc = await this.reviewService.delete(id);
		if (!deletedDoc) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@Get('byProduct/:productId')
	async getbyProduct(@Param('productId', IdValidationPipe) productId: string) {
		return this.reviewService.findByProductId(productId);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('byProduct/:productId')
	async deleteByProduct(
		@Param('productId', IdValidationPipe) productId: string,
	) {
		this.reviewService.deleteByProductId(productId);
	}
}
