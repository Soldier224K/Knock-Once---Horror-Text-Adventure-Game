<!-- ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ -->
<!-- If you are reading this, you already made a mistake.                  -->
<!-- You should have ignored the knocking.                                 -->
<!-- ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ -->

<div align="center">

```
                                          ██╗  ██╗███╗   ██╗ ██████╗  ██████╗██╗  ██╗
                                          ██║ ██╔╝████╗  ██║██╔═══██╗██╔════╝██║ ██╔╝
                                          █████╔╝ ██╔██╗ ██║██║   ██║██║     █████╔╝ 
                                          ██╔═██╗ ██║╚██╗██║██║   ██║██║     ██╔═██╗ 
                                          ██║  ██╗██║ ╚████║╚██████╔╝╚██████╗██║  ██╗
                                          ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝

                                               ██████╗ ███╗   ██╗ ██████╗███████╗
                                               ██╔═══██╗████╗  ██║██╔════╝██╔════╝
                                               ██║   ██║██╔██╗ ██║██║     █████╗  
                                               ██║   ██║██║╚██╗██║██║     ██╔══╝  
                                               ╚██████╔╝██║ ╚████║╚██████╗███████╗
                                                ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝╚══════╝
```

**A horror text adventure. One apartment. One night.**  
**Three knocks. Wrong choices.**

<br>

