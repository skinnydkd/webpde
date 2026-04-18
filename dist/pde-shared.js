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
    { id: 'economia',     href: './economia',     emoji: '📈', gradient: 'from-pink-500 to-rose-500' },
    { id: 'empresa',      href: './empresa',      emoji: '🏢', gradient: 'from-amber-500 to-orange-500' },
    { id: 'finances',     href: './finances',      emoji: '👛', gradient: 'from-emerald-500 to-teal-500' },
    { id: 'vidapractica', href: './vidapractica',  emoji: '🏠', gradient: 'from-violet-500 to-purple-500' },
    { id: 'ferramentes',  href: './ferramentes',   emoji: '🔧', gradient: 'from-slate-500 to-zinc-600' },
    { id: 'recerca',      href: './recerca',       emoji: '📚', gradient: 'from-indigo-500 to-blue-500' },
    { id: 'playground',   href: './playground',    emoji: '🎮', gradient: 'from-yellow-400 via-pink-500 to-purple-500', immersive: true },
    { id: 'concurs',      href: './concurs',       emoji: '🏆', gradient: 'from-yellow-400 to-amber-500', immersive: true },
    { id: 'professorat', href: './professorat',   emoji: '👩‍🏫', gradient: 'from-green-500 to-emerald-600' },
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
    'nav.professorat':  { val: 'Professorat',             es: 'Profesorado',           en: 'Teachers' },

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

    // Dark mode
    'theme.light':  { val: '☀️ Clar',     es: '☀️ Claro',    en: '☀️ Light' },
    'theme.dark':   { val: '🌙 Fosc',     es: '🌙 Oscuro',   en: '🌙 Dark' },
    'theme.toggle': { val: 'Canviar tema', es: 'Cambiar tema', en: 'Toggle theme' },

    // Search
    'search.placeholder': { val: 'Buscar contingut...',  es: 'Buscar contenido...',  en: 'Search content...' },
    'search.noResults':   { val: 'Cap resultat trobat',  es: 'Sin resultados',       en: 'No results found' },
    'search.results':     { val: 'resultats',            es: 'resultados',           en: 'results' },
    'search.open':        { val: 'Buscar',               es: 'Buscar',               en: 'Search' },

    // Progress
    'progress.title':     { val: 'Progrés',              es: 'Progreso',             en: 'Progress' },
    'progress.completed': { val: 'Completat',            es: 'Completado',           en: 'Completed' },
    'progress.reset':     { val: 'Reiniciar progrés',    es: 'Reiniciar progreso',   en: 'Reset progress' },

    // Print
    'print.button':       { val: '🖨️ Imprimir',          es: '🖨️ Imprimir',          en: '🖨️ Print' },
};

// ─── Language Store (localStorage persistence + reactive pub/sub) ──
// Emits 'pde:languagechange' window event whenever set() is called.
// Also listens to cross-tab 'storage' events and re-emits as 'pde:languagechange'.
var PdeLanguageStore = {
    KEY: 'pde_idioma',
    EVENT: 'pde:languagechange',

    get: function() {
        try {
            const lang = localStorage.getItem(this.KEY);
            return PDE_CONFIG.supportedLangs.includes(lang) ? lang : PDE_CONFIG.defaultLang;
        } catch (e) {
            return PDE_CONFIG.defaultLang;
        }
    },

    // Map internal lang codes to BCP 47 tags for <html lang>
    LANG_MAP: { val: 'ca', es: 'es', en: 'en' },

    set: function(lang) {
        if (!PDE_CONFIG.supportedLangs.includes(lang)) return;
        try {
            localStorage.setItem(this.KEY, lang);
        } catch (e) {
            // localStorage not available (private browsing, etc.)
        }
        // Update <html lang> for screen readers and browser heuristics
        try {
            document.documentElement.lang = this.LANG_MAP[lang] || lang;
        } catch (e) {}
        // Always broadcast, even if localStorage failed — UI should still react.
        try {
            window.dispatchEvent(new CustomEvent(this.EVENT, { detail: { lang: lang } }));
        } catch (e) {
            // CustomEvent not supported (very old browsers)
        }
    },

    /**
     * Subscribe to language changes (same-tab AND cross-tab).
     * @param {(lang: string) => void} callback
     * @returns {() => void} Unsubscribe function.
     */
    subscribe: function(callback) {
        const self = this;
        function onCustom(e) {
            callback((e && e.detail && e.detail.lang) || self.get());
        }
        function onStorage(e) {
            if (e && e.key === self.KEY) callback(self.get());
        }
        window.addEventListener(this.EVENT, onCustom);
        window.addEventListener('storage', onStorage);
        return function unsubscribe() {
            window.removeEventListener(self.EVENT, onCustom);
            window.removeEventListener('storage', onStorage);
        };
    },
};

