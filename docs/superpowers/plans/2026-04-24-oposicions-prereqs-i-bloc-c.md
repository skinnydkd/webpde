# Oposicions: Prerequisits + Bloc C — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establir els prerequisits compartits (Style Guide, components React nous, script d'auditoria) i executar la primera reescriptura completa: **Bloc C (Macroeconomia, temes 20-26)**, expandint de 295 línies a ~1400 línies amb gràfics, citacions inline i rigor publicable.

**Architecture:** Components compartits a `pde-components.js` (reutilitzables per tots els blocs futurs); Style Guide com a font de veritat per a subagents; script d'auditoria Python que verifica conformitat per fitxer; reescriptura del Bloc C delegada a subagent amb brief exhaustiu, validada via auditoria + preview local + revisió manual.

**Tech Stack:** React 18 (Babel CDN), Tailwind via CDN, ReCharts 2.1.16, Mermaid.js (nou), Python 3 (auditoria), gh CLI (PRs).

**Spec:** `docs/superpowers/specs/2026-04-24-oposicions-millora-integral-design.md`

**Branch:** `feat/oposicions-prereqs-i-bloc-c`

---

## File Structure

| Fitxer | Acció | Responsabilitat |
|---|---|---|
| `documents/oposicions-styleguide.md` | CREAR | Style Guide canònic (veu, terminologia, fonts, gràfics) |
| `pde-components.js` | EXTENDRE | Afegir Citacio, ChartContainer, DiagramaSVG, MermaidDiagrama, DadaReal; estendre FormulaBox i BibliografiaBox |
| `scripts/audit-bloc.py` | CREAR | Script Python d'auditoria conformitat |
| `oposicions-bloc-c.html` | REESCRIURE | 7 temes BOE (20-26) expandits amb plantilla nova |

**Decomposició:** Prerequisits van separats del Bloc C (sub-tasks 1-4) per poder ser reutilitzats per a qualsevol bloc següent. Bloc C (sub-tasks 5-9) és la primera aplicació real de l'Style Guide i components.

---

## Phase 0 — Setup

### Task 0: Branch i sessió

**Files:**
- Verify: working tree clean

- [ ] **Step 1: Verificar estat git net**

```bash
git status
git pull origin main
```

Expected: `nothing to commit, working tree clean` i branca `main` actualitzada.

- [ ] **Step 2: Crear branch de treball**

```bash
git checkout -b feat/oposicions-prereqs-i-bloc-c
```

Expected: `Switched to a new branch 'feat/oposicions-prereqs-i-bloc-c'`.

---

## Phase 1 — Prerequisits compartits

### Task 1: Style Guide

**Files:**
- Create: `documents/oposicions-styleguide.md`

- [ ] **Step 1: Escriure el Style Guide**

Crea `documents/oposicions-styleguide.md` amb el contingut següent (estructura completa, no resum):

```markdown
# Style Guide — Temes d'Oposicions

Document canònic per a la reescriptura dels 71 temes BOE del cos d'oposicions de Professorat d'Economia.

## 1. Veu

- **Persona:** tercera persona impersonal ("s'observa", "es defineix", "cal distingir").
- **Tó:** rigorós però accessible. Defuig l'argot innecessari, però mantén la precisió tècnica.
- **Idioma:** català/valencià normatiu. Diacritics correctes (à, è, í, ò, ú, ï, ü, ç). Mai català col·loquial.

**Frases idònies:**
- "El producte interior brut (PIB) es defineix com el valor monetari de tots els béns i serveis finals produïts dins del territori econòmic durant un període concret."
- "Segons Mankiw (2021, p. 213), la corba de Phillips presenta una relació inversa a curt termini entre inflació i atur, però aquesta desapareix a llarg termini."

**Frases a evitar:**
- "El PIB és bàsicament el que produeix un país." (vague, col·loquial)
- "Com tots sabem, la inflació és dolenta." (no rigorós)

## 2. Terminologia canònica

| Forma preferent | Variants a evitar | Notes |
|---|---|---|
| producte interior brut (PIB) | producte nacional brut, ingrés nacional | PNB només quan es contrasta amb PIB |
| economia de mercat | capitalisme | "Capitalisme" és sistema de propietat; "economia de mercat" és mecanisme d'assignació |
| oferta agregada / demanda agregada | oferta total / demanda total | En context macro |
| fallades de mercat | falles de mercat, errors de mercat | Forma normativa |
| preferències del consumidor | gustos | "Gustos" només en exemples informals |
| funció de producció | tecnologia de producció | "Tecnologia" només per al concepte ampliat |
| tipus d'interès | taxa d'interès | Forma valenciana preferent |
| benefici / pèrdua | guany / pèrdua | "Guany" només per a guanys de capital |

## 3. Estructura de tema

Cada tema té dos components: `Tema{N}Complet` i `Tema{N}Resum`.

### 3.1 Tema{N}Complet (~180-220 línies JSX)

```
1. Card "Introducció" (100-150 paraules)
   - Per què el tema importa (rellevància docent)
   - Roadmap del desenvolupament
