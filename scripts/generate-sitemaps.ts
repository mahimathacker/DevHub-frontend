import generateSitemapss from "../src/lib/generateSitemaps";

async function generate() {
    try {
        await generateSitemapss();
        console.log('✅ Sitemaps generated successfully');
    } catch (error) {
        console.error('❌ Error generating sitemaps:', error);
        process.exit(1);
    }
}

generate(); 