// Sync <html lang> on initial load (matches stored language preference)
try {
    const _initLang = PdeLanguageStore.get();
    document.documentElement.lang = PdeLanguageStore.LANG_MAP[_initLang] || _initLang;
} catch (e) {}

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
        const parts = key.split('.');
        let val = pageTranslations;
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

// ─── Dark Mode Store (localStorage + reactive pub/sub) ──────────
// Same pattern as PdeLanguageStore. Emits 'pde:themechange' event.
var PdeThemeStore = {
    KEY: 'pde_theme',
    EVENT: 'pde:themechange',

    get: function() {
        try {
            const theme = localStorage.getItem(this.KEY);
            if (theme === 'dark' || theme === 'light') return theme;
            // Auto-detect system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
            return 'light';
        } catch (e) {
            return 'light';
        }
    },

    set: function(theme) {
        if (theme !== 'dark' && theme !== 'light') return;
        try { localStorage.setItem(this.KEY, theme); } catch (e) {}
        this._apply(theme);
        try {
            window.dispatchEvent(new CustomEvent(this.EVENT, { detail: { theme: theme } }));
        } catch (e) {}
    },

    toggle: function() {
        this.set(this.get() === 'dark' ? 'light' : 'dark');
    },

    _apply: function(theme) {
        try {
            const cl = document.documentElement.classList;
            if (theme === 'dark') { cl.add('dark'); } else { cl.remove('dark'); }
        } catch (e) {}
    },

    subscribe: function(callback) {
        const self = this;
        function onCustom(e) {
            callback((e && e.detail && e.detail.theme) || self.get());
        }
        function onStorage(e) {
            if (e && e.key === self.KEY) {
                self._apply(self.get());
                callback(self.get());
            }
        }
        window.addEventListener(this.EVENT, onCustom);
        window.addEventListener('storage', onStorage);
        return function() {
            window.removeEventListener(self.EVENT, onCustom);
            window.removeEventListener('storage', onStorage);
        };
    },
};

// Apply dark mode on initial load (before React renders to avoid flash)
try { PdeThemeStore._apply(PdeThemeStore.get()); } catch (e) {}

// Listen to system theme changes
try {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // Only auto-switch if user hasn't set a manual preference
        try {
            if (!localStorage.getItem(PdeThemeStore.KEY)) {
                PdeThemeStore._apply(e.matches ? 'dark' : 'light');
                window.dispatchEvent(new CustomEvent(PdeThemeStore.EVENT, {
                    detail: { theme: e.matches ? 'dark' : 'light' }
                }));
            }
        } catch (err) {}
    });
} catch (e) {}

// ─── Progress Store (section completion tracking) ───────────────
// Tracks which sections a user has visited/completed per page.
var PdeProgressStore = {
    KEY: 'pde_progress',

    _getAll: function() {
        try {
            return JSON.parse(localStorage.getItem(this.KEY)) || {};
        } catch (e) { return {}; }
    },

    /** Get completed sections for a page. Returns array of section IDs. */
    get: function(pageId) {
        const all = this._getAll();
        return all[pageId] || [];
    },

    /** Mark a section as completed for a page. */
    markCompleted: function(pageId, sectionId) {
        const all = this._getAll();
        if (!all[pageId]) all[pageId] = [];
        if (!all[pageId].includes(sectionId)) {
            all[pageId].push(sectionId);
            try { localStorage.setItem(this.KEY, JSON.stringify(all)); } catch (e) {}
        }
    },

    /** Get completion percentage for a page (0-100). */
    getPercent: function(pageId, totalSections) {
        if (!totalSections) return 0;
        return Math.round((this.get(pageId).length / totalSections) * 100);
    },

    /** Reset progress for a page. */
    reset: function(pageId) {
        const all = this._getAll();
        delete all[pageId];
        try { localStorage.setItem(this.KEY, JSON.stringify(all)); } catch (e) {}
    },
};

