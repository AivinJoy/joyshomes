<script lang="ts">
	import './layout.css';
	import SEO from '$lib/components/SEO.svelte';
  	import { allSchemas } from '$lib/schema';

	let { children } = $props();
</script>

<SEO jsonLd={allSchemas} />
{@render children()}
