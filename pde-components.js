/**
 * PDE Shared Components — React components used across all pages.
 * Loaded with type="text/babel" AFTER pde-shared.js.
 * Requires: React 18, pde-shared.js globals (PDE_CONFIG, PDE_NAV, PDE_STYLES, etc.)
 */

const { useState: _useState, useEffect: _useEffect, useCallback: _useCallback } = React;

// ─── usePdeIdioma Hook ──────────────────────────────────────────
/**
 * Unified language hook. Reads from PdeLanguageStore and auto-updates
 * whenever the language changes (same-tab or cross-tab).
 *
 * Returns [idioma, setIdioma]. setIdioma persists to localStorage AND
 * broadcasts to all other subscribers in this tab/session.
 *
 * Usage:
 *   const [idioma, setIdioma] = usePdeIdioma();
 *   <PdeHeader idioma={idioma} setIdioma={setIdioma} .../>
 */
function usePdeIdioma() {
    const [idioma, setIdiomaState] = _useState(function() { return PdeLanguageStore.get(); });

    _useEffect(function() {
        // Sync with any language change from any source (other selectors, other tabs).
        const unsubscribe = PdeLanguageStore.subscribe(function(lang) {
            setIdiomaState(function(prev) { return prev === lang ? prev : lang; });
        });
        return unsubscribe;
    }, []);

    const setIdioma = _useCallback(function(lang) {
        // Single call: .set() persists AND broadcasts. All subscribers update.
        PdeLanguageStore.set(lang);
    }, []);

    return [idioma, setIdioma];
}

// ─── Language Selector ──────────────────────────────────────────
/**
 * Unified language selector (VAL / ES / EN).
 * @param {{ idioma: string, setIdioma: Function }} props
 *
 * The setIdioma callback receives the new language. Callers may either:
 *  - Use usePdeIdioma() (recommended) — setIdioma auto-broadcasts via the store.
 *  - Pass a raw useState setter — this component still writes to the store,
 *    so other subscribers stay in sync.
 */
function PdeLanguageSelector({ idioma, setIdioma }) {
    const handleChange = _useCallback(function(lang) {
        if (!PDE_CONFIG.supportedLangs.includes(lang)) return;
        // Persist + broadcast. Must run BEFORE setIdioma so that if the caller's
        // setIdioma triggers a re-render + unmount, the store update still fires.
        PdeLanguageStore.set(lang);
        if (typeof setIdioma === 'function') setIdioma(lang);
    }, [setIdioma]);

    return (
        <div className={PDE_STYLES.langGroup}>
            {PDE_CONFIG.supportedLangs.map(function(lang) {
                return (
                    <button
                        key={lang}
                        onClick={function() { handleChange(lang); }}
                        className={idioma === lang ? PDE_STYLES.langActive : PDE_STYLES.langInactive}
                        title={PDE_SHARED_TRANSLATIONS['lang.' + lang]?.[idioma] || lang}
                    >
                        {PDE_CONFIG.langLabels[lang]}
                    </button>
                );
            })}
        </div>
    );
}

// ─── Cross-App Navigation Dropdown ──────────────────────────────
/**
 * Dropdown showing all PDE apps for cross-navigation.
 * @param {{ idioma: string, currentApp: string }} props
 */
