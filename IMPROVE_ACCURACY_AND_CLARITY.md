# Recommendations to Improve Accuracy, Internal Validity, and Clarity

These revisions consolidate the Version 4 guidance into a tighter, more actionable checklist for strengthening transparency, validation, reproducibility, and user comprehension. Each section now includes a short implementation checklist so teams can quickly confirm completion.

## 1. Expand Methodological Transparency
- **Document every input clearly.** Provide definitions, parameter meanings, default assumptions, offsets (if applicable), and discounting choices in a single "Methodology" section so users do not need to infer them from scattered notes.
- **Add worked examples.** Include one example for each computation tab (Pre-Injury, Post-Injury, All Years) with real numbers and transformation steps to illustrate how outputs are derived from inputs.
- **Explain toggles and exceptions.** When discounting is disabled, state the rationale, jurisdictional basis, and show discounted vs. nominal side-by-side to make the impact obvious.

**Action checklist**
- Centralize definitions and defaults into one `Methodology` page and link it from every workbook tab.
- Add at least one worked example per tab with screenshots or exported tables showing the exact calculation path.
- Capture the toggle rationale (e.g., jurisdictional rule or expert assumption) and include before/after screenshots to demonstrate the effect.

## 2. Strengthen Input Validation and Data Provenance
- **Specify sources and vintages.** Cite tables and publication dates for work-life expectancy, unemployment, tax rates, growth assumptions, and any other critical inputs.
- **Define acceptable ranges.** Publish expected value ranges (e.g., discount rates, growth rates, unemployment factors) with sanity checks before calculations run.
- **Capture provenance in exports.** Embed input sources and timestamps in CSV/JSON/Word outputs so others can verify lineage.

**Action checklist**
- Add a `Sources` table that lists each data set, publication date, and link or citation ID.
- Implement range checks that block runs with out-of-bounds parameters and log the offending fields.
- Stamp exports with the source table, timestamp, and hash of the input JSON or spreadsheet to make lineage auditable.
- Enforce server-side guardrails so calculation saves fail fast when growth/discount/A.E.F. inputs stray outside configured ranges, and embed SHA-256 assumption fingerprints plus validation notes into every Word/Excel export.

## 3. Bolster Reproducibility and Auditability
- **Standardize export bundles.** Pair JSON/CSV/Word exports with a "case packet" that includes raw inputs, saved JSON assumptions, exported schedules, and sensitivity matrices.
- **Version profiles and notes.** Recommend versioned profile exports (e.g., v1.4/v1.5) plus a simple change log to track updates over time.

**Action checklist**
- Create a one-click "Case Packet" export that zips raw inputs, current JSON assumptions, schedule outputs, and sensitivity tables.
- Include a short `CHANGELOG` entry in each packet noting the version tag, author, and summary of changes since the prior run.
- Store packet hashes (e.g., SHA-256) so investigators can verify files have not been altered.

## 4. Enhance Robustness of Offset and Discounting Logic
- **Clarify manual vs. automatic behavior.** Describe how manual overrides interact with automatic offsets in both past and future periods, including precedence and conflict resolution.
- **Make exceptions explicit.** When offset or discounting rules diverge from defaults, state the justification and show discounted vs. nominal comparisons to highlight impacts.

**Action checklist**
- Document precedence rules (manual vs. automatic offsets) in a decision table and link it in the UI near the toggles.
- Add validation that flags conflicting offsets and forces the user to resolve conflicts before export.
- Show paired nominal/discounted values in outputs whenever a rule differs from the default setting, with a note describing why.

## 5. Improve Clarity and User Comprehension
- **Centralize quick-start instructions.** Provide a concise checklist for common tasks while keeping detailed steps in linked references.
- **Add a glossary.** Define domain terms (e.g., WLE, YFS, URF, PC, PM) to reduce cognitive load and make documentation self-contained.

**Action checklist**
- Place a quick-start checklist at the top of the documentation and replicate it inside the tool's help panel.
- Add a glossary section with short, plain-language definitions and cross-links to the methodology and examples.
- Include before/after examples that show how enabling or disabling a toggle changes downstream outputs.

## Implementation Tips
- Convert lists into short, scannable bullets with bolded lead-ins.
- Co-locate references (tables, statutes, assumptions) near the relevant workflow steps.
- Keep export artifacts self-contained so readers can reproduce calculations without additional context.
- Confirm every new section includes an explicit "Done when" statement so reviewers know how to sign off.
