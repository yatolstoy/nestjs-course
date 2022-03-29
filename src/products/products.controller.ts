import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { FindProductDto } from './dto/find-product.dto';
import { ProductsModel } from './products.model';

@Controller('products')
export class ProductsController {
	@Post('create')
	async create(@Body() dto: Omit<ProductsModel, '_id'>) {}

	@Get(':id')
	async get(@Param('id') id: string) {}

	@Delete(':id')
	async delete(@Param() id: string) {}

	@Patch(':id')
	async update(@Param() id: string, @Body() dto: ProductsModel) {}

	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindProductDto) {}
}
