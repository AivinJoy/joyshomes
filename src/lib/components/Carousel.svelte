<!-- src/lib/components/Carousel.svelte -->
<script lang="ts">
    import { gsap } from 'gsap';
    import altar from '$lib/assets/carousel_imgs/AVIF/Altar.avif?enhanced&w=800;1200;1600;1920&quality=80';
    import staircase from '$lib/assets/carousel_imgs/AVIF/bindhu_staircase_chungam.avif?enhanced&w=800;1200;1600;1920&quality=80';
    import kitchen from '$lib/assets/carousel_imgs/AVIF/sabu_kitchen.avif?enhanced&w=800;1200;1600;1920&quality=80';
    import sitout from '$lib/assets/carousel_imgs/AVIF/sabu_sitout_olari.avif?enhanced&w=800;1200;1600;1920&quality=80';
    import basin from '$lib/assets/carousel_imgs/AVIF/washing_basin_nidhome.avif?enhanced&w=800;1200;1600;1920&quality=80';
    import workers from '$lib/assets/carousel_imgs/AVIF/workers.avif?enhanced&w=800;1200;1600;1920&quality=80';
    interface CarouselItem {
        id: number;
        img: any;
        title: string;
    }

    let { progress = 0 } = $props<{ progress: number }>();

    const items: CarouselItem[] = [
        { id: 1, img: altar, title: 'Altar' },
        { id: 2, img: staircase, title: 'Staircase' },
        { id: 3, img: kitchen, title: 'Modern Kitchen' }, 
        { id: 4, img: sitout, title: 'Sitout' },
        { id: 5, img: basin, title: 'basin' },
        { id: 6, img: workers, title: 'workers' }
    ];

    // FIXED: Changed formula to complete a clean 360 loop, ending back on card 3
    // Detect mobile viewport safely
    let isMobile = $state(false);

    $effect(() => {
        const media = window.matchMedia("(max-width: 768px)");
        isMobile = media.matches;

        const listener = (e: MediaQueryListEvent) => isMobile = e.matches;
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    });

    let activeIndex = $derived<number>(2 + (progress * items.length));
    let xSpread = $derived(isMobile ? 38 : 62);
    let yDrop = $derived(isMobile ? 25 : 65);
    let zDepth = $derived(isMobile ? -140 : -260);
    let zRot = $derived(isMobile ? 2.5 : 4.5);

    let cardRefs = $state<(HTMLButtonElement | null)[]>([]);

    $effect(() => {
        const N = items.length;

        for (let i=0; i<N; i++) {
            const el = cardRefs[i];
            if (!el) continue;

            const rawOffset = i - activeIndex;
            const offset = ((rawOffset % N) + N + 2.5) % N - 2.5;
            const absOffset = Math.abs(offset);

            gsap.set(el, {
                xPercent: offset * xSpread,
                y: Math.pow(absOffset, 1.8) * yDrop,
                z: absOffset * zDepth,
                rotateZ: offset * zRot,
                zIndex: 20 - Math.round(absOffset * 2),
                opacity: absOffset <= 1.5 ? 1 : Math.max(0, 1 - (absOffset - 1.5)),
                filter: `brightness(${100 - (absOffset * 15)}%)`,
                force3D: true
            });
        }
    });

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
                    <button 
                        type="button"
                        bind:this={cardRefs[i]}
                        class="absolute inset-0 text-left bg-linear-to-br from-[#1E293B] via-[#0F172A] to-black rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10 origin-bottom backface-hidden"
                    >
                        <enhanced:img src={item.img} alt={item.title} loading="lazy" sizes="(min-width: 768px) 36rem, (min-width: 640px) 320px, 72vw" class="w-full h-full object-cover pointer-events-none" />
                        
                        <div class="absolute bottom-0 left-0 w-full p-5 md:p-8 bg-linear-to-t from-black/95 via-black/40 to-transparent text-left">
                            <h3 class="text-white font-poppins font-bold text-lg md:text-3xl">{item.title}</h3>
                        </div>
                    </button>
                {/each}
            </div>
        </div>

    </div>
</section>
