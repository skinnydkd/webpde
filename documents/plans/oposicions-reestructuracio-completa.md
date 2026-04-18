# Pla de Reestructuració Completa — Oposicions Economia BOE

## Context
El temari oficial (BOE, Ordre 1 febrer 1996) conté **71 temes** per a Professors d'Ensenyament Secundari — Economia. L'actual PDE té 8 blocs (A-H) amb numeració i agrupació pròpia que **no segueix l'estructura oficial**. Problema principal: **24 temes del BOE no tenen contingut** i el Bloc E "Economia Espanyola" no existeix al temari.

## Objectius
1. **Reestructurar** els 8 blocs per seguir exactament l'ordre i contingut del BOE
2. **Crear contingut nou** per als 24 temes que falten
3. **Millorar gràfics**: objectiu mínim 3-5 gràfics ReCharts per tema
4. **Millorar redacció**: rigor científic, citacions d'economistes, dades reals actualitzades
5. **Ampliar suposits pràctics**: de 25 a 60+ exercicis amb 3 nivells de dificultat
6. **Cada tema identifica clarament el número BOE** (Tema 1, Tema 2...)

---

## Nova Estructura de Blocs

### Bloc A — Fonaments d'Economia (Temes 1-10)
**Fitxer:** `oposicions-bloc-a.html`
**Estat actual:** ✅ Ben cobert (5.625 línies, 10 gràfics)
**Acció:** Polir + afegir gràfics

| Tema BOE | Títol oficial | Estat PDE | Acció |
|----------|--------------|-----------|-------|
| 1 | Objeto de la Economía. Economía y Economía Política. Relaciones con otras CCSS. | ✅ Cobert (PDE T1) | Polir redacció, afegir diagrama de relacions amb altres ciències |
| 2 | Los métodos en Economía. Economía positiva y normativa. Juicios de valor. Discrepancias entre economistas. | ✅ Cobert (PDE T1/2) | Separar bé positiva/normativa, afegir exemples de discrepàncies |
| 3 | Las técnicas y procedimientos. Los modelos. Variables económicas: tipos. Los números índice. | ⚠️ Parcial | **CREAR**: models econòmics (flux circular, IS-LM simplificat), tipus de variables (endògenes/exògenes, stock/flux), números índex (IPC, Laspeyres, Paasche, Fisher) amb gràfic ReCharts |
| 4 | Evolución del pensamiento económico. Economía clásica. Crítica marxista. Economía neoclásica. | ✅ Cobert (PDE T5) | Reorganitzar per escola, afegir timeline gràfic interactiu |
| 5 | El institucionalismo. El Keynesianismo. El monetarismo. Tendencias actuales. | ✅ Cobert (PDE T5) | Ampliar tendències actuals (economia conductual, economia ecològica, MMT) |
| 6 | La base humana de la actividad económica. El concepto de necesidad. Necesidad y contexto social. Los bienes económicos. | ⚠️ Parcial | **AMPLIAR**: piràmide Maslow gràfic, classificació de béns (diagrama SVG), paradoxa del valor |
| 7 | Los factores productivos. La FPP. Coste de oportunidad. Progreso técnico. Acumulación de capital. | ✅ Cobert (PDE T6/7) | Millorar gràfic FPP interactiu (ReCharts), afegir comparativa països |
| 8 | Los problemas económicos básicos. Formas de adoptar decisiones: tradición, mercado, autoridad. Los sistemas económicos. | ✅ Cobert (PDE T4) | Afegir taula comparativa sistemes (gràfic radar ReCharts) |
| 9 | División del trabajo y especialización. Interdependencia económica. Sectores económicos e interdependencia sectorial. | ✅ Cobert (PDE T7) | Afegir gràfic evolució sectorial Espanya (PieChart/AreaChart ReCharts) |
| 10 | Del trueque al dinero y el mercado. El mecanismo de mercado. Demanda, oferta y equilibrio. Mercado y asignación de recursos. | ✅ Cobert (PDE T10) | Millorar gràfic O/D interactiu, afegir evolució formes de diner |

**Gràfics objectiu Bloc A: 15-20** (actual: 10)
**Línies objectiu: ~6.500** (actual: 5.625)

---

### Bloc B — Microeconomia (Temes 11-19)
**Fitxer:** `oposicions-bloc-b.html`
**Estat actual:** ✅ Ben cobert (5.608 línies, 18 gràfics)
**Acció:** Polir + reequilibrar temes finals

