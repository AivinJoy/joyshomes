<!-- src/routes/privacy-policy/+page.svelte -->
<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO
	title="Privacy Policy | Joys Homes & Developers"
	description="Privacy Policy for Joys Homes & Developers — how we collect, use, and protect your information."
	canonical="https://joyshomes.com/privacy-policy"
	noindex={true}
/>

<main class="min-h-screen bg-[#0F172A] text-neutral-300 px-6 md:px-16 py-16 md:py-24">
	<div class="max-w-3xl mx-auto">
		<a href="/" class="text-[#FBCBA0] text-sm hover:underline">&larr; Back to Home</a>

		<h1 class="text-white text-3xl md:text-4xl font-poppins font-bold mt-6 mb-2">Privacy Policy</h1>
		<p class="text-neutral-500 text-sm mb-10">Last updated: July 2026</p>

		<div class="flex flex-col gap-8 leading-relaxed text-sm md:text-base">
			<section>
				<h2 class="text-white text-xl font-semibold mb-3">1. Introduction</h2>
				<p>Joys Homes & Developers ("we", "us", "our") operates the website joyshomes.com. This Privacy Policy explains what information we collect, how we use it, and the choices you have.</p>
			</section>

			<section>
				<h2 class="text-white text-xl font-semibold mb-3">2. Information We Collect</h2>
				<p class="mb-3">When you submit a "Get a Quote" request on our site, we collect:</p>
				<ul class="list-disc list-inside flex flex-col gap-1.5">
					<li>Your name</li>
					<li>Your contact number</li>
					<li>Your email address (if provided)</li>
					<li>Your location/place (if provided)</li>
					<li>The service you're interested in</li>
					<li>Any message you choose to include</li>
				</ul>
				<p class="mt-3">We also use Google Analytics to understand general site usage (pages visited, approximate location, device type). This is collected automatically via cookies and does not personally identify you unless combined with information you've separately submitted to us.</p>
			</section>

			<section>
				<h2 class="text-white text-xl font-semibold mb-3">3. How We Use Your Information</h2>
				<ul class="list-disc list-inside flex flex-col gap-1.5">
					<li>To respond to your quote request and discuss your project</li>
					<li>To contact you via phone, email, or WhatsApp regarding your enquiry</li>
					<li>To understand how visitors use our website, so we can improve it</li>
				</ul>
			</section>

			<section>
				<h2 class="text-white text-xl font-semibold mb-3">4. How We Do Not Use Your Information</h2>
				<p>We do not sell, rent, or share your personal information with third parties for marketing purposes. Your quote request details are used solely by Joys Homes & Developers to respond to your enquiry.</p>
			</section>

			<section>
				<h2 class="text-white text-xl font-semibold mb-3">5. Service Providers</h2>
				<p>We use trusted third-party service providers to operate our website and communications, including:</p>
				<ul class="list-disc list-inside flex flex-col gap-1.5 mt-3">
					<li><strong class="text-white">Resend</strong> — to deliver quote request notifications to our team via email.</li>
					<li><strong class="text-white">Google Analytics</strong> — to understand website traffic and usage patterns.</li>
				</ul>
				<p class="mt-3">These providers process data on our behalf and are not permitted to use it for their own purposes.</p>
			</section>

			<section>
				<h2 class="text-white text-xl font-semibold mb-3">6. Data Retention</h2>
				<p>Quote request details are retained in our email inbox for as long as reasonably necessary to respond to and follow up on your enquiry. You may request deletion of your information at any time by contacting us.</p>
			</section>

			<section>
				<h2 class="text-white text-xl font-semibold mb-3">7. Your Rights</h2>
				<p>You may contact us at any time to request access to, correction of, or deletion of your personal information.</p>
			</section>

			<section>
				<h2 class="text-white text-xl font-semibold mb-3">8. Contact Us</h2>
				<p>If you have questions about this Privacy Policy, please contact us:</p>
				<ul class="list-disc list-inside flex flex-col gap-1.5 mt-3">
					<li>Email: <a href="mailto:joyshomesin@gmail.com" class="text-[#FBCBA0] hover:underline">joyshomesin@gmail.com</a></li>
					<li>Phone: <a href="tel:+919048681007" class="text-[#FBCBA0] hover:underline">+91 9048681007</a></li>
					<li>Address: Kizhakkepuram Road, Aranattukara, Thrissur, Kerala 680618, India</li>
				</ul>
			</section>
		</div>
	</div>
</main>