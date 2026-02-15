'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MotionWrapper } from '@/components/ui/motion/MotionWrapper';
import {
  Shield,
  TrendingUp,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  BarChart3,
  FileCheck,
  Target,
  ArrowRight
} from 'lucide-react';

export default function InternalAuditPage() {
  const [stats] = useState({
    totalRisks: 127,
    criticalRisks: 18,
    highRisks: 34,
    completedAudits: 45,
    ongoingAudits: 12,
    scheduledAudits: 23,
    openFindings: 89,
    overdueActions: 15
  });

  const modules = [
    {
      title: 'لوحة المعلومات',
      description: 'عرض شامل لجميع أنشطة المراجعة والمخاطر',
      icon: BarChart3,
      href: '/internal-audit/dashboard',
      color: 'bg-blue-500',
      stats: `${stats.totalRisks} مخاطرة مسجلة`
    },
    {
      title: 'تقييم المخاطر',
      description: 'تحديد وتقييم وإدارة المخاطر المؤسسية',
      icon: AlertTriangle,
      href: '/internal-audit/risk-assessment',
      color: 'bg-red-500',
      stats: `${stats.criticalRisks} مخاطر حرجة`
    },
    {
      title: 'التحليل المالي',
      description: 'أداة ذكية لتحليل القوائم المالية وحساب النسب',
      icon: TrendingUp,
      href: '/internal-audit/financial-analysis',
      color: 'bg-green-500',
      stats: 'تحليل ذكي بالـ AI'
    },
    {
      title: 'خطط المراجعة',
      description: 'إدارة خطة المراجعة السنوية المبنية على المخاطر',
      icon: Target,
      href: '/internal-audit/audit-plans',
      color: 'bg-purple-500',
      stats: `${stats.completedAudits + stats.ongoingAudits + stats.scheduledAudits} خطة`
    },
    {
      title: 'التقارير',
      description: 'تقارير المراجعة والنتائج والتوصيات',
      icon: FileText,
      href: '/internal-audit/reports',
      color: 'bg-orange-500',
      stats: `${stats.openFindings} نتيجة مفتوحة`
    },
    {
      title: 'الامتثال والحوكمة',
      description: 'متابعة الامتثال للمعايير والسياسات',
      icon: Shield,
      href: '/internal-audit/compliance',
      color: 'bg-indigo-500',
      stats: 'معايير IIA, COSO, ISO'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <MotionWrapper animation="slideDown" delay={0.1}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    نظام إدارة المراجعة الداخلية
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Internal Audit Management System - Powered by AI
                  </p>
                </div>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <MotionWrapper animation="fadeIn" delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">إجمالي المخاطر</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalRisks}</p>
                  <p className="text-sm text-red-600 mt-1">{stats.criticalRisks} حرج</p>
                </div>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">المراجعات المكتملة</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.completedAudits}</p>
                  <p className="text-sm text-green-600 mt-1">من أصل {stats.completedAudits + stats.ongoingAudits + stats.scheduledAudits}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">النتائج المفتوحة</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.openFindings}</p>
                  <p className="text-sm text-orange-600 mt-1">{stats.overdueActions} متأخرة</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                  <FileCheck className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">المراجعات الجارية</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.ongoingAudits}</p>
                  <p className="text-sm text-blue-600 mt-1">{stats.scheduledAudits} مجدولة</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </MotionWrapper>

        {/* Main Modules */}
        <MotionWrapper animation="fadeIn" delay={0.3}>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">الوحدات الرئيسية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module, index) => (
                <Link key={index} href={module.href}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group">
                    <div className={`w-14 h-14 ${module.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <module.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {module.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                        {module.stats}
                      </span>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </MotionWrapper>

        {/* Features Section */}
        <MotionWrapper animation="fadeIn" delay={0.4}>
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 shadow-2xl text-white">
            <h2 className="text-2xl font-bold mb-6">مميزات النظام</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">تحليل مالي ذكي</h3>
                  <p className="text-sm text-white/80">تحليل تلقائي للقوائم المالية بالذكاء الاصطناعي</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">تقييم مخاطر آلي</h3>
                  <p className="text-sm text-white/80">تحديد وتصنيف المخاطر تلقائياً</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">خطط مبنية على المخاطر</h3>
                  <p className="text-sm text-white/80">برنامج مراجعة سنوي ديناميكي</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">تقارير احترافية</h3>
                  <p className="text-sm text-white/80">تقارير مفصلة وتنفيذية جاهزة</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">امتثال كامل</h3>
                  <p className="text-sm text-white/80">متوافق مع معايير IIA, COSO, ISO</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">إدارة الفريق</h3>
                  <p className="text-sm text-white/80">توزيع المهام وتتبع الأداء</p>
                </div>
              </div>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </div>
  );
}
