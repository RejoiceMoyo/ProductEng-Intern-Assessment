# Torre Talent Explorer

A full-stack web application to explore Torre profiles, search for people, and visualize their skills.

## Features

- **People Search:** Search for users by name and view a list of matching profiles.
- **Skill Analysis:** Click on a profile to view a radar chart of top skills.
- **Interactive UI:** Clean and responsive design for smooth navigation.

## Tech Stack

- **Frontend:** Next.js 14 with TypeScript
- **Backend:** Next.js API Routes (used to proxy Torre API requests)
- **Styling:** Tailwind CSS + Shadcn/ui components
- **Data Visualization:** Recharts
- **Deployment:** Vercel

## Architecture

- **Frontend Pages:**  
  - `/` – Search page  
  - `/profile/[username]` – Profile detail page with radar chart  

- **API Routes (Backend in Next.js):**  
  - `/api/entities/search` – POST route to fetch people search results from Torre API  
  - `/api/genome/[username]` – GET route to fetch a user’s genome/skills from Torre API  

> The backend is implemented as Next.js API routes to handle requests, avoid CORS issues, and process data before sending it to the frontend.

## Setup (Local Development)

```bash
git clone https://github.com/RejoiceMoyo/ProductEng-Intern-Assessment
cd ProductEng-Intern-Assessment
npm install
npm run dev
