# BuildBridge SA — Design Specification
**Date:** 2026-04-11  
**Project:** INF3014F eCommerce Project  
**Due:** 2026-04-20  
**Stack:** React + Vite + Tailwind CSS + shadcn/ui + React Router v6

---

## 1. Project Overview

**BuildBridge SA** is a B2B-to-C surplus construction materials marketplace. Civil contractors list surplus materials (off-cuts, cement, fencing, timber) at steep discounts. Township builders and DIY home improvers purchase these materials at 50–80% below retail.

**Tagline:** *Bridging the gap between construction surplus and community development.*

**Social Impact:** Diverts landfill waste from construction sites. Provides affordable quality materials to informal settlement builders in South Africa.

---

## 2. Design System

### Color Palette
| Token | Value | Use |
|-------|-------|-----|
| Background | `#F8FAFC` | Page background (off-white) |
| Primary | `#1E293B` | Headings, navbar, dark sections |
| Accent / Orange | `#F97316` | CTAs, highlights, badges, active states |
| Secondary / Blue | `#0EA5E9` | Trust indicators, secondary links |
| Muted | `#64748B` | Body text, labels |
| Card surface | `#FFFFFF` | Product cards, panels |
| Dark bg (dark mode) | `#0F172A` | Dark mode page background |

### Typography
| Role | Font | Weight |
|------|------|--------|
| Headings | Rubik | 700, 900 |
| Body | Nunito Sans | 400, 500, 600 |
| Stat/display | Rubik | 900 |

Google Fonts import:
```
https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700&family=Rubik:wght@300;400;500;600;700;900&display=swap
```

### Spacing & Layout
- Max content width: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Section padding: `py-20` desktop, `py-12` mobile
- Card border radius: `rounded-2xl`
- z-index scale: navbar=50, drawer=40, modal=30, tooltip=20

---

## 3. Page Architecture

### 3.1 Landing Page (`/`)

**Navbar**
- Floating, 4px from edges: `top-4 left-4 right-4 fixed`
- `backdrop-blur-md bg-white/80` with `rounded-2xl shadow-sm`
- Logo left, nav links center, Cart icon + Wishlist icon + dark mode toggle right
- 2px orange scroll-progress bar at very top of viewport (JS scroll listener)
- Shrinks slightly on scroll (`py-4` → `py-2`, `transition-all duration-300`)

**Hero Section**
- Full viewport height (`min-h-screen`)
- **Split layout:** Left panel = "I'm a Builder" (buyer), Right panel = "I'm a Contractor" (supplier)
- On hover: active panel expands to 60% width, other collapses to 40% (`transition-all duration-500`)
- Each panel has its own headline, subtext, and CTA button
- **Animated SVG blueprint grid background** — faint graph-paper pattern drifting upward via CSS `@keyframes`
- **Grain/noise overlay** — SVG `feTurbulence` filter at 4% opacity over hero
- **Clip-path text reveal** — hero headline words reveal via `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)`, staggered per word
- **Custom cursor** — small orange dot (`w-3 h-3`) + large translucent circle (`w-12 h-12`), lerp-smoothed, grows on hover over interactive elements, hidden on touch devices

**Impact Stats Row**
- 3 stats: "2,400+ Tonnes Diverted", "R1.2M Saved by Builders", "340+ Community Builders"
- Numbers count up from 0 on IntersectionObserver entry (`requestAnimationFrame` loop)
- Oversized faded section number `"01"` in background at `opacity-[0.04]`, `text-[20vw]`, `font-black`

**"The Problem → Solution" Storytelling Section**
- Split animation on scroll: left shows dump-fee cost counter (counts up, red), right shows builder savings (counts up, green)
- Both panels merge toward center with a connecting line animation
- Text: *"BuildBridge connects them."*

**Horizontal Scroll Categories**
- CSS scroll-driven: section is `sticky top-0 h-screen`, inner strip translates horizontally as user scrolls vertically
- 5 category cards: Bricks, Cement, Timber, Roofing, Scaffolding
- Each card has icon (SVG), count of active listings, and hover tilt (3D `perspective`)

**Featured Listings Grid**
- 6 product cards, staggered fade-in on scroll (IntersectionObserver + CSS class toggle, `animation-delay` staggered)
- Cards: image, condition badge (pulsing glow for "Urgent Clearance"), location tag, price in orange, "Add to Cart" button slides up from card bottom on hover (`overflow-hidden` + `translateY`)
- 3D tilt on hover: `perspective(1000px) rotateX() rotateY()` based on mouse position within card

**Live Activity Feed**
- Floating card bottom-right (`fixed bottom-6 right-6`)
- Cycles every 4s: *"Sipho in Khayelitsha just saved R1,240 on facebrick"*
- Slide-in/out via `translateY` CSS transition

