import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { getMongoConfig } from './configs/mongo.config';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TopPageModule } from './top-page/top-page.module';
import { FilesModule } from './files/files.module';
import { TelegramModule } from './telegram/telegram.module';
import { telegramConfig } from './configs/telegram.config';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
		AuthModule,
		ProductsModule,
		ReviewsModule,
		TopPageModule,
		FilesModule,
		TelegramModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: telegramConfig,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
