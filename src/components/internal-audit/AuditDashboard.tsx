'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Users,
  TrendingUp,
  Plus,
  Filter,
  Download,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/primitives';

interface AuditPlan {
  id: string;
  name: string;
  department: string;
  startDate: string;
  endDate: string;
  status: 'planned' | 'in-progress' | 'completed';
  riskLevel: 'low' | 'medium' | 'high';
  progress: number;
}

interface RiskAssessment {
  id: string;
  riskName: string;
  inherentRisk: 'low' | 'medium' | 'high';
  residualRisk: 'low' | 'medium' | 'high';
  controlMeasure: string;
  owner: string;
}

const sampleAuditPlans: AuditPlan[] = [
  {
    id: '1',
    name: 'مراجعة الدورة المالية',
    department: 'المالية',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    status: 'in-progress',
    riskLevel: 'high',
    progress: 65,
  },
  {
    id: '2',
    name: 'مراجعة الموارد البشرية',
    department: 'الموارد البشرية',
    startDate: '2024-02-01',
    endDate: '2024-03-01',
    status: 'planned',
    riskLevel: 'medium',
    progress: 0,
  },
];

const riskAssessments: RiskAssessment[] = [
  {
    id: '1',
    riskName: 'مخاطر العمليات المالية',
    inherentRisk: 'high',
    residualRisk: 'medium',
    controlMeasure: 'تطبيق نظام مراقبة داخلية قوي',
    owner: 'مدير المالية',
  },
  {
    id: '2',
    riskName: 'مخاطر الامتثال',
    inherentRisk: 'medium',
    residualRisk: 'low',
    controlMeasure: 'تدريب موظفين منتظم',
    owner: 'مدير الامتثال',
  },
];

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    } as any,
  },
};

const itemVariants: any = {
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
};

const getRiskColor = (level: string) => {
  switch (level) {
    case 'high':
      return 'from-red-500 to-red-600';
    case 'medium':
      return 'from-amber-500 to-amber-600';
    case 'low':
      return 'from-green-500 to-green-600';
    default:
      return 'from-gray-500 to-gray-600';
  }
};

const getRiskLabel = (level: string) => {
  switch (level) {
    case 'high':
      return 'مرتفع';
    case 'medium':
      return 'متوسط';
    case 'low':
      return 'منخفض';
    default:
      return 'غير محدد';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'planned':
      return 'مخطط';
    case 'in-progress':
      return 'قيد التنفيذ';
    case 'completed':
      return 'مكتمل';
    default:
      return 'غير محدد';
  }
};

export default function AuditDashboard() {
  const [activeTab, setActiveTab] = useState<'plans' | 'risks' | 'workpapers'>('plans');

  return (
    <Container size="xl" className="py-12">
      {/* Header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
              نظام إدارة المراجعة الداخلية
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              إدارة شاملة لخطط المراجعة وتقييم المخاطر وأوراق العمل
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <Filter className="w-4 h-4" />
              تصفية
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4" />
              جديد
            </Button>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { icon: BarChart3, label: 'خطط المراجعة', value: '12', color: 'from-indigo-500 to-indigo-600' },
            { icon: AlertTriangle, label: 'مخاطر مكتشفة', value: '8', color: 'from-red-500 to-red-600' },
            { icon: CheckCircle2, label: 'نقاط قوة', value: '24', color: 'from-green-500 to-green-600' },
            { icon: Clock, label: 'مراجعات قيد التنفيذ', value: '3', color: 'from-amber-500 to-amber-600' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} text-white mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stat.value}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="mb-8 flex gap-2 border-b border-neutral-200 dark:border-neutral-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[
          { id: 'plans', label: 'خطط المراجعة', icon: FileText },
          { id: 'risks', label: 'تقييم المخاطر', icon: AlertTriangle },
          { id: 'workpapers', label: 'أوراق العمل', icon: BarChart3 },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </motion.div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Audit Plans Tab */}
        {activeTab === 'plans' && (
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {sampleAuditPlans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {plan.department}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getRiskColor(plan.riskLevel)}`}
                    >
                      {getRiskLabel(plan.riskLevel)}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300">
                      {getStatusLabel(plan.status)}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">التقدم</span>
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                      {plan.progress}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${plan.progress}%` }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
                  <span>
                    {plan.startDate} إلى {plan.endDate}
                  </span>
                  <button className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                    عرض التفاصيل
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Risk Assessment Tab */}
        {activeTab === 'risks' && (
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {riskAssessments.map((risk) => (
              <motion.div
                key={risk.id}
                variants={itemVariants}
                className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                      {risk.riskName}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                      المالك: {risk.owner}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">المخاطر المتأصلة</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getRiskColor(risk.inherentRisk)}`}
                    >
                      {getRiskLabel(risk.inherentRisk)}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">المخاطر المتبقية</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getRiskColor(risk.residualRisk)}`}
                    >
                      {getRiskLabel(risk.residualRisk)}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">تقليل المخاطر</p>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-700/30 rounded-lg p-4">
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">إجراء التحكم</p>
                  <p className="text-sm text-neutral-900 dark:text-white">{risk.controlMeasure}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Work Papers Tab */}
        {activeTab === 'workpapers' && (
          <motion.div
            className="bg-white dark:bg-neutral-800 rounded-lg p-8 border border-neutral-200 dark:border-neutral-700 text-center"
            variants={itemVariants}
          >
            <FileText className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
              أوراق العمل
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              إدارة شاملة لأوراق العمل والأدلة والإجراءات المتخذة
            </p>
            <Button>
              <Plus className="w-4 h-4" />
              إنشاء ورقة عمل جديدة
            </Button>
          </motion.div>
        )}
      </motion.div>
    </Container>
  );
}