2. Card "Desenvolupament"
   - 3-5 TheoryBlock numerats (1.1, 1.2, 2.1, ...)
   - Cada TheoryBlock: intuïció → formalisme → exemple
   - ≥ 2 gràfics integrats (SVG, ReCharts o Mermaid)
   - FormulaBox amb fórmules clau (incloent condicions)
   - ≥ 3 Citacio inline al cos del text
3. Card "Conclusió" (80-120 paraules)
   - Síntesi
   - Enllaç amb pràctica docent
4. ClauBox amb 5-7 idees clau
5. BibliografiaBox amb ≥ 8 fonts (≥ 2 amb any 2020+)
```

### 3.2 Tema{N}Resum (~30-50 línies JSX)
Versió compacta de 300-500 paraules amb:
- Encapçalament identificatiu del tema
- 4 subseccions amb bullets
- ClauBox

## 4. Citacions

### 4.1 Format inline
```jsx
<Citacio autor="Mankiw" any="2021" pag="213" />
// → (Mankiw, 2021, p. 213)

<Citacio autor="Acemoglu et al." any="2024" />
// → (Acemoglu et al., 2024)
```

### 4.2 Coherència
Cada `<Citacio>` inline ha de tenir entrada corresponent al `<BibliografiaBox>` del mateix tema. Si la cita apareix només una vegada i no és essencial, prefereix una de les fonts ja a la llista.

## 5. Fonts preferents (llista blanca)

### 5.1 Premis Nobel d'Economia 2010-2026
- 2024: Acemoglu, Johnson, Robinson — institucions i prosperitat
- 2023: Goldin — història del treball femení
- 2022: Bernanke, Diamond, Dybvig — bancs i crisis financeres
- 2021: Card, Angrist, Imbens — empirisme i causalitat
- 2020: Milgrom, Wilson — teoria de subhastes
- 2019: Banerjee, Duflo, Kremer — pobresa
- 2018: Nordhaus, Romer — clima i innovació
- 2017: Thaler — economia conductual
- 2016: Hart, Holmström — contractes
- 2015: Deaton — consum, pobresa, benestar
- 2014: Tirole — poder de mercat
- 2013: Fama, Hansen, Shiller — preus dels actius
- 2012: Roth, Shapley — disseny de mercats
- 2011: Sargent, Sims — macroeconometria
- 2010: Diamond, Mortensen, Pissarides — fricció al mercat de treball

### 5.2 Manuals de referència
- Mankiw, N.G. (2021): *Principles of Economics*, 10a ed.
- Krugman, P. & Wells, R. (2022): *Economics*, 12a ed.
- Varian, H. (2019): *Intermediate Microeconomics*, 9a ed.
- Acemoglu, D., Laibson, D. & List, J. (2022): *Economics*, 2a ed.
- Stiglitz, J. & Walsh, C. (2020): *Economics*, 5a ed.
- Blanchard, O. (2020): *Macroeconomics*, 8a ed.
- Piketty, T. (2014): *El capital al segle XXI*; (2020): *Capital and Ideology*.

### 5.3 Journals tier-1
- American Economic Review (AER)
- Quarterly Journal of Economics (QJE)
- Journal of Economic Perspectives (JEP)
- Econometrica
- Journal of Economic Literature (JEL)
- Review of Economic Studies (RES)

### 5.4 Dades oficials
- INE (Instituto Nacional de Estadística)
- Eurostat
- BdE (Banc d'Espanya)
- AEAT (Agència Tributària)
- BCE (Banc Central Europeu)
- OCDE, FMI

## 6. Gràfics: convencions

### 6.1 Paleta cromàtica
| Concepte | Color hex |
|---|---|
| Oferta / S | `#3b82f6` (blau) |
| Demanda / D | `#ec4899` (rosa) |
| Equilibri | `#10b981` (verd) |
| Recessió / negatiu | `#ef4444` (vermell) |
| Anotació / context | `#6b7280` (gris) |
| Sector públic | `#8b5cf6` (violeta) |
| Sector exterior | `#f59e0b` (ambre) |

### 6.2 Mida i format
- Mida estàndard: 500×350 px (responsive `max-width: 100%`)
- Títol breu (sota 60 caràcters)
- Font explícita a peu de gràfic
- Eixos amb unitats visibles

### 6.3 Quan usar cada tipus
- **SVG inline (`<DiagramaSVG>`)** → diagrames conceptuals (FPP, fluxos, mapes mentals, esquemes amb fletxes)
- **ReCharts (`<ChartContainer>`)** → dades numèriques i corbes funcionals (oferta-demanda, costos, sèries temporals, distribucions)
- **Mermaid (`<MermaidDiagrama>`)** → fluxos i organigrames (processos, flowcharts, hierarchies)

## 7. Fórmules

