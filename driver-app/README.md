# 🛺 ABC Travels — Driver Interface

A mobile-first, production-grade Driver Console engineered specifically for transport and fleet drivers. Built with React 19, TypeScript, Tailwind CSS, and Lucide icons.

---

## 🌟 Key Design & Architectural Highlights

### 1. Mobile-First & Driver-Safe UX
- **Fast 2–3 Second Cognition:** High contrast typography, clear visual hierarchy, large 48px+ touch targets designed for single-hand or vehicle dashboard mount operation.
- **Uncluttered & Purpose-Built:** No generic dashboards or distracting admin analytics. Everything centers on the active route, next pickup, and earnings.
- **Persistent Bottom Navigation:** Instant access across `Home`, `Trips`, `Earnings`, `Alerts`, and `Profile`.
- **Dual Display Modes:** Integrated mobile phone mockup chassis for desktop previews with a toggle to full viewport responsive mode for real mobile devices.

### 2. Full Driver Lifecycle & State Engine
- **Supported Driver States:**
  - `OFFLINE` (White/Grey indicator: "Go online to receive trips")
  - `ONLINE` (Emerald pulse indicator: "You're available for trips")
  - `AVAILABLE` (Ready for dispatch)
  - `ON TRIP` (Energy Blue active navigation state)
  - `BREAK` (Amber pause mode)
  - `VEHICLE ISSUE` (Safety Red inspection state)
- **Active Trip Lifecycle:**
  1. `Assigned` ➔ Tap **VIEW TRIP** ➔ Tap **ACCEPT & NAVIGATE TO PICKUP**
  2. `En Route to Pickup` ➔ Tap **I HAVE ARRIVED AT PICKUP**
  3. `Arrived at Pickup` ➔ Tap **START TRIP**
  4. `In Progress` ➔ Live GPS map with route, speed (38 km/h), turn guidance ➔ Tap **END TRIP**
  5. `Cash Collection Modal` ➔ Prompt to collect ₹280 cash ➔ Confetti burst & instant settlement to earnings!

### 3. Integrated Indian Fleet Context
- **Organization:** ABC Travels
- **Driver:** Ravi Kumar (`DRV1023`, ⭐ 4.8 Rating, 1,284 completed trips)
- **Vehicle:** Bajaj RE Auto (`AP 37 AB 1234`)
- **Locations:** Bhimavaram Railway Station, Palakollu, Tadepalligudem, Undi Junction, Somaram Temple
- **Currency:** Indian Rupee (₹)

### 4. Special Features
- **In-Cab Driver AI Assistant:** A compact voice & text fleet copilot (not a generic chatbot) providing instantaneous spoken audio/text readouts for:
  - *"What are my trips today?"*
  - *"Where is my next pickup?"*
  - *"How much did I earn today?"*
  - *"When is my vehicle service due?"*
  - *"Do I have any pending trips?"*
- **Trip Request Dispatch Alert:** Simulates incoming trip dispatch with an active 18-second countdown timer, route overview, and prominent `ACCEPT TRIP` / `DECLINE` actions.
- **Safety & Emergency Hub:** Quick SOS shield with a 5-second cancelable countdown to prevent accidental activation while driving, direct dispatch desk speed-dial (`+91 8816 223344`), and customer issue logging.
- **Vehicle Diagnostics & Issue Reporter:** One-tap reporting with categories (Engine, Tyres, Brakes, Lights, Electrical, Other), description, and camera photo attachment.
- **Earnings Ledger & Chart:** Real-time earnings cards (Today: ₹850+, This Week: ₹5,420+, This Month: ₹21,840+), interactive 7-day breakdown chart, and daily bank settlement status.
- **Driver Documents:** Driving license (`AP37 20180004921`, Exp: 12 Dec 2028), Aadhaar ID, and Commercial Badge with verified status badges.

---

## 🚀 Running the Application

### Development Server
```bash
cd driver-app
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your mobile browser or desktop.

### Production Build
```bash
npm run build
```
Generates an optimized bundle in `dist/`.
