Lost & Found Chatbot — Vanilla HTML/CSS/JS

Files:
- index.html — Chatbot page (for direct use or iframe embedding)
- styles.css — Clean, school-friendly styles with rounded bubbles and animations
- chat.js — Sequential question flow and POST to Google Apps Script endpoint
- widget.js — Floating chat widget that toggles an iframe pointing to index.html

Google Apps Script Endpoint (kept exactly as provided):
https://script.google.com/macros/s/AKfycbwI2i_ztnD-Rq_JsvHSWZxDIHCQulwwAMvqumSXqbpphLM3GKRdUSu53hTHtkVRRyT8hg/exec

JSON payload:
{
  "name": "[user response]",
  "item": "[user response]",
  "location": "[user response]",
  "contact": "[user response]",
  "details": "[user response]"
}

Embed Options:

1) Iframe Embedding
- Host these files, then embed the chatbot with:

<iframe src="/path/to/index.html" title="TraceBack — Lost & Found" style="width:100%;max-width:520px;height:620px;border:0;border-radius:18px;box-shadow:0 10px 30px rgba(17,24,39,0.08)"></iframe>

Notes:
- Adjust src to your hosted path.
- The chatbot manages its own UI and transitions.

2) Floating Chat Widget
- Add the following to any page that includes the files:

<link rel="preload" href="/path/to/index.html" as="document">
<script src="/path/to/widget.js"></script>

- The widget injects a bottom-right toggle button and a floating iframe.
- If your index.html is not in the same directory, update IFRAME_SRC in widget.js accordingly.

Customization:
- Colors and rounded bubble styles are in styles.css.
- Avatar: place your logo at `assets/traceback.png` (PNG recommended). The header and chat bubbles will use it automatically. If the file is missing, the header image hides gracefully.
- For sizing the floating widget, edit CSS in widget.js (#lost-found-chat-widget rule).

Behavior:
- Asks these questions sequentially:
  1) What's your name?
  2) What did you lose?
  3) Where did you lose it?
  4) How can we contact you?
  5) Any extra details?
- Shows user responses in conversation bubbles with typing indicator and smooth animations.
- Posts JSON to your Google Apps Script Web App using a simple POST without headers:
  fetch(ENDPOINT, { method: 'POST', body: JSON.stringify(payload) })
- Displays: "✅ Thank you! Your response has been recorded." after completion.
- Footer includes live status: "Connected to [ENDPOINT] — Last response: ok/error".

Troubleshooting:
- If the endpoint returns an access error, confirm your Google Apps Script deployment allows anonymous access and CORS for POST requests.
- Network issues are surfaced in the console; the UI falls back gracefully.

Hosting on Vercel:
- This is a plain static site. Deploy it with zero-config.
- Steps:
  1) Push this folder to a GitHub repo.
  2) In Vercel, New Project → Import Repo → Framework Preset: Other.
  3) Override settings:
     - Build Command: (leave blank)
     - Output Directory: `.` (a single dot, root)
     - Root Directory: repo root (where `index.html` lives)
  4) Click Deploy. Your site will be available at `https://YOUR-PROJECT.vercel.app/`.
- Favicon: uses `assets/traceback-removebg-preview.ico` with PNG fallback.
- Widget embedding:
  - If you embed the widget into another site, set `IFRAME_SRC` in `widget.js` to the deployed absolute URL, e.g. `https://YOUR-PROJECT.vercel.app/index.html`.

Firebase/Firestore on Vercel:
- If you use Firestore, ensure your rules permit anonymous create or integrate App Check.
- If App Check is enforced, add reCAPTCHA v3 (web) and include the site key, or temporarily disable enforcement during testing.
- Update any hardcoded origins in your rules to include your Vercel domain.