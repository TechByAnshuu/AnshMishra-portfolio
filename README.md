# Ansh Mishra — Portfolio

A modern, performance-focused developer portfolio built with **React**, **Vite**, and **Tailwind CSS**.
Designed with a premium glassmorphism interface, animated Canvas background, and a clean, maintainable component architecture.

> 🔗 **Live Demo:** ([https://your-portfolio-url.com](https://ansh-mishraportfoliodev.vercel.app/)

---

## Architecture Philosophy

This portfolio is built on the following principles:

- **Component-driven design** — every UI element is an isolated, reusable component
- **Clear separation of concerns** — logic, data, and styles are kept distinct
- **Performance-first rendering** — Canvas animations run at 60fps without affecting layout
- **Minimal, premium UI** — glassmorphism with purposeful depth and spacing
- **Scalable folder structure** — easy to extend without restructuring

---

## Tech Stack

**Frontend**
- React 18
- Vite
- Tailwind CSS
- Lucide React

**Rendering & Animation**
- Canvas API
- Custom animation loop
- CSS-based glassmorphism effects

**Tooling**
- ESLint
- PostCSS
- Autoprefixer

---

## Core Features

### 1. Premium UI System
- Glassmorphism-based layout
- Layered depth effects with subtle shadow and blur hierarchy
- Responsive typography scaling

### 2. Animated Background
- Custom `FloatingDots` system built on Canvas API
- Adjustable speed, radius, and density
- Optimized loop — GPU-friendly, no layout impact

### 3. Theme System
- Dark / Light toggle
- Persistent theme via `localStorage`
- Centralized `ThemeContext`

### 4. Portfolio Sections
- **Meet Me** — Personal introduction
- **Skills** — Technical stack overview
- **My Work** — Project showcase with live demos
- **Experience** — Open-source contributions
- **Socials** — Professional platform links

---

## Project Structure

```
AnshMishra-portfolio/
├── public/
├── src/
│   ├── components/
│   │   ├── Controller.jsx      # Side nav dots
│   │   ├── Experience.jsx      # Open source section
│   │   ├── FloatingDots.jsx    # Canvas background
│   │   ├── Loading.jsx         # Loading screen
│   │   ├── LiquidEther.jsx     # Liquid animation bg
│   │   ├── MeetMe.jsx          # Hero section
│   │   ├── Projects.jsx        # Projects section
│   │   ├── Skills.jsx          # Skills section
│   │   ├── Socials.jsx         # Socials section
│   │   └── ThemeToggle.jsx     # Dark/light toggle
│   ├── App.jsx
│   ├── ThemeContext.jsx
│   ├── data.js
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
git clone https://github.com/TechByAnshuu/AnshMishra-portfolio.git
cd AnshMishra-portfolio
npm install
```

### Development

```bash
npm run dev
```

Visit:(https://ansh-mishraportfoliodev.vercel.app/))

### Production Build

```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview Production

```bash
npm run preview
```

---

## Customization Guide

### Update Portfolio Content

Edit `src/data.js` to modify:
- Name and description
- Skills list
- Projects (name, tech, description, links)
- Open-source contributions
- Social media links

### Modify Design System

Update `tailwind.config.js` to adjust:
- Color palette
- Fonts
- Animations
- Custom utilities

### FloatingDots Configuration

In `src/App.jsx`:

```jsx
<FloatingDots
  count={80}        // number of dots
  color="..."       // dot color
  minRadius={1}     // minimum dot size
  maxRadius={3}     // maximum dot size
  minSpeed={0.3}    // minimum speed
  maxSpeed={1.2}    // maximum speed
/>
```

---

## Deployment

### Vercel

1. Push the repository to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Set:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Deploy

---

## Performance

- ⚡ Fast cold starts with Vite
- 🎯 Optimized Canvas rendering at 60fps
- 📦 Tree-shaking enabled — minimal bundle size
- 🚀 Static hosting ready
- 💯 Lighthouse performance optimization supported

---

## License

MIT License — free to use, modify, and distribute with attribution.

---

## Author

**Ansh Mishra** — Cloud & DevOps Engineer  
[GitHub](https://github.com/TechByAnshuu) · [LinkedIn](https://www.linkedin.com/in/ansh-mishra-dev/) · [Portfolio]([https://your-portfolio-url.com](https://ansh-mishraportfoliodev.vercel.app/)