| Tema BOE | Títol oficial | Estat PDE | Acció |
|----------|--------------|-----------|-------|
| 11 | Teoría de la demanda y de la utilidad. Comportamiento del consumidor. Efecto renta y efecto sustitución. | ✅ Cobert (PDE T11) | Afegir gràfic Slutsky (descomposició efecte renta/substitució), corbes d'indiferència |
| 12 | La función de producción. Isocuantas e isocostes. Función homogénea. Ley de rendimientos decrecientes. | ✅ Cobert (PDE T12) | Millorar gràfics isoquantes/isocostos, afegir Cobb-Douglas numèric |
| 13 | Los costes de producción a corto y largo plazo. Economías y deseconomías de escala. Relación curvas coste CLP: dimensión óptima. | ✅ Cobert (PDE T12/13) | Gràfic envolvent de costos a llarg termini, economies d'escala |
| 14 | Los supuestos de la competencia perfecta. Las formas de la competencia. Funcionamiento del mercado de CP. | ✅ Cobert (PDE T14) | Gràfic empresa CP (P=CMg=CMe), benefici/pèrdua a curt termini |
| 15 | La competencia imperfecta y concentración de capitales. El monopolio. Regulación del monopolio. | ✅ Cobert (PDE T15) | Gràfic pèrdua d'eficiència del monopoli (deadweight loss), regulació preu |
| 16 | El oligopolio. Colusión y competencia. La competencia monopolística. Diferenciación, marcas, publicidad. | ✅ Cobert (PDE T16) | Afegir model Cournot/Bertrand gràfic, matriu teoria de jocs |
| 17 | Desequilibrios y limitaciones del mercado. Bienes públicos. Externalidades. Óptimos paretianos. Eficiencia vs equidad. | ✅ Cobert (PDE T17) | Gràfic externalitats (cost social vs privat), diagrama caixa Edgeworth |
| 18 | La intervención del Estado en economía: justificación y funciones. Medios e instrumentos. | ✅ Cobert (PDE T18) | Ampliar funcions de Musgrave, afegir diagrama instruments (fiscal, monetari, regulatori) |
| 19 | La distribución de la renta. La teoría marginal de la distribución y sus críticas. Las políticas de distribución. | ✅ Cobert (PDE T18/19) | Corba de Lorenz + coeficient Gini (ReCharts), comparativa internacional |

**Gràfics objectiu Bloc B: 25-30** (actual: 18)
**Línies objectiu: ~6.500** (actual: 5.608)

---

### Bloc C — Macroeconomia (Temes 20-26)
**Fitxer:** `oposicions-bloc-c.html`
**Estat actual:** ✅ Parcialment cobert (5.232 línies, 13 gràfics — però cobria 10 temes, ara en cobrirà 7)
**Acció:** Reestructurar de 10 a 7 temes, moure contingut a D

| Tema BOE | Títol oficial | Estat PDE | Acció |
|----------|--------------|-----------|-------|
| 20 | Los flujos de rentas en la economía. La contabilidad nacional. El producto nacional y su medición. La renta nacional y magnitudes derivadas. | ✅ Cobert (PDE T3, T21) | Consolidar, afegir gràfic flux circular complet (4 sectors), taula magnituds PIB/PNB/RN |
| 21 | La demanda agregada. Consumo, ahorro e inversión. El efecto multiplicador de la inversión. La oferta agregada. | ✅ Cobert (PDE T22-24) | Gràfic creu keynesiana, funcions consum/estalvi, multiplicador interactiu |
| 22 | El sector público y la política fiscal. Los ingresos y gastos del sector público. La financiación del déficit público y la política fiscal. | ✅ Cobert (PDE T25-26) | Gràfic estructura pressupostària Espanya (PieChart), efecte crowding-out |
| 23 | Financiación de la economía. La evolución del dinero. Los bancos y la creación de dinero. Intermediarios financieros. | ✅ Cobert (PDE T27-28) | Gràfic multiplicador monetari, evolució M1/M2/M3 |
| 24 | El Banco Central y la política monetaria. Control de la oferta monetaria. Objetivos e instrumentos. | ✅ Cobert (PDE T29) | Diagrama transmissió política monetària, gràfic tipus d'interès BCE històric |
| 25 | El comercio internacional: factores explicativos. El principio de la ventaja comparativa. Librecambio vs proteccionismo. La Balanza de Pagos: estructura y saldos. | ✅ Cobert (PDE D-T31-33) | Gràfic ventaja comparativa (Ricardo), estructura BdP, gràfic balança comercial Espanya |
| 26 | Los pagos internacionales y el mercado de divisas. Los sistemas de tipos de cambio. El sistema monetario internacional y europeo. | ✅ Cobert (PDE D-T34) | Gràfic mercat de divises O/D, evolució EUR/USD (LineChart), Bretton Woods timeline |

**Gràfics objectiu Bloc C: 20-25** (actual: 13 repartits entre 10 temes)
**Línies objectiu: ~5.500**

