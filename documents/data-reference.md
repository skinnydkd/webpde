# Data Reference — PDE

Documentació de fórmules, càlculs i relacions de dades dels simuladors.

---

## Simuladors i les Seues Fórmules

### Interès Compost (`finances.html`)
```
VF = VP × (1 + r/n)^(n×t)

VF  = Valor Final
VP  = Capital inicial (Principal)
r   = Taxa d'interès anual (decimal)
n   = Nombre de capitalitzacions per any
t   = Temps en anys
```

### Punt de Mort / Break-Even (`empresa.html`)
```
Q_breakeven = CF / (PVU - CVU)

CF  = Costos Fixes totals
PVU = Preu de Venda Unitari
CVU = Cost Variable Unitari
Marge de contribució = PVU - CVU
```

### VAN — Valor Actual Net (`empresa.html`)
```
VAN = -I₀ + Σ [FC_t / (1 + r)^t]

I₀   = Inversió inicial
FC_t = Flux de caixa del període t
r    = Taxa de descompte (cost de capital)
t    = Período (1, 2, ..., n)

Criteri: VAN > 0 → invertir; VAN < 0 → rebutjar
```

### TIR — Taxa Interna de Retorn (`empresa.html`)
```
0 = -I₀ + Σ [FC_t / (1 + TIR)^t]

La TIR és la r que fa VAN = 0 (calcul iteratiu)
Criteri: TIR > cost de capital → invertir
```

### Ràtios Financeres (`empresa.html`)
```
Liquiditat Corrent   = Actiu Corrent / Passiu Corrent    (>1 bo, >2 molt bo)
Acid Test (Ràpid)    = (Actiu Corrent - Existències) / Passiu Corrent
Solvència            = Actiu Total / Passiu Total         (>1.5 recomanat)
Endeutament          = Passiu Total / Patrimoni Net       (<1 conservador)
ROE                  = Benefici Net / Patrimoni Net       (× 100 = %)
ROA                  = Benefici Net / Actiu Total         (× 100 = %)
Marge Net            = Benefici Net / Vendes              (× 100 = %)
```

### Elasticitat (`economia.html`)
```
Elasticitat Preu Demanda (EPD):
  EPD = (ΔQ/Q) / (ΔP/P)  = (ΔQ × P) / (ΔP × Q)

  |EPD| > 1  → Demanda elàstica (sensible al preu)
  |EPD| = 1  → Elasticitat unitària
  |EPD| < 1  → Demanda inelàstica

Elasticitat Renda:
  ER = (ΔQ/Q) / (ΔR/R)

  ER > 0 → Bé normal
  ER < 0 → Bé inferior
  ER > 1 → Bé de luxe
```

### Model IS-LM (`economia.html`)
```
Corba IS: Y = C(Y-T) + I(r) + G
  Y = renda, C = consum, T = impostos, I = inversió, r = interès, G = gast públic

Corba LM: M/P = L(r, Y)
  M = oferta monetaria, P = nivell de preus, L = demanda de diners

Equilibri: intersecció IS-LM → (Y*, r*)
```

### Teoria de Jocs — Nash (`economia.html`)
```
Dilema del Presoner (payoff matrix):
          Cooperar    Trair
Cooperar  (3,3)       (0,5)
Trair     (5,0)       (1,1)

Nash Equilibri: (Trair, Trair) = (1,1) — subòptim però estable
Òptim de Pareto: (Cooperar, Cooperar) = (3,3)
```

### Calculadora de Nòmina (`vidapractica.html`)
```
Salari Brut = Salari Base + Complements
Cotització treballador SS ≈ 6.35% del brut (aprox. 2024)
Retenció IRPF = variable (taules AEAT, aprox. 15-30%)
Salari Net = Brut - Cotització SS - Retenció IRPF
```

### Simulador d'Hipoteca (`vidapractica.html`)
```
Quota mensual (sistema francès):
  C = P × [r(1+r)^n] / [(1+r)^n - 1]

  C = quota mensual
  P = capital (principal)
  r = tipus d'interès mensual (TAE anual / 12)
  n = nombre de quotes (anys × 12)

Total pagat = C × n
Total interessos = Total pagat - P
```

### IRPF Simplificat (`vidapractica.html`)
```
Base Imposable = Rendiments Treball - Reducció (mínim personal)
Escales 2024 (aproximades):
  Fins 12.450€    → 19%
  12.450 - 20.200 → 24%
  20.200 - 35.200 → 30%
  35.200 - 60.000 → 37%
  60.000 - 300.000→ 45%
  > 300.000       → 47%

Quota = Aplicar cada tram progressivament
Deduint retencions ja practicades = Resultat declaració
```

### Valor Esperat (`ferramentes.html`)
```
VE = Σ (Probabilitat_i × Resultat_i)

Exemple:
  70% × 100€ + 30% × (-50€) = 70 - 15 = 55€

Si VE > 0 → acció favorable esperada
```

---

## Persistència (LocalStorage)

| Clau | Pàgina | Contingut |
|------|--------|-----------|
| `pde_scores` | playground.html | Array de puntuacions TOP 10 |
| `pde_ranking` | concurs.html | Array de resultats concurs |
| `pde_lang` | global | Idioma seleccionat ('val'/'es'/'en') |

---

## Estructura de Dades: Rankings

```javascript
// Playground / Concurs — TOP 10
[
  { nom: "Pau", punts: 1500, data: "2026-03-26", mode: "difícil" },
  { nom: "Ana", punts: 1200, data: "2026-03-25", mode: "fàcil" },
  // ...
]
```

---

## Sistema Multiidioma

```javascript
// Estructura de traduccions
const translations = {
  titol: {
    val: "Plataforma Didàctica Econòmica",
    es:  "Plataforma Didáctica Económica",
    en:  "Economic Educational Platform"
  }
  // ...
}

// Funció de traducció
const t = (key) => translations[key]?.[lang] ?? key;
```

Idiomes suportats: `val` (Valencià), `es` (Castellà), `en` (Anglès)

---

## Relacions Entre Conceptes Educatius

```
MICROECONOMIA
  └─ Consumidor → Utilitat → Demanda
  └─ Empresa   → Costos → Oferta → Punt de Mort (empresa.html)
  └─ Mercat    → Equilibri Oferta/Demanda → Elasticitat

MACROECONOMIA
  └─ PIB → Cicles → Treball → Inflació
  └─ Política Fiscal (IS) + Política Monetària (LM) → IS-LM

EMPRESA
  └─ Comptabilitat → Ràtios → Rendibilitat
  └─ Inversió → VAN/TIR → Decisió

FINANCES PERSONALS
  └─ Pressupost → Estalvi → Inversió (interès compost)
  └─ Risc/Rendibilitat → Diversificació (Playground: Ous i Cistells)

FERRAMENTES
  └─ Probabilitat → Valor Esperat → Decisió sota incertesa
  └─ Biaixos → Error → Correccions (Bayes)
```
