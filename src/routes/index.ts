import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { eventosRepo } }) => {
	const eventos = await eventosRepo.getEventosDestacados();
	return { body: { eventos } };
};
