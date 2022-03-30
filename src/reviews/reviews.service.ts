import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { CreateReviewDto } from './dto/create.review.dto';
import { ReviewsModel } from './reviews.model';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class ReviewsService {
	constructor(
		@InjectModel(ReviewsModel)
		private readonly reviewModel: ModelType<ReviewsModel>,
	) {}

	async create(dto: CreateReviewDto): Promise<DocumentType<ReviewsModel>> {
		return this.reviewModel.create(dto);
	}

	async delete(id: string): Promise<DocumentType<ReviewsModel> | null> {
		return this.reviewModel.findByIdAndDelete(id).exec();
	}

	async findByProductId(
		productId: string,
	): Promise<DocumentType<ReviewsModel>[]> {
		return this.reviewModel
			.find({ productId: new Types.ObjectId(productId) })
			.exec();
	}

	async deleteByProductId(productId: string) {
		return this.reviewModel
			.deleteMany({ productId: new Types.ObjectId(productId) })
			.exec();
	}
}
