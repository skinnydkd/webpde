# Disseny: Millora integral dels Blocs A–H d'oposicions

**Data:** 2026-04-24
**Autor:** Pau (amb Claude)
**Estat:** Disseny validat — pendent pla d'execució
**Scope:** 71 temes teòrics BOE repartits en 8 blocs (A–H). Exclou exercicis pràctics.

---

## 1. Context i motivació

La plataforma PDE (https://profedeeconomia.es) conté la preparació completa de les oposicions de professorat d'Economia, amb 71 temes BOE distribuïts en 8 fitxers HTML (oposicions-bloc-a.html a oposicions-bloc-h.html) i un fitxer separat de pràctica (oposicions-practica.html, 60 exercicis).

Auditoria prèvia revela desigualtats severes:

| Fitxer | Temes | Línies | Línies/tema | SVG | ReCharts | FormulaBox | BibliografiaBox |
|---|---:|---:|---:|---:|---:|---:|---:|
| bloc-a.html | 10 | 457 | ~46 | 0 | 0 | 4 | 10 |
| bloc-b.html | 9 | 1.172 | ~130 | 8 | 0 | 14 | 9 |
| bloc-c.html | 12 | 295 | ~25 | 0 | 0 | 3 | 7 |
| bloc-d.html | 8 | 1.307 | ~163 | 0 | 0 | 7 | 11 |
| bloc-e.html | 10 | 2.499 | ~250 | 4 | 0 | 27 | 11 |
| bloc-f.html | 9 | 1.784 | ~198 | 0 | 0 | 40 | 8 |
| bloc-g.html | 7 | 2.168 | ~310 | 13 | 0 | 16 | 9 |
| bloc-h.html | 6 | 302 | ~50 | 0 | 0 | 2 | 6 |

**Problemes identificats:**

1. **Densitat desigual** (10× entre Bloc C i Bloc G).
2. **Blocs infra-desenvolupats**: C (25 lín/tema), H (50), A (46).
3. **ReCharts carregat però mai usat**: el CDN es descarrega a tots els fitxers, 0 components s'invoquen.
4. **Només 25 SVG inline en tot el projecte** (concentrats a G, B, E).
5. **Rigor heterogeni**: Bloc E té 27 FormulaBox, Bloc C només 3.

## 2. Objectius

Millora integral bloc per bloc respectant quatre eixos:

1. **Gràfics** — ≥ 2 per tema, combinant SVG (conceptuals), ReCharts (dades) i Mermaid (fluxos). ~142 gràfics totals.
2. **Escriptura** — precisió terminològica, estructura opositor (intro/desenvolupament/conclusió), parsing amb bullets i subseccions, veu única rigorosa-pedagògica.
3. **Rigor científic "publicable"** — recerca recent (2020–2026), citacions inline tipus acadèmic, precisió formal amb condicions i supòsits, dades reals espanyoles/europees.
4. **Uniformitat** — target ~180–220 línies JSX per tema. Blocs densos (E, F, G) reben polida + gràfics; blocs flacs (C, H, A) expandeixen fins al target.

**Fora d'scope:**
- Exercicis pràctics (`oposicions-practica.html`): es mantenen tal com estan.
- App d'estudi (`oposicions-estudiar.html`): no es toca.

## 3. Ordre d'execució

Prioritat per desigualtat:

```
C → H → A → B → D → E → F → G
```

Justificació: els tres primers (C, H, A) són els més sub-desenvolupats i requereixen més feina. Els restants (B–G) només polida i gràfics.

## 4. Enfocament: Bloc-holístic

Cada bloc es tracta com una **unitat editorial**. Un subagent per bloc (o per meitat, si >8 temes) reescriu tots els seus temes garantint coherència intra-bloc:

- Mateixes metàfores al llarg del bloc.
- Referències creuades entre temes del mateix bloc.
- Progressió narrativa dins del bloc.

Descartats:
- **Template-first industrial**: massa rígid per rigor "publicable".
- **Tema-artesà individual**: ~71 iteracions, inviable.

## 5. Style Guide (`documents/oposicions-styleguide.md`)

Document nou amb:

### 5.1 Veu
Tercera persona impersonal, rigorosa però accessible. Exemples inline de frases idònies vs. evitables.

### 5.2 Terminologia canònica
Glossari breu amb formes preferents:
- "producte interior brut" (no "producte nacional brut" excepte quan es vol contrast)
- "economia de mercat" ≠ "capitalisme" (distinció explícita)
- "oferta/demanda agregades" en context macro
- "fallades de mercat" (no "falles")
- etc.

### 5.3 Citacions
Format inline `(Cognom, any, p.XX)` o `(Cognom et al., any)` per >2 autors. Tots els inline es correspondent amb una entrada al `<BibliografiaBox>` del mateix tema.

### 5.4 Fonts preferents (llista blanca)
- **Nobel 2010–2026**: Acemoglu-Johnson-Robinson (2024), Goldin (2023), Bernanke-Diamond-Dybvig (2022), Card-Angrist-Imbens (2021), Milgrom-Wilson (2020), Banerjee-Duflo-Kremer (2019), Nordhaus-Romer (2018), Thaler (2017), Hart-Holmström (2016), Deaton (2015), Tirole (2014), Fama-Hansen-Shiller (2013), Roth-Shapley (2012), Sargent-Sims (2011), Diamond-Mortensen-Pissarides (2010).
- **Journals tier-1**: AER, QJE, JEP, Econometrica, JEL, RES.
- **Manuals referència**: Mankiw (10a ed., 2021), Krugman (12a ed., 2022), Varian (9a ed., 2019), Acemoglu (2a ed., 2022), Stiglitz (2020), Piketty (2014, 2020).
- **Dades oficials**: INE, Eurostat, BdE, AEAT, BCE, OCDE, FMI.

### 5.5 Gràfics: conventions
- Paleta:
  - Oferta: blau `#3b82f6`
  - Demanda: rosa `#ec4899`
  - Equilibri: verd `#10b981`
  - Recessió: vermell `#ef4444`
  - Neutral/anotació: gris `#6b7280`
- Mida estàndard: 500×350 px
- Títols breus, font explícita a peu de gràfic
- SVG per conceptuals (FPP, fluxos, diagrames mentals), ReCharts per dades (sèries, corbes funcionals), Mermaid per fluxos (organigrames, processos)

## 6. Plantilla de tema (fixa)

```jsx
function Tema{N}Complet() {
  return (
    <>
      {/* Card 1: Introducció — 100-150 paraules */}
      <Card titol="Introducció">
        - Per què el tema importa (rellevància docent)
        - Roadmap del desenvolupament
      </Card>

      {/* Card 2: Desenvolupament — el cos del tema */}
      <Card titol="Desenvolupament">
        <TheoryBlock titol="2.1 Primera idea">
          intuïció → formalisme → exemple
          <Citacio autor="..." any="..." />
          <FormulaBox formula="..." condicions="..." />
          <ChartContainer> ... </ChartContainer>
        </TheoryBlock>
        {/* 3-5 TheoryBlocks numerats */}
      </Card>

      {/* Card 3: Conclusió — 80-120 paraules */}
      <Card titol="Conclusió">
        - Síntesi
        - Enllaç amb pràctica docent
      </Card>

      <ClauBox idees={[...5-7 idees...]} />
      <BibliografiaBox fonts={[...≥8 fonts...]} />
    </>
  );
}

function Tema{N}Resum() {
  return (
    <Card>...300-500 paraules compactes...</Card>
  );
}

function Tema{N}({ mode }) {
  return mode === 'resum' ? <Tema{N}Resum /> : <Tema{N}Complet />;
}
```

**Mida target**: 180–220 línies JSX per tema (incloent els dos components i el wrapper).

## 7. Components React nous/modificats

### 7.1 Nous

**`<Citacio autor any pag>`** — Renderitza `(Cognom, any, p.XX)` amb tooltip on hover que mostra l'entrada completa; clic scroll a BibliografiaBox.

**`<ChartContainer titol font tipus>`** — Wrapper ReCharts amb paleta standard, peu de font, responsive, títol uniforme.

**`<DiagramaSVG viewBox titol font>`** — Wrapper SVG amb mateix estil de títol/peu que ChartContainer (consistència visual SVG↔ReCharts).

**`<MermaidDiagrama codi titol>`** — Renderitzat Mermaid lazy (carrega mermaid.js via CDN només quan apareix al DOM). Fallback si mermaid.js no carrega: missatge "Diagrama no disponible".

**`<DadaReal font data>`** — Caixeta de destaque per dades oficials (fons ambre subtil, peu amb font i data).

### 7.2 Modificacions

**`<BibliografiaBox>`** — Categoritzacions per pestanyes: Clàssics / Manuals / Journals / Dades.

**`<FormulaBox>`** — Nous atributs `condicions`, `nom`, `supòsits`.

### 7.3 Factorització
Components s'afegeixen a un fitxer **nou** `pde-components-oposicions.js` (o s'integren a `pde-components.js` si compatibilitat garantida). Tots els fitxers bloc l'inclouen via `<script>`.

