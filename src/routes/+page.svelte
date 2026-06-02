<script lang="ts">
   import Hero from "$lib/components/Hero.svelte";
   import Carousel from "$lib/components/Carousel.svelte";
   import Achievements from "$lib/components/Achievements.svelte";
   import Gallery from "$lib/components/Gallery.svelte";
   import Footer from "$lib/components/Footer.svelte";
</script>

<div id="home" class="w-full relative z-0">
    <Hero/>
</div>

<div id="projects" class="relative z-10 shadow-2xl bg-black">
    <Carousel />
</div>

<div id="about" class="relative z-20">
    <Achievements />
</div>

<div id="insights" class="relative z-30 shadow-2xl">
    <Gallery/>
</div>

<Footer/>