[![Live](https://img.shields.io/badge/▶_PLAY_NOW-E8002A?style=for-the-badge&logoColor=white)](https://knock-once-horror-text-adventure-ga.vercel.app/)
![Version](https://img.shields.io/badge/VERSION-3.0-1a0a0d?style=for-the-badge)
![Stack](https://img.shields.io/badge/HTML_·_CSS_·_JS-no_framework-333?style=for-the-badge)
![Endings](https://img.shields.io/badge/9_ENDINGS-4_good_·_5_bad-800010?style=for-the-badge)

<br>

> *It is 11:00 PM on a Tuesday.*  
> *Third floor. Lift broken since January.*  
> *You are making chai.*  
> *Then — three knocks.*  
> *Precise. Patient.*  
> *Each separated by exactly the same interval.*

<br>

</div>

---

## ❯ WHAT IS THIS

**KNOCK ONCE** is a browser-based horror text adventure game built entirely with HTML-5, CSS3, and Vanilla JavaScript — no framework, no engine, no server. Just the browser stack and bad decisions.

You play as yourself. You enter your real name. The game uses it.

Four chapters. Forty-plus story nodes. Every choice shifts two hidden statistics — **Dread** and **Safety** — that you cannot see in real time. You have **30 seconds** per decision. The timer does not care about you.

There are **nine ways this ends.**  
Most of them are not good.

---

## ❯ SCREENSHOTS

<div align="center">

| | |
|:---:|:---:|
| ![Landing screen — KNOCK ONCE title with name input](https://github.com/user-attachments/assets/landing) | ![Tarot card choice screen with 30s timer](https://github.com/user-attachments/assets/choices) |
| *You enter your name. It will be used against you.* | *You have 30 seconds. The cards are waiting.* |
| ![Consequence screen — Watchman Kiran](https://github.com/user-attachments/assets/consequence) | ![Game screen — Chapter II 11:12 PM typewriter](https://github.com/user-attachments/assets/game) |
| *Something climbed up.* | *The story types itself. Character by character.* |
| ![Chapter splash — evil eye background, YOU FEEL NORMAL](https://github.com/user-attachments/assets/chapter) | ![Leaderboard — THE ARCHIVE, Raj Rasal SURVIVED 291](https://github.com/user-attachments/assets/archive) |
| *Chapter I. You feel normal. That changes.* | *THE ARCHIVE. Your record lives here. Permanently.* |

</div>

> **To add screenshots:** replace the placeholder asset URLs above with your actual uploaded image URLs from GitHub after pushing this repo.  
> Path: `docs/screenshots/` → drag images into the GitHub UI → copy the CDN links → paste above.

---

## ❯ THE GAME AT A GLANCE

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   LOCATION   Third-floor apartment, Shivaji Nagar, Mumbai       │
│   TIME       11:00 PM — 12:20 AM                                │
│   CHAPTERS   4                                                  │
│   NODES      40+                                                │
│   ENDINGS    9  (4 survival · 5 bad)                            │
│   TIMER      30 seconds per choice                              │
│   STATS      Dread 0–100  ·  Safety 0–100  (hidden)             │
│   AUDIO      4 tracks · randomised · loops forever              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## ❯ ENDINGS

The story branches. These are the nine ways it resolves.

| VERDICT | ID | HOW |
|---|---|---|
| `SURVIVED` | end_police_survived | Called police. Cooperated fully. |
| `ESCAPED` | end_escape_survived | Fled the building in time. |
| `EVIDENCE FILED` | end_evidence_survived | Documented everything. Gave statement. |
| `CAUGHT HER` | end_caught | Identified the entity. Evidence submitted. |
| `TAKEN` | end_door_bad | You opened the door. |
| `TAKEN` | end_freeze_bad | You froze in the stairwell. |
| `TAKEN` | end_inside_bad | You went into the bathroom. |
| `CONSUMED` | end_touch_bad | You touched the handprint. |
| `TAKEN` | end_phone_bad | You answered the call from inside the flat. |

> Zero dead-end nodes. Every `next:` reference validated. Every path resolves.

---

## ❯ HOW IT WORKS

### The State Machine
Everything lives in one object. No database. No server. No magic.

```javascript
let G = {
  name:        "Subject",   // replaced with your actual name
  dread:       10,          // goes up. always goes up.
  safety:      50,          // easier to lose than gain
  node:        "start",     // where you are in the story
  timerEnd:    0,           // performance.now() — the clock is running
  audioOn:     false        // the sounds are worse than silence
};
```

### The Typewriter
Story text renders character by character. The delay is punctuation-aware.

```javascript
const delay = ch === '.'  ? 70   // breath.
            : ch === ','  ? 38   // hesitation,
            :               22;  // everything else
```

Your name is injected before the loop starts.  
So when she says it through the door — it types out as yours.

### The Timer
`requestAnimationFrame` loop. Two bars drain toward the centre from opposite sides. At ≤10 seconds they turn red. On zero — `choices[0]` is selected automatically. That is the panic mechanic. It is intentional.

### The Audio
```
Track 1:  sfx-knock.mp3    ← always first. the door knock is a narrative beat.
Track 2:  sfx-ambient.mp3  ← shuffled
Track 3:  sfx-pad.mp3      ← shuffled  
Track 4:  sfx-scream.mp3   ← shuffled · volume 0.5
```
Fisher-Yates shuffle on tracks 2–4. `onended` advances the index. Full cycle triggers re-shuffle. Loops until you return to the landing screen.

### The Cards
No image files. Every tarot card is built in JavaScript.

```
eyeSVG() constructs:
  ├── almond eye    two quadratic-bezier arcs
  ├── hexagon ring  six vertices at radius 52
  ├── 18 spokes     inner r:14 → outer r:42
  └── pupil         concentric circles + crosshair
```

---

## ❯ FILE STRUCTURE

```
knock-once/
│
├── index.html        ← 7 screen divs · 4 audio elements · the whole game
├── style.css         ← ~920 lines · crimson on black · it knows what it is
├── script.js         ← ~1,230 lines · 40+ nodes · full engine · audio · SVG
├── evil-eye.png      ← chapter splash background
├── sfx-knock.mp3     ← plays first. every time.
├── sfx-ambient.mp3
├── sfx-pad.mp3
└── sfx-scream.mp3
```

No `node_modules`. No `package.json`. No build step.  
Open `index.html`. That is the entire installation process.

---

## ❯ RUN LOCALLY

```bash
git clone https://github.com/YOUR_USERNAME/knock-once.git
cd knock-once
open index.html
```

Or use any static server:

```bash
npx serve .
# → http://localhost:3000
```

No dependencies to install. It runs in any modern browser.

---

## ❯ DESIGN SYSTEM

```css
:root {
  --red:        #E8002A;   /* the only colour that matters */
  --surface:    #080507;   /* near-black. not quite black. */
  --cinzel:     'Cinzel';  /* headings · roman numerals · stamps */
  --garamond:   'EB Garamond'; /* all story prose · italic · slow */
  --mono:       'Space Mono';  /* HUD · timer · badges · clinical */
}
```

Seven screens. One `showScreen()` function. Everything else is state.

---

## ❯ SCREENS

```
screen-landing      → title · name input · archive button
screen-chapter      → evil-eye image · chapter number · YOU FEEL ___
screen-game         → DREAD ████ · SAFETY ████ · typewriter prose
screen-choices      → 00:30 ●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━● · three cards
screen-consequence  → THE OUTCOME ◆────────────────────◆ YOU SELECTED…
screen-ending       → [ CASE CLOSED ] · SURVIVED / TAKEN / CONSUMED
screen-leaderboard  → THE ARCHIVE · your record · permanently
```

---

## ❯ THE PERSONALISATION SYSTEM

You enter your first name and last name on the landing screen.  
They are joined: `G.name = first + " " + last`

Every story node passes through:
```javascript
text.replace(/\[NAME\]/g, G.name)
```

When the stranger on the other side of the door speaks —  
she says your name.  
The full name you just typed.  
Character by character.

This is not a trick. It is just a string replacement.  
It works anyway.

---

## ❯ BUILT FOR

```
ITM Skills University
School of Future Tech
B.Tech CSE 2025-29 · Semester II
Problem Statement #142 — Horror Text Adventure Game
Industry: Interactive Storytelling / Casual Gaming
```

---

## ❯ CREDITS

**Created by** — [Raj Bharat Rasal](https://github.com/YOUR_USERNAME)  
**Inspired by** — [scope-creep.xyz](https://scope-creep.xyz/play) by Wondermake  
**Fonts** — Cinzel · EB Garamond · Space Mono via Google Fonts  
**Audio** — Freesound Community (CC licensed)  

---

## ❯ LICENSE

`MIT` — Use it. Break it. Make it worse. Make it scarier.  
If you build something with this, leave the knocking in.

---

<div align="center">

```
· · ·
```

*She knew you were there.*  
*You didn't make a sound.*  
*You didn't move.*  
*But she tilted her head up*  
*and looked directly into the peephole.*

```
· · ·
```

**[▶ PLAY KNOCK ONCE](https://knock-once-horror-text-adventure-ga.vercel.app/)**

```
v3.0 · no framework · no server · no way out
```

</div>

<!-- ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ -->
<!-- You reached the end of the README.                                    -->
<!-- There are no more files in this directory.                            -->
<!-- The knocking has stopped.                                             -->
<!-- ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ -->
