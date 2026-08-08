# Throttl Website Development Loop

## Purpose

This is the default operating process for website development work, especially visual changes. It separates implementation from evaluation, uses the current uncommitted working tree for Vercel previews, and requires evidence before a change is considered ready for human review.

This process does not publish production. It does not require a local production build to create a preview, but local lint/build remain useful preflight checks.

## Source of truth

Every change begins with a source-of-truth declaration.

```yaml
route: /blog/your-ai-pilot-may-be-measuring-the-wrong-thing
targets:
  - components/blog/WorkflowFlow.tsx
non_targets:
  - unrelated existing working-tree changes
canonical_visual_sources:
  WorkflowFlow: components/blog/WorkflowFlow.tsx
```

Do not polish multiple competing implementations of the same visual at once. If an SVG, React component, exported image, or other duplicate exists, classify it before editing:

- `canonical-live`: rendered by the route under review
- `canonical-export`: deliberately maintained for export/social/document use
- `reference-only`: retained for comparison, not edited by the loop
- `obsolete`: candidate for separate cleanup, never silently deleted

The worker may edit only `canonical-live` files listed in the brief.

## The worker–grader graph

```text
BRIEF + SOURCE-OF-TRUTH CHECK
          |
          v
BASELINE CAPTURE
fixed route, viewport, scroll positions
          |
          v
WORKER
one bounded implementation change
          |
          v
QUALITY GATES
lint -> local build when practical -> Vercel preview
          |
          v
BROWSER VERIFIER
screenshots + DOM/layout/console checks
          |
          v
INDEPENDENT GRADER
rubric score + blocking defects + exact next instruction
          |
          v
LOOP CONTROLLER
PASS | REVISE | BLOCKED | NO_GO
          |
          +--> REVISE: worker receives grader packet
          +--> PASS: human review packet
          +--> BLOCKED: resolve missing context
          +--> NO_GO: reject candidate and preserve baseline
```

The worker does not grade its own work. The grader does not edit source code. The controller does not silently expand scope.

## Roles

### Design director / intake

Creates the brief, names the route and canonical source, defines the design intent, identifies non-targets, and writes measurable acceptance criteria.

### Worker

Makes surgical changes within the brief. The worker must preserve unrelated working-tree changes, run the required checks, create a Vercel Preview, and return a structured iteration receipt.

### Browser verifier

Captures the same route at the same viewports every iteration. It checks screenshots, overflow, clipping, bounding boxes, console errors, and required elements. Deterministic failures block the grader pass.

### Independent grader

Reviews rendered screenshots and verifier evidence, not just source code. It scores the rubric, records blocking defects, and gives the worker an exact next instruction. It does not rewrite the component.

### Loop controller

Routes the result. Autonomous revision is capped at three iterations per target. A score regression rejects the candidate. After the cap, the loop stops for human direction instead of producing another speculative implementation.

## Required iteration sequence

### 1. Write the brief

Create a run directory under `docs/design-runs/<run-id>/` outside the application source. Use the template and schema in this directory's supporting files.

The brief must include:

- route and target visual aids
- canonical source files
- non-target files
- fixed viewports, minimum 375, 768, and 1440 pixels
- design intent
- acceptance criteria
- maximum autonomous iterations
- human approval gate

### 2. Capture the baseline

Before editing, capture the current preview or local running build at the fixed viewports. Save the URL, viewport, screenshot paths, source revision/digest, and known defects.

Do not call the current implementation good merely because it builds.

### 3. Run one worker iteration

The worker gets only:

- the approved brief
- the baseline evidence
- the latest grader packet, if any
- the allowed file boundary

It returns a candidate. It does not make unrelated cleanup changes.

### 4. Run quality gates

From `/root/throttl-home`:

```bash
npm run lint
npm run build                 # recommended preflight when practical
npm run preview               # Vercel-hosted preview of current working tree
```

`npm run preview` runs `vercel --yes`. Never use `vercel --prod` in this loop.

### 5. Verify the rendered candidate

Use the preview URL and the same fixed route/viewports as the baseline. Capture:

- full-page screenshots
- visual-aid crops
- DOM/layout evidence
- console and network errors
- mobile and desktop overflow results

If the preview is inaccessible, the iteration is `BLOCKED`, not `PASS`.

