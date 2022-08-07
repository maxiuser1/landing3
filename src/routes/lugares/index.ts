import { CosmosClient } from '@azure/cosmos';
import type { RequestHandler } from '@sveltejs/kit';
import 'dotenv/config';

export const GET: RequestHandler = async ({ locals: { lugaresRepo } }) => {
	const result = await lugaresRepo.getAll();

	if (result) {
		return {
			status: 200,
			headers: {},
			body: { lugares: result }
		};
	}

	return {
		status: 404
	};
};
