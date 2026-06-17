// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare module '*?enhanced&quality=85' {
	const value: import('@sveltejs/enhanced-img').EnhancedImgAttributes['src'];
	export default value;
}

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
