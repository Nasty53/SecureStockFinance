import { useState } from "react";
import { useJokeStore } from "../stores/jokeStore";
import { jokeAPISources } from "../services/jokeService";

export default function SourceSelector() {
  const { selectedSource, setSelectedSource, fetchJokeFromSource } = useJokeStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleSourceChange = (source: string) => {
    setSelectedSource(source);
    setIsOpen(false);
    if (source === "random") {
      // fetchRandomJoke is called from main component
    } else {
      fetchJokeFromSource(source);
    }
  };

  const getSourceLabel = (source: string) => {
    if (source === "random") return "🎲 Random Source";
    const found = jokeAPISources.find(
      (s) => s.name.toLowerCase().replace(/\s+/g, "") === source
    );
    return found ? `📌 ${found.name}` : "Select Source";
  };

  return (
    <div className="relative inline-block w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-lg border-2 border-primary-300 bg-white px-4 py-3 text-left font-medium text-gray-900 hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
      >
        <div className="flex items-center justify-between">
          <span>{getSourceLabel(selectedSource)}</span>
          <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
            ▼
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-lg border-2 border-primary-200 bg-white shadow-lg">
          <button
            onClick={() => handleSourceChange("random")}
            className={`w-full px-4 py-3 text-left font-medium transition-colors hover:bg-primary-100 ${
              selectedSource === "random"
                ? "bg-primary-100 text-primary-700"
                : "text-gray-700"
            }`}
          >
            🎲 Random Source
          </button>
          {jokeAPISources.map((source) => (
            <div key={source.name}>
              <button
                onClick={() =>
                  handleSourceChange(
                    source.name.toLowerCase().replace(/\s+/g, "")
                  )
                }
                className={`w-full px-4 py-3 text-left font-medium transition-colors hover:bg-primary-100 ${
                  selectedSource ===
                  source.name.toLowerCase().replace(/\s+/g, "")
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-700"
                }`}
              >
                <div className="font-semibold">{source.name}</div>
                <div className="text-xs text-gray-500">{source.description}</div>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
