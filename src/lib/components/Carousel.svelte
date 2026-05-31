<!-- components/Carousel.svelte -->
<script>
    import { onMount } from 'svelte';

    const items = [
        { id: 1, img: '/house_1.png', title: 'Modern Villa' },
        { id: 2, img: '/hs2.png', title: 'Sunset Haven' },
        { id: 3, img: '/house_full.jpeg', title: 'The Hero House' }, 
        { id: 4, img: '/hs3.png', title: 'Nature Retreat' },
        { id: 5, img: '/plot.jpeg', title: 'Open Plot' }
    ];

    let activeIndex = $state(2);
    let sectionEl = $state();

    function handleScroll() {
        if (!sectionEl) return;

        const rect = sectionEl.getBoundingClientRect();
        const totalScrollableHeight = rect.height - window.innerHeight;

        if (totalScrollableHeight <= 0) return;

        // Calculate absolute scroll progress inside this section specifically (0 to 1)
        // rect.top is negative when scrolled past the top of the viewport
        let progress = -rect.top / totalScrollableHeight;
        
        // Clamp progress strictly between 0 and 1 so it doesn't rotate early or late
        progress = Math.max(0, Math.min(1, progress));

        // Map progress across the card indexes (from index 0 to index 4)
        const targetIndex = progress * (items.length - 1);
        
        activeIndex = Math.round(targetIndex);
    }

    onMount(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    });
</script>

<!-- The Parent Section is now a tall scroll track (h-[300vh]) -->
<section 
    bind:this={sectionEl} 
    class="relative h-[300vh] w-full bg-neutral-800"
>
    <!-- Sticky Viewport Layer: Locks onto the viewport until the parent container track runs out -->
    <div class="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden py-20 z-10 shadow-2xl">
        
        <!-- Header Text -->
        <div class="mb-10 text-center z-20">
            <h2 class="text-4xl md:text-5xl font-poppins font-bold text-white mb-4 tracking-wide">Featured Projects</h2>
            <p class="text-neutral-400">Scroll down to rotate through our gallery</p>
        </div>

        <!-- Carousel Viewport -->
        <div class="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center perspective-[1400px] select-none">
            <!-- Carousel Track Container -->
            <div class="relative w-96 md:w-xl aspect-3/4 transform-3d">
                {#each items as item, i}
                    {@const offset = i - activeIndex}
                    {@const absOffset = Math.abs(offset)}
                    
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div 
                        onclick={() => activeIndex = i}
                        class="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-700 ease-out cursor-pointer origin-bottom backface-hidden"
                        style="
                            transform: 
                                translateX({offset * 62}%) 
                                translateY({Math.pow(absOffset, 1.8) * 65}px)
                                translateZ({absOffset * -260}px)
                                rotateZ({offset * 4.5}deg);
                            z-index: {10 - absOffset};
                            opacity: {absOffset > 2 ? 0.15 : 1};
                            filter: brightness({100 - (absOffset * 22)}%);
                        "
                    >
                        <img src={item.img} alt={item.title} class="w-full h-full object-cover pointer-events-none" />
                        
                        <div class="absolute bottom-0 left-0 w-full p-8 bg-linear-to-t from-black/95 via-black/40 to-transparent">
                            <h3 class="text-white font-poppins font-bold text-2xl md:text-3xl">{item.title}</h3>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

    </div>
</section>
