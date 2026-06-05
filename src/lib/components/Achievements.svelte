<!-- componentts/Achievements.svelte -->
<script lang="ts">
    interface Achievement {
        id: number;
        value: string;
        label: string;
        description: string;
    }

    // Accepts the continuous layout execution value directly as a prop
    let { progress = 0 } = $props<{ progress: number }>();

    const achievements: Achievement[] = [
        { id: 1, value: "26", label: "Years of Trust", description: "Building a legacy of reliability and excellence over the years." },
        { id: 2, value: "85+", label: "Projects Completed", description: "Successfully delivering high-quality spaces that exceed expectations." },
        { id: 3, value: "4", label: "Ongoing Projects", description: "Currently shaping the future with innovative construction developments." },
        { id: 4, value: "120+", label: "Satisfied Clients", description: "Our satisfied clients are a testament to our quality, creativity, and commitment." }
    ];

    // Binds formulas directly to the global progress stream for perfect execution
    let rotateX = $derived((1 - progress) * 45); 
    let translateZ = $derived((1 - progress) * -500); 
    let opacity = $derived(progress * 1.5); 
</script>

<section 
    class="min-h-screen w-full bg-linear-to-b from-black via-[#050B14] to-[#0F172A] relative flex items-center justify-center py-24 overflow-hidden perspective-[1400px]"
>
    <div 
        class="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 transform-3d will-change-transform"
        style="
            transform: translateZ({translateZ}px) rotateX({rotateX}deg);
            opacity: {opacity};
        "
    >
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            
            <div class="col-span-2 md:col-span-1 flex flex-col justify-start pt-0 md:pt-4 pb-4 md:pb-0">
                <h2 class="text-4xl md:text-[2.75rem] text-white font-medium leading-tight md:leading-snug tracking-wide">
                    Building Spaces <br />
                    That Tell <span class="font-serif italic">Stories.</span>
                </h2>
            </div>

            <div class="border border-white/10 rounded-2xl p-4 md:p-8 bg-transparent flex flex-col transition-colors hover:bg-white/2">
                <span class="text-4xl md:text-6xl text-white font-serif italic mb-4 md:mb-14">{achievements[0].value}</span>
                <h3 class="text-white text-lg font-medium mb-3">{achievements[0].label}</h3>
                <p class="text-neutral-500 text-sm leading-relaxed">{achievements[0].description}</p>
            </div>

            <div class="border border-white/10 rounded-2xl p-4 md:p-8 bg-transparent flex flex-col transition-colors hover:bg-white/2">
                <span class="text-4xl md:text-6xl text-white font-serif italic mb-4 md:mb-14">{achievements[1].value}</span>
                <h3 class="text-white text-lg font-medium mb-3">{achievements[1].label}</h3>
                <p class="text-neutral-500 text-sm leading-relaxed">{achievements[1].description}</p>
            </div>

            <div class="border border-white/10 rounded-2xl p-4 md:p-8 bg-transparent flex flex-col transition-colors hover:bg-white/2">
                <span class="text-4xl md:text-6xl text-white font-serif italic mb-4 md:mb-14">{achievements[2].value}</span>
                <h3 class="text-white text-lg font-medium mb-3">{achievements[2].label}</h3>
                <p class="text-neutral-500 text-sm leading-relaxed">{achievements[2].description}</p>
            </div>

            <div class="border border-white/10 rounded-2xl p-4 md:p-8 bg-transparent flex flex-col transition-colors hover:bg-white/2">
                <span class="text-4xl md:text-6xl text-white font-serif italic mb-4 md:mb-14">{achievements[3].value}</span>
                <h3 class="text-white text-lg font-medium mb-3">{achievements[3].label}</h3>
                <p class="text-neutral-500 text-sm leading-relaxed">{achievements[3].description}</p>
            </div>

        </div>
    </div>
</section>
