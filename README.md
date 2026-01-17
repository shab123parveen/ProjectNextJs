# Smart Business Operations Dashboard

A premium, production-ready Next.js application showcasing a comprehensive business operations management platform. This demo application demonstrates modern web development practices, beautiful UI/UX design, and seamless user interactions.

![Dashboard Preview](https://via.placeholder.com/1200x600?text=Smart+Business+Operations+Dashboard)

## 🚀 Live Demo

[View Live Demo](#) _(Deploy to see your live URL)_

---

## 📋 Project Overview

This is a **client-demo-ready web application** built with Next.js 14+ App Router. It simulates a SaaS platform for managing:

- **Projects** - Create, track, and manage projects with progress indicators
- **Tasks** - Kanban-style task management with drag-and-drop feel
- **Team Members** - Team collaboration and member management
- **Client Requests** - Review and process incoming client requests
- **Analytics & Reports** - Comprehensive business insights and charts
- **Activity Logs** - Real-time activity feed

The design aesthetic matches premium tools like **Linear**, **Vercel**, and **Notion** — clean, minimal, and highly professional.

---

## ✨ Key Features

### 🎨 Modern UI/UX
- Clean, minimalist design with attention to detail
- Smooth animations and micro-interactions (Framer Motion)
- Fully responsive across all device sizes
- Dark mode support with seamless transitions
- Custom gradient backgrounds and glassmorphism effects

### 📊 Dashboard & Analytics
- Real-time statistics with trend indicators
- Interactive charts (Line, Bar, Pie, Area)
- Activity feed with live updates
- Project progress visualization

### 📁 Project Management
- Create, edit, and delete projects
- Status tracking (Active, Completed, On Hold)
- Team member assignment
- Progress percentage tracking

### ✅ Task Management
- Kanban-style board layout
- Priority levels (Low, Medium, High)
- Status transitions (Todo, In Progress, Done)
- Assignee management

### 👥 Team Collaboration
- Team member directory
- Role and department management
- Status indicators (Online, Offline, Away)
- Member CRUD operations

### 📨 Client Requests
- Request queue management
- Priority-based sorting
- Approve/Reject workflow
- Status tracking

### ⚙️ Settings
- Profile management
- Notification preferences
- Theme customization
- Security settings

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14+** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **Zustand** | State management with persistence |
| **Framer Motion** | Smooth animations |
| **Recharts** | Data visualization |
| **Radix UI** | Accessible component primitives |
| **Lucide Icons** | Beautiful icon library |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (dashboard)/          # Protected dashboard routes
│   │   ├── dashboard/        # Main dashboard page
│   │   ├── projects/         # Projects management
│   │   ├── tasks/            # Task board
│   │   ├── team/             # Team management
│   │   ├── requests/         # Client requests
│   │   ├── reports/          # Analytics & reports
│   │   ├── settings/         # User settings
│   │   └── layout.tsx        # Dashboard layout wrapper
│   ├── login/                # Authentication page
│   ├── api/                  # API routes
│   │   ├── projects/
│   │   ├── tasks/
│   │   ├── team/
│   │   ├── activity/
│   │   └── requests/
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── components/
│   ├── layout/               # Layout components
│   │   ├── sidebar.tsx
│   │   └── header.tsx
│   └── ui/                   # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── tabs.tsx
│       ├── toast.tsx
│       └── ...
└── lib/
    ├── utils.ts              # Utility functions
    ├── mock-data.ts          # Mock data & types
    └── store.ts              # Zustand store
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ProjectNextJs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Credentials

The login page accepts any email/password combination. Simply enter any credentials to access the dashboard.

---

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🌐 Deployment on Render

### Step 1: Prepare Your Repository

Ensure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket).

### Step 2: Create a New Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your repository

### Step 3: Configure Build Settings

| Setting | Value |
|---------|-------|
| **Name** | `smart-dashboard` (or your choice) |
| **Environment** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Node Version** | `18` or higher |

### Step 4: Environment Variables (Optional)

If you add any environment variables later, configure them in the Render dashboard under **Environment**.

### Step 5: Deploy

Click **"Create Web Service"** and Render will automatically build and deploy your application.

### Alternative: render.yaml

Create a `render.yaml` file in your project root:

```yaml
services:
  - type: web
    name: smart-dashboard
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

---

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: 'your-color',
        // ...
      }
    }
  }
}
```

### Adding New Features

1. Create new pages in `src/app/(dashboard)/`
2. Add corresponding API routes if needed
3. Update the sidebar navigation in `src/components/layout/sidebar.tsx`
4. Add new types to `src/lib/mock-data.ts`
5. Update Zustand store in `src/lib/store.ts`

---

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1280px+)
- 🖥️ Large screens (1536px+)

---

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Screen reader compatible
- Color contrast compliance

---

## 🔒 Security Notes

This is a **demo application** and includes:

- Mock authentication (accepts any credentials)
- In-memory data storage (localStorage)
- No real database connection

For production use, implement:
- Proper authentication (NextAuth.js, Clerk, etc.)
- Database integration (Prisma, Drizzle, etc.)
- API rate limiting
- Input validation and sanitization
- CSRF protection

---

## 📄 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

For support, please open an issue in the GitHub repository.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Recharts](https://recharts.org/) - Charting library
- [Lucide](https://lucide.dev/) - Beautiful icons

---

Built with ❤️ using Next.js