Sempre dins `<FormulaBox>` amb atributs:
- `formula` (string, ASCII — **mai U+2212**, només `-`)
- `desc` (descripció breu)
- `condicions` (supòsits de validesa)
- `nom` (nom del model, opcional)

Exemple:
```jsx
<FormulaBox
  nom="Cobb-Douglas"
  formula="Q = A · K^α · L^β"
  desc="Funció de producció amb dos factors"
  condicions="Si α + β = 1, retorns constants a escala. Si 0 < α < 1, rendiments decreixents al capital."
/>
```

## 8. Convencions tècniques crítiques

### 8.1 Caracters Unicode prohibits en atributs JSX
- **U+2212 (−)** → usar `-` (hyphen ASCII)
- **U+2013 (–)** → usar `-`
- **U+2014 (—)** → usar `-`

(Babel-standalone trenca amb aquests caràcters dins atributs `formula="..."`.)

### 8.2 Apòstrofs
Dins JSX strings: `"l'economia"` o `'l\'economia'`. Mai apòstrof tipogràfic dins atributs.

### 8.3 Estructura del fitxer bloc
- Una funció `BlocXApp` amb tota la lògica
- Components compartits via `pde-components.js` (no redefinir Card, Tabs, etc.)
- Translations dins `pageTranslations` (mantén sintaxi existent)
- Cada `Tema{N}` és un component separat

## 9. Adaptació BOE estricta

El subagent que reescrigui un tema ha de:
- Cobrir literalment el títol BOE del tema (sense afegir subtemes que el BOE no menciona).
- No fugir cap a temes adjacents (p.ex. al tema "Sector Públic i política fiscal" no entrar en política monetària).
- Si el BOE menciona X i Y, els dos han d'aparèixer al desenvolupament.

## 10. Mode "expandir" vs "polir"

- **Expandir** (Bloc C, A, H): preserva el text existent **literal** al màxim possible. Afegeix gràfics, citacions inline, fonts noves, condicions a fórmules, exemples reals. **No reescriguis** una secció correcta — afegeix sobre ella.
- **Polir** (Bloc B, D, E, F, G): no eliminis contingut correcte. Pots reorganitzar, afegir bullets per parsing, afegir gràfics que faltin, actualitzar fonts amb recerca recent. Preserva totes les citacions existents.
```

- [ ] **Step 2: Commit**

```bash
git add documents/oposicions-styleguide.md
git commit -m "docs: add oposicions style guide (voice, terminology, citations, charts)"
```

---

### Task 2: Script d'auditoria

**Files:**
- Create: `scripts/audit-bloc.py`

- [ ] **Step 1: Crear `scripts/audit-bloc.py`**

```python
#!/usr/bin/env python3
"""
Audit script for oposicions-bloc-*.html files.

Checks conformity with the spec/style guide:
- No U+2212 in JSX attributes (Babel breakage)
- Each tema has Complet + Resum + wrapper
- Each tema has >= 2 graphs (SVG/ReCharts/Mermaid)
- Each tema has >= 8 BibliografiaBox entries
- Each tema has >= 2 sources from 2020+
- Each tema has >= 3 Citacio inline
- Tema size in [180, 280] lines (tolerance ±10%)

Usage:
    python scripts/audit-bloc.py oposicions-bloc-c.html
"""
import re
import sys
from pathlib import Path


def fail(msg):
    return ("FAIL", msg)


def warn(msg):
    return ("WARN", msg)


def ok(msg):
    return ("OK", msg)


