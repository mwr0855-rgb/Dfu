'use client';

import { MotionWrapper } from '@/components/ui/motion/MotionWrapper';
import { Shield, CheckCircle } from 'lucide-react';
import { COMPLIANCE_STANDARDS } from '@/lib/internal-audit/constants';

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="container mx-auto max-w-7xl">
        <MotionWrapper animation="slideDown" delay={0.1}>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            الامتثال والحوكمة
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            متابعة الامتثال للمعايير والسياسات الدولية
          </p>
        </MotionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COMPLIANCE_STANDARDS.map((standard, index) => (
            <MotionWrapper key={standard.id} animation="scaleIn" delay={0.1 * (index + 1)}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{standard.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{standard.nameEn}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{standard.description}</p>
                    <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium">
                      <CheckCircle className="w-4 h-4" />
                      <span>متوافق</span>
                    </div>
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
