// electron/main.ts
import { app, BrowserWindow, ipcMain } from 'electron';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import dotenv from 'dotenv';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_ROOT = path.join(__dirname, '..');

dotenv.config({ path: path.join(APP_ROOT, '.env') });

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(APP_ROOT, 'public') : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    width: 450,
    height: 700,
    resizable: false,
    frame: false,
    icon: path.join(process.env.VITE_PUBLIC!, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }
}

// --- IPC HANDLERS ---

// In electron/main.ts

ipcMain.handle('generate-categories', async (event, interest: string) => {
  console.log(`Forced-Variety AI generating challenges for: ${interest}`);
  const apiKey = process.env.TOGETHER_API_KEY;
  if (!apiKey) throw new Error("TOGETHER_API_KEY is not configured.");

  //-- THIS PROMPT FORCES THE AI TO BE MORE DIVERSE --//
  const prompt = `
    You are the Quest Master, a creative AI for an app that provides short, 5-minute desk challenges to help users beat doomscrolling.

    Based on the user's interest in "${interest}", generate 4 unique micro-challenges.

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
    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'meta-llama/Llama-3-8b-chat-hf',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 1.1,
      }),
    });
    if (!response.ok) throw new Error(`API Error: ${await response.text()}`);
    const data = await response.json();
    const content = data.choices[0].message.content;
    const jsonMatch = content.match(/\[(.|\n)*\]/);
    if (jsonMatch && jsonMatch[0]) return JSON.parse(jsonMatch[0]);
    throw new Error("AI did not return a valid JSON array of objects.");
  } catch (e) {
    console.error("Failed to generate challenges:", e);
    // A diverse fallback list
    return [
      { "title": "Three Things", "description": "(Observational) List three things in your room that are the same color." },
      { "title": "New Word", "description": "(Creative) Invent a new word for the feeling of finishing a difficult task." },
      { "title": "Simple Rule", "description": "(Analytical) If a day had 25 hours instead of 24, what is the first rule you would make for the extra hour?" },
      { "title": "Object Story", "description": "(Creative) Write a 6-word story about the object to your left." }
    ];
  }
});

ipcMain.handle('evaluate-submission', async (event, args: { challenge: string; submission: string }) => {
  console.log(`Perceptive AI evaluating submission for: "${args.challenge}"`);
  const apiKey = process.env.TOGETHER_API_KEY;
  if (!apiKey) throw new Error("TOGETHER_API_KEY is not configured.");

  const prompt = `
    You are a wise and perceptive guide for the app Questly. Your goal is to make the user feel clever by rewarding their effort with an interesting piece of information.
    The original challenge was: "${args.challenge}"
    The user's submission is: "${args.submission}"
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
    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'meta-llama/Llama-3-8b-chat-hf',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 250,
        temperature: 0.85,
      }),
    });
    if (!response.ok) throw new Error(`API Error: ${await response.text()}`);
    const data = await response.json();
    const content = data.choices[0].message.content;
    const jsonMatch = content.match(/\{(.|\n)*\}/);
    if (jsonMatch && jsonMatch[0]) return JSON.parse(jsonMatch[0]);
    throw new Error("AI did not return valid JSON for evaluation.");
  } catch (e) {
    console.error("Failed to evaluate submission:", e);
    return { title: "Solid Effort.", feedback_text: "You've captured the idea well. Fun fact: The word 'fact' comes from the Latin word 'factum', meaning 'a thing done'." };
  }
});

ipcMain.on('minimize-window', () => {
  if (win) win.minimize();
});

ipcMain.on('close-window', () => {
  if (win) win.close();
});

// --- App Lifecycle ---
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.whenReady().then(createWindow);