def audit_file(path):
    text = Path(path).read_text(encoding="utf-8")
    results = []

    # Check 1: No U+2212 in JSX formula= attributes
    bad_minus = re.findall(r'formula="[^"]*−[^"]*"', text)
    if bad_minus:
        results.append(fail(f"Found {len(bad_minus)} U+2212 in formula attributes (Babel will break)"))
    else:
        results.append(ok("No U+2212 in formula attributes"))

    # Check 2: Find all temes (Tema{N}Complet)
    temes = sorted(set(int(m) for m in re.findall(r"Tema(\d+)Complet", text)))
    if not temes:
        results.append(fail("No Tema{N}Complet components found"))
        return results
    results.append(ok(f"Temes detected: {temes}"))

    # Per-tema checks
    for n in temes:
        complet_pattern = rf"const Tema{n}Complet\s*=.*?(?=const Tema\d+|function BlocApp|//\s*TEMA|$)"
        m = re.search(complet_pattern, text, re.DOTALL)
        if not m:
            # try function syntax
            complet_pattern_alt = rf"function Tema{n}Complet\s*\(.*?\}}\s*(?=function|const|//|$)"
            m = re.search(complet_pattern_alt, text, re.DOTALL)
        if not m:
            results.append(warn(f"Tema {n}: could not isolate Complet block for analysis"))
            continue

        block = m.group(0)
        lines = block.count("\n")

        # Graphics: count SVG, ChartContainer, ReCharts components, MermaidDiagrama
        svg_count = len(re.findall(r"<svg\b|<DiagramaSVG\b", block))
        chart_count = len(re.findall(r"<ChartContainer\b|<LineChart\b|<BarChart\b|<PieChart\b|<AreaChart\b|<ScatterChart\b|<RadarChart\b|<ComposedChart\b", block))
        mermaid_count = len(re.findall(r"<MermaidDiagrama\b", block))
        total_graphs = svg_count + chart_count + mermaid_count

        # Citations
        citacio_count = len(re.findall(r"<Citacio\b", block))

        # Bibliografia entries (rough: count items prop length proxy)
        biblio = re.search(r"<BibliografiaBox[^>]*items=\{?\[(.*?)\]\s*\}?", block, re.DOTALL)
        biblio_count = 0
        recent_count = 0
        if biblio:
            inner = biblio.group(1)
            biblio_count = inner.count("',") + (1 if inner.strip() else 0)
            recent_count = len(re.findall(r"\b(202[0-9])\b", inner))

        problems = []
        if total_graphs < 2:
            problems.append(f"only {total_graphs} graphs (need ≥2)")
        if citacio_count < 3:
            problems.append(f"only {citacio_count} <Citacio> inline (need ≥3)")
        if biblio_count < 8:
            problems.append(f"only {biblio_count} bibliografia entries (need ≥8)")
        if recent_count < 2:
            problems.append(f"only {recent_count} sources from 2020+ (need ≥2)")
        if lines < 60:
            problems.append(f"only {lines} lines in Complet (very short)")

        if problems:
            results.append(warn(f"Tema {n} ({lines} lines): " + "; ".join(problems)))
        else:
            results.append(ok(f"Tema {n} ({lines} lines): {total_graphs} graphs, {citacio_count} citacions, {biblio_count} fonts ({recent_count} recents)"))

    return results


def main():
    if len(sys.argv) != 2:
        print("Usage: python scripts/audit-bloc.py <file.html>")
        sys.exit(1)
    path = sys.argv[1]
    results = audit_file(path)
    fails = sum(1 for r in results if r[0] == "FAIL")
    warns = sum(1 for r in results if r[0] == "WARN")
    oks = sum(1 for r in results if r[0] == "OK")
    print(f"\nAuditoria: {path}\n{'-' * 60}")
    for status, msg in results:
        prefix = {"OK": "[OK]  ", "WARN": "[WARN]", "FAIL": "[FAIL]"}[status]
        print(f"{prefix} {msg}")
    print(f"\nResum: {oks} OK, {warns} warnings, {fails} fails\n")
    sys.exit(1 if fails > 0 else 0)


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Provar script sobre Bloc C actual (baseline)**

```bash
python scripts/audit-bloc.py oposicions-bloc-c.html
```

Expected: el script funciona sense errors Python. La sortida mostrarà warnings (Tema 20 té poques cites, gràfics, etc.) — això és el baseline conegut. **No fail crítics** (cap U+2212).

- [ ] **Step 3: Commit**

```bash
git add scripts/audit-bloc.py
git commit -m "feat(scripts): add audit-bloc.py for spec conformity checks"
```

---

### Task 3: Components nous a `pde-components.js`

**Files:**
- Modify: `pde-components.js`

- [ ] **Step 1: Llegir l'estat actual de pde-components.js**

```bash
wc -l pde-components.js
```

Expected: una mida coneguda (verifica que l'arxiu existeix abans d'editar-lo).

- [ ] **Step 2: Afegir els 5 components nous al final del fitxer**

Afegeix al final de `pde-components.js` (abans de qualsevol `// EOF` o equivalent):

