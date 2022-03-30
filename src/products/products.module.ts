import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ProductsController } from './products.controller';
import { ProductsModel } from './products.model';

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
})
export class ProductsModule {}