// ─── Unified CSS Styles ─────────────────────────────────────────
var PDE_STYLES = {
    // Header
    header: 'sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 shadow-sm',
    headerContainer: 'max-w-7xl mx-auto px-4 py-3 flex items-center justify-between',

    // Footer
    footer: 'py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 mt-8',

    // Language selector
    langGroup: 'flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1',
    langActive: 'px-2.5 py-1 rounded-md text-xs font-bold bg-pink-500 text-white transition-all',
    langInactive: 'px-2.5 py-1 rounded-md text-xs font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer',

    // Scrollbar (inject into <style>)
    scrollbarCSS: [
        '* { scrollbar-width: thin; scrollbar-color: #ec4899 #fdf2f8; }',
        '::-webkit-scrollbar { width: 6px; }',
        '::-webkit-scrollbar-track { background: #fdf2f8; }',
        '::-webkit-scrollbar-thumb { background-color: #ec4899; border-radius: 3px; }',
        '.dark * { scrollbar-color: #ec4899 #1f2937; }',
        '.dark ::-webkit-scrollbar-track { background: #1f2937; }',
    ].join('\n'),

    // Font (inject into <style>)
    fontCSS: "* { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }",

    // Dark mode base (inject into <style>)
    darkCSS: [
        '.dark { color-scheme: dark; }',
        '.dark body { background: #111827 !important; color: #e5e7eb; }',
        '.dark .bg-gradient-to-br { background: #111827 !important; }',
        '@media print { .dark body { background: white !important; color: black !important; } }',
    ].join('\n'),

    // Print styles (inject into <style>)
    printCSS: [
        '@media print {',
        '  body { background: white !important; color: black !important; font-size: 12pt; }',
        '  header, footer, .pde-no-print, button, nav { display: none !important; }',
        '  .pde-print-only { display: block !important; }',
        '  a { color: black !important; text-decoration: underline; }',
        '  a[href]:after { content: " (" attr(href) ")"; font-size: 0.8em; color: #666; }',
        '  a[href^="#"]:after, a[href^="javascript"]:after { content: ""; }',
        '  h1, h2, h3, h4 { page-break-after: avoid; color: black !important; }',
        '  pre, blockquote, table, figure { page-break-inside: avoid; }',
        '  img { max-width: 100% !important; }',
        '  .max-w-7xl, .max-w-6xl, .max-w-5xl, .max-w-4xl, .max-w-3xl { max-width: 100% !important; }',
        '  * { box-shadow: none !important; }',
        '}',
    ].join('\n'),

    // Cross-app nav dropdown
    navLink: 'flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/30 transition-all',
    navLinkActive: 'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-pink-600 bg-pink-50 dark:bg-pink-900/30',

    // Mobile menu
    mobileMenu: 'grid grid-cols-3 gap-2 p-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-md',
    mobileMenuItem: 'flex flex-col items-center gap-1 p-3 rounded-xl text-center transition-all',
    mobileMenuItemActive: 'bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300',
    mobileMenuItemInactive: 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',

    // Scroll-to-top button
    scrollTopBtn: 'fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-pink-500 text-white shadow-lg shadow-pink-500/30 flex items-center justify-center hover:bg-pink-600 hover:scale-110 transition-all cursor-pointer pde-no-print',

    // Prev/Next navigation
    prevNextContainer: 'flex justify-between items-center mt-12 pt-6 border-t border-gray-200 dark:border-gray-700',
    prevNextBtn: 'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:bg-pink-50 dark:hover:bg-pink-900/30 hover:text-pink-600 transition-all',
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
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    return filename.replace('.html', '') || 'index';
}

/**
 * Deep link: read section from URL hash.
 * Returns the hash without '#', or null if no hash.
 */
function pdeGetHashSection() {
    const hash = window.location.hash;
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
