<!-- src/lib/components/Gallery.svelte -->
<script lang="ts">
    import { fade } from 'svelte/transition';

    import residential from '$lib/assets/gallery_imgs/bindhu_mobile.avif?enhanced&w=120;240;480;800;1200&quality=80'
    import nadatra from '$lib/assets/gallery_imgs/nadatra_house_mobile.webp?enhanced&w=120;240;480;800;1200&quality=80'
    import modern_home_sabu from '$lib/assets/gallery_imgs/sabu_olari_mobile.webp?enhanced&w=120;240;480;800;1200&quality=80'
    import modern_home_nid from '$lib/assets/gallery_imgs/nidhome_mobile.webp?enhanced&w=120;240;480;800;1200&quality=80'
    
    import residential_desktop from '$lib/assets/gallery_imgs/bindhu_chungam_desktop.avif?enhanced&w=800;1200;1600;1920&quality=80'
    import nadatra_desktop from '$lib/assets/gallery_imgs/nadatra_desktop.avif?enhanced&w=800;1200;1600;1920&quality=80'
    import modern_home_sabu_desktop from '$lib/assets/gallery_imgs/sabu_olari_desktop.avif?enhanced&w=800;1200;1600;1920&quality=80'
    import modern_home_nid_desktop from '$lib/assets/gallery_imgs/nidhome_desktop.avif?enhanced&w=800;1200;1600;1920&quality=80'

    interface GalleryItem {
        id: number;
        img: any;
        imgDesktop: any;
        title: string;
    }

    const items: GalleryItem[] = [
        { id: 0, img: modern_home_sabu, imgDesktop: modern_home_sabu_desktop, title: 'A HOME IN THE WOODS' },
        { id: 1, img: modern_home_nid, imgDesktop: modern_home_nid_desktop, title: 'MODERN MINIMALISM' },
        { id: 2, img: residential, imgDesktop: residential_desktop, title: 'NATURE RETREAT' },
        { id: 3, img: nadatra, imgDesktop: nadatra_desktop, title: 'THE OPEN PLOT' }
    ];

    let activeIndex = $state<number>(0);
    let activeItem = $derived(items[activeIndex]);

    let nextTwoItems = $derived([
        items[(activeIndex + 1) % items.length],
        items[(activeIndex + 2) % items.length]
    ]);

    let isDesktop = $state(false);
    $effect(() => {
        const media = window.matchMedia("(min-width: 768px)");
        isDesktop = media.matches;

        const listener = (e: MediaQueryListEvent) => isDesktop = e.matches;
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    });

    function next() {
        activeIndex = (activeIndex + 1) % items.length;
    }

    function prev() {
        activeIndex = (activeIndex - 1 + items.length) % items.length;
    }

    function advanceTo(targetId: number) {
        activeIndex = items.findIndex(item => item.id === targetId);
    }
</script>

<section class="w-full md:h-screen bg-[#0F172A] flex items-center justify-center py-16 px-4 md:p-8 relative overflow-hidden z-20">
    
    <div class="relative w-full aspect-3/4 md:aspect-auto md:h-full max-w-400 mx-auto rounded-4xl md:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {#key activeIndex}
            {#if isDesktop}
                <enhanced:img 
                    src={activeItem.imgDesktop} 
                    alt={activeItem.title}
                    loading="lazy"
                    sizes="100vw" 
                    transition:fade={{ duration: 100 }}
                    class="absolute inset-0 w-full h-full object-cover" 
                />
            {:else}
                <enhanced:img 
                    src={activeItem.img} 
                    alt={activeItem.title}
                    loading="lazy"
                    sizes="100vw" 
                    transition:fade={{ duration: 100 }}
                    class="absolute inset-0 w-full h-full object-cover" 
                />
            {/if}
        {/key}
        
        <div class="absolute inset-0 bg-linear-to-t from-black/2 via-black/2 to-transparent z-10 pointer-events-none"></div>
        
        <div class="absolute bottom-8 left-6 md:bottom-12 md:left-12 z-20 flex items-end gap-3 md:gap-4 pointer-events-auto">
            {#each nextTwoItems as item}
                <button 
                    type="button"
                    onclick={() => advanceTo(item.id)}
                    title={item.title}
                    aria-label={`View ${item.title}`}
                    class="relative w-20 h-28 md:w-28 md:h-36 rounded-xl md:rounded-2xl overflow-hidden cursor-pointer border border-white/20 transition-all duration-300 hover:border-[#FBCBA0] hover:scale-105 shadow-xl"
                >
                    <div class="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors z-10"></div>
                    <enhanced:img src={item.img} alt={item.title} loading="lazy" sizes="(min-width: 768px) 112px, 80px" class="w-full h-full object-cover" />
                </button>
            {/each}
        </div>

        <div class="absolute bottom-8 right-6 md:bottom-12 md:right-12 z-20 flex flex-col items-end text-right md:max-w-88 pointer-events-auto">
            
            <div class="hidden md:block mb-5 md:mb-6 w-full">
                <h2 class="text-white text-3xl md:text-4xl font-poppins font-medium tracking-wide mb-2 md:mb-3">
                    Insights
                </h2>
                <p class="text-neutral-300 text-sm leading-relaxed">
                    Discover the architectural brilliance and meticulous design of our spaces. Each project tells a unique story of modern living and timeless luxury.
                </p>
            </div>
            
            <div class="flex items-center gap-3 w-full justify-end">
                <button 
                    type="button"
                    onclick={prev} 
                    aria-label="Previous image"
                    class="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-[#FBCBA0] hover:text-black hover:border-transparent transition-all duration-300 active:scale-95 shrink-0"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 12H5M5 12L12 5M5 12L12 19" />
                    </svg>
                </button>
                
                <button 
                    type="button"
                    onclick={next} 
                    aria-label="Next image"
                    class="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-[#FBCBA0] hover:text-black hover:border-transparent transition-all duration-300 active:scale-95 shrink-0"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14M19 12l-7-7M19 12l-7 7" />
                    </svg>
                </button>
            </div>

        </div>
        
    </div>
</section>