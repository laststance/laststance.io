# Research: Why MCP Server Instructions Don't Appear in `/context`, and How to Inspect Them

- **Date:** 2026-05-28
- **Subject:** Claude Code CLI
- **Installed version inspected (PRIMARY source):** **v2.1.152**, build SHA `228d8c605defcb10a183db2dbf364a2d6c490c8b`, built `2026-05-26T19:23:17Z` (Mach-O arm64 single-file executable at `/Users/ryotamurakami/.local/share/claude/versions/2.1.152`)
- **Model context:** Opus 4.7 (`claude-opus-4-7`)
- **Mode:** Exhaustive, read-only. The only file written is this report.

---

## 1. Executive Summary

### Q1 — Why do MCP server *instructions* NOT appear as a line item in `/context`?

**Answer (Confidence: HIGH).** Because MCP server instructions are **not measured by any of the components `/context` itemizes**. `/context` does not introspect the real, on-wire prompt; it **re-derives** an estimate by separately token-counting a fixed set of components (static system-prompt sections, the message stream, tool schemas, custom agents, memory files, skills). MCP instructions are injected at session start as **`isMeta: true` message-stream blocks** through an internal channel called `mcp_instructions_delta` — they are **not** part of the static system-prompt string that the "System prompt" bucket measures, and they are **explicitly filtered out** of the "Messages" bucket's token count (the message token counter skips `isMeta` blocks). They therefore fall into a measurement gap and appear in **no** category. This is also exactly why your category rows summed to ≈ the displayed total (≈18.9k): the breakdown total is the **sum of the itemized categories**, and since instructions aren't in any itemized category, they're neither shown as a line nor included in that sum.

Important nuance: this does **not** mean instructions are free or deferred. They **are** resident — they get sent to the model on every turn (confirmed by direct observation in this very session, see §4) and thus count against the **real** API token usage, which `/context` shows as the headline "used" figure only **after** a turn has run and returned usage data. Before the first assistant response, `/context` falls back to the category-sum estimate, in which instructions are invisible.

### Q2 — How can the user inspect (a) the CONTENT and (b) the TOKEN COUNT of the MCP instructions?

**Answer (Confidence: HIGH for content, HIGH for tokens).**

- **Content (a):** The full assembled block is literally the text under the header `# MCP Server Instructions` / `The following MCP servers have provided instructions for how to use their tools and resources:`, with one `## <server-name>` subsection per connected server. Concrete recipes in §5. The most direct, zero-tooling method: it is recorded verbatim in the session transcript JSONL (an `attachment` of type `mcp_instructions_delta`, `isMeta: true`) under `~/.claude/projects/<encoded-cwd>/<session-id>.jsonl`. You can also read each server's raw `instructions` string from its source / `initialize` response.
- **Token count (b):** Three reproducible options in §6, in confidence order: (1) the **delta method** — run `/context`, disconnect the servers, run `/context` again, and diff (most reliable, uses Claude Code's own counter); (2) extract the assembled instruction text and POST it as `system` to the Anthropic **`/v1/messages/count_tokens`** endpoint (this is literally the same API Claude Code's own counter `meH`/`countTokensWithFallback` calls); (3) a paper upper-bound estimate from the 2048-char-per-server cap.

### Headline correction for the article (Confidence: HIGH)

The article's claim that **"MCP server instructions are not deferred and stay resident"** is **TRUE** in v2.1.152 (verified by direct observation and source). The claim that they are **"capped/truncated at 2KB each"** is also **TRUE** (the constant is `WXH = 2048`, applied per server) — and "2KB" matches Anthropic's own CHANGELOG wording, so it is not an error. **The one actionable fix is the citation:** the cap is **not** mentioned anywhere in issue #48680; it comes from the **CHANGELOG (v2.1.84)** and is verifiable in the bundle. Two optional precision notes (parentheticals, not corrections): the cap is precisely **2048 characters (UTF-16 code units)**, and it applies to **both MCP tool descriptions and server instructions**. See §4.

---

## 2. Verdict on H1 / H2 / H3

