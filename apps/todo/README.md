# SecureStock Todo App

A modern, feature-rich todo list application with local storage persistence, priority levels, due dates, tags, and smart filtering.

## Features

✅ **Task Management**
- Create, edit, and delete tasks
- Mark tasks as complete
- View task completion statistics

📊 **Smart Filtering**
- Filter by: All, Active, Completed
- Quick statistics dashboard
- Completion rate tracking

🎯 **Priority Levels**
- Low, Medium, High priority indicators
- Visual priority badges
- Easy identification of urgent tasks

📅 **Due Dates**
- Set due dates for tasks
- Visual overdue indicators
- Relative date display (Today, Tomorrow, etc.)

🏷️ **Tags & Organization**
- Add multiple tags per task
- Organize tasks by category
- Easy tag-based filtering (future feature)

💾 **Local Storage**
- All data persists in browser localStorage
- No backend required
- Automatic saving on every action

🎨 **Modern UI**
- Clean, intuitive interface
- Smooth animations
- Responsive design (mobile, tablet, desktop)
- Dark/Light mode ready

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Zustand** - State management with localStorage persistence
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## Quick Start

### Development

```bash
cd apps/todo
npm install
npm run dev
```

Open http://localhost:5174 in your browser.

### Build for Production

```bash
cd apps/todo
npm run build
npm run preview
```

## Usage

### Adding a Task
1. Enter task title in the input field
2. Click "Add Task" to create with default (medium) priority
3. Click ⚙ to access advanced options (priority, due date, tags)

### Editing a Task
1. Click the ✎ button on any task
2. Modify title, description, priority, due date, or tags
3. Click "Save" to apply changes

### Managing Tasks
- Click the checkbox to mark a task as complete
- Click ✕ to delete a task
- Use filter buttons to view All, Active, or Completed tasks
- Click "Clear Completed" to remove all finished tasks

## Local Storage

Tasks are automatically saved to browser localStorage under the key `securestock-todos`.

To clear all data:
```javascript
localStorage.removeItem('securestock-todos');
```

To export data:
```javascript
const todos = JSON.parse(localStorage.getItem('securestock-todos'));
console.log(todos);
```

## File Structure

```
apps/todo/
├── src/
│   ├── components/
│   │   ├── TodoHeader.tsx      # App header with title
│   │   ├── TodoForm.tsx        # Task creation form
│   │   ├── TodoList.tsx        # Task list container
│   │   ├── TodoItem.tsx        # Individual task component
│   │   ├── TodoEditModal.tsx   # Task editing modal
│   │   ├── TodoFilters.tsx     # Filter buttons
│   │   └── TodoStats.tsx       # Statistics dashboard
│   ├── store/
│   │   └── todoStore.ts        # Zustand store with localStorage
│   ├── types/
│   │   └── todo.ts             # TypeScript type definitions
│   ├── styles/
│   │   └── index.css           # Global styles
│   ├── App.tsx                 # Root component
│   └── main.tsx                # Entry point
├── index.html
├── vite.config.ts
├── tailwind.config.cjs
├── package.json
└── tsconfig.json
```

## Future Enhancements

- 🌙 Dark mode toggle
- 📤 Export to CSV/JSON
- 📥 Import from file
- 🔄 Sync with cloud backend
- 🔔 Browser notifications
- 🎨 Custom colors and themes
- 📱 PWA support
- 🔐 Password protection
- 🌐 Multi-language support

## License

MIT
