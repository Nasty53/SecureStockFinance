import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useJokeStore } from "./stores/jokeStore";
import JokeCard from "./components/JokeCard";
import SourceSelector from "./components/SourceSelector";
import FavoritesList from "./components/FavoritesList";
import Loading from "./components/Loading";

export default function App() {
  const {
    currentJoke,
    isLoading,
    error,
    jokes,
    selectedSource,
    fetchRandomJoke,
    fetchJokeFromSource,
    clearError,
  } = useJokeStore();

  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    // Load initial joke
    fetchRandomJoke();
  }, []);

  const handleGetNewJoke = () => {
    if (selectedSource === "random") {
      fetchRandomJoke();
    } else {
      fetchJokeFromSource(selectedSource);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-primary-200 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">😂 Joke Generator</h1>
              <p className="mt-1 text-gray-600">Get random jokes from multiple APIs</p>
            </div>
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className="relative rounded-lg bg-red-100 px-4 py-2 font-semibold text-red-700 hover:bg-red-200 transition-colors md:hidden"
            >
              ❤️ {jokes.length}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-red-800">❌ Oops!</h3>
                    <p className="mt-1 text-sm text-red-700">{error}</p>
                  </div>
                  <button
                    onClick={clearError}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Source Selector */}
            <SourceSelector />

            {/* Current Joke */}
            {isLoading ? (
              <Loading message="Fetching a hilarious joke..." />
            ) : currentJoke ? (
              <AnimatePresence mode="wait">
                <JokeCard key={currentJoke.id} joke={currentJoke} />
              </AnimatePresence>
            ) : null}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleGetNewJoke}
                disabled={isLoading}
                className="flex-1 rounded-lg bg-primary-600 px-6 py-3 text-lg font-semibold text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg"
              >
                {isLoading ? "Loading..." : "🎲 Get New Joke"}
              </button>
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className="hidden rounded-lg border-2 border-primary-300 px-6 py-3 font-semibold text-primary-600 hover:bg-primary-50 transition-colors md:inline-flex items-center gap-2"
              >
                ❤️ Favorites
                <span className="rounded-full bg-primary-600 px-2 py-1 text-xs font-bold text-white">
                  {jokes.length}
                </span>
              </button>
            </div>
          </div>

          {/* Sidebar - Favorites (Desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border-2 border-primary-200 bg-white p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900">
                ❤️ Favorites ({jokes.length})
              </h2>
              <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
                {jokes.length === 0 ? (
                  <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-center">
                    <p className="text-sm text-gray-600">No favorites yet!</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Heart jokes to save them
                    </p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {jokes.map((joke, idx) => (
                      <div
                        key={joke.id}
                        className="rounded-lg border border-gray-200 bg-gray-50 p-3 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-xs font-bold text-primary-600 bg-primary-100 px-2 py-1 rounded">
                            #{idx + 1}
                          </span>
                          <button
                            onClick={() =>
                              useJokeStore.getState().removeFromFavorites(joke.id)
                            }
                            className="text-sm text-red-500 hover:text-red-700 transition-colors"
                          >
                            🗑️
                          </button>
                        </div>
                        <p className="line-clamp-2 text-xs text-gray-700">
                          {joke.setup
                            ? `${joke.setup} ${joke.delivery}`
                            : joke.joke}
                        </p>
                        <span className="text-xs text-primary-600 font-medium mt-2 inline-block">
                          {joke.source}
                        </span>
                      </div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile Favorites Drawer */}
      <FavoritesList
        jokes={jokes}
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
      />

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/50 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-semibold text-gray-900">About</h3>
              <p className="mt-2 text-sm text-gray-600">
                Random Joke Generator using multiple free APIs.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">APIs Used</h3>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• JokeAPI</li>
                <li>• Official Joke API</li>
                <li>• Useless Facts</li>
                <li>• Advice Slip</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Features</h3>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• Random Jokes</li>
                <li>• Multiple Sources</li>
                <li>• Favorites</li>
                <li>• Local Storage</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Tech Stack</h3>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• React 19</li>
                <li>• TypeScript</li>
                <li>• Zustand</li>
                <li>• Tailwind CSS</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
            <p>✨ Built with React, Zustand, and Multiple APIs</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
