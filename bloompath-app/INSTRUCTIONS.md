# BloomPath Health — Patient App: Claude Code Kickoff Brief

## What This Is

BloomPath Health is a pediatric weight management telehealth platform. This repo contains the **patient-facing mobile web app** — the tool families use day-to-day between clinical sessions.

The app is designed for children and adolescents (ages 6–17) and their parents, and should feel engaging, warm, and non-shaming. Think Duolingo for pediatric health — gamified, family-centered, and clinically credible.

---

## Mockup Files (Start Here)

All four mockup files are in this folder. **Read them before writing any code.** They are fully functional React components with all design decisions already made — colors, spacing, component structure, interactions, and copy.

| File | What it contains |
|------|-----------------|
| `bloompath-dashboard-mockup.jsx` | Main app shell: Home, Journey, Goals, Diet (Traffic Light Tracker with food logging), and Team screens with bottom nav |
| `bloompath-lesson-mockup.jsx` | Session/lesson experience: Journey Map, Active Lesson flow (5 steps), Completion screen |
| `bloompath-onboarding-mockup.jsx` | 13-screen onboarding wizard: parent account, child profile, health flags, care team, facial scan baseline |
| `bloompath-smartgoals-mockup.jsx` | 7-screen SMART goal-setting flow: RD-suggested goals, frequency/confidence customization, weekly check-in |

---

## Tech Stack