## 8. Workflow per bloc

### Fase 0 — Preparació
- Revisar temari BOE dels temes del bloc.
- Llegir el fitxer bloc actual.
- Crear branca `feat/oposicions-bloc-X-millora`.

### Fase 1 — Brief al subagent
Brief inclou:
- Referència a `documents/oposicions-styleguide.md` (llegit complet).
- Títols BOE literals dels temes del bloc.
- Plantilla de tema (Secció 6).
- Llista de components (Secció 7).
- Exemples inline de 2-3 estructures tipus.
- Criteris específics del bloc (ex: "Bloc C macroeconomia → prioritza ReCharts per sèries temporals; Bloc G organització → prioritza Mermaid").

### Fase 2 — Delegació
Subagent (Opus o Sonnet segons complexitat) rep accés complet de lectura. Entrega:
- Fitxer bloc sencer reescrit.
- Resum de canvis per tema.
- Inventari de gràfics creats.
- Inventari de fonts afegides.

### Fase 3 — Validació local
- Obrir al Preview local.
- Verificar 0 errors Babel/consola.
- Navegar tots els temes (render OK, gràfics visibles, responsive).
- Executar `scripts/audit-bloc.py` i revisar output.

### Fase 4 — Commit + PR
- Commit amb format convencional.
- Push i `gh pr create` amb descripció detallada (inventari canvis, gràfics, fonts).

