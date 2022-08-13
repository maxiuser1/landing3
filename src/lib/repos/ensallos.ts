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
			query: 'SELECT * FROM c WHERE c.general.slug = @slug',
			parameters: [{ name: '@slug', value: slug }]
		};
		const date1 = new Date();
		const { resources: items } = await container.items.query<App.Ensallo>(querySpec).fetchAll();
		const timer1 = date1.getTime() - new Date().getTime();

		const date2 = new Date();
		const { resources: items2 } = await container.items.query<App.Ensallo>(querySpec).fetchNext();
		const timer2 = date2.getTime() - new Date().getTime();

		console.log(`fetchAll:${timer1}   -- fetchNext: ${timer2}`);

		return items.length > 0 ? items[0] : null;
	};

	findBySlugWithSections = async (slug: string): Promise<App.Ensallo | null> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const censallos = await database.container('ensallos');

		const querySpec: SqlQuerySpec = {
			query: 'SELECT * FROM c WHERE c.general.slug = @slug',
			parameters: [{ name: '@slug', value: slug }]
		};

		const { resources: ensallos } = await censallos.items.query<App.Ensallo>(querySpec).fetchAll();

		const ensallo: App.Ensallo | null = ensallos.length > 0 ? ensallos[0] : null;

		if (!ensallo || !ensallo.ubicacion) return null;

		const cseccionamientos = await database.container('seccionamientos');
		const querySpec2: SqlQuerySpec = {
			query: 'SELECT * from c where c.id = @sid',
			parameters: [{ name: '@sid', value: ensallo.ubicacion.seccionamiento }]
		};
		const { resources: seccionamientos } = await cseccionamientos.items
			.query<App.Seccionamiento>(querySpec2)
			.fetchAll();

		const seccionamiento = seccionamientos.length > 0 ? seccionamientos[0] : null;

		if (!seccionamiento || !seccionamiento.general) return null;

		const resultado: App.Ensallo = { ...ensallo, mapa: seccionamiento.general.mapa };
		return resultado;
	};
}
