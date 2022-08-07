import { CosmosClient } from '@azure/cosmos';
import 'dotenv/config';

export async function GET() {
	const cs: string = import.meta.env.VITE_DATABASE_URL || '';
	console.log('cs', cs);
	const client = new CosmosClient(cs);

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