### Fase 5 — Revisió teva manual
- Pau llegeix el PR.
- Feedback → Fase 6 si cal.

### Fase 6 — Iteració
- Canvis en el mateix branch fins a validació final.
- Merge squash.

### Contingut existent a C/H/A: **EXPANDIR**
Per a blocs infra-desenvolupats, el subagent **preserva** el text existent i l'expandeix. No reescriu des de zero. Per a blocs B–G (només polida): "millora sense eliminar contingut correcte — preserva citacions i fórmules existents".

## 9. Mapa bloc → sessions

| Bloc | Temes | Línies actuals | Línies target | Sessions |
|---|---:|---:|---:|---:|
| **C** (20–26) | 7 | 295 | ~1400 | 1–2 |
| **H** (66–71) | 6 | 302 | ~1200 | 1 |
| **A** (1–10) | 10 | 457 | ~2000 | 2 |
| **B** (11–19) | 9 | 1172 | ~1800 | 1 (polida) |
| **D** (27–37) | 11 | 1307 | ~2200 | 1 (polida) |
| **E** (38–48) | 11 | 2499 | ~2200 | 1 (polida) |
| **F** (49–56) | 8 | 1784 | ~1800 | 1 (polida) |
| **G** (57–65) | 9 | 2168 | ~1800 | 1 (polida) |
| **TOTAL** | 71 | ~10.000 | ~14.400 | **9–10** |

Cada bloc genera **1 PR**. Entre sessions del mateix bloc la branca es manté viva; merge només quan el bloc està complet i validat.

## 10. Validació automàtica: `scripts/audit-bloc.py`

Script Python (~100 línies) que llegeix un fitxer bloc i reporta per tema:

| Verificació | Criteri |
|---|---|
| Babel compilability | 0 U+2212 (Unicode minus) en atributs JSX |
| Temes presents | Tots els temes BOE tenen `<Tema{N}Complet>` i `<Tema{N}Resum>` |
| Estructura plantilla | ≥ 3 Cards (Intro, Des., Concl.) + ClauBox + BibliografiaBox |
| Gràfics mínims | ≥ 2 gràfics per tema (SVG + ReCharts + Mermaid) |
| Fonts mínimes | ≥ 8 entrades BibliografiaBox |
| Fonts recents | ≥ 2 fonts amb any ≥ 2020 |
| Citacions inline | ≥ 3 ocurrències `<Citacio>` per tema |
| Fórmules completes | Totes les `<FormulaBox>` tenen `condicions` on escaigui |
| Mida per tema | 180 ≤ línies ≤ 280 (tolerància ±10%) |