---

### Bloc D — Creixement, Cicles i Mercat de Treball (Temes 27-37)
**Fitxer:** `oposicions-bloc-d.html`
**Estat actual:** 🔴 Reescriptura quasi completa (actual 3.240 línies cobria temes internacionals que passen a C)
**Acció:** Reescriure amb 11 temes nous, crear contingut per 6 temes que falten completament

| Tema BOE | Títol oficial | Estat PDE | Acció |
|----------|--------------|-----------|-------|
| 27 | Crecimiento y desarrollo económico. Factores del crecimiento. Teorías explicativas. Subdesarrollo. | ✅ Cobert (PDE A-T8) | Moure i ampliar: model Solow gràfic, IDH comparativa (BarChart), trampes de pobresa |
| 28 | Los límites al crecimiento económico. Consideración económica del medio ambiente. Desarrollo sostenible. | ✅ Cobert (PDE A-T10) | Moure i ampliar: petjada ecològica, ODS, corba Kuznets ambiental (gràfic) |
| 29 | Los ciclos económicos. Teorías explicativas. La inversión y el ciclo. Las políticas estabilizadoras. | 🔴 **NO COBERT** | **CREAR COMPLET**: fases del cicle (gràfic sinusoidal), teories (Juglar, Kondrátiev, Schumpeter), estabilitzadors automàtics, política contracíclica |
| 30 | La inflación: naturaleza, clases y efectos. Las teorías sobre la inflación. Las políticas antiinflacionistas. | ✅ Cobert (PDE C-T30) | Moure, millorar: gràfic IPC Espanya 1970-2024 (LineChart), corba de Phillips, espiral preus-salaris |
| 31 | La naturaleza especial del mercado de trabajo. Las teorías sobre el desempleo. Las políticas de empleo. | ⚠️ Parcial (PDE A-T9) | **AMPLIAR MOLT**: oferta/demanda treball (gràfic), taxa atur Espanya vs UE (LineChart), NAIRU, tipus d'atur, polítiques actives/passives |
| 32 | Nuevas tecnologías, empleo y cualificación. Producción en industria y servicios. Cambio técnico y ocupaciones. | 🔴 **NO COBERT** | **CREAR COMPLET**: revolució industrial 4.0, automatització, skill-biased technical change, gràfic polarització ocupacional |
| 33 | Crisis económica y desajustes en el mercado de trabajo. La economía sumergida. Sistema productivo, sindicalismo y negociación colectiva. | 🔴 **NO COBERT** | **CREAR COMPLET**: crisi 2008, COVID-19, economia submergida (% PIB per país, BarChart), sindicats, convenis col·lectius, gràfic taxa sindicalització |
| 34 | La cooperación económica internacional. La integración económica en la UE: antecedentes, situación actual y perspectivas. | ✅ Cobert (PDE D-T36/37) | Consolidar: timeline integració europea (gràfic), etapes integració (ZLC→UA→MC→UEM), institucions UE |
| 35 | Producción y consumo. La sociedad de consumo. Transformación modelos de consumo. Protección de los consumidores. | 🔴 **NO COBERT** | **CREAR COMPLET**: societat de consum (Baudrillard, Galbraith), consumisme, drets del consumidor, gràfic estructura consum familiar (PieChart), economia circular |
| 36 | Economía del Bienestar. Pobreza, igualdad y eficiencia. Estado de Bienestar: orígenes y evolución. | 🔴 **NO COBERT** | **CREAR COMPLET**: teoremes del benestar, Pareto, Rawls, funció de benestar social, models Estat Benestar (nòrdic, continental, mediterrani), gràfic despesa social (BarChart) |
| 37 | Calidad de vida e indicadores. Enfoque sistémico. Requisitos teóricos de los indicadores. Hacia un índice global. | 🔴 **NO COBERT** | **CREAR COMPLET**: PIB vs IDH vs IPM, índex Gini, pegada ecològica, felicitat (Easterlin paradox), gràfic radar comparativa països |

**Gràfics objectiu Bloc D: 30-35** (molts temes nous)
**Línies objectiu: ~7.000** (actual: 3.240 però contingut diferent)

---

### Bloc E — Economia de l'Empresa I (Temes 38-48)
**Fitxer:** `oposicions-bloc-e.html`
**Estat actual:** 🔴 Reescriptura completa (actual "Eco. Espanyola" no segueix BOE)
**Acció:** Reescriure completament amb 11 temes d'empresa

