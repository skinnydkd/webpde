/**
 * PDE Build Script
 *
 * Transforms source HTML (JSX + Tailwind CDN) into production-ready files:
 *   1. Precompiles all <script type="text/babel"> blocks (inline + external)
 *   2. Removes Babel CDN script tag
 *   3. Replaces Tailwind CDN with a prebuilt pde.css
 *   4. Pins CDN versions & adds <link rel="preconnect">
 *   5. Outputs everything to dist/
 *
 * Usage: node scripts/build.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const babel = require('@babel/core');
const { minify: minifyHTML } = require('html-minifier-terser');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

// ── Config ─────────────────────────────────────────────────────
const BABEL_OPTIONS = {
    presets: [['@babel/preset-react', { runtime: 'classic' }]],
    filename: 'page.jsx', // hint for error messages
};

// CDN URLs to pin (source → replacement)
const CDN_PINS = [
    // Unpinned unpkg → pinned cdnjs (single CDN, faster)
    ['https://unpkg.com/react@18/umd/react.production.min.js',
     'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js'],
    ['https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
     'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js'],
    // prop-types (some pages)
    ['https://unpkg.com/prop-types@15/prop-types.min.js',
     'https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.8.1/prop-types.min.js'],
];

// Preconnect domains (added to <head>)
const PRECONNECTS = [
    'https://cdnjs.cloudflare.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
];

// Files to copy verbatim to dist/
const STATIC_FILES = [
    'robots.txt',
    'sitemap.xml',
    'pde-shared.js',
    '.gitignore',
];

// ── Helpers ────────────────────────────────────────────────────

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/**
 * Recursively copy a directory's contents to dest.
 * Preserves subdirectory structure (e.g. public/og/*.png → dist/og/*.png).
 */
function copyDirRecursive(srcDir, destDir) {
    const entries = fs.readdirSync(srcDir, { withFileTypes: true });
    let count = 0;
    for (const entry of entries) {
        const srcPath = path.join(srcDir, entry.name);
        const destPath = path.join(destDir, entry.name);
        if (entry.isDirectory()) {
            ensureDir(destPath);
            count += copyDirRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
            count++;
        }
    }
    console.log(`  ✓ ${path.relative(path.resolve(srcDir, '..'), srcDir)}/ (${count} files)`);
    return count;
}

function compileJSX(code, filename) {
    try {
        const result = babel.transformSync(code, {
            ...BABEL_OPTIONS,
            filename: filename || 'inline.jsx',
        });
        return result.code;
    } catch (err) {
        console.error(`  ✗ Babel error in ${filename}:`);
        console.error(`    ${err.message.split('\n')[0]}`);
        // Return original code so build doesn't break entirely
        return code;
    }
}

/**
 * Process an HTML file:
 *  - Compile inline <script type="text/babel"> blocks
 *  - Change external <script src="./X.js" type="text/babel"> → <script src="./X.js">
 *  - Remove Babel CDN tag
 *  - Replace Tailwind CDN with <link href="./pde.css">
 *  - Pin unpinned CDN versions
 *  - Add preconnects
 */
