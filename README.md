-   **Project Name:** Daily Todo
-   **Description:** A simple todo app to manage your daily tasks.
-   **Live Demo:** [daily-todoos.netlify.app](https://daily-todoos.netlify.app)
-   **Tech Stack:** Next.js, React, Tailwind CSS, Zustand, Firebase, Mantine, date-fns, Bun
-   **Key Dependencies:** `@mantine/form`, `date-fns`, `firebase`, `next`, `react`, `react-dom`, `react-hot-toast`, `react-icons`, `zustand`
-   **Dev Tools:** TypeScript, ESLint, Tailwind CSS
-   **Scripts:** dev, build, start, lint
-   **Folder Structure:**
    -   `src/pages/` – App routes and main entry points
    -   `src/components/` – UI components
    -   `src/services/` – API and backend integration
    -   `src/store/` – State management
    -   `src/libs/` – Shared libraries
    -   `src/styles/` – Styling and Tailwind config

Here’s a detailed README draft for your project:

---

# Daily Todo

A simple and modern todo app to manage your daily tasks efficiently.

## Live Demo

[https://daily-todoos.netlify.app](https://daily-todoos.netlify.app)

## Features

-   Add, edit, and delete daily tasks
-   Mark tasks as complete/incomplete
-   Persistent storage with Firebase
-   Responsive and clean UI with Mantine and Tailwind CSS
-   Toast notifications for actions
-   State management with Zustand

## Tech Stack

-   **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Mantine
-   **State Management:** Zustand
-   **Backend/Storage:** Firebase
-   **Utilities:** date-fns, react-hot-toast, react-icons

## Getting Started

### Prerequisites

-   [Bun](https://bun.sh/) (or npm/yarn/pnpm)
-   Node.js (if not using Bun)

### Installation

```bash
bun install
```

### Development

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
bun run build
```

### Lint

```bash
bun run lint
```

## Project Structure

```
src/
  components/   # Reusable UI components
  pages/        # Next.js pages/routes
  services/     # API and backend logic
  store/        # Zustand state management
  libs/         # Shared libraries/utilities
  styles/       # Tailwind and global styles
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
