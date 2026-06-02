<script lang="ts">
    import { onMount } from 'svelte';

    const navLinks = [
        { id: 'home', label: 'Home' },
        { id: 'projects', label: 'Projects' },
        { id: 'about', label: 'About' },
        { id: 'insights', label: 'Insights' }
    ];

    let activeSection = $state<string>('home');

    function scrollToSection(id: string) {
        window.dispatchEvent(new CustomEvent('nav-scroll', { detail: { id } }));
    }

    onMount(() => {
        const updateState = () => {
            const current = document.documentElement.getAttribute('data-active-section');
            if (current) activeSection = current;
        };

        const observer = new MutationObserver(updateState);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-active-section'] });
        
        updateState();

        return () => observer.disconnect();
    });
</script>

<!-- CHANGED: Set z-index explicitly to z-110 so it floats cleanly on top of all sliding full-page elements -->
<nav class="fixed top-6 left-1/2 -translate-x-1/2 z-110 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-8 py-3 hidden md:block shadow-2xl">
    <ul class="flex items-center gap-10">
        {#each navLinks as { id, label }}
            <li class="relative flex items-center justify-center">
                
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
