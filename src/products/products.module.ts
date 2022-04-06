import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ProductsController } from './products.controller';
import { ProductsModel } from './products.model';
import { ProductsService } from './products.service';

@Module({
	controllers: [ProductsController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: ProductsModel,
				schemaOptions: {
					collection: 'Products',
				},
			},
		]),
	],
	providers: [ProductsService],
})
export class ProductsModule {}
