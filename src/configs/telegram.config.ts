import { ConfigService } from '@nestjs/config';
import { ItelegramOptions } from 'src/telegram/telegram.interface';

export const telegramConfig = (
	configService: ConfigService,
): ItelegramOptions => {
	const token = configService.get('TELEGRAM_TOKEN');
	if (!token) {
		throw new Error('TELEGRAM_TOKEN не задан');
	}

	const chatId = configService.get('TELEGRAM_CHAT_ID') ?? '';
	return {
		token,
		chatId,
	};
};