| Tema BOE | Títol oficial | Estat PDE | Acció |
|----------|--------------|-----------|-------|
| 38 | Evolución conceptos empresa y empresario. Funciones y objetivos. Clases de empresa. La empresa como sistema en interrelación con su entorno. Los subsistemas. | ⚠️ Parcial (PDE F-T49) | **REESCRIURE**: evolució històrica (mercader→empresari capitalista→directiu), enfocament sistèmic, subsistemes empresa (diagrama SVG) |
| 39 | El problema de la fijación de objetivos. Diversas concepciones. La Dirección ante los objetivos. La teoría de la organización en los objetivos. | 🔴 **NO COBERT** | **CREAR COMPLET**: teoria stakeholders vs shareholders, objectius financers vs socials, arbre d'objectius (gràfic), BSC (Kaplan & Norton) |
| 40 | La decisión de localización de la empresa. Modelos mecánicos. Costes y rendimientos totales. Economías de aglomeración. | ⚠️ Parcial (PDE F-T51) | **AMPLIAR**: model Weber, model Hotelling, economies d'aglomeració (Marshall), gràfic isocostos de transport |
| 41 | Dimensión de la empresa. Aspectos de la dimensión. Dimensión óptima. Dimensión y ocupación. | ⚠️ Parcial (PDE F-T51) | **AMPLIAR**: criteris de dimensió (treballadors, actius, vendes), PIME vs gran empresa, gràfic distribució empreses per mida Espanya |
| 42 | El sistema de producción en la empresa. Clases de procesos productivos. La productividad y su medida. Mejora de la productividad. | 🔴 **NO COBERT** | **CREAR COMPLET**: tipus processos (continu, per lots, per projecte), productivitat total/parcial, JIT, Lean, gràfic productivitat Espanya vs UE (BarChart) |
| 43 | Los costes en la empresa. Estructura de costes. Análisis del punto de cobertura. Proceso de formación de coste. | ✅ Cobert (PDE F-T52) | Moure: gràfic punt mort interactiu (LineChart), classificació costos (directes/indirectes, fixos/variables) |
| 44 | Planificación y programación de la producción. En serie, por encargo, por unidad. Nuevos métodos. Desarrollo y control. | 🔴 **NO COBERT** | **CREAR COMPLET**: MRP, Kanban, PERT/CPM (diagrama), programació lineal bàsica, gràfic Gantt |
| 45 | El marketing: naturaleza y evolución. Investigación de mercados. Segmentación de mercados. | ⚠️ Parcial (PDE F-T56) | **AMPLIAR**: evolució orientacions (producció→vendes→màrqueting→relacional), mètodes investigació, criteris segmentació, gràfic embut de conversió |
| 46 | Política de producto. Ciclo de vida. Creación y eliminación de productos. La distribución. Canales: naturaleza, funciones, intermediarios, selección. | 🔴 **PARCIAL** | **AMPLIAR MOLT**: cicle de vida producte (LineChart interactiu 4 fases), matriu BCG (diagrama), canals distribució (diagrama), franquícies, e-commerce |
| 47 | La política de comunicación. Estrategias e instrumentos de promoción. La publicidad. Los medios publicitarios. El plan de medios. | 🔴 **NO COBERT** | **CREAR COMPLET**: mix comunicació, publicitat ATL/BTL, RRPP, promoció vendes, plan de medis, gràfic inversió publicitària per mitjà (PieChart), publicitat digital |
| 48 | La política de precios. Etapas y métodos de fijación de precios. Planificación, organización y control de la estrategia de marketing. | 🔴 **NO COBERT** | **CREAR COMPLET**: mètodes fixació (costos+marge, competència, valor percebut), elasticitat-preu, discriminació preus, pricing dinàmic, gràfic estratègies preu |

**Gràfics objectiu Bloc E: 25-30**
**Línies objectiu: ~7.000** (reescriptura completa)

---

### Bloc F — Economia de l'Empresa II: Inversió i Finançament (Temes 49-56)
**Fitxer:** `oposicions-bloc-f.html`
**Estat actual:** 🔴 Reestructurar (actual 2.161 línies cobria 12 temes, ara en cobrirà 8 de diferent contingut)
**Acció:** Reestructurar completament

