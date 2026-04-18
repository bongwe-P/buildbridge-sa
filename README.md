# BuildBridge SA — INF3014F eCommerce Project

**Student:** [Your Full Name]  
**Student Number:** [Your Student Number]  
**Course:** INF3014F — 2026  
**Due Date:** 20 April 2026

---

## What is BuildBridge SA?

BuildBridge SA is a localized B2B-to-C surplus construction materials marketplace. Civil contractors list surplus materials (bricks, cement, timber, roofing, scaffolding) at steep discounts. Township builders and DIY home improvers purchase these materials at 50–80% below retail — turning construction waste into community opportunity.

---

## How to Run the Site

### Requirements

You will need the following installed on your machine:

- **Node.js** version 18 or higher — download from [https://nodejs.org](https://nodejs.org) (choose the LTS version)
- **npm** (comes bundled with Node.js automatically)

To verify you have Node.js installed, open a terminal and run:
```
node --version
```
It should print something like `v18.x.x` or higher.

---

### Steps to Run

**1. Extract the project**

Unzip the submitted file to a folder on your computer. You should see a folder called `project` (or similar) containing files like `package.json`, `index.html`, and a `src/` folder.

**2. Open a terminal in the project folder**

- **Windows**: Right-click inside the extracted folder → "Open in Terminal" (or open Command Prompt and `cd` to the folder path)
- **Mac**: Right-click the folder → "New Terminal at Folder"

**3. Install dependencies**

Run this command once:
```
npm install
```
This downloads all required packages into a `node_modules/` folder. It may take 1–2 minutes on the first run.

**4. Start the development server**

```
npm run dev
```

**5. Open the site in your browser**

After running the command above, you will see output similar to:
```
  VITE v4.x.x  ready in Xms

  ➜  Local:   http://localhost:5173/
```

Open your browser and go to: **http://localhost:5173**

The site will load immediately.

---

### Stopping the Server

Press `Ctrl + C` in the terminal to stop the development server.

---

### Alternative: View the Pre-Built Version

A pre-built production version is included in the `dist/` folder. To view it:

```
npm run preview
```

Then open **http://localhost:4173** in your browser.

---


## Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm` not recognised | Install Node.js from https://nodejs.org and restart your terminal |
| Port 5173 already in use | Run `npm run dev -- --port 3000` to use a different port |
| `node_modules` missing | Run `npm install` first before `npm run dev` |
| Blank white page | Ensure you are at `http://localhost:5173/` (not just opening the HTML file directly) |


---

## Running Tests

```
npm test
```

All 10 unit tests should pass (estimator logic, cart reducer, product filter).

---

*Built with React 18 + Vite + Tailwind CSS*
