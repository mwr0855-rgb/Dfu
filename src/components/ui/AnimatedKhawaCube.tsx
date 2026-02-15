'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedKhawaCubeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
  interactive?: boolean;
}

const sizeMap = {
  sm: { cube: 'w-16 h-16', text: 'text-sm' },
  md: { cube: 'w-24 h-24', text: 'text-lg' },
  lg: { cube: 'w-32 h-32', text: 'text-2xl' },
};

export default function AnimatedKhawaCube({
  size = 'md',
  className = '',
  showText = true,
  interactive = true,
}: AnimatedKhawaCubeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const { cube, text } = sizeMap[size];

  const cubeVariants: any = {
    initial: {
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
    },
    animate: {
      rotateX: [0, 360],
      rotateY: [0, 360],
      rotateZ: [0, 360],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'linear',
      },
    },
    hover: {
      rotateX: [0, 360],
      rotateY: [0, 360],
      rotateZ: [0, 360],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  const textVariants: any = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
      },
    },
  };

  const containerVariants: any = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className={`flex flex-col items-center justify-center gap-4 ${className}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* 3D Cube Container */}
      <motion.div
        className={`relative ${cube} cursor-pointer`}
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d' as any,
        }}
        onHoverStart={() => interactive && setIsHovered(true)}
        onHoverEnd={() => interactive && setIsHovered(false)}
        variants={cubeVariants}
        initial="initial"
        animate={isHovered ? 'hover' : 'animate'}
      >
        {/* Cube Faces */}
        {/* Front Face - خ */}
        <motion.div
          className="absolute w-full h-full bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg border border-indigo-400/50"
        style={{
          backfaceVisibility: 'hidden' as any,
          transform: 'translateZ(var(--cube-depth))',
        }}
          initial={{ '--cube-depth': '48px' } as any}
        >
          <span className={`${text} font-bold text-white select-none`}>خ</span>
        </motion.div>

        {/* Back Face - ط */}
        <motion.div
          className="absolute w-full h-full bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg border border-purple-400/50"
        style={{
          backfaceVisibility: 'hidden' as any,
          transform: 'rotateY(180deg) translateZ(var(--cube-depth))',
        }}
          initial={{ '--cube-depth': '48px' } as any}
        >
          <span className={`${text} font-bold text-white select-none`}>ط</span>
        </motion.div>

        {/* Right Face - و */}
        <motion.div
          className="absolute w-full h-full bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg border border-pink-400/50"
        style={{
          backfaceVisibility: 'hidden' as any,
          transform: 'rotateY(90deg) translateZ(var(--cube-depth))',
        }}
          initial={{ '--cube-depth': '48px' } as any}
        >
          <span className={`${text} font-bold text-white select-none`}>و</span>
        </motion.div>

        {/* Left Face - ة */}
        <motion.div
          className="absolute w-full h-full bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg border border-cyan-400/50"
        style={{
          backfaceVisibility: 'hidden' as any,
          transform: 'rotateY(-90deg) translateZ(var(--cube-depth))',
        }}
          initial={{ '--cube-depth': '48px' } as any}
        >
          <span className={`${text} font-bold text-white select-none`}>ة</span>
        </motion.div>

        {/* Top Face - Kh */}
        <motion.div
          className="absolute w-full h-full bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-lg border border-amber-400/50"
        style={{
          backfaceVisibility: 'hidden' as any,
          transform: 'rotateX(90deg) translateZ(var(--cube-depth))',
        }}
          initial={{ '--cube-depth': '48px' } as any}
        >
          <span className={`${text} font-bold text-white select-none`}>K</span>
        </motion.div>

        {/* Bottom Face - ha */}
        <motion.div
          className="absolute w-full h-full bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg border border-emerald-400/50"
        style={{
          backfaceVisibility: 'hidden' as any,
          transform: 'rotateX(-90deg) translateZ(var(--cube-depth))',
        }}
          initial={{ '--cube-depth': '48px' } as any}
        >
          <span className={`${text} font-bold text-white select-none`}>H</span>
        </motion.div>
      </motion.div>

      {/* Text Below Cube */}
      {showText && (
        <motion.div
          className="text-center"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            خطة
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            منصة التدريب والاستشارات
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
