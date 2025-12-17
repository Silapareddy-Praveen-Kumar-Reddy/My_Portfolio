# Personal Portfolio – React + Vite

A responsive, single-page developer portfolio built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, and **shadcn/ui**.  
All major sections (Hero, Projects, Experience, Journey, Skills, Certificates, Contact) live in dedicated files so it’s easy to maintain or extend before publishing to GitHub/Pages.

## Tech Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS + shadcn/ui component primitives
- Lucide icons, React Hook Form, Zod validation helpers

## Getting Started

```bash
git clone <your-repo-url>
cd <repo>
npm install
npm run dev
```

The dev server runs at http://localhost:5173 by default.

## Available Scripts

| Command           | Description                                                 |
| ----------------- | ----------------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR                          |
| `npm run build`   | Bundle the site into `dist/`                                |
| `npm run preview` | Preview the production build locally                        |
| `npm run lint`    | Lint source files with ESLint                               |
| `npm start`       | Serve the built app via `server.js` (optional Node hosting) |

## Project Structure

```
src/
  components/
    layout/        # Navigation, footer and shared layout pieces
    ui/            # shadcn/ui primitives
  sections/        # Page sections (Hero, Projects, Experience, ...)
  data/            # Portfolio data sources
  pages/           # Route-level components (Index, NotFound)
  hooks/, lib/     # Utilities and custom hooks
```

## Deploying to GitHub Pages

1. Run `npm run build` to generate `dist/`.
2. Push the contents of `dist/` to a `gh-pages` branch (use `git subtree push --prefix dist origin gh-pages` or the `peaceiris/actions-gh-pages` GitHub Action).
3. In your GitHub repository settings, enable Pages → Build from `gh-pages`.
4. Each new deployment is as simple as `npm run build && git push origin main` + letting your workflow publish the fresh `dist/`.

> Tip: the included `.gitignore` already excludes `dist/` and `node_modules/`, so your repository stays lean.

## Contributing

Feel free to fork this repo, create a feature or fix, and open a pull request. Make sure `npm run lint` and `npm run build` pass before submitting.
