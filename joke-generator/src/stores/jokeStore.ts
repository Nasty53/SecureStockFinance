import { create } from "zustand";
import { Joke } from "../types";
import { getRandomJoke, getJokeFromSource } from "../services/jokeService";

interface JokeStore {
  currentJoke: Joke | null;
  jokes: Joke[];
  isLoading: boolean;
  error: string | null;
  selectedSource: string;
  isFavorited: boolean;

  fetchRandomJoke: () => Promise<void>;
  fetchJokeFromSource: (source: string) => Promise<void>;
  addToFavorites: () => void;
  removeFromFavorites: (id: string) => void;
  clearError: () => void;
  setSelectedSource: (source: string) => void;
  getFavoriteJokes: () => Joke[];
}

export const useJokeStore = create<JokeStore>()((set, get) => ({
  currentJoke: null,
  jokes: [],
  isLoading: false,
  error: null,
  selectedSource: "random",
  isFavorited: false,

  fetchRandomJoke: async () => {
    set({ isLoading: true, error: null });
    try {
      const joke = await getRandomJoke();
      set((state) => ({
        currentJoke: joke,
        isFavorited: state.jokes.some((j) => j.id === joke.id),
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch joke",
        isLoading: false,
      });
    }
  },

  fetchJokeFromSource: async (source: string) => {
    set({ isLoading: true, error: null, selectedSource: source });
    try {
      const joke = await getJokeFromSource(source);
      set((state) => ({
        currentJoke: joke,
        isFavorited: state.jokes.some((j) => j.id === joke.id),
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch joke",
        isLoading: false,
      });
    }
  },

  addToFavorites: () => {
    set((state) => {
      if (state.currentJoke && !state.jokes.some((j) => j.id === state.currentJoke?.id)) {
        return {
          jokes: [...state.jokes, state.currentJoke],
          isFavorited: true,
        };
      }
      return { isFavorited: true };
    });
  },

  removeFromFavorites: (id: string) => {
    set((state) => {
      const updatedJokes = state.jokes.filter((j) => j.id !== id);
      return {
        jokes: updatedJokes,
        isFavorited: state.currentJoke?.id === id ? false : state.isFavorited,
      };
    });
  },

  clearError: () => set({ error: null }),

  setSelectedSource: (source: string) => set({ selectedSource: source }),

  getFavoriteJokes: () => get().jokes,
}));
