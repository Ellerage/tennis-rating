import { TypeOrmModuleOptions } from '@nestjs/typeorm'

const isProduction = process.env.NODE_ENV === 'production'

export const typeOrmConfig: TypeOrmModuleOptions = {
	type: 'postgres',
	host: 'localhost',
	username: 'tennis_rating',
	password: 'tennis_rating',
	port: 5432,
	database: 'tennis_rating',
	entities: [__dirname + '/../**/*.entity.{js,ts}'],
	synchronize: true,
	logging: !isProduction,
	migrations: ['src/migrations/*.{js.ts}'],
	cli: {
		migrationsDir: 'src/migrations'
	},
}