| Tema BOE | Títol oficial | Estat PDE | Acció |
|----------|--------------|-----------|-------|
| 49 | Concepto y clases de inversión. Dimensiones: tecnológica, financiera y económica. Criterios de análisis y selección. | ✅ Cobert (PDE F-T58) | Moure i ampliar: VAN, TIR, Payback, IR. Gràfic perfil VAN (LineChart), comparativa criteris |
| 50 | Riesgo, inflación e impuestos en las decisiones de inversión. Modelos de programación de inversiones. | 🔴 **NO COBERT** | **CREAR COMPLET**: prima de risc, CAPM simplificat, anàlisi sensibilitat, simulació Monte Carlo conceptual, ajust per inflació, programació inversions amb restriccions |
| 51 | La financiación en la empresa. El período de maduración y el fondo de maniobra. La financiación externa a corto, medio y largo plazo. | ✅ Cobert (PDE F-T57) | Moure: diagrama fonts finançament (SVG), gràfic FM vs NOF, crèdit bancari/leasing/factoring/obligacions |
| 52 | La financiación interna: concepto y clases. Autofinanciación. La amortización: significado y función financiera. Provisiones. Reservas. | ⚠️ Parcial | **AMPLIAR**: autofinançament manteniment vs enriquiment, mètodes amortització (lineal, dígits, quota variable), efecte Lohmann-Ruchti, gràfic evolució fons amortització |
| 53 | El coste del capital. El coste de las diferentes fuentes de financiación. El coste del capital medio ponderado (WACC). | 🔴 **NO COBERT** | **CREAR COMPLET**: cost deute (Kd), cost recursos propis (Ke), WACC fórmula i càlcul, gràfic estructura cost capital, palanquejament financer |
| 54 | La estructura financiera óptima de la empresa. La tesis tradicional. La tesis de Modigliani-Miller. La política de dividendos óptima. | 🔴 **NO COBERT** | **CREAR COMPLET**: tesi tradicional (gràfic U), M&M sense impostos, M&M amb impostos, trade-off theory, política dividends (Gordon-Shapiro), gràfic estructura capital |
| 55 | Sistemas de capitalización. Equivalencia financiera. Las rentas: concepto y clases. Actualización y capitalización de rentas. | ⚠️ Parcial (PDE G) | **AMPLIAR**: capitalització simple/composta, TAE vs TIN, rendes constants/variables, prepagables/postpagables, gràfic valor temporal diner (LineChart) |
| 56 | Préstamos: métodos de amortización. Empréstitos comerciales. Usufructo y nuda propiedad. | 🔴 **NO COBERT** | **CREAR COMPLET**: sistema francès, americà, italià (taula comparativa + gràfic amortització), emprèstits (bons, obligacions), usdefruit i nua propietat |

**Gràfics objectiu Bloc F: 20-25**
**Línies objectiu: ~5.500**

---

### Bloc G — Economia de l'Empresa III: Organització i Direcció (Temes 57-65)
**Fitxer:** `oposicions-bloc-g.html`
**Estat actual:** 🔴 Reescriptura quasi completa (actual 661 línies sobre "sistema financer" → contingut mou a F)
**Acció:** Reescriure completament amb 9 temes nous

| Tema BOE | Títol oficial | Estat PDE | Acció |
|----------|--------------|-----------|-------|
| 57 | El proceso de toma de decisiones en la empresa. Tipos de decisiones. Incertidumbre y riesgo. Decisiones en sistemas abiertos. | 🔴 **NO COBERT** | **CREAR COMPLET**: model racional Simon, racionalitat limitada, matriu decisió (Laplace, Wald, Hurwicz, Savage), arbres decisió (diagrama), risc vs incertesa |
| 58 | La planificación en la empresa. Elementos y etapas. El control. Técnicas de control. Sistemas integrados de planificación y control. | 🔴 **NO COBERT** | **CREAR COMPLET**: nivells planificació (estratègica/tàctica/operativa), DAFO, anàlisi PESTEL, pressupostos, quadre de comandament, diagrama cicle planificació-control |
| 59 | La empresa como organización e institución. Teorías clásicas (Taylor, Fayol, Weber). Escuela de Relaciones Humanas (Mayo). Teoría de la contingencia. Teoría contractual. | 🔴 **NO COBERT** | **CREAR COMPLET**: timeline teories organització, principis Taylor/Fayol/Weber, experiments Hawthorne, teoria Z (Ouchi), enfocament contingent, costos transacció (Coase, Williamson) |
| 60 | Las estructuras formales e informales. Las relaciones en la organización. Dinámica de grupos. Conflicto, cambio y desarrollo. | 🔴 **NO COBERT** | **CREAR COMPLET**: organigrames (lineal, funcional, divisional, matricial) — 4 diagrames SVG, organització informal, gestió conflictes, resistència al canvi |
| 61 | Liderazgo y estilos de dirección. Enfoques tradicionales. Modelos contingentes. Delegación y descentralización. | 🔴 **NO COBERT** | **CREAR COMPLET**: grid gerencial Blake&Mouton (gràfic 2D), model Hersey-Blanchard, lideratge transformacional vs transaccional, gràfic continuum lideratge |
| 62 | Cultura e imagen de la empresa. El estilo Z. Técnicas de investigación. Cultura y ética en las organizaciones empresariales. | 🔴 **NO COBERT** | **CREAR COMPLET**: model Schein (3 nivells cultura), valors vs creences, RSC, codi ètic, gràfic dimensions culturals Hofstede |
| 63 | La comunicación en la empresa. Información y comunicación. Redes y estructuras. Estrategia de comunicaciones. | 🔴 **NO COBERT** | **CREAR COMPLET**: model comunicació empresarial, xarxes (roda, cadena, total), comunicació interna/externa, barreres, diagrama flux comunicació |
| 64 | Clima de la empresa y motivación. Motivación y satisfacción en el trabajo. Tipología de motivaciones. Valores, actitudes y satisfacción. | 🔴 **NO COBERT** | **CREAR COMPLET**: Maslow (piràmide gràfic), Herzberg (2 factors), McClelland, Vroom (expectatives), gràfic comparatiu teories motivació |
| 65 | Evolución relaciones propiedad-control. La tecnoestructura. La empresa integrada. Relaciones propiedad y poder. | 🔴 **NO COBERT** | **CREAR COMPLET**: separació propietat-control (Berle & Means), tecnoestructura (Galbraith), govern corporatiu, problema agent-principal, gràfic evolució formes empresa |

