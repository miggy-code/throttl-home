# Throttl AI - Complete Design System Analysis

> A detailed breakdown of every visual element, layout pattern, and styling detail to recreate this site in any language/framework.

---

## Table of Contents
1. [Color Palette](#color-palette)
2. [Typography System](#typography-system)
3. [Layout Grid & Spacing](#layout-grid--spacing)
4. [Component Patterns](#component-patterns)
5. [Section Breakdowns by Page](#section-breakdowns-by-page)
6. [Animation Patterns](#animation-patterns)
7. [Responsive Behavior](#responsive-behavior)

---

## Color Palette

### Primary Brand Colors

```css
--navy:        #0F1C3F    /* Primary dark, headers, dark sections */
--navy-light:  #1A2E5A    /* Lighter navy variant */
--cream:       #F5F2EC    /* Primary light background */
--cream-dark:  #EAE6DC    /* Alternate cream background */
--gold:        #C9A84C    /* Accent, labels, highlights */
--gold-light:  #E2C97A    /* Lighter gold for text overlays */
--coral:       #E85D35    /* Primary CTA color */
--coral-dark:  #C94A24    /* Coral hover state */
--warm-gray:   #8A8278    /* Body text secondary */
--white:       #FFFFFF    /* Pure white for text on dark */
```

### Functional Color Applications

| Element | Color | Usage |
|---------|-------|-------|
| Body background | `cream` | Main page background |
| Dark sections | `navy` | Hero backgrounds, certification section |
| Primary text on light | `navy` | Headers, body text on cream |
| Primary text on dark | `white` | Headers on navy/coral |
| Secondary text on light | `#5A5550` or `warm-gray` | Body copy, descriptions |
| Secondary text on dark | `rgba(255,255,255,0.65-0.75)` | Body on dark backgrounds |
| Eyebrow labels | `coral` or `gold` | Small uppercase section labels |
| Primary CTA | `coral` → `coral-dark` on hover | Buttons, links |
| Borders on light | `rgba(15,28,63,0.07)` | Card borders, separators |
| Card shadows | `rgba(15,28,63,0.04-0.08)` | Box shadows |

---

## Typography System

### Font Families

```css
--font-heading: 'Fraunces', serif
--font-body: 'Outfit', sans-serif
```

**CDN Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400;1,9..144,600;1,9..144,700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

### Type Scale

#### Headings

**Hero H1** (Home page)
```css
font-family: 'Fraunces', serif
font-size: clamp(3rem, 6.5vw, 5rem)    /* 48px-80px */
font-weight: 700
line-height: 1.05
letter-spacing: -0.025em
color: #fff
```

**Page H1** (Internal pages)
```css
font-family: 'Fraunces', serif
font-size: clamp(2.5rem, 5.5vw, 4rem)    /* 40px-64px */
font-weight: 700
line-height: 1.08
letter-spacing: -0.02em
color: #fff
```

**Section H2**
```css
font-family: 'Fraunces', serif
font-size: clamp(1.8rem, 3.5vw, 2.75rem)    /* 28.8px-44px */
font-weight: 700
line-height: 1.15-1.2
color: navy (on light) | #fff (on dark)
```

**Card H3**
```css
font-family: 'Fraunces', serif
font-size: 1.5rem-1.55rem    /* 24px-24.8px */
font-weight: 700
line-height: 1.1-1.2
```

#### Body Text

**Hero Subheading**
```css
font-family: 'Outfit', sans-serif
font-size: clamp(1rem, 2vw, 1.2rem)    /* 16px-19.2px */
line-height: 1.75
color: rgba(255,255,255,0.72-0.75)
```

**Standard Body**
```css
font-family: 'Outfit', sans-serif
font-size: 0.97rem-1rem    /* 15.5px-16px */
line-height: 1.75-1.8
color: #5A5550 (light bg) | rgba(255,255,255,0.65) (dark bg)
```

**Small Body / Card Text**
```css
font-size: 0.85rem-0.875rem    /* 13.6px-14px */
line-height: 1.5-1.65
color: warm-gray | #3A3530
```

#### Eyebrow Labels

**Section Eyebrow**
```css
font-family: 'Outfit', sans-serif
font-size: 0.7rem    /* 11.2px */
font-weight: 700
letter-spacing: 0.14em
text-transform: uppercase
color: coral | gold
```

**Service Number Label**
```css
font-size: 0.7rem
font-weight: 700
letter-spacing: 0.08em-0.12em
text-transform: uppercase
```

---

## Layout Grid & Spacing

### Container

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;  /* 24px horizontal padding */
}
```

### Vertical Spacing

**Section Padding**
```css
padding: 6rem 0    /* 96px top/bottom - standard */
padding: 7rem 0    /* 112px - hero sections, major sections */
padding: 5rem 0    /* 80px - condensed sections */
```

**Inter-element Spacing**
- Section header to content: `3rem-4rem` (48px-64px)
- Between cards in grid: `1rem-2rem` (16px-32px)
- Card internal padding: `1.5rem-2.5rem` (24px-40px)
- List item spacing: `0.5rem-0.75rem` (8px-12px)

### Grid Systems

**Two-column Split** (text + visual)
```css
display: grid
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))
gap: 4rem
align-items: center
```

**Card Grids** (3-4 columns)
```css
display: grid
grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))
gap: 1rem-1.5rem
```

**Service Cards** (2 columns)
```css
display: grid
grid-template-columns: repeat(auto-fit, minmax(340px, 1fr))
gap: 2rem
```

---

## Component Patterns

### 1. Navigation Bar

**Structure:**
- Fixed position at top (z-index: 100)
- Height: 72px
- Transparent on load → cream background on scroll
- Backdrop blur on scroll: `blur(14px)`

**States:**
```css
/* Not scrolled */
background: transparent
border-bottom: 1px solid transparent

/* Scrolled */
background: rgba(245,242,236,0.96)
backdrop-filter: blur(14px)
border-bottom: 1px solid rgba(15,28,63,0.08)
```

**Logo:**
- Height: 34px
- Filter: `brightness(0) invert(1)` on dark hero pages (when not scrolled)
- Transition: `filter 0.35s ease`

**Navigation Links:**
```css
font-size: 0.875rem
font-weight: 500
opacity: 0.72 → 1.0 on hover
letter-spacing: 0.01em
transition: opacity 0.2s, color 0.35s
```

**CTA Button:**
```css
background: coral
color: white
padding: 0.5rem 1.25rem
border-radius: 3px
font-size: 0.825rem
font-weight: 700
letter-spacing: 0.04em
text-transform: uppercase
transition: background 0.2s, transform 0.15s
hover: background → coral-dark, translateY(-1px)
```

**Services Dropdown:**
```css
position: absolute
top: calc(100% + 18px)
min-width: 280px
background: white
border-radius: 6px
box-shadow: 0 12px 40px rgba(15,28,63,0.14), 0 2px 8px rgba(15,28,63,0.06)
border: 1px solid rgba(15,28,63,0.07)
padding: 0.5rem
animation: fadeDropdown 0.18s ease

/* Dropdown arrow */
position: absolute
top: -6px
left: 50%
width: 12px
height: 12px
background: white
border: 1px solid rgba(15,28,63,0.07)
rotate: 45deg
```

---

### 2. Hero Sections

**Layout:**
```css
position: relative
min-height: 70vh (internal pages) | 100vh (homepage)
display: flex
align-items: center
overflow: hidden
```

**Background Image Layer:**
```css
position: absolute
inset: 0
z-index: 0

img:
  width: 100%
  height: 100%
  object-fit: cover
  object-position: center 20-30%
```

**Gradient Overlay:**
```css
position: absolute
inset: 0
background: linear-gradient(110deg,
  navy-with-opacity(0xF0) 0%,
  navy-with-opacity(0xCC) 50%,
  navy-with-opacity(0x66) 100%)
```

**Grid Pattern Overlay:**
```css
position: absolute
inset: 0
background-image:
  linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
background-size: 60px 60px
opacity: 0.6 (homepage) | no opacity (internal pages)
```

**Content Container:**
```css
position: relative
z-index: 1
padding-top: 130px
padding-bottom: 80px-100px
max-width: 640px-720px
```

---

### 3. Card Components

#### White Card on Cream Background

```css
background: white
border-radius: 6px-8px
padding: 1.5rem-2.5rem
border: 1px solid rgba(15,28,63,0.07)
box-shadow: 0 2px 12px rgba(15,28,63,0.05)
transition: box-shadow 0.25s ease, transform 0.2s

hover:
  box-shadow: 0 8px 28px rgba(15,28,63,0.1)
  transform: translateY(-3px)
```

#### Service Card with Image

```css
background: white | navy
border-radius: 8px
overflow: hidden
box-shadow: 0 4px 24px rgba(15,28,63,0.08-0.15)

/* Image section */
height: 240px
position: relative
overflow: hidden

/* Gradient overlay on image */
background: linear-gradient(to top, navy-with-opacity 0%, transparent 60%)

/* Badge on image */
position: absolute
bottom: 1.25rem
left: 1.25rem
background: coral
color: white
padding: 3px 10px
border-radius: 2px
font-size: 0.7rem
font-weight: 700
letter-spacing: 0.08em
text-transform: uppercase

/* Content section */
padding: 2rem 2rem 2.5rem
```

#### Feature Card (Small icon + text)

```css
background: white
border-radius: 6px
padding: 1.25rem
border: 1px solid rgba(15,28,63,0.07)
box-shadow: 0 2px 10px rgba(15,28,63,0.05)

/* Icon container */
width: 32px-36px
height: 32px-36px
border-radius: 6px
background: navy-with-opacity(0.10) | coral-with-opacity(0.15)
display: flex
align-items: center
justify-content: center
margin-bottom: 0.75rem
```

---

### 4. Button Styles

#### Primary CTA (Coral)

```css
display: inline-flex
align-items: center
gap: 8px
background: coral
color: white
padding: 0.875rem 2rem (standard) | 0.95rem 2.25rem (large)
border-radius: 3px
font-weight: 700
font-size: 0.9rem
text-decoration: none
letter-spacing: 0.03em
transition: background 0.2s, transform 0.15s

hover:
  background: coral-dark
  transform: translateY(-2px)
```

#### Secondary CTA (Outline on Dark)

```css
display: inline-flex
align-items: center
gap: 8px
background: transparent
color: white
padding: 0.9rem 2rem
border-radius: 3px
font-weight: 600
font-size: 0.9rem
border: 1.5px solid rgba(255,255,255,0.35)
transition: border-color 0.2s, background 0.2s

hover:
  border-color: rgba(255,255,255,0.8)
  background: rgba(255,255,255,0.07)
```

#### White CTA on Coral Background

```css
background: white
color: coral
padding: 0.95rem 2.25rem
border-radius: 3px
font-weight: 700
font-size: 0.9rem
transition: transform 0.15s, box-shadow 0.2s

hover:
  transform: translateY(-2px)
  box-shadow: 0 8px 24px rgba(0,0,0,0.15)
```

---

### 5. List Items with Icons

**Checkmark List (Coral/Gold)**

```css
display: flex
align-items: flex-start
gap: 9px
margin-bottom: 0.5rem-0.6rem

/* Icon */
CheckCircle icon
size: 14px-15px
color: coral | gold
flex-shrink: 0
margin-top: 2px

/* Text */
font-size: 0.86rem-0.875rem
color: #3A3530 | rgba(255,255,255,0.75)
line-height: 1.5
```

**Topic/Toolkit List (Grid)**

```css
display: flex
align-items: flex-start | center
gap: 10px
background: white
border-radius: 6px
padding: 1rem 1.25rem
border: 1px solid rgba(15,28,63,0.07)

/* Bullet or Icon */
width: 6px
height: 6px
border-radius: 50%
background: gold | coral
flex-shrink: 0
```

---

### 6. Accelerator Step Cards (Transformation Page)

**Progress Bar:**
```css
display: flex
align-items: center
margin-bottom: 3.5rem

/* Circle */
width: 48px
height: 48px
border-radius: 50%
background: step-color
color: white
display: flex
align-items: center
justify-content: center
font-family: 'Fraunces'
font-weight: 700
font-size: 0.9rem
box-shadow: 0 4px 16px step-color-with-opacity(0.4)

/* Connector line */
height: 2px
flex: 1
background: rgba(15,28,63,0.12)
margin: 0 0.5rem
margin-bottom: 1.5rem
```

**Step Card (Alternating Layout):**
```css
display: grid
grid-template-columns: 1fr 2fr (even) | 2fr 1fr (odd)
gap: 0
border-radius: 10px
overflow: hidden
box-shadow: 0 4px 24px rgba(15,28,63,0.08)

/* Colored side panel */
background: step-color
padding: 3rem 2.5rem
display: flex
flex-direction: column
justify-content: center

/* Large number */
font-family: 'Fraunces'
font-size: 5rem
font-weight: 700
color: rgba(255,255,255,0.2)
line-height: 1

/* Step label */
font-family: 'Fraunces'
font-size: 2rem
font-weight: 700
color: white
line-height: 1.1

/* Tagline */
color: rgba(255,255,255,0.7)
font-size: 0.9rem
margin-top: 0.75rem

/* White content panel */
background: white
padding: 2.5rem 3rem
```

**Step Colors:**
- Step 01 (Identify): `#E85D35` (coral)
- Step 02 (Train): `#2A6FBF` (blue)
- Step 03 (Implement): `#1A7A5E` (green)
- Step 04 (Scale): `#C9A84C` (gold)

---

### 7. Footer

```css
background: #080E1E (very dark navy)
padding: 4rem 0 2rem

/* Grid */
display: grid
grid-template-columns: repeat(auto-fit, minmax(180px, 1fr))
gap: 3rem

/* Logo */
height: 30px
filter: brightness(0) invert(1)
opacity: 0.9

/* Section headers */
color: rgba(255,255,255,0.3)
font-size: 0.7rem
font-weight: 700
letter-spacing: 0.12em
text-transform: uppercase
margin-bottom: 1rem

/* Links */
color: rgba(255,255,255,0.55)
font-size: 0.875rem
transition: color 0.2s
hover: color → rgba(255,255,255,0.9)

/* Bottom bar */
border-top: 1px solid rgba(255,255,255,0.07)
padding-top: 1.5rem
display: flex
justify-content: space-between
align-items: center

/* Copyright text */
color: rgba(255,255,255,0.25)
font-size: 0.78rem
```

---

## Section Breakdowns by Page

### HOME PAGE

#### Section 1: Hero
- **Background:** Full viewport, hero image with navy gradient overlay + grid pattern
- **Height:** `min-height: 100vh`
- **Padding:** `padding-top: 130px, padding-bottom: 100px`
- **Content:** Eyebrow label (gold) + H1 (white with gold italic) + subheading + 2 CTAs
- **Scroll indicator:** Animated chevron at bottom center

#### Section 2: Problem (Navy)
- **Background:** `navy`
- **Layout:** 2-column grid (text left, stats grid right)
- **Stats:** 2x2 grid of stat cards with large serif numbers (gold) and small descriptions

#### Section 3: Use Cases (Cream)
- **Background:** `cream`
- **Layout:** Section header + 3-column grid (auto-fill, min 260px)
- **Cards:** 9 white cards with icon, title, description
- **Animation:** Staggered fade-in on scroll

#### Section 4: Services (Cream Dark)
- **Background:** `cream-dark`
- **Layout:** 2 large service cards side-by-side
- **Cards:** Image header with badge + content section + feature list + link

#### Section 5: Playbook Intro (Navy with Background Image)
- **Background:** Navy with playbook image (opacity 0.25) + gradient overlay
- **Layout:** Single column, max-width 680px
- **Content:** 4-step mini-cards with step number, label, description

#### Section 6: Who It's For (Cream)
- **Background:** `cream`
- **Layout:** 6 white cards in grid (auto-fill, min 280px)
- **Cards:** Coral accent bar + bold role + description

#### Section 7: Final CTA (Coral)
- **Background:** `coral` with grid pattern overlay
- **Layout:** Centered text + 2 CTAs
- **Pattern:** `linear-gradient` creating grid of `rgba(255,255,255,0.05)`

---

### WORKSHOPS PAGE

#### Section 1: Hero
- **Similar to home but:** min-height 70vh, workshops image, shorter copy

#### Section 2: What Are Workshops (Cream)
- **Layout:** 2-column (text left, 2x2 grid of feature cards right)
- **Feature cards:** Icon + bold label + description

#### Section 3: How It Works (Cream Dark)
- **Layout:** Centered header with CTA + 5-column grid of step cards
- **Step cards:** Number + icon + title + body (white cards)
- **Staggered animation:** Delay increases by 0.1s per card

#### Section 4: Topics (Cream)
- **Layout:** 2-column grid of topic items
- **Items:** Checkmark + topic text (white cards)

#### Section 5: Certification (Navy)
- **Layout:** 2-column (text left, image right - image currently not visible in code)
- **Content:** Gold eyebrow + H2 + body + 4 checkmark items (gold)

#### Section 6: Pricing (Cream)
- **Layout:** Centered text + CTA button
- **Simple centered section**

#### Section 7: CTA (Coral)
- **Same pattern as home page final CTA**

---

### TRANSFORMATION PAGE

#### Section 1: Hero
- **Similar to workshops hero**
- **Mentions "The Throttl Accelerator" in bold gold text**

#### Section 2: What Is It (Cream)
- **Layout:** 2-column (text left, 4 feature items right)
- **Features:** Icon + title + description (stacked vertically)

#### Section 3: The Throttl Accelerator (Cream Dark)
- **Layout:** Progress bar + alternating step cards
- **Step cards:** Colored panel (left/right alternating) + white content panel
- **Each step has:** Large background number, step label, tagline, body text, outcomes list

#### Section 4: Toolkit (Cream)
- **Layout:** Section header + grid of toolkit items
- **Items:** Small gold dot + toolkit name (white cards)

#### Section 5: CTA (Coral)
- **Same pattern as other pages**

---

### ABOUT PAGE

#### Section 1: Hero
- **Height:** `min-height: 60vh`
- **Simple hero:** Eyebrow + H1 + single paragraph

#### Section 2: Mission (Cream)
- **Layout:** 2-column (text left, quote card right)
- **Quote card:** Navy background, large opening quote mark (gold), italic quote text, author attribution with gold accent

#### Section 3: Services (Cream)
- **Layout:** 2 service cards in grid
- **Card 1 (Workshops):** Navy background, emoji icon 🎓, Service 01 label (gold), title, description, link (coral)
- **Card 2 (Transformation):** Coral background, emoji icon ⚡, Service 02 label, title, description, link (white)
- **Hover:** `translateY(-4px)` with enhanced shadow

#### Section 4: Values (Cream Dark)
- **Layout:** 6 white cards in grid (auto-fill, min 260px)
- **Cards:** Coral accent bar + bold title + description

#### Section 5: CTA (Navy)
- **Background:** Navy (instead of coral)
- **CTA button:** Coral

---

## Animation Patterns

### Scroll-Based Fade-In

**FadeSection Component:**
```css
/* Before in view */
opacity: 0
transform: translateY(28px)
transition: opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s

/* In view */
opacity: 1
transform: translateY(0)
```

**Staggered Grid Items:**
```css
transition-delay: ${index * 0.06-0.1}s
```

### Hover Animations

**Cards:**
```css
transition: box-shadow 0.25s ease, transform 0.2s
hover: transform: translateY(-3px to -5px)
```

**Buttons:**
```css
transition: background 0.2s, transform 0.15s
hover: transform: translateY(-2px)
```

**Links:**
```css
transition: gap 0.2s (for links with arrows)
hover: gap increases from 7px to 12px
```

### Scroll Indicator (Homepage)

```css
animation: bounce 2.2s ease-in-out infinite

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0) }
  50% { transform: translateX(-50%) translateY(8px) }
}
```

### Dropdown Animation

```css
animation: fadeDropdown 0.18s ease

@keyframes fadeDropdown {
  from {
    opacity: 0
    transform: translateX(-50%) translateY(-6px)
  }
  to {
    opacity: 1
    transform: translateX(-50%) translateY(0)
  }
}
```

---

## Responsive Behavior

### Breakpoints

The site uses Tailwind's default breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Mobile Navigation

**Trigger:** `md:hidden` class shows hamburger menu below 768px

**Mobile Menu:**
```css
background: cream
border-top: 1px solid rgba(15,28,63,0.08)
padding: 1.25rem 1.5rem 2rem

/* Links */
padding: 0.8rem 0
border-bottom: 1px solid rgba(15,28,63,0.06)

/* Services accordion */
Services button with ChevronDown
Expandable list with left coral border (2px)
```

### Grid Responsiveness

**Auto-fit Pattern:**
```css
grid-template-columns: repeat(auto-fit, minmax(Xpx, 1fr))
```
- Cards: `minmax(260px-340px, 1fr)`
- Features: `minmax(280px-300px, 1fr)`

**Clamp for Typography:**
```css
font-size: clamp(min, preferred, max)
```
All major headings use clamp for fluid scaling

### Container Padding

```css
padding: 0 1.5rem    /* 24px on mobile/desktop */
```

### Section Padding

Typically remains consistent but can be reduced on mobile:
```css
padding: 6rem 0    /* Can reduce to 4rem on mobile */
```

---

## Image Assets

### CDN URLs

All images served from CloudFront CDN:
- Hero: `throttl-hero-*.webp`
- Workshops Hero: `throttl-workshops-hero-*.webp`
- Enablement Hero: `throttl-enablement-hero-*.webp`
- Playbook Hero: `throttl-playbook-hero-*.webp`
- Training: `throttl-training-*.webp`
- Embed: `throttl-embed-*.webp`
- Cert: `throttl-cert-*.webp`
- Logo: `throttl_logo_*.png`

### Image Styling

**Hero Images:**
```css
width: 100%
height: 100%
object-fit: cover
object-position: center 20-30%
```

**Service Card Images:**
```css
width: 100%
height: 100%
object-fit: cover
transition: transform 0.5s ease
```

---

## Iconography

**Library:** Lucide React
**Common Icons:**
- ArrowRight (16px on buttons, 14px on links)
- CheckCircle2 (14-15px for lists)
- ChevronDown (14-16px for dropdowns)
- Menu, X (22px for mobile menu)
- BarChart2, Zap, MessageSquare, FileText, Users, Calendar, TrendingUp, Clock, Send (Use case icons)
- Search, Map, Wrench, TrendingUp (Transformation feature icons)
- BookOpen, Target, Award, Clock (Workshop step icons)

**Icon Container Pattern:**
```css
width: 32px-40px
height: 32px-40px
border-radius: 6px-8px
background: color-with-opacity(0.10-0.22)
display: flex
align-items: center
justify-content: center
```

---

## Special Effects

### Gradient Overlays

**Hero Gradient:**
```css
background: linear-gradient(110deg,
  navy+F0-F5 0%,
  navy+CC 50%,
  navy+66-77 100%)
```

**Image to Text Gradient:**
```css
background: linear-gradient(to top, navy+CC-EE 0%, navy+55 60-100%)
```

### Grid Pattern Background

```css
background-image:
  linear-gradient(rgba(255,255,255,0.03-0.05) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.03-0.05) 1px, transparent 1px)
background-size: 48px-60px 48px-60px
```

### Box Shadows

**Subtle:**
```css
box-shadow: 0 2px 12px rgba(15,28,63,0.05)
```

**Medium:**
```css
box-shadow: 0 4px 24px rgba(15,28,63,0.08)
```

**Strong:**
```css
box-shadow: 0 12px 40px rgba(15,28,63,0.15)
```

**Hover Enhanced:**
```css
box-shadow: 0 8px 28px rgba(15,28,63,0.1) to 0 16px 48px rgba(15,28,63,0.13)
```

### Backdrop Blur

**Navbar on scroll:**
```css
backdrop-filter: blur(14px)
background: rgba(245,242,236,0.96)
```

---

## Border Radius Standards

- Cards: `6px-8px`
- Large cards: `8px-10px`
- Buttons: `3px` (sharp, intentional)
- Badges: `2px`
- Icons: `6px-8px`
- Circular badges: `50%`

---

## Transition Standards

**Standard transitions:**
- Color changes: `0.2s`
- Opacity: `0.2s-0.35s`
- Transform: `0.15s-0.2s`
- Box-shadow: `0.2s-0.3s`
- Background: `0.2s`

**Scroll animations:**
- Fade-in: `0.7s ease`
- Transform: `0.7s ease`
- Stagger: Add `0.06s-0.12s` per item

---

## Z-Index Layers

```css
Navbar: 100
Dropdown: Auto (inside navbar)
Hero background: 0
Hero content: 1
Modal/overlay: 1000+ (if needed)
```

---

## Accessibility Considerations

- All buttons have hover states
- Focus states should mirror hover states
- Color contrast ratios meet WCAG AA standards
- Font sizes maintain readability (minimum 0.7rem for labels, 0.85rem for body)
- Links have adequate target size (minimum 44x44px for buttons)

---

## Performance Notes

- All fonts use `display=swap` for FOIT prevention
- Images are WebP format for smaller file sizes
- CDN delivery for all images
- Transitions use GPU-accelerated properties (transform, opacity)
- Backdrop-filter only on scrolled navbar (progressive enhancement)

---

## Summary Checklist for Implementation

- [ ] Import Fraunces and Outfit fonts from Google Fonts
- [ ] Define color palette CSS variables
- [ ] Set up container with max-width 1200px
- [ ] Create navbar with fixed positioning and scroll detection
- [ ] Build hero sections with image, gradient, and grid overlays
- [ ] Implement FadeSection component with IntersectionObserver
- [ ] Create card components (white on cream, service cards, feature cards)
- [ ] Set up button styles (primary coral, secondary outline, white on coral)
- [ ] Build footer with dark background
- [ ] Add staggered animations to grid items
- [ ] Implement hover states for all interactive elements
- [ ] Test responsive behavior at key breakpoints
- [ ] Ensure mobile menu functionality
- [ ] Optimize images and use WebP format
- [ ] Test scroll animations and performance

---

**End of Design System Analysis**

This document provides all visual specifications needed to recreate the Throttl AI website in any language, framework, or platform. Every color, spacing value, animation, and layout pattern has been documented for pixel-perfect reproduction.
