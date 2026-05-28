# Research: How to PREVENT MCP Server *Instructions* From Being Injected Into Claude Code's Context

- **Date:** 2026-05-28
- **Subject:** Claude Code CLI — suppressing the per-server `instructions` string injected at session start
- **Installed version inspected (PRIMARY source):** **v2.1.153**, build SHA `6cfd211761f355dcebba152b66399d0416e445d2`, built `2026-05-27T20:03:21Z` (Mach-O arm64 single-file executable at `/Users/ryotamurakami/.local/share/claude/versions/2.1.153`). This is one release newer than the prior report's v2.1.152; the mechanism is unchanged (see §6).
- **Model context:** Opus 4.7 (`claude-opus-4-7`)
- **Mode:** Exhaustive, read-only, `--validate` / `--safe-mode`. Only this file is written. Undocumented findings are labelled "undocumented (bundle-only)".
- **Builds on:** `claudedocs/research_mcp-instructions-in-context_2026-05-28.md` (the injection mechanism, the 2KB cap, and the `/context` measurement gap are established there and not re-derived here).

---

## 1. Executive Summary

### The headline verdict (CRUX, Confidence: HIGH)

**There is NO first-party, documented, client-side toggle that suppresses an MCP server's *instructions specifically while keeping that server's tools*.** Every client-side lever that prevents instruction injection works by **not connecting the server at all** — which necessarily drops the server's **tools too**. The only way to "keep the tools, drop the instructions" is **server-side**: have the server return an empty/absent `instructions` field in its MCP `initialize` result. For a third-party server you don't control, the only path is an **undocumented MCP-proxy** that rewrites the `initialize` response.

This is exactly the gap behind open issue **#48680**. It is corroborated four independent ways:
1. **Bundle absence:** the v2.1.153 binary contains **no** `disableInstructions`, `skipInstructions`, `suppressInstructions`, `disableMcpInstructions`, `DISABLE_MCP_INSTRUCTIONS`, `ENABLE_MCP_INSTRUCTIONS`, or any `*MCP*INSTRUCTION*` env/flag identifier.
2. **The asymmetry:** the binary *does* contain `suppressNextSkillListing` (a dedicated suppressor for the **Skills** listing) — proving Anthropic ships per-feature suppressors when they intend a lever. There is **no** MCP-instructions analog (`suppressNextMcpInstructions` etc. = 0 hits).
3. **Docs silence:** `code.claude.com/docs/en/mcp`, `/settings`, and `/managed-mcp` describe `ENABLE_CLAUDEAI_MCP_SERVERS`, `--strict-mcp-config`, allow/deny lists, `alwaysLoad`, `permissions.deny`, and the 2KB cap — but **no** setting to turn off instructions while keeping a server's tools.
4. **CHANGELOG silence:** no entry after v2.1.84 adds an instruction opt-out (the only instruction-related toggle Anthropic shipped is `includeGitInstructions` / `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS`, which is for the **git** workflow block, not MCP).

### What actually works (ranked, actionable)

1. **Don't connect the server** — `claude mcp remove <name>`, or delete it from `~/.claude.json` / `.mcp.json`. Trivially injects nothing. (Drops tools too.) **HIGH.**
2. **Per-server disable for `.mcp.json` servers** — `disabledMcpjsonServers` (reject list) / leave it out of `enabledMcpjsonServers`. A rejected server is not connected → no `initialize` → no instructions. (Drops tools too.) **HIGH (documented behavior); exact gate not exhaustively bundle-traced → MEDIUM-HIGH on internals.**
3. **Pin to a curated server file** — `claude --strict-mcp-config --mcp-config <file>`. Loads *only* the listed servers, ignoring every other MCP source; unlisted servers never connect → no instructions from them. (Drops their tools too.) **HIGH.**
4. **Drop claude.ai connectors** — `ENABLE_CLAUDEAI_MCP_SERVERS=false` (v2.1.63+). Skips all subscription connectors entirely, including their instructions. (Drops their tools too.) **HIGH.**
5. **Enterprise allow/deny / `managed-mcp.json`** — `deniedMcpServers`, `allowedMcpServers`, `managed-mcp.json` (empty map = disable MCP entirely). A blocked server stops *loading* → never connects → no instructions. (Drops tools too; admin-scoped.) **HIGH.**
6. **Server-side (own server):** omit `instructions` from the `initialize` result. **This is the only lever that keeps tools and drops instructions.** **HIGH.**
7. **Server-side (third-party, undocumented):** front the server with a local MCP proxy that strips the `instructions` field from `initialize`. **MEDIUM — feasible, no first-party tooling.**

