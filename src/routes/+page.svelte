<script lang="ts">
   import Hero from "$lib/components/Hero.svelte";
   import Carousel from "$lib/components/Carousel.svelte";
   import Achievements from "$lib/components/Achievements.svelte";
   import Gallery from "$lib/components/Gallery.svelte";
   import Footer from "$lib/components/Footer.svelte";
</script>

<div id="home" class="h-[300vh] w-full relative z-0">
    <Hero/>
</div>

<div id="projects" class="mt-[-100vh] relative z-10 shadow-2xl">
    <Carousel />
</div>

<div id="about" class="relative z-20">
    <Achievements />
</div>

<div id="insights" class="relative z-30 shadow-2xl">
    <Gallery/>
</div>

<Footer/>