| Hypothesis | Verdict | Evidence |
|---|---|---|
| **H1** — `/context` folds MCP instructions into the **"System prompt"** bucket | **REFUTED (in this specific form)** — Confidence HIGH | The "System prompt" token count (`P = systemPromptTokens`) is produced by function `TS3`, which counts only the **static** system-prompt sections (built from config + fixed prompt fragments). The MCP instructions are produced **only** by the `mcp_instructions_delta` path as runtime `isMeta` message blocks — there is exactly **one** producer of the `# MCP Server Instructions` header in the entire bundle, and it is that meta-message case, **not** the static prompt builder. So they are not in `P`. The *correct* refinement of H1: instructions are resident but land in **no** itemized `/context` category (a measurement gap), not specifically in "System prompt". |
| **H2** — The image's session had no MCP servers providing instructions | **REFUTED** — Confidence HIGH | (a) The `/context` image shows the `MCP tools · /mcp (loaded on-demand)` line, i.e. servers ARE connected. (b) Direct ground truth: **this very research session** has connected servers (context7, deepwiki, serena, supabase) whose instructions are injected — visible in the session's `# MCP Server Instructions` system-reminder block. |
| **H3** — MCP instructions are now ALSO deferred / not resident in latest Claude Code | **REFUTED** — Confidence HIGH | Instructions are injected on session start as resident `isMeta` blocks in v2.1.152 (direct observation + source). Tool Search defers tool **schemas** only; the instruction injection is a **decoupled, separate mechanism** that Tool Search does not touch. This is precisely the bug reported (and still OPEN) in issue #48680, independently corroborated by the bundle. |

---

## 3. Where MCP Instructions Are (and Aren't) Counted in `/context`

All findings below are from the installed bundle (v2.1.152). The bundle is a Bun single-file executable; the embedded minified JS string-literals are intact and grep-able. I extracted them with `strings -n 16` and located the relevant functions by anchoring on unique literals.

### 3.1 How the instructions are injected (the mechanism)

A reducer case `"mcp_instructions_delta"` builds a message block, not a system-prompt fragment:

```js
case "mcp_instructions_delta": {
  let q = [], K = H.addedBlocks ?? [];
  if (K.length > 0) q.push(`# MCP Server Instructions
The following MCP servers have provided instructions for how to use their tools and resources:
` /* + each block */);
  ...
  return MO([ G6({ content: q.join("\n"), isMeta: !0 }) ]);   // isMeta:true → a META message block
}
```

The per-server blocks are assembled in function `YAK`:

```js
let Y = new Map;
for (let j of z)                 // z = connected servers
  if (j.instructions)
    Y.set(j.name, `## ${j.name}\n${j.instructions}`);   // header + raw (already-capped) instructions
...
return { addedNames: A.map(j=>j.name), addedBlocks: A.map(j=>j.block), removedNames: w.sort() };
```

So instructions ride in the **message stream** as `isMeta: true` content (delivered to the model as a `<system-reminder>`), which is what comment authors on #48680 also observed ("injected its full instructions block as a `<system-reminder>` at session start").

### 3.2 How `/context` builds its category breakdown (function `u06`)

`/context` calls `u06`, which computes each category from a **separate** measurement and pushes labeled rows:

```js
// P = systemPromptTokens (from TS3 — static prompt only)
// e = k - d (system tools); C = mcpToolTokens; b = deferredToolTokens; E = deferred builtin
// m = agentTokens; G = claudeMdTokens (memory); d = skill tokens; g = fS3(H) message-stream tally
if (P>0) HH.push({name:"System prompt",        tokens:P, ...});
if (e>0) HH.push({name:"System tools",         tokens:e, ...});
if (C>0) HH.push({name:"MCP tools",            tokens:C, ...});
if (b>0) HH.push({name:"MCP tools (deferred)", tokens:b, isDeferred:!0});   // ← deferred, excluded from sum
if (E>0) HH.push({name:"System tools (deferred)", tokens:E, isDeferred:!0});
if (m>0) HH.push({name:"Custom agents",        tokens:m, ...});
if (G>0) HH.push({name:"Memory files",         tokens:G, ...});
if (d>0) HH.push({name:"Skills",               tokens:d, ...});
// Messages row:
let r = g.totalTokens + W - g.toolCallTokens - g.toolResultTokens
        - g.attachmentTokens - g.assistantMessageTokens - g.userMessageTokens - W;
