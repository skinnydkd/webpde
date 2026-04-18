/**
 * PDE Shared Components — React components used across all pages.
 * Loaded with type="text/babel" AFTER pde-shared.js.
 * Requires: React 18, pde-shared.js globals (PDE_CONFIG, PDE_NAV, PDE_STYLES, etc.)
 */

const { useState: _useState, useEffect: _useEffect, useCallback: _useCallback, useRef: _useRef, useMemo: _useMemo } = React;

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

// ─── usePdeTheme Hook ──────────────────────────────────────────
/**
 * Dark mode hook. Reads from PdeThemeStore and auto-updates.
 * Returns [theme, toggleTheme] where theme is 'light' or 'dark'.
 */
function usePdeTheme() {
    const [theme, setThemeState] = _useState(function() { return PdeThemeStore.get(); });

    _useEffect(function() {
        const unsubscribe = PdeThemeStore.subscribe(function(t) {
            setThemeState(function(prev) { return prev === t ? prev : t; });
        });
        return unsubscribe;
    }, []);

    const toggleTheme = _useCallback(function() {
        PdeThemeStore.toggle();
    }, []);

    return [theme, toggleTheme];
}

// ─── Dark Mode Toggle ──────────────────────────────────────────
/**
 * Compact dark/light toggle button.
 * @param {{ theme: string, toggleTheme: Function, idioma: string }} props
 */
function PdeThemeToggle({ theme, toggleTheme, idioma }) {
    const t = createTranslator({}, idioma);
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className={'p-2 rounded-lg transition-all ' +
                (isDark
                    ? 'text-yellow-400 hover:bg-gray-800'
                    : 'text-gray-500 hover:bg-gray-100'
                )}
            title={t('theme.toggle')}
            aria-label={t('theme.toggle')}
        >
            <span className="text-sm">{isDark ? '☀️' : '🌙'}</span>
        </button>
    );
}

// ─── Search Modal ──────────────────────────────────────────────
/**
 * Global search with Ctrl+K shortcut.
 * Searches across PDE_NAV pages and optional sections.
 *
 * @param {{ idioma: string, sections?: Array, currentApp?: string }} props
 */
function PdeSearch({ idioma, sections, currentApp, externalOpen, onClose }) {
    const [open, setOpen] = _useState(false);
    const [query, setQuery] = _useState('');
    const inputRef = _useRef(null);
    const t = createTranslator({}, idioma);

    // Sync with external open trigger
    _useEffect(function() {
        if (externalOpen) setOpen(true);
    }, [externalOpen]);

    function closeSearch() {
        setOpen(false);
        setQuery('');
        if (typeof onClose === 'function') onClose();
    }

    // Ctrl+K / Cmd+K shortcut
    _useEffect(function() {
        function handleKey(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setOpen(function(prev) {
                    const next = !prev;
                    if (!next && typeof onClose === 'function') onClose();
                    return next;
                });
            }
            if (e.key === 'Escape') closeSearch();
        }
        window.addEventListener('keydown', handleKey);
        return function() { window.removeEventListener('keydown', handleKey); };
    }, [onClose]);

    // Auto-focus input when opened
    _useEffect(function() {
        if (open && inputRef.current) inputRef.current.focus();
    }, [open]);

    // Build search index
    const searchIndex = _useMemo(function() {
        const items = [];

        // Add nav pages
        PDE_NAV.forEach(function(app) {
            const label = PDE_SHARED_TRANSLATIONS['nav.' + app.id];
            if (label) {
                items.push({
                    type: 'page',
                    id: app.id,
                    emoji: app.emoji,
                    label: label[idioma] || label['val'],
                    keywords: [label['val'], label['es'], label['en']].join(' ').toLowerCase(),
                    href: app.href,
                });
            }
        });

        // Add current page sections
        if (sections && sections.length > 0) {
            sections.forEach(function(sec) {
                items.push({
                    type: 'section',
                    id: sec.id,
                    emoji: sec.emoji || '📄',
                    label: sec.label,
                    keywords: sec.label.toLowerCase() + ' ' + (sec.id || ''),
                    href: '#' + sec.id,
                    page: currentApp,
                });
            });
        }

        return items;
    }, [idioma, sections, currentApp]);

    // Filter results
    const results = _useMemo(function() {
        if (!query.trim()) return searchIndex.slice(0, 10);
        const q = query.toLowerCase().trim();
        return searchIndex.filter(function(item) {
            return item.keywords.includes(q) || item.label.toLowerCase().includes(q);
        });
    }, [query, searchIndex]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
            onClick={closeSearch}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative w-full max-w-lg mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                onClick={function(e) { e.stopPropagation(); }}
            >
                {/* Search input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-gray-400">🔍</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={function(e) { setQuery(e.target.value); }}
                        placeholder={t('search.placeholder')}
                        className="flex-1 bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-400 outline-none text-sm"
                    />
                    <kbd className="hidden sm:inline px-2 py-0.5 text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 rounded">ESC</kbd>
                </div>

                {/* Results */}
                <div className="max-h-[40vh] overflow-y-auto py-2">
                    {results.length === 0 ? (
                        <p className="px-4 py-6 text-center text-sm text-gray-400">{t('search.noResults')}</p>
                    ) : (
                        results.map(function(item, i) {
                            return (
                                <a
                                    key={item.type + '-' + item.id}
                                    href={item.href}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/30 hover:text-pink-600 transition-all"
                                    onClick={closeSearch}
                                >
                                    <span>{item.emoji}</span>
                                    <span className="flex-1">{item.label}</span>
                                    <span className="text-xs text-gray-400">
                                        {item.type === 'page' ? '→' : '#'}
                                    </span>
                                </a>
                            );
                        })
                    )}
                </div>

                {/* Footer hint */}
                <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-400 flex justify-between">
                    <span>{results.length} {t('search.results')}</span>
                    <span>⌘K</span>
                </div>
            </div>
        </div>
    );
}