**"How It Works" Timeline**
- 3-step horizontal timeline
- Connector line draws left-to-right on scroll via `scaleX(0→1)` from left origin

**Supplier CTA Band**
- Dark slate background (`#1E293B`), orange button, white text
- Orange gradient text on select headline words (`background-clip: text`)

**Footer**
- Dark slate, animated impact counters, social links, nav links

---

### 3.2 Shop / Product Catalog (`/shop`)

**Layout**
- Sidebar filters (desktop) / Drawer filters (mobile, shadcn Sheet)
- Filter options: Category (checkboxes), Condition (New Surplus / Reclaimed), Location, Price range slider

**Search**
- Sticky search bar at top
- Live filter: JS `.filter()` on products array on every keystroke (no page reload)
- Animated: results re-render with a subtle `opacity` fade

**Product Cards**
- Image with lazy loading (`loading="lazy"`)
- Condition badge with pulsing glow for "Urgent Clearance"
- Location chip (sky blue)
- Price bold in orange, unit label muted (`per brick`, `per bag`)
- "Add to Cart" button slides up from bottom on hover
- Wishlist heart: SVG `stroke-dashoffset` draw animation on toggle, fills orange, `scale-125` pop

**Shimmer Skeleton**
- Shown for 600ms on initial mount before products render
- CSS gradient sweep animation

---

### 3.3 Smart Estimator (`/estimator`) — The 10-Mark Feature

**Layout**
- Split: left = input form, right = live result panel (sticky on desktop)
- Page entry: form slides up from below + result panel fades in from right simultaneously

**Inputs**
- Project Type: styled `<select>` (Wall, Floor, Paving)
- Length: `<input type="range">` + number input (styled construction-themed sliders, orange thumb)
- Height: same
- Both update result panel in real-time on `input` event (no button needed for preview)

**Calculation Logic (Wall)**
```js
const TotalArea = length * height;
const requiredBricks = Math.ceil(TotalArea * 50);
const requiredCement = Math.ceil(requiredBricks / 150);
const requiredSand = Math.ceil(TotalArea * 0.02); // cubic meters
```

**Visual Output**
- SVG wall diagram redraws live, proportional to entered dimensions (unique — no CMS can do this)
- Numbers count up when Calculate is clicked

**Recommended Bundle Component**
- Appears with slide-in from right + orange gradient border
- Shows matched products from mock DB (checks `stockQuantity >= required`)
- "Add Entire Bundle to Cart (10% Discount)" — full-width high-contrast button, cart icon animates on click

---

### 3.4 Cart & Checkout (Drawer + `/checkout`)

**Cart Drawer**
- shadcn `Sheet` component, slides in from right (`translateX`)
- Line items: image thumbnail, name, quantity stepper (+/− buttons), remove (×)
- Bundle discount line: struck-through subtotal, "Bundle Discount -10%" in green
- 7.5% platform fee shown as line item (per business model)
- "Proceed to Checkout" button → navigates to `/checkout`

**Checkout Page**
- Order summary (readonly)
- Delivery address form (name, address, phone — no validation library, native HTML5)
- "Complete Order" button → confetti burst + success modal
- Confetti: JS spawns 60 `<div>` elements with random CSS `@keyframes` trajectories, cleaned up after 3s
- Success modal: shadcn `Dialog`, order number (random 6-char), "Continue Shopping" button

---

### 3.5 Wishlist (Slide-out Panel)

- shadcn `Sheet` from right, distinct orange header
- Lists saved items with "Add to Cart" and "Remove" per item
- Empty state: SVG illustration + "Your wishlist is empty" message

---

## 4. State Management

All state via React Context + `useReducer`:

```
CartContext   — items[], addItem, removeItem, updateQty, applyBundleDiscount, clearCart
WishlistContext — items[], addItem, removeItem
UIContext     — cartOpen, wishlistOpen, darkMode, estimatorResult
```

No external state library (Redux, Zustand). Context is sufficient for this scope.

---

## 5. Mock Data (`src/data/products.js`)

Array of 20+ products:
```js
{
  id: string,
  name: string,
  category: 'bricks' | 'cement' | 'timber' | 'roofing' | 'scaffolding',
  condition: 'New Surplus' | 'Reclaimed',
  price: number,          // ZAR
  stockQuantity: number,
  unit: string,           // 'per brick' | 'per bag' | 'per meter' | 'per sheet'
  imageUrl: string,       // Unsplash URL with construction materials
  location: string,       // Cape Town suburb
  urgent: boolean,        // triggers pulsing badge
  discount: number,       // % off original retail (for display)
}
```

---

## 6. Animation Implementation Rules

