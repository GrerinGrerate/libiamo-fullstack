<script lang="ts">
import { Badge } from "$lib/components/ui/badge";
import { Button } from "$lib/components/ui/button";
import { Separator } from "$lib/components/ui/separator";

let { data } = $props();
let task = $derived(data.task);

const objectives = $derived((task.objectivesResolved as { order: number; text: string }[] | null) ?? []);

function difficultyDots(level: number) {
	return Array.from({ length: 3 }, (_, i) => i < level);
}
</script>

<div class="mx-auto max-w-3xl space-y-6">
	<a href="/" class="text-sm text-muted-foreground hover:underline">&larr; Back to Task Hall</a>

	<div>
		<h1 class="text-3xl font-bold">{task.titleResolved}</h1>
		<div class="mt-2 flex flex-wrap items-center gap-3">
			<Badge variant="secondary">{task.templateType}</Badge>
			<Badge variant="outline">{task.templateUi}</Badge>
			<span class="flex gap-0.5">
				{#each difficultyDots(task.templateDifficulty) as filled}
					<span class="inline-block h-2.5 w-2.5 rounded-full {filled ? 'bg-foreground' : 'bg-border'}"></span>
				{/each}
			</span>
			{#if task.estimatedWords}
				<span class="text-sm text-muted-foreground">~{task.estimatedWords} words</span>
			{/if}
			{#if task.maxTurns}
				<span class="text-sm text-muted-foreground">{task.maxTurns} turns</span>
			{/if}
		</div>
	</div>

	{#if task.descriptionResolved}
		<p class="text-muted-foreground">{task.descriptionResolved}</p>
	{/if}

	{#if objectives.length > 0}
		<div>
			<h2 class="mb-2 text-lg font-semibold">Objectives</h2>
			<ol class="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
				{#each objectives.sort((a, b) => a.order - b.order) as obj}
					<li>{obj.text}</li>
				{/each}
			</ol>
		</div>
	{/if}

	{#if task.backgroundHtml}
		<Separator />
		<div>
			<h2 class="mb-3 text-lg font-semibold">Background Material</h2>
			<div class="max-w-none">{@html task.backgroundHtml}</div>
		</div>
	{/if}

	<Separator />

	<div class="flex items-center justify-between">
		<div class="text-sm text-muted-foreground">
			<span>{task.pointReward} pts</span>
			<span class="mx-1">&middot;</span>
			<span>{task.gemReward} gems</span>
		</div>
		<Button disabled>Start Practice (Coming Soon)</Button>
	</div>
</div>
