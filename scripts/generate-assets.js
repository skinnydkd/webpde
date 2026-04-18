/**
 * PDE Asset Generator
 *
 * Generates:
 *   1. og:image PNGs (1200×630) for each page — branded social cards
 *   2. Favicons: favicon.ico (multi-size), apple-touch-icon.png, favicon-32x32.png, favicon-16x16.png
 *
 * Usage: node scripts/generate-assets.js
 * Requires: sharp
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const OG_DIR = path.join(PUBLIC, 'og');

// ── Page definitions for OG images ─────────────────────────────
const PAGES = [
    // Main hub
    { slug: 'default',          emoji: '🎓', title: 'PDE',                           subtitle: 'Plataforma Didàctica Econòmica',       gradient: ['#ec4899', '#f43f5e'] },
    { slug: 'index',            emoji: '🎓', title: 'PDE',                           subtitle: 'Plataforma Didàctica Econòmica',       gradient: ['#ec4899', '#f43f5e'] },

    // Core educational pages
    { slug: 'economia',         emoji: '📊', title: 'Economia',                      subtitle: 'Guia Universitària Completa',           gradient: ['#ec4899', '#f43f5e'] },
    { slug: 'empresa',          emoji: '🏢', title: 'Empresa',                       subtitle: 'Gestió Empresarial Completa',           gradient: ['#f59e0b', '#f97316'] },
    { slug: 'finances',         emoji: '👛', title: 'Finances Personals',            subtitle: "Guia Completa d'Inversió",              gradient: ['#10b981', '#14b8a6'] },
    { slug: 'vidapractica',     emoji: '🏠', title: 'Vida Pràctica',                 subtitle: 'Educació Financera Quotidiana',         gradient: ['#8b5cf6', '#a855f7'] },
    { slug: 'ferramentes',      emoji: '🔧', title: 'Ferramentes',                   subtitle: 'Models Mentals i Decisió',              gradient: ['#64748b', '#71717a'] },
    { slug: 'recerca',          emoji: '📚', title: 'Recerca',                       subtitle: 'Papers, Llibres i Mètode Científic',    gradient: ['#6366f1', '#3b82f6'] },

    // Interactive / games
    { slug: 'playground',       emoji: '🎮', title: 'Playground',                    subtitle: "Aprèn Economia Jugant!",                gradient: ['#eab308', '#ec4899'] },
    { slug: 'concurs',          emoji: '🏆', title: 'Concurs PDE',                   subtitle: 'Quiz Competitiu amb Rànquing',          gradient: ['#eab308', '#f59e0b'] },

    // Multiplayer games
    { slug: 'stonks',           emoji: '📈', title: 'STONKS',                        subtitle: "Simulador d'Inversions Multiplayer",    gradient: ['#22c55e', '#16a34a'] },
    { slug: 'communist',        emoji: '☭',  title: 'Communist Party',               subtitle: "Joc d'Economia per Equips",             gradient: ['#ef4444', '#dc2626'] },
    { slug: 'econopoly',        emoji: '🏛️', title: 'Econopoly',                     subtitle: 'Monopoly Econòmic Educatiu',            gradient: ['#3b82f6', '#2563eb'] },
    { slug: 'econrisk',         emoji: '⚔️',  title: 'Systemic Risk',                subtitle: 'Escoles Econòmiques en Guerra',         gradient: ['#7c3aed', '#6d28d9'] },
    { slug: 'insider',          emoji: '🕵️', title: 'Insider Trading',               subtitle: 'Joc de Deducció Social',                gradient: ['#1e293b', '#334155'] },

    // Teaching
    { slug: 'professorat',      emoji: '👩‍🏫', title: 'Professorat',                   subtitle: 'Generador de SA i Proves',              gradient: ['#22c55e', '#059669'] },

    // Oposicions
    { slug: 'oposicions',       emoji: '🎯', title: 'Oposicions',                    subtitle: "Prepara les Teues Oposicions",          gradient: ['#f97316', '#ea580c'] },
    { slug: 'oposicions-bloc-a',emoji: '📖', title: "Bloc A",                        subtitle: "Fonaments d'Economia",                  gradient: ['#f97316', '#ea580c'] },
    { slug: 'oposicions-bloc-b',emoji: '📖', title: "Bloc B",                        subtitle: 'Microeconomia',                         gradient: ['#f97316', '#ea580c'] },
    { slug: 'oposicions-bloc-c',emoji: '📖', title: "Bloc C",                        subtitle: 'Macroeconomia',                         gradient: ['#f97316', '#ea580c'] },
    { slug: 'oposicions-bloc-d',emoji: '🌍', title: "Bloc D",                        subtitle: 'Economia Internacional',                gradient: ['#f97316', '#ea580c'] },
    { slug: 'oposicions-bloc-e',emoji: '🇪🇸', title: "Bloc E",                        subtitle: 'Economia Espanyola i Europea',          gradient: ['#f97316', '#ea580c'] },
    { slug: 'oposicions-bloc-f',emoji: '🏢', title: "Bloc F",                        subtitle: "Economia de l'Empresa",                 gradient: ['#f97316', '#ea580c'] },
    { slug: 'oposicions-bloc-g',emoji: '💹', title: "Bloc G",                        subtitle: 'Sistema Financer',                      gradient: ['#f97316', '#ea580c'] },
    { slug: 'oposicions-bloc-h',emoji: '📒', title: "Bloc H",                        subtitle: 'Comptabilitat',                         gradient: ['#f97316', '#ea580c'] },
    { slug: 'oposicions-practica',emoji:'🧮', title: "Supòsits Pràctics",            subtitle: '25 Exercicis Resolts',                  gradient: ['#f97316', '#ea580c'] },

    // Curriculum pages
    { slug: 'economia-4eso',    emoji: '📈', title: "Economia 4t ESO",               subtitle: "Curs d'Economia per a 4t d'ESO",       gradient: ['#0ea5e9', '#0284c7'] },
    { slug: 'economia-1bach',   emoji: '📈', title: "Economia 1r BATX",              subtitle: "Curs d'Economia per a 1r Batxillerat",  gradient: ['#0ea5e9', '#0284c7'] },
    { slug: 'edmn-2bach',       emoji: '💼', title: "EDMN 2n BATX",                  subtitle: "Empresa i Disseny de Models de Negoci", gradient: ['#0ea5e9', '#0284c7'] },
    { slug: 'fopp-4eso',        emoji: '🧭', title: "FOPP 4t ESO",                   subtitle: "Formació i Orientació Personal",        gradient: ['#0ea5e9', '#0284c7'] },
];

// ── SVG Template ───────────────────────────────────────────────
function createOGImageSVG(page) {
    const [color1, color2] = page.gradient;

    return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="overlay" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#000;stop-opacity:0" />
      <stop offset="100%" style="stop-color:#000;stop-opacity:0.3" />
    </linearGradient>
  </defs>

  <!-- Background gradient -->
  <rect width="1200" height="630" fill="url(#bg)" rx="0"/>
  <rect width="1200" height="630" fill="url(#overlay)" rx="0"/>

  <!-- Decorative circles -->
  <circle cx="100" cy="530" r="200" fill="white" opacity="0.06"/>
  <circle cx="1100" cy="100" r="250" fill="white" opacity="0.06"/>
  <circle cx="600" cy="630" r="300" fill="white" opacity="0.04"/>

  <!-- Small decorative dots pattern -->
  <circle cx="150" cy="80" r="4" fill="white" opacity="0.15"/>
  <circle cx="200" cy="120" r="3" fill="white" opacity="0.1"/>
  <circle cx="1050" cy="500" r="5" fill="white" opacity="0.12"/>
  <circle cx="980" cy="550" r="3" fill="white" opacity="0.08"/>

  <!-- White card area -->
  <rect x="60" y="60" width="1080" height="510" rx="32" fill="white" opacity="0.12"/>

  <!-- Title -->
  <text x="600" y="260" font-family="'Plus Jakarta Sans', 'Segoe UI', -apple-system, sans-serif" font-size="80" font-weight="900" fill="white" text-anchor="middle" letter-spacing="-2">${escapeXml(page.title)}</text>

  <!-- Subtitle -->
  <text x="600" y="340" font-family="'Plus Jakarta Sans', 'Segoe UI', -apple-system, sans-serif" font-size="32" font-weight="500" fill="white" text-anchor="middle" opacity="0.9">${escapeXml(page.subtitle)}</text>

  <!-- Bottom branding bar -->
  <rect x="60" y="470" width="1080" height="100" rx="0" ry="0" fill="white" opacity="0.15"/>
  <text x="120" y="535" font-family="'Plus Jakarta Sans', 'Segoe UI', -apple-system, sans-serif" font-size="28" font-weight="900" fill="white" letter-spacing="-1">🎓 PDE</text>
  <text x="1080" y="535" font-family="'Plus Jakarta Sans', 'Segoe UI', -apple-system, sans-serif" font-size="22" font-weight="500" fill="white" text-anchor="end" opacity="0.8">profedeeconomia.es</text>

  <!-- Decorative line -->
  <rect x="530" y="370" width="140" height="4" rx="2" fill="white" opacity="0.4"/>
</svg>`;
}

function escapeXml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

// ── Favicon SVG ────────────────────────────────────────────────
function createFaviconSVG(size) {
    return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ec4899;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f43f5e;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.2)}" fill="url(#fbg)"/>
  <text x="${size / 2}" y="${size * 0.72}" font-family="'Segoe UI', Arial, sans-serif" font-size="${Math.round(size * 0.55)}" font-weight="900" fill="white" text-anchor="middle">P</text>
</svg>`;
}

// ── Main ───────────────────────────────────────────────────────
async function main() {
    console.log('PDE Asset Generator\n');

    // Ensure directories
    if (!fs.existsSync(PUBLIC)) fs.mkdirSync(PUBLIC, { recursive: true });
    if (!fs.existsSync(OG_DIR)) fs.mkdirSync(OG_DIR, { recursive: true });

    // 1. Generate OG images
    console.log('OG Images (1200×630):');
    for (const page of PAGES) {
        const svg = createOGImageSVG(page);
        const outputPath = path.join(OG_DIR, `${page.slug}.png`);

        await sharp(Buffer.from(svg))
            .png({ quality: 90, compressionLevel: 9 })
            .toFile(outputPath);

        const size = (fs.statSync(outputPath).size / 1024).toFixed(1);
        console.log(`  ✓ ${page.slug}.png (${size} KB)`);
    }

    // 2. Generate favicons
    console.log('\nFavicons:');

    // apple-touch-icon (180x180)
    const appleSVG = createFaviconSVG(180);
    await sharp(Buffer.from(appleSVG))
        .png()
        .toFile(path.join(PUBLIC, 'apple-touch-icon.png'));
    console.log('  ✓ apple-touch-icon.png (180×180)');

    // favicon-32x32
    const fav32SVG = createFaviconSVG(32);
    await sharp(Buffer.from(fav32SVG))
        .png()
        .toFile(path.join(PUBLIC, 'favicon-32x32.png'));
    console.log('  ✓ favicon-32x32.png (32×32)');

    // favicon-16x16
    const fav16SVG = createFaviconSVG(16);
    await sharp(Buffer.from(fav16SVG))
        .png()
        .toFile(path.join(PUBLIC, 'favicon-16x16.png'));
    console.log('  ✓ favicon-16x16.png (16×16)');

    // favicon.ico (multi-size ICO from 32px PNG)
    // ICO format: use 32x32 PNG as the primary
    const fav32Buf = await sharp(Buffer.from(fav32SVG)).png().toBuffer();
    const fav16Buf = await sharp(Buffer.from(fav16SVG)).png().toBuffer();

    // Create ICO file (simple single-image ICO)
    const icoBuffer = createICO(fav32Buf, 32);
    fs.writeFileSync(path.join(PUBLIC, 'favicon.ico'), icoBuffer);
    console.log('  ✓ favicon.ico (32×32)');

    console.log('\n✅ All assets generated in public/');
}

/**
 * Create a minimal ICO file from a single PNG buffer.
 * ICO format: header + directory entry + PNG data
 */
function createICO(pngBuffer, size) {
    // ICO Header (6 bytes)
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0);     // Reserved
    header.writeUInt16LE(1, 2);     // ICO type
    header.writeUInt16LE(1, 4);     // Number of images

    // Directory entry (16 bytes)
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0);  // Width
    entry.writeUInt8(size === 256 ? 0 : size, 1);  // Height
    entry.writeUInt8(0, 2);                          // Color palette
    entry.writeUInt8(0, 3);                          // Reserved
    entry.writeUInt16LE(1, 4);                       // Color planes
    entry.writeUInt16LE(32, 6);                      // Bits per pixel
    entry.writeUInt32LE(pngBuffer.length, 8);        // Size of PNG data
    entry.writeUInt32LE(22, 12);                     // Offset (6 + 16 = 22)

    return Buffer.concat([header, entry, pngBuffer]);
}

main().catch(err => {
    console.error('Build failed:', err);
    process.exit(1);
});
