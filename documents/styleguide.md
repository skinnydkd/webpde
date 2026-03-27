# Styleguide — PDE

## Principis Visuals
- **Accessible i amigable:** Disseny modern però no intimidant
- **Coherència cross-pàgina:** Cada app té el seu color però comparteix estructura
- **Mobile-first:** Responsive amb Tailwind breakpoints (md, lg)
- **Sense framework UI extern** — tot és Tailwind pur

---

## Paleta de Colors

### Background Global
```css
body: bg-gradient-to-br from-amber-50 via-white to-pink-50
```

### Gradients per App
| App | Gradient (from → to) | Hex aproximat |
|-----|----------------------|---------------|
| Economia | `from-pink-500 to-rose-500` | #ec4899 → #f43f5e |
| Empresa | `from-amber-500 to-orange-500` | #f59e0b → #f97316 |
| Finances | `from-emerald-500 to-teal-500` | #10b981 → #14b8a6 |
| Vida Pràctica | `from-blue-500 to-indigo-500` | #3b82f6 → #6366f1 |
| Ferramentes | `from-indigo-500 to-purple-500` | #6366f1 → #a855f7 |
| Playground | Multicolor per joc | — |
| Concurs | `from-amber-500 to-yellow-500` | #f59e0b → #eab308 |
| Recerca | `from-slate-500 to-gray-500` | — |

### Colors d'Interacció
| Element | Color Tailwind | Hex |
|---------|---------------|-----|
| Links / Hover principal | `pink-500` | #ec4899 |
| Accent / Destacat | `yellow-400` | #facc15 |
| Scrollbar thumb | `#ec4899` | pink |
| Scrollbar track | `#fdf2f8` | rosa pàlid |
| Border hover | `pink-200` | #fbcfe8 |
| Text principal | `gray-800` | #1f2937 |
| Text secundari | `gray-500` | #6b7280 |

### Efectes Especials
```css
/* Gold glow per apps destacades (Playground, Concurs) */
@keyframes goldPulse {
  0%, 100% { box-shadow: 0 0 5px #fbbf24, 0 0 10px #f59e0b; }
  50%       { box-shadow: 0 0 15px #fbbf24, 0 0 25px #f59e0b; }
}
.gold-glow { animation: goldPulse 2s ease-in-out infinite; }
```

---

## Tipografia

### Font Principal (totes les pàgines excepte Playground)
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```
`font-family: 'Plus Jakarta Sans', sans-serif`

### Font Playground (exclusiva)
```html
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
```

### Escala Tipogràfica
| Ús | Classes Tailwind |
|----|-----------------|
| Hero / H1 | `text-4xl md:text-6xl font-black text-gray-800` |
| H2 Secció | `text-2xl md:text-3xl font-bold text-gray-800` |
| H3 Card | `text-xl font-bold text-gray-800` |
| Subtítol | `text-lg font-medium text-gray-500` |
| Body | `text-base text-gray-600` |
| Petit / Label | `text-sm text-gray-500` |
| Botó gran | `text-lg font-bold` |

---

## Components

### Header (sticky, cross-pàgina)
```jsx
// Semi-transparent, blur, border bottom
className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
```
Contingut: Logo 🎓 + nom PDE | Nav links | Language switcher (VAL/ES/EN)

### Cards d'App
```jsx
className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300
           border border-gray-100 hover:border-pink-200 overflow-hidden cursor-pointer
           hover:-translate-y-1"
```
- Gradient header amb icona gran
- Títol + descripció (line-clamp-2)
- Etiquetes de nivell educatiu
- Comptador de simuladors/temes

### Botó Principal (CTA)
```jsx
className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold
           px-8 py-4 rounded-xl shadow-lg hover:shadow-pink-500/30
           transition-all duration-300 hover:scale-105"
```

### Botó Secundari / Outline
```jsx
className="border-2 border-gray-200 text-gray-700 font-bold px-6 py-3
           rounded-xl hover:border-pink-300 hover:text-pink-600 transition-all"
```

### Selector d'Idioma
```jsx
// Botó actiu
className="px-3 py-1 rounded-lg text-sm font-semibold bg-pink-500 text-white"
// Botó inactiu
className="px-3 py-1 rounded-lg text-sm font-medium text-gray-500 hover:text-pink-500"
```

### Badges / Etiquetes
```jsx
// Nivell educatiu
className="px-2 py-0.5 bg-pink-50 text-pink-600 text-xs font-semibold rounded-full"
// HOT / JOCS (destacats)
className="px-2 py-0.5 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full"
```

### Scrollbar
```css
* { scrollbar-width: thin; scrollbar-color: #ec4899 #fdf2f8; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #fdf2f8; }
::-webkit-scrollbar-thumb { background-color: #ec4899; border-radius: 3px; }
```

---

## Layout

### Contenidor Principal
```jsx
className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
```

### Grid d'Apps
```jsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

### Seccions
```jsx
className="py-16 md:py-24"
```

### Responsive Breakpoints (Tailwind)
| Breakpoint | Píxels | Ús |
|------------|--------|-----|
| `sm` | 640px | Ajustos lleugers |
| `md` | 768px | 2 columnes, text gran |
| `lg` | 1024px | 3 columnes, layout complet |

---

## Animacions i Transicions
```css
/* Transició estàndard */
transition-all duration-300

/* Hover elevació cards */
hover:-translate-y-1 hover:shadow-2xl

/* Hover escala botó */
hover:scale-105

/* Gold pulse (Playground/Concurs) */
animation: goldPulse 2s ease-in-out infinite
```

---

## Icones
S'utilitzen **emojis** com a icones — no hi ha cap llibreria d'icones externa.

| App | Emoji |
|-----|-------|
| Economia | 📈 |
| Empresa | 🏢 |
| Finances | 👛 |
| Vida Pràctica | 🏠 |
| Ferramentes | 🔧 |
| Playground | 🎮 |
| Concurs | 🏆 |
| Recerca | 📚 |
| Inici/Logo | 🎓 |