- **Framework:** React (web app, not React Native — we'll ship as a mobile PWA first)
- **Routing:** React Router v6
- **Styling:** Inline styles only (no CSS files, no Tailwind) — the mockups already use this pattern, keep it consistent
- **State:** React `useState` / `useReducer` for now; add Zustand when global state gets complex
- **Storage:** `localStorage` for session persistence during development; swap for real backend later
- **No UI libraries** — the design system is fully custom (see below)

---

## Design System

All colors are defined in a `C` object at the top of every mockup file. Extract this into `src/theme.js` as the single source of truth.

```js
// src/theme.js
export const C = {
  coral:       '#FF8C76',   // Primary CTA buttons
  coralLight:  '#FFF0ED',
  coralDark:   '#D96B57',
  teal:        '#005F73',   // Headings, nav, links
  tealLight:   '#E6F2F5',
  tealDark:    '#003E4D',
  green:       '#94D2BD',   // Success, progress, Go Foods
  greenLight:  '#EAF6F2',
  greenDark:   '#2D7A3E',
  yellow:      '#E9D8A6',   // Accents, Slow Foods
  yellowLight: '#FDF9EE',
  cream:       '#FDFBF7',   // Page background
  slate:       '#2B2D42',   // Body text
  gray:        '#8A8D9F',   // Secondary text
  grayLight:   '#F3F3F6',   // Disabled states, dividers
  white:       '#FFFFFF',
  rose:        '#D66F6F',   // Errors, Whoa Foods
  purple:      '#6B4FA0',   // Behavioral coach accent
  purpleLight: '#F0ECFA',
  bg:          '#0F1923',   // Dark outer background (dev only)
};
```

**Typography:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` — system font stack, no imports needed.

**Phone frame:** The mockups render inside a 390×780px frame. In production the app should be full-screen on mobile. Remove the outer frame wrapper when building the real app.

---

## Component Architecture

Extract these shared components from the mockups into `src/components/`:

| Component | File | Notes |
|-----------|------|-------|
| `StatusBar` | `StatusBar.jsx` | Top system bar — can be removed in PWA fullscreen mode |
| `BottomNav` | `BottomNav.jsx` | 5-tab nav: Home, Journey, Goals, Diet, Team. Accepts `active` prop |
| `SectionHeader` | `SectionHeader.jsx` | Label + optional action link |
| `WeekRings` | `WeekRings.jsx` | 7-circle M–S day tracker, takes `days` array of `true/false/null` |
| `ScanLine` | `ScanLine.jsx` | Animated scan line for camera/barcode UIs |
| `ConfirmCard` | `ConfirmCard.jsx` | Food confirmation card shared across all log modes |

---

## Screen Architecture

```
src/
  screens/
    HomeScreen.jsx
    JourneyScreen.jsx
    GoalsScreen.jsx
    DietScreen.jsx
    TeamScreen.jsx
    onboarding/
      OnboardingFlow.jsx       ← orchestrates all 13 onboarding steps
      steps/                   ← one file per step
    lesson/
      LessonFlow.jsx
      steps/
    goals/
      GoalSettingFlow.jsx
      steps/
  components/                  ← shared components listed above
  theme.js                     ← color system
  App.jsx                      ← router root
  index.js
```

---

## Routing

Use React Router v6. Suggested route structure:

```
/                    → redirect to /onboarding if no session, else /home
/onboarding          → OnboardingFlow (fullscreen, no bottom nav)
/home                → HomeScreen
/journey             → JourneyScreen
/journey/:sessionId  → LessonFlow (fullscreen, no bottom nav)
/goals               → GoalsScreen
/goals/set           → GoalSettingFlow (fullscreen, no bottom nav)
/diet                → DietScreen
/team                → TeamScreen
```

---

## PWA Setup

This app should be installable on iPhone and Android. After the initial build:

1. Add a `public/manifest.json` with app name, icons, and `"display": "standalone"`
2. Add a service worker (use Workbox via `create-react-app`'s built-in support)
3. Set viewport meta: `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`
4. Handle iPhone safe areas with `env(safe-area-inset-bottom)` on the bottom nav

---

## Demo Data

Each mockup has a `DEMO` object at the top with realistic placeholder data (Maya, age 13, care team, goals, etc.). During development, keep this in a `src/mockData.js` file. Replace with real API calls later.

---

## First Tasks (Do These in Order)

1. **Scaffold the project** — `npx create-react-app bloompath-app`, install `react-router-dom`
2. **Extract `theme.js`** — pull the `C` color object out of the mockups into a single file
3. **Build `BottomNav` and basic routing** — wire up the 5 main screens with working tab navigation
4. **Port `HomeScreen`** — extract from `bloompath-dashboard-mockup.jsx`, connect to router
5. **Port `DietScreen`** — highest-value screen; food logging with all 4 input methods (type/camera/gallery/barcode)
6. **Port `GoalsScreen`** — weekly day-tracker with interactive check-ins
7. **Port `JourneyScreen`** — session path with locked/active/done states
8. **Port `TeamScreen`** — care team cards and messages
9. **Port `OnboardingFlow`** — 13-step wizard, should only show on first launch
10. **Port `LessonFlow`** — session experience with 5-step lesson content
11. **Port `GoalSettingFlow`** — SMART goal wizard
12. **PWA config** — manifest, service worker, safe areas

---

## Important Clinical/Design Constraints

- **No "traffic light" moralization** — the diet tracker uses Go/Slow/Whoa language, not Good/Bad/Forbidden. Never add red X marks or shame-based copy.
- **No calorie counting UI** — BloomPath is not a calorie tracker. The barcode scan shows calories as informational only, not as a target.
- **Family-first framing** — goals and sessions involve both the child and parent. Copy should address "you and your family," not just the child.
- **Streak = encouragement, not guilt** — if a streak breaks, the UI should be warm and encouraging, not punishing.
- **HIPAA context** — any real user data (goals, logs, session notes) must eventually be stored in a HIPAA-compliant backend. Flag anything that touches health data with a `// TODO: HIPAA` comment during development.

---

## BMI Scan Integration (face-to-bmi-vit)

### What It Is

There is a working BMI estimation model at `../face-to-bmi-vit/` (one level up from this app folder). It is a Python/PyTorch project that uses a **Vision Transformer (ViT-H/14)** backbone with a custom 5-layer regression head (`BMIHead`) to predict BMI from a single face photo. It achieves a MAE of ~3.02 on its test set.

**Key files:**
```
../face-to-bmi-vit/
  scripts/
    demo.py      ← runs inference on a single image, returns BMI float
    models.py    ← defines get_model() and BMIHead
    loader.py    ← defines vit_transforms (image preprocessing)
  data/
    test_pic.jpg ← sample face image for testing
  environment_mac.yml   ← conda env for Mac
  environment_linux.yml ← conda env for Linux
```

**How inference works (from demo.py):**
1. Load image → convert to RGB → apply `vit_transforms` (ViT-H/14 input format)
2. Load `get_model()` (ViT-H/14 with frozen backbone + custom BMIHead)
3. Load weights from `../weights/aug_epoch_7.pt` (auto-downloaded from S3 on first run)
4. Run `model(image)` → returns a single float (the predicted BMI)

---

### Step 1 — Wrap the Model in a FastAPI Server

Create a file at `../face-to-bmi-vit/scripts/api.py`:

```python
# ../face-to-bmi-vit/scripts/api.py
import io
import os
import urllib.request
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import torch
from torchvision.transforms import ToTensor
from models import get_model
from loader import vit_transforms

app = FastAPI()

# Allow requests from the React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

WEIGHT_DIR = "../weights/aug_epoch_7.pt"
WEIGHT_URL = "https://face-to-bmi-weights.s3.us-east.cloud-object-storage.appdomain.cloud/aug_epoch_7.pt"

# Load model once at startup
device = "cuda" if torch.cuda.is_available() else "mps" if torch.backends.mps.is_available() else "cpu"

def load_model():
    if not os.path.exists(WEIGHT_DIR):
        os.makedirs("../weights", exist_ok=True)
        print("Downloading weights...")
        urllib.request.urlretrieve(WEIGHT_URL, WEIGHT_DIR)
    model = get_model().to(device)
    model.load_state_dict(torch.load(WEIGHT_DIR, map_location=device))
    model.eval()
    return model

model = load_model()

@app.post("/predict-bmi")
async def predict_bmi(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    if image.mode != "RGB":
        image = image.convert("RGB")
    tensor = vit_transforms(ToTensor()(image)).unsqueeze(0).to(device)
    with torch.no_grad():
        bmi = model(tensor).item()
    return {"bmi": round(bmi, 2)}
```

Install dependencies and run:
```bash
cd ../face-to-bmi-vit
conda activate face2bmi
pip install fastapi uvicorn python-multipart
cd scripts
uvicorn api:app --reload --port 8000
```

The API will be live at `http://localhost:8000/predict-bmi`.

---

### Step 2 — Create a React Hook for BMI Scanning

Create `src/hooks/useBmiScan.js`:

```js
// src/hooks/useBmiScan.js
const BMI_API = process.env.REACT_APP_BMI_API_URL || "http://localhost:8000";

export async function predictBmi(imageBlob) {
  const formData = new FormData();
  formData.append("file", imageBlob, "face.jpg");

  const res = await fetch(`${BMI_API}/predict-bmi`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("BMI prediction failed");
  const data = await res.json();
  return data.bmi; // float, e.g. 27.4
}
```

---

### Step 3 — Connect It to the Scan Screens

There are **two places** in the app that use the facial scan:

#### A. Onboarding Scan (baseline BMI at enrollment)

In `bloompath-onboarding-mockup.jsx`, **Step 11** is `ScanScreen`. It simulates a scan with a fake 3.2-second timeout. Replace the fake scan with a real one:

```jsx
// In OnboardingFlow — step 11 (ScanScreen)
import { predictBmi } from "../../hooks/useBmiScan";

// Capture frame from webcam using react-webcam, then:
async function handleScan(imageSrc) {
  setScanPhase("scanning");
  try {
    // imageSrc is a base64 data URL from react-webcam's getScreenshot()
    const blob = await fetch(imageSrc).then(r => r.blob());
    const bmi = await predictBmi(blob);
    setBaslineBmi(bmi); // store in onboarding state
    setScanResult({ bmi }); // TODO: HIPAA — store in user profile
    setScanPhase("done");
  } catch (e) {
    setScanPhase("error");
  }
}
```

#### B. Progress Scan (monthly check-in from HomeScreen)

The "Scan Progress" tile in the HomeScreen Quick Actions grid should navigate to `/scan-progress`. Create a `ScanProgressScreen.jsx` that:
1. Opens the webcam (react-webcam)
2. Lets the user position their face
3. Calls `predictBmi()`
4. Shows their new BMI vs. their baseline BMI from onboarding
5. Saves the result with a timestamp — `// TODO: HIPAA`

---

### Step 4 — Install react-webcam

```bash
cd bloompath-app
npm install react-webcam
```

Usage pattern:
```jsx
import Webcam from "react-webcam";

const webcamRef = useRef(null);

function capture() {
  const imageSrc = webcamRef.current.getScreenshot(); // base64 JPEG
  // pass to predictBmi()
}

<Webcam
  ref={webcamRef}
  screenshotFormat="image/jpeg"
  videoConstraints={{ facingMode: "user" }}
  style={{ width: "100%", borderRadius: 12 }}
/>
```

---

### Step 5 — Add a Route

```jsx
// In App.jsx
import ScanProgressScreen from "./screens/ScanProgressScreen";

<Route path="/scan-progress" element={<ScanProgressScreen />} />
```

---

### BMI Display Guidelines (Clinical)

- **Never show raw BMI as the primary metric to the child.** Show BMI percentile for age/sex, or a directional trend ("Your BMI has decreased since October").
- The model returns a raw BMI float (e.g. `27.4`). To convert to percentile you'll need age + sex — capture these during onboarding (already in the onboarding flow).
- Use the CDC BMI-for-age growth charts for percentile calculation. A helper function can be added to `src/utils/bmiPercentile.js`.
- Always label scans as "estimated" — the model has a MAE of ~3.02, which is meaningful at clinical thresholds.
- Flag all BMI data storage with `// TODO: HIPAA`.

---

## Questions to Resolve Before Backend Work

- Auth provider (Auth0, Cognito, Supabase Auth?)
- Backend host (AWS, GCP, Supabase?)
- EHR integration required? (HL7/FHIR for session notes and BMI data)
- Real camera/barcode scanning: use `react-webcam` + a barcode library like `zxing-js`
- BMI API hosting: the FastAPI server needs to be deployed (Modal, Replicate, AWS SageMaker, or a simple EC2 instance with a GPU)

---

*This brief was generated from the BloomPath Health Cowork design session. The four mockup files in this folder are the source of truth for all UI decisions.*
