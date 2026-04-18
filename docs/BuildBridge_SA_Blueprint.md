# **Project Blueprint: BuildBridge SA**

## **1\. Project Overview**

**Tagline:** Bridging the gap between construction surplus and community development.

**The Problem:** Large civil engineering projects generate massive amounts of surplus materials (off-cuts, excess cement, reusable fencing, scaffolding boards) which cost money to dispose of. Simultaneously, informal settlement builders and township residents struggle to afford quality, safe building materials due to high retail markups.

**The Solution:** BuildBridge SA is a localized B2B-to-C marketplace. Civil contractors list surplus materials at massive discounts (or for free, paying only a platform logistics fee). Local builders purchase these high-quality, heavily discounted materials.

## **2\. Business Model Canvas (20 Marks)**

*(Use this section for your report. The rubric requires explaining how you came up with these facts. Include a paragraph stating you researched standard disposal fees for construction waste vs. retail prices of building materials in South African hardware stores).*

* **Key Partners:** \* Large civil engineering/construction firms (supply side).  
  * Local township logistics providers / "Bakkie" owners (delivery partners).  
  * NGOs focused on informal settlement upgrading.  
* **Key Activities:** \* Platform maintenance and algorithm development.  
  * Vetting material quality (digital verification).  
  * Facilitating local logistics.  
* **Key Resources:** \* The eCommerce platform & Smart Estimator algorithm.  
  * Database of civil contractors and local builders.  
* **Value Propositions:** \* *For Contractors (Suppliers):* Zero-cost disposal of usable surplus, ESG (Environmental, Social, Governance) compliance points, reducing landfill waste.  
  * *For Community Builders (Buyers):* Access to high-quality structural materials at 50%-80% below retail cost; project estimation tools.  
* **Customer Relationships:** \* Automated self-service via the web platform.  
  * Community trust-building through transparent pricing.  
* **Channels:** \* Direct B2B outreach to construction site managers.  
  * Social media (Facebook Groups, WhatsApp community groups in townships).  
* **Customer Segments:** \* *Suppliers:* Medium-to-large construction companies in the Western Cape.  
  * *Buyers:* DIY home improvers in townships, local spaza shop owners upgrading stores, informal builders/contractors.  
* **Cost Structure:** \* Web hosting and platform development.  
  * Marketing and community outreach.  
* **Revenue Streams:** \* 7.5% transaction fee charged to the buyer on checkout.  
  * "Premium Clearance" fee charged to large contractors who need materials moved off-site within 24 hours.

## **3\. User Experience Analysis (15 Marks)**

### **A. User Personas (10 Marks)**

**Persona 1: The Buyer (Focus of the UI)**

* **Name:** Sipho Ndlovu  
* **Profile:** 35-year-old informal builder based in Khayelitsha. He gets hired by locals to build boundary walls, extend shacks into brick rooms, or fix roofing.  
* **Needs & Goals:** Needs cheap, durable materials. He struggles to calculate exactly how much material he needs for odd jobs and hates overbuying. He needs local delivery because he doesn't own a large truck.  
* **Behaviours:** Uses a mid-range smartphone. Highly active on WhatsApp. Data-conscious (needs a fast, lightweight website).

**Persona 2: The Supplier**

* **Name:** Sarah van der Merwe  
* **Profile:** 42-year-old Site Manager for a mid-sized civil engineering firm in Cape Town.  
* **Needs & Goals:** Nearing the end of a commercial build. Has 3 pallets of facebrick, 50 bags of cement, and leftover timber that need to be cleared by Friday. Wants to avoid paying dump fees.  
* **Behaviours:** Time-poor, wants a quick digital upload process. Uses a desktop PC on-site.

### **B. Hierarchical Task Analysis (HTA) (5 Marks)**

**Task:** Sipho uses the "Smart Project Estimator" to buy materials for a 5-meter boundary wall.

1. **Access Estimator Tool**  
   1.1. Navigate to landing page.  
   1.2. Click "Smart Project Estimator" on the navigation bar.  
2. **Input Project Parameters**  
   2.1. Select Project Type (Dropdown: "Boundary Wall").  
   2.2. Enter Length (e.g., 5 meters).  
   2.3. Enter Height (e.g., 1.8 meters).  
   2.4. Click "Calculate Materials".  
3. **Review Algorithm Output**  
   3.1. View required raw quantities (e.g., 450 bricks, 3 bags cement, 1m³ sand).  
   3.2. View the system's "Matched Surplus Bundle" (finding available stock in the database).  
4. **Checkout Process**  
   4.1. Add the curated bundle to the basket.  
   4.2. View automated 10% "Bundle Discount".  
   4.3. Proceed to checkout, confirm delivery address, and complete transaction (simulated).

## **4\. The 10-Mark "Creativity & Ingenuity" Feature**

**Feature Name:** The Smart Project Estimator & Surplus Bundler

**Motivation for Report/Video:** Standard e-commerce requires users to know exactly what they want. In the informal building sector, lack of technical knowledge leads to purchasing errors (buying too little cement, or too many bricks). This feature acts as a digital Quantity Surveyor. It uses custom JavaScript logic to take physical dimensions (length/height), calculate standardized material needs, and programmatically query the e-commerce database to build a custom "Surplus Bundle" that the user can buy with one click.

*Why it's not a CMS template:* Standard platforms like Wix or Shopify cannot dynamically calculate physical volume formulas and auto-generate cart bundles based on variable user inputs. This requires custom coding.

## **5\. Technical Specification (For Claude Code)**

*Provide this exact specification to Claude Code when you start your project.*

**System Architecture:**

* React frontend (Single Page Application architecture or Multi-page routing).  
* Tailwind CSS for styling (mobile-first, responsive design).  
* State management (React Context or standard Hooks for Cart and Wishlist).

**Data Structure (Mock Database in a .js file):**

* products: Array of objects. Properties: id, name, category (bricks, timber, cement, roofing), condition (New Surplus, Reclaimed), price, stockQuantity, unit (per bag, per brick, per meter), imageUrl, location.

**Required Pages/Components:**

1. **Landing Page:** Hero banner highlighting social impact. Featured surplus items grid. Prominent Call-to-Action for the "Smart Estimator".  
2. **Product Catalog (Shop):** Grid view of all items. Must include a Search bar, and filtering by category. Product cards must have "Add to Cart" and "Add to Wishlist" (heart icon) buttons.  
3. **Smart Estimator (The Custom Feature):**  
   * A clean form taking ProjectType, Length, and Height.  
   * **The Logic:** If ProjectType \=== 'Wall', then TotalArea \= L \* H. RequiredBricks \= TotalArea \* 50\. RequiredCement \= RequiredBricks / 150\.  
   * **The Match:** The function must filter the products array to find items matching 'bricks' and 'cement', check if stockQuantity is sufficient, and render a "Recommended Bundle" component.  
   * Include a button: "Add Entire Bundle to Cart (10% Discount)".  
4. **Cart & Checkout Page:**  
   * List of items added.  
   * Ability to change quantities or remove items.  
   * Pricing subtotal.  
   * If a bundle was added, show a "Bundle Discount" subtracted from the total.  
   * A "Complete Order" button that triggers a success modal/message (no actual payment gateway).  
5. **Wishlist Modal/Slide-out:** Displays saved items.