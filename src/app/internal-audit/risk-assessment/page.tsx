'use client';

import { useState } from 'react';
import { MotionWrapper } from '@/components/ui/motion/MotionWrapper';
import { KEY_RISKS, DEPARTMENTS } from '@/lib/internal-audit/constants';
import { getRiskColor, calculateRiskScore } from '@/lib/internal-audit/utils';
import { AlertTriangle, Plus, Filter } from 'lucide-react';

export default function RiskAssessmentPage() {
  const [filterLevel, setFilterLevel] = useState<string>('all');

  const filteredRisks = filterLevel === 'all' 
    ? KEY_RISKS 
    : KEY_RISKS.filter(r => r.riskLevel === filterLevel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="container mx-auto max-w-7xl">
        <MotionWrapper animation="slideDown" delay={0.1}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
                تقييم المخاطر
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                تحديد وتقييم وإدارة المخاطر المؤسسية
              </p>
            </div>
            <button className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-2xl transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              إضافة مخاطرة جديدة
            </button>
          </div>
        </MotionWrapper>

        {/* Filter */}
        <MotionWrapper animation="fadeIn" delay={0.2}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg mb-6 flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <div className="flex gap-2">
              <button
                onClick={() => setFilterLevel('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterLevel === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                الكل ({KEY_RISKS.length})
              </button>
              <button
                onClick={() => setFilterLevel('حرج')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterLevel === 'حرج'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                حرج ({KEY_RISKS.filter(r => r.riskLevel === 'حرج').length})
              </button>
              <button
                onClick={() => setFilterLevel('عالي')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterLevel === 'عالي'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                عالي ({KEY_RISKS.filter(r => r.riskLevel === 'عالي').length})
              </button>
              <button
                onClick={() => setFilterLevel('متوسط')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterLevel === 'متوسط'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                متوسط ({KEY_RISKS.filter(r => r.riskLevel === 'متوسط').length})
              </button>
            </div>
          </div>
        </MotionWrapper>

        {/* Risks List */}
        <div className="space-y-4">
          {filteredRisks.map((risk, index) => (
            <MotionWrapper key={risk.id} animation="fadeIn" delay={0.1 * (index % 5 + 1)}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-r-8 hover:shadow-2xl transition-all cursor-pointer"
                   style={{ borderColor: getRiskColor(risk.riskLevel) }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: getRiskColor(risk.riskLevel) }}
                    >
                      {risk.riskScore}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{risk.code}</span>
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: getRiskColor(risk.riskLevel) }}
                        >
                          {risk.riskLevel}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                          {risk.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {risk.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {risk.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          <span className="font-medium">الإدارة:</span> {risk.department}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          <span className="font-medium">المسؤول:</span> {risk.owner}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          risk.status === 'مفتوح' ? 'bg-red-100 text-red-700 dark:bg-red-900/30' :
                          risk.status === 'تحت المراقبة' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30' :
                          'bg-green-100 text-green-700 dark:bg-green-900/30'
                        }`}>
                          {risk.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">المخاطر الأولية</div>
                    <div className="text-2xl font-bold text-red-600">{risk.inherentRisk}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 mt-2">المخاطر المتبقية</div>
                    <div className="text-2xl font-bold text-green-600">{risk.residualRisk}</div>
                  </div>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </div>
  );
}
