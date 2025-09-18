# PROMPTS.md

This document lists all AI/LLM prompts used during the development of **Torre Talent Explorer**. It specifies the tool, model, and the prompt used, demonstrating how AI assisted in development, debugging, and UI/UX improvements.

---

### 1. Styling the Main CTA Button

**Task:** Make the primary call-to-action button visually stand out.

**Tool:** Cursor
**Model:** Gemini-1.0-flash
**Prompt:**

```
Update the styling of the primary call-to-action button to have a blue background color that stands out visually. Use a medium or bold blue like #1E90FF. Ensure the text remains readable and the style is consistent across all themes.
```

---

### 2. Creating the Radar Chart Component

**Task:** Build a radar chart to visualize user skills.

**Tool:** Cursor
**Model:** GPT-4o
**Prompt:**

```
Generate a React component in Next.js 14 that uses Recharts to display a radar chart. The component should accept a `data` prop, which is an array of objects with `subject` (string) and `value` (number) properties. Style the chart with a clean, modern look and make it responsive.
```

---

### 3. Implementing Search Functionality

**Task:** Fetch and display results from Torre API using a search input.

**Tool:** Claude
**Model:** Claude-instant-1
**Prompt:**

```
Provide a clean, scalable approach to fetch data from Torre’s /entities/_searchStream API endpoint using a POST request in a Next.js API route. Include error handling, response parsing, and rate limiting suggestions.
```

---

### 4. Profile Detail Page API Integration

**Task:** Retrieve and display user genome/skills.

**Tool:** Cursor
**Model:** GPT-4o
**Prompt:**

```
Create a Next.js API route to fetch a user’s genome data from `https://torre.ai/api/genome/bios/[username]` and return it to the frontend. Ensure proper error handling, transformation of the `strengths` array for charting, and caching considerations for performance.
```

---

### 5. Debugging & Error Resolution

**Task:** Solve CORS and deployment-related issues.

**Tool:** ChatGPT
**Model:** GPT-4o
**Prompt:**

```
I encountered a CORS error when calling the Torre API from the frontend. Suggest a robust solution using Next.js API routes as a proxy, including proper error handling and response transformation.
```

**Tool:** Claude
**Model:** Claude-instant-1
**Prompt:**

```
While deploying to Vercel, the project returned an environment-related error when fetching API data. Provide recommended fixes and best practices for handling environment variables, API endpoints, and error logging in a Next.js 14 project.
```

---

### 6. UI/UX Recommendations

**Task:** Improve layout, readability, and responsiveness.

**Tool:** Cursor
**Model:** Gemini-1.0-flash
**Prompt:**

```
Analyze the search results and profile pages for usability improvements. Suggest layout adjustments, spacing, font hierarchy, and button placement to enhance user experience while keeping it minimalistic and professional.
```

---

### 7. Project Architecture Guidance

**Task:** Optimize project structure and modularization.

**Tool:** Claude
**Model:** Claude-instant-1
**Prompt:**

```
Recommend a clean Next.js 14 project structure for a full-stack app with search and profile pages, API routes, reusable components, and a radar chart visualization. Include folder organization, component hierarchy, and API handling best practices.
```

---

## Notes

* These prompts illustrate **strategic use of AI** for guidance, debugging, and component generation.
* The app was developed primarily by the author; AI tools were used **as accelerators**, not to write the entire solution.
* Deployment errors, API integration challenges, and responsive UI improvements were solved using these prompts effectively.

---

## Note on Originality

While AI assisted with code generation and problem-solving, all:

* Architectural decisions were made by the developer
* Business logic was implemented manually
* Design choices were carefully curated
* Code was reviewed and modified for quality
* Final implementation represents original work

