<script lang="ts">
	import TemplateForm from '$lib/components/TemplateForm.svelte';

	let { form } = $props();
</script>

<div class="space-y-6">
	<h1 class="text-2xl font-bold">New Template</h1>
	<TemplateForm {form} submitLabel="Create Template" />
</div>
