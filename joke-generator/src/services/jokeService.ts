import axios from "axios";
import { Joke } from "../types";

// JokeAPI (https://jokeapi.dev/)
const fetchFromJokeAPI = async (): Promise<Joke> => {
  try {
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any?format=json");
    const data = response.data;

    return {
      id: Math.random().toString(36).substring(2, 11),
      setup: data.setup,
      delivery: data.delivery,
      joke: data.joke,
      type: data.type,
      category: data.category,
      source: "JokeAPI",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    throw new Error("Failed to fetch from JokeAPI");
  }
};

// Official Joke API (https://official-joke-api.appspot.com/)
const fetchFromOfficialJokeAPI = async (): Promise<Joke> => {
  try {
    const response = await axios.get(
      "https://official-joke-api.appspot.com/random_joke"
    );
    const data = response.data;

    return {
      id: data.id?.toString() || Math.random().toString(36).substring(2, 11),
      setup: data.setup,
      delivery: data.delivery,
      type: data.type,
      category: data.category,
      source: "Official Joke API",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    throw new Error("Failed to fetch from Official Joke API");
  }
};

// Useless Facts API (https://uselessfacts.jsph.pl/)
const fetchFromUselessFactsAPI = async (): Promise<Joke> => {
  try {
    const response = await axios.get(
      "https://uselessfacts.jsph.pl/random.json?language=en"
    );
    const data = response.data;

    return {
      id: Math.random().toString(36).substring(2, 11),
      joke: data.text,
      type: "fact",
      source: "Useless Facts API",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    throw new Error("Failed to fetch from Useless Facts API");
  }
};

// Advice Slip API (https://api.adviceslip.com/)
const fetchFromAdviceSlipAPI = async (): Promise<Joke> => {
  try {
    const response = await axios.get("https://api.adviceslip.com/advice");
    const data = response.data;

    return {
      id: data.slip_id?.toString() || Math.random().toString(36).substring(2, 11),
      joke: data.slip,
      type: "advice",
      source: "Advice Slip API",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    throw new Error("Failed to fetch from Advice Slip API");
  }
};

// Get random joke from a random source
export const getRandomJoke = async (): Promise<Joke> => {
  const sources = [
    fetchFromJokeAPI,
    fetchFromOfficialJokeAPI,
    fetchFromUselessFactsAPI,
    fetchFromAdviceSlipAPI,
  ];

  const randomSource = sources[Math.floor(Math.random() * sources.length)];
  return randomSource();
};

// Get joke from specific source
export const getJokeFromSource = async (source: string): Promise<Joke> => {
  switch (source) {
    case "jokeapi":
      return fetchFromJokeAPI();
    case "official":
      return fetchFromOfficialJokeAPI();
    case "facts":
      return fetchFromUselessFactsAPI();
    case "advice":
      return fetchFromAdviceSlipAPI();
    default:
      return getRandomJoke();
  }
};

export const jokeAPISources = [
  {
    name: "JokeAPI",
    url: "https://jokeapi.dev/",
    description: "Comprehensive joke API with multiple categories",
  },
  {
    name: "Official Joke API",
    url: "https://official-joke-api.appspot.com/",
    description: "Simple and reliable joke API",
  },
  {
    name: "Useless Facts",
    url: "https://uselessfacts.jsph.pl/",
    description: "Random useless facts and trivia",
  },
  {
    name: "Advice Slip",
    url: "https://api.adviceslip.com/",
    description: "Random advice and wisdom",
  },
];
