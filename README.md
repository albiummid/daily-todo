# Daily Todo

A simple and modern todo app to manage your daily tasks efficiently.

## Live Demo

Vercel :: [https://daily-todoos.vercel.app](https://daily-todoos.vercel.app)

Netlify :: [https://daily-todoos.netlify.app](https://daily-todoos.netlify.app)

## Features

-   Add, edit, and delete daily tasks
-   Mark tasks as complete/incomplete
-   Persistent storage with Firebase
-   Responsive and clean UI with Mantine and Tailwind CSS
-   Toast notifications for actions
-   State management with Zustand

## Tech Stack
 Next.js, React, Tailwind CSS, Zustand, Firebase, Mantine, date-fns, Bun

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

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
