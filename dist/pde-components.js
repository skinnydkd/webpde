/**
 * PDE Shared Components — React components used across all pages.
 * Loaded with type="text/babel" AFTER pde-shared.js.
 * Requires: React 18, pde-shared.js globals (PDE_CONFIG, PDE_NAV, PDE_STYLES, etc.)
 */

const {
  useState: _useState,
  useEffect: _useEffect,
  useCallback: _useCallback
} = React;

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
  const [idioma, setIdiomaState] = _useState(function () {
    return PdeLanguageStore.get();
  });
  _useEffect(function () {
    // Sync with any language change from any source (other selectors, other tabs).
    const unsubscribe = PdeLanguageStore.subscribe(function (lang) {
      setIdiomaState(function (prev) {
        return prev === lang ? prev : lang;
      });
    });
    return unsubscribe;
  }, []);
  const setIdioma = _useCallback(function (lang) {
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
function PdeLanguageSelector({
  idioma,
  setIdioma
}) {
  const handleChange = _useCallback(function (lang) {
    if (!PDE_CONFIG.supportedLangs.includes(lang)) return;
    // Persist + broadcast. Must run BEFORE setIdioma so that if the caller's
    // setIdioma triggers a re-render + unmount, the store update still fires.
    PdeLanguageStore.set(lang);
    if (typeof setIdioma === 'function') setIdioma(lang);
  }, [setIdioma]);
  return /*#__PURE__*/React.createElement("div", {
    className: PDE_STYLES.langGroup
  }, PDE_CONFIG.supportedLangs.map(function (lang) {
    return /*#__PURE__*/React.createElement("button", {
      key: lang,
      onClick: function () {
        handleChange(lang);
      },
      className: idioma === lang ? PDE_STYLES.langActive : PDE_STYLES.langInactive,
      title: PDE_SHARED_TRANSLATIONS['lang.' + lang]?.[idioma] || lang
    }, PDE_CONFIG.langLabels[lang]);
  }));
}

// ─── Cross-App Navigation Dropdown ──────────────────────────────
/**
 * Dropdown showing all PDE apps for cross-navigation.
 * @param {{ idioma: string, currentApp: string }} props
 */
function PdeCrossNav({
  idioma,
  currentApp
}) {
  const [open, setOpen] = _useState(false);
  const t = createTranslator({}, idioma);
  return /*#__PURE__*/React.createElement("div", {
    className: "relative",
    onMouseEnter: function () {
      setOpen(true);
    },
    onMouseLeave: function () {
      setOpen(false);
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      setOpen(!open);
    },
    className: "flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-all"
  }, /*#__PURE__*/React.createElement("span", null, "\u2630"), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, t('header.moreApps'))), open && /*#__PURE__*/React.createElement("div", {
    className: "absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
  }, /*#__PURE__*/React.createElement("a", {
    href: "./",
    className: currentApp === 'index' ? PDE_STYLES.navLinkActive : PDE_STYLES.navLink
  }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDF93"), " ", t('nav.home')), PDE_NAV.map(function (app) {
    return /*#__PURE__*/React.createElement("a", {
      key: app.id,
      href: app.href,
      className: currentApp === app.id ? PDE_STYLES.navLinkActive : PDE_STYLES.navLink
    }, /*#__PURE__*/React.createElement("span", null, app.emoji), " ", t('nav.' + app.id));
  })));
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
function PdeHeader({
  idioma,
  setIdioma,
  currentApp,
  sections,
  currentSection,
  setSection
}) {
  const [menuOpen, setMenuOpen] = _useState(false);
  const t = createTranslator({}, idioma);
  const isIndex = currentApp === 'index';
  return /*#__PURE__*/React.createElement("header", {
    className: PDE_STYLES.header
  }, /*#__PURE__*/React.createElement("div", {
    className: PDE_STYLES.headerContainer
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("a", {
    href: "./",
    className: "flex items-center gap-2 hover:opacity-80 transition-opacity",
    title: t('nav.home')
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xl"
  }, "\uD83C\uDF93"), /*#__PURE__*/React.createElement("span", {
    className: "font-black text-xl text-gray-800"
  }, "PDE")), !isIndex && /*#__PURE__*/React.createElement("span", {
    className: "text-gray-300"
  }, "|"), !isIndex && /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold text-pink-600"
  }, t('nav.' + currentApp))), sections && sections.length > 0 && setSection && /*#__PURE__*/React.createElement("nav", {
    className: "hidden xl:flex items-center gap-1 max-w-3xl overflow-x-auto"
  }, sections.map(function (sec) {
    const isActive = currentSection === sec.id;
    return /*#__PURE__*/React.createElement("button", {
      key: sec.id,
      onClick: function () {
        setSection(sec.id);
        pdeSetHashSection(sec.id);
        pdeScrollToTop();
      },
      className: 'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ' + (isActive ? 'bg-pink-100 text-pink-700' : 'text-gray-600 hover:bg-gray-100')
    }, sec.emoji && /*#__PURE__*/React.createElement("span", {
      className: "text-xs"
    }, sec.emoji), sec.label);
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(PdeLanguageSelector, {
    idioma: idioma,
    setIdioma: setIdioma
  }), /*#__PURE__*/React.createElement(PdeCrossNav, {
    idioma: idioma,
    currentApp: currentApp
  }), sections && sections.length > 0 && setSection && /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      setMenuOpen(!menuOpen);
    },
    className: "xl:hidden p-2 text-gray-600 hover:text-pink-500 hover:bg-gray-100 rounded-lg transition-all",
    "aria-label": t('header.menu')
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xl"
  }, menuOpen ? '✕' : '☰')))), menuOpen && sections && sections.length > 0 && setSection && /*#__PURE__*/React.createElement("div", {
    className: PDE_STYLES.mobileMenu,
    style: {
      maxHeight: '60vh',
      overflowY: 'auto'
    }
  }, sections.map(function (sec) {
    var isActive = currentSection === sec.id;
    return /*#__PURE__*/React.createElement("button", {
      key: sec.id,
      onClick: function () {
        setSection(sec.id);
        setMenuOpen(false);
        pdeSetHashSection(sec.id);
        pdeScrollToTop();
      },
      className: PDE_STYLES.mobileMenuItem + ' ' + (isActive ? PDE_STYLES.mobileMenuItemActive : PDE_STYLES.mobileMenuItemInactive)
    }, sec.emoji && /*#__PURE__*/React.createElement("span", {
      className: "text-lg"
    }, sec.emoji), /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-medium leading-tight"
    }, sec.label));
  })));
}

