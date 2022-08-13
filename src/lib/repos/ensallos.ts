import { CosmosClient, type SqlQuerySpec } from '@azure/cosmos';

export class EnsallosRepo implements App.EnsallosRepoInterface {
	cn: string;

	constructor(cn: string) {
		this.cn = cn;
	}
	findBySlug = async (slug: string): Promise<App.Ensallo | null> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('ensallos');

		const querySpec: SqlQuerySpec = {
			query: 'SELECT * FROM c f WHERE f.general.slug = @slug',
			parameters: [{ name: '@slug', value: slug }]
		};

		const { resources: items } = await container.items.query<App.Ensallo>(querySpec).fetchAll();
		console.log('items', items, slug);
		return items[0];
	};
}
