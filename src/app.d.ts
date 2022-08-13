// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	type Compra = {
		evento: {
			id?: string;
			slug?: string;
			artista?: string;
		};
		zona?: {
			tipo: string;
			base: number;
			numerado?: boolean;
		};
		user?: any;
		entradas?: Array<Sentado>;
	};

	type Seccion = {
		tipo: string;
		base: number;
		numerado: boolean;
	};

	type Seccionamiento = {
		general: {
			mapa: string;
		};
	};

	type Precio = {
		tipo: string;
		color?: string;
		nombre?: string;
		base: number;
		tope?: number;
		promo?: string;
		numerado: boolean;
		filas: Array<{
			id: number;
			sits: Array<{
				id: number;
				s: number;
			}>;
		}>;
		total: number;
	};

	type Ensallo = {
		id: string;
		general?: {
			categoria: string;
			nombre: string;
			artista: string;
			slug: string;
			destacado: boolean;
		};
		ubicacion?: {
			nombre?: string;
			seccionamiento: string;
		};
		mapa?: string;
		precios?: Array<Precio>;
		fechas?: Array<{
			dia: Date;
		}>;
	};

	type Evento = {
		id: string;
		nombre: string;
		artista: string;
		banner: string;
		lugar: string;
		slug: string;
	};

	type Lugar = {
		tipo: string;
		values: {
			codigo: string;
			nombre: string;
		};
	};

	interface LugaresRepoInterface {
		getAll(): Promise<Lugar | undefined>;
	}

	interface EventosRepoInterface {
		getEventosDestacados(): Promise<Array<Evento> | undefined>;
	}

	interface EnsallosRepoInterface {
		findBySlug(slug: string): Promise<Ensallo | null>;
		findBySlugWithSections(slug: string): Promise<Ensallo | null>;
	}

	interface Locals {
		eventosRepo: EventosRepoInterface;
		ensallosRepo: EnsallosRepoInterface;
	}
	// interface Platform {}
	// interface PrivateEnv {}
	// interface PublicEnv {}
	// interface Session {}
	// interface Stuff {}
}
