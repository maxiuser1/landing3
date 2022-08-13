import { CosmosClient, type SqlQuerySpec } from '@azure/cosmos';

export class EventosRepo implements App.EventosRepoInterface {
	cn: string;

	constructor(cn: string) {
		this.cn = cn;
	}

	getEventosDestacados = async (): Promise<Array<App.Evento> | undefined> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('eventos');

		const querySpec: SqlQuerySpec = {
			query: 'SELECT c.banner, c.slug, c.fechas,c.nombre,c.artista,c.lugar FROM c WHERE c.destacado'
		};

		const { resources: items } = await container.items.query<App.Evento>(querySpec).fetchAll();

		return items;
	};
}
