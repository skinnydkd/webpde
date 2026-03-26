# Roadmap — PDE

_Última actualització: Març 2026_

---

## Estat Actual

### ✅ Completat
- [x] 8 pàgines HTML funcionals (index + 7 apps)
- [x] Sistema multiidioma VAL/ES/EN
- [x] Deploy a Vercel (profedeeconomia.es)
- [x] Repo GitHub (skinnydkd/webpde)
- [x] Playground amb 10 jocs per a 2 jugadors
- [x] Concurs amb rànquing TOP 10
- [x] Simuladors interactius en economia, empresa i finances
- [x] Responsive mobile-first

---

## Prioritats Immediates

### 🔴 Alta Prioritat
- [ ] **Revisar consistència de navegació** — verificar que tots els links entre pàgines funcionen correctament a producció
- [ ] **Auditoria de simuladors** — comprovar que tots els simuladors calculen correctament
- [ ] **SEO bàsic** — meta tags, Open Graph, sitemap.xml per a totes les pàgines

### 🟡 Mitja Prioritat
- [ ] **favicon.ico real** — substituir el SVG inline per un favicon proper
- [ ] **Pàgina 404 personalitzada** (per a Vercel)
- [ ] **Google Analytics / Plausible** — mètriques d'ús anònimes
- [ ] **Optimitzar mida dels HTML** — economia.html pesa 351KB, empresa.html 240KB

### 🟢 Baixa Prioritat
- [ ] **Mode fosc** (dark mode)
- [ ] **Compartir en xarxes** — botons de share en simuladors/concurs
- [ ] **PDF export** d'alguns simuladors (nòmina, hipoteca, punt de mort)

---

## Millores per Pàgina

### economia.html
- [ ] Afegir simulador AD-AS (Agregat Demanda - Oferta Agregada)
- [ ] Millorar visualització corbes IS-LM amb animació
- [ ] Afegir casos pràctics amb dades reals (Espanya/UE)

### empresa.html
- [ ] Millorar el Business Model Canvas (exportable com a imatge)
- [ ] Afegir calculadora de rendibilitat d'inversions amb gràfic
- [ ] Cas pràctic pas a pas: crear una empresa des de zero

### finances.html
- [ ] Actualitzar dades de mercats (benchmarks, exemples)
- [ ] Afegir comparador d'hipoteca fixa vs variable
- [ ] Millora del simulador de cartera (gràfic per anys)

### vidapractica.html
- [ ] Simulador complet de declaració IRPF (simplificat)
- [ ] Calculadora de pensió de jubilació estimada
- [ ] Secció de drets laborals bàsics

### ferramentes.html
- [ ] Afegir simulador de Bayes interactiu
- [ ] Millorar la Matriu Eisenhower (drag & drop)
- [ ] Exportar decisions com a PDF o imatge

### playground.html
- [ ] Mode 1 jugador (vs CPU)
- [ ] Afegir 2-3 jocs nous (suggeriment: Banc Central, Mercat Laboral)
- [ ] Sons opcionals (toggle on/off)

### concurs.html
- [ ] Ampliar banc de preguntes (mínim 200 preguntes)
- [ ] Categories seleccionables (Economia / Empresa / Finances)
- [ ] Mode estudi (veure explicació de la resposta)

### recerca.html
- [ ] Afegir filtratge per tema/àrea
- [ ] Resums en català dels papers principals
- [ ] Secció "Lectures recomanades per nivell" (ESO → Doctorat)

---

## Idees Futures (Backlog)

- **App de Problemes** — exercicis amb solució pas a pas
- **Flashcards** — repàs de conceptes amb sistema Leitner
- **Mode Professor** — seleccionar contingut per compartir a classe
- **Integració Kahoot-like** — concurs en temps real per a aules
- **Blog/Noticies** — articles econòmics actuals comentats pedagògicament
- **Versió PWA** — instal·lable al mòbil, funciona offline

---

## Notes Tècniques Pendents
- Avaluar si migrar a Vite + React (build system) quan els HTML superin 500KB
- Considerar split de `empresa.html` en subpàgines (és la més gran)
- Valorar si afegir un CDN de fallback quan unpkg no estiga disponible
