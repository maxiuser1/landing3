import { CosmosClient } from '@azure/cosmos';

export class EventosRepo implements App.LugaresRepoInterface {
	cn: string;

	constructor(cn: string) {
		this.cn = cn;
	}

	getAll = async (): Promise<App.Lugar | undefined> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const parametros = await database.container('parametros');

		const { resource: result } = await parametros
			.item('280100cd-c1eb-4852-aee0-e0dd41118d57', 'lugares')
			.read<App.Lugar>();

		return result;
	};
}
