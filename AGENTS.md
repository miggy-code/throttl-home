# Throttl Home Website

## Purpose

Public Throttl website and blog. This repository contains the Next.js application, MDX blog content, public media, contact route, and publication workflow.

## Development loop

For visual or other bounded development work, read `docs/development-loop.md` first. Use the worker–grader process:

1. Declare canonical sources and non-targets.
2. Capture a baseline at 375px, 768px, and 1440px.
3. Make one bounded worker revision.
4. Run `npm run lint`, `npm run build` when practical, and `npm run preview`.
5. Capture the same route and viewports.
6. Run deterministic browser/layout checks.
7. Route through an independent grader: `PASS`, `REVISE`, `BLOCKED`, or `NO_GO`.

Autonomous revision is capped at three iterations per target. A Preview URL is not production approval.

## Preview

```bash
npm run preview
```

This runs `vercel --yes` against the linked `throttl-command-center` project and previews the current uncommitted working tree. Never use `vercel --prod` for preview work.

## Quality gates

```bash
npm run lint
npm run build
npm run preview
```

## Important boundaries

- Preserve unrelated existing working-tree changes.
- Do not commit or push unless explicitly requested.
- Do not publish production from a preview task.
- Declare one canonical implementation when duplicate visual assets exist.
- Keep design-run evidence under `docs/design-runs/<run-id>/` and do not overwrite prior iterations.

## Key paths

- Website route code: `app/`
- Blog components: `components/blog/`
- Blog content: `content/blog/`
- Public media: `public/media/blog/`
- Preview procedure: `docs/preview-deployment-workflow.md`
- Development loop: `docs/development-loop.md`
- Design brief schema: `docs/design-run-brief.schema.json`
- Design brief template: `docs/design-run-template.json`
- CI build workflow: `.github/workflows/preview-build.yml`
