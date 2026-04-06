<script lang="ts">
import { onNavigate } from "$app/navigation";
import "./layout.css";
import favicon from "$lib/assets/favicon.svg";

let { children } = $props();

onNavigate((navigation) => {
	if (!document.startViewTransition) return;
	return new Promise((resolve) => {
		document.startViewTransition(async () => {
			resolve();
			await navigation.complete;
		});
	});
});
</script>

<svelte:head><link rel="icon" href={favicon}></svelte:head>
{@render children()}
