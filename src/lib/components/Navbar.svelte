<!-- components/Navbar.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';

    const navLinks = [
        { id: 'home', label: 'Home' },
        { id: 'projects', label: 'Projects' },
        { id: 'about', label: 'About' },
        { id: 'insights', label: 'Insights' }
    ];

    let activeSection = $state<string>('home');
    let isMenuOpen = $state<boolean>(false);    

    function scrollToSection(id: string) {
        window.dispatchEvent(new CustomEvent('nav-scroll', { detail: { id } }));
        isMenuOpen = false;
    }

    onMount(() => {
        const updateState = () => {
            const current = document.documentElement.getAttribute('data-active-section');
            if (current) {
                activeSection = current;
                if (current === 'home') isMenuOpen = false;
            }    
        };

        const observer = new MutationObserver(updateState);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-active-section'] });
        
        updateState();

        return () => observer.disconnect();
    });
</script>

<!-- CHANGED: Set z-index explicitly to z-110 so it floats cleanly on top of all sliding full-page elements -->
<nav class="fixed top-6 z-110 border rounded-full flex items-center shadow-2xl transition-all duration-500 ease-in-out {activeSection === 'home' ? 'bg-black/40 backdrop-blur-md border-white/10 left-1/2 -translate-x-1/2' : 'bg-white/10 backdrop-blur-lg border-white/20 right-6 md:right-10'} {activeSection === 'home' || isMenuOpen ? 'px-8 py-3' : 'w-14 h-14 justify-center'}">
    
    <ul class="flex items-center transition-all duration-500 ease-in-out overflow-hidden {activeSection === 'home' || isMenuOpen ? 'opacity-100 max-w-150 gap-8' : 'opacity-0 max-w-0 gap-0'} {activeSection !== 'home' && isMenuOpen ? 'mr-4' : 'mr-0'}">
        {#each navLinks as { id, label }}
            <li class="relative flex items-center justify-center whitespace-nowrap">
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

    {#if activeSection !== 'home'}
        <button
            class="flex items-center justify-center cursor-pointer shrink-0"
            onclick={() => isMenuOpen = !isMenuOpen}
            aria-label="Toggle Navigation"
        >
            <svg 
                viewBox="0 0 32 32" 
                class="w-9 h-9 transition-transform duration-500 ease-in-out {isMenuOpen ? '-rotate-45' : ''}"
            >
                <path 
                    class="fill-none stroke-white stroke-[2.5px] stroke-linecap-round stroke-linejoin-round transition-all duration-500 ease-in-out {isMenuOpen ? '[stroke-dasharray:20_300] [stroke-dashoffset:-32.42]' : '[stroke-dasharray:12_63]'}" 
                    d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                ></path>
                <path 
                    class="fill-none stroke-white stroke-[2.5px] stroke-linecap-round stroke-linejoin-round transition-all duration-500 ease-in-out" 
                    d="M7 16 27 16"
                ></path>
            </svg>
        </button>
    {/if}
</nav>