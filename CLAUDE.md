# CLAUDE.md — PDE (Plataforma Didàctica Econòmica)

## Identitat del Projecte
- **Nom:** PDE — Plataforma Didàctica Econòmica
- **URL:** https://profedeeconomia.es
- **Repo:** https://github.com/skinnydkd/webpde
- **Deploy:** Vercel (auto-deploy des de `main`)
- **Idioma principal:** Català/Valencià (amb suport ES i EN)
- **Autor:** Pau (Valencia, Spain)

## Descripció
Plataforma educativa d'economia interactiva orientada a Batxillerat, FP i Universitat.
Inclou simuladors, jocs, calculadores i guies sobre microeconomia, macroeconomia,
empresa, finances personals, ferramentes de decisió i investigació.

## Estructura del Projecte
```
profedeeconomia/
├── index.html          # Landing page / hub de navegació
├── economia.html       # Microeconomia i Macroeconomia (18 mòduls)
├── empresa.html        # Economia de l'Empresa (20+ mòduls)
├── finances.html       # Finances Personals i Inversió (23+ mòduls)
├── vidapractica.html   # Educació financera quotidiana (12 mòduls)
├── ferramentes.html    # Ferramentes de decisió i models mentals (30 mòduls)
├── playground.html     # 10 jocs educatius per a 2 jugadors
├── concurs.html        # Quiz competitiu amb rànquing TOP 10
├── recerca.html        # Papers acadèmics, llibres i mètode científic
└── documents/
    ├── platform-docs.md
    ├── styleguide.md
    ├── roadmap.md
    └── data-reference.md
```

## Stack Tècnic
- **React 18** — via CDN (unpkg o cdnjs)
- **Babel Standalone 7.23.5** — JSX directament al navegador
- **Tailwind CSS** — via CDN (sense build)
- **ReCharts 2.1.16** — gràfics interactius
- **Google Fonts** — Plus Jakarta Sans (principal), Nunito (playground)
- **LocalStorage** — persistència de scores, rankings i preferències
- **Sense backend, sense build system** — fitxers HTML estàtics

## Patrons de Codi Importants

### Estructura base de cada pàgina
```html
<!DOCTYPE html>
<html lang="ca">
<head>
  <!-- CDNs: Tailwind, React, ReactDOM, Babel, ReCharts -->
  <!-- Google Fonts: Plus Jakarta Sans -->
</head>
<body class="bg-gradient-to-br from-amber-50 via-white to-pink-50">
  <div id="root"></div>
  <script type="text/babel">
    const { useState, useEffect } = React;
    // Components React...
    ReactDOM.render(<App />, document.getElementById('root'));
  </script>
</body>
```

### Sistema multiidioma
```javascript
const translations = {
  key: { val: 'Text en Valencià', es: 'Texto en Castellano', en: 'Text in English' }
};
const t = (key) => translations[key]?.[lang] ?? key;
```

### Persistència LocalStorage
```javascript
// Scores playground / concurs
localStorage.getItem('pde_scores')
localStorage.setItem('pde_scores', JSON.stringify(scores))
```

## Convencions
- **Idioma dels comentaris:** Anglès
- **Idioma UI:** Català per defecte, amb selector VAL/ES/EN
- **Navegació:** Cada pàgina té header sticky amb logo + nav + idioma
- **Footer:** sempre inclou link de tornada a index.html
- **Colors per pàgina:** Cada app té gradient identificatiu (veure styleguide.md)

## Regles Específiques del Projecte
- NO afegir dependències noves sense justificació (manten tot via CDN)
- NO crear backend — tot ha de funcionar com a fitxers estàtics
- Contingut educatiu ha de ser **precís i rigorós** (no simplificar incorrectament)
- Els simuladors han de ser **pedagògicament correctes** (no sols bonics)
- Mantenir coherència visual entre totes les pàgines (paleta + fonts)
- Testejar que funciona sense internet (excl. CDNs) si és possible

## Deploy
- **Automàtic:** Push a `main` → Vercel desplegua
- **Manual check:** https://profedeeconomia.es
- Seguir Git Workflow global: branch + PR (mai push directe a main)

## Documents de Referència
- `documents/platform-docs.md` — Descripció detallada de cada pàgina i mòdul
- `documents/styleguide.md` — Paleta de colors, tipografia, components visuals
- `documents/roadmap.md` — Prioritats actuals i visió futura
- `documents/data-reference.md` — Relacions de dades, simuladors i formules
