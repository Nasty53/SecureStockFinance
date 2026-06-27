# 📝 Todo App

A modern, feature-rich todo list application built with React, TypeScript, Zustand, and Tailwind CSS. All data is stored locally in your browser using localStorage.

## Features

✨ **Core Features**
- ✅ Add, edit, and delete todos
- ✅ Mark todos as completed
- ✅ Persistent storage using localStorage
- ✅ Priority levels (Low, Medium, High)
- ✅ Due dates
- ✅ Categories
- ✅ Detailed descriptions

🎯 **Filtering & Search**
- Filter by status (All, Active, Completed)
- Filter by priority
- Search by title or description
- Clear all completed todos

📊 **Statistics**
- Total todos count
- Active todos count
- Completed todos count
- High priority todos count

🎨 **Design**
- Modern, responsive UI
- Smooth animations with Framer Motion
- Dark mode friendly
- Beautiful color scheme
- Mobile-first design

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Zustand** - State management with persistence
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Framer Motion** - Animations

## Installation

```bash
cd todo-app
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Building

```bash
npm run build
```

The output will be in the `dist` folder.

## How It Works

### State Management
The app uses Zustand with localStorage middleware to persist all todo data. This means your todos will survive browser refreshes and even closing the browser.

### Local Storage
All data is stored in the browser's localStorage under the key `todo-storage`. To clear all data, you can:
- Clear browser localStorage
- Open DevTools > Application > Local Storage > Delete `todo-storage`

### Todo Structure
```typescript
interface Todo {
  id: string;                    // Unique identifier
  title: string;                 // Todo title (required)
  description?: string;          // Optional description
  completed: boolean;            // Completion status
  priority: "low" | "medium" | "high";  // Priority level
  dueDate?: string;              // Optional due date (ISO 8601)
  createdAt: string;             // Creation timestamp
  updatedAt: string;             // Last update timestamp
  category?: string;             // Optional category
}
```

## Project Structure

```
src/
├── components/
│   ├── TodoForm.tsx           # Form to add/edit todos
│   ├── TodoItem.tsx           # Individual todo card
│   ├── FilterBar.tsx          # Filtering controls
│   └── Stats.tsx              # Statistics display
├── stores/
│   └── todoStore.ts           # Zustand store with localStorage
├── types/
│   └── index.ts               # TypeScript interfaces
├── styles/
│   └── index.css              # Tailwind + custom styles
├── App.tsx                    # Main application component
└── main.tsx                   # Entry point
```

## Key Features Explained

### Adding a Todo
1. Click "Add New Todo" button
2. Fill in the title (required) and optional details
3. Set priority, category, and due date
4. Click "Add Todo"

### Editing a Todo
1. Click the pencil (✏️) icon on a todo
2. Update the fields
3. Click "Update Todo"

### Filtering
- Use the sidebar filters to filter by status or priority
- Use the search box to find todos by title or description
- Click "Clear Completed" to remove all finished todos

### Completing a Todo
- Check the checkbox on a todo to mark it as completed
- The todo will appear strikethrough and change styling

## Zustand Store Methods

```typescript
// Add a new todo
addTodo(todo: Omit<Todo, "id" | "createdAt" | "updatedAt">)

// Update an existing todo
updateTodo(id: string, updates: Partial<Todo>)

// Delete a todo
deleteTodo(id: string)

// Toggle completion status
toggleTodo(id: string)

// Set filter criteria
setFilter(filter: Filter)

// Set search query
setSearchQuery(query: string)

// Remove all completed todos
clearCompleted()

// Get filtered and searched todos
getFilteredTodos(): Todo[]

// Get statistics
getTodoStats(): {
  total: number
  completed: number
  active: number
  high: number
  medium: number
  low: number
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Any browser with localStorage support

## Data Persistence

All todos are automatically saved to localStorage whenever you:
- Add a todo
- Update a todo
- Delete a todo
- Toggle completion

The data persists across:
- ✅ Browser refreshes
- ✅ Browser restarts
- ✅ Tab closures and reopenings
- ❌ Private/Incognito browsing (cleared on session end)
- ❌ Browser data clearing

## Performance

- Smooth animations with Framer Motion
- Optimized re-renders with Zustand
- Lazy state updates
- Minimal bundle size

## Future Enhancements

- [ ] Cloud synchronization
- [ ] Recurring todos
- [ ] Notifications and reminders
- [ ] Dark mode toggle
- [ ] Export/Import todos
- [ ] Tags system
- [ ] Subtasks
- [ ] Collaboration features

## License

MIT

## Contributing

Feel free to submit issues and enhancement requests!

---

**Made with ❤️ using React, Zustand, and Tailwind CSS**
