# BuildBridge SA — Video Presentation Keynotes

**Total time: 10 minutes maximum**
**Suggested split:** Business idea (3 min) | Business Canvas (3 min) | Website demo (3 min) | Smart Estimator highlight (1 min)

---

## SECTION 1 — Introduction & Business Idea (3 minutes)

### Opening (30 seconds)
- Introduce yourself: name, student number, course (INF3014F, 2026)
- State your project name: **BuildBridge SA**
- One-line pitch: *"BuildBridge SA is a marketplace that connects civil engineering contractors who have surplus construction materials with township builders who can't afford retail prices — turning waste into opportunity."*

### The Problem (60 seconds)
- Talk about the two-sided problem:
  - **Supplier side**: Large construction projects in South Africa generate massive amounts of leftover materials — bricks, cement, timber, scaffolding. Contractors pay R800 to R2,500 per load to dispose of these at landfill sites. It costs them money to throw away perfectly usable materials.
  - **Buyer side**: At the same time, township and informal settlement builders struggle to afford quality building materials. A bag of cement at Builders Warehouse costs around R100. A single pallet of bricks can cost R2,000–R3,000. For someone building a boundary wall in Khayelitsha, this is prohibitive.
- *"These two problems have the same solution — connecting the two sides of the market."*

### The Solution (60 seconds)
- BuildBridge SA is a localized B2B-to-C marketplace
- Contractors list surplus materials at heavy discounts or near-free
- Community builders browse, estimate, and buy — at 50 to 80% below retail
- A 7.5% platform fee is charged to the buyer — transparent, shown at checkout
- "Premium Clearance" option for contractors who need materials off-site urgently
- Social impact: every transaction diverts materials from landfill AND puts affordable materials into the hands of people building their communities

### Why This Idea (30 seconds)
- South Africa's housing backlog is 2.4 million units (StatsSA Census 2022)
- Construction waste is a growing environmental problem
- Township smartphone penetration is now 84% — digital marketplaces are viable
- This idea can genuinely be taken forward as a real business

---

## SECTION 2 — Business Canvas Walkthrough (3 minutes)

*Speak to each pillar briefly — do not read from the document, talk naturally*

### Key Partners (20 seconds)
- "Our key partners are the construction firms on the supply side, local bakkie owners who handle last-mile delivery, and NGOs working in informal settlement upgrading who help us reach buyers."

### Value Proposition (40 seconds)
- This is the most important pillar — spend the most time here
- For contractors: zero-cost disposal, ESG compliance, rapid clearance
- For builders: quality materials at 50–80% below retail, plus the Smart Estimator tool which I'll demo shortly
- *"The value proposition is unusually strong because both sides of the market have an urgent, unmet need."*

### Customer Segments (20 seconds)
- Introduce your personas briefly: Sipho (informal builder, Khayelitsha, smartphone user, data-conscious) and Sarah (site manager, time-poor, needs quick digital upload)
- *"These personas directly shaped every design decision in the platform"*

### Revenue Streams (20 seconds)
- 7.5% transaction fee on every buyer checkout
- Premium Clearance fee for urgent contractor listings (R350–R800 per listing)
- Future: volume subscription tiers for large contractors

### Key Assumptions and How I Validated Them (40 seconds)
- *This is required by the rubric — spend time here*
- Disposal costs: based on City of Cape Town municipal tariffs and private skip hire quotes
- Retail price benchmarks: checked against Builders Warehouse and Cashbuild online listings
- Platform fee: modelled on Takealot's 8–15% category commissions — we're at the lower end to encourage adoption
- Market size: StatsSA Census 2022 data on informal settlement populations in the Western Cape
- *"I didn't make these numbers up — they are grounded in publicly available South African data"*

### Innovation and Scalability (20 seconds)
- The model is replicable across provinces — Gauteng and KZN have the same dynamics
- The Smart Estimator creates a defensible moat — no Wix or Shopify template can do this
- The data generated (what materials builders need, in which areas) is itself a future asset

---

## SECTION 3 — Website Demo (3 minutes)

*Open the browser to localhost:5173 before recording. Have the site running.*

### Landing Page (30 seconds)
- Show the hero section — point out the split buyer/supplier panels that expand on hover
- Scroll slowly to show the animated stats counting up, the category scroll, featured listings
- *"The landing page immediately communicates who this is for — builders or contractors — and shows social impact numbers"*

### Shop / Product Catalog (45 seconds)
- Navigate to /shop
- Type "cement" in the search bar — show live filtering
- Click a category checkbox — show it filters the grid
- Hover over a product card — show the 3D tilt effect
- Click "Add" on a product — show it turns green and the cart count increases
- Click the heart icon — show the wishlist count update
- *"Every standard eCommerce function is here: search, filter, add to cart, add to wishlist, pricing, and discounts"*

### Cart and Checkout (45 seconds)
- Click the Cart button in the navbar to open the cart drawer
- Show the item, quantity controls (+/−), remove button
- Point out the subtotal, platform fee line item, total
- Click "Proceed to Checkout"
- Fill in name, phone, address quickly
- Click "Complete Order" — show the confetti animation and success modal with order number
- *"The checkout is fully functional end-to-end — no payment gateway as per the brief, but everything else works"*

### Wishlist (15 seconds)
- Open the wishlist drawer
- Show the saved item, "Add to Cart" button from wishlist
- *"Wishlist is persistent within the session"*

### Dark Mode (15 seconds)
- Toggle dark mode from the navbar
- *"Full dark mode support throughout the entire application"*

---

## SECTION 4 — Smart Estimator Feature Highlight (1 minute)

*This is the 10-mark creativity section — be enthusiastic and specific*

### What It Is (20 seconds)
- Navigate to /estimator
- *"This is the feature I'm most proud of — the Smart Project Estimator. It acts as a free digital quantity surveyor for informal builders."*
- *"Standard eCommerce platforms like Wix or Shopify have no concept of physical dimensions — they just show you products. This is completely custom."*

### Live Demo (25 seconds)
- Drag the wall length slider to 8m
- Drag the height slider to 2.5m
- Point at the SVG wall diagram updating live: *"The wall diagram redraws in real time as you change dimensions"*
- Point at the results: *"The algorithm calculates 1,000 bricks, 7 bags of cement, 0.4 cubic metres of sand — based on South African standard brick size formulas"*
- Point at the Recommended Bundle: *"It then queries the product database, finds matching stock, and builds a custom bundle"*

### Why It's Innovative (15 seconds)
- *"I had to write custom JavaScript that takes physical measurements, applies construction quantity surveying formulas, and programmatically queries the inventory database to generate a cart bundle — this cannot be done with any CMS template"*
- Click "Add Bundle to Cart (10% Off)" — show the green confirmation and the cart count update
- *"One click adds exactly the right materials to the cart, with an automatic 10% bundle discount applied"*

---

## CLOSING (30 seconds)
- Summarise: *"BuildBridge SA is a fully functional React eCommerce application that addresses a real South African social challenge — turning construction surplus into community opportunity."*
- Mention the About and Contact pages as additional polish
- State that the AI Declaration is included in the report
- Thank the markers

---

## Tips for Recording
- Use Microsoft Teams screen recording (recommended by the brief)
- Record in one take if possible — natural speech is better than scripted reading
- Have the website running at localhost:5173 before you start
- Speak slowly when demoing — markers need to see what's happening
- Keep your camera on if possible — it adds to presentation quality
- Aim for 9 minutes to give yourself a 1-minute buffer