if (r>0) HH.push({name:"Messages", tokens:r, ...});
```

There is **no `MCP instructions` push** anywhere in this list. (Confidence: HIGH — the full category list is reproduced here verbatim from the bundle.)

### 3.3 Why instructions land in NO bucket

- **"System prompt" (`P`):** `TS3` counts only static, named system-prompt sections (it token-counts each section via `meH`). The `mcp_instructions_delta` block is a runtime message, not one of these sections — so it is excluded from `P`. (Confidence: HIGH — `TS3` body inspected; the only `# MCP Server Instructions` producer is the meta-message case, not `TS3`.)
- **"Messages" (`r`):** The message token counter `meH`/`countTokensWithFallback` operates on a message list that is preprocessed to **drop `isMeta` blocks** (the bundle has multiple guards of the form `if (K.isMeta) continue;` and an explicit text filter `if (O.includes('"isMeta":true')) continue;` in the counting path; also `if (H.isMeta===!0 || H.isCompactSummary===!0) return;`). The MCP instruction blocks are `isMeta: true`, so they are excluded from `g.totalTokens` and thus from `r`. (Confidence: HIGH.)
- **Net:** Instructions are counted in neither `P` nor `r`, and there is no dedicated category. They are a **measurement gap** in `/context`'s itemization.

### 3.4 Why the categories summed to the displayed total in the user's image

```js
let $H = HH.reduce((acc, oH) => acc + (oH.isDeferred ? 0 : oH.tokens), 0);   // sum of NON-deferred categories
...
let TH = Math.max(0, M - $H - KH);                 // Free space = window - category sum - reserved
let JH = s ? s.input_tokens + s.cache_creation_input_tokens + s.cache_read_input_tokens : null;  // REAL API usage
let YH = JH ?? $H;                                 // headline "used": real usage if available, else category sum
```

- The **headline "used" number** (`YH`) is the **real API token usage** (`JH`) when a turn has produced usage data; **otherwise it falls back to the category sum** (`$H`).
- **"Free space"** is always computed from the **category sum** (`M - $H - KH`), never from `JH`.

