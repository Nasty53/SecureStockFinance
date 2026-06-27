import { motion } from "framer-motion";
import { Joke } from "../types";
import { useJokeStore } from "../stores/jokeStore";

interface JokeCardProps {
  joke: Joke;
}

const getCategoryColor = (category?: string, type?: string): string => {
  const combined = (category || type || "").toLowerCase();
  if (combined.includes("general")) return "bg-blue-100 text-blue-800";
  if (combined.includes("knock")) return "bg-yellow-100 text-yellow-800";
  if (combined.includes("programming")) return "bg-purple-100 text-purple-800";
  if (combined.includes("fact")) return "bg-green-100 text-green-800";
  if (combined.includes("advice")) return "bg-pink-100 text-pink-800";
  return "bg-gray-100 text-gray-800";
};

export default function JokeCard({ joke }: JokeCardProps) {
  const { isFavorited, addToFavorites, removeFromFavorites } = useJokeStore();
  const isCurrentFavorited = useJokeStore((state) =>
    state.jokes.some((j) => j.id === joke.id)
  );

  const handleToggleFavorite = () => {
    if (isCurrentFavorited) {
      removeFromFavorites(joke.id);
    } else {
      addToFavorites();
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-2xl border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-white p-8 shadow-lg"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-2">
          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              getCategoryColor(joke.category, joke.type)
            }`}
          >
            {joke.category || joke.type || "Joke"}
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
            {joke.source}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleFavorite}
          className={`text-2xl transition-colors ${
            isCurrentFavorited ? "text-red-500" : "text-gray-400 hover:text-red-400"
          }`}
          title={isCurrentFavorited ? "Remove from favorites" : "Add to favorites"}
        >
          {isCurrentFavorited ? "❤️" : "🤍"}
        </motion.button>
      </div>

      {/* Joke Content */}
      <div className="space-y-4">
        {joke.setup && joke.delivery ? (
          <>
            <div>
              <p className="text-lg font-semibold text-gray-900">{joke.setup}</p>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="rounded-lg bg-primary-600 p-4 text-lg font-bold text-white">
                {joke.delivery}
              </p>
            </motion.div>
          </>
        ) : joke.joke ? (
          <p className="text-xl leading-relaxed text-gray-900">{joke.joke}</p>
        ) : null}
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-primary-200 pt-4">
        <span className="text-sm text-gray-500">
          ⏰ {formatTime(joke.timestamp)}
        </span>
        <span className="text-xs text-gray-400">ID: {joke.id}</span>
      </div>
    </motion.div>
  );
}
