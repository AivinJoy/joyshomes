<script lang="ts">
    import Navbar from './Navbar.svelte';
</script>

<main 
    id="home-main"
    class="w-full h-screen min-h-150 flex items-center justify-center overflow-hidden bg-neutral-900 select-none will-change-transform backface-hidden transform-origin-top"
>
    <img 
        src="/house_full.jpeg" 
        alt="Warm Sunset Sky Background" 
        class="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0" 
    />

    <div 
        id="hero-header"
        class="absolute top-[10%] md:top-[9%] left-0 w-full z-10 flex justify-center"
    >
        <h1 class="font-poppins font-bold tracking-normal text-center header-gradient text-[8vw] md:text-[14.8vw] whitespace-nowrap leading-none uppercase w-full">
            JOYS HOMES
        </h1>
    </div>

    <img 
        src="/house_cutout1.png" 
        alt="Modern House Foreground Architecture" 
        class="absolute inset-0 w-full h-full object-cover object-center z-20 pointer-events-none" 
    />

    <div class="absolute top-6 left-6 md:top-4 md:left-10 z-50">
        <span class="text-2xl md:text-3xl font-bold text-white tracking-widest">LOGO.</span>
    </div>

    <Navbar />

    <button class="absolute top-6 right-6 md:top-4 md:right-10 z-50 flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-[#F5D0B5] hover:bg-[#e6c1a5] text-neutral-900 font-bold text-sm md:text-base rounded-full transition-all shadow-lg active:scale-95">
        Book now
        <svg xmlns="http://w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="md:w-5 md:h-5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
    </button>

    <div class="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex items-center gap-3 md:gap-4">
        <a href="https://wa.me" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#FBCBA0] hover:text-black hover:border-transparent transition-all duration-300">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://w3.org" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z" clip-rule="evenodd"/><path fill="currentColor" d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"/></svg>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#FBCBA0] hover:text-black hover:border-transparent transition-all duration-300">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://w3.org" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd"/></svg>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#FBCBA0] hover:text-black hover:border-transparent transition-all duration-300">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://w3.org" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd"/><path d="M7.2 8.809H4V19.5h3.2V8.809Z"/></svg>
        </a>
    </div>
</main>

<style>
    @import url('https://googleapis.com');
    .font-poppins { font-family: 'Poppins', sans-serif; }
    .header-gradient {
        background-image: linear-gradient(180deg, #FFFFFF 0%, #FFE0B2 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }
    .transform-origin-top { transform-origin: top center; }
</style>