**Gràfics objectiu Bloc G: 25-30** (tot nou)
**Línies objectiu: ~6.000** (reescriptura completa)

---

### Bloc H — Comptabilitat i Didàctica (Temes 66-71)
**Fitxer:** `oposicions-bloc-h.html`
**Estat actual:** ✅ Parcial (6.360 línies — temes 67-68, 70-71 coberts; falten 66, 69, 70-71 BOE)
**Acció:** Ampliar amb 2 temes nous (69 balanç social, 70-71 didàctica)

| Tema BOE | Títol oficial | Estat PDE | Acció |
|----------|--------------|-----------|-------|
| 66 | Análisis contable e información económica. Estados contables. Legislación mercantil y Plan General de Contabilidad. Las cuentas anuales. | ✅ Cobert (PDE H-T68/70) | Consolidar: PGC 2007, marc conceptual, comptes anuals (balanç, PyG, ECPN, EFE, memòria), gràfic estructura PGC |
| 67 | El patrimonio: componentes y valoración contable. Valoración económica de activos y empresas. | ✅ Cobert (PDE H-T67) | Polir: mètodes valoració (cost, VR, descompte fluxos), gràfic masses patrimonials |
| 68 | Análisis de estados contables: objetivos, instrumentos y metodología. Análisis estructura Balance. Análisis económico: ratios eficiencia y productividad. Análisis financiero: rentabilidad, riesgo y costes financieros. | ✅ Cobert (PDE H-T71) | Polir: dashboard ràtios (gràfic radar ReCharts), anàlisi horitzontal/vertical, palanquejament financer complet |
| 69 | Balance Social de la Empresa. Los fines de la empresa: el balance como auditoría social. Instrumento de gestión: dificultades y aportaciones. | 🔴 **NO COBERT** | **CREAR COMPLET**: RSC (Carroll), GRI, ODS aplicats a empresa, triple bottom line, informe no-financer, gràfic evolució RSC |
| 70 | Posibles concepciones de un curso básico de Economía en Bachillerato. La aproximación razonada como metodología. Métodos expositivos y de indagación. | 🔴 **NO COBERT** | **CREAR COMPLET**: enfocaments didàctics (constructivisme, ABP, gamificació), disseny curricular, competències clau LOE/LOMLOE, metodologies actives, avaluació formativa |
| 71 | Diseño y desarrollo de un proyecto empresarial. El proyecto empresarial como metodología didáctica. | 🔴 **NO COBERT** | **CREAR COMPLET**: estructura pla empresa (canvas, pla financer, pla comercial), simulació empresarial a l'aula, rúbriques avaluació, gràfic Business Model Canvas |

**Gràfics objectiu Bloc H: 15-20** (actual: 3)
**Línies objectiu: ~7.000** (actual: 6.360 però amb contingut diferent)

---

## Estàndards de Qualitat per Tema

### Redacció i Rigor Científic
Cada tema ha d'incloure obligatòriament:
1. **Introducció contextualitzada** — connectar amb la realitat econòmica actual
2. **Marc teòric rigorós** — citar autors originals amb any (Smith, 1776; Keynes, 1936; etc.)
3. **Fórmules econòmiques** — amb notació estàndard i explicació de cada variable
4. **Exemples numèrics** — mínim 1 per tema, amb dades realistes
5. **Dades reals actualitzades** — INE, Eurostat, BCE, FMI, Banc d'Espanya (2020-2025)
6. **Connexions entre temes** — "Com hem vist al Tema X..." per mostrar coherència
7. **Vocabulari precís** — definicions formals dels termes clau
8. **Perspectiva crítica** — presentar debats acadèmics, no només una visió
9. **Aplicació a Espanya/UE** — contextualitzar amb exemples propers
10. **Conclusió amb síntesi** — connectar tots els conceptes del tema

