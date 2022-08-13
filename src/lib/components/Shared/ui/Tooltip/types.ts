import type { SvelteComponent } from 'svelte';

type TooltipPlace = 'top' | 'right' | 'bottom' | 'left';

type TooltipType = 'dark' | 'success' | 'warning' | 'error' | 'info';

type TooltipEffect = 'float' | 'solid';

interface TooltipConifg {
	body: SvelteComponent | string;
	bodyAsHTML?: boolean;
	type?: TooltipType;
	place: string;
	effect?: TooltipEffect;
	style?: string;
}

export type { TooltipPlace, TooltipType, TooltipEffect, TooltipConifg };
