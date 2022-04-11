import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { TelegramModule } from 'src/telegram/telegram.module';
import { ReviewsController } from './reviews.controller';
import { ReviewsModel } from './reviews.model';
import { ReviewsService } from './reviews.service';

@Module({
	controllers: [ReviewsController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: ReviewsModel,
				schemaOptions: {
					collection: 'Review',
				},
			},
		]),
		TelegramModule,
	],
	providers: [ReviewsService],
})
export class ReviewsModule {}