| Effect | Method | Notes |
|--------|--------|-------|
| Scroll fade-in | IntersectionObserver + CSS class toggle | `.animate-in` class adds `opacity-100 translate-y-0` |
| Number counters | `requestAnimationFrame` easing | Ease-out curve |
| Hero text stagger | CSS `animation-delay` per `<span>` | Clip-path wipe |
| Card 3D tilt | `onMouseMove` → `perspective rotateX/Y` | Reset on `onMouseLeave` |
| Cart/Wishlist drawer | shadcn Sheet (built-in transition) | — |
| Confetti | JS spawn + CSS `@keyframes` | Cleanup after 3s |
| Custom cursor | `mousemove` listener + lerp | Hidden on `pointer: coarse` |
| Magnetic buttons | `mousemove` proximity math + `translate` | Max offset 8px |
| Horizontal scroll | CSS sticky + scroll-driven `translateX` | IntersectionObserver trigger |
| SVG wall diagram | React state → SVG `width/height` attributes | Redraws on slider change |
| Scroll progress bar | `scroll` event → `scaleX` on bar element | `transform-origin: left` |
| Dark mode | `class="dark"` on `<html>` + CSS vars | `localStorage` persistence |

**All animations must include:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. File Structure

```
src/
  components/
    layout/
      Navbar.jsx
      Footer.jsx
      CustomCursor.jsx
      ScrollProgressBar.jsx
      LiveActivityFeed.jsx
    ui/           (shadcn components)
    landing/
      HeroSplit.jsx
      StatsRow.jsx
      ProblemSolution.jsx
      HorizontalCategories.jsx
      FeaturedListings.jsx
      HowItWorks.jsx
      SupplierCTA.jsx
    shop/
      ProductCard.jsx
      ProductGrid.jsx
      FilterSidebar.jsx
      SearchBar.jsx
      SkeletonCard.jsx
    estimator/
      EstimatorForm.jsx
      ResultPanel.jsx
      WallDiagram.jsx
      RecommendedBundle.jsx
    cart/
      CartDrawer.jsx
      CartItem.jsx
    wishlist/
      WishlistDrawer.jsx
    checkout/
      CheckoutForm.jsx
      SuccessModal.jsx
      Confetti.jsx
  context/
    CartContext.jsx
    WishlistContext.jsx
    UIContext.jsx
  data/
    products.js
  hooks/
    useIntersectionObserver.js
    useCountUp.js
    useCustomCursor.js
    useMagneticButton.js
  pages/
    LandingPage.jsx
    ShopPage.jsx
    EstimatorPage.jsx
    CheckoutPage.jsx
  App.jsx
  main.jsx
  index.css
```

---

## 8. Routing

```jsx
<Routes>
  <Route path="/"          element={<LandingPage />} />
  <Route path="/shop"      element={<ShopPage />} />
  <Route path="/estimator" element={<EstimatorPage />} />
  <Route path="/checkout"  element={<CheckoutPage />} />
</Routes>
```

Cart and Wishlist are drawers (no route), triggered via UIContext.

---

## 9. Accessibility & Performance

- All images: `alt` text describing material
- All icon-only buttons: `aria-label`
- Tab order matches visual order
- Focus rings visible (`focus-visible:ring-2 ring-orange-500`)
- Minimum 16px body text
- Touch targets minimum 44×44px
- `loading="lazy"` on all below-fold images
- No horizontal scroll on any breakpoint
- Tested breakpoints: 375px, 768px, 1024px, 1440px

---

## 10. Out of Scope

- Real payment gateway (success modal only)
- User authentication / login
- Backend / database (mock data only)
- Supplier upload flow (supplier CTA links to a "Coming Soon" toast)

---

## 11. About Page (`/about`) — "Blueprint Editorial"

**Aesthetic direction:** Editorial / industrial. Feels like a premium South African brand story — dark hero, drawn timeline, impactful pull-quote.

**Unforgettable element:** Vertical timeline where the connecting SVG line *draws itself* on scroll via `stroke-dashoffset` animation — like a blueprint being drafted in real time.

### Sections

**11.1 Hero Band**
- `bg-slate-900` full-width, `py-32`
- Rubik 900 heading: "Building a Better South Africa" — staggered word reveal via `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)`, 80ms stagger per word (same pattern as HeroSplit)
- Orange underline accent below heading (2px, animated width 0→100% on mount)
- Subheading in `text-slate-400`: "Turning construction surplus into community opportunity."
- Grain SVG overlay at `opacity-[0.04]`

**11.2 Mission Pull-Quote**
- Light background (`bg-slate-50 dark:bg-slate-900`)
- Oversized italic Rubik quote: *"Every tonne of surplus concrete diverted is a foundation laid for someone's future."*
- 4px left orange border (`border-l-4 border-orange-500`)
- Clip-path slide-in from left on IntersectionObserver entry