### 6. Grade

Use the rubric below. The grader must distinguish:

- `PASS`: no material defects, deterministic checks pass, score threshold met
- `REVISE`: concrete fixable defects remain
- `BLOCKED`: missing preview, missing source, missing screenshot, or failed prerequisite
- `NO_GO`: candidate regressed or violates scope/brand/accessibility constraints

### 7. Route

- `PASS`: create a human review packet. Do not publish.
- `REVISE`: dispatch the worker with only the blocking defects and next instruction.
- `BLOCKED`: resolve the prerequisite, then rerun the same iteration.
- `NO_GO`: preserve the previous candidate as baseline and discard the failed candidate.

## Visual grading rubric

Score each dimension from 0 to 4:

| Dimension | 4 means |
|---|---|
| Spacing rhythm | Internal and external spacing is deliberate, consistent, and proportionate |
| Alignment | Shared edges, centerlines, connectors, and baselines are visibly disciplined |
| Hierarchy | The eye immediately finds title, primary content, annotation, and qualification |
| Responsive composition | Mobile is intentionally composed, not a collapsed desktop layout |
| Typography | Text wraps cleanly, is readable, and uses a coherent type scale |
| Information clarity | The visual explains its thesis quickly without requiring the article body |
| Brand/editorial fit | Palette, borders, type, and density belong to the Throttl editorial system |
| Craft | No accidental rules, dead zones, cramped regions, clipping, or decorative noise |

Default pass threshold: `28/32`, with no dimension below `3` and no unresolved P0/P1 defect.

A high score cannot override a deterministic failure. No horizontal overflow, clipping, missing content, console error, or source-boundary violation may be waved through as taste.

## Required deterministic checks

At minimum, the verifier must check:

- route returns successfully
- no horizontal page overflow at each viewport
- every target figure has a non-zero bounding box
- target content is inside the viewport/container as intended
- all required headings, labels, cards, captions, and connectors are present
- no text is clipped or visibly outside its card
- mobile-specific connectors/layout elements exist where specified
- no uncaught browser console errors
- images have alt text when images are part of the target
- heading hierarchy remains valid

## Example target acceptance criteria

### Workflow visual

- Desktop shows one horizontal connector through the node centerline.
- Mobile shows one vertical connector through the node centerline.
- First and last nodes have intentional terminal spacing.
- The visual reads as a sequence, not six unrelated bordered rows.
- The title is a semantic heading nested below the article section heading.
- The exception note is visually subordinate to the sequence.

### Value bridge visual

- Desktop has three balanced content columns and predictable 40px arrow rails.
- Mobile has a clear vertical progression with restrained separators.
- The gross benefit, hidden work, and net value relationships are immediately legible.
- The hidden-work list is connected to the bridge, not a visually unrelated second panel.
- Coral remains reserved for the endpoint/emphasis, not general decoration.

## Stop conditions

Stop and request human direction when:

- three autonomous revisions fail to reach the threshold
- the grader reports a score regression
- the worker needs to change the canonical source boundary
- two valid visual directions conflict materially
- the preview is inaccessible or inconsistent with the claimed source
- the task expands into unrelated site cleanup

## Human review gate

`PASS` means ready for Miguel's review, not approved for production.

The human review packet must contain:

- target route
- canonical files changed
- before/after screenshots at fixed viewports
- preview URL
- local lint/build results
- browser verifier result
- grader score and rubric
- remaining non-blocking notes
- explicit production status: not published

## Artifacts and provenance

Every run preserves its brief, baseline, candidate receipts, screenshots, verifier output, grader reports, and final status. Do not overwrite prior iterations. A revision creates a new iteration directory.

Suggested layout:

```text
docs/design-runs/<run-id>/
  brief.json
  baseline/
  iterations/001/
    worker-receipt.json
    preview.json
    screenshots/
    verifier.json
    grader.json
  final-review.json
```

The application repository remains the source of code. The run directory is the source of process evidence.

## Relationship to CI and publication

- `npm run preview` is the uncommitted working-tree preview path.
- `.github/workflows/preview-build.yml` is the committed branch/PR build path.
- A successful local build, remote build, or Preview URL is not publication approval.
- Production requires a separate explicit approval and `vercel --prod` or the approved production integration.
