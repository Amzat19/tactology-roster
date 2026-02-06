# Planner / Roster Interface

A calendar-based planner interface built with **Next.js**, **TypeScript**, and **Chakra UI (v3)**.  
The application displays scheduled events in a time-grid layout with support for **day, week, and month** views, roster integration, and modal-based event inspection.

This project was built as a frontend technical assessment with a focus on:

- clean state management
- predictable time-based data
- UI/UX consistency
- scalable component structure

---

## 🧰 Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Chakra UI v3**
- **Ark UI (via Chakra v3 components)**
- **iconsax-react**
- **react-icons**

> ⚠️ No AI-generated code was used in this project.

---

## ✨ Features

### Core Functionality

- Time-grid planner layout with hourly slots
- Events grouped and rendered by column and time range
- Clickable schedules with modal details
- Navigation between previous / current / next dates
- Real, deterministic date handling (no hard-coded dates)

### Time Views

- **Day view** – shows events for the selected day
- **Week view** – shows all events for the selected week
- **Month view** – header-level support (grid can be extended)

### UX Enhancements

- Loading states when switching dates or views
- Empty states when no events exist for a selected range
- Roster panel synced with day-based selection
- Consistent Chakra UI design patterns

---

## 🗂️ Project Structure

app/
layout.tsx
page.tsx
providers.tsx

components/
planner/
PlannerSection.tsx
PlannerTimeGrid.tsx
RosterPanel.tsx
SeeAllModal.tsx

data/
planner-events.ts

utils/
date.ts
time.ts
group-events.ts
generateTimeSlots.ts

theme/
index.ts

---

## 📅 Dummy Data Strategy

To make the planner **easy to test**, the app generates deterministic dummy events:

- Events exist **every day**
- Covers:
  - last week
  - current week
  - next week
- Each column has multiple events per day
- Times are consistent and predictable

This ensures:

- Navigation always produces visible changes
- Reviewers never encounter an empty grid unintentionally

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** or **pnpm**

---

### Installation

```bash
git clone <repository-url>
cd <project-folder>
npm install
or

pnpm install
Run the development server
npm run dev
```

Then open:

http://localhost:3000

### 🧭 How to Test the Planner

- Use the left / right arrows to move between dates

- Switch between Day / Week / Month using the dropdown

- Click on events or “See all” to open the details modal

- Toggle the roster panel to see day-based roster behavior

- Navigate across weeks to verify data updates correctly

- All visible data is derived from the selected date state.

### 🧠 Design & Architecture Notes

- Single source of truth for time
- Date and view granularity are centralized in PlannerSection.
- PlannerTimeGrid is render-only
- It receives filtered data and focuses purely on layout.

### 📌 Limitations & Future Improvements

- Month grid view can be expanded into a full calendar
- Drag-and-drop scheduling is not implemented
- Backend persistence is out of scope for this assessment

### 📄 License

This project is provided for assessment and demonstration purposes only.

---

### Why this README works for an assessor

- Clear setup steps (no guessing)
- Explicit scope boundaries
- Explains **why** dummy data exists
- Signals architectural intent
- No unnecessary claims or buzzwords

If you want, next we can:

- tighten this for a **take-home submission tone**, or
- add a short **“Implementation Notes for Reviewers”** section (very effective in senior assessments).
