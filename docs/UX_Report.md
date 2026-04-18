# BuildBridge SA — User Experience Analysis Report

**Course:** INF3014F — 2026  
**Project:** BuildBridge SA — Surplus Construction Materials Marketplace  
**Due Date:** 20 April 2026

---

## 1. Introduction

BuildBridge SA serves two distinct user groups: community builders who need affordable materials, and civil contractors who need to clear surplus stock. Designing for both requires understanding their different goals, contexts, and technical capabilities. This UX analysis documents the two primary user personas derived from the target market and presents a Hierarchical Task Analysis (HTA) for the platform's signature feature — the Smart Project Estimator.

---

## 2. User Personas

### Persona 1 — The Buyer

---

**Name:** Sipho Ndlovu  
**Age:** 35  
**Location:** Khayelitsha, Cape Town  
**Occupation:** Informal builder / subcontractor  
**Education:** Grade 12, self-taught bricklaying  
**Device:** Mid-range Android smartphone (Samsung A-series)  
**Internet access:** Mobile data (data-conscious, uses Wi-Fi where available)

> *"I need to know exactly what to buy before I go anywhere. Getting it wrong costs me jobs."*

---

**Background**

Sipho has been building walls, extending shack rooms into brick structures, and repairing roofing across Khayelitsha for eight years. He gets most of his work through word of mouth and WhatsApp referrals. He is typically hired by homeowners who want to expand their informal dwellings or repair storm damage. Sipho does not own a large vehicle, so he relies on local bakkie drivers for material delivery.

**Goals**
- Source affordable, quality construction materials without travelling to Bellville or Parow
- Calculate exactly how many bricks and bags of cement he needs so he does not over-buy
- Get materials delivered to the job site, not to a depot
- Build a reputation for completing jobs on budget and on time

**Pain Points**
- Retail hardware stores (Builders Warehouse, Build It) charge full price — margins eat into his earnings
- He often miscalculates material quantities and has to make multiple trips, costing him data and taxi fare
- Untrustworthy suppliers with unknown stock levels waste his time
- He is not always comfortable with technical language or complex interfaces on websites

**Behaviours**
- Checks WhatsApp and Facebook groups daily for local construction tips and job leads
- Price-sensitive: compares prices before committing
- Makes decisions quickly on mobile — long forms or slow pages cause him to abandon
- Trusts platforms that show location, stock quantity, and price upfront — no hidden costs

**Technology Comfort**
- Comfortable with WhatsApp, Facebook, and basic mobile browsing
- Not comfortable with multi-step account registration or complex navigation
- Prefers visual content (images, icons) over dense text

**How BuildBridge SA Serves Sipho**
- The Smart Project Estimator lets him input wall dimensions and get exact material quantities — removing the guesswork that causes overbuying
- Prices are shown upfront in Rands per unit with clear location info
- The 10% bundle discount rewards buying the full recommended bundle in one click
- Cart and checkout are simple and visual with minimal form fields

---

### Persona 2 — The Supplier

---

**Name:** Sarah van der Merwe  
**Age:** 42  
**Location:** Milnerton, Cape Town (construction site: Century City)  
**Occupation:** Site Manager, mid-sized civil engineering firm  
**Education:** National Diploma in Construction Management  
**Device:** Desktop PC on site, sometimes tablet  
**Internet access:** Broadband via site Wi-Fi

> *"I need the excess materials gone by Friday. Every day they sit here is money wasted."*

---

**Background**

Sarah manages a team of 40 on a commercial office park development. They are two weeks from handover. The site has leftover stock — three pallets of facebrick, 50 bags of OPC cement, and a bundle of treated timber offcuts. Disposing of this material legally costs money and requires booking a skip. Her company is also under pressure to improve its ESG (Environmental, Social, Governance) score before its next annual report.

**Goals**
- Clear surplus materials quickly — ideally within 48 hours
- Avoid paying landfill or skip fees for usable material
- Record the disposal in a way that contributes to the firm's ESG reporting
- Not spend more than 20 minutes setting up a listing

**Pain Points**
- Traditional disposal methods (skips, landfill) cost money and generate paperwork
- Charity donations take time to coordinate and materials may sit uncollected
- She cannot justify the admin overhead of listing items on Facebook Marketplace or Gumtree individually
- Her company's compliance team requires proof of responsible disposal

**Behaviours**
- Works long hours, values speed and efficiency
- Desktop-first user — prefers a professional-looking platform over a consumer-style app
- Will only trust a platform that looks legitimate and professional
- Likely to return if the first experience is easy and materials are collected promptly

**Technology Comfort**
- Comfortable with business tools: email, Excel, project management software
- Not a frequent consumer e-commerce user, but comfortable with digital forms
- Values clear information architecture — wants to find what she needs without hunting

**How BuildBridge SA Serves Sarah**
- Contractor onboarding flow allows quick material listing (category, quantity, location, available from/to date)
- Zero listing fee removes financial barrier to participation
- ESG credit mechanism gives Sarah a digital record of responsible surplus disposal
- Platform fee is charged to the buyer — Sarah pays nothing to list

---

## 3. Hierarchical Task Analysis (HTA)

**Task:** Sipho uses the Smart Project Estimator to purchase materials for a 5-metre boundary wall.

**Goal:** Complete the purchase of the correct quantity of bricks and cement at the lowest available price, with delivery to his job site.

---

