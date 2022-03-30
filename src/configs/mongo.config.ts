import { ConfigService } from '@nestjs/config';

export const getMongoConfig = (configService: ConfigService) => {
	return {
		uri: getMongoUri(configService),
		...getMongoOptions(),
	};
};

const getMongoUri = (configService) =>
	'mongodb://' +
	configService.get('MONGO_LOGIN') +
	':' +
	configService.get('MONGO_PASSWORD') +
	'@' +
	configService.get('MONGO_HOST') +
	':' +
	configService.get('MONGO_PORT') +
	'/' +
	configService.get('MONGO_AUTHDATABASE');

const getMongoOptions = () => ({
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
