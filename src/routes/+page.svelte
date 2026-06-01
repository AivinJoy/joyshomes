<script lang="ts">
   import Hero from "$lib/components/Hero.svelte";
   import Carousel from "$lib/components/Carousel.svelte";
   import Achievements from "$lib/components/Achievements.svelte";
   import Gallery from "$lib/components/Gallery.svelte";
</script>

<div class="h-[300vh] w-full relative z-0">
    <Hero/>
</div>

<div class="mt-[-100vh] relative z-10 shadow-2xl">
    <Carousel />
</div>

<div class="relative z-20">
    <Achievements />
</div>

<div class="relative z-30 shadow-2xl">
    <Gallery/>
</div>