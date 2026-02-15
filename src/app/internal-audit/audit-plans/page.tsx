'use client';

import { MotionWrapper } from '@/components/ui/motion/MotionWrapper';
import { Target, Plus, Calendar, Users, CheckCircle, Clock } from 'lucide-react';

export default function AuditPlansPage() {
  const plans = [
    { id: 1, title: 'مراجعة دورة المشتريات', department: 'المشتريات', status: 'جارية', progress: 65, startDate: '2025-01-15', endDate: '2025-02-15', auditor: 'أحمد محمد' },
    { id: 2, title: 'مراجعة دورة المبيعات', department: 'المبيعات', status: 'مكتملة', progress: 100, startDate: '2024-12-01', endDate: '2025-01-10', auditor: 'فاطمة أحمد' },
    { id: 3, title: 'جرد المخازن السنوي', department: 'المخازن', status: 'مجدولة', progress: 0, startDate: '2025-03-01', endDate: '2025-03-20', auditor: 'محمود علي' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="container mx-auto max-w-7xl">
        <MotionWrapper animation="slideDown" delay={0.1}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                خطط المراجعة
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                إدارة خطة المراجعة السنوية المبنية على المخاطر
              </p>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-2xl transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              خطة مراجعة جديدة
            </button>
          </div>
        </MotionWrapper>

        <div className="grid grid-cols-1 gap-6">
          {plans.map((plan, index) => (
            <MotionWrapper key={plan.id} animation="fadeIn" delay={0.1 * (index + 1)}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        plan.status === 'جارية' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30' :
                        plan.status === 'مكتملة' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' :
                        'bg-gray-100 text-gray-700 dark:bg-gray-700'
                      }`}>
                        {plan.status}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30">
                        {plan.department}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.title}</h3>
                    <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {plan.startDate} - {plan.endDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {plan.auditor}
                      </span>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-3xl font-bold text-purple-600">{plan.progress}%</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">الإنجاز</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${plan.progress}%` }}
                  ></div>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </div>
  );
}
