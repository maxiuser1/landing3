// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	type Ensallo = {
		id: string;
		general?: {
			categoria: string;
			nombre: string;
			artista: string;
			slug: string;
			destacado: boolean;
		};
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
