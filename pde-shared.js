/**
 * PDE Shared — Global constants, translation helpers, and utilities
 * Loaded by all pages BEFORE the Babel script block.
 * Pure JavaScript — no JSX, no React dependency.
 */

// ─── Configuration ───────────────────────────────────────────────
var PDE_CONFIG = {
    name: 'PDE',
    fullName: 'Plataforma Didàctica Econòmica',
    year: 2025,
    version: '2.0',
    url: 'https://profedeeconomia.es',
    defaultLang: 'val',
    supportedLangs: ['val', 'es', 'en'],
    langLabels: { val: 'VAL', es: 'ES', en: 'EN' },
};

// ─── Navigation — App definitions ────────────────────────────────
var PDE_NAV = [
    { id: 'economia',     href: './economia.html',     emoji: '📈', gradient: 'from-pink-500 to-rose-500' },
    { id: 'empresa',      href: './empresa.html',      emoji: '🏢', gradient: 'from-amber-500 to-orange-500' },
    { id: 'finances',     href: './finances.html',      emoji: '👛', gradient: 'from-emerald-500 to-teal-500' },
    { id: 'vidapractica', href: './vidapractica.html',  emoji: '🏠', gradient: 'from-violet-500 to-purple-500' },
    { id: 'ferramentes',  href: './ferramentes.html',   emoji: '🔧', gradient: 'from-slate-500 to-zinc-600' },
    { id: 'recerca',      href: './recerca.html',       emoji: '📚', gradient: 'from-indigo-500 to-blue-500' },
    { id: 'playground',   href: './playground.html',    emoji: '🎮', gradient: 'from-yellow-400 via-pink-500 to-purple-500', immersive: true },
    { id: 'concurs',      href: './concurs.html',       emoji: '🏆', gradient: 'from-yellow-400 to-amber-500', immersive: true },
];

// ─── Shared Translations (header, footer, nav, common UI) ───────
var PDE_SHARED_TRANSLATIONS = {
    // App names (used in cross-app nav)
    'nav.home':         { val: 'Inici',                   es: 'Inicio',               en: 'Home' },
    'nav.economia':     { val: 'Economia',                es: 'Economía',              en: 'Economics' },
    'nav.empresa':      { val: 'Empresa',                 es: 'Empresa',               en: 'Business' },
    'nav.finances':     { val: 'Finances',                es: 'Finanzas',              en: 'Finance' },
    'nav.vidapractica': { val: 'Vida Pràctica',           es: 'Vida Práctica',         en: 'Practical Life' },
    'nav.ferramentes':  { val: 'Ferramentes',             es: 'Herramientas',          en: 'Tools' },
    'nav.recerca':      { val: 'Recerca',                 es: 'Investigación',         en: 'Research' },
    'nav.playground':   { val: 'Playground',              es: 'Playground',            en: 'Playground' },
    'nav.concurs':      { val: 'Concurs',                 es: 'Concurso',              en: 'Contest' },

    // Header
    'header.moreApps':  { val: 'Més apps',                es: 'Más apps',              en: 'More apps' },
    'header.menu':      { val: 'Menú',                    es: 'Menú',                  en: 'Menu' },

    // Footer
    'footer.madeBy':    { val: 'Fet amb ❤️ per Pau',      es: 'Hecho con ❤️ por Pau',  en: 'Made with ❤️ by Pau' },
    'footer.backHome':  { val: '🏠 Tornar a l\'inici',    es: '🏠 Volver al inicio',   en: '🏠 Back to home' },

    // Scroll to top
    'scrollTop':        { val: 'Pujar',                   es: 'Subir',                 en: 'Top' },

    // Language
    'lang.val': { val: 'Valencià', es: 'Valenciano', en: 'Valencian' },
    'lang.es':  { val: 'Castellà', es: 'Castellano', en: 'Spanish' },
    'lang.en':  { val: 'Anglès',   es: 'Inglés',     en: 'English' },

    // Prev/Next
    'nav.prev':   { val: '← Anterior', es: '← Anterior', en: '← Previous' },
    'nav.next':   { val: 'Següent →',  es: 'Siguiente →', en: 'Next →' },
};

// ─── Language Store (localStorage persistence) ──────────────────
var PdeLanguageStore = {
    KEY: 'pde_idioma',

    get: function() {
        try {
            var lang = localStorage.getItem(this.KEY);
            return PDE_CONFIG.supportedLangs.includes(lang) ? lang : PDE_CONFIG.defaultLang;
        } catch (e) {
            return PDE_CONFIG.defaultLang;
        }
    },

    set: function(lang) {
        try {
            if (PDE_CONFIG.supportedLangs.includes(lang)) {
                localStorage.setItem(this.KEY, lang);
            }
        } catch (e) {
            // localStorage not available (private browsing, etc.)
        }
    },
};

