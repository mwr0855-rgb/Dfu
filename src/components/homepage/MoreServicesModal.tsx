'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Brain,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/routes';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
  badge?: string;
}

const services: ServiceItem[] = [
  {
    id: 'consulting',
    title: 'الاستشارات المهنية',
    description: 'احصل على استشارات فردية مع خبراء في المراجعة الداخلية والمحاسبة',
    icon: MessageSquare,
    href: ROUTES.CONSULTING || '/consulting',
    color: 'from-indigo-500 to-purple-600',
    badge: 'جديد',
  },
  {
    id: 'ai-tools',
    title: 'أدوات الذكاء الاصطناعي',
    description: 'استخدم أدوات ذكية لتحليل البيانات المالية والتقارير',
    icon: Brain,
    href: ROUTES.AI_TOOLS || '/ai-tools',
    color: 'from-cyan-500 to-blue-600',
    badge: 'متقدم',
  },
  {
    id: 'packages',
    title: 'الباقات والبرامج',
    description: 'برامج متخصصة لتطوير مهاراتك المهنية والإدارية',
    icon: Sparkles,
    href: ROUTES.PACKAGES || '/packages-and-consulting',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'community',
    title: 'المجتمع والشبكات',
    description: 'تواصل مع متخصصين وشارك خبراتك في مجتمع متنامي',
    icon: Users,
    href: ROUTES.COMMUNITY || '/community',
    color: 'from-pink-500 to-rose-600',
  },
];

interface MoreServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MoreServicesModal({
  isOpen,
  onClose,
}: MoreServicesModalProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const modalVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: { opacity: 0 },
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 300,
      } as any,
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
  } as any;

  const serviceVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 20,
        stiffness: 300,
      } as any,
    },
  } as any;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 flex items-center justify-between z-10">
                <div>
                  <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Sparkles className="w-8 h-8" />
                    المزيد من الخدمات
                  </h2>
                  <p className="text-indigo-100 mt-2">اكتشف كل ما تقدمه منصة خطة</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="إغلاق"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Content */}
              <motion.div
                className="p-6 lg:p-8"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((service) => {
                    const Icon = service.icon;
                    return (
                      <motion.div
                        key={service.id}
                        variants={serviceVariants}
                        onHoverStart={() => setHoveredId(service.id)}
                        onHoverEnd={() => setHoveredId(null)}
                      >
                        <Link href={service.href}>
                          <div className="relative h-full group cursor-pointer">
                            {/* Background gradient */}
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}
                            />

                            {/* Card */}
                            <div className="relative h-full p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors duration-300 bg-white dark:bg-neutral-800/50">
                              {/* Badge */}
                              {service.badge && (
                                <div className="absolute top-4 right-4">
                                  <span
                                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${service.color}`}
                                  >
                                    <Zap className="w-3 h-3" />
                                    {service.badge}
                                  </span>
                                </div>
                              )}

                              {/* Icon */}
                              <div
                                className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} text-white mb-4`}
                              >
                                <Icon className="w-6 h-6" />
                              </div>

                              {/* Title */}
                              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                                {service.title}
                              </h3>

                              {/* Description */}
                              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                                {service.description}
                              </p>

                              {/* Arrow */}
                              <motion.div
                                className="inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                                animate={{
                                  x: hoveredId === service.id ? 4 : 0,
                                }}
                              >
                                اكتشف المزيد
                                <ArrowRight className="w-4 h-4" />
                              </motion.div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* CTA Section */}
                <motion.div
                  className="mt-12 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-xl border border-indigo-200 dark:border-indigo-800/30"
                  variants={serviceVariants}
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                        هل تريد معرفة المزيد؟
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        تواصل مع فريقنا للحصول على استشارة مجانية
                      </p>
                    </div>
                    <Link href={ROUTES.CONTACT || '/contact'}>
                      <Button className="whitespace-nowrap">
                        تواصل معنا
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
