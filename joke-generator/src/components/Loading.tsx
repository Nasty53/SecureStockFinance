import { motion } from "framer-motion";

interface LoadingProps {
  message?: string;
}

export default function Loading({ message = "Loading..." }: LoadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <div className="relative h-16 w-16">
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-600 border-r-primary-600"
        />
        {/* Inner ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 rounded-full border-4 border-transparent border-b-primary-400"
        />
      </div>
      <p className="mt-4 text-center text-lg font-medium text-primary-600">
        {message}
      </p>
      <p className="mt-1 text-sm text-gray-500">Fetching something hilarious...</p>
    </motion.div>
  );
}
