import type { Container } from '@azure/cosmos';

export class LugaresRepo {
	container: Container;

	constructor(container: Container) {
		this.container = container;
	}

	getAll = async () => {
		const { resource: result } = await this.container
			.item('280100cd-c1eb-4852-aee0-e0dd41118d57', 'lugares')
			.read();

		return result;
	};
}
