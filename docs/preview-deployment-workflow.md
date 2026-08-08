# Website Preview Deployment Workflow

## Purpose

Preview the current local website, including uncommitted changes, without building on the DigitalOcean server and without committing the work to GitHub.

## Locked-in workflow

From the website repository:

```bash
cd /root/throttl-home
npm run preview
```

The `preview` script runs `vercel --yes` and creates a Vercel **Preview** deployment from the current working tree.

The local directory is linked to the existing Vercel project:

- Project: `throttl-command-center`
- Production URL: `https://throttl-command-center.vercel.app`
- Local project state: `.vercel/project.json` (ignored by Git)

Do not use `vercel --prod` for previews. That overwrites the production deployment.

## Exact flow

```text
Edit files locally
    ↓
npm run lint                 optional local quality check
    ↓
npm run build               local preflight when practical
    ↓
npm run preview             Vercel-hosted build, no Git commit required
    ↓
Open the Preview URL
    ↓
Inspect at desktop and mobile widths
    ↓
Keep editing and preview again
    ↓
Commit/push only when the work is approved
```

Vercel builds the preview remotely on a build machine. The DigitalOcean production server is not involved in compiling the website.

## Development loop

The complete worker–grader process for visual and other development work is documented in [`docs/development-loop.md`](./development-loop.md). It is the default process for design changes.

At minimum, every visual iteration must:

1. Declare the canonical source and non-target files.
2. Capture a baseline at 375px, 768px, and 1440px.
3. Make one bounded worker revision.
4. Run lint, build when practical, and `npm run preview`.
5. Capture the same route and viewports again.
6. Run deterministic browser/layout checks.
7. Get an independent grader result: `PASS`, `REVISE`, `BLOCKED`, or `NO_GO`.

Autonomous revision is capped at three iterations per target. A build or Preview URL is evidence of deployability, not visual approval or production publication.

## GitHub Actions role

The GitHub Actions workflow at `.github/workflows/preview-build.yml` is a separate committed CI path for branches and pull requests. It is not required for the uncommitted local preview workflow.

Use GitHub Actions when branch/PR provenance is needed. Use `npm run preview` when the goal is to see the current uncommitted working tree.

## Safety rules

- `npm run preview` is the default preview command.
- Never use `vercel --prod` for an unapproved change.
- Do not commit `.vercel/`; it is intentionally ignored.
- Preview URLs are immutable deployment snapshots. Run the command again after further edits.
- If Vercel asks for project setup again, stop and verify the local link before accepting a new project.
- Preserve unrelated modifications already present in the working tree.

## Verification

Verified 2026-08-05 after the visual-aid polish pass:

- `npm run lint` passed.
- `npm run build` passed, with 20 static pages generated.
- `npm run preview` completed on Vercel using the linked `throttl-command-center` project.
- Preview URL: `https://throttl-command-center-b2q40wxc0-throttlm3-s-projects.vercel.app`
- Local desktop and mobile browser review completed against the running build.

## Notes

The first temporary test created a separate `throttl-home` Vercel project because the checkout was not linked. That project should not be used for future previews. The local checkout is now linked back to `throttl-command-center`.

The current working tree contains uncommitted application changes. This workflow deliberately does not commit or push them.

The CI workflow still needs to be committed to GitHub before GitHub Actions can run; that is independent of this local preview workflow.

## Rollback / production

Production remains controlled separately. Only explicitly approved production deployments may use:

```bash
vercel --prod
```

Prefer the existing GitHub/Vercel production integration once changes are committed and approved.
