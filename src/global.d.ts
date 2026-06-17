// Handles exact 2-width matches used in Carousel
declare module '*?enhanced&w=576;1152' {
    const value: import('@sveltejs/enhanced-img').EnhancedImgAttributes['src'];
    export default value;
}

// Handles the 5-width matches with quality parameters used in Gallery
declare module '*?enhanced&w=120;240;480;800;1200&quality=80' {
    const value: import('@sveltejs/enhanced-img').EnhancedImgAttributes['src'];
    export default value;
}

// FIX: Gallery Component (Desktop Targets)
declare module '*?enhanced&w=800;1200;1600;1920&quality=80' {
    const value: import('@sveltejs/enhanced-img').EnhancedImgAttributes['src'];
    export default value;
}

// Catch-all structural module pattern for any dynamic query strings
declare module '*?enhanced*' {
    const value: import('@sveltejs/enhanced-img').EnhancedImgAttributes['src'];
    export default value;
}