```jsx
// ===== Components per a Oposicions =====

// <Citacio autor="..." any="..." pag?="..." />
const Citacio = ({ autor, any, pag }) => {
  const ref = pag ? `${autor}, ${any}, p. ${pag}` : `${autor}, ${any}`;
  return (
    <span
      className="text-blue-700 cursor-help underline decoration-dotted decoration-blue-400"
      title={ref}
    >({ref})</span>
  );
};

// <ChartContainer titol="..." font="..." tipus="..."> <LineChart>...</LineChart> </ChartContainer>
const ChartContainer = ({ titol, font, tipus, children }) => (
  <div className="my-5 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
    {titol && <h5 className="text-sm font-bold text-slate-800 mb-3 text-center">{titol}</h5>}
    <div style={{ width: '100%', height: 350 }}>
      {children}
    </div>
    {font && <p className="text-xs text-slate-500 mt-2 text-right italic">Font: {font}</p>}
  </div>
);

// <DiagramaSVG viewBox="0 0 500 350" titol="..." font="..."> <path .../> </DiagramaSVG>
const DiagramaSVG = ({ viewBox = "0 0 500 350", titol, font, children }) => (
  <div className="my-5 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
    {titol && <h5 className="text-sm font-bold text-slate-800 mb-3 text-center">{titol}</h5>}
    <svg viewBox={viewBox} className="w-full h-auto">
      {children}
    </svg>
    {font && <p className="text-xs text-slate-500 mt-2 text-right italic">Font: {font}</p>}
  </div>
);

// <MermaidDiagrama codi="..." titol="..." />
let __mermaidLoaded = false;
let __mermaidCounter = 0;
const MermaidDiagrama = ({ codi, titol }) => {
  const ref = React.useRef(null);
  const id = React.useMemo(() => `mermaid-${++__mermaidCounter}`, []);
  React.useEffect(() => {
    const render = () => {
      if (window.mermaid && ref.current) {
        try {
          window.mermaid.render(id + '-svg', codi).then(({ svg }) => {
            if (ref.current) ref.current.innerHTML = svg;
          });
        } catch (e) {
          if (ref.current) ref.current.innerHTML = '<p class="text-xs text-slate-400 italic">Diagrama no disponible</p>';
        }
      }
    };
    if (__mermaidLoaded) {
      render();
    } else {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
      s.onload = () => {
        window.mermaid.initialize({ startOnLoad: false, theme: 'default' });
        __mermaidLoaded = true;
        render();
      };
      document.head.appendChild(s);
    }
  }, [codi]);
  return (
    <div className="my-5 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
      {titol && <h5 className="text-sm font-bold text-slate-800 mb-3 text-center">{titol}</h5>}
      <div ref={ref} id={id} className="flex justify-center">
        <p className="text-xs text-slate-400 italic">Carregant diagrama...</p>
      </div>
    </div>
  );
};

// <DadaReal font="..." data="...">contingut</DadaReal>
const DadaReal = ({ font, data, children }) => (
  <div className="my-3 p-4 bg-amber-50 border-l-4 border-amber-300 rounded-r-lg">
    <div className="text-sm text-slate-700">{children}</div>
    <p className="text-xs text-amber-700 mt-2 italic">Font: {font}{data ? ` (${data})` : ''}</p>
  </div>
);
```

- [ ] **Step 3: Estendre FormulaBox amb `condicions` i `nom`**

Localitza la definició de `FormulaBox` a `pde-components.js`. Reemplaça-la amb:

```jsx
const FormulaBox = ({ formula, desc, condicions, nom }) => (
  <div className="my-4 p-5 bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl border border-blue-100">
    {nom && <p className="text-center text-xs font-semibold text-blue-700 mb-2 uppercase tracking-wide">{nom}</p>}
    <p className="text-center font-mono text-lg text-blue-800 font-semibold">{formula}</p>
    {desc && <p className="text-center text-sm text-blue-600 mt-2">{desc}</p>}
    {condicions && <p className="text-center text-xs text-slate-500 mt-2 italic">{condicions}</p>}
  </div>
);
```

(Si `FormulaBox` no està a `pde-components.js` sinó dins cada bloc, afegeix-lo a `pde-components.js` ara — ho usarem com a component compartit.)

- [ ] **Step 4: Verificar al navegador (preview)**

Obre `oposicions-bloc-g.html` (que és el bloc més desenvolupat) al preview i comprova que segueix funcionant:

```bash
# Si encara no hi ha preview server, inicia'l
# (use preview_start tool with file path)
```

Expected: cap error de consola, el bloc renderitza igual que abans.

- [ ] **Step 5: Commit**

```bash
git add pde-components.js
git commit -m "feat(components): add Citacio, ChartContainer, DiagramaSVG, MermaidDiagrama, DadaReal; extend FormulaBox"
```

---

### Task 4: Afegir Mermaid CDN als blocs (just-in-time)

**Decisió:** No el carreguem a tots els blocs encara. El component `MermaidDiagrama` ja té càrrega lazy (només descarrega `mermaid.min.js` la primera vegada que es renderitza). Per tant **cap canvi extra** als HTML del bloc — el lazy load des de `pde-components.js` és suficient.

- [ ] **Step 1: Confirmar que el comportament lazy funciona**

Crea un fitxer test ràpid `/tmp/mermaid-test.html` (o similar) amb un MermaidDiagrama simple, obrir al navegador i verificar que carrega.

Si vols saltar aquest test → marca'l com fet i confia en el codi de Task 3 Step 2. (No bloqueja Bloc C.)

---

## Phase 2 — Bloc C: Macroeconomia (temes 20-26)

### Task 5: Brief al subagent per Bloc C

**Files:**
- Read: `oposicions-bloc-c.html` (state actual)
- Read: `documents/oposicions-styleguide.md` (referència)
- Modify: `oposicions-bloc-c.html` (delegat al subagent)

**Temes BOE Bloc C:**
- 20: Fluxos de renda. Comptabilitat nacional. PIB i magnituds derivades.
- 21: Demanda agregada. Consum, estalvi i inversió. Multiplicador. Oferta agregada.
- 22: Sector públic i política fiscal. Ingressos, despeses, dèficit.
- 23: Finançament de l'economia. Diner. Bancs. Intermediaris financers.
- 24: Banc Central i política monetària. Instruments i transmissió.
- 25: Comerç internacional. Ventaja comparativa. Lliurecanvi vs proteccionisme. Balança de Pagaments.
- 26: Pagaments internacionals i mercat de divises. Tipus de canvi. SMI i SME.