function PdeCrossNav({ idioma, currentApp }) {
    const [open, setOpen] = _useState(false);

    const t = createTranslator({}, idioma);

    return (
        <div className="relative"
             onMouseEnter={function() { setOpen(true); }}
             onMouseLeave={function() { setOpen(false); }}
        >
            <button
                onClick={function() { setOpen(!open); }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-all"
            >
                <span>☰</span>
                <span className="hidden sm:inline">{t('header.moreApps')}</span>
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    <a href="./"
                       className={currentApp === 'index' ? PDE_STYLES.navLinkActive : PDE_STYLES.navLink}
                    >
                        <span>🎓</span> {t('nav.home')}
                    </a>
                    {PDE_NAV.map(function(app) {
                        return (
                            <a key={app.id}
                               href={app.href}
                               className={currentApp === app.id ? PDE_STYLES.navLinkActive : PDE_STYLES.navLink}
                            >
                                <span>{app.emoji}</span> {t('nav.' + app.id)}
                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

// ─── Header ─────────────────────────────────────────────────────
/**
 * Unified sticky header with logo, nav, language selector, cross-app nav.
 *
 * @param {{
 *   idioma: string,
 *   setIdioma: Function,
 *   currentApp: string,
 *   sections?: Array<{ id: string, label: string, emoji?: string }>,
 *   currentSection?: string,
 *   setSection?: Function,
 * }} props
 */
function PdeHeader({ idioma, setIdioma, currentApp, sections, currentSection, setSection }) {
    const [menuOpen, setMenuOpen] = _useState(false);
    const t = createTranslator({}, idioma);
    const isIndex = currentApp === 'index';

    return (
        <header className={PDE_STYLES.header}>
            <div className={PDE_STYLES.headerContainer}>
                {/* Left: Logo + Home link */}
                <div className="flex items-center gap-3">
                    <a href="./" className="flex items-center gap-2 hover:opacity-80 transition-opacity" title={t('nav.home')}>
                        <span className="text-xl">🎓</span>
                        <span className="font-black text-xl text-gray-800">PDE</span>
                    </a>

                    {!isIndex && (
                        <span className="text-gray-300">|</span>
                    )}
                    {!isIndex && (
                        <span className="text-sm font-semibold text-pink-600">
                            {t('nav.' + currentApp)}
                        </span>
                    )}
                </div>

                {/* Center: Desktop section nav (if sections provided) */}
                {sections && sections.length > 0 && setSection && (
                    <nav className="hidden xl:flex items-center gap-1 max-w-3xl overflow-x-auto">
                        {sections.map(function(sec) {
                            var isActive = currentSection === sec.id;
                            return (
                                <button
                                    key={sec.id}
                                    onClick={function() {
                                        setSection(sec.id);
                                        pdeSetHashSection(sec.id);
                                        pdeScrollToTop();
                                    }}
                                    className={'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ' +
                                        (isActive
                                            ? 'bg-pink-100 text-pink-700'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        )}
                                >
                                    {sec.emoji && <span className="text-xs">{sec.emoji}</span>}
                                    {sec.label}
                                </button>
                            );
                        })}
                    </nav>
                )}

                {/* Right: Language + Cross-app nav + Mobile hamburger */}
                <div className="flex items-center gap-2">
                    <PdeLanguageSelector idioma={idioma} setIdioma={setIdioma} />
                    <PdeCrossNav idioma={idioma} currentApp={currentApp} />

                    {/* Mobile hamburger (only if sections exist) */}
                    {sections && sections.length > 0 && setSection && (
                        <button
                            onClick={function() { setMenuOpen(!menuOpen); }}
                            className="xl:hidden p-2 text-gray-600 hover:text-pink-500 hover:bg-gray-100 rounded-lg transition-all"
                            aria-label={t('header.menu')}
                        >
                            <span className="text-xl">{menuOpen ? '✕' : '☰'}</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile section menu */}
            {menuOpen && sections && sections.length > 0 && setSection && (
                <div className={PDE_STYLES.mobileMenu} style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    {sections.map(function(sec) {
                        var isActive = currentSection === sec.id;
                        return (
                            <button
                                key={sec.id}
                                onClick={function() {
                                    setSection(sec.id);
                                    setMenuOpen(false);
                                    pdeSetHashSection(sec.id);
                                    pdeScrollToTop();
                                }}
                                className={PDE_STYLES.mobileMenuItem + ' ' +
                                    (isActive ? PDE_STYLES.mobileMenuItemActive : PDE_STYLES.mobileMenuItemInactive)}
                            >
                                {sec.emoji && <span className="text-lg">{sec.emoji}</span>}
                                <span className="text-xs font-medium leading-tight">{sec.label}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </header>
    );
}

// ─── Footer ─────────────────────────────────────────────────────
/**
 * Unified footer.
 * @param {{ appEmoji: string, appName: string, idioma: string }} props
 */
function PdeFooter({ appEmoji, appName, idioma }) {
    var t = createTranslator({}, idioma);

    return (
        <footer className={PDE_STYLES.footer}>
            <div className="max-w-7xl mx-auto px-4">
                <p>
                    {appEmoji} {appName} · {PDE_CONFIG.name} · {PDE_CONFIG.year}
                </p>
                <p className="mt-1 text-gray-300">
                    {t('footer.madeBy')}
                </p>
            </div>
        </footer>
    );
}

// ─── Scroll To Top Button ───────────────────────────────────────
/**
 * Floating button that appears when user scrolls down.
 */
function PdeScrollToTop() {
    const [visible, setVisible] = _useState(false);

    _useEffect(function() {
        function handleScroll() {
            setVisible(window.scrollY > 300);
        }
        window.addEventListener('scroll', handleScroll, { passive: true });
        return function() { window.removeEventListener('scroll', handleScroll); };
    }, []);

    if (!visible) return null;

    return (
        <button
            onClick={pdeScrollToTop}
            className={PDE_STYLES.scrollTopBtn}
            aria-label="Scroll to top"
        >
            <span className="text-lg">↑</span>
        </button>
    );
}

// ─── Prev/Next Navigation ───────────────────────────────────────
/**
 * Previous / Next buttons for navigating between sections.
 * @param {{
 *   sections: Array<{ id: string, label: string }>,
 *   currentSection: string,
 *   setSection: Function,
 *   idioma: string,
 * }} props
 */
function PdePrevNext({ sections, currentSection, setSection, idioma }) {
    var t = createTranslator({}, idioma);
    var idx = sections.findIndex(function(s) { return s.id === currentSection; });
    var prev = idx > 0 ? sections[idx - 1] : null;
    var next = idx < sections.length - 1 ? sections[idx + 1] : null;

    if (!prev && !next) return null;

    return (
        <div className={PDE_STYLES.prevNextContainer}>
            {prev ? (
                <button
                    onClick={function() {
                        setSection(prev.id);
                        pdeSetHashSection(prev.id);
                        pdeScrollToTop();
                    }}
                    className={PDE_STYLES.prevNextBtn}
                >
                    {t('nav.prev')}
                    <span className="hidden sm:inline text-gray-500">({prev.label})</span>
                </button>
            ) : <div></div>}

            <span className="text-xs text-gray-500">
                {idx + 1} / {sections.length}
            </span>

            {next ? (
                <button
                    onClick={function() {
                        setSection(next.id);
                        pdeSetHashSection(next.id);
                        pdeScrollToTop();
                    }}
                    className={PDE_STYLES.prevNextBtn}
                >
                    <span className="hidden sm:inline text-gray-500">({next.label})</span>
                    {t('nav.next')}
                </button>
            ) : <div></div>}
        </div>
    );
}

// ─── Floating Home Button (for immersive pages) ─────────────────
/**
 * Small floating button for playground/concurs to return to PDE hub.
 * @param {{ idioma: string }} props
 */
function PdeHomeButton({ idioma }) {
    var t = createTranslator({}, idioma);

    return (
        <a
            href="./"
            className="fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 text-sm font-medium text-gray-700 hover:text-pink-600 hover:border-pink-200 transition-all"
            title={t('footer.backHome')}
        >
            <span>🎓</span>
            <span className="hidden sm:inline">PDE</span>
        </a>
    );
}

// ─── Deep Linking Hook ──────────────────────────────────────────
/**
 * Custom hook for hash-based deep linking.
 * Call at top of your app: usePdeDeepLink(section, setSection)
 */
function usePdeDeepLink(section, setSection) {
    // On mount: read hash from URL
    _useEffect(function() {
        var hash = pdeGetHashSection();
        if (hash) setSection(hash);
    }, []);

    // On section change: update hash
    _useEffect(function() {
        pdeSetHashSection(section);
    }, [section]);
}

// ─── Expose all components globally ─────────────────────────────
// Babel standalone wraps each type="text/babel" script in its own scope,
// so we must explicitly attach to window for cross-script access.
window.PdeHeader = PdeHeader;
window.PdeFooter = PdeFooter;
window.PdeLanguageSelector = PdeLanguageSelector;
window.PdeCrossNav = PdeCrossNav;
window.PdeScrollToTop = PdeScrollToTop;
window.PdePrevNext = PdePrevNext;
window.PdeHomeButton = PdeHomeButton;
window.usePdeDeepLink = usePdeDeepLink;
window.usePdeIdioma = usePdeIdioma;

window.PDE = {
    Header: PdeHeader,
    Footer: PdeFooter,
    LanguageSelector: PdeLanguageSelector,
    CrossNav: PdeCrossNav,
    ScrollToTop: PdeScrollToTop,
    PrevNext: PdePrevNext,
    HomeButton: PdeHomeButton,
    useDeepLink: usePdeDeepLink,
    useIdioma: usePdeIdioma,
};
