<script>
    import { onMount } from 'svelte';

    const items = [
        { id: 1, img: '/house_1.png', title: 'Modern Villa' },
        { id: 2, img: '/hs2.png', title: 'Sunset Haven' },
        { id: 3, img: '/house_full.jpeg', title: 'The Hero House' }, 
        { id: 4, img: '/hs3.png', title: 'Nature Retreat' },
        { id: 5, img: '/plot.jpeg', title: 'Open Plot' }
    ];

    let activeIndex = $state(2); // Start at 0 for the first card
    let sectionEl = $state();

    function handleScroll() {
        if (!sectionEl) return;
        const rect = sectionEl.getBoundingClientRect();
        const totalScrollableHeight = rect.height - window.innerHeight;

        if (totalScrollableHeight <= 0) return;
        
        // 1. Calculate how far the section has scrolled past the top of the viewport
        const scrollPastTop = -rect.top;
        
        // 2. THE BUFFER: Wait for 40vh (40% of the screen) of scrolling before starting the rotation
        // This gives the section time to fully arrive and rest before the cards start moving
        const buffer = window.innerHeight * 0.4;
        const activeScrollableHeight = totalScrollableHeight - buffer;
        
        let progress = 0;
        
        // 3. Only calculate progress IF the user has scrolled past the buffer zone
        if (scrollPastTop > buffer) {
            progress = (scrollPastTop - buffer) / activeScrollableHeight;
        }
        
        progress = Math.max(0, Math.min(1, progress));
        
        // FLUID ORBIT: Map progress smoothly
        activeIndex = 2 + (progress * items.length);
    }

    // Restored your original, correct listener setup
    onMount(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check to prevent the math from breaking
        return () => window.removeEventListener('scroll', handleScroll);
    });
</script>

<!-- The Parent Section is now a tall scroll track (h-[300vh]) -->
<section 
    bind:this={sectionEl} 
    class="relative h-[300vh] w-full"
>
    <div class="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden py-20 z-10 shadow-2xl bg-linear-to-b from-[#FFF5EC] via-[#FFE0B2] to-[#FDBA74]">
        
        <div class="absolute top-12 left-6 md:top-16 md:left-16 z-20 flex flex-col items-start pointer-events-none">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-poppins font-extrabold text-neutral-900 leading-none tracking-tighter uppercase">
                Featured<br/>Projects
            </h2>
            <p class="text-neutral-800 tracking-wide mt-3 font-medium text-sm md:text-base border-l-2 border-neutral-900 pl-3">
                Scroll down to rotate through our gallery
            </p>
        </div>

        <div class="absolute top-12 right-6 md:top-16 md:right-16 z-20 hidden md:flex flex-col items-end text-right pointer-events-none max-w-sm">
            <p class="text-neutral-800 tracking-wide font-medium text-base border-r-2 border-neutral-900 pr-4 leading-relaxed">
                We blend design, technology, and trust to connect people with spaces they'll love.
            </p>    
        </div>

        <!-- Carousel Viewport -->
        <div class="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center perspective-[1400px] select-none">
            <!-- Carousel Track Container -->
            <div class="relative w-96 md:w-xl aspect-3/4 transform-3d">
                {#each items as item, i}
                    {@const rawOffset = i - activeIndex}
                    {@const offset = ((rawOffset % items.length) + items.length + 2.5) % items.length - 2.5}
                    {@const absOffset = Math.abs(offset)}
                    
                    <button 
                        type="button"
                        onclick={() => activeIndex = i}
                        onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') activeIndex = i; }}
                        class="absolute inset-0 text-left bg-linear-to-br from-[#FFF0E0] via-[#FDBA74] to-[#FF9E43] rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-white/30 duration-0 ease-out cursor-pointer origin-bottom backface-hidden"
                        style="
                            transform: 
                                translateX({offset * 62}%) 
                                translateY({Math.pow(absOffset, 1.8) * 65}px)
                                translateZ({absOffset * -260}px)
                                rotateZ({offset * 4.5}deg);
                            z-index: {20 - Math.round(absOffset)};
                            /* FEATHER FADE: Gradually dissolves the card to 0 opacity between 1.5 and 2.5 offset so the wrap is completely hidden and liquid smooth */
                            opacity: {absOffset <= 1.5 ? 1 : Math.max(0, 1 - (absOffset - 1.5))};
                            filter: brightness(100%);
                        "
                    >
                        <img src={item.img} alt={item.title} class="w-full h-full object-cover pointer-events-none" />
                        
                        <div class="absolute bottom-0 left-0 w-full p-8 bg-linear-to-t from-black/95 via-black/40 to-transparent text-left">
                            <h3 class="text-white font-poppins font-bold text-2xl md:text-3xl">{item.title}</h3>
                        </div>
                    </button>
                {/each}
            </div>
        </div>

    </div>
</section>
