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
| funció de producció | tecnologia de producció | "Tecnologia" només per al concepte amplat |
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
