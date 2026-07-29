# Opulent Acres

A premium real estate and luxury developments web platform featuring an interactive 3D orbit gallery, user interest registration form, and a glassmorphic admin dashboard built on top of Supabase.

## Getting Started

### Prerequisites

* Node.js (version 20.19.0 or higher recommended)
* npm

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   * Copy the template `.env.example` to a new file named `.env`:
     ```bash
     cp .env.example .env
     ```
   * Open the `.env` file and fill in your Supabase connection settings and desired admin dashboard credentials.

### Development Mode

Run the local Vite development server:
```bash
npm run dev
```

### Production Build

Compile the production bundle:
```bash
npm run build
```

---

## 🔒 Security Notice: Git History & Secret Rotation

> [!WARNING]
> If you have previously hardcoded any passwords, API tokens, or keys (such as the admin credentials or Supabase keys) directly inside `admin.js` or `.env` and committed them to Git, **those old values are still stored in the repository's git history**.
>
> **Action Required:**
> 1. Immediately **rotate** (change) any credentials that were previously committed to version control.
> 2. Ensure your `.env` file is added to `.gitignore` (already configured in this repository) to prevent future commits of sensitive variables.
