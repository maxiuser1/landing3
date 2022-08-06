import { CosmosClient } from '@azure/cosmos';

export async function GET() {
	const client = new CosmosClient(
		'AccountEndpoint=https://encuestasdb.documents.azure.com:443/;AccountKey=jbUfTnFcRnprj1rKnuMxQXBsiJr4ph2MTxdyDWhKYHNZe0z0Et6ecKIkKnVOcY8uaWBTiPDG3BjBetDtj7lfpA=='
	);

	const database = await client.database('quehaydb');
	const container = await database.container('parametros');

	const { resource: result } = await container
		.item('280100cd-c1eb-4852-aee0-e0dd41118d57', 'lugares')
		.read();

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
}
