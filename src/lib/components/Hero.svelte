<!-- componenets/Hero.SvelteMap -->

<script>
    import Navbar from './Navbar.svelte';

    let scrollY = $state(0);
    let innerHeight = $state(1000);

    let headerOpacity = $derived(Math.min(Math.max(scrollY / 300, 0), 1));
    let headerTranslateY = $derived(Math.max(200 - (scrollY * (200 / 300)), 0));

    let overlapProgress = $derived(Math.max(0, Math.min((scrollY - innerHeight) / innerHeight, 1)));

    let heroScale = $derived(1 - (overlapProgress * 0.05));
    let heroBrightness = $derived(1 - (overlapProgress * 0.5));
</script>

<svelte:window bind:scrollY bind:innerHeight />

<!-- Added relative positioning context and forced minimum heights -->
<main class="sticky top-0 w-full h-screen min-h-150 flex items-center justify-center overflow-hidden bg-neutral-900 select-none will-change-transform backface-hidden"
    style="
        transform: scale({heroScale});
        filter: brightness({heroBrightness});
        transform-origin: top center;
    "
>
    <img 
        src="/house_full.jpeg" 
        alt="Warm Sunset Sky Background" 
        class="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0" 
    />

    <div 
        class="absolute top-[10%] md:top-[9%] left-0 w-full z-10 flex justify-center"
        style="opacity: {headerOpacity}; transform: translateY({headerTranslateY}px); transition: transform 0.1s ease-out, opacity 0.1s ease-out;"
    >
        <h1 class="font-poppins font-bold tracking-normal text-center header-gradient text-[8vw] md:text-[14.8vw] whitespace-nowrap leading-none uppercase w-full">
            JOYS HOMES
        </h1>
    </div>

    <img 
        src="/house_cutout1.png" 
        alt="Modern House Foreground Architecture" 
        class="absolute inset-0 w-full h-full object-cover object-center z-20 pointer-events-none" 
    />

    <!-- Logo -->
    <div class="absolute top-6 left-6 md:top-4 md:left-10 z-50">
        <span class="text-2xl md:text-3xl font-bold text-white tracking-widest">LOGO.</span>
    </div>

    <!-- Main Navigation Menu Component -->
    <Navbar />

    <!-- Action Button (Fixed: Handled mobile padding layout scales) -->
    <button class="absolute top-6 right-6 md:top-4 md:right-10 z-50 flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-[#F5D0B5] hover:bg-[#e6c1a5] text-neutral-900 font-bold text-sm md:text-base rounded-full transition-all shadow-lg active:scale-95">
        Book now
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="md:w-5 md:h-5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
    </button>

    <!-- Social Action Dock -->
    <div class="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex items-center gap-3 md:gap-4">
        <!-- Fixed: Corrected to actual WhatsApp SVG icon path -->
        <a href="https://wa.me" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" class="p-2.5 md:p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-[#F5D0B5] hover:text-neutral-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="md:w-5.5 md:h-5.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        </a>
        <a href="#instagram" aria-label="Instagram" class="p-2.5 md:p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-[#F5D0B5] hover:text-neutral-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="md:w-5.5 md:h-5.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
        <a href="#linkedin" aria-label="LinkedIn" class="p-2.5 md:p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-[#F5D0B5] hover:text-neutral-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="md:w-5.5 md:h-5.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        </a>
    </div>
</main>

<style>
    /* 1. Import Poppins ExtraBold (Weight 800) for a slightly lighter, cleaner look */
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

    .font-poppins {
        font-family: 'Poppins', sans-serif;
    }

    /* 2. Replicating the warm sunset fade from the reference image */
    .header-gradient {
        background-image: linear-gradient(180deg, #FFFFFF 0%, #FFE0B2 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }
</style>