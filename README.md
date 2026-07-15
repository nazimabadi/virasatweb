# Virasat Website

Toronto-based South Asian arts nonprofit — virasatto.com

Built with [Eleventy](https://www.11ty.dev/) (static site generator) + [Decap CMS](https://decapcms.org/) (content editor) + Netlify (hosting).

## How it works

```
Colleague edits content at virasatto.com/admin  (Decap CMS)
        ↓ saves to
GitHub repository  (all files live here)
        ↓ triggers
Netlify build  (runs Eleventy, ~60 seconds)
        ↓ publishes
virasatto.com  (updated site)
```

## Project structure

```
_data/            ← site-wide content (JSON) — CMS editable
  site.json         hero copy, about text, stats, contact email
  team.json         team members
  partners.json     partner list
  programs.json     the three program blocks
content/          ← collection content (Markdown) — CMS editable
  events/           one file per event
  videos/           one file per video (YouTube ID + title + featured flag)
  artists/          one file per artist (section appears when entries exist)
_includes/
  base.njk          the layout: nav, all CSS, footer
index.njk         ← homepage template
videos.njk        ← recordings page template
connections.html  ← "how we connect" interactive page
admin/            ← Decap CMS (config.yml defines what's editable)
images/           ← all photos
.eleventy.js      ← build config
netlify.toml      ← tells Netlify how to build
```

## ⚠️ Before going live

Open `content/videos/flagship-event.md` and replace `REPLACE_WITH_YOUTUBE_ID`
with the real YouTube video ID (the part after `v=` in the YouTube URL).
Or delete the file and add the video through the CMS later.

## One-time setup

### 1. Push to GitHub

1. Create a new repository at github.com (e.g. `virasat-website`), **private** is fine
2. On your computer, in this project folder:

```bash
git init
git add .
git commit -m "Initial Eleventy + Decap CMS site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/virasat-website.git
git push -u origin main
```

(If you don't have git installed, you can also upload the files through
GitHub's web interface: repo → "uploading an existing file" → drag everything in.)

### 2. Connect GitHub to Netlify

1. Netlify dashboard → your existing site (virasatto.com) → **Site configuration → Build & deploy → Link repository**
   - If that option isn't available on the existing site, create the link under **Site configuration → Continuous deployment**
2. Choose GitHub → authorize → pick the `virasat-website` repo
3. Build settings should auto-detect from `netlify.toml`:
   - Build command: `npx @11ty/eleventy`
   - Publish directory: `_site`
4. Deploy. From now on every push to `main` (including CMS edits) redeploys the site automatically. **Stop using drag-and-drop deploys** — they would overwrite the linked setup.

### 3. Enable Netlify Identity + Git Gateway

1. Netlify dashboard → your site → **Integrations → Identity → Enable Identity**
2. Under Identity → **Registration**, set to **Invite only**
3. Under Identity → **Services → Git Gateway → Enable Git Gateway**

### 4. Invite colleagues

1. Netlify dashboard → **Integrations → Identity → Invite users**
2. Enter their email addresses
3. They receive an email → click the invite link → set a password
4. They log in at **virasatto.com/admin**

## Day-to-day editing (for colleagues)

1. Go to **virasatto.com/admin** and log in
2. Pick a section in the sidebar:
   - **Site Copy & Settings** — hero text, about copy, stats, team, partners, programs
   - **Events** — add/edit past events with photos
   - **Videos / Recordings** — add a YouTube video (just paste the video ID); toggle "Featured on Homepage" to feature it
   - **Artists** — add artists; the Artists section automatically appears on the homepage once at least one exists
3. Click **Save** — this creates a draft in the **Workflow** tab
4. In Workflow, drag the draft to **Ready**, then click **Publish**
5. The site updates in about 60 seconds

## Local development (optional, for developers)

```bash
npm install
npm start          # dev server at localhost:8080
npm run build      # production build into _site/
```

## Costs

Everything runs on free tiers: Netlify free (100GB bandwidth, 300 build
minutes/month), Decap CMS (open source), GitHub free. The practical limit to
watch is GitHub's ~1GB repo size — always link YouTube videos rather than
uploading video files, and keep uploaded images reasonably sized.
