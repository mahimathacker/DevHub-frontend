export function slugify(title: string): string {
    return title
        .toLowerCase()
        // Replace special characters and spaces with hyphens
        .replace(/[^a-z0-9]+/g, '-')
        // Remove parentheses and their contents
        .replace(/\(.*?\)/g, '')
        // Remove quotes
        .replace(/["']/g, '')
        // Remove any resulting double hyphens
        .replace(/-+/g, '-')
        // Remove leading/trailing hyphens
        .replace(/^-+|-+$/g, '')
        // Trim any whitespace
        .trim();
} 