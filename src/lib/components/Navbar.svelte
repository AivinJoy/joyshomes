<script lang="ts">
    import { onMount } from 'svelte';

    const navLinks = [
        { id: 'home', label: 'Home' },
        { id: 'projects', label: 'Projects' },
        { id: 'about', label: 'About' },
        { id: 'insights', label: 'Insights' }
    ];

    let activeSection = $state<string>('home');

    // Smooth scroll function
    function scrollToSection(id: string) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    onMount(() => {
        // IntersectionObserver detects which section is currently on screen
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        activeSection = entry.target.id;
                    }
                });
            },
            {
                // Triggers when a section crosses the vertical center of the screen
                rootMargin: '-40% 0px -40% 0px' 
            }
        );

        // Tell the observer to watch all our section IDs
        navLinks.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    });
</script>

<nav class="fixed top-6 left-1/2 -translate-x-1/2 z-100 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-8 py-3 hidden md:block shadow-2xl">
    <ul class="flex items-center gap-10">
        {#each navLinks as { id, label }}
            <!-- Changed to flex-row layout -->
            <li class="relative flex items-center justify-center">
                
                <!-- Active Circular Bullet Indicator moved to the left -->
                <div 
                    class="absolute -left-4 w-1.5 h-1.5 rounded-full bg-[#FBCBA0] transition-all duration-300 ease-out {activeSection === id ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-50 translate-x-2'}"
                ></div>

                <button 
                    type="button"
                    onclick={() => scrollToSection(id)}
                    class="text-sm font-poppins font-medium tracking-wide transition-colors duration-300 {activeSection === id ? 'text-white' : 'text-neutral-400 hover:text-white'}"
                >
                    {label}
                </button>
                
            </li>
        {/each}
    </ul>
</nav>