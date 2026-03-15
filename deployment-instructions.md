# How to publish Daivyaura to a New GitHub Repository

Since you want to push this to a *new* repository without affecting the original one, follow these steps very carefully:

## Step 1: Create a new Repository on GitHub
1. Go to your GitHub account (https://github.com/new).
2. Create a new repository named exactly `daivyaaura.github.io` (or whatever you prefer, but the `.github.io` name automatically enables GitHub pages for the root).
3. Do **not** initialize it with a README, .gitignore, or license. You want a completely blank repository.

## Step 2: Push your local code to the New Repository
Open your terminal (in cursor) and make sure you are in the `c:\Users\DELL\Desktop\AI projects\cursor\daiv` folder. Run these commands one by one:

```bash
# 1. Remove the connection to the OLD repository
git remote remove origin

# 2. Add all your recent changes
git add .

# 3. Commit your changes
git commit -m "Migrated to JSON data, added Formspree & WhatsApp, optimized for Pages"

# 4. Connect to your NEW repository (REPLACE THE URL BELOW with your actual new repo URL)
git remote add origin https://github.com/YourUsername/YourNewRepoName.git

# 5. Push the code
git push -u origin main
```

## Step 3: Deploy to GitHub Pages
Since this is a Vite (React) project, you cannot just host the raw code on GitHub Pages; you have to host the *built* version (the `dist` folder). 

There are two main ways to do this:
### Option A: Let GitHub Actions build it automatically (Recommended)
1. Go to your new repository on GitHub.
2. Go to **Settings** > **Pages**.
3. Under "Build and deployment" > "Source", select **GitHub Actions**.
4. GitHub will suggest a "Static HTML" or "Node.js" workflow.
5. Create a file in your project called `.github/workflows/deploy.yml` with the following content, commit, and push it:

```yaml
name: Deploy static content to Pages

on:
  push:
    branches: ["main"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Single deploy job since we're just deploying
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          # Upload entire repository
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Option B: Push the `dist` folder manually using `gh-pages`
If you prefer not to use GitHub Actions:
1. Run `npm run build` in your terminal.
2. Run `npx gh-pages -d dist`.
3. Go to GitHub > Settings > Pages, and select the `gh-pages` branch as your source.
