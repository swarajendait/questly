import { ipcMain as O, app as I, BrowserWindow as L } from "electron";
import { createRequire as W } from "node:module";
import { fileURLToPath as z } from "node:url";
import g from "node:path";
import G from "fs";
import H from "path";
import Q from "os";
import X from "crypto";
function Z(d) {
  return d && d.__esModule && Object.prototype.hasOwnProperty.call(d, "default") ? d.default : d;
}
var p = { exports: {} };
const ee = "16.6.1", te = {
  version: ee
};
var S;
function re() {
  if (S) return p.exports;
  S = 1;
  const d = G, h = H, E = Q, y = X, _ = te.version, D = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
  function m(e) {
    const r = {};
    let n = e.toString();
    n = n.replace(/\r\n?/mg, `
`);
    let a;
    for (; (a = D.exec(n)) != null; ) {
      const c = a[1];
      let t = a[2] || "";
      t = t.trim();
      const o = t[0];
      t = t.replace(/^(['"`])([\s\S]*)\1$/mg, "$2"), o === '"' && (t = t.replace(/\\n/g, `
`), t = t.replace(/\\r/g, "\r")), r[c] = t;
    }
    return r;
  }
  function C(e) {
    e = e || {};
    const r = k(e);
    e.path = r;
    const n = s.configDotenv(e);
    if (!n.parsed) {
      const o = new Error(`MISSING_DATA: Cannot parse ${r} for an unknown reason`);
      throw o.code = "MISSING_DATA", o;
    }
    const a = $(e).split(","), c = a.length;
    let t;
    for (let o = 0; o < c; o++)
      try {
        const i = a[o].trim(), f = U(n, i);
        t = s.decrypt(f.ciphertext, f.key);
        break;
      } catch (i) {
        if (o + 1 >= c)
          throw i;
      }
    return s.parse(t);
  }
  function K(e) {
    console.log(`[dotenv@${_}][WARN] ${e}`);
  }
  function b(e) {
    console.log(`[dotenv@${_}][DEBUG] ${e}`);
  }
  function V(e) {
    console.log(`[dotenv@${_}] ${e}`);
  }
  function $(e) {
    return e && e.DOTENV_KEY && e.DOTENV_KEY.length > 0 ? e.DOTENV_KEY : process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0 ? process.env.DOTENV_KEY : "";
  }
  function U(e, r) {
    let n;
    try {
      n = new URL(r);
    } catch (i) {
      if (i.code === "ERR_INVALID_URL") {
        const f = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
        throw f.code = "INVALID_DOTENV_KEY", f;
      }
      throw i;
    }
    const a = n.password;
    if (!a) {
      const i = new Error("INVALID_DOTENV_KEY: Missing key part");
      throw i.code = "INVALID_DOTENV_KEY", i;
    }
    const c = n.searchParams.get("environment");
    if (!c) {
      const i = new Error("INVALID_DOTENV_KEY: Missing environment part");
      throw i.code = "INVALID_DOTENV_KEY", i;
    }
    const t = `DOTENV_VAULT_${c.toUpperCase()}`, o = e.parsed[t];
    if (!o) {
      const i = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${t} in your .env.vault file.`);
      throw i.code = "NOT_FOUND_DOTENV_ENVIRONMENT", i;
    }
    return { ciphertext: o, key: a };
  }
  function k(e) {
    let r = null;
    if (e && e.path && e.path.length > 0)
      if (Array.isArray(e.path))
        for (const n of e.path)
          d.existsSync(n) && (r = n.endsWith(".vault") ? n : `${n}.vault`);
      else
        r = e.path.endsWith(".vault") ? e.path : `${e.path}.vault`;
    else
      r = h.resolve(process.cwd(), ".env.vault");
    return d.existsSync(r) ? r : null;
  }
  function R(e) {
    return e[0] === "~" ? h.join(E.homedir(), e.slice(1)) : e;
  }
  function M(e) {
    const r = !!(e && e.debug), n = e && "quiet" in e ? e.quiet : !0;
    (r || !n) && V("Loading env from encrypted .env.vault");
    const a = s._parseVault(e);
    let c = process.env;
    return e && e.processEnv != null && (c = e.processEnv), s.populate(c, a, e), { parsed: a };
  }
  function F(e) {
    const r = h.resolve(process.cwd(), ".env");
    let n = "utf8";
    const a = !!(e && e.debug), c = e && "quiet" in e ? e.quiet : !0;
    e && e.encoding ? n = e.encoding : a && b("No encoding is specified. UTF-8 is used by default");
    let t = [r];
    if (e && e.path)
      if (!Array.isArray(e.path))
        t = [R(e.path)];
      else {
        t = [];
        for (const v of e.path)
          t.push(R(v));
      }
    let o;
    const i = {};
    for (const v of t)
      try {
        const l = s.parse(d.readFileSync(v, { encoding: n }));
        s.populate(i, l, e);
      } catch (l) {
        a && b(`Failed to load ${v} ${l.message}`), o = l;
      }
    let f = process.env;
    if (e && e.processEnv != null && (f = e.processEnv), s.populate(f, i, e), a || !c) {
      const v = Object.keys(i).length, l = [];
      for (const x of t)
        try {
          const T = h.relative(process.cwd(), x);
          l.push(T);
        } catch (T) {
          a && b(`Failed to load ${x} ${T.message}`), o = T;
        }
      V(`injecting env (${v}) from ${l.join(",")}`);
    }
    return o ? { parsed: i, error: o } : { parsed: i };
  }
  function q(e) {
    if ($(e).length === 0)
      return s.configDotenv(e);
    const r = k(e);
    return r ? s._configVault(e) : (K(`You set DOTENV_KEY but you are missing a .env.vault file at ${r}. Did you forget to build it?`), s.configDotenv(e));
  }
  function B(e, r) {
    const n = Buffer.from(r.slice(-64), "hex");
    let a = Buffer.from(e, "base64");
    const c = a.subarray(0, 12), t = a.subarray(-16);
    a = a.subarray(12, -16);
    try {
      const o = y.createDecipheriv("aes-256-gcm", n, c);
      return o.setAuthTag(t), `${o.update(a)}${o.final()}`;
    } catch (o) {
      const i = o instanceof RangeError, f = o.message === "Invalid key length", v = o.message === "Unsupported state or unable to authenticate data";
      if (i || f) {
        const l = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
        throw l.code = "INVALID_DOTENV_KEY", l;
      } else if (v) {
        const l = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
        throw l.code = "DECRYPTION_FAILED", l;
      } else
        throw o;
    }
  }
  function J(e, r, n = {}) {
    const a = !!(n && n.debug), c = !!(n && n.override);
    if (typeof r != "object") {
      const t = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
      throw t.code = "OBJECT_REQUIRED", t;
    }
    for (const t of Object.keys(r))
      Object.prototype.hasOwnProperty.call(e, t) ? (c === !0 && (e[t] = r[t]), a && b(c === !0 ? `"${t}" is already defined and WAS overwritten` : `"${t}" is already defined and was NOT overwritten`)) : e[t] = r[t];
  }
  const s = {
    configDotenv: F,
    _configVault: M,
    _parseVault: C,
    config: q,
    decrypt: B,
    parse: m,
    populate: J
  };
  return p.exports.configDotenv = s.configDotenv, p.exports._configVault = s._configVault, p.exports._parseVault = s._parseVault, p.exports.config = s.config, p.exports.decrypt = s.decrypt, p.exports.parse = s.parse, p.exports.populate = s.populate, p.exports = s, p.exports;
}
var ne = re();
const oe = /* @__PURE__ */ Z(ne);
W(import.meta.url);
const Y = g.dirname(z(import.meta.url)), N = g.join(Y, "..");
oe.config({ path: g.join(N, ".env") });
const A = process.env.VITE_DEV_SERVER_URL, fe = g.join(N, "dist-electron"), P = g.join(N, "dist");
process.env.VITE_PUBLIC = A ? g.join(N, "public") : P;
let w;
function j() {
  w = new L({
    width: 450,
    height: 700,
    resizable: !1,
    frame: !1,
    icon: g.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: g.join(Y, "preload.mjs")
    }
  }), A ? w.loadURL(A) : w.loadFile(g.join(P, "index.html"));
}
O.handle("generate-categories", async (d, h) => {
  console.log(`Forced-Variety AI generating challenges for: ${h}`);
  const E = process.env.TOGETHER_API_KEY;
  if (!E) throw new Error("TOGETHER_API_KEY is not configured.");
  const y = `
    You are the Quest Master, a creative AI for an app that provides short, 5-minute desk challenges to help users beat doomscrolling.

    Based on the user's interest in "${h}", generate 4 unique micro-challenges.

    **CRITICAL RULES:**
    1.  **FORCE DIVERSITY:** You MUST provide a mix of challenge types. Your response should include AT LEAST ONE of each of the following domains:
        * **Analytical/Logical:** A small puzzle, a pattern, a list based on logic.
        * **Creative/Imaginative:** Inventing a name, a slogan, a micro-story, a "what if" scenario.
        * **Observational/Sensory:** A task requiring the user to notice something in their immediate environment ("look around your room...").
    2.  All challenges MUST be text-based and completable in under 5 minutes at a desk.
    3.  Each challenge must have a "title" (catchy, two-words) and a "description" (the direct command to the user).
    4.  Example for interest "science":
        [
          { "title": "Alien Logic", "description": "(Analytical) An alien lands and only understands 'if/then' statements. Write one to explain gravity." },
          { "title": "Planet Pitch", "description": "(Creative) Invent a name and a one-sentence slogan for a new, habitable planet." },
          { "title": "Desk Geology", "description": "(Observational) Find the oldest object on your desk. In one sentence, describe what it might have experienced." }
        ]

    You MUST respond ONLY with a valid JSON array of objects.
  `;
  try {
    const u = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${E}` },
      body: JSON.stringify({
        model: "meta-llama/Llama-3-8b-chat-hf",
        messages: [{ role: "user", content: y }],
        max_tokens: 500,
        temperature: 1.1
      })
    });
    if (!u.ok) throw new Error(`API Error: ${await u.text()}`);
    const m = (await u.json()).choices[0].message.content.match(/\[(.|\n)*\]/);
    if (m && m[0]) return JSON.parse(m[0]);
    throw new Error("AI did not return a valid JSON array of objects.");
  } catch (u) {
    return console.error("Failed to generate challenges:", u), [
      { title: "Three Things", description: "(Observational) List three things in your room that are the same color." },
      { title: "New Word", description: "(Creative) Invent a new word for the feeling of finishing a difficult task." },
      { title: "Simple Rule", description: "(Analytical) If a day had 25 hours instead of 24, what is the first rule you would make for the extra hour?" },
      { title: "Object Story", description: "(Creative) Write a 6-word story about the object to your left." }
    ];
  }
});
O.handle("evaluate-submission", async (d, h) => {
  console.log(`Perceptive AI evaluating submission for: "${h.challenge}"`);
  const E = process.env.TOGETHER_API_KEY;
  if (!E) throw new Error("TOGETHER_API_KEY is not configured.");
  const y = `
    You are a wise and perceptive guide for the app Questly. Your goal is to make the user feel clever by rewarding their effort with an interesting piece of information.
    The original challenge was: "${h.challenge}"
    The user's submission is: "${h.submission}"
    **CRITICAL RULES:**
    1. Create an insightful, two-word "title" for the feedback. Examples: "Intriguing Perspective.", "Clever Connection.", "A Bold Idea."
    2. The "feedback_text" MUST have two parts:
        - First, start with a specific compliment about their submission.
        - Second, seamlessly transition into an interesting, little-known fun fact that is directly related to their answer or the challenge topic.
    3. Example Interaction:
        - Challenge: "Describe the color 'blue' to someone who has never seen it."
        - Submission: "It's the feeling of a cool breeze on a hot day."
        - Your JSON Response: { "title": "Poetic Sense.", "feedback_text": "That's a beautiful, sensory way to describe it! Fun fact: The ancient Greeks didn't have a word for the color blue, and in texts like The Odyssey, the sea is described as 'wine-dark'." }
    You MUST respond ONLY with a valid JSON object with this exact structure:
    {
      "title": "An insightful, two-word title.",
      "feedback_text": "A single block of text containing the compliment and the fun fact."
    }
  `;
  try {
    const u = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${E}` },
      body: JSON.stringify({
        model: "meta-llama/Llama-3-8b-chat-hf",
        messages: [{ role: "user", content: y }],
        max_tokens: 250,
        temperature: 0.85
      })
    });
    if (!u.ok) throw new Error(`API Error: ${await u.text()}`);
    const m = (await u.json()).choices[0].message.content.match(/\{(.|\n)*\}/);
    if (m && m[0]) return JSON.parse(m[0]);
    throw new Error("AI did not return valid JSON for evaluation.");
  } catch (u) {
    return console.error("Failed to evaluate submission:", u), { title: "Solid Effort.", feedback_text: "You've captured the idea well. Fun fact: The word 'fact' comes from the Latin word 'factum', meaning 'a thing done'." };
  }
});
O.on("minimize-window", () => {
  w && w.minimize();
});
O.on("close-window", () => {
  w && w.close();
});
I.on("window-all-closed", () => {
  process.platform !== "darwin" && I.quit();
});
I.on("activate", () => {
  L.getAllWindows().length === 0 && j();
});
I.whenReady().then(j);
export {
  fe as MAIN_DIST,
  P as RENDERER_DIST,
  A as VITE_DEV_SERVER_URL
};