### What does NOT work (common misconceptions)

- **`ENABLE_TOOL_SEARCH` (any value)** does **not** suppress instructions. Tool Search defers tool **schemas** only; instruction injection is a **decoupled** mechanism (open bug #48680). Setting `ENABLE_TOOL_SEARCH=true` / `auto` leaves instructions fully resident.
- **The 2KB cap is a bound, not a kill-switch.** `bXH = 2048` truncates each server's instructions to 2048 chars; it does not remove them.
- **`permissions.deny` (e.g. `MCP(serverName)`, `ToolSearch`)** gates **tool execution at call time**, not connection/init. It does not stop instruction injection.
- **`alwaysLoad`** is about tool **deferral**, never about instructions.
- **`--mcp-config <file>` *without* `--strict-mcp-config`** is **additive**, not exclusive — other MCP sources still load.

---

## 2. The CRUX, Stated Plainly (#1)

> **Question:** Is there ANY first-party, documented, client-side toggle that suppresses an MCP server's *instructions specifically* while KEEPING that server's tools?
>
> **Answer: NO.** (Confidence: HIGH.)

The mechanism makes the reason concrete. In v2.1.153, instruction injection is gated by exactly one condition in the assembly function (internal name `VwK`):

```js
let z = (servers).filter((j) => j.type === "connected"),
    Y = new Map;
for (let j of z)
  if (j.instructions)                                  // ← the ONLY gate
    Y.set(j.name, `## ${j.name}\n${j.instructions}`);  // header + (already-capped) instructions
```

and the reducer (`getMcpInstructionsDeltaAttachment`, export `$vH`) that turns those blocks into a resident `isMeta:true` message:

```js
case "mcp_instructions_delta": {
  let q = [], K = H.addedBlocks ?? [];
  if (K.length > 0)                                    // ← skipped entirely if no server has instructions
    q.push(`# MCP Server Instructions\n...`);
  ...
  return MO([ G6({ content: q.join("\n"), isMeta: !0 }) ]);
}
```

The gate is **purely** `j.type === "connected" && j.instructions` (non-empty). **No environment variable, CLI flag, or settings key is read anywhere in this path** (verified: `hits before assembly: NONE`). Therefore:

- The only way the client can avoid the block is to make the server **not connected** (so it's excluded from `z`), or to make the server's `instructions` **empty/falsy** (which the *server*, not the client, controls).
- There is no client-side branch that says "connected, has instructions, but skip them." The gap behind #48680 is real and present at the code level.

---

## 3. The Levers Table

> "Keeps the server's tools?" is the load-bearing column. **Every** client-side lever is connection-prevention → drops tools and instructions **together**. Only the server-side levers keep tools.

| Lever | Scope | What it drops | Keeps the server's tools? | Source + version | Confidence |
|---|---|---|---|---|---|
| `claude mcp remove <name>` / delete from `~/.claude.json` / `.mcp.json` | per-server (client) | Everything for that server (tools + instructions) | **No** | `code.claude.com/docs/en/mcp` "Managing your servers" (v2.1.153) | HIGH |
| `disabledMcpjsonServers: ["x"]` (reject) / omit from `enabledMcpjsonServers` / don't set `enableAllProjectMcpServers` | per-server, `.mcp.json` servers (client) | Tools + instructions of the un-approved server (it isn't connected) | **No** | `/settings` ("reject"/"approve" `.mcp.json` servers); keys present in binary (v2.1.153) | HIGH (behavior) / MEDIUM-HIGH (exact gate not bundle-traced) |
| `claude --strict-mcp-config --mcp-config <file>` | global session (client) | Tools + instructions of every server **not** in `<file>` | **No** (for unlisted servers) | `claude --help`; `/settings` CLI flags (v2.1.153) | HIGH |
| `ENABLE_CLAUDEAI_MCP_SERVERS=false` | all claude.ai connectors (client) | Connector tools + connector instructions | **No** (connectors only) | `code.claude.com/docs/en/mcp` "Use MCP servers from Claude.ai"; v2.1.63+ | HIGH |
| `deniedMcpServers` (denylist) | all scopes (enterprise/managed; user denylist merges) | Tools + instructions of the blocked server (stops loading) | **No** | `code.claude.com/docs/en/managed-mcp` (v2.1.153) | HIGH |
| `allowedMcpServers` + `allowManagedMcpServersOnly` (hard allowlist) | all scopes (enterprise) | Tools + instructions of any server not on the allowlist | **No** | `/managed-mcp` (v2.1.153) | HIGH |
| `managed-mcp.json` (fixed set; empty map `{}` = disable MCP entirely) | enterprise | Everything from non-listed servers; empty map drops all MCP | **No** | `/managed-mcp` "Exclusive control"/"Disable MCP entirely" (v2.1.153) | HIGH |
| `strictPluginOnlyCustomization` with `mcp` | enterprise | User-added servers (only plugin servers load) | **No** (for user servers) | `/managed-mcp` "Choose a pattern"; `/settings` | HIGH |
| Disable the plugin that bundles the server (`enabledPlugins.<p>=false`) | per-plugin (client) | Tools + instructions of that plugin's MCP servers | **No** | `code.claude.com/docs/en/mcp` "Plugin-provided MCP servers" (work identically to user servers) | HIGH |
| **Omit `instructions` from the server's `initialize` result** | **server-side (own server)** | **Only the instructions** | **YES** | MCP spec `initialize.instructions`; bundle conditional `if(j.instructions)` (v2.1.153) | HIGH |
| **MCP proxy that rewrites `initialize` to strip `instructions`** | **server-side (third-party)** | **Only the instructions** | **YES** | Undocumented (bundle-only inference) — no first-party tooling | MEDIUM |

---

## 4. Server-Side Guidance

### 4.1 A server you control (Confidence: HIGH)

Return an **empty or absent `instructions`** field from the MCP `initialize` result. Claude Code stores it as `this._instructions = q.instructions` (`getInstructions()` returns it), and the assembly conditional `if (j.instructions)` is **falsy** for `""`/`undefined`/`null`, so no `## <name>` block is appended for that server. If *no* connected server has instructions, the reducer's `K.length > 0` guard skips the entire `# MCP Server Instructions` push — nothing is injected at all. The server's **tools remain fully available** (deferred or `alwaysLoad`, unaffected).

This is the clean, supported answer for first-party servers. Trade-off: with Tool Search on, the docs note that good `instructions` "help Claude understand when to search for your tools." Dropping them entirely can reduce the model's awareness of when to reach for the server. The middle path is to keep `instructions` **short** (well under the 2048-char cap) rather than empty.

### 4.2 A third-party server you do NOT control (Confidence: MEDIUM — undocumented)

There is **no first-party lever** to strip another vendor's `instructions`. The only known pattern is to insert a **local MCP proxy** between Claude Code and the upstream server:

- Configure Claude Code to connect to your proxy (e.g. a stdio command) instead of the real server.
- The proxy forwards all MCP traffic to the upstream, **except** it rewrites the `initialize` **result** to delete (or blank) the `instructions` field before returning it to Claude Code. All `tools/list`, `tools/call`, resources, and prompts pass through untouched, so the server's tools keep working.

This is feasible because Claude Code reads `instructions` only from the `initialize` result and applies no integrity check on it. **Label this honestly when relaying it: it is an undocumented community pattern, requires running/maintaining a proxy, and could break if the transport or handshake changes.** No Anthropic-provided proxy or flag does this.

---

## 5. What Does NOT Work / Common Misconceptions (Confidence: HIGH)

| Misconception | Reality | Evidence |
|---|---|---|
| "`ENABLE_TOOL_SEARCH` defers/suppresses instructions" | Tool Search defers tool **schemas** only. Instruction injection is a **separate, decoupled** mechanism that Tool Search does not touch. Instructions stay resident regardless of `true`/`auto`/`false`. | Open bug **#48680**; bundle (`getMcpInstructionsDeltaAttachment` independent of the deferred-tools path `getDeferredToolsDeltaAttachment`); direct observation in this session (instructions present with Tool Search on) |
| "The 2KB cap removes the cost" | `bXH = 2048` **truncates** each server's instructions to 2048 chars at connect time; it **bounds** the cost but never removes it. | CHANGELOG v2.1.84; bundle `Server instructions truncated from ${w.length} to ${bXH} chars` |
| "Denying the server's tools (`permissions.deny: ["MCP(serverName)"]`) stops its instructions" | `permissions.deny` gates **tool execution at call time**, not connection or `initialize`. The server still connects and its instructions still inject. | `/settings` (`permissions.deny` is a tool-permission rule); bundle shows no permission check before the assembly `if(j.instructions)` |
| "`permissions.deny: ["ToolSearch"]` stops instructions" | That only disables the `ToolSearch` tool; instruction injection is unrelated and continues. | `code.claude.com/docs/en/mcp` "Configure tool search"; bundle decoupling |
| "`alwaysLoad` controls instructions" | `alwaysLoad` controls whether a server's **tools** load upfront vs deferred. It never touches instructions (10 occurrences in the binary, none co-located with `instructions`). | `/mcp` "Exempt a server from deferral"; bundle |
| "`--mcp-config <file>` alone curates servers" | Without `--strict-mcp-config`, `--mcp-config` is **additive** — other MCP sources still load (and inject their instructions). You need **both** flags to make it exclusive. | `claude --help` ("Only use MCP servers from `--mcp-config`, ignoring all other MCP configurations") |
| "Editing `cachedGrowthBookFeatures…` disables connectors" | The server overwrites that on the next handshake (see #44112). Use `ENABLE_CLAUDEAI_MCP_SERVERS=false`. | Prior article §"What Did Not Make the Cut"; #44112 |

---

## 6. v2.1.153 Bundle Inspection — What Changed vs v2.1.152

The injection mechanism is **identical**; only minified identifiers were renamed (expected between builds). Verified directly against `~/.local/share/claude/versions/2.1.153` via `strings -n 8`:

| Element | v2.1.152 (prior report) | v2.1.153 (this report) | Behavior |
|---|---|---|---|
| 2KB cap constant | `WXH = 2048` | `bXH = 2048` | unchanged (2048 UTF-16 chars per server) |
| Assembly function | `YAK` | `VwK` | unchanged (`filter type==="connected"` → `if(j.instructions)` → `## name`) |
| Truncation log | `Server instructions truncated from N to ${WXH} chars` | `…to ${bXH} chars` | unchanged |
| `initialize` read | `this._instructions = q.instructions` | identical | unchanged (transport-agnostic) |
| Attachment getter | (`mcp_instructions_delta` reducer) | `getMcpInstructionsDeltaAttachment` (`$vH`), reducer case `"mcp_instructions_delta"` | unchanged |
| Skill suppressor (asymmetry proof) | n/a | `suppressNextSkillListing` (2 hits) | exists for Skills; **no MCP analog** |
| Dedicated instruction suppressor | none | **none** (`disable/skip/suppressInstructions`, `DISABLE_MCP_INSTRUCTIONS`, etc. = 0 hits) | the gap |

**Gating verdict (#4):** Injection is **UNCONDITIONAL given (a) a connected server and (b) a non-empty `instructions` string.** No env var, CLI flag, or settings key gates the assembly conditional. (Confidence: HIGH — the assembly neighborhood reads no config; the only gate is `j.type==="connected" && j.instructions`.)

**Transport (#7):** `this._instructions = q.instructions` is set immediately after the `initialize` handshake, which is identical for **stdio / SSE / HTTP(streamable-http)**. Transport does **not** change whether instructions inject. (Confidence: HIGH.)

**`alwaysLoad` (#7):** does not gate instructions (it gates tool deferral). (Confidence: HIGH.)

**Plugin-provided servers (#7):** the docs state plugin MCP servers "work identically to user-configured servers." So their instructions inject the same way; the lever is to **disable the plugin** (no plugin-only instruction opt-out exists). (Confidence: HIGH for docs; the binary path is the same `VwK`/reducer.)

**Settings keys present in binary (confirms they exist as real config, docs are authoritative for semantics):** `disabledMcpjsonServers` (22), `enabledMcpjsonServers` (20), `enableAllProjectMcpServers` (16), `deniedMcpServers` (13), `allowedMcpServers` (27), `allowManagedMcpServersOnly` (5), `allowAllClaudeAiMcps` (3), `strictPluginOnlyCustomization` (14), `ENABLE_CLAUDEAI_MCP_SERVERS` (2), `ENABLE_TOOL_SEARCH` (20), `strict-mcp-config` (20), `mcp-config` (38).

---

## 7. Enumerated Levers — Detail & Verification (#2)

### 7.1 Not connecting / removing the server (HIGH)
`claude mcp remove <name>`, or delete the entry from `~/.claude.json` (local/user scope) or `.mcp.json` (project scope). A removed server is never instantiated → no `initialize` → not in `z` → no instructions. Trivially correct. Drops tools too.

### 7.2 Per-server enable/disable for `.mcp.json` servers (HIGH behavior / MEDIUM-HIGH internals)
- `disabledMcpjsonServers`: "List of specific MCP servers from `.mcp.json` files to **reject**" (e.g. `["filesystem"]`).
- `enabledMcpjsonServers`: "List of specific MCP servers from `.mcp.json` files to **approve**" (e.g. `["memory","github"]`).
- `enableAllProjectMcpServers`: "Automatically **approve** all MCP servers defined in project `.mcp.json` files."

Documented semantics are **approve/reject**: a rejected (or un-approved) `.mcp.json` server is not connected, so it produces no `initialize` and no instructions. **Caveat (honest):** I did not exhaustively bundle-trace whether rejection happens at config-parse (server never instantiated) vs a later approval gate. The documented behavior is "the server is not used," which means no handshake and no instructions — but the exact internal gate is **not bundle-verified** here, so treat the *internals* as MEDIUM-HIGH while the *outcome* is HIGH. (Note: these keys apply only to servers declared in `.mcp.json` files, i.e. project scope and similar; they are the project-approval mechanism, not a universal per-server switch for local/user-scope servers — for those, removal/`--strict-mcp-config` is the lever.)

Historical note: prior issue **#41809** ("Disabled MCP servers used to remain in the deferred list", CLOSED · not-planned) was about the **deferred tool list**, not instructions; verify with `/mcp` after disabling.

### 7.3 `--strict-mcp-config` / `--mcp-config <file>` (HIGH)
`claude --strict-mcp-config --mcp-config <file>` loads **only** the servers in `<file>` and ignores all other MCP sources (local, project, user, plugin, connectors). Unlisted servers never connect → no instructions from them. **Both flags are required** for exclusivity; `--mcp-config` alone is additive.

### 7.4 `ENABLE_CLAUDEAI_MCP_SERVERS=false` (HIGH, v2.1.63+)
Documented verbatim: "To disable claude.ai MCP servers in Claude Code, set the `ENABLE_CLAUDEAI_MCP_SERVERS` environment variable to `false`." Drops all subscription connectors (and thus their instructions and name listing) from the CLI. Connectors stay available on claude.ai/Desktop. Drops their tools too.

### 7.5 Managed / enterprise: `deniedMcpServers` / `allowedMcpServers` / `managed-mcp.json` (HIGH)
Per `/managed-mcp`: allow/deny lists "filter which **configured servers are allowed to load**." A denied or non-allowlisted server "silently disappears" and "stops **loading**." A server that does not load is never connected → no `initialize` → no instructions. `managed-mcp.json` with `{}` disables MCP entirely. `allowManagedMcpServersOnly: true` makes the allowlist authoritative; denylist always merges (including a user's own `deniedMcpServers`, so a user *can* self-block a managed server). `allowAllClaudeAiMcps` (managed only, v2.1.149+) re-admits connectors alongside a managed set. All drop tools too; all are connection-prevention, not instruction-only suppression.

### 7.6 `permissions.deny` (does NOT suppress instructions — verified)
`permissions.deny` supports `MCP(serverName)` / `MCP(serverName:resourceName)` patterns, but these gate **tool/resource access at call time**, not connection or `initialize`. The bundle reads no permission state before the assembly `if(j.instructions)`. Denying `ToolSearch` likewise does nothing to instructions. **Confirmed: no deny entry stops instruction injection.**

---

## 8. CHANGELOG & Open Issues (#5, #6)

### 8.1 CHANGELOG (PRIMARY, fetched via `gh api …/CHANGELOG.md`)
- **v2.1.84:** "MCP tool descriptions and server instructions are now capped at 2KB to prevent OpenAPI-generated servers from bloating context." (the cap — bound, not opt-out)
- (earlier) "Added support for MCP server instructions" (the feature's introduction; explains why old/inverse bug #23808 existed)
- "Fixed prompt-cache bust when an MCP server with `instructions` connects after the first turn" (instructions are part of the cached prompt)
- `includeGitInstructions` / `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` (line ~1965/1672) — **the only instruction opt-out Anthropic shipped, and it is for the git block, not MCP.** Proves they add such toggles deliberately; none exists for MCP.
- **No entry after v2.1.84** adds any control to disable/opt-out of MCP server instructions. (Confidence: HIGH — grepped all `instruction` lines.)

### 8.2 Open issues / feature requests (PRIMARY, via `gh issue list`/`view`)
| Issue | State | Relevance |
|---|---|---|
| **#48680** "claude.ai marketplace MCP server instructions inject into context on every session regardless of Tool Search" | **OPEN** (stale, `area:mcp`, `perf:memory`) | The canonical bug = the gap. No fix/flag yet. |
| #23808 "MCP server instructions from initialize response are not passed to the model" | OPEN | The **inverse** complaint (instructions not injected) — historical/edge variance; means the field's plumbing has had bugs both directions. Note for completeness. |
| #44536 "Lazy context loading: extend the ToolSearch pattern to all context components" | OPEN | Broad request; would cover instructions but is not an instruction-specific opt-out. |
| #50133 "Session startup context overhead consumes ~20% of context window before first user message" | OPEN | Broad; lists MCP/skills/CLAUDE.md overhead. |
| #44731 "MCP instruction deltas fork subagent conversations, doubling execution cost" | CLOSED | Confirms instructions ride as `isMeta` deltas into subagents. |
| #50799 "billed for ~24M hidden input tokens/month … re-send MCP instructions, no UI disclosure or consent" | CLOSED | Confirms instructions are resident/billed and re-sent. |
| #57531 "Per-agent MCP server gating (subagents inherit full MCP context)" | CLOSED | Related gating request. |

**No issue requests a dedicated "suppress instructions, keep tools" flag and got it implemented.** The closest is #48680, still open. (Confidence: HIGH.)

---

## 9. Edge Cases (#7)

- **`alwaysLoad`:** no effect on instructions (tool-deferral only). HIGH.
- **Transport (stdio / SSE / HTTP / streamable-http):** no effect — `instructions` is read from the transport-agnostic `initialize` result. HIGH.
- **Plugin-provided servers:** inject instructions identically to user servers; lever is to disable the plugin. No plugin-only instruction opt-out. HIGH (docs) / HIGH (same bundle path).
- **claude.ai connectors:** their instructions are the most-cited offender (#48680); `ENABLE_CLAUDEAI_MCP_SERVERS=false` is the targeted lever. HIGH.
- **Auth method:** API-key/Bedrock/Vertex sessions never fetch claude.ai connectors at all (so no connector instructions), but you needn't switch auth — the env var does it without touching billing.

---

## 10. Sources (with confidence & primary/secondary)

### Primary — installed bundle (v2.1.153, SHA `6cfd211761f355dcebba152b66399d0416e445d2`)
All at `/Users/ryotamurakami/.local/share/claude/versions/2.1.153` (Mach-O; literals via `strings`). HIGH:
- Assembly conditional `filter((j)=>j.type==="connected") … for(let j of z) if(j.instructions) Y.set(j.name, "## "+name+"\n"+instructions)` (fn `VwK`). — §2, §6
- Reducer `case"mcp_instructions_delta"` → `G6({content, isMeta:!0})`; guard `if (K.length>0)`; getter `getMcpInstructionsDeltaAttachment` (`$vH`). — §2, §6
- 2KB cap `bXH=2048`; truncation `Server instructions truncated from ${w.length} to ${bXH} chars`; result `{type:"connected", …, instructions:j}`. — §6
- `getInstructions(){return this._instructions}`; `this._instructions=q.instructions` (from `initialize`); transport-agnostic. — §4, §6
- **Absence** of any instruction-suppress identifier; **presence** of `suppressNextSkillListing` (asymmetry); `alwaysLoad` (10) never co-located with `instruction`. — §1, §2, §6
- Settings keys present (counts in §6). — §6, §7
- `hits before assembly: NONE` (no env/setting read before the gate). — §2

### Primary — official docs (WebFetch, 2026-05-28)
- `code.claude.com/docs/en/mcp` — "Claude Code truncates tool descriptions and server instructions at 2KB each"; `ENABLE_CLAUDEAI_MCP_SERVERS=false`; Tool Search defers **tool definitions**; `alwaysLoad`; `permissions.deny: ["ToolSearch"]`; plugin servers "work identically"; scope precedence. HIGH.
- `code.claude.com/docs/en/settings` — `enabledMcpjsonServers` (approve), `disabledMcpjsonServers` (reject), `enableAllProjectMcpServers` (approve all), `allowedMcpServers`/`deniedMcpServers`/`allowManagedMcpServersOnly`/`allowAllClaudeAiMcps`, `permissions.deny` (`MCP(serverName)` patterns), `includeGitInstructions`. HIGH.
- `code.claude.com/docs/en/managed-mcp` — allow/deny "filter which configured servers are allowed to **load**"; blocked server "silently disappears"/"stops loading"; `managed-mcp.json` exclusive control; empty map disables MCP. HIGH.

### Primary — CHANGELOG (`gh api …/CHANGELOG.md`)
- v2.1.84 2KB cap; "Added support for MCP server instructions"; prompt-cache fix; `includeGitInstructions`. No post-v2.1.84 instruction opt-out. HIGH.

### Primary — GitHub issues (`gh issue list`/`view`)
- #48680 OPEN (the gap); #23808 OPEN (inverse); #44536/#50133 OPEN (broad); #44731/#50799/#57531 CLOSED (corroborate residency/subagent forking). HIGH.

### Primary — direct observation (this session)
- The active context contains `# MCP Server Instructions` with `## context7`, `## deepwiki`, `## serena`, `## supabase` blocks **with Tool Search on** → instructions resident and not suppressed by Tool Search. HIGH.

### Secondary
- Prior report `claudedocs/research_mcp-instructions-in-context_2026-05-28.md`; the article `src/app/articles/Cutting-Claude-Code-Initial-Context-Bloat/content.mdx`.

### Undocumented (bundle-only — may change)
- MCP-proxy `initialize`-rewrite pattern for third-party servers (§4.2). Inference from "instructions read only from `initialize`, no integrity check"; no first-party tooling. MEDIUM.

---

## 11. Open Questions / Not Verified
1. **Exact internal gate of `enabled/disabledMcpjsonServers`** (config-parse vs approval-gate). Documented outcome = server not used → no handshake → no instructions (HIGH); the precise code gate is not bundle-traced (MEDIUM-HIGH on internals).
2. **#23808 (inverse bug)** suggests some configs/versions/transports may drop instructions; whether any *current* config silently omits them was not reproduced. LOW residual.
3. **MCP-proxy pattern** not empirically built/tested here; feasibility is inferred from the read-only handshake, not demonstrated. MEDIUM.

---

### One-line answer
There is **no** first-party switch to drop an MCP server's instructions while keeping its tools (open gap #48680). Client-side, your only levers all **un-connect** the server (`claude mcp remove`, `disabledMcpjsonServers`, `--strict-mcp-config --mcp-config`, `ENABLE_CLAUDEAI_MCP_SERVERS=false`, enterprise allow/deny / `managed-mcp.json`, disabling a plugin) — which drops its tools too. The **only** "keep tools, drop instructions" path is **server-side**: return empty `instructions` from `initialize` (own server) or front a third-party server with an undocumented proxy that strips that field. `ENABLE_TOOL_SEARCH`, the 2KB cap, `permissions.deny`, and `alwaysLoad` do **not** suppress instructions.