### Gràfics
Cada tema ha de tindre **mínim 3 gràfics**:
- **1 gràfic teòric** (corbes, models) — ReCharts LineChart/AreaChart
- **1 gràfic amb dades reals** (Espanya, UE) — ReCharts BarChart/LineChart
- **1 diagrama conceptual** (esquema, classificació) — SVG o gràfic radar/pie

Tipus de gràfics per àrea:
| Àrea | Gràfics principals |
|------|-------------------|
| Micro | LineChart (O/D, costos), AreaChart (excedents), PieChart (quota mercat) |
| Macro | LineChart (PIB, IPC, atur), BarChart (comparativa països), AreaChart (cicles) |
| Empresa | BarChart (costos), LineChart (punt mort, cicle vida), PieChart (estructura capital) |
| Comptabilitat | BarChart (ràtios), radar (diagnòstic), treemap (estructura balanç) |

---

## Suposits Pràctics — Ampliació

### Estructura objectiu
De **25 exercicis** (actual) a **60+ exercicis** amb:

| Categoria | Actual | Objectiu | Nous |
|-----------|--------|----------|------|
| Microeconomia | 5 | 10 | +5 |
| Macroeconomia | 5 | 10 | +5 |
| Mat. Financeres | 5 | 8 | +3 |
| Empresa | 5 | 10 | +5 |
| Comptabilitat | 5 | 10 | +5 |
| Comerç Internacional | 0 | 4 | +4 |
| Mercat de Treball | 0 | 4 | +4 |
| Organització/Direcció | 0 | 4 | +4 |
| **TOTAL** | **25** | **60** | **+35** |

### Distribució per dificultat
| Nivell | Proporció | Descripció |
|--------|-----------|------------|
| ⭐ Bàsic | 30% (~18) | Aplicació directa d'una fórmula, 1-2 passos |
| ⭐⭐ Intermedi | 45% (~27) | Combina 2-3 conceptes, 3-5 passos, interpretació |
| ⭐⭐⭐ Avançat | 25% (~15) | Cas complet, múltiples conceptes, anàlisi crítica, gràfic |

### Exercicis nous per categoria

**Microeconomia (+5):**
- Ex. 6 ⭐: Elasticitat-preu i ingrés total (amb gràfic IT)
- Ex. 7 ⭐⭐: Excedent del consumidor/productor amb impost (gràfic àrea)
- Ex. 8 ⭐⭐: Externalitat negativa — impost pigouvià (gràfic cost social)
- Ex. 9 ⭐⭐⭐: Oligopoli Cournot — funcions reacció i equilibri Nash
- Ex. 10 ⭐⭐⭐: Discriminació preus de 3r grau — 2 mercats, maximització benefici

**Macroeconomia (+5):**
- Ex. 11 ⭐: Càlcul PIB pels 3 mètodes (producció, renda, despesa)
- Ex. 12 ⭐⭐: Model renda-despesa amb sector públic (multiplicadors fiscals)
- Ex. 13 ⭐⭐: Creació de diner — multiplicador bancari amb coeficient reserves
- Ex. 14 ⭐⭐⭐: Model IS-LM complet — equilibri simultani, política fiscal+monetària
- Ex. 15 ⭐⭐⭐: Inflació i atur — corba Phillips, expectatives adaptatives, NAIRU

**Mat. Financeres (+3):**
- Ex. 16 ⭐: Capitalització composta — comparar TAE de productes financers
- Ex. 17 ⭐⭐: Préstec sistema francès vs americà — comparar costos totals
- Ex. 18 ⭐⭐⭐: Selecció inversions amb inflació i impostos — VAN ajustat

**Empresa (+5):**
- Ex. 21 ⭐: Productivitat total i parcial — comparar 2 períodes
- Ex. 22 ⭐⭐: Localització empresarial — model costos transport (2 ubicacions)
- Ex. 23 ⭐⭐: Cicle de vida producte — estratègies per fase (cas real)
- Ex. 24 ⭐⭐⭐: WACC i estructura financera — cost capital amb deute/capital propi
- Ex. 25 ⭐⭐⭐: Anàlisi DAFO + matriu BCG — cas empresa real (Mercadona/Inditex)

**Comptabilitat (+5):**
- Ex. 26 ⭐: Classificar elements patrimonials en masses
- Ex. 27 ⭐⭐: Cicle comptable complet simplificat (5 operacions)
- Ex. 28 ⭐⭐: Fons de maniobra i ràtios liquiditat — diagnòstic
- Ex. 29 ⭐⭐⭐: Anàlisi complet d'estats financers — ràtios + interpretació + gràfic radar
- Ex. 30 ⭐⭐⭐: Palanquejament financer — RE, RF, efecte endeutament

