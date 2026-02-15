'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface FreeStartButtonProps {
  courseId: string;
  courseName: string;
  isEnabled?: boolean;
  questionCount?: number;
  onClick?: () => void;
}

export default function FreeStartButton({
  courseId,
  courseName,
  isEnabled = true,
  questionCount = 10,
  onClick,
}: FreeStartButtonProps) {
  if (!isEnabled) return null;

  const handleClick = () => {
    onClick?.();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <Link
        href={`/courses/${courseId}/free-questions?limit=${questionCount}`}
        onClick={handleClick}
      >
        <button
          className="w-full relative group overflow-hidden rounded-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-0.5 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/50"
          aria-label={`ابدأ ${courseName} مجاناً - ${questionCount} أسئلة`}
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Button content */}
          <div className="relative bg-white dark:bg-neutral-900 rounded-md px-4 py-2.5 flex items-center justify-center gap-2 group-hover:bg-transparent transition-colors duration-300">
            <Sparkles className="w-4 h-4 text-emerald-600 group-hover:text-white transition-colors duration-300" />
            <span className="text-sm font-bold text-emerald-700 group-hover:text-white transition-colors duration-300">
              ابدأ مجاناً
            </span>
            <span className="text-xs text-emerald-600 group-hover:text-white transition-colors duration-300">
              ({questionCount} أسئلة)
            </span>
            <ArrowLeft className="w-3 h-3 text-emerald-600 group-hover:text-white transition-colors duration-300 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </Link>
    </motion.div>
  );
}
