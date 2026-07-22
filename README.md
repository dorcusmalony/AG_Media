# AG Media Co. Ltd. — Digital Media & Cultural Archive Platform

> **The Promoters of Culture and Music**  
> *Authoritative media, journalism, communications, and cultural documentation rooted in South Sudanese experience and international broadcast standards.*

---

##  Executive Overview

**AG Media Co. Ltd.** is an independent digital media platform, documentary production house, and cultural preservation archive. Established on **November 19, 2008**, AG Media was created to document, preserve, and celebrate South Sudanese cultural heritage, traditional and contemporary music, community histories, and journalistic features across local and diaspora audiences.

Operating across dual liaisons in **Juba, South Sudan** and **Melbourne, Australia**, AG Media serves as a vital bridge between heritage traditions and contemporary digital audiences worldwide.

---

##  Executive Leadership

* **Founder & Chief Executive Officer:** Ajak Deng Chiengkou
* **Established:** 19 November 2008
* **Mission:** To amplify South Sudanese voices through high-grade broadcast journalism, authentic cultural storytelling, and digital media production.

---

##  Key Platform Features & Modules

-  **Video & Media Production Hub**: High-definition video archives featuring cultural performances, traditional festivals, music releases, and artist spotlights.
-  **Documentaries & Special Reports**: In-depth investigative journalism, historical retrospectives, and community field projects.
-  **Editorial & Press Publications**: Authoritative journalism covering cultural affairs, music development, and diaspora initiatives.
-  **Interactive Archive Search**: Fast, responsive filtering by categories (Culture, Music, Journalism, Documentaries, Diaspora).
-  **Executive Leadership & Team Profiles**: Comprehensive profiles of leadership, editorial producers, and cultural researchers.
- **Fully Responsive Modern Interface**: Desktop and mobile-optimized web architecture with high accessibility standards.

---

##  Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool & Bundler** | [Vite 6](https://vitejs.dev/) |
| **Styling & Layout** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Animation Engine** | [Motion / Framer Motion](https://motion.dev/) |
| **Iconography** | [Lucide React](https://lucide.dev/) |
| **Server Capabilities** | Express & Node.js ESM |

---

##  Getting Started (Local Development)

### Prerequisites

Ensure you have Node.js installed on your machine:
* **Node.js**: `v18.0.0` or higher
* **npm**: `v9.0.0` or higher (or `bun` / `yarn`)

### Installation & Setup

1. **Clone or Extract the repository**:
   ```bash
   cd AG_Media
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000` to preview the application.

4. **Run Type Checks and Linting**:
   ```bash
   npm run lint
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```
   The compiled static web assets will be generated inside the `dist/` folder.

---

##  Git & GitHub Version Control Setup

When working with an exported ZIP file or starting fresh in VS Code, follow these exact steps to initialize Git at the root level of your project and push to GitHub:

### Step 1: Open Terminal at Root Directory
Make sure your terminal prompt is pointing to the root directory containing `package.json` (e.g. `C:\Users\hp\Downloads\AG_Media`).

### Step 2: Initialize Git
```bash
git init
```

### Step 3: Stage Files & Commit
```bash
git add .
git commit -m "Initial commit: AG Media website platform"
```

### Step 4: Rename Branch to `main`
```bash
git branch -M main
```

### Step 5: Link Remote GitHub Repository
```bash
git remote add origin https://github.com/dorcusmalony/AG_Media.git
```

### Step 6: Push Code to GitHub
```bash
git push -u origin main
```

>  **Note**: If your GitHub repository was created with a `README.md` or `.gitignore` on GitHub first, run `git pull origin main --rebase` before running `git push -u origin main`.

---

##  Project Directory Structure

```text
AG_Media/
├── src/
│   ├── components/         # Modular UI Components (Header, Footer, BrandLogo, etc.)
│   ├── App.tsx             # Main Application Layout & Views
│   ├── data.ts             # Media Articles, Projects, Founder & Team Data
│   ├── main.tsx            # React Root Rendering & Entry Point
│   ├── types.ts            # Global TypeScript Interfaces
│   └── index.css           # Tailwind CSS Imports & Custom Styles
├── index.html              # HTML Shell
├── package.json            # Project Dependencies & Scripts
├── tsconfig.json           # TypeScript Configuration
├── vite.config.ts          # Vite Configuration
└── README.md               # Project Documentation
```

---

##  Official Organization Details

* **Organization Name:** AG Media Co. Ltd.
* **Motto:** The Promoters of Culture and Music
* **Primary Hubs:** Juba, South Sudan | Melbourne, Australia
* **Platform Founded:** 19 November 2008

---

© 2008–2026 AG Media Co. Ltd. All rights reserved.
