# 🚀 TaskBlaze Frontend

The frontend application for TaskBlaze, built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- 🎯 Intuitive task management interface
- 🎨 Color customization for tasks
- ✅ Interactive task completion
- 🌓 Dark mode by default
- 💫 Smooth animations and transitions

## 🛠 Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Lucide Icons

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   # Create .env.local file
   cp .env.example .env.local

   # Add your backend URL
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
frontend/
├── app/
│   ├── page.tsx            # Home page
│   ├── create/            # Create task page
│   ├── edit/[id]/         # Edit task page
│   └── layout.tsx         # Root layout
├── components/
│   ├── header.tsx         # App header
│   ├── task-list.tsx      # Task list component
│   ├── task-form.tsx      # Task form component
│   └── splash-screen.tsx  # Splash screen
├── public/
│   └── favicon.ico        # App favicon
└── package.json
```

## 🔑 Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint 