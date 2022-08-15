import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { ensallosRepo } }) => {
	const { slug } = params;
	const ensallo = await ensallosRepo.findBySlug(slug);

	if (!ensallo) {
		return { status: 404 };
	}

	return { body: { evento: ensallo } };
};