### Level 0 — Top-Level Task

**0. Purchase materials for a 5-metre boundary wall using the Smart Estimator**

*Plan 0: Complete subtasks 1, 2, 3, 4 in sequence. If stock is not available at step 3.2, go to step 3.3 (browse shop manually). If checkout fails, retry step 4.*

---

### Level 1 — Main Subtasks

**1. Access the Smart Project Estimator**  
**2. Input project parameters**  
**3. Review calculation output and select bundle**  
**4. Complete checkout**

---

### Level 2 — Decomposed Steps

**1. Access the Smart Project Estimator**  
1.1. Open BuildBridge SA on mobile browser  
1.2. Observe landing page hero section  
1.3. Tap "Smart Estimator" in the navigation bar  
*[Alternative: Tap the "Use Smart Estimator" CTA button on the landing page]*  
1.4. Estimator page loads with two sliders (Wall Length, Wall Height)

**2. Input project parameters**  
2.1. Drag the Wall Length slider to 5 metres  
2.1.1. Observe live wall diagram updating proportionally  
2.1.2. Confirm value shown below slider reads "5m"  
2.2. Drag the Wall Height slider to 1.8 metres  
2.2.1. Observe live wall diagram updating  
2.2.2. Confirm value shown below slider reads "1.8m"

**3. Review calculation output and select bundle**  
3.1. Read result cards:  
3.1.1. Total Wall Area: 9 m²  
3.1.2. Bricks Required: 450  
3.1.3. Cement Bags: 3  
3.1.4. Sand: 0.18 m³  
3.2. View Recommended Bundle panel (showing matched surplus products from the database)  
3.2.1. Read product name and quantity for bricks line item  
3.2.2. Read product name and quantity for cement line item  
3.2.3. Read "After 10% bundle discount" final price  
3.3. *(If no stock match)* Read "No matching surplus stock" message and navigate to /shop to browse manually  
3.4. Tap "Add Bundle to Cart (10% Off)" button  
3.4.1. Observe button turns green with "✓ Bundle Added to Cart!" for 2 seconds  
3.4.2. Observe cart icon in navbar updates with item count

**4. Complete checkout**  
4.1. Tap cart icon in navbar to open Cart Drawer  
4.1.1. Verify line items match the bundle (bricks × 450, cement × 3)  
4.1.2. Verify 10% bundle discount is shown as a deduction  
4.1.3. Verify 7.5% platform fee is shown  
4.1.4. Verify final total in Rands  
4.2. Tap "Proceed to Checkout →"  
4.3. Complete checkout form (name, delivery address, contact number)  
4.4. Tap "Complete Order"  
4.5. Observe order success screen with confetti animation and confirmation message  
4.6. Note order reference for WhatsApp follow-up with delivery driver

---

### HTA Summary Table

| Step | Action | Trigger | Feedback |
|------|--------|---------|----------|
| 1.3 | Tap nav link | User intent | Page transition, scroll to top |
| 2.1 | Drag length slider | Touch gesture | Diagram updates live, value label changes |
| 2.2 | Drag height slider | Touch gesture | Diagram updates live, value label changes |
| 3.4 | Tap bundle button | User decision | Button turns green, cart icon updates |
| 4.2 | Tap checkout | User intent | Cart drawer closes, checkout page loads |
| 4.4 | Tap complete order | User confirmation | Confetti, success message |

---

## 4. UX Design Decisions Informed by Personas

### Sipho-informed decisions (mobile buyer)
- **Smart Estimator as the primary CTA** on the landing page — Sipho's biggest pain point is miscalculating quantities; the estimator addresses this directly
- **Slider inputs instead of text fields** — easier on mobile; no risk of keyboard errors
- **Live SVG wall diagram** — visual feedback helps Sipho verify his inputs without reading numbers
- **One-click bundle add-to-cart** — minimises taps and cognitive load on small screens
- **Upfront pricing in ZAR** — no currency conversion or hidden fees; Sipho sees the total before committing
- **Location tags on product cards** — Sipho can see if materials are local before he clicks

### Sarah-informed decisions (desktop supplier)
- **Split hero section** — the landing page immediately separates "For Builders" and "For Contractors" so Sarah knows the platform serves both sides
- **Supplier CTA section** — clear, unambiguous call to action for contractors listing surplus
- **Professional dark-panel design** — the slate-900 supplier panel reads as a B2B product, not a consumer marketplace
- **Zero listing fee messaging** — Sarah's biggest concern is hidden costs; this is stated explicitly

### Accessibility decisions
- All interactive elements have `cursor-pointer` and minimum 44×44px touch targets (Apple HIG)
- Colour is never the sole indicator of state — cart count, button labels, and icons supplement colour cues
- Dark mode is supported throughout via Tailwind's `dark:` prefix — reduces eye strain for on-site desktop users
- Font sizes use readable defaults (base 16px) with responsive scaling
- Focus states are preserved on all interactive elements

---

## 5. Conclusion

The UX analysis for BuildBridge SA is grounded in two real archetypes from the South African construction and housing sector. Sipho represents the platform's primary buyer — mobile-first, data-conscious, and reliant on the estimator to avoid costly mistakes. Sarah represents the supplier side — time-poor, desktop-based, and motivated by cost avoidance and ESG compliance. Every major design and feature decision on the platform traces back to at least one of these personas, ensuring that the product is built for its users and not just its technology stack.