In the user's snapshot ("type hi, run `/context`"), the headline fell back to `$H`. We can assert this with **HIGH** confidence because it is **forced by the user's own observation**: they report the categories sum to ~18.913k *and* the headline equals 18.9k. If `JH` (real usage) had been populated, the headline would equal `JH` = `$H` + instructions + any other un-itemized resident text. Since servers are connected (the `MCP tools` line proves it) the instructions are nonzero and are in **no** category, so `JH ≠ $H`. The only way `headline == $H` is therefore `JH == null` → `YH = JH ?? $H` chose `$H`. Because instructions aren't in any category, `$H` (and hence the displayed total) **excludes them entirely** — which is exactly why the rows summed to the total with no leftover. **Practical implication: the user's 18.9k headline UNDERSTATES the real cached context by roughly the size of the instructions block.** The instruction cost only becomes visible in the headline once the model is actually called and returns usage (when `JH` takes over). (Confidence: HIGH for the math and for `JH == null` in the user's frame.)

---

## 4. Resident vs. Deferred — Is the Article's Claim Correct?

### The article's claim (from `content.mdx`)

> "Each connected server also contributes an *instructions string* — these are **not** deferred and stay resident, injected every session; Claude Code truncates them at 2KB each" — cited to **Claude Code MCP docs** + **Issue #48680**.
> And: "They're capped at 2KB each, so the damage is bounded."

### Verdict, claim by claim

| Sub-claim | Verdict | Evidence & confidence |
|---|---|---|
| Instructions are **not deferred** | **TRUE** | Tool Search defers schemas only; instruction injection is a separate `mcp_instructions_delta` mechanism. (HIGH — bundle + #48680 + direct observation.) |
| Instructions **stay resident, injected every session** | **TRUE** | Directly observed in this session's `# MCP Server Instructions` block; produced unconditionally at session start. (HIGH.) |
| **Capped/truncated at 2KB each** | **TRUE** | The constant is **`WXH = 2048`**, applied **per server**, at connect time, to each server's `instructions` string. (HIGH — see §4.1.) "2KB" matches Anthropic's own CHANGELOG wording; the precise semantics are **2048 characters** (UTF-16 code units), and the cap covers **both tool descriptions and instructions** (see §4.2–4.3). |
| Cited to **Issue #48680** | **INCORRECT CITATION** | #48680's body + all 4 comments contain **zero** mention of "2KB", "2048", "2000", "truncate", or any cap. #48680 is exclusively about instructions being injected **unconditionally** (the deferral gap), not about their size cap. The cap's real source is the **CHANGELOG (v2.1.84)**. (HIGH.) |

### 4.1 The exact truncation logic and constant (PRIMARY — from the bundle)

The constant:

```js
... kb3=1e8, IfK=2147483647, WXH=2048, NfK=20 ...
```

Applied identically in **both** MCP server-connection code paths (the SDK/dynamic path and the main stdio/http/sse/claudeai-proxy path):

```js
// Path A (SDK / dynamic servers):
let w = Y.getInstructions(), j = w;
if (w && w.length > WXH)
    j = w.slice(0, WXH) + "… [truncated]",
    A6(T, `Server instructions truncated from ${w.length} to ${WXH} chars`);
let J = { type:"connected", name:T, capabilities:A||{}, instructions:j, ... };

// Path B (main connection path):
let D = A.getInstructions(), f = D;
if (D && D.length > WXH)
    f = D.slice(0, WXH) + "… [truncated]",
    A6(H, `Server instructions truncated from ${D.length} to ${WXH} chars`);
```

`getInstructions()` returns `this._instructions`, which is set from the MCP `initialize` result: `this._instructions = q.instructions`. So the cap is applied **once, at connection time, to every connected server** (all transports), before storage and before the `## <name>\n<instructions>` block is assembled. The same `WXH=2048` is also reused to cap MCP **prompt descriptions** (`D.length > WXH ? D.slice(0,WXH)+"… [truncated]" : D`), corroborating that 2048 is the shared MCP-text cap. (Confidence: HIGH — both code paths and the constant definition reproduced verbatim.)

### 4.2 Bytes vs. characters (a parenthetical, not a correction)

`w.length` and `.slice(0, WXH)` operate on a JavaScript string, i.e. **UTF-16 code units (characters)**, not bytes. For pure ASCII instruction text this equals 2048 bytes, but for multi-byte content (CJK, emoji, accented Latin) the byte size will exceed 2048 while the character cap stays 2048.

**This is NOT an article error.** Anthropic's **own CHANGELOG v2.1.84 says "2KB" verbatim** (see §4.3), so the article is matching official Anthropic phrasing. The bundle's *actual* semantics are 2048 UTF-16 code units, which only diverges from "2 kilobytes" for multi-byte text. So this is worth at most a **parenthetical** ("2KB — actually 2048 characters, so larger for CJK/emoji"), not a correction. (Confidence: HIGH.)

### 4.3 Scope of the cap (official source)

CHANGELOG entry under **v2.1.84**:

> "MCP tool descriptions and server instructions are now capped at 2KB to prevent OpenAPI-generated servers from bloating context"

This is the **canonical, primary citation** for the cap — and it shows the cap covers **both** tool descriptions and server instructions. The cap shipped in **v2.1.84**; issue #48680 was filed later at v2.1.109, which is why the cap already existed but #48680 (a different concern) never mentions it. (Confidence: HIGH.)

### 4.4 Status of #48680 (matches article)

- **State: OPEN** (label `stale` added). Title: "[BUG] claude.ai marketplace MCP server instructions inject into context on every session regardless of Tool Search."
- Confirms: Tool Search defers schemas, but instruction blocks "load unconditionally on every session start … separate mechanisms, and Tool Search does not affect the instruction context." Author's repro: "3+ claude.ai marketplace servers … instruction injection alone accounts for **30–55%** of context before any user input."
- Corroborating comments: a Linux user confirms three `cloudflare-*` servers each injecting their full instructions block as a `<system-reminder>` at session start; another argues `initialize.instructions` are the wrong abstraction under deferred tools.
- The article's "OPEN" status and the "not deferred / unconditional injection" framing are **accurate**. The **only** inaccuracy tied to #48680 is attributing the **2KB cap** to it. (Confidence: HIGH.)

### Bottom line for the article

> **The only actionable fix is the citation.** The "2KB / capped / not-deferred" content is all correct and "2KB" matches Anthropic's own CHANGELOG wording. The single change worth making: re-source the cap. Change "truncates them at 2KB each [Claude Code MCP docs + #48680]" to cite **Claude Code v2.1.84 CHANGELOG** (verifiable in the bundle as `WXH = 2048`), and keep the #48680 citation on the "not deferred / unconditional injection" point only — that is where #48680 actually applies. Optional polish (not required): note parenthetically that the cap is 2048 characters and also covers tool descriptions, not just instructions.

---

## 5. How to Inspect the CONTENT of MCP Instructions (reproducible)

Ordered by confidence/directness. All are read-only.

### Method 1 — Session transcript JSONL (HIGH confidence; verified path)

Claude Code records every injected block, including the `mcp_instructions_delta` attachment (`isMeta: true`), in the per-session transcript:

```bash
# Session transcripts live here (cwd is encoded into the dir name):
ls -t ~/.claude/projects/*/*.jsonl | head

# Extract the assembled MCP instructions block from the latest transcript:
LATEST=$(ls -t ~/.claude/projects/*/*.jsonl | head -1)
grep -a "MCP Server Instructions" "$LATEST" | python3 -c '
import sys, json
for line in sys.stdin:
    try:
        obj = json.loads(line)
    except Exception:
        continue
    s = json.dumps(obj)
    if "# MCP Server Instructions" in s:
        print(s[:4000])
'
```

(The encoded project dir for this very session is, for example, `~/.claude/projects/-Users-ryotamurakami-laststance-laststance-io/` — confirmed to exist on this machine. The block appears as an attachment with `type: "mcp_instructions_delta"` / `isMeta: true`.)

### Method 2 — Per-server raw `instructions` (HIGH confidence)

Each `## <server>` subsection is exactly that server's `instructions` string from its MCP `initialize` result (capped at 2048 chars). So you can read the source directly:

- For local/known servers: read the server's own source/docs for its `instructions` field, or its `initialize` response.
- For a quick live capture, point any MCP client / inspector at the server and read the `instructions` field of `initialize` (e.g. the MCP Inspector). The text you see there is what Claude Code injects, minus anything beyond 2048 chars (which Claude Code replaces with `… [truncated]`).

### Method 3 — `claude --debug` / verbose logging (MEDIUM confidence — not executed here)

`claude --debug` exists and prints verbose internal logs (the bundle contains a `Trace` enum with `Off/Messages/Compact/Verbose`, and the truncation events call an internal logger `A6(...)` with messages like `Server instructions truncated from N to 2048 chars`). Running `claude --debug` is the most likely user-facing way to surface those truncation log lines and prompt-assembly detail, but I did **not** execute it in this read-only session, so I cannot confirm the exact on-screen format. Treat as "very likely works; verify locally." Do not promise a specific output shape.

### Method 4 — Direct observation in an agent's own context (HIGH confidence — observed)

When Claude Code runs the model, the assembled context literally contains the `# MCP Server Instructions` header followed by `## <server>` blocks. This is ground-truth-visible to the model itself (it is how this report confirmed residency). Not a "command" per se, but it is the canonical proof that the text is resident.

---

## 6. How to Measure the TOKEN COUNT (reproducible)

### Method A — Delta via `/context` (HIGH confidence; uses Claude Code's own counter)

This is the most robust and self-consistent because it uses the exact same token counter Claude Code uses, and it sidesteps the fact that instructions aren't itemized:

1. Start a session with your servers connected; run `/context`; note the headline "used" total **after one assistant turn** (so the real API-usage figure `JH` is populated, not the category-sum fallback).
2. Restart Claude Code with the servers disabled and repeat. Two clean ways to disable:
   - Launch with only a hand-picked server file: `claude --strict-mcp-config --mcp-config <file-with-no-or-fewer-servers>` (ignores all other MCP sources).
   - For claude.ai connectors specifically: `ENABLE_CLAUDEAI_MCP_SERVERS=false claude` (v2.1.63+).
   - Or remove/disable specific servers in `~/.claude.json` / `.mcp.json` and via `enabledMcpjsonServers`.
3. The **difference** in the headline total (turn-1) is the instructions' contribution (plus any name-listing), since tool **schemas** are deferred either way and don't move the resident number.

Caveat: compare the **post-first-turn** real-usage figure (`JH`), not the pre-turn category-sum fallback (`$H`) — the latter never contains instructions and so won't move.

### Method B — Anthropic `count_tokens` API on the extracted text (HIGH confidence; same API Claude Code calls)

Claude Code's own counter `meH` == `countTokensWithFallback`, which calls the Messages **`count_tokens`** endpoint (with a haiku fallback). You can reproduce it exactly:

1. Extract the assembled instructions text via §5 Method 1 (the full `# MCP Server Instructions … ## server …` block).
2. Count it as a `system` block:

```bash
# Requires an Anthropic API key. Read-only call; counts tokens, does not generate.
curl -s https://api.anthropic.com/v1/messages/count_tokens \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d @- <<'JSON'
{
  "model": "claude-opus-4-7",
  "system": "<PASTE THE FULL # MCP Server Instructions BLOCK HERE>",
  "messages": [{"role": "user", "content": "x"}]
}
JSON
```

The `input_tokens` in the response is the instruction block's token cost (the trailing `"messages":[{user:"x"}]` adds a couple of tokens you can subtract or ignore). This mirrors how `/context` would have counted it if it itemized it.

### Method C — Paper upper bound from the cap (LOW-MEDIUM confidence; sanity check)

Because each server is capped at 2048 characters plus a small `## <name>\n` header (and a one-time shared header line), an upper bound is roughly:

```
per_server_chars ≈ len("## " + name + "\n") + min(len(instructions), 2048) [+ len("… [truncated]") if capped]
total_chars      ≈ header_line + Σ per_server_chars
tokens           ≈ total_chars / ~4   (English-text rule of thumb; verify with Method B)
```

Use only as a ballpark; Methods A/B are authoritative.

---

## 7. Sources (with confidence and primary/secondary tagging)

### Primary — installed bundle (v2.1.152, SHA `228d8c605defcb10a183db2dbf364a2d6c490c8b`)

All at `/Users/ryotamurakami/.local/share/claude/versions/2.1.152` (Mach-O; literals extracted via `strings -n 16` to `/tmp/cc.strings`). Confidence HIGH for each:

- Truncation constant `WXH = 2048` and both truncation code paths (`getInstructions()` → `.slice(0, WXH) + "… [truncated]"`, log `Server instructions truncated from N to ${WXH} chars`). — §4.1
- `getInstructions()` returns `this._instructions`; `this._instructions = q.instructions` from the MCP `initialize` result. — §4.1
- Injection mechanism: reducer case `"mcp_instructions_delta"` emitting `G6({content:…, isMeta:!0})`; the only producer of the `# MCP Server Instructions` header (count = 2 occurrences, both the same producer). — §3.1
- Per-server assembly in `YAK`: `Y.set(j.name, "## " + j.name + "\n" + j.instructions)` (no further truncation here). — §3.1
- `/context` category builder `u06` with the complete `HH.push({name:…})` list — confirms **no** "MCP instructions" line. — §3.2
- `TS3` (systemPromptTokens `P`) counts only static system-prompt sections via `meH`. — §3.3
- Message-token exclusion of `isMeta` blocks (`if (K.isMeta) continue;`, `if (H.isMeta===!0||H.isCompactSummary===!0) return;`, text filter `'"isMeta":true'`). — §3.3
- Total/Free-space math: `$H` = sum of non-deferred categories; `JH` = real API usage (`input_tokens + cache_creation_input_tokens + cache_read_input_tokens`); headline `YH = JH ?? $H`; `Free space = M − $H − KH`. — §3.4
- `meH` == `countTokensWithFallback` (calls the token-count API, haiku fallback). — §6
- Version metadata: `VERSION:"2.1.152"`, `GIT_SHA:"228d8c605…"`, `BUILD_TIME:"2026-05-26T19:23:17Z"`. — header

### Primary — official CHANGELOG (`anthropics/claude-code`, fetched via `gh api .../CHANGELOG.md`)

- **v2.1.84:** "MCP tool descriptions and server instructions are now capped at 2KB to prevent OpenAPI-generated servers from bloating context." — **canonical source for the cap.** Confidence HIGH. — §4.3
- v2.1.70: "Fixed prompt-cache bust when an MCP server with `instructions` connects after the first turn" — confirms instructions are part of the cached prompt assembly. Confidence HIGH.
- v2.1.x: "Tool search is now disabled by default on Vertex AI…" — corroborates the article's Vertex caveat. Confidence HIGH.
- (Other corroborating entries: `InstructionsLoaded` hook; `includeGitInstructions`; skill-listing cap 250→1,536 chars.)

### Primary — GitHub issue (via `gh issue view 48680 --repo anthropics/claude-code --comments`)

- **#48680 — OPEN** (label `stale`). Body + all 4 comments confirm unconditional instruction injection regardless of Tool Search; "30–55% of context before any user input"; `<system-reminder>` injection on Linux repro. **Contains no mention of any 2KB/2048/truncation cap.** Confidence HIGH. — §4.4

### Primary — direct observation (this session)

- The active session's context contains `# MCP Server Instructions` with `## context7`, `## deepwiki`, `## serena`, `## supabase` blocks → instructions are resident in v2.1.152. Confidence HIGH. — §2, §5/4

### Primary — environment

- `claude --version` → `2.1.152`; binary resolves to `~/.local/share/claude/versions/2.1.152`. Session JSONL dir `~/.claude/projects/-Users-ryotamurakami-laststance-laststance-io/` exists. Confidence HIGH.

### Secondary — the article under review

- `/Users/ryotamurakami/laststance/laststance.io/src/app/articles/Cutting-Claude-Code-Initial-Context-Bloat/content.mdx` (the claims being verified).

### Not independently re-verified here (cited by the article; out of scope of this question)

- Official MCP docs quote "Tool search is enabled by default. MCP tools are deferred…" (code.claude.com/docs/en/mcp) — consistent with the bundle's deferral behavior but not re-fetched in this run; Confidence MEDIUM (consistent with primary evidence).
- The MCP spec `instructions` field in `initialize` (modelcontextprotocol.io) — the bundle confirms Claude Code reads `q.instructions` from the `initialize` result, which matches the spec's intent; Confidence MEDIUM (inferred from bundle, not re-read from spec).

---

## 8. Open Questions / Not Verified

1. **Exact `/context` frame in the user's image.** Whether the headline 18.9k was the category-sum fallback (`$H`, no instructions) or a real post-turn usage figure (`JH`, includes instructions) depends on whether an assistant turn had executed when they ran `/context`. The category-sum behavior is certain; which branch the specific screenshot used is MEDIUM. Either way, the **absence of a line item** is fully explained.
2. **`claude --debug` output shape.** Not executed (read-only); the truncation logger and trace levels exist in the bundle, but the exact user-facing rendering of the assembled instructions / truncation logs is unverified. (§5 Method 3.)
3. **Historical cap value.** The cap is `2048` in v2.1.152 and was introduced in v2.1.84 per CHANGELOG. Whether it was ever a different number, or whether very early builds had no cap, was not exhaustively traced (the v2.1.84 entry is the introduction, so pre-v2.1.84 builds had no instruction cap). LOW residual uncertainty.
4. **Connector name-listing cost.** Beyond the instructions text, connected servers may contribute a small name listing; the delta method (§6A) captures instructions+listing together. Their separation was not isolated. LOW importance.
5. **Subagent context.** The category labels include `*_FOR_SUBAGENTS_ONLY` color tokens and "(deferred)" variants; this report focused on the main-thread `/context`. Subagent breakdowns were not separately analyzed.

---

### One-line answer to the user

MCP server instructions don't get their own `/context` line because Claude Code injects them as **`isMeta` message blocks** (the `mcp_instructions_delta` channel) that are **excluded from both the "System prompt" measurement and the "Messages" token count**, so they fall into a gap in `/context`'s itemized estimate — they are nonetheless **resident** (sent every turn) and **truncated at 2048 characters per server** (constant `WXH=2048`, introduced in CHANGELOG v2.1.84 — **not** in issue #48680). To see them: read the `# MCP Server Instructions` block from the session JSONL under `~/.claude/projects/.../*.jsonl`; to measure them: diff `/context` with servers on vs. off (post-first-turn), or POST the extracted block to `/v1/messages/count_tokens`.
