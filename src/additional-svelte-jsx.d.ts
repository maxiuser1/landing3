declare namespace svelte.JSX {
	interface HTMLProps<HTMLDivElement> {
		zonned?: ({ detail }: { datail: App.Seccion }) => void;
	}
}
