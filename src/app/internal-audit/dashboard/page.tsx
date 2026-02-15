'use client';

import { useState, useMemo } from 'react';
import { MotionWrapper } from '@/components/ui/motion/MotionWrapper';
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  FileText,
  Users,
  Target,
  BarChart3,
  Shield
} from 'lucide-react';
import { KEY_RISKS, DEPARTMENTS } from '@/lib/internal-audit/constants';
import { 
  categorizeRisksByLevel,
  getRiskColor,
  formatNumber,
  formatPercentage
} from '@/lib/internal-audit/utils';
import type { Risk, RiskLevel } from '@/lib/internal-audit/types';

export default function InternalAuditDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('year');

  // حساب الإحصائيات
  const stats = useMemo(() => {
    const risksByLevel = categorizeRisksByLevel(KEY_RISKS);
    
    return {
      totalRisks: KEY_RISKS.length,
      criticalRisks: risksByLevel['حرج'].length,
      highRisks: risksByLevel['عالي'].length,
      mediumRisks: risksByLevel['متوسط'].length,
      lowRisks: risksByLevel['منخفض'].length,
      openRisks: KEY_RISKS.filter(r => r.status === 'مفتوح').length,
      underMonitoringRisks: KEY_RISKS.filter(r => r.status === 'تحت المراقبة').length,
      closedRisks: KEY_RISKS.filter(r => r.status === 'مغلق').length,
      avgInherentRisk: Math.round(
        KEY_RISKS.reduce((sum, r) => sum + r.inherentRisk, 0) / KEY_RISKS.length
      ),
      avgResidualRisk: Math.round(
        KEY_RISKS.reduce((sum, r) => sum + r.residualRisk, 0) / KEY_RISKS.length
      )
    };
  }, []);

  const riskTrend = useMemo(() => {
    return [
      { month: 'يناير', critical: 12, high: 28, medium: 45, low: 20 },
      { month: 'فبراير', critical: 14, high: 30, medium: 43, low: 22 },
      { month: 'مارس', critical: 16, high: 32, medium: 40, low: 25 },
      { month: 'أبريل', critical: 15, high: 34, medium: 42, low: 23 },
      { month: 'مايو', critical: 17, high: 35, medium: 38, low: 28 },
      { month: 'يونيو', critical: stats.criticalRisks, high: stats.highRisks, medium: stats.mediumRisks, low: stats.lowRisks }
    ];
  }, [stats]);

  const departmentRisks = useMemo(() => {
    return DEPARTMENTS.map(dept => ({
      name: dept.name,
      riskCount: dept.riskCount,
      priority: dept.priority,
      nextAudit: dept.nextAuditDate
    })).sort((a, b) => b.riskCount - a.riskCount).slice(0, 5);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <MotionWrapper animation="slideDown" delay={0.1}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                لوحة قيادة المراجعة الداخلية
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                نظرة شاملة على المخاطر والمراجعات والأداء
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedPeriod('month')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedPeriod === 'month'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                شهري
              </button>
              <button
                onClick={() => setSelectedPeriod('quarter')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedPeriod === 'quarter'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                ربع سنوي
              </button>
              <button
                onClick={() => setSelectedPeriod('year')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedPeriod === 'year'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                سنوي
              </button>
            </div>
          </div>
        </MotionWrapper>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MotionWrapper animation="scaleIn" delay={0.2}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-sm font-medium text-red-600 bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full">
                  +12% عن الشهر الماضي
                </span>
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">إجمالي المخاطر</h3>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stats.totalRisks}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-red-600 font-medium">{stats.criticalRisks} حرج</span>
                <span className="text-orange-600 font-medium">{stats.highRisks} عالي</span>
              </div>
            </div>
          </MotionWrapper>

          <MotionWrapper animation="scaleIn" delay={0.3}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm font-medium text-green-600 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                  +5 هذا الشهر
                </span>
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">المراجعات المكتملة</h3>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">45</p>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <span className="text-gray-600 dark:text-gray-400">75%</span>
              </div>
            </div>
          </MotionWrapper>

          <MotionWrapper animation="scaleIn" delay={0.4}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                  تحسن 18%
                </span>
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">متوسط المخاطر المتبقية</h3>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stats.avgResidualRisk}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                من {stats.avgInherentRisk} (المخاطر الأولية)
              </p>
            </div>
          </MotionWrapper>

          <MotionWrapper animation="scaleIn" delay={0.5}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-orange-600 bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full">
                  تحتاج متابعة
                </span>
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">إجراءات متأخرة</h3>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">15</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                من أصل 89 إجراء مفتوح
              </p>
            </div>
          </MotionWrapper>
        </div>

        {/* Charts and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Risk Distribution */}
          <MotionWrapper animation="fadeIn" delay={0.6}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                توزيع المخاطر حسب المستوى
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">مخاطر حرجة</span>
                    <span className="text-sm font-bold text-red-600">{stats.criticalRisks}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-red-700 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(stats.criticalRisks / stats.totalRisks) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formatPercentage((stats.criticalRisks / stats.totalRisks) * 100)}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">مخاطر عالية</span>
                    <span className="text-sm font-bold text-orange-600">{stats.highRisks}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(stats.highRisks / stats.totalRisks) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formatPercentage((stats.highRisks / stats.totalRisks) * 100)}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">مخاطر متوسطة</span>
                    <span className="text-sm font-bold text-yellow-600">{stats.mediumRisks}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(stats.mediumRisks / stats.totalRisks) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formatPercentage((stats.mediumRisks / stats.totalRisks) * 100)}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">مخاطر منخفضة</span>
                    <span className="text-sm font-bold text-green-600">{stats.lowRisks}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(stats.lowRisks / stats.totalRisks) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formatPercentage((stats.lowRisks / stats.totalRisks) * 100)}
                  </span>
                </div>
              </div>
            </div>
          </MotionWrapper>

          {/* Top Risk Departments */}
          <MotionWrapper animation="fadeIn" delay={0.7}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-purple-600" />
                الإدارات الأكثر مخاطرة
              </h3>
              
              <div className="space-y-4">
                {departmentRisks.map((dept, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:shadow-md transition-all">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white ${
                      index === 0 ? 'bg-red-500' :
                      index === 1 ? 'bg-orange-500' :
                      'bg-yellow-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-gray-900 dark:text-white">{dept.name}</h4>
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                          dept.priority === 'عالية' 
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {dept.priority}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>{dept.riskCount} مخاطرة</span>
                        <span>المراجعة القادمة: {dept.nextAudit}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MotionWrapper>
        </div>

        {/* Recent Activity */}
        <MotionWrapper animation="fadeIn" delay={0.8}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              النشاط الأخير
            </h3>
            
            <div className="space-y-4">
              {[
                { type: 'risk', title: 'تم تحديد مخاطرة جديدة في إدارة المشتريات', time: 'قبل ساعتين', severity: 'عالي' },
                { type: 'audit', title: 'اكتمال مراجعة دورة المبيعات', time: 'قبل 5 ساعات', severity: 'جيد' },
                { type: 'finding', title: '3 نتائج جديدة تحتاج متابعة في المخازن', time: 'قبل يوم', severity: 'متوسط' },
                { type: 'report', title: 'تم إصدار تقرير ربع سنوي', time: 'قبل 2 يوم', severity: 'عادي' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.severity === 'عالي' ? 'bg-red-500' :
                    activity.severity === 'متوسط' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MotionWrapper>
      </div>
    </div>
  );
}