**Comerç Internacional (+4):**
- Ex. 31 ⭐: Ventaja comparativa (Ricardo) — 2 països, 2 béns
- Ex. 32 ⭐⭐: Aranzel — efecte sobre preu, quantitat, benestar (amb gràfic)
- Ex. 33 ⭐⭐: Balança de pagos — classificar operacions, calcular saldos
- Ex. 34 ⭐⭐⭐: Tipus de canvi i paritat — arbitratge, efecte devaluació sobre balança comercial

**Mercat de Treball (+4):**
- Ex. 35 ⭐: Oferta i demanda de treball — equilibri, salari mínim
- Ex. 36 ⭐⭐: Taxa d'atur, activitat i ocupació — càlcul i interpretació EPA
- Ex. 37 ⭐⭐: Cost laboral unitari i productivitat — comparar sectors
- Ex. 38 ⭐⭐⭐: Corba de Phillips — inflació-atur, expectatives, NAIRU amb gràfic

**Organització/Direcció (+4):**
- Ex. 39 ⭐: Matriu de decisió — criteris Laplace, Wald, Hurwicz, Savage
- Ex. 40 ⭐⭐: Arbre de decisió — valor esperat, risc, decisió seqüencial
- Ex. 41 ⭐⭐: Pla de producció PERT — camí crític, folgances
- Ex. 42 ⭐⭐⭐: Diagnòstic organitzatiu complet — estructura, cultura, lideratge, proposta millora

### Gràfics en exercicis
Cada exercici ⭐⭐⭐ ha de tindre **mínim 1 gràfic ReCharts** que il·lustre la solució.
Exercicis ⭐⭐ poden incloure gràfics opcionals.

---

## Ordre d'Implementació (Sessions)

| Sessió | Bloc | Feina principal | Hores est. |
|--------|------|----------------|------------|
| **1** | Bloc G (57-65) | Reescriptura completa: 9 temes nous d'organització/direcció | Gran |
| **2** | Bloc E (38-48) | Reescriptura completa: 11 temes empresa I (de eco. espanyola a empresa) | Gran |
| **3** | Bloc F (49-56) | Reestructurar: 8 temes inversió/finançament | Mitjà |
| **4** | Bloc D (27-37) | Reestructurar: 11 temes creixement/cicles/treball (6 temes nous) | Gran |
| **5** | Bloc H (66-71) | Ampliar: 3 temes nous (balanç social, didàctica) | Mitjà |
| **6** | Bloc C (20-26) | Reestructurar: de 10 a 7 temes macro + internacional | Mitjà |
| **7** | Bloc A (1-10) | Polir redacció + afegir gràfics | Petit |
| **8** | Bloc B (11-19) | Polir redacció + afegir gràfics | Petit |
| **9** | Pràctics | Crear 35 exercicis nous amb gràfics | Gran |

---

## Resum Quantitatiu

| Mètrica | Actual | Objectiu | Diferència |
|---------|--------|----------|------------|
| Temes coberts | 47/71 (66%) | 71/71 (100%) | +24 temes |
| Gràfics totals | ~54 | ~200+ | +150 gràfics |
| Exercicis pràctics | 25 | 60 | +35 exercicis |
| Gràfics en exercicis | 0 | 15+ | +15 |
| Línies totals blocs | ~29.000 | ~51.000 | +22.000 línies |
| Autors/economistes citats | ~50 únics | ~120+ únics | +70 |

## Fitxers a modificar/crear
| Fitxer | Acció |
|--------|-------|
| `oposicions-bloc-a.html` | Modificar (polir + gràfics) |
| `oposicions-bloc-b.html` | Modificar (polir + gràfics) |
| `oposicions-bloc-c.html` | Modificar (reestructurar 10→7 temes) |
| `oposicions-bloc-d.html` | Reescriure (11 temes nous) |
| `oposicions-bloc-e.html` | Reescriure completament (eco.espanyola → empresa I) |
| `oposicions-bloc-f.html` | Reescriure (financer → inversió/finançament) |
| `oposicions-bloc-g.html` | Reescriure completament (financer → organització/direcció) |
| `oposicions-bloc-h.html` | Ampliar (+3 temes nous) |
| `oposicions-practica.html` | Ampliar (+35 exercicis, +3 categories, +gràfics) |
| `oposicions.html` | Modificar (actualitzar navegació blocs) |
| `pde-shared.js` | Modificar (traduccions nous blocs) |
| `vercel.json` | Sense canvis (URLs ja existeixen) |
| `sitemap.xml` | Sense canvis |
