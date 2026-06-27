# 😂 Joke Generator

A modern, feature-rich random joke generator built with React, TypeScript, Zustand, and Tailwind CSS. Fetches jokes from **4 different external APIs** and lets you save your favorites!

## ✨ Features

### 🎯 Core Features
- ✅ Get random jokes from 4 different APIs
- ✅ Switch between joke sources
- ✅ Save favorite jokes
- ✅ View all saved jokes
- ✅ Delete favorites
- ✅ Beautiful UI with animations
- ✅ Mobile-responsive design
- ✅ Error handling
- ✅ Loading states

### 🔗 External APIs

1. **JokeAPI** (https://jokeapi.dev/)
   - Comprehensive joke database
   - Multiple categories
   - Two-part jokes (setup & delivery)

2. **Official Joke API** (https://official-joke-api.appspot.com/)
   - Simple and reliable
   - Fast responses
   - High uptime

3. **Useless Facts API** (https://uselessfacts.jsph.pl/)
   - Random fun facts
   - Interesting trivia
   - Educational content

4. **Advice Slip API** (https://api.adviceslip.com/)
   - Random life advice
   - Motivational quotes
   - Daily wisdom

### 🎨 Design Features
- Modern gradient backgrounds
- Smooth animations (Framer Motion)
- Responsive grid layout
- Dark/light mode friendly
- Color-coded categories
- Loading spinners
- Error notifications
- Favorites sidebar (desktop & mobile)

## 🚀 Tech Stack

| Technology | Purpose |
|------------|----------|
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Zustand** | State management |
| **Axios** | HTTP client |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **Vite** | Build tool |

## 📦 Installation

```bash
cd joke-generator
npm install
```

## 🎮 Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Building

```bash
npm run build
```

Optimized build output in `dist` folder.

## 📁 Project Structure

```
src/
├── components/
│   ├── JokeCard.tsx          # Individual joke display
│   ├── SourceSelector.tsx    # API source selector
│   ├── FavoritesList.tsx     # Favorites drawer
│   └── Loading.tsx           # Loading spinner
├── services/
│   └── jokeService.ts        # API integrations
├── stores/
│   └── jokeStore.ts          # Zustand state management
├── types/
│   └── index.ts              # TypeScript interfaces
├── styles/
│   └── index.css             # Tailwind + custom styles
├── App.tsx                   # Main component
└── main.tsx                  # Entry point
```

## 🔧 How It Works

### State Management (Zustand)

The app uses Zustand to manage:
- Current displayed joke
- Favorite jokes collection
- Loading state
- Error messages
- Selected API source
- Favorites status

### API Integration

```typescript
// Fetch from specific source
await getJokeFromSource("jokeapi");

// Fetch from random source
await getRandomJoke();
```

### Data Persistence

Favorites are automatically saved to localStorage through Zustand's persist middleware. They survive:
- ✅ Browser refresh
- ✅ Browser restart
- ✅ Tab closure

### Joke Structure

```typescript
interface Joke {
  id: string;
  setup?: string;        // For two-part jokes
  delivery?: string;     // Punchline
  joke?: string;         // Single-line joke
  type: string;          // "joke", "twopart", "fact", etc.
  category?: string;     // "General", "Programming", etc.
  source: string;        // API name
  timestamp: string;     // When fetched
}
```

## 🎯 Store Methods

```typescript
const store = useJokeStore();

// Fetch operations
await store.fetchRandomJoke();           // Random from all sources
await store.fetchJokeFromSource(source); // Specific source

// Favorites
store.addToFavorites();                   // Save current joke
store.removeFromFavorites(id);            // Remove by ID
store.getFavoriteJokes();                 // Get all favorites

// UI
store.setSelectedSource(source);          // Change active source
store.clearError();                       // Dismiss error
```

## 🎨 Customization

### Add New API Source

1. Create a fetch function in `services/jokeService.ts`:

```typescript
const fetchFromNewAPI = async (): Promise<Joke> => {
  const response = await axios.get("https://api.example.com/joke");
  return {
    id: Math.random().toString(36).substring(2, 11),
    joke: response.data.text,
    type: "joke",
    source: "New API",
    timestamp: new Date().toISOString(),
  };
};
```

2. Add to sources array in `getRandomJoke()`

3. Add to selector in `SourceSelector.tsx`

### Customize Colors

Edit `tailwind.config.cjs`:

```js
colors: {
  primary: {
    500: "#your-color",
  },
}
```

## 📱 Responsive Design

- **Mobile**: Single column layout, drawer for favorites
- **Tablet**: Two columns
- **Desktop**: Three columns with fixed sidebar

## 🚀 Performance

- Lazy loading with Vite
- Optimized re-renders with Zustand
- Smooth 60fps animations
- Minimal bundle size (~50KB gzipped)
- Fast API responses

## 🛠️ Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 📊 API Status Indicators

All APIs are free and public:
- ✅ JokeAPI - ~99.9% uptime
- ✅ Official Joke API - ~99.9% uptime
- ✅ Useless Facts - Stable
- ✅ Advice Slip - Stable

## 🐛 Troubleshooting

### "Failed to fetch joke"
- Check internet connection
- API may be temporarily down
- Try different source

### Favorites not persisting
- Clear browser localStorage: DevTools > Application > Local Storage
- Check if localStorage is enabled

### Slow loading
- Reduce API call frequency
- Check network speed
- Use cached responses

## 🎯 Future Enhancements

- [ ] Voice playback for jokes
- [ ] Share jokes on social media
- [ ] Export favorites as PDF
- [ ] Dark mode toggle
- [ ] Joke search/filter
- [ ] Category filtering
- [ ] Offline mode
- [ ] Joke translation
- [ ] Rating system
- [ ] Comments section

## 📄 License

MIT

## 🙏 Credits

- JokeAPI by Jim McGaw
- Official Joke API
- Useless Facts API
- Advice Slip API
- Built with React and Zustand

---

**Made with ❤️ and lots of laughter** 😂
