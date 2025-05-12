import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LoaderProps {
  isLoading?: boolean;
  message?: string;
}

export default function Loader({ isLoading = true, message }: LoaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-md">
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-20 w-20">
          {/* Spinner circles */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * Math.PI) / 4;
            const x = Math.cos(angle) * 36;
            const y = Math.sin(angle) * 36;
            const delay = i * 0.15;

            return (
              <motion.div
                key={i}
                className="absolute h-4 w-4 rounded-full bg-black shadow-glow"
                style={{
                  left: `calc(50% - 8px + ${x}px)`,
                  top: `calc(50% - 8px + ${y}px)`,
                  boxShadow: "0 0 10px 2px rgba(0, 0, 0, 0.3)",
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: delay,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* Center circle */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/90"
            style={{
              boxShadow: "0 0 15px 5px rgba(0, 0, 0, 0.2)",
            }}
            animate={{
              scale: [0.8, 1, 0.8],
              rotate: 360,
            }}
            transition={{
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
              rotate: {
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          />
        </div>

        {message && (
          <motion.p
            className="text-center text-xl font-bold text-black drop-shadow-sm"
            style={{
              textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {message}
          </motion.p>
        )}
      </div>
    </div>
  );
}
