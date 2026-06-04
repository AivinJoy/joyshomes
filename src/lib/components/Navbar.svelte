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

<nav class="fixed top-6 z-110 border flex shadow-2xl transition-all duration-500 ease-in-out overflow-hidden
    {activeSection === 'home' ? 'right-6 md:right-auto md:left-1/2 md:-translate-x-1/2' : 'right-6 md:right-10'}   <!-- Desktop and mobile position for the hamburger -->
    {activeSection === 'home' ? 'bg-white/10 md:bg-black/40 backdrop-blur-xl border-white/10' : 'bg-white/10 backdrop-blur-xl border-white/20'} <1-- Mobile and desktop styles for the hamaburger -->
    {isMenuOpen ? 'flex-col items-start p-7 rounded-3xl w-52' : 'items-center justify-center w-14 h-14 rounded-full'}
    md:flex-row md:items-center
    {
    activeSection === 'home'
        ? 'md:w-auto md:h-auto md:px-8 md:py-3 md:rounded-full'
        : isMenuOpen
            ? 'md:w-auto md:h-auto md:px-6 md:py-2 md:rounded-full'
            : 'md:w-12 md:h-12 md:justify-center md:rounded-full'
    }
">
    
    <ul class="transition-all duration-500 ease-in-out overflow-hidden
        {isMenuOpen ? 'flex flex-col opacity-100 max-h-64 w-full gap-5 mt-8' : 'flex flex-col opacity-0 max-h-0 w-0 gap-0 m-0'}
        md:flex-row md:max-h-none md:mt-0
        {activeSection === 'home' || isMenuOpen ? 'md:opacity-100 md:w-auto md:gap-8' : 'md:opacity-0 md:w-0 md:gap-0'}
        {activeSection !== 'home' && isMenuOpen ? 'md:mr-4' : 'md:mr-0'}
    ">
        {#each navLinks as { id, label }}
            <li class="relative flex items-center justify-start md:justify-center whitespace-nowrap w-full">
                <div 
                    class="absolute -left-4 w-1.5 h-1.5 rounded-full bg-[#FBCBA0] transition-all duration-300 ease-out {activeSection === id ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-50 translate-x-2'}"
                ></div>

                <button 
                    type="button"
                    onclick={() => scrollToSection(id)}
                    class="text-sm font-poppins font-medium tracking-wide transition-colors duration-300 text-left w-full md:w-auto {activeSection === id ? 'text-white' : 'text-neutral-400 hover:text-white'}"
                >
                    {label}
                </button>
            </li>
        {/each}
    </ul>

    <button
        class="flex items-center justify-center cursor-pointer shrink-0 
        {isMenuOpen ? 'absolute top-3 right-3 md:relative md:top-0 md:right-0' : ''} 
        {activeSection === 'home' ? 'md:hidden' : 'md:flex'}"
        onclick={() => isMenuOpen = !isMenuOpen}
        aria-label="Toggle Navigation"
    >
        <svg 
            viewBox="0 0 32 32" 
            class="w-8 h-8 transition-transform duration-500 ease-in-out {isMenuOpen ? '-rotate-45 scale-90' : 'scale-100'}"
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
</nav>