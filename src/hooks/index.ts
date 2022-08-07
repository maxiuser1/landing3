import { LugaresRepo } from '$lib/repos/lugares';
import { CosmosClient } from '@azure/cosmos';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const client = new CosmosClient(import.meta.env.VITE_DATABASE_URL);
	const database = await client.database('quehaydb');
	const parametros = await database.container('parametros');

	const lugaresRepo = new LugaresRepo(parametros);

	event.locals.lugaresRepo = lugaresRepo;

	const response = await resolve(event);

	return response;
};
