import { EnsallosRepo } from '$lib/repos';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const ensallosRepo = new EnsallosRepo(import.meta.env.VITE_DATABASE_URL);

	event.locals.ensallosRepo = ensallosRepo;

	const response = await resolve(event);

	return response;
};