// ─── Translation Factory ────────────────────────────────────────
/**
 * Creates a translator function for a page.
 * Merges page-specific translations with shared translations.
 *
 * @param {Object} pageTranslations - Page-specific translations object
 * @param {string} idioma - Current language ('val', 'es', 'en')
 * @returns {Function} t(key) - Translation function
 *
 * Usage:
 *   const t = createTranslator(translations, idioma);
 *   t('title')        // simple key
 *   t('nav.home')     // shared key (looked up in PDE_SHARED_TRANSLATIONS)
 */
function createTranslator(pageTranslations, idioma) {
    return function t(key) {
        // 1. Try page translations first (flat key)
        if (pageTranslations[key]) {
            return pageTranslations[key][idioma] || pageTranslations[key]['val'] || key;
        }

        // 2. Try shared translations
        if (PDE_SHARED_TRANSLATIONS[key]) {
            return PDE_SHARED_TRANSLATIONS[key][idioma] || PDE_SHARED_TRANSLATIONS[key]['val'] || key;
        }

        // 3. Try dot-notation in page translations
        var parts = key.split('.');
        var val = pageTranslations;
        for (var i = 0; i < parts.length; i++) {
            val = val && val[parts[i]];
            if (!val) break;
        }
        if (val && val[idioma] !== undefined) {
            return val[idioma] || val['val'] || key;
        }

        // 4. Fallback: return key
        return key;
    };
}

// ─── Unified CSS Styles ─────────────────────────────────────────
var PDE_STYLES = {
    // Header
    header: 'sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm',
    headerContainer: 'max-w-7xl mx-auto px-4 py-3 flex items-center justify-between',

    // Footer
    footer: 'py-6 text-center text-sm text-gray-400 border-t border-gray-100 mt-8',

    // Language selector
    langGroup: 'flex items-center gap-1 bg-gray-100 rounded-lg p-1',
    langActive: 'px-2.5 py-1 rounded-md text-xs font-bold bg-pink-500 text-white transition-all',
    langInactive: 'px-2.5 py-1 rounded-md text-xs font-bold text-gray-500 hover:bg-gray-200 transition-all cursor-pointer',

    // Scrollbar (inject into <style>)
    scrollbarCSS: [
        '* { scrollbar-width: thin; scrollbar-color: #ec4899 #fdf2f8; }',
        '::-webkit-scrollbar { width: 6px; }',
        '::-webkit-scrollbar-track { background: #fdf2f8; }',
        '::-webkit-scrollbar-thumb { background-color: #ec4899; border-radius: 3px; }',
    ].join('\n'),

    // Font (inject into <style>)
    fontCSS: "* { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }",

    // Cross-app nav dropdown
    navLink: 'flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-pink-600 hover:bg-pink-50 transition-all',
    navLinkActive: 'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-pink-600 bg-pink-50',

    // Mobile menu
    mobileMenu: 'grid grid-cols-3 gap-2 p-4 bg-white border-b border-gray-100 shadow-md',
    mobileMenuItem: 'flex flex-col items-center gap-1 p-3 rounded-xl text-center transition-all',
    mobileMenuItemActive: 'bg-pink-100 text-pink-700',
    mobileMenuItemInactive: 'bg-gray-50 text-gray-600 hover:bg-gray-100',

    // Scroll-to-top button
    scrollTopBtn: 'fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-pink-500 text-white shadow-lg shadow-pink-500/30 flex items-center justify-center hover:bg-pink-600 hover:scale-110 transition-all cursor-pointer',

    // Prev/Next navigation
    prevNextContainer: 'flex justify-between items-center mt-12 pt-6 border-t border-gray-200',
    prevNextBtn: 'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 bg-gray-50 hover:bg-pink-50 hover:text-pink-600 transition-all',
};

// ─── Utilities ──────────────────────────────────────────────────
/**
 * Smooth scroll to top of the page.
 */
function pdeScrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Returns the current app ID based on the filename in the URL.
 * E.g., "economia.html" → "economia", "index.html" → "index"
 */
function pdeCurrentApp() {
    var path = window.location.pathname;
    var filename = path.split('/').pop() || 'index.html';
    return filename.replace('.html', '') || 'index';
}

/**
 * Deep link: read section from URL hash.
 * Returns the hash without '#', or null if no hash.
 */
function pdeGetHashSection() {
    var hash = window.location.hash;
    return hash ? hash.slice(1) : null;
}

/**
 * Deep link: update URL hash without triggering scroll.
 */
function pdeSetHashSection(section) {
    if (section && section !== 'inicio') {
        history.replaceState(null, '', '#' + section);
    } else {
        history.replaceState(null, '', window.location.pathname);
    }
}
