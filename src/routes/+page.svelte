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
               end: "+=520%", 
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

       // --- STAGE INITIALIZATION ---
       gsap.set(heroHeader, { opacity: 0, y: 150 });
       gsap.set(heroMain, { filter: "brightness(1)" });
       gsap.set(carouselContainer, { yPercent: 100 }); 
       gsap.set(aboutSection, { yPercent: 100 });
       gsap.set(insightsSection, { yPercent: 100 });

       masterTl.addLabel('home');

       // PHASE 1: HERO TEXT ENTRANCE
       masterTl.to(heroHeader, {
           opacity: 1,
           y: 0,
           duration: 0.4,
           ease: "power2.out"
       });

       masterTl.to({}, { duration: 0.2 });

       // PHASE 2: CAROUSEL SHEET RISE OVERLAY
       masterTl.to(carouselContainer, {
           yPercent: 0,
           duration: 0.3,
           ease: "power2.inOut"
       });

       masterTl.to(heroMain, {
           filter: "brightness(0.2)",
           duration: 0.3,
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
       // We use onUpdate directly on the slide tween. As the sheet moves from 100% to 0%, 
       // the 3D cards tilt and fade in at the exact same pace.
       masterTl.to(aboutSection, {
           yPercent: 0,
           duration: 0.8, // Combined duration for a single smooth entry
           ease: "power1.inOut",
           onUpdate: function() {
               if (!isNavigating) {
                   // Calculate the progress of this specific tween dynamically (0 to 1)
                   aboutProgress = this.progress(); 
               }
           }
       });

       // FIXED ANCHOR PLACE: The label sits here where the section is fully open and visible.
       masterTl.addLabel('about'); 
       masterTl.to({}, { duration: 0.4 }); // Short pause while reading full achievements

       // PHASE 5: GALLERY INSIGHTS LAYER SHEET ENTRANCE
       masterTl.to(insightsSection, {
           yPercent: 0,
           duration: 0.6,
           ease: "power2.inOut"
       });

       masterTl.addLabel('insights'); 

       // UNIVERSAL NAV COMPONENT LISTENER
       const handleNavRequest = (e: Event) => {
           const id = (e as CustomEvent).detail.id;
           const scrollTriggerInstance = masterTl.scrollTrigger;
           if (!scrollTriggerInstance) return;

           const startPixel = scrollTriggerInstance.start;
           const totalWindowDistance = scrollTriggerInstance.end - startPixel;

           const targetPixel = startPixel + (masterTl.labels[id] / masterTl.duration()) * totalWindowDistance;

           gsap.to(window, {
               scrollTo: targetPixel,
               duration: 1.2,
               ease: "power2.inOut",
               onStart: () => {
                   isNavigating = true; 
               },
               onComplete: () => {
                   isNavigating = false;
                   // Enforce structural catchup values instantly on arrival
                   carouselProgress = carouselTracker.value;
                   
                   // If navigating straight to 'about', make sure it forces progress to 1
                   if (id === 'about' || id === 'insights') {
                       aboutProgress = 1;
                   } else {
                       aboutProgress = 0;
                   }
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