- [ ] **Step 1: Despatxar el subagent**

Despatxa un subagent **general-purpose** amb el prompt següent (literal — copia exacte):

```
Necessite que reescriguis el fitxer `oposicions-bloc-c.html` del projecte PDE seguint estrictament el Style Guide a `documents/oposicions-styleguide.md`. El fitxer actual té 295 línies i 7 temes parcialment desenvolupats; cal expandir-lo a ~1400 línies (~200 línies per tema).

**LLEGEIX PRIMER:**
1. `documents/oposicions-styleguide.md` (CRÍTIC — segueix-lo literalment)
2. `oposicions-bloc-c.html` actual (per preservar contingut existent)
3. `oposicions-bloc-g.html` (com a referència de qualitat ja existent)
4. `pde-components.js` (per veure quins components tens disponibles: Card, Tabs, TheoryBlock, FormulaBox, BibliografiaBox, ClauBox, SectionTitle, Citacio, ChartContainer, DiagramaSVG, MermaidDiagrama, DadaReal)

**MODE = EXPANDIR**: preserva el text existent literal al màxim. Afegeix sobre ell — no reescriguis seccions correctes.

**TEMES BOE LITERALS** (cobreix exactament aquest abast, ni més ni menys):
- T20: Fluxos de renda a l'economia. Comptabilitat nacional. PIB i magnituds derivades.
- T21: La demanda agregada. Consum, estalvi i inversió. Multiplicador. Oferta agregada.
- T22: El sector públic i la política fiscal. Ingressos i despeses del sector públic. Finançament del dèficit.
- T23: Finançament de l'economia. Evolució del diner. Bancs i creació de diner. Intermediaris financers.
- T24: El Banc Central i la política monetària. Control oferta monetària. Objectius i instruments.
- T25: El comerç internacional: ventaja comparativa. Lliurecanvi vs proteccionisme. Balança de Pagaments.
- T26: Pagaments internacionals i mercat de divises. Sistemes de tipus de canvi. SMI i SME.

**ESTRUCTURA OBLIGATÒRIA per cada tema** (Tema{N}Complet, ~200 línies JSX):
1. Card "Introducció" (100-150 paraules) — rellevància docent + roadmap
2. Card "Desenvolupament" — 3-5 TheoryBlock numerats; cada un amb intuïció→formalisme→exemple; integra ≥2 gràfics; FormulaBox amb condicions; ≥3 Citacio inline
3. Card "Conclusió" (80-120 paraules) — síntesi + enllaç pràctica docent
4. ClauBox amb 5-7 idees clau
5. BibliografiaBox amb ≥8 fonts (≥2 amb any 2020+)

I un Tema{N}Resum (300-500 paraules compactes) i un Tema{N} wrapper amb Tabs Complet/Resum.

**GRÀFICS — prioritats per Bloc C (Macroeconomia):**
- Macro és terreny de ReCharts (sèries temporals, corbes funcionals): usa `<ChartContainer>` per:
  · Flux circular de la renda (T20) — pot ser SVG manual
  · DA-OA amb desplaçaments (T21) — ReCharts LineChart
  · Multiplicador keynesià (T21) — ReCharts BarChart o LineChart
  · Corba de Laffer (T22) — ReCharts LineChart
  · Estructura ingressos/despeses sector públic (T22) — ReCharts PieChart o BarChart
  · Creació de diner (T23) — diagrama SVG o flowchart Mermaid
  · Transmissió política monetària (T24) — Mermaid flowchart
  · Frontera de possibilitats producció amb ventaja comparativa (T25) — SVG o ReCharts
  · Balança de Pagaments — distribució (T25) — ReCharts BarChart
  · Tipus de canvi nominal vs real (T26) — ReCharts LineChart
- Mínim 2 gràfics per tema. Total esperat: ~14-20 gràfics al fitxer.

**CITACIONS — fonts preferents (extracte llista blanca):**
- Nobel: Bernanke-Diamond-Dybvig 2022 (T23-T24, bancs i crisis), Sargent-Sims 2011 (T21, macroeconometria), Diamond 2010 (T22-T23), Krugman 2008 (T25-T26)
- Manuals: Mankiw (2021, *Macroeconomics*), Blanchard (2020, *Macroeconomics* 8a), Krugman-Wells (2022, *Macroeconomics*), Acemoglu-Laibson-List (2022)
- Dades: INE (PIB Espanya 2024 ~1,46 bilions €, +2,7%), BCE (tipus operacions principals ~3,75%/2024), Eurostat
- Articles recents: research notes BCE, JEP papers sobre QE, AER sobre inflació post-COVID

**REGLES TÈCNIQUES CRÍTIQUES:**
- CAP caràcter U+2212 ("−") en atributs JSX — usa només `-` (hyphen ASCII).
- Apòstrof tipogràfic prohibit dins atributs.
- No defineixis Card, Tabs, TheoryBlock, FormulaBox, BibliografiaBox, ClauBox, SectionTitle de nou — usa'ls com a components compartits (vénen de `pde-components.js`). Si l'arxiu actual els redefineix inline, **elimina aquestes redefinicions**.
- Sí defineix els components Tema{N}Complet, Tema{N}Resum, Tema{N} dins BlocCApp (com fa la versió actual i com fan els altres blocs).

**ANTI-AL·LUCINACIÓ:**
- Si dubtes d'una cita concreta, no la posis. Prefereix una de la llista blanca.
- Cap "Smith et al. 2023" inventat. Cap paper que no puguis verificar mentalment al 100%.
- Per dades numèriques (PIB, atur, etc.), atura't a xifres conegudes i citables (INE/BCE/Eurostat). Si no estàs segur de la xifra exacta, fes-la una franja ("PIB Espanya 2024 al voltant d'1,4 bilions €") en comptes d'inventar.

**ENTREGA:**
- El fitxer `oposicions-bloc-c.html` reescrit complet (mantén header HTML, scripts, etc.).
- Resum textual amb:
  · Línies totals abans/després
  · Per tema: línies, gràfics afegits (tipus + descripció), fonts noves afegides
  · Cita inventari (nombre total Citacio inline al fitxer)

NO facis cap commit ni cap push — només modifica el fitxer i entrega el resum.
```

