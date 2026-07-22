<!-- src/routes/terms-of-service/+page.svelte -->
<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO
	title="Terms of Service | Joys Homes & Developers"
	description="Terms of Service for Joys Homes & Developers website."
	canonical="https://joyshomes.com/terms-of-service"
	noindex={true}
/>

<main class="min-h-screen bg-[#0F172A] text-neutral-300 px-6 md:px-16 py-16 md:py-24">
	<div class="max-w-3xl mx-auto">
		<a href="/" class="text-[#FBCBA0] text-sm hover:underline">&larr; Back to Home</a>

		<h1 class="text-white text-3xl md:text-4xl font-poppins font-bold mt-6 mb-2">Terms of Service</h1>
		<p class="text-neutral-500 text-sm mb-10">Last updated: July 2026</p>

		<div class="flex flex-col gap-8 leading-relaxed text-sm md:text-base">
			<section>
				<h2 class="text-white text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
				<p>By accessing and using joyshomes.com, you agree to be bound by these Terms of Service. If you do not agree, please do not use this website.</p>
			</section>

			<section>
				<h2 class="text-white text-xl font-semibold mb-3">2. Website Content</h2>
				<p>The content on this website — including text, images, project photography, and branding — is the property of Joys Homes & Developers unless otherwise stated, and may not be reproduced without permission.</p>
			</section>

			<section>
				<h2 class="text-white text-xl font-semibold mb-3">3. Quote Requests</h2>
				<p>Submitting a "Get a Quote" request through this website does not constitute a binding contract, order, or commitment between you and Joys Homes & Developers. It is an enquiry only. Pricing, timelines, and project scope will be discussed and confirmed separately following contact.</p>
			</section>

			<section>
				<h2 class="text-white text-xl font-semibold mb-3">4. Accuracy of Information</h2>
				<p>While we strive to keep information on this website accurate and up to date — including pricing ranges, project timelines, and service descriptions — actual costs and timelines may vary based on project specifics. Please contact us directly for a detailed, project-specific estimate.</p>
			</section>

			<section>
				<h2 class="text-white text-xl font-semibold mb-3">5. Limitation of Liability</h2>
				<p>Joys Homes & Developers is not liable for any indirect, incidental, or consequential damages arising from your use of this website or reliance on general information published on it.</p>
			</section>

			<section>
				<h2 class="text-white text-xl font-semibold mb-3">6. External Links</h2>
				<p>Our website may link to third-party sites (such as WhatsApp, Instagram, or LinkedIn). We are not responsible for the content or privacy practices of these external sites.</p>
			</section>

			<section>
				<h2 class="text-white text-xl font-semibold mb-3">7. Changes to These Terms</h2>
				<p>We may update these Terms of Service from time to time. Continued use of the website after changes constitutes acceptance of the updated terms.</p>
			</section>

			<section>
				<h2 class="text-white text-xl font-semibold mb-3">8. Contact Us</h2>
				<p>Questions about these Terms can be directed to:</p>
				<ul class="list-disc list-inside flex flex-col gap-1.5 mt-3">
					<li>Email: <a href="mailto:joyshomesin@gmail.com" class="text-[#FBCBA0] hover:underline">joyshomesin@gmail.com</a></li>
					<li>Phone: <a href="tel:+919048681007" class="text-[#FBCBA0] hover:underline">+91 9048681007</a></li>
				</ul>
			</section>
		</div>
	</div>
</main>