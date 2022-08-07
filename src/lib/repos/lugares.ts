import type { Container, Resource } from '@azure/cosmos';

export class LugaresRepo implements App.LugaresRepoInterface {
	container: Container;

	constructor(container: Container) {
		this.container = container;
	}

	getAll = async (): Promise<App.Lugar | undefined> => {
		const { resource: result } = await this.container
			.item('280100cd-c1eb-4852-aee0-e0dd41118d57', 'lugares')
			.read<App.Lugar>();

		return result;
	};
}
