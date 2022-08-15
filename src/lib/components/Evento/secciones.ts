import type { SvelteComponent } from 'svelte';
import { Tooltip } from '../Shared';

export const secciones = (node: any, props: Array<App.Precio>) => {
	const mapa = node.querySelectorAll('g').forEach((each: any) => {
		const pseudoId = each.id.split('-')[0];
		props.forEach((cadaPrecio: App.Precio) => {
			if (cadaPrecio.tipo.toLowerCase() == pseudoId.toLowerCase()) {
				let tooltipComp: SvelteComponent;
				const prevcolor = each.getAttribute('fill');

				each.addEventListener('click', () => {
					tooltipComp.$destroy();
					const seccioneSeleccionada: App.Seccion = {
						base: cadaPrecio.base,
						tipo: cadaPrecio.tipo,
						numerado: cadaPrecio.numerado
					};
					const zonned = new CustomEvent('zonned', {
						detail: seccioneSeleccionada
					});

					node.dispatchEvent(zonned);
				});

				each.addEventListener('mouseover', (event: MouseEvent) => {
					tooltipComp = new Tooltip({
						props: {
							mouseX: event.pageX,
							mouseY: event.pageY,
							config: {
								body: `${cadaPrecio.nombre}: S/ ${cadaPrecio.base}`,
								bodyAsHTML: false,
								place: 'top',
								effect: 'solid',
								type: 'dark',
								style: ''
							}
						},
						target: document.body
					});
					each.setAttribute('fill', '#FF0036');
				});

				each.addEventListener('mousemove', (event: MouseEvent) => {
					tooltipComp.$set({ mouseX: event.pageX, mouseY: event.pageY });
				});

				each.addEventListener('mouseleave', () => {
					tooltipComp.$destroy();
					each.setAttribute('fill', prevcolor);
				});
			}
		});
	});

	return {
		destroy() {},
		update() {}
	};
};
