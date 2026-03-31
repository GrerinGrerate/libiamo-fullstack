<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { t, type LangCode } from '$lib/i18n';

	let { data } = $props();
	let lang = $derived(data.language as LangCode);

	let expandedId = $state<number | null>(null);

	function toggleCard(id: number) {
		expandedId = expandedId === id ? null : id;
	}

	function difficultyDots(level: number) {
		return Array.from({ length: 3 }, (_, i) => i < level);
	}

	const typeColors: Record<string, string> = {
		chat: 'bg-[var(--color-accent-blue)] text-white',
		oneshot: 'bg-[var(--color-accent-sage)] text-white',
		slow: 'bg-[var(--color-accent-rose)] text-white',
		translate: 'bg-[var(--color-accent-yellow)] text-white'
	};
</script>

<div class="space-y-10">
	<!-- Weekly Tasks -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">{t(lang, 'hall.thisWeek')}</h2>
		{#if data.weeklyTasks.length === 0}
			<p class="text-muted-foreground">{t(lang, 'hall.noTasks')}</p>
		{:else}
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.weeklyTasks as task}
					<Card.Root class="cursor-pointer transition-shadow hover:shadow-md" onclick={() => toggleCard(task.id)}>
						<Card.Header class="pb-2">
							<div class="flex items-start justify-between gap-2">
								<Card.Title class="text-lg leading-snug">{task.titleResolved}</Card.Title>
								<Badge class={typeColors[task.templateType] ?? ''}>{task.templateType}</Badge>
							</div>
							<div class="flex items-center gap-2 pt-1">
								<span class="flex gap-0.5">
									{#each difficultyDots(task.templateDifficulty) as filled}
										<span
											class="inline-block h-2.5 w-2.5 rounded-full {filled
												? 'bg-foreground'
												: 'bg-border'}"
										></span>
									{/each}
								</span>
								<span class="text-xs text-muted-foreground">{task.templateUi}</span>
							</div>
						</Card.Header>

						<!-- Mobile: accordion expand -->
						<div class="sm:contents {expandedId === task.id ? '' : 'hidden sm:contents'}">
							<Card.Content class="pt-0">
								{#if task.descriptionResolved}
									<p class="text-sm text-muted-foreground">{task.descriptionResolved}</p>
								{/if}
							</Card.Content>
							<Card.Footer>
								<Button href="/task/{task.id}" variant="default" size="sm">{t(lang, 'hall.enter')}</Button>
							</Card.Footer>
						</div>
					</Card.Root>
				{/each}
			</div>
		{/if}
	</section>

	<!-- Daily Tasks -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">{t(lang, 'hall.today')}</h2>
		{#if data.dailyTasks.length === 0}
			<p class="text-muted-foreground">{t(lang, 'hall.noTasks')}</p>
		{:else}
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.dailyTasks as task}
					<Card.Root class="cursor-pointer transition-shadow hover:shadow-md" onclick={() => toggleCard(task.id)}>
						<Card.Header class="pb-2">
							<div class="flex items-start justify-between gap-2">
								<Card.Title class="text-lg leading-snug">{task.titleResolved}</Card.Title>
								<Badge class={typeColors[task.templateType] ?? ''}>{task.templateType}</Badge>
							</div>
							<div class="flex items-center gap-2 pt-1">
								<span class="flex gap-0.5">
									{#each difficultyDots(task.templateDifficulty) as filled}
										<span
											class="inline-block h-2.5 w-2.5 rounded-full {filled
												? 'bg-foreground'
												: 'bg-border'}"
										></span>
									{/each}
								</span>
								<span class="text-xs text-muted-foreground">{task.templateUi}</span>
							</div>
						</Card.Header>

						<div class="sm:contents {expandedId === task.id ? '' : 'hidden sm:contents'}">
							<Card.Content class="pt-0">
								{#if task.descriptionResolved}
									<p class="text-sm text-muted-foreground">{task.descriptionResolved}</p>
								{/if}
							</Card.Content>
							<Card.Footer>
								<Button href="/task/{task.id}" variant="default" size="sm">{t(lang, 'hall.enter')}</Button>
							</Card.Footer>
						</div>
					</Card.Root>
				{/each}
			</div>
		{/if}
	</section>
</div>
