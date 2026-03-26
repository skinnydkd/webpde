# Platform Docs — PDE

## Visió General
PDE és una plataforma educativa de fitxers HTML estàtics que funciona sense backend.
Cada fitxer és una SPA independent basada en React + Babel inline.
Desplegat a Vercel → profedeeconomia.es

---

## Pàgines

### index.html — Landing / Hub Central
**Funció:** Portal d'entrada. Presenta les 8 apps i guia l'usuari.

**Seccions:**
- **Hero:** Titular + subtítol + CTA principal
- **Apps Grid:** 8 cards (2 col tablet, 3 col desktop) amb gradient, icona, descripció i etiquetes
- **Features:** 4 avantatges pedagògics (Aprèn fent, Entén conceptes, Posa't a prova, Multiidioma)
- **CTA Final:** Crida a explorar les apps

**Apps destacades:**
- 🎮 Playground (etiqueta JOCS!)
- 🔥 Concurs (etiqueta HOT!)

---

### economia.html — Microeconomia i Macroeconomia
**Descripció:** "Aprèn economia amb simuladors interactius: microeconomia, macroeconomia, estructures de mercat, teoria de jocs, IS-LM, AD-AS i molt més."
**Gradient:** `from-pink-500 to-rose-500`
**Nivells:** Batxillerat · FP · Universitat

**18 Mòduls:**
1. Fonaments (escassetat, agents, factors, mètode científic)
2. FPP i Models (frontera possibilitats, cost oportunitat)
3. El Consumidor (teoria utilitat, comportament)
4. Oferta i Demanda ⚡ _simulador interactiu_
5. Costos empresarials
6. Estructures de Mercat (competència, oligopoli, monopoli)
7. Fallades de Mercat (externalitats, béns públics)
8. PIB i mesura econòmica
9. Cicles Econòmics
10. Mercat de Treball
11. Inflació
12. Política Fiscal
13. Model IS-LM ⚡ _simulador_
14. Política Monetària
15. Comerç Internacional (avantatge comparatiu)
16. Teoria de Jocs (Nash, dilema del presoner) ⚡ _simulador_
17. Història Econòmica
18. Mètode Científic

**Simuladors principals:** Oferta/Demanda, Elasticitat, IS-LM, Nash, FPP, Costos

---

### empresa.html — Economia de l'Empresa
**Descripció:** "Tot sobre gestió empresarial: costos, inversions, ràtios financers, formes jurídiques, RRHH, màrqueting, estratègia, Business Model Canvas i més."
**Gradient:** `from-amber-500 to-orange-500`
**Nivells:** Batxillerat · FP · Universitat

**20+ Mòduls:**
- Finances Empresarials (balanç, compte de resultats)
- Anàlisi Financera (ràtios: liquiditat, solvència, rendibilitat)
- Costos (fixes/variables, punt de mort) ⚡ _calculadora_
- Inversió (VAN, TIR) ⚡ _calculadora_
- Comptabilitat bàsica
- Fiscalitat (impost de societats)
- Producció (lean, sistemes)
- RRHH (selecció, nòmines) ⚡ _calculadora nòmina_
- Màrqueting (mix comercial, marca)
- Formes Jurídiques (SA, SL, Cooperativa…)
- Finançament (crèdit, capital)
- Emprenedoria i Lean Startup
- DAFO ⚡ _interactiu_
- Business Model Canvas ⚡ _generador_
- 5 Forces de Porter
- Estratègia empresarial

---

### finances.html — Finances Personals i Inversió
**Descripció:** "Guia interactiva de finances personals i inversió: calculadora d'interès compost, simulador de cartera, test de perfil inversor, Bitcoin, fiscalitat i més."
**Gradient:** `from-emerald-500 to-teal-500`
**Nivells:** FP · Universitat

**23+ Mòduls:**

_Tipus d'actius:_
- Accions (borsa de valors)
- ETFs (fons cotitzats)
- Fons d'Inversió Mutuals
- Bons (renda fixa)
- Or (actius refugi)
- Immobiliari
- Criptomonedes / Bitcoin

_Planificació financera:_
- Pressupost personal
- Fons d'Emergència
- Gestió de Deutes
- Perfil de Risc ⚡ _test inversor_
- Horitzó Temporal
- Psicologia inversora (caigudes de mercat, paciència)
- Rebalanceig de cartera

_Bitcoin Deep Dive:_
- Introducció a Bitcoin
- Satoshi Nakamoto (historia)
- Com funciona tècnicament
- Maximalisme
- Riscos del cripto

**Simuladors:** Interès compost, Portfolio builder, Test perfil inversor, Calculadora impostos, Bitcoin calculator

---

### vidapractica.html — Vida Pràctica
**Descripció:** "Aprèn tot el que mai t'han ensenyat: nòmines, hipoteques, IRPF, contractes, estalvi i molt més amb simuladors interactius."
**Target:** Tots els públics (inclou ESO i adults)

**12 Mòduls:**
1. La Nòmina ⚡ _calculadora_
2. La Hipoteca ⚡ _simulador_
3. Estalvi
4. Préstecs personals ⚡ _calculadora_
5. Pressupost Personal ⚡ _planner_
6. Renda (ingressos/despeses)
7. IRPF ⚡ _simulador declaració_
8. Factures domèstiques
9. Contracte de Lloguer
10. Contractes Laborals (tipus)
11. Currículum i cerca de feina
12. Glossari financer

---

### ferramentes.html — Ferramentes de Decisió
**Descripció:** "Eines pràctiques per pensar millor i prendre decisions: probabilitats, valor esperat, biaixos cognitius, negociació, priorització i més."
**Gradient:** Indigo/Blau
**Target:** Universitat, executius, tots els públics

**30 Mòduls (agrupats):**

_Matemàtica de la decisió:_
- Probabilitats
- Valor Esperat ⚡ _calculadora_
- Cost d'Oportunitat
- Sunk Costs (costos irrecuperables)
- Anàlisi Marginal

_Biaixos Cognitius:_
- General (introducció)
- Sesgo de Confirmació
- Efecte d'Ancoratge
- Heurística de Disponibilitat
- Aversió a la Pèrdua
- Influència Social
- Sesgo d'Optimisme

_Frameworks de Decisió:_
- Pros i Contres
- Regret Matrix (arrepentiment) ⚡ _interactiu_
- Matriu Eisenhower ⚡ _interactiu_
- Pre-Mortem
- Principi Pareto (80/20)
- BATNA ⚡ _calculadora_
- Cercles de Controlabilitat ⚡ _visual_
- Inversió en Informació
- Actualització Bayesiana

_Pràctics:_
- Quan confiar en experts
- Com aprendre dels errors
- Detector de biaixos ⚡ _quiz_

---

### playground.html — Jocs Educatius
**Descripció:** "Jocs educatius per a 2 jugadors: teoria de jocs, diversificació, interès compost, oferta i demanda, inflació, escassetat (or i Bitcoin), estalvi, risc i borsa."
**Font:** Nunito (exclusiva d'aquesta pàgina)
**Target:** ESO, Batxillerat (gamificació)

**10 Jocs (2 jugadors):**

| # | Nom | Concepte | Gradient |
|---|-----|----------|----------|
| 1 | 🤝 Compartir o Robar | Teoria de Jocs | purple |
| 2 | 🥚 Ous i Cistells | Diversificació | orange |
| 3 | 🌳 Arbre de Monedes | Interès Compost | green |
| 4 | 🎪 La Subhasta | Valoració | pink |
| 5 | 🎰 El Mercat | Oferta i Demanda | red |
| 6 | 🏃 La Inflació | Pèrdua de Valor | amber |
| 7 | 🪙 Or i Bitcoin | Escassetat | yellow |
| 8 | 🏦 El Banquer | Estalvi i Deute | emerald |
| 9 | 🎲 Risc i Recompensa | Probabilitats | indigo |
| 10 | 📈 El Trader | Borsa | cyan |

**Features:**
- Mode Fàcil i Difícil
- Sistema de puntuació persistent (LocalStorage)
- Leaderboard TOP 10
- Mascota amb canvi d'humor per dificultat
- Jugador 1 🦊 / Jugador 2 🐰
- Efectes de so

---

### concurs.html — Concurs de Coneixement
**Descripció:** "Posa a prova els teus coneixements amb preguntes de càlcul, gràfics, fórmules i teoria. Competeix pel TOP 10 del ranking!"
**Target:** Batxillerat, Universitat

**Tipus de Preguntes:**
- Càlculs i problemes matemàtics
- Identificar gràfics econòmics
- Ordenar seqüències lògiques
- Preguntes de teoria

**Features:**
- Ranking persistent TOP 10 (LocalStorage)
- Preguntes multiidioma (VAL/ES/EN)
- Puntuació dinàmica
- Dificultats variables

---

### recerca.html — Recerca i Lectures
**Descripció:** "Descobreix els papers més influents, aprèn el mètode científic en economia, explora experiments curiosos i troba els millors llibres per aprofundir."
**Target:** Universitat, recerca avançada

**Seccions:**
- Papers Acadèmics (amb liens a arxius)
- Mètode Científic en Economia
- Articles i Experiments Curiosos
- Llibres Recomanats (per nivell)
- Recursos externs (Google Scholar, JSTOR, NBER…)

---

## Navegació Global

```
index.html  ──→  economia.html
            ──→  empresa.html
            ──→  finances.html
            ──→  vidapractica.html
            ──→  ferramentes.html
            ──→  playground.html
            ──→  concurs.html
            ──→  recerca.html
```

Totes les pàgines inclouen:
- **Header sticky:** Logo PDE + Nav + Selector idioma (VAL/ES/EN)
- **Footer:** Link de tornada `href="./index.html"` + "Fet amb amor per Pau"
