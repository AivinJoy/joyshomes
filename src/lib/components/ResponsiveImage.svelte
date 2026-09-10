<!-- src/lib/components/ResponsiveImage.svelte -->
<script lang="ts">
	let {
		src,
		alt,
		class: className = '',
		sizes = '100vw',
		loading = 'lazy',
		fetchpriority = 'auto'
	} = $props<{
		src: any;
		alt: string;
		class?: string;
		sizes?: string;
		loading?: 'lazy' | 'eager';
		fetchpriority?: 'high' | 'low' | 'auto';
	}>();

	let loaded = $state(false);

	function handleLoad() {
		loaded = true;
	}
</script>

<div class="relative w-full h-full overflow-hidden">
	{#if !loaded}
		<div class="absolute inset-0 bg-neutral-800 animate-pulse"></div>
	{/if}
	<enhanced:img
		{src}
		{alt}
		{loading}
		{sizes}
		fetchpriority={fetchpriority}
		onload={handleLoad}
		class="{className} transition-opacity duration-500 {loaded ? 'opacity-100' : 'opacity-0'}"
	/>
</div>