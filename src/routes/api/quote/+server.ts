// src/routes/api/quote/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

const FROM_EMAIL = 'Joys Homes <quotes@joyshomes.com>';
const TO_EMAIL = 'joyshomesin@gmail.com';

const VALID_SERVICES = [
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

export const POST: RequestHandler = async ({ request }) => {
	let body: Record<string, unknown>;

	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid request body.' }, { status: 400 });
	}

	const name = typeof body.name === 'string' ? body.name.trim() : '';
	const email = typeof body.email === 'string' ? body.email.trim() : '';
	const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
	const service = typeof body.service === 'string' ? body.service.trim() : '';
	const place = typeof body.place === 'string' ? body.place.trim() : '';
	const message = typeof body.message === 'string' ? body.message.trim() : '';

	// Required: name, phone, service
	const errors: string[] = [];

	if (!name) errors.push('Name is required.');
	if (!phone) errors.push('Contact number is required.');
	if (phone && !/^[\d+\-\s()]{7,20}$/.test(phone)) errors.push('Contact number looks invalid.');
	if (!service) errors.push('Service is required.');
	if (service && !VALID_SERVICES.includes(service)) errors.push('Invalid service selected.');
	if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Email looks invalid.');

	if (errors.length > 0) {
		return json({ error: errors.join(' ') }, { status: 400 });
	}

	try {
		await resend.emails.send({
			from: FROM_EMAIL,
			to: TO_EMAIL,
			replyTo: email || undefined,
			subject: `New Quote Request — ${name} (${service})`,
			html: `
				<h2>New Quote Request</h2>
				<p><strong>Name:</strong> ${escapeHtml(name)}</p>
				<p><strong>Email:</strong> ${escapeHtml(email || 'Not provided')}</p>
				<p><strong>Contact Number:</strong> ${escapeHtml(phone)}</p>
				<p><strong>Service:</strong> ${escapeHtml(service)}</p>
				<p><strong>Place:</strong> ${escapeHtml(place || 'Not provided')}</p>
				<p><strong>Message:</strong><br/>${escapeHtml(message || 'No message provided').replace(/\n/g, '<br/>')}</p>
			`
		});
	} catch (err) {
		console.error('Resend send failed:', err);
		return json({ error: 'Failed to send your request. Please try again later.' }, { status: 500 });
	}

	return json({ success: true });
};

// Minimal HTML escaping to prevent injection into the email body
function escapeHtml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}