/**
 * PDE Dark Mode + Print CSS Injector
 *
 * Adds dark mode and print-friendly CSS to all HTML files.
 * Injects after the existing scrollbar CSS block.
 *
 * Usage: node scripts/inject-dark-print.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const DARK_PRINT_CSS = `
        /* Dark mode */
        .dark { color-scheme: dark; }
        .dark body { background: #111827 !important; color: #e5e7eb; }
        .dark .bg-gradient-to-br { background: #111827 !important; }
        .dark * { scrollbar-color: #ec4899 #1f2937; }
        .dark ::-webkit-scrollbar-track { background: #1f2937; }

        /* Print */
        @media print {
            body { background: white !important; color: black !important; font-size: 12pt; }
            .dark body { background: white !important; color: black !important; }
            header, footer, .pde-no-print, nav { display: none !important; }
            .pde-print-only { display: block !important; }
            a { color: black !important; text-decoration: underline; }
            h1, h2, h3, h4 { page-break-after: avoid; color: black !important; }
            pre, blockquote, table, figure { page-break-inside: avoid; }
            img { max-width: 100% !important; }
            .max-w-7xl, .max-w-6xl, .max-w-5xl, .max-w-4xl, .max-w-3xl { max-width: 100% !important; }
            * { box-shadow: none !important; text-shadow: none !important; }
        }`;

const htmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
let modified = 0;

for (const filename of htmlFiles) {
    const filepath = path.join(ROOT, filename);
    let html = fs.readFileSync(filepath, 'utf-8');

    // Skip if already injected
    if (html.includes('color-scheme: dark')) {
        console.log(`  · ${filename} (already has dark mode)`);
        continue;
    }

    // Find the scrollbar CSS block (any color variant) and inject after it
    const scrollbarMatch = html.match(/::-webkit-scrollbar-thumb\s*\{[^}]+\}/);
    if (!scrollbarMatch) {
        // Fallback: inject before </style> tag
        const styleEnd = html.indexOf('</style>');
        if (styleEnd === -1) {
            console.log(`  ⚠ ${filename} (no <style> found)`);
            continue;
        }
        html = html.slice(0, styleEnd) + DARK_PRINT_CSS + '\n    ' + html.slice(styleEnd);
        fs.writeFileSync(filepath, html, 'utf-8');
        console.log(`  ✓ ${filename} (injected before </style>)`);
        modified++;
        continue;
    }

    const scrollbarEnd = scrollbarMatch.index + scrollbarMatch[0].length;
    const lineEnd = html.indexOf('\n', scrollbarEnd);
    if (lineEnd === -1) continue;

    html = html.slice(0, lineEnd) + DARK_PRINT_CSS + html.slice(lineEnd);

    fs.writeFileSync(filepath, html, 'utf-8');
    console.log(`  ✓ ${filename}`);
    modified++;
}

console.log(`\n✅ Done: ${modified} files modified`);
