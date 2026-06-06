<!-- components/+page.svelte -->
<script lang="ts">
   import { onMount } from 'svelte'; 
   import { gsap } from 'gsap';
   import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
   import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
   import Navbar from '$lib/components/Navbar.svelte';
   import Hero from "$lib/components/Hero.svelte";
   import Carousel from "$lib/components/Carousel.svelte";
   import Achievements from "$lib/components/Achievements.svelte";
   import Gallery from "$lib/components/Gallery.svelte";
   import Footer from "$lib/components/Footer.svelte";
   import { page } from '$app/state';

   let pageWrapper = $state<HTMLElement>();
   let carouselProgress = $state<number>(0); 
   let aboutProgress = $state<number>(0);
   let isNavigating = false; 

   onMount(() => {
       if (!pageWrapper) return;
       
       gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
       ScrollTrigger.normalizeScroll({
        momentum: 0.3,
        allowNestedScroll: true
       });
       ScrollTrigger.config({ ignoreMobileResize: true });

       const heroMain = pageWrapper.querySelector('#home-layer');
       const heroHeader = pageWrapper.querySelector('#hero-header');
       const carouselContainer = pageWrapper.querySelector('#projects-layer');
       const aboutSection = pageWrapper.querySelector('#about-layer');
       const insightsSection = pageWrapper.querySelector('#insights-layer');

       const carouselTracker = { value: 0 };

       const masterTl = gsap.timeline({
           scrollTrigger: {
               trigger: pageWrapper,
               start: "top top",
               end: "+=400%", 
               pin: true,
               scrub: 0.8,
               invalidateOnRefresh: true,
               onUpdate: (self) => {
                   const p = self.progress;
                   let current = 'home';
                   
                   if (p >= 0.12 && p < 0.48) current = 'projects';
                   else if (p >= 0.48 && p < 0.78) current = 'about';
                   else if (p >= 0.78) current = 'insights';
                   
                   document.documentElement.setAttribute('data-active-section', current);
               }
           } 
       });

       // INDEPENDENT HERO HEADER ANIMATION
       // By taking this out of the 'scrub' timeline, it plays automatically on its own!
       // It triggers exactly when you scroll 10px down, and reverses when you go back to the top.
       gsap.set(heroHeader, { opacity: 0, y: 30 });

        ScrollTrigger.create({
            trigger: pageWrapper,
            start: 10,
            end: 20,
            scrub: false,
            onEnter: () => {
                // Force a slower opacity transition so you actually see it fade in
                gsap.to(heroHeader, {
                    opacity: 1,
                    duration: 0.8, // Slightly longer duration to catch the eye safely
                    ease: "power1.out", // Soft, linear-leaning curve for visibility
                    overwrite: "auto"
                });
                // Keep the movement snappy but minimal
                gsap.to(heroHeader, {
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            },
            onLeaveBack: () => {
                // Match the smooth fade out down
                gsap.to(heroHeader, {
                    opacity: 0,
                    y: 30,
                    duration: 0.5,
                    ease: "power2.inOut",
                    overwrite: "auto"
                });
            }
        }); 
       gsap.set(heroMain, { filter: "brightness(1)", force3D: true });
       gsap.set(carouselContainer, { yPercent: 100, force3D: true, visibility: 'visible' }); 
       gsap.set(aboutSection, { yPercent: 100, force3D: true, visibility: 'visible' });
       gsap.set(insightsSection, { yPercent: 100, force3D: true, visibility: 'visible' });

       masterTl.addLabel('home');

       // PHASE 1: HERO TEXT SCROLL ZONE
       // This empty spacer replaces the scrubbed animation, keeping the Carousel timing perfectly synced
       masterTl.to({}, { duration: 0.5 });

       // PHASE 2: CAROUSEL SHEET RISE OVERLAY
       masterTl.to(carouselContainer, {
           yPercent: 0,
           duration: 2.0,
           ease: "power2.inOut",
           force3D: true
       });

       masterTl.to(heroMain, {
           filter: "brightness(0.2)",
           duration: 0.4,
           ease: "none",
           force3D: true
       }, "<");

       // PHASE 3: 3D CARD ROTATION ENGINE
       masterTl.addLabel('projects'); 
       masterTl.to(carouselTracker, {
           value: 1, 
           duration: 2.0, 
           ease: "none",
           onUpdate: function() {
               if (!isNavigating) {
                   carouselProgress = carouselTracker.value;
               }
           }
       });

       // PHASE 4: ACHIEVEMENTS SHEET ENTRANCE + 3D FLIP SYNCED
       masterTl.to(aboutSection, {
           yPercent: 0,
           duration: 2.0,
           ease: "power1.inOut",
           force3D: true,
           onUpdate: function() {
               if (!isNavigating) {
                   aboutProgress = this.progress(); 
               }
           }
       });

       masterTl.addLabel('about'); 

       // PHASE 5: GALLERY INSIGHTS LAYER SHEET ENTRANCE
       masterTl.to(insightsSection, {
           yPercent: 0,
           duration: 2.0,
           ease: "power2.inOut",
           force3D: true
       });

       masterTl.to({}, { duration: 0.3 });

       masterTl.addLabel('insights'); 

        // UNIVERSAL NAV COMPONENT LISTENER
        const handleNavRequest = (e: Event) => {
            if (isNavigating) return;
            const id = (e as CustomEvent).detail.id;
            if (
                id !== 'home' &&
                id !== 'projects' &&
                id !== 'about' &&
                id !== 'insights'
            ) {
                console.warn(`Unknown section: ${id}`);
            }
            const scrollTriggerInstance = masterTl.scrollTrigger;
            if (!scrollTriggerInstance) return;
        
            // 1. Calculate precise scroll positioning
            const startPixel = scrollTriggerInstance.start;
            const totalWindowDistance = scrollTriggerInstance.end - startPixel;
            const targetPixel =
                id === 'home'
                    ? startPixel
                    : startPixel + (masterTl.labels[id] / masterTl.duration()) * totalWindowDistance;
            gsap.to(window, {
                scrollTo: targetPixel,
                duration: 0, 
                onStart: () => {
                    isNavigating = true;

                    document.documentElement.setAttribute(
                        'data-active-section',
                        id
                    );
                },
                onComplete: () => {
                    // Instantly snap the timeline to the correct section to prevent scrub lag
                    const targetProgress = id === 'home' ? 0 : masterTl.labels[id] / masterTl.duration();
                    masterTl.progress(targetProgress);
                    
                    // Force the ScrollTrigger scrub tween to finish without the redundant if-check
                    scrollTriggerInstance.getTween()?.progress(1);
                
                    isNavigating = false;
                    carouselProgress = carouselTracker.value;
                }
            });
        };



        window.addEventListener('nav-scroll', handleNavRequest);
        const handleResize = () => ScrollTrigger.refresh();
        window.addEventListener('resize', handleResize);

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
            window.removeEventListener('nav-scroll', handleNavRequest);
            window.removeEventListener('resize', handleResize);
        };
   });
</script>

<Navbar/>

<div bind:this={pageWrapper} class="w-full h-dvh md:h-screen min-h-screen relative overflow-hidden bg-black select-none isolate">
    
    <div id="home-layer" class="w-full absolute inset-0 z-0 h-full pointer-events-auto">
        <Hero />
    </div>

    <div id="projects-layer" class="w-full absolute inset-0 z-10 h-full pointer-events-none overflow-hidden">
        <div class="pointer-events-auto h-full w-full">
            <Carousel progress={carouselProgress} />
        </div>
    </div>

    <div id="about-layer" class="w-full absolute inset-0 z-20 h-full pointer-events-none overflow-hidden">
        <div class="pointer-events-auto h-full w-full">
            <Achievements progress={aboutProgress} />
        </div>
    </div>

    <div id="insights-layer" class="w-full absolute inset-0 z-30 h-full pointer-events-none overflow-hidden">
        <div class="pointer-events-auto h-full w-full">
            <Gallery />
        </div>
    </div>
</div>

<div class="relative bg-[#0F172A]">
    <Footer/>
</div>

<style>
    :global(#hero-header) {
        opacity: 0;
    }
    #projects-layer, #about-layer, #insights-layer {
        visibility: hidden;
        will-change: transform;
    }
    :global(html, body) {
            background-color: #000;
            overflow-x: hidden;
    }

    :global(.gsap-pin-spacer) {
        background-color: #0F172A !important; /* matches footer bg */
    }
</style>