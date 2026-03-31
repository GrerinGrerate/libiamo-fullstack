<script lang="ts">
	let { children, data } = $props();
</script>

<div class="min-h-screen">
	<nav class="border-b border-border bg-foreground/[0.03]">
		<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
			<div class="flex items-center gap-6">
				<a href="/" class="text-xl font-bold" style="font-family: var(--font-heading)">Libiamo</a>
				<span class="text-xs font-medium uppercase tracking-wider text-muted-foreground">Admin</span>
			</div>
			<div class="flex items-center gap-4 text-sm">
				<a href="/admin/templates" class="text-muted-foreground hover:text-foreground">Templates</a>
				<a href="/admin/schedule" class="text-muted-foreground hover:text-foreground">Schedule</a>
				<a href="/" class="text-muted-foreground hover:text-foreground">&larr; App</a>
			</div>
		</div>
	</nav>

	<main class="mx-auto max-w-6xl px-4 py-8">
		{@render children()}
	</main>
</div>
