# AlgoraX website: changes applied (2026-10-06)

A backup of the files before these changes is at `reviews/algorax-before-fixes.tar.gz`. A fresh build is in `AlgoraX/dist/`, also zipped as `AlgoraX/algorax_release_v2.zip`. The old `algorax_release.zip` was left untouched.

## Content
- Renamed RouteGeniusAI to **Reach** everywhere (English, Arabic and image alt text).
- Hid the testimonials section. Add real quotes to `testimonials.items` in `src/data/translations.js` and it reappears.
- Removed the unverifiable claims: "500+ companies", "+240%", "30% / 2 extra meetings", "MVP to IPO" and "Scaling Tomorrow's Unicorns".
- Removed the fake free trial. All trial CTAs now say "Book a Demo" or "Send Us a Message", and the trial note is gone.
- Fixed typos ("An AlgoraX product", "Drive less").
- The contact form now tells visitors *they* will get a reply. It no longer says a confirmation went to your inbox.

## Broken things
- "Explore Solutions" now scrolls to Solutions, and "How It Works" links to its own section (it was a duplicate `#solutions`).
- Removed the social icons that pointed to `#`.
- Logo: the X now draws once and stays (it no longer looks like a checkmark), the icon's black square is gone, and the footer shows the icon.
- The "missing EmailJS keys" browser alert is now a friendly error message.

## Arabic
- Every remaining English string is translated (features heading, the whole form, buttons, errors).
- Added an Arabic font (IBM Plex Sans Arabic) and loaded Inter properly.
- The language is remembered and kept in the URL (`?lang=ar`), so the Arabic version can be shared and indexed.

## Accessibility
- The mobile menu is a real button with labels. The language switch and the close X have labels.
- The form is a proper dialog: Escape closes it, focus stays inside, the page doesn't scroll behind it, labels are linked to their fields, and autofill hints are added.
- The site respects the system "reduce motion" setting.
- Added a skip-to-content link and keyboard focus rings, hid decorative images and icons from screen readers, and improved text contrast.

## SEO
- Added a proper title and description (both languages), canonical and hreflang tags, a social share image, Organization data, `robots.txt` and `sitemap.xml`.
- Replaced the Vite favicon with the AlgoraX icon and added an Apple touch icon.
- The page now has one H1.

## Performance and code
- Images went from ~2 MB of PNG to ~170 KB of WebP.
- Removed unused components and template leftovers, and unified the brand colors.
- Buttons forward `disabled`/`type`, so the form can't be double-submitted.
- Added a honeypot spam trap on the form.
- Lint is clean and the build passes.

## Still needs you
1. **Dashboard screenshot** (`src/assets/dashboard-v2.webp`) still reads "RouteOptima Dashboard" inside the image. It needs a new screenshot of Reach.
2. **Domain**: I assumed `https://algoraxco.com/` (from your email) in `index.html`, `robots.txt` and `sitemap.xml`. Change it if the site lives elsewhere.
3. **EmailJS keys**: set `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` and `VITE_EMAILJS_PUBLIC_KEY` in `.env` before building, or the form shows its error message.
4. Real testimonials, social links, and About / Privacy Policy pages.
5. `src/assets/logo_new.png` and `algorax_dashboard.png` are unused. `logo_new.png` has a small AI-generator sparkle watermark in the corner (cropped out of the share image).
