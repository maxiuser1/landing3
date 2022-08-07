// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
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

	interface Locals {
		lugaresRepo: LugaresRepoInterface;
	}
	// interface Platform {}
	// interface PrivateEnv {}
	// interface PublicEnv {}
	// interface Session {}
	// interface Stuff {}
}
