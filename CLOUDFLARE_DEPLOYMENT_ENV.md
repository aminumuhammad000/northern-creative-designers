# Cloudflare Workers & Next.js Environment Variable Management
**Project:** `northcdesigners`  
**Adapter:** `@opennextjs/cloudflare`  
**Worker Name:** `northcdesigners`  

---

## 1. Overview & Architecture

When deploying Next.js on Cloudflare Workers using OpenNext (`@opennextjs/cloudflare`), environment variables are evaluated in two distinct phases:

1. **Build Time (Next.js Bundling & OpenNext Build)**:
   - Any variable prefixed with `NEXT_PUBLIC_` is inlined into client-side JavaScript bundles during `npx opennextjs-cloudflare build` (`next build`).
   - If these variables are not present in Cloudflare's build environment, Next.js inlines `undefined` or default fallbacks into browser bundles.
2. **Runtime (Cloudflare Worker Request Processing)**:
   - Server-side actions, API routes, middleware, and backend clients read variables at request time.
   - Cloudflare provides these via Worker **Environment Variables** (plaintext) and Worker **Secrets** (encrypted).

### Why Variables Previously Disappeared
1. **Preview vs. Production Scopes**: In Cloudflare Workers Git integration, variables set only on an individual deployment or branch are not automatically applied to other branches or updated deployment configurations.
2. **Runtime Secrets vs. Build-Time Variables**: Secrets configured solely as runtime Worker secrets are not exposed to client JavaScript unless declared as build environment variables or `NEXT_PUBLIC_*` variables in the Cloudflare Dashboard.
3. **Local CLI Overwrites**: Running `wrangler deploy` without `--keep-vars` can overwrite or reset dashboard-managed variables if not properly persisted.

---

## 2. Environment Variable Classification

### Public & Build-Time Variables (`NEXT_PUBLIC_`)
Configure these under **Cloudflare Dashboard > Workers & Pages > northcdesigners > Settings > Variables and Secrets > Environment Variables**.  
Ensure they are configured for **both Production and Preview** environments.

| Variable Name | Required | Purpose / Code Reference |
| :--- | :---: | :--- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site origin (`lib/email/index.ts`) for generating absolute email and pass URLs. |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project endpoint (`lib/supabase/client.ts`, `server.ts`, `middleware.ts`, `admin.ts`). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous public key for client-side and authenticated RLS queries. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Optional | Modern Supabase client key alias (fallback for `NEXT_PUBLIC_SUPABASE_ANON_KEY`). |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Yes | Cloudinary cloud identifier for attendee and exhibitor media assets (`lib/cloudinary/index.ts`). |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Optional | Cloudinary upload preset for direct uploads. |

---

### Non-Sensitive Server Configuration Variables
Configure these under **Cloudflare Dashboard > Workers & Pages > northcdesigners > Settings > Variables and Secrets > Environment Variables**.

| Variable Name | Required | Purpose / Code Reference |
| :--- | :---: | :--- |
| `EMAIL_FROM` | Optional | Default transactional sender header (`lib/email/index.ts`). |
| `RESEND_FROM_EMAIL` | Optional | Primary sender identity for Resend email dispatch (`app/actions/admin.ts`). |

---

### Encrypted Secrets (Strictly Private & Sensitive)
Configure these as **Encrypted Secrets** in Cloudflare Dashboard or via Wrangler CLI (`wrangler secret put`). **NEVER commit these to Git or place in `wrangler.jsonc`.**

| Secret Name | Required | Purpose / Code Reference |
| :--- | :---: | :--- |
| `SUPABASE_SERVICE_ROLE_KEY` | **Critical** | Supabase Service Role Key (`lib/supabase/admin.ts`). Bypasses RLS for admin actions, attendee pass validation, and secure check-ins. |
| `CLOUDINARY_API_KEY` | Yes | Cloudinary REST API key (`lib/cloudinary/index.ts`). |
| `CLOUDINARY_API_SECRET` | **Critical** | Cloudinary API secret for server-side signing (`lib/cloudinary/index.ts`). |
| `RESEND_API_KEY` | **Critical** | Resend API key for sending confirmation and ticket passes (`lib/email/index.ts`, `app/actions/admin.ts`). |
| `QR_TOKEN_SECRET` | Optional/Sec | Cryptographic signing token for attendee QR codes. |

---

## 3. How to Synchronize Secrets

### Option A: Using the Automated Secure Script (Recommended)

1. Authenticate with Cloudflare:
   ```bash
   npx wrangler login
   ```
2. Run a dry run to verify keys:
   ```bash
   npm run cf:sync-secrets -- --dry-run
   ```
3. Synchronize to Production:
   ```bash
   npm run cf:sync-secrets
   ```
4. (Optional) Synchronize to a Preview Environment:
   ```bash
   npm run cf:sync-secrets -- --env preview
   ```

*Security note:* The script pipes secret values directly to `wrangler secret put` via stdin. Values are never printed to terminal output and never saved in shell command history.

---

### Option B: Manual CLI Commands (Without Exposing Secrets)

To upload individual secrets safely without exposing them in terminal history:

```bash
# Authenticate
npx wrangler login

# 1. Supabase Service Role Key
cat .env.local | grep "^SUPABASE_SERVICE_ROLE_KEY=" | cut -d= -f2- | npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY

# 2. Cloudinary API Key
cat .env.local | grep "^CLOUDINARY_API_KEY=" | cut -d= -f2- | npx wrangler secret put CLOUDINARY_API_KEY

# 3. Cloudinary API Secret
cat .env.local | grep "^CLOUDINARY_API_SECRET=" | cut -d= -f2- | npx wrangler secret put CLOUDINARY_API_SECRET

# 4. Resend API Key
cat .env.local | grep "^RESEND_API_KEY=" | cut -d= -f2- | npx wrangler secret put RESEND_API_KEY

# 5. QR Token Secret
cat .env.local | grep "^QR_TOKEN_SECRET=" | cut -d= -f2- | npx wrangler secret put QR_TOKEN_SECRET
```

---

### Option C: Cloudflare Web Dashboard (One-Time Permanent Setup)

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Go to **Workers & Pages** > Click on **`northcdesigners`**.
3. Select the **Settings** tab > Scroll down to **Variables and Secrets**.
4. Under **Environment Variables**:
   - Add:
     - `NEXT_PUBLIC_SITE_URL`
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
     - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
     - `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
     - `EMAIL_FROM`
     - `RESEND_FROM_EMAIL`
   - Select **Apply to: Production and Preview**.
5. Under **Secrets**:
   - Click **Add Secret** (or **Add Variable** -> Encrypt):
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `CLOUDINARY_API_KEY`
     - `CLOUDINARY_API_SECRET`
     - `RESEND_API_KEY`
     - `QR_TOKEN_SECRET`
6. Click **Save and Deploy**.

Once saved in Cloudflare Dashboard:
- Every future commit pushed to GitHub will automatically trigger Cloudflare's build pipeline with all environment variables and secrets pre-injected.
- You will **never** need to recreate these variables manually after deployment setting updates or branch pushes.

---

## 4. Local Development & Preview Parity

- **Next.js Local Server (`npm run dev`)**: Reads from `.env.local` automatically.
- **Wrangler Worker Preview (`npm run preview`)**: Reads from `.dev.vars` automatically.
- **`.gitignore` Safeguards**: Both `.env*` and `.dev.vars` are ignored in `.gitignore`, preventing accidental leaks to GitHub.