Output: taula per tema amb ✅/❌ + warnings.

## 11. Validació manual (post-PR)

Checklist que Pau aplica a cada PR:
1. **Adequació BOE** — cobreix l'abast literal, ni curt ni amb fugides.
2. **Rigor** — afirmacions dubtoses? cites inventades?
3. **Pedagogia** — progressió intuïció→formalisme→exemple funciona?
4. **Gràfics** — llegibles, ben etiquetats, afegeixen valor.
5. **Preview** — 0 errors al navegador.

**Spot-check cites**: 2-3 cites aleatòries per tema via Google Scholar.

## 12. Gestió de riscos

| Risc | Mitigació | Recuperació |
|---|---|---|
| Subagent talla a meitat | Rang de temes limitats (≤ 8 per subagent); resum indica on talla | Següent sessió reprèn des del tall |
| JSX trencat (Unicode, etc.) | Brief explícit + exemples; script audit | Fix automàtic via script Python |
| Estil inconsistent entre blocs | Style Guide literal al brief | Sessió d'harmonització post 3 blocs |
| Cites inventades | Llista blanca + instrucció "conservador o elimina" | Spot-check manual + correcció via PR |
| Desviació del BOE | Títols BOE literals al brief | Revisió manual de Pau |
| Mermaid trenca offline | Ús selectiu + fallback | Component mostra missatge gracefull |
| Fitxer massa gran per Vercel/Git | Límit ~2400 línies per bloc | Split `oposicions-bloc-c-part1/2` (improbable) |

### Rollback
- Cada bloc = una branca independent. Si un merge resulta problemàtic → `git revert` del merge commit.
- Tags intermedis: `v-oposicions-bloc-{X}-stable` per punt de retorn conegut bo.

## 13. Fitxers a crear/modificar

| Fitxer | Acció |
|---|---|
| `documents/oposicions-styleguide.md` | **CREAR** |
| `pde-components-oposicions.js` (o afegir a `pde-components.js`) | **CREAR/EXTENDRE** |
| `scripts/audit-bloc.py` | **CREAR** |
| `oposicions-bloc-a.html` | **EXPANDIR** (~457 → ~2000 lín) |
| `oposicions-bloc-b.html` | **POLIR** (1172 → ~1800 lín) |
| `oposicions-bloc-c.html` | **EXPANDIR** (295 → ~1400 lín) |
| `oposicions-bloc-d.html` | **POLIR** (1307 → ~2200 lín) |
| `oposicions-bloc-e.html` | **POLIR** (2499 → ~2200 lín) |
| `oposicions-bloc-f.html` | **POLIR** (1784 → ~1800 lín) |
| `oposicions-bloc-g.html` | **POLIR** (2168 → ~1800 lín) |
| `oposicions-bloc-h.html` | **EXPANDIR** (302 → ~1200 lín) |
| `oposicions-practica.html` | **INTACTE** |
| `oposicions-estudiar.html` | **INTACTE** |

## 14. Criteris d'èxit

El projecte es considera completat quan:

- [ ] Tots els 71 temes tenen l'estructura intro/desenvolupament/conclusió.
- [ ] ≥ 2 gràfics per tema (~142 totals mínim).
- [ ] ≥ 8 fonts per BibliografiaBox, amb ≥ 2 de 2020+.
- [ ] ≥ 3 `<Citacio>` inline per tema.
- [ ] Script `audit-bloc.py` passa en tots els fitxers (0 errors crítics).
- [ ] 8 PRs fusionats (un per bloc).
- [ ] Preview local 0 errors a tots els blocs.
- [ ] Style Guide publicat i enllaçat des del README del projecte.

## 15. Següent pas

Invocar la skill `writing-plans` per produir un **pla d'execució operatiu** amb la primera sessió (Bloc C, temes 20–25 o bloc sencer) com a primera peça.
