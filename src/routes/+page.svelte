<script lang="ts">
   import { onMount } from 'svelte'; 
   import { gsap } from 'gsap';
   import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
   import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
   import Hero from "$lib/components/Hero.svelte";
   import Carousel from "$lib/components/Carousel.svelte";
   import Achievements from "$lib/components/Achievements.svelte";
   import Gallery from "$lib/components/Gallery.svelte";
   import Footer from "$lib/components/Footer.svelte";

   let pageWrapper = $state<HTMLElement>();
   let carouselProgress = $state<number>(0); 
   let aboutProgress = $state<number>(0);
   let isNavigating = false; 

   onMount(() => {
       if (!pageWrapper) return;
       
       gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

       const heroMain = pageWrapper.querySelector('#home-main');
       const heroHeader = pageWrapper.querySelector('#hero-header');
       const carouselContainer = pageWrapper.querySelector('#projects-container');
       const aboutSection = pageWrapper.querySelector('#about-layer');
       const insightsSection = pageWrapper.querySelector('#insights-layer');

       const carouselTracker = { value: 0 };

       const masterTl = gsap.timeline({
           scrollTrigger: {
               trigger: pageWrapper,
               start: "top top",
               end: "+=400%", 
               pin: true,
               scrub: 0.5,
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
                    duration: 0.6, // Slightly longer duration to catch the eye safely
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

       gsap.set(heroMain, { filter: "brightness(1)" });
       gsap.set(carouselContainer, { yPercent: 100 }); 
       gsap.set(aboutSection, { yPercent: 100 });
       gsap.set(insightsSection, { yPercent: 100 });

       masterTl.addLabel('home');

       // PHASE 1: HERO TEXT SCROLL ZONE
       // This empty spacer replaces the scrubbed animation, keeping the Carousel timing perfectly synced
       masterTl.to({}, { duration: 0.2 });

       // PHASE 2: CAROUSEL SHEET RISE OVERLAY
       masterTl.to(carouselContainer, {
           yPercent: 0,
           duration: 0.4,
           ease: "power2.inOut"
       });

       masterTl.to(heroMain, {
           filter: "brightness(0.2)",
           duration: 0.4,
           ease: "none"
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
           duration: 0.8,
           ease: "power1.inOut",
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
           duration: 0.6,
           ease: "power2.inOut"
       });

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
                console.warn('Unknown section: ${id}');
            }
            const scrollTriggerInstance = masterTl.scrollTrigger;
            if (!scrollTriggerInstance) return;
        
            // 1. Calculate precise scroll positioning
            const startPixel = scrollTriggerInstance.start;
            const totalWindowDistance = scrollTriggerInstance.end - startPixel;
            const targetPixel =
                id === 'home'
                    ? startPixel
                    : startPixel +
                      (masterTl.labels[id] / masterTl.duration()) *
                        totalWindowDistance;
            gsap.to(window, {
                scrollTo: targetPixel,
                duration: 1.2,
                ease: "power2.inOut",
                onStart: () => {
                    isNavigating = true;

                    // gsap.killTweensOf(window);

                    document.documentElement.setAttribute(
                        'data-active-section',
                        id
                    );
                },
                onComplete: () => {

                    if (id === 'home') {
                        masterTl.progress(0);
                    } else {
                        masterTl.progress(
                            masterTl.labels[id] / masterTl.duration()
                        );
                    }
                
                    isNavigating = false;
                }
            });
        };



        window.addEventListener('nav-scroll', handleNavRequest);

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
            window.removeEventListener('nav-scroll', handleNavRequest);
        };
   });
</script>

<div bind:this={pageWrapper} class="w-full h-screen min-h-screen relative overflow-hidden bg-black select-none">
    
    <div id="home-layer" class="w-full absolute inset-0 z-0 h-full pointer-events-auto">
        <Hero />
    </div>

    <div id="projects-layer" class="w-full absolute inset-0 z-10 h-full pointer-events-none">
        <div class="pointer-events-none h-full w-full">
            <Carousel progress={carouselProgress} />
        </div>
    </div>

    <div id="about-layer" class="w-full absolute inset-0 z-20 h-full pointer-events-none">
        <div class="pointer-events-auto h-full w-full">
            <Achievements progress={aboutProgress} />
        </div>
    </div>

    <div id="insights-layer" class="w-full absolute inset-0 z-30 h-full pointer-events-none">
        <div class="pointer-events-auto h-full w-full">
            <Gallery />
        </div>
    </div>

</div>

<div class="relative z-40 bg-[#0F172A]">
    <Footer/>
</div>