async function processHTML(srcPath, destPath) {
    let html = fs.readFileSync(srcPath, 'utf-8');
    const basename = path.basename(srcPath);
    const originalSize = Buffer.byteLength(html, 'utf-8');

    // 1. Remove Babel CDN (multiple patterns)
    html = html.replace(/\s*<script src="https:\/\/unpkg\.com\/@babel\/standalone\/babel\.min\.js"><\/script>\s*/g, '\n');
    html = html.replace(/\s*<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/babel-standalone\/[^"]+\/babel\.min\.js"><\/script>\s*/g, '\n');

    // 2. Replace Tailwind CDN with compiled CSS
    html = html.replace(
        /\s*<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>\s*/g,
        '\n    <link rel="stylesheet" href="./pde.css">\n'
    );

    // 3. Change external type="text/babel" to regular scripts
    html = html.replace(
        /<script src="(\.\/pde-(?:components|game-engine)\.js)" type="text\/babel"><\/script>/g,
        '<script src="$1"></script>'
    );

    // 4. Compile inline <script type="text/babel"> blocks
    const babelScriptRe = /<script type="text\/babel">([\s\S]*?)<\/script>/g;
    let match;
    let offset = 0;
    let processed = '';
    let lastIdx = 0;

    // Reset regex
    babelScriptRe.lastIndex = 0;
    while ((match = babelScriptRe.exec(html)) !== null) {
        const inlineJSX = match[1];
        const compiled = compileJSX(inlineJSX, `${basename}:inline`);
        processed += html.slice(lastIdx, match.index);
        processed += '<script>' + compiled + '</script>';
        lastIdx = match.index + match[0].length;
    }
    processed += html.slice(lastIdx);
    html = processed;

    // 5. Pin CDN versions
    for (const [from, to] of CDN_PINS) {
        html = html.split(from).join(to);
    }

    // 6. Add preconnects + preload critical resources after <meta charset>
    const preconnectTags = PRECONNECTS.map(
        url => `<link rel="preconnect" href="${url}" crossorigin>`
    ).join('\n');

    const preloadTags = [
        '<link rel="preload" href="./pde.css" as="style">',
        '<link rel="preload" href="./pde-shared.js" as="script">',
    ].join('\n');

    // Insert after <meta charset="UTF-8"> line
    html = html.replace(
        /(<meta charset="UTF-8">)/i,
        `$1\n${preconnectTags}\n${preloadTags}`
    );

    // 7. Minify HTML (collapse whitespace, remove comments, minify inline JS/CSS)
    let minified;
    try {
        minified = await minifyHTML(html, {
            collapseWhitespace: true,
            conservativeCollapse: true,     // keep at least 1 space
            removeComments: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            minifyCSS: true,
            minifyJS: {
                compress: { drop_console: false },
                mangle: false,              // don't rename variables (React refs)
            },
            processScripts: ['application/ld+json'],
        });
    } catch (err) {
        console.warn(`  ⚠ Minify failed for ${basename}, using unminified: ${err.message.slice(0, 80)}`);
    }

    // Only use minified version if it's actually smaller than the compiled
    // (pre-minify) output. Some text-heavy files grow due to terser escaping.
    const compiledSize = Buffer.byteLength(html, 'utf-8');
    const minifiedSize = minified ? Buffer.byteLength(minified, 'utf-8') : Infinity;
    const finalHtml = (minifiedSize < compiledSize) ? minified : html;
    const finalSize = Buffer.byteLength(finalHtml, 'utf-8');
    const saved = ((1 - finalSize / originalSize) * 100).toFixed(0);

    fs.writeFileSync(destPath, finalHtml, 'utf-8');
    console.log(`  ✓ ${basename} (${(originalSize/1024).toFixed(0)}K → ${(finalSize/1024).toFixed(0)}K, -${saved}%)`);
}

/**
 * Compile a shared .js file that contains JSX (type="text/babel")
 */
function compileSharedJS(filename) {
    const srcPath = path.join(ROOT, filename);
    const destPath = path.join(DIST, filename);

    if (!fs.existsSync(srcPath)) {
        console.warn(`  ⚠ ${filename} not found, skipping`);
        return;
    }

    const code = fs.readFileSync(srcPath, 'utf-8');
    const compiled = compileJSX(code, filename);
    fs.writeFileSync(destPath, compiled, 'utf-8');
    console.log(`  ✓ ${filename} (compiled)`);
}

/**
 * Build Tailwind CSS from all HTML source files.
 */
function buildTailwind() {
    const inputCSS = path.join(ROOT, 'src', 'input.css');
    const outputCSS = path.join(DIST, 'pde.css');

    if (!fs.existsSync(inputCSS)) {
        console.warn('  ⚠ src/input.css not found — creating minimal one');
        ensureDir(path.join(ROOT, 'src'));
        fs.writeFileSync(inputCSS, '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n');
    }

    try {
        execSync(
            `npx tailwindcss -i "${inputCSS}" -o "${outputCSS}" --minify`,
            { cwd: ROOT, stdio: 'pipe' }
        );
        const size = (fs.statSync(outputCSS).size / 1024).toFixed(1);
        console.log(`  ✓ pde.css (${size} KB)`);
    } catch (err) {
        console.error('  ✗ Tailwind build failed:', err.stderr?.toString().slice(0, 200));
    }
}

// ── Main ───────────────────────────────────────────────────────

async function main() {
    const start = Date.now();
    console.log('PDE Build — compiling JSX + Tailwind + Minify…\n');

    // Clean dist
    if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true });
    ensureDir(DIST);

    // 1. Compile shared JS files that contain JSX
    console.log('Shared JS:');
    compileSharedJS('pde-components.js');
    compileSharedJS('pde-game-engine.js');

    // 2. Copy static files
    console.log('\nStatic files:');
    for (const f of STATIC_FILES) {
        const src = path.join(ROOT, f);
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, path.join(DIST, f));
            console.log(`  ✓ ${f} (copied)`);
        }
    }

    // 3. Process + minify HTML files
    console.log('\nHTML pages:');
    const htmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
    for (const f of htmlFiles) {
        await processHTML(path.join(ROOT, f), path.join(DIST, f));
    }

    // 4. Build Tailwind CSS
    console.log('\nTailwind:');
    buildTailwind();

    // 5. Copy vercel.json to dist
    const vercelSrc = path.join(ROOT, 'vercel.json');
    if (fs.existsSync(vercelSrc)) {
        fs.copyFileSync(vercelSrc, path.join(DIST, 'vercel.json'));
        console.log('\n  ✓ vercel.json (copied)');
    }

    // 6. Copy public/ assets (favicons, og images, etc.)
    const publicDir = path.join(ROOT, 'public');
    if (fs.existsSync(publicDir)) {
        console.log('\nPublic assets:');
        copyDirRecursive(publicDir, DIST);
    }

    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`\n✅ Build complete in ${elapsed}s — output: dist/`);
}

main().catch(err => {
    console.error('Build failed:', err);
    process.exit(1);
});