**11.3 Animated Blueprint Timeline**
- 4 milestones, alternating left/right layout (desktop), single column (mobile):
  - **2022** — "BuildBridge SA Founded in Cape Town"
  - **2023** — "100+ Active Surplus Suppliers Onboarded"
  - **2024** — "1,200 Community Builders Served"
  - **2026** — "R1.2M Saved Across the Western Cape"
- Vertical SVG line between milestones: `stroke-dasharray` equals total path length, `stroke-dashoffset` animates from full length → 0 as section scrolls into view (IntersectionObserver triggers requestAnimationFrame loop)
- Each milestone card: `rounded-2xl`, `border border-slate-200 dark:border-slate-700`, orange year badge, fade-in with staggered `animation-delay`

**11.4 Impact Stats Band**
- `bg-slate-900` dark band, `py-20`
- 3 count-up stats using `useCountUp` hook:
  - `2400+` Tonnes Diverted from Landfill
  - `R1.2M` Saved by Builders
  - `340+` Community Builders Helped
- Same pattern as `StatsRow` component on landing page

**11.5 Values Grid**
- 3 cards on light background:
  1. **Circular Economy** — SVG recycle/loop icon
  2. **Community First** — SVG people/community icon
  3. **Radical Transparency** — SVG document/open icon
- Cards: `rounded-2xl`, `border-2 border-transparent hover:border-orange-500`, 3D tilt on mousemove (same as ProductCard)
- Each card: icon (orange, `w-12 h-12`), bold title, body text description, fade-in on scroll with staggered delay

---

## 12. Contact Page (`/contact`) — "Industrial Precision"

**Aesthetic direction:** Clean, purposeful, industrial. Not a boring form dump — structured like a construction blueprint with precision.

**Unforgettable element:** Floating label inputs where the label *builds upward* on focus — `transform: translateY(-24px) scale(0.85)` transition, mimicking a scaffold rising.

### Sections

**12.1 Compact Hero**
- Reuse blueprint SVG grid background (from HeroSplit's `driftUp` animation)
- `py-24` with `bg-slate-900` dark background
- Heading: "Let's Build Together" — Rubik 900, white, clip-path reveal on mount
- Subtext: "Whether you're a supplier, builder, or just curious — we want to hear from you."

**12.2 Split Contact Layout**
Full-width section, `grid grid-cols-1 lg:grid-cols-2 gap-0`:

**Left Panel** (`bg-slate-900 dark:bg-slate-950`, `p-12`):
- Section label: "REACH US" (uppercase, `text-orange-500`, `tracking-widest`, small)
- 3 contact info cards, each `flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition`:
  - Email: `hello@buildbridgesa.co.za` — Mail icon
  - WhatsApp: `+27 21 000 0000` — Phone icon
  - Location: `Cape Town, Western Cape, South Africa` — MapPin icon
- Office hours strip: Mon–Fri 08:00–17:00 SAST, `text-slate-400 text-sm`
- Subtle orange gradient background blob (`absolute`, `blur-3xl`, `opacity-10`) behind the panel

**Right Panel** (`bg-white dark:bg-slate-800`, `p-12`):
- Section label: "SEND A MESSAGE"
- Contact form with **floating label inputs**:
  - Full Name (text)
  - Email Address (email)
  - Subject (select): General Enquiry / Supplier Onboarding / Bulk Order / Technical Support
  - Message (textarea, 5 rows)
- Each input: `border-b-2 border-slate-300 focus:border-orange-500` (underline style, no full border box)
- Floating label: `absolute top-4 left-0`, transitions on input focus/fill: `translateY(-24px) scale(0.85) text-orange-500`
- Submit button: full-width `bg-orange-500 text-white rounded-2xl py-4`, hover shows orange pulse ring (`ring-4 ring-orange-500/30`), magnetic effect via `useMagneticButton`
- On submit: button replaced inline with green `✓ Message Sent! We'll respond within 24 hours.` (no page reload, `useState`)

---

## 13. Updated Routing

```jsx
<Routes>
  <Route path="/"          element={<LandingPage />} />
  <Route path="/shop"      element={<ShopPage />} />
  <Route path="/estimator" element={<EstimatorPage />} />
  <Route path="/checkout"  element={<CheckoutPage />} />
  <Route path="/about"     element={<AboutPage />} />
  <Route path="/contact"   element={<ContactPage />} />
</Routes>
```

Navbar `navLinks` array updated to include About and Contact. Footer navigate links updated to include both.

---

## 14. Updated File Structure (additions only)

```
src/
  pages/
    AboutPage.jsx       ← new
    ContactPage.jsx     ← new
  components/
    about/
      AboutHero.jsx     ← new
      MissionQuote.jsx  ← new
      BlueprintTimeline.jsx ← new (SVG stroke-dashoffset draw)
      ValuesGrid.jsx    ← new
    contact/
      ContactHero.jsx   ← new
      ContactInfo.jsx   ← new
      ContactForm.jsx   ← new (floating label inputs)
```
