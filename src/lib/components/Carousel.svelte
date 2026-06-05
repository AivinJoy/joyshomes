<!-- components/Carousel.svelte -->
<script lang="ts">
    interface CarouselItem {
        id: number;
        img: string;
        title: string;
    }

    let { progress = 0 } = $props<{ progress: number }>();

    const items: CarouselItem[] = [
        { id: 1, img: '/house_1.png', title: 'Modern Villa' },
        { id: 2, img: '/hs2.png', title: 'Sunset Haven' },
        { id: 3, img: '/house_full.jpeg', title: 'The Hero House' }, 
        { id: 4, img: '/hs3.png', title: 'Nature Retreat' },
        { id: 5, img: '/plot.jpeg', title: 'Open Plot' }
    ];

    // FIXED: Changed formula to complete a clean 360 loop, ending back on card 3
    let activeIndex = $derived<number>(2 + (progress * items.length));
</script>

<section 
    id="projects-container" 
    class="w-full h-full"
>
    <div class="w-full h-screen flex flex-col items-center justify-center overflow-hidden py-20 shadow-2xl bg-linear-to-b from-[#0F172A] via-[#050B14] to-black">
        
        <div class="absolute top-12 left-6 md:top-16 md:left-16 z-20 flex flex-col items-start pointer-events-none">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-poppins font-extrabold text-white leading-none tracking-tighter uppercase">
                Featured<br/>Projects
            </h2>
            <p class="text-neutral-300 tracking-wide mt-3 font-medium text-sm md:text-base border-l-2 border-neutral-500 pl-3">
                Scroll down to rotate through our gallery
            </p>
        </div>

        <div class="absolute top-12 right-6 md:top-16 md:right-16 z-20 hidden md:flex flex-col items-end text-right pointer-events-none max-w-sm">
            <p class="text-neutral-300 tracking-wide font-medium text-base border-r-2 border-neutral-500 pr-4 leading-relaxed">
                We blend design, technology, and trust to connect people with spaces they'll love.
            </p>    
        </div>

        <div class="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center perspective-[1400px] select-none">
            <div class="relative w-[72vw] sm:w-80 md:w-xl aspect-3/4 transform-3d">
                {#each items as item, i}
                    {@const rawOffset = i - activeIndex}
                    {@const offset = ((rawOffset % items.length) + items.length + 2.5) % items.length - 2.5}
                    {@const absOffset = Math.abs(offset)}
                    
                    <button 
                        type="button"
                        class="absolute inset-0 text-left bg-linear-to-br from-[#1E293B] via-[#0F172A] to-black rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10 duration-0 ease-out origin-bottom backface-hidden"
                        style="
                            transform: 
                                translateX({offset * 62}%) 
                                translateY({Math.pow(absOffset, 1.8) * 65}px)
                                translateZ({absOffset * -260}px)
                                rotateZ({offset * 4.5}deg);
                            z-index: {20 - Math.round(absOffset)};
                            opacity: {absOffset <= 1.5 ? 1 : Math.max(0, 1 - (absOffset - 1.5))};
                            filter: brightness(100%);
                        "
                    >
                        <img src={item.img} alt={item.title} class="w-full h-full object-cover pointer-events-none" />
                        
                        <div class="absolute bottom-0 left-0 w-full p-5 md:p-8 bg-linear-to-t from-black/95 via-black/40 to-transparent text-left">
                            <h3 class="text-white font-poppins font-bold text-xl md:text-3xl">{item.title}</h3>
                        </div>
                    </button>
                {/each}
            </div>
        </div>

    </div>
</section>
