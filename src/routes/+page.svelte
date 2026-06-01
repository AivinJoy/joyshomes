<script>
   import Hero from "$lib/components/Hero.svelte";
   import Carousel from "$lib/components/Carousel.svelte";
</script>

<div class="h-[300vh] w-full relative z-0">
    <Hero/>
</div>

<div class="mt-[-100vh] relative z-10 shadow-2xl">
    <Carousel />
</div>

<!-- Optional: Your next section context goes right below -->
<div class="h-screen w-full bg-neutral-900 relative z-20 flex items-center justify-center">
    <h2 class="text-white text-3xl font-poppins">Next Section Content</h2>
</div>