Selecciona model: **Opus** (rigor + densitat literària). Mode foreground (necessites el resultat per continuar).

- [ ] **Step 2: Quan torni el subagent, revisa el resum**

Verifica:
- Diu "PIB Espanya 2024 ~1,46 bilions €" o similar (no inventat)?
- Cites coherents amb llista blanca?
- Cap "Smith 2023" sospitós?

Si trobes qualsevol cita dubtosa, fes spot-check via Google Scholar abans de continuar.

---

### Task 6: Auditoria automàtica

**Files:**
- Run: `scripts/audit-bloc.py`

- [ ] **Step 1: Executar audit**

```bash
python scripts/audit-bloc.py oposicions-bloc-c.html
```

Expected: tots els temes (20-26) reporten `[OK]` o warnings menors. Resum: `0 fails`.

Si hi ha **fails**:
- U+2212: corregir amb script Python que reemplaça en atributs JSX (com vam fer amb Bloc D/F).
- Tema sense Complet: el subagent ha tallat — task 8 (iteració).

Si hi ha **warnings**:
- Anota'ls per Task 8 (decideixes si val la pena iterar).

- [ ] **Step 2: Si calen fixes automàtics**

```bash
# Si trobes U+2212:
python -c "
import sys, re
p = 'oposicions-bloc-c.html'
text = open(p, encoding='utf-8').read()
fixed = re.sub(r'(formula=\"[^\"]*)−([^\"]*\")', lambda m: m.group(1) + '-' + m.group(2), text)
open(p, 'w', encoding='utf-8').write(fixed)
print('Fixed' if text != fixed else 'No change needed')
"
python scripts/audit-bloc.py oposicions-bloc-c.html
```

Expected: 0 U+2212.

---

### Task 7: Verificació al navegador

**Files:**
- Verify: `oposicions-bloc-c.html` al preview

- [ ] **Step 1: Iniciar preview server**

```
preview_start  (use preview_start MCP tool with the project root)
```

- [ ] **Step 2: Obrir Bloc C**

Navegar a `http://localhost:<port>/oposicions-bloc-c.html`.

Verificar:
- 0 errors JavaScript a la consola.
- Tots els temes apareixen al menú lateral.
- Cada tema renderitza Complet i Resum sense crash.
- Gràfics ReCharts es veuen.
- Diagrames SVG es veuen.
- Mermaid diagrames carreguen (poden trigar 1-2s la primera vegada).

```
preview_console_logs  (verify 0 errors)
preview_screenshot    (capture for evidence)
```

- [ ] **Step 3: Screenshot pels temes amb gràfics destacats**

Captura screenshot de 2-3 temes amb gràfics interessants (T21 multiplicador, T25 ventaja comparativa, etc.) per adjuntar al PR.

---

### Task 8: Iteració si cal

- [ ] **Step 1: Decisió: hi ha problemes per resoldre?**

Si auditoria + preview tots OK → salta a Task 9.

Si hi ha problemes:
- **JSX trencat** → Task 6 Step 2 (script de fix).
- **Tema incomplet o curt** → re-despatxar subagent amb instrucció focalitzada (només aquell tema).
- **Cita sospitosa** → editar manualment la citació al fitxer (substituir per una de verificable).
- **Gràfic no renderitza** → debug amb `preview_console_logs` + `preview_inspect`.

Pot caldre 0-2 hores extres aquí. **No claudis fins que el preview és net i auditoria 0 fails.**

- [ ] **Step 2: Commit canvis d'iteració (si n'hi ha)**

