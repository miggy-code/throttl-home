# Marketing Content Workflow

This repository publishes Throttl blog content from `content/blog/*.mdx`.

## Required sequence

```text
research → human research approval → writing brief → humanizer pass → critics → bounded revision → content approval → MDX handoff → preview/build → publication approval → publish
```

## Humanizer requirement

Every draft must pass through the humanizer before critic review and before final packaging. The humanizer removes AI writing patterns while preserving the writer's voice. Record the revision in the source artifact and content handoff.

For Miguel's voice:

- Analytical, precise, skeptical of hype
- Practical and implementation-grounded
- No em dashes
- No invented client outcomes
- No universal ROI or productivity claims
- No fake certainty or consultant filler

A humanizer pass is not publication approval.

## MDX handoff checklist

- [ ] Correct frontmatter: title, description, date, tags, theme, author, image
- [ ] Numbered lists are continuous and intentional
- [ ] External claims link to direct sources in context
- [ ] Visuals have accessible alt text and text fallbacks
- [ ] Visuals are stored under `public/media/blog/`
- [ ] No client claims or unsupported ROI
- [ ] Humanizer pass recorded
- [ ] Independent critic review complete
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Preview rendered and links checked
- [ ] Publication approval explicitly recorded

## Current article

- Source: `/root/throttl-content-research/runs/blog-draft-2026-08-04-ai-pilot-value-bridge.md`
- Humanizer revision: `humanizer-pass-1`
- MDX: `content/blog/your-ai-pilot-may-be-measuring-the-wrong-thing.mdx`
- Visuals: `public/media/blog/ai-pilot-value-bridge.svg`, `public/media/blog/ai-pilot-review-matrix.svg`
- Branch: `content/ai-pilot-value-bridge`
- Status: prepared for preview and publication approval, not published

## Do not bypass

Do not write directly to `main` for normal content work. Do not publish merely because build passes. A successful build proves the repository can compile, not that the content is approved or live.

## Verification receipt

Record branch, commit, PR, lint result, build result, preview URL, link checks, and publication approval separately.
