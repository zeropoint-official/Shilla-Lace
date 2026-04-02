# Shillalace.com Domain Migration: Shopify → Vercel

## Overview

Switch shillalace.com from the old Shopify-hosted site to the new headless Next.js site on Vercel. Domain is registered on GoDaddy. Email is on Zoho Mail and must not be disrupted.

---

## Pre-Migration Checklist

- [ ] Verify the Vercel project is production-ready and deployed
- [ ] Add `shillalace.com` and `www.shillalace.com` as custom domains in Vercel (Project Settings → Domains)
- [ ] Vercel will give you the required DNS values — note them down before touching GoDaddy
- [ ] Test the site on the Vercel preview URL one final time
- [ ] Pick a low-traffic time to make the switch (late night / early morning)
- [ ] Inform any team members about the planned downtime window

---

## Step 1: Add Domain in Vercel

1. Go to your Vercel project → **Settings → Domains**
2. Add `shillalace.com` (apex/root domain)
3. Add `www.shillalace.com`
4. Vercel will show you the DNS records you need to set. Typically:
   - For apex (`shillalace.com`): an **A record** pointing to `76.76.21.21`
   - For `www`: a **CNAME record** pointing to `cname.vercel-dns.com`

---

## Step 2: Update DNS Records in GoDaddy

### Records to DELETE (Shopify-specific)

| Type  | Name                                     | Data                          | Action |
|-------|------------------------------------------|-------------------------------|--------|
| A     | @                                        | 23.227.38.32                  | DELETE  |
| CNAME | www                                      | shops.myshopify.com           | DELETE  |
| CNAME | b61efc4f-54a2-4bea-8b2b-6a194dbd6c5f    | dns-verification.shopify.com  | DELETE  |

### Records to ADD (Vercel)

| Type  | Name | Data                  | TTL    |
|-------|------|-----------------------|--------|
| A     | @    | 76.76.21.21           | 1 Hour |
| CNAME | www  | cname.vercel-dns.com  | 1 Hour |

> **Important:** Confirm the exact values Vercel gives you in Step 1. The A record IP (`76.76.21.21`) is Vercel's standard, but always verify in your dashboard.

### Records to KEEP (Do NOT touch these)

These are for email (Zoho), Google verification, and GoDaddy infrastructure. Deleting them will break email or other services.

| Type  | Name                  | Data                                                    | Why                        |
|-------|-----------------------|---------------------------------------------------------|----------------------------|
| NS    | @                     | ns11.domaincontrol.com                                  | GoDaddy nameservers        |
| NS    | @                     | ns12.domaincontrol.com                                  | GoDaddy nameservers        |
| SOA   | @                     | Primary nameserver: ns11.domaincontrol.com              | GoDaddy infrastructure     |
| MX    | @                     | mx.zoho.eu (Priority 10)                                | Zoho email                 |
| MX    | @                     | mx3.zoho.eu (Priority 20)                               | Zoho email                 |
| MX    | @                     | mx2.zoho.eu (Priority 50)                               | Zoho email                 |
| TXT   | @                     | v=spf1 include:dc-8e814c8572._spfm.shillalace.com ~all | Email SPF authentication   |
| TXT   | dc-8e814c8572._spfm   | v=spf1 include:zoho.eu include:dc-aa8e...               | Email SPF (delegated)      |
| TXT   | zmail._domainkey      | v=DKIM1; k=rsa; p=...                                  | Zoho DKIM email signing    |
| TXT   | @                     | google-gws-recovery-domain-verification=46385109        | Google verification        |
| TXT   | @                     | google-site-verification=T65mVwL...                     | Google Search Console      |
| CNAME | 46385109              | google.com                                              | Google verification        |
| CNAME | zb76863689            | zmverify.zoho.eu                                        | Zoho domain verification   |
| CNAME | _domainconnect        | _domainconnect.gd.domaincontrol.com                     | GoDaddy domain connect     |

---

## Step 3: Verify in Vercel

1. Go back to Vercel → **Settings → Domains**
2. Both `shillalace.com` and `www.shillalace.com` should show a checkmark once DNS propagates
3. Vercel will auto-provision SSL certificates — this may take a few minutes

---

## Step 4: Post-Migration Verification

- [ ] Visit `https://shillalace.com` — should load the new Next.js site with valid SSL
- [ ] Visit `https://www.shillalace.com` — should redirect to or serve the same site
- [ ] Send a test email to your Zoho address (info@shillalace.com or similar) — confirm email still works
- [ ] Send a test email FROM your Zoho address — confirm outbound works and doesn't land in spam
- [ ] Check Shopify admin — your store/products/orders are unaffected (headless backend still works via API)
- [ ] Test checkout flow end-to-end on the live domain
- [ ] Verify Google Search Console still recognizes the domain

---

## DNS Propagation

- Changes typically take **5 minutes to 1 hour** but can take up to 48 hours in edge cases
- Use [dnschecker.org](https://dnschecker.org) to monitor propagation globally
- During propagation, some users may see the old Shopify site and some the new Vercel site — this is normal

---

## Rollback Plan

If something goes wrong, revert the DNS in GoDaddy:

1. Delete the Vercel A record (`76.76.21.21`)
2. Delete the Vercel CNAME for www (`cname.vercel-dns.com`)
3. Re-add the Shopify records:
   - A record: `@` → `23.227.38.32`
   - CNAME: `www` → `shops.myshopify.com`

---

## Notes

- The Shopify store itself stays active as a headless backend — you're only changing where the domain points for the storefront
- Shopify may show a warning that the domain is no longer connected — this is expected and fine
- If you later want to remove the domain from Shopify's admin (Online Store → Domains), you can, but it's not required for the headless setup to work
