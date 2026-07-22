<!-- src/lib/components/+page.svelte -->
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
   import QuoteModal from '$lib/components/QuoteModal.svelte';

   let pageWrapper = $state<HTMLElement>();
   let isQuoteOpen = $state(false);
   let carouselProgress = $state<number>(0); 
   let aboutProgress = $state<number>(0);
   let isNavigating = false; 

   onMount(() => {
        window.scrollTo(0, 0);

       if (!pageWrapper) return;

       if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
       }
       
       gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
       ScrollTrigger.config({ ignoreMobileResize: true });

       const heroMain = pageWrapper.querySelector('#home-layer');
       const heroHeader = pageWrapper.querySelector('#hero-header');
       const carouselContainer = pageWrapper.querySelector('#projects-layer');
       const aboutSection = pageWrapper.querySelector('#about-layer');
       const insightsSection = pageWrapper.querySelector('#insights-layer');

       const carouselTracker = { value: 0 };

       let lastActiveSection = 'home';

       const PHASE_HOME = 0.5;
       const PHASE_RISE = 2.0;
       const PHASE_ROTATE = 2.0;
       const PHASE_ABOUT = 2.0;
       const PHASE_TOTAL = PHASE_HOME + PHASE_RISE + PHASE_ROTATE + PHASE_ABOUT;

       // Progress (0-1) at which each phase begins
       const PROJECTS_THRESHOLD = PHASE_HOME / PHASE_TOTAL;                      // ~0.077
       const ABOUT_THRESHOLD = (PHASE_HOME + PHASE_RISE + PHASE_ROTATE) / PHASE_TOTAL; // ~0.692


       const masterTl = gsap.timeline({
           scrollTrigger: {
               trigger: pageWrapper,
               start: "top top",
               end: "+=300%", 
               pin: true,
               scrub: 0.8,
               invalidateOnRefresh: true,
               onUpdate: (self) => {
                   const p = self.progress;
                   let current = 'home';
                   
                   if (p >= PROJECTS_THRESHOLD && p < ABOUT_THRESHOLD) current = 'projects';
                   else if (p >= ABOUT_THRESHOLD) current = 'about';
                   
                   if (current !== lastActiveSection) {
                       lastActiveSection = current;
                       document.documentElement.setAttribute('data-active-section', current);
                   }
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
       gsap.set(heroMain, { filter: "brightness(1)", force3D: true, willChange: 'filter' });
       gsap.set(carouselContainer, { yPercent: 100, force3D: true, visibility: 'visible', willChange:'transform' }); 
       gsap.set(aboutSection, { yPercent: 100, force3D: true, visibility: 'visible', willChange:'transform' });

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

       const ROUND_PRECISION = 500;

       // PHASE 3: 3D CARD ROTATION ENGINE
       masterTl.addLabel('projects'); 
       masterTl.to(carouselTracker, {
           value: 1, 
           duration: 2.0, 
           ease: "none",
           onUpdate: function() {
               if (!isNavigating) {
                const rounded = Math.round(carouselTracker.value * ROUND_PRECISION) / ROUND_PRECISION;
                    if ( rounded !== carouselProgress) {                    
                        carouselProgress = rounded;
                    }
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
                   const rounded = Math.round(this.progress() * ROUND_PRECISION) / ROUND_PRECISION;
                   if (rounded !== aboutProgress) {
                       aboutProgress = rounded;
                   }
               }
           }
       });

       masterTl.addLabel('about');
       
       // Detect natural scroll into the Insights section (outside the pinned area)
        ScrollTrigger.create({
            trigger: '#insights-layer',
            start: 'top center',
            onEnter: () => {
                if (lastActiveSection !== 'insights') {
                    lastActiveSection = 'insights';
                    document.documentElement.setAttribute('data-active-section', 'insights');
                }
            },
            onLeaveBack: () => {
                if (lastActiveSection !== 'about') {
                    lastActiveSection = 'about';
                    document.documentElement.setAttribute('data-active-section', 'about');
                }
            }
        });

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
            if (id === 'insights') {
                isNavigating = true;
                gsap.to(window, {
                    scrollTo: "#insights-layer",
                    duration: 0, // Keeps your instant snap effect
                    onComplete: () => {
                        isNavigating = false;
                        lastActiveSection = id;
                        document.documentElement.setAttribute('data-active-section', id);
                    }
                });
                return;
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
                    lastActiveSection = id;

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
        let lastWidth = window.innerWidth;
        let resizeTimeout: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newWidth = window.innerWidth;
                // Ignore height-only changes (mobile address bar show/hide)
                if (newWidth !== lastWidth) {
                    lastWidth = newWidth;
                    ScrollTrigger.refresh();
                }
            }, 200);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(resizeTimeout);
            ScrollTrigger.getAll().forEach(t => t.kill());
            window.removeEventListener('nav-scroll', handleNavRequest);
            window.removeEventListener('resize', handleResize);
        };
   });
</script>

<Navbar/>

<div bind:this={pageWrapper} class="w-full h-lvh md:h-screen min-h-screen relative overflow-hidden bg-black select-none isolate">
    
    <div id="home-layer" class="w-full absolute inset-0 z-0 h-full pointer-events-auto">
        <Hero onOpenQuote={() => isQuoteOpen = true} />
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
</div>

<div id="insights-layer" class="w-full bg-[#0F172A] relative">
    <Gallery />
</div>

<section id="faq" aria-label="Frequently asked questions"
  class="w-full bg-[#0F172A] py-16 px-6 md:px-16 text-left">
  <h2 class="text-white text-2xl font-bold mb-8">Frequently Asked Questions</h2>

  {#each [
    {
      q: 'What services do you offer?',
      a: 'We provide architectural design, planning, 3D rendering, interior design, residential and commercial construction, renovation, turnkey construction, and project management.'
    },
    {
      q: 'What is turnkey construction?',
      a: 'Turnkey construction is a complete end-to-end service where we handle everything from design and approvals to construction and handover, delivering a ready-to-use property.'
    },
    {
      q: 'Do you undertake both residential and commercial projects?',
      a: 'Yes, we specialize in both residential homes and commercial buildings of various sizes.'
    },
    {
      q: 'Can you help with architectural plans and approvals?',
      a: 'Yes. We prepare architectural drawings, structural plans, and assist with the necessary approvals and documentation.'
    },
    {
      q: 'Do you provide 3D designs before construction starts?',
      a: 'Yes, we create realistic 3D visualizations and renderings so you can visualize your project before construction begins.'
    },
    {
      q: 'Can I customize my home design?',
      a: 'Absolutely. Every project is tailored to your lifestyle, budget, and preferences.'
    },
    {
      q: 'Do you renovate existing homes and commercial buildings?',
      a: 'Yes. We undertake renovation, remodeling, extensions, and structural modifications.'
    }
  ] as item}
    <details class="mb-4 border-b border-white/10 pb-4">
      <summary class="text-white font-semibold cursor-pointer hover:text-gray-300 transition-colors">
        {item.q}
      </summary>
      <p class="mt-2 text-gray-400">{item.a}</p>
    </details>
  {/each}
</section>

<div class="relative bg-[#0F172A]">
    <Footer/>
</div>

<QuoteModal bind:open={isQuoteOpen} />

<style>
    :global(#hero-header) {
        opacity: 0;
    }
    #projects-layer, #about-layer{
        visibility: hidden;
    }
    :global(html, body) {
            background-color: #000;
            overflow-x: hidden;
    }

    :global(.gsap-pin-spacer) {
        background-color: #0F172A !important; /* matches footer bg */
    }
</style>