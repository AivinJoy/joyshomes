<!-- src/lib/components/QuoteModal.svelte -->
<script lang="ts">
	let { open = $bindable(false) } = $props<{ open: boolean }>();

	$effect(() => {
		if (open) {
			const scrollY = window.scrollY;
			document.body.style.position = 'fixed';
			document.body.style.top = `-${scrollY}px`;
			document.body.style.width = '100%';

			return () => {
				document.body.style.position = '';
				document.body.style.top = '';
				document.body.style.width = '';
				window.scrollTo(0, scrollY);
			};
		}
	});

	const services = [
		'Architectural Design',
		'Interior Design',
		'Planning & Drawings',
		'3D Rendering & Visualization',
		'Turnkey Construction',
		'Residential Construction',
		'Commercial Construction',
		'Steel & Prefabricated Buildings',
		'Renovation & Remodeling',
		'Project Management'
	];

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let service = $state('');
	let place = $state('');
	let message = $state('');

	let status = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');
	let errorMsg = $state('');

	function resetForm() {
		name = '';
		email = '';
		phone = '';
		service = '';
		place = '';
		message = '';
		status = 'idle';
		errorMsg = '';
	}

	function closeModal() {
		open = false;
		// Slight delay so the closing animation (if any) isn't interrupted by a form reset
		setTimeout(resetForm, 300);
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) closeModal();
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		status = 'submitting';
		errorMsg = '';

		try {
			const res = await fetch('/api/quote', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, phone, service, place, message })
			});

			const data = await res.json();

			if (!res.ok) {
				status = 'error';
				errorMsg = data.error || 'Something went wrong. Please try again.';
				return;
			}

			status = 'success';
			setTimeout(closeModal, 2200);
		} catch {
			status = 'error';
			errorMsg = 'Network error. Please check your connection and try again.';
		}
	}
</script>

{#if open}
	<div
		class="fixed inset-0 z-200 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
		onclick={handleBackdropClick}
		role="presentation"
	>
		<div
			class="relative w-full max-w-lg bg-[#0F172A] border border-white/10 rounded-3xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
			role="dialog"
			aria-modal="true"
			aria-labelledby="quote-modal-title"
		>
			<button
				type="button"
				onclick={closeModal}
				aria-label="Close"
				class="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
			>
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
			</button>

			{#if status === 'success'}
				<div class="flex flex-col items-center justify-center py-10 text-center">
					<div class="w-14 h-14 rounded-full bg-[#FBCBA0]/20 flex items-center justify-center mb-4">
						<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FBCBA0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
					</div>
					<h3 class="text-white text-xl font-poppins font-semibold mb-2">Request Sent!</h3>
					<p class="text-neutral-400 text-sm">Thank you, {name.split(' ')[0] || 'there'}. We'll get back to you shortly.</p>
				</div>
			{:else}
				<h3 id="quote-modal-title" class="text-white text-2xl font-poppins font-semibold mb-1">Get a Quote</h3>
				<p class="text-neutral-400 text-sm mb-6">Tell us about your project and we'll get back to you.</p>

				<form onsubmit={handleSubmit} class="flex flex-col gap-4">
					<div>
						<label for="qm-name" class="block text-neutral-300 text-xs mb-1.5">Name *</label>
						<input id="qm-name" type="text" bind:value={name} required
							class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-[#FBCBA0] transition-colors" />
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label for="qm-phone" class="block text-neutral-300 text-xs mb-1.5">Contact Number *</label>
							<input id="qm-phone" type="tel" bind:value={phone} required
								class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-[#FBCBA0] transition-colors" />
						</div>
						<div>
							<label for="qm-email" class="block text-neutral-300 text-xs mb-1.5">Email</label>
							<input id="qm-email" type="email" bind:value={email}
								class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-[#FBCBA0] transition-colors" />
						</div>
					</div>

					<div>
						<label for="qm-service" class="block text-neutral-300 text-xs mb-1.5">Service *</label>
						<select id="qm-service" bind:value={service} required
							class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#FBCBA0] transition-colors">
							<option value="" disabled selected class="bg-[#0F172A]">Select a service</option>
							{#each services as s}
								<option value={s} class="bg-[#0F172A]">{s}</option>
							{/each}
						</select>
					</div>

					<div>
						<label for="qm-place" class="block text-neutral-300 text-xs mb-1.5">Place</label>
						<input id="qm-place" type="text" bind:value={place}
							class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-[#FBCBA0] transition-colors" />
					</div>

					<div>
						<label for="qm-message" class="block text-neutral-300 text-xs mb-1.5">Message</label>
						<textarea id="qm-message" bind:value={message} rows="3"
							class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-[#FBCBA0] transition-colors resize-none"></textarea>
					</div>

					{#if status === 'error'}
						<p class="text-red-400 text-sm">{errorMsg}</p>
					{/if}

					<button
						type="submit"
						disabled={status === 'submitting'}
						class="mt-2 w-full bg-[#F5D0B5] hover:bg-[#e6c1a5] disabled:opacity-60 disabled:cursor-not-allowed text-neutral-900 font-bold text-sm md:text-base py-3 rounded-full transition-all active:scale-95 cursor-pointer"
					>
						{status === 'submitting' ? 'Sending...' : 'Submit Request'}
					</button>
				</form>
			{/if}
		</div>
	</div>
{/if}