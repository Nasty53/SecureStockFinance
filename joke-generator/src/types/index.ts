export interface Joke {
  id: string;
  setup?: string;
  delivery?: string;
  joke?: string;
  type: string;
  category?: string;
  source: string;
  timestamp: string;
}

export interface JokeSource {
  name: string;
  url: string;
  description: string;
}
