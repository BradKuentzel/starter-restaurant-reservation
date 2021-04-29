/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */
require("dotenv").config();
const path = require("path");

const {
	DATABASE_URL = "postgres://yuewjgmj:Hg2B0_V5ufSAd4yOWGe8GlUUYiwbZWc6@queenie.db.elephantsql.com:5432/yuewjgmj",
	DATABASE_URL_DEVELOPMENT = "postgres://jcgmqbau:EsdfWsrkMfhen-UXR-4mBPl7RaeN5O3y@queenie.db.elephantsql.com:5432/jcgmqbau",
	DATABASE_URL_TEST = "postgres://aikgevkv:Ktq_Ig2Wo7Nyt1VJa-g-X6dBCmOU0re_@queenie.db.elephantsql.com:5432/aikgevkv",
	DATABASE_URL_PREVIEW = "postgres://bpuhiqgy:URKrzQMALf4Jd396wqNLF2F9cMdxDEIx@queenie.db.elephantsql.com:5432/bpuhiqgy",
	DEBUG,
} = process.env;

module.exports = {
	development: {
		client: "postgresql",
		pool: { min: 1, max: 5 },
		connection: DATABASE_URL_DEVELOPMENT,
		migrations: {
			directory: path.join(__dirname, "src", "db", "migrations"),
		},
		seeds: {
			directory: path.join(__dirname, "src", "db", "seeds"),
		},
		debug: !!DEBUG,
	},
	test: {
		client: "postgresql",
		pool: { min: 1, max: 5 },
		connection: DATABASE_URL_TEST,
		migrations: {
			directory: path.join(__dirname, "src", "db", "migrations"),
		},
		seeds: {
			directory: path.join(__dirname, "src", "db", "seeds"),
		},
		debug: !!DEBUG,
	},
	preview: {
		client: "postgresql",
		pool: { min: 1, max: 5 },
		connection: DATABASE_URL_PREVIEW,
		migrations: {
			directory: path.join(__dirname, "src", "db", "migrations"),
		},
		seeds: {
			directory: path.join(__dirname, "src", "db", "seeds"),
		},
		debug: !!DEBUG,
	},
	production: {
		client: "postgresql",
		pool: { min: 1, max: 5 },
		connection: DATABASE_URL,
		migrations: {
			directory: path.join(__dirname, "src", "db", "migrations"),
		},
		seeds: {
			directory: path.join(__dirname, "src", "db", "seeds"),
		},
		debug: !!DEBUG,
	},
};
