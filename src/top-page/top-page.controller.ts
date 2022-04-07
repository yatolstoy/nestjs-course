import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { CreateTopPageDto } from './dto/create.top-page.dto';
import { FindTopPageDto } from './dto/find.top-page.dto';
import { TOP_PAGE_NOT_FOUND } from './top-page.constants';
import { TopPageModel } from './top-page.model';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {
	constructor(private readonly topPageService: TopPageService) {}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateTopPageDto) {
		return this.topPageService.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const topPage = await this.topPageService.getById(id);
		if (!topPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND);
		}
		return topPage;
	}

	@Get('byAlias/:alias')
	async getByAlias(@Param('alias') alias: string) {
		const findByAlias = await this.topPageService.getByAlias(alias);
		if (!findByAlias) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND);
		}
		return findByAlias;
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedTopPage = await this.topPageService.deleteById(id);
		if (!deletedTopPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND);
		}
		return deletedTopPage;
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async update(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: TopPageModel,
	) {
		const updatedTopPage = await this.topPageService.updateById(id, dto);
		if (!updatedTopPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND);
		}
		return updatedTopPage;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindTopPageDto) {
		return this.topPageService.findByCategory(dto.firstCategory);
	}
}