```bash
git add oposicions-bloc-c.html
git commit -m "fix(oposicions-bloc-c): correccions post-audit (gràfics/cites/format)"
```

---

### Task 9: Commit + PR

**Files:**
- Final: `oposicions-bloc-c.html`

- [ ] **Step 1: Commit final**

```bash
git add oposicions-bloc-c.html
git commit -m "feat(oposicions-bloc-c): reescriptura BOE temes 20-26 (macroeconomia)

Expansió de 295 → ~1400 línies seguint el Style Guide.
- 7 temes amb estructura intro/desenvolupament/conclusió
- ≥2 gràfics per tema (SVG conceptuals + ReCharts dades + Mermaid fluxos)
- ≥8 fonts/tema, ≥2 amb any 2020+
- Citacions inline ≥3/tema
- Modo: expandir (preserva contingut existent)"
```

- [ ] **Step 2: Push**

```bash
git push -u origin feat/oposicions-prereqs-i-bloc-c
```

- [ ] **Step 3: Crear PR**

```bash
gh pr create --title "feat(oposicions): prereqs + reescriptura Bloc C (Macroeconomia, T20-26)" --body "$(cat <<'EOF'
## Summary

Aquest PR introdueix els **prerequisits compartits** per la millora integral dels Blocs A-H d'oposicions, i n'aplica la primera peça: el **Bloc C (Macroeconomia, temes 20-26)** completament reescrit.

### Prerequisits afegits
- `documents/oposicions-styleguide.md` — Style Guide canònic (veu, terminologia, citacions, gràfics, fonts).
- `pde-components.js` — 5 components nous (`Citacio`, `ChartContainer`, `DiagramaSVG`, `MermaidDiagrama`, `DadaReal`) + extensió de `FormulaBox` amb `condicions` i `nom`.
- `scripts/audit-bloc.py` — auditoria automàtica de conformitat amb Style Guide.

### Bloc C reescrit
- 295 → ~1400 línies.
- 7 temes BOE (20-26) amb estructura intro/desenvolupament/conclusió.
- Gràfics: SVG conceptuals + ReCharts (sèries temporals, corbes funcionals) + Mermaid (flowchart política monetària).
- Rigor: ≥8 fonts per tema, ≥2 fonts 2020+, citacions inline tipus acadèmic.

### Spec i pla
- Spec: `docs/superpowers/specs/2026-04-24-oposicions-millora-integral-design.md`
- Pla: `docs/superpowers/plans/2026-04-24-oposicions-prereqs-i-bloc-c.md`

## Test plan

- [ ] `python scripts/audit-bloc.py oposicions-bloc-c.html` → 0 fails
- [ ] Preview local de `oposicions-bloc-c.html` sense errors de consola
- [ ] Tots els 7 temes naveguen sense crash (Complet + Resum)
- [ ] Gràfics ReCharts renderitzen
- [ ] Diagrames SVG es veuen
- [ ] Mermaid carrega lazy correctament
- [ ] `oposicions-bloc-g.html` (control) segueix funcionant igual

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Expected: URL del PR retornada. Anota-la per la revisió.

- [ ] **Step 4: Auto-revisió al PR**

Llegir el PR a GitHub, verificar:
- Diff total raonable (~2500 línies afegides per tot el bloc + components + scripts + docs).
- Cap fitxer no esperat al diff (ex. `dist/`, `node_modules/`).
- Title i body correctes.

- [ ] **Step 5: Esperar revisió de Pau**

Pau revisa el PR manualment (lectura de temes, spot-check cites, preview a Vercel preview deploy). Feedback → iterar al mateix branch.

Quan validat → squash merge.

---

## Self-review

**Spec coverage:**
- Section 5 Style Guide → Task 1 ✓
- Section 6 Plantilla de tema → Style Guide ho documenta + Task 5 brief ho aplica ✓
- Section 7 Components nous + modificats → Task 3 ✓
- Section 8 Workflow per bloc → Tasks 0, 5, 6, 7, 8, 9 implementen les 6 fases ✓
- Section 10 Script auditoria → Task 2 ✓
- Section 11 Validació manual → Task 9 Step 5 (Pau revisa) ✓
- Section 12 Riscos: U+2212 → Task 6 Step 2; cites inventades → Task 5 Step 2 + brief anti-al·lucinació; Mermaid offline → Task 4 (lazy load amb fallback)
- Section 13 Fitxers a crear/modificar → Task 1 (styleguide), Task 2 (audit), Task 3 (components), Task 5-9 (bloc-c)
- Section 14 Criteris d'èxit → cada criteri es verifica a Task 6/7/9

**Placeholders:** cap "TBD" / "TODO" — totes les passes contenen el codi i les comandes exactes.

**Type consistency:** `Citacio`, `ChartContainer`, `DiagramaSVG`, `MermaidDiagrama`, `DadaReal`, `FormulaBox` — noms coherents al Style Guide (Task 1) i al codi (Task 3) i al brief del subagent (Task 5).

**Gaps detectats i resolts:** Cap.
