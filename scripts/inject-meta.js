/**
 * PDE Meta Tag Injector
 *
 * Adds to ALL HTML files in root:
 *   1. og:image + og:image:width + og:image:height + og:image:type
 *   2. twitter:image
 *   3. Favicon links (favicon.ico, apple-touch-icon, favicon-32, favicon-16)
 *   4. hreflang tags (ca, es, en, x-default)
 *
 * Usage: node scripts/inject-meta.js
 * Run AFTER generate-assets.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BASE_URL = 'https://profedeeconomia.es';

// ── Get all HTML files ─────────────────────────────────────────
const htmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));

let modified = 0;
let skipped = 0;

for (const filename of htmlFiles) {
    const filepath = path.join(ROOT, filename);
    let html = fs.readFileSync(filepath, 'utf-8');
    const slug = filename.replace('.html', '');

    // Determine page URL
    const pageUrl = slug === 'index'
        ? `${BASE_URL}/`
        : `${BASE_URL}/${slug}`;

    // Determine OG image slug (check if file exists, fallback to default)
    const ogImageSlug = fs.existsSync(path.join(ROOT, 'public', 'og', `${slug}.png`))
        ? slug
        : 'default';
    const ogImageUrl = `${BASE_URL}/og/${ogImageSlug}.png`;

    let changes = 0;

    // ── 1. Add og:image (if missing) ───────────────────────────
    if (!html.includes('og:image')) {
        // Insert after og:url or og:type or og:description
        const ogAnchor = html.match(/<meta property="og:(url|type|description)"[^>]*>/);
        if (ogAnchor) {
            const insertPoint = ogAnchor.index + ogAnchor[0].length;
            const ogImageTags = `
    <meta property="og:image" content="${ogImageUrl}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:type" content="image/png">`;
            html = html.slice(0, insertPoint) + ogImageTags + html.slice(insertPoint);
            changes++;
        }
    }

    // ── 2. Add twitter:image (if missing) ──────────────────────
    if (!html.includes('twitter:image')) {
        const twAnchor = html.match(/<meta name="twitter:(description|title|card)"[^>]*>/);
        if (twAnchor) {
            const insertPoint = twAnchor.index + twAnchor[0].length;
            const twImageTag = `\n    <meta name="twitter:image" content="${ogImageUrl}">`;
            html = html.slice(0, insertPoint) + twImageTag + html.slice(insertPoint);
            changes++;
        }
    }

    // ── 3. Replace favicon (inline SVG → real files) ───────────
    // Remove old inline SVG favicon
    const oldFaviconRe = /\s*<link rel="icon" href="data:image\/svg\+xml,[^"]*"[^>]*>\s*/g;
    if (oldFaviconRe.test(html)) {
        html = html.replace(oldFaviconRe, '\n');
        changes++;
    }

    // Add real favicon links if not present
    if (!html.includes('apple-touch-icon')) {
        // Insert after <meta charset> or at start of <head>
        const charsetMatch = html.match(/<meta charset="[^"]*">/i);
        if (charsetMatch) {
            const insertPoint = charsetMatch.index + charsetMatch[0].length;
            const faviconTags = `
    <link rel="icon" type="image/x-icon" href="./favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png">`;
            html = html.slice(0, insertPoint) + faviconTags + html.slice(insertPoint);
            changes++;
        }
    }

    // ── 4. Add hreflang tags (if missing) ──────────────────────
    if (!html.includes('hreflang')) {
        // Find canonical link to insert hreflangs nearby
        const canonicalMatch = html.match(/<link rel="canonical"[^>]*>/);
        if (canonicalMatch) {
            const insertPoint = canonicalMatch.index + canonicalMatch[0].length;
            const hreflangTags = `
    <link rel="alternate" hreflang="ca" href="${pageUrl}">
    <link rel="alternate" hreflang="es" href="${pageUrl}">
    <link rel="alternate" hreflang="en" href="${pageUrl}">
    <link rel="alternate" hreflang="x-default" href="${pageUrl}">`;
            html = html.slice(0, insertPoint) + hreflangTags + html.slice(insertPoint);
            changes++;
        }
    }

    // ── Write back ─────────────────────────────────────────────
    if (changes > 0) {
        fs.writeFileSync(filepath, html, 'utf-8');
        console.log(`  ✓ ${filename} (${changes} changes)`);
        modified++;
    } else {
        console.log(`  · ${filename} (no changes needed)`);
        skipped++;
    }
}

console.log(`\n✅ Done: ${modified} modified, ${skipped} skipped`);