// ─── Footer ─────────────────────────────────────────────────────
/**
 * Unified footer.
 * @param {{ appEmoji: string, appName: string, idioma: string }} props
 */
function PdeFooter({
  appEmoji,
  appName,
  idioma
}) {
  const t = createTranslator({}, idioma);
  return /*#__PURE__*/React.createElement("footer", {
    className: PDE_STYLES.footer
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4"
  }, /*#__PURE__*/React.createElement("p", null, appEmoji, " ", appName, " \xB7 ", PDE_CONFIG.name, " \xB7 ", PDE_CONFIG.year), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-gray-300"
  }, t('footer.madeBy'))));
}

// ─── Scroll To Top Button ───────────────────────────────────────
/**
 * Floating button that appears when user scrolls down.
 */
function PdeScrollToTop() {
  const [visible, setVisible] = _useState(false);
  _useEffect(function () {
    function handleScroll() {
      setVisible(window.scrollY > 300);
    }
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return function () {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  if (!visible) return null;
  return /*#__PURE__*/React.createElement("button", {
    onClick: pdeScrollToTop,
    className: PDE_STYLES.scrollTopBtn,
    "aria-label": "Scroll to top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-lg"
  }, "\u2191"));
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
function PdePrevNext({
  sections,
  currentSection,
  setSection,
  idioma
}) {
  const t = createTranslator({}, idioma);
  const idx = sections.findIndex(function (s) {
    return s.id === currentSection;
  });
  const prev = idx > 0 ? sections[idx - 1] : null;
  const next = idx < sections.length - 1 ? sections[idx + 1] : null;
  if (!prev && !next) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: PDE_STYLES.prevNextContainer
  }, prev ? /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      setSection(prev.id);
      pdeSetHashSection(prev.id);
      pdeScrollToTop();
    },
    className: PDE_STYLES.prevNextBtn
  }, t('nav.prev'), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline text-gray-500"
  }, "(", prev.label, ")")) : /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-500"
  }, idx + 1, " / ", sections.length), next ? /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      setSection(next.id);
      pdeSetHashSection(next.id);
      pdeScrollToTop();
    },
    className: PDE_STYLES.prevNextBtn
  }, /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline text-gray-500"
  }, "(", next.label, ")"), t('nav.next')) : /*#__PURE__*/React.createElement("div", null));
}

// ─── Floating Home Button (for immersive pages) ─────────────────
/**
 * Small floating button for playground/concurs to return to PDE hub.
 * @param {{ idioma: string }} props
 */
function PdeHomeButton({
  idioma
}) {
  const t = createTranslator({}, idioma);
  return /*#__PURE__*/React.createElement("a", {
    href: "./",
    className: "fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 text-sm font-medium text-gray-700 hover:text-pink-600 hover:border-pink-200 transition-all",
    title: t('footer.backHome')
  }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDF93"), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, "PDE"));
}

// ─── Deep Linking Hook ──────────────────────────────────────────
/**
 * Custom hook for hash-based deep linking.
 * Call at top of your app: usePdeDeepLink(section, setSection)
 */
function usePdeDeepLink(section, setSection) {
  // On mount: read hash from URL
  _useEffect(function () {
    const hash = pdeGetHashSection();
    if (hash) setSection(hash);
  }, []);

  // On section change: update hash
  _useEffect(function () {
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
  useIdioma: usePdeIdioma
};