// ─── Progress Bar ──────────────────────────────────────────────
/**
 * Compact progress indicator for section-based pages.
 * Shows completion percentage and marks sections as visited.
 *
 * @param {{ pageId: string, sections: Array, currentSection: string, idioma: string }} props
 */
function PdeProgressBar({ pageId, sections, currentSection, idioma }) {
    const [completed, setCompleted] = _useState(function() {
        return PdeProgressStore.get(pageId);
    });
    const t = createTranslator({}, idioma);

    // Mark current section as completed after 5 seconds of viewing
    _useEffect(function() {
        if (!currentSection || !pageId) return;
        const timer = setTimeout(function() {
            PdeProgressStore.markCompleted(pageId, currentSection);
            setCompleted(PdeProgressStore.get(pageId));
        }, 5000);
        return function() { clearTimeout(timer); };
    }, [currentSection, pageId]);

    if (!sections || sections.length === 0) return null;

    const percent = Math.round((completed.length / sections.length) * 100);

    return (
        <div className="flex items-center gap-2 pde-no-print">
            {/* Mini progress dots */}
            <div className="hidden sm:flex items-center gap-0.5">
                {sections.map(function(sec) {
                    const done = completed.includes(sec.id);
                    return (
                        <div
                            key={sec.id}
                            className={'w-1.5 h-1.5 rounded-full transition-all ' +
                                (done ? 'bg-emerald-500' :
                                 sec.id === currentSection ? 'bg-pink-500' :
                                 'bg-gray-300 dark:bg-gray-600')}
                            title={sec.label + (done ? ' ✓' : '')}
                        />
                    );
                })}
            </div>
            {/* Percentage */}
            <span className={'text-xs font-medium ' +
                (percent === 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400')}>
                {percent}%
            </span>
        </div>
    );
}

// ─── Print Button ──────────────────────────────────────────────
/**
 * Simple print button, hidden in print view.
 * @param {{ idioma: string }} props
 */
function PdePrintButton({ idioma }) {
    const t = createTranslator({}, idioma);

    return (
        <button
            onClick={function() { window.print(); }}
            className="pde-no-print flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/30 rounded-lg transition-all"
            title={t('print.button')}
        >
            <span>🖨️</span>
            <span className="hidden sm:inline text-xs">{t('print.button').replace('🖨️ ', '')}</span>
        </button>
    );
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
                <div className="absolute right-0 top-full mt-1 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50">
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
    const [searchOpen, setSearchOpen] = _useState(false);
    const [theme, toggleTheme] = usePdeTheme();
    const t = createTranslator({}, idioma);
    const isIndex = currentApp === 'index';

    return (
        <header className={PDE_STYLES.header}>
            <div className={PDE_STYLES.headerContainer}>
                {/* Left: Logo + Home link */}
                <div className="flex items-center gap-3">
                    <a href="./" className="flex items-center gap-2 hover:opacity-80 transition-opacity" title={t('nav.home')}>
                        <span className="text-xl">🎓</span>
                        <span className="font-black text-xl text-gray-800 dark:text-gray-100">PDE</span>
                    </a>

                    {!isIndex && (
                        <span className="text-gray-300 dark:text-gray-600">|</span>
                    )}
                    {!isIndex && (
                        <span className="text-sm font-semibold text-pink-600 dark:text-pink-400">
                            {t('nav.' + currentApp)}
                        </span>
                    )}
                </div>

                {/* Center: Desktop section nav (if sections provided) */}
                {sections && sections.length > 0 && setSection && (
                    <nav className="hidden xl:flex items-center gap-1 max-w-3xl overflow-x-auto">
                        {sections.map(function(sec) {
                            const isActive = currentSection === sec.id;
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

                {/* Right: Tools + Language + Cross-app nav + Mobile hamburger */}
                <div className="flex items-center gap-1">
                    {/* Progress (only on section-based pages) */}
                    {sections && sections.length > 0 && (
                        <PdeProgressBar pageId={currentApp} sections={sections} currentSection={currentSection} idioma={idioma} />
                    )}

                    {/* Search */}
                    <button
                        onClick={function() { setSearchOpen(true); }}
                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-pink-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all pde-no-print"
                        title={t('search.open') + ' (⌘K)'}
                        aria-label={t('search.open')}
                    >
                        <span className="text-sm">🔍</span>
                    </button>

                    {/* Print (only on content pages, not index/games) */}
                    {sections && sections.length > 0 && (
                        <PdePrintButton idioma={idioma} />
                    )}

                    {/* Dark mode toggle */}
                    <PdeThemeToggle theme={theme} toggleTheme={toggleTheme} idioma={idioma} />

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

            {/* Search modal */}
            <PdeSearch
                idioma={idioma}
                sections={sections}
                currentApp={currentApp}
                externalOpen={searchOpen}
                onClose={function() { setSearchOpen(false); }}
            />

            {/* Bottom mobile nav — portaled to body to escape header's backdrop-filter containing block */}
            {sections && sections.length > 0 && setSection && ReactDOM.createPortal(
                <PdeBottomNav
                    sections={sections}
                    currentSection={currentSection}
                    setSection={setSection}
                />,
                document.body
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
    const t = createTranslator({}, idioma);

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
    const t = createTranslator({}, idioma);
    const idx = sections.findIndex(function(s) { return s.id === currentSection; });
    const prev = idx > 0 ? sections[idx - 1] : null;
    const next = idx < sections.length - 1 ? sections[idx + 1] : null;

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

// ─── Bottom Mobile Nav ─────────────────────────────────────────
/**
 * Fixed bottom navigation bar for mobile devices.
 * Shows section tabs as a scrollable horizontal strip.
 * Only visible below xl: breakpoint (where desktop nav is hidden).
 *
 * @param {{
 *   sections: Array<{ id: string, label: string, emoji?: string }>,
 *   currentSection: string,
 *   setSection: Function,
 * }} props
 */
function PdeBottomNav({ sections, currentSection, setSection }) {
    const scrollRef = _useRef(null);
    const activeRef = _useRef(null);

    if (!sections || sections.length === 0 || !setSection) return null;

    // Auto-scroll to keep the active section button centered
    _useEffect(function() {
        if (activeRef.current && scrollRef.current) {
            var container = scrollRef.current;
            var active = activeRef.current;
            var scrollLeft = active.offsetLeft - container.offsetWidth / 2 + active.offsetWidth / 2;
            container.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
        }
    }, [currentSection]);

    // Add bottom padding to body so content isn't hidden behind the nav
    _useEffect(function() {
        var mq = window.matchMedia('(min-width: 1280px)'); // xl breakpoint
        function update() {
            document.body.style.paddingBottom = mq.matches ? '' : '56px';
        }
        update();
        mq.addEventListener('change', update);
        return function() {
            mq.removeEventListener('change', update);
            document.body.style.paddingBottom = '';
        };
    }, []);

    return (
        <nav className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 shadow-[0_-2px_10px_rgba(0,0,0,0.08)] pde-no-print">
            <div
                ref={scrollRef}
                className="pde-bottom-nav-scroll flex items-center gap-1 px-2 py-1.5 overflow-x-auto"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {sections.map(function(sec) {
                    var isActive = currentSection === sec.id;
                    return (
                        <button
                            key={sec.id}
                            ref={isActive ? activeRef : null}
                            onClick={function() {
                                setSection(sec.id);
                                pdeSetHashSection(sec.id);
                                pdeScrollToTop();
                            }}
                            className={'flex-shrink-0 flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ' +
                                (isActive
                                    ? 'bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 active:bg-gray-100 dark:active:bg-gray-800'
                                )}
                        >
                            {sec.emoji && <span>{sec.emoji}</span>}
                            <span>{sec.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}

// ─── Floating Home Button (for immersive pages) ─────────────────
/**
 * Small floating button for playground/concurs to return to PDE hub.
 * @param {{ idioma: string }} props
 */
function PdeHomeButton({ idioma }) {
    const t = createTranslator({}, idioma);

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
        const hash = pdeGetHashSection();
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
window.PdeBottomNav = PdeBottomNav;
window.PdeThemeToggle = PdeThemeToggle;
window.PdeSearch = PdeSearch;
window.PdeProgressBar = PdeProgressBar;
window.PdePrintButton = PdePrintButton;
window.usePdeDeepLink = usePdeDeepLink;
window.usePdeIdioma = usePdeIdioma;
window.usePdeTheme = usePdeTheme;

window.PDE = {
    Header: PdeHeader,
    Footer: PdeFooter,
    LanguageSelector: PdeLanguageSelector,
    CrossNav: PdeCrossNav,
    ScrollToTop: PdeScrollToTop,
    PrevNext: PdePrevNext,
    HomeButton: PdeHomeButton,
    BottomNav: PdeBottomNav,
    ThemeToggle: PdeThemeToggle,
    Search: PdeSearch,
    ProgressBar: PdeProgressBar,
    PrintButton: PdePrintButton,
    useDeepLink: usePdeDeepLink,
    useIdioma: usePdeIdioma,
    useTheme: usePdeTheme,
};
