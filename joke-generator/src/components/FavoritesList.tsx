import { motion, AnimatePresence } from "framer-motion";
import { Joke } from "../types";
import { useJokeStore } from "../stores/jokeStore";

interface FavoritesListProps {
  jokes: Joke[];
  isOpen: boolean;
  onClose: () => void;
}

export default function FavoritesList({
  jokes,
  isOpen,
  onClose,
}: FavoritesListProps) {
  const { removeFromFavorites, currentJoke } = useJokeStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed inset-y-0 right-0 w-full max-w-md overflow-y-auto bg-white shadow-xl md:relative md:inset-auto md:max-w-full md:w-auto"
        >
          {/* Header */}
          <div className="sticky top-0 border-b border-gray-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                ❤️ Favorites ({jokes.length})
              </h2>
              <button
                onClick={onClose}
                className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3 p-6">
            {jokes.length === 0 ? (
              <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                <p className="text-gray-600">No favorites yet!</p>
                <p className="mt-1 text-sm text-gray-500">
                  Heart your favorite jokes to save them here.
                </p>
              </div>
            ) : (
              <AnimatePresence>
                {jokes.map((joke, index) => (
                  <motion.div
                    key={joke.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <span className="text-sm font-semibold text-primary-600">
                        {index + 1}
                      </span>
                      <button
                        onClick={() => removeFromFavorites(joke.id)}
                        className="text-lg text-red-500 hover:text-red-700 transition-colors"
                        title="Remove from favorites"
                      >
                        🗑️
                      </button>
                    </div>
                    <p className="line-clamp-3 text-sm text-gray-700">
                      {joke.setup
                        ? `${joke.setup} ${joke.delivery}`
                        : joke.joke}
                    </p>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                        {joke.source}
                      </span>
                      {(joke.category || joke.type) && (
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                          {joke.category || joke.type}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
