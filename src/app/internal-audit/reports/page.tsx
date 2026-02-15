'use client';

import { MotionWrapper } from '@/components/ui/motion/MotionWrapper';
import { FileText, Download, Eye } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    { id: 1, title: 'تقرير مراجعة دورة المشتريات - Q4 2024', type: 'نهائي', date: '2025-01-15', findings: 8, status: 'معتمد' },
    { id: 2, title: 'تقرير مراجعة المبيعات', type: 'مبدئي', date: '2025-01-10', findings: 5, status: 'قيد المراجعة' },
    { id: 3, title: 'التقرير الربع سنوي - Q4 2024', type: 'ربع سنوي', date: '2025-01-05', findings: 24, status: 'معتمد' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="container mx-auto max-w-7xl">
        <MotionWrapper animation="slideDown" delay={0.1}>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">
            التقارير
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            تقارير المراجعة والنتائج والتوصيات
          </p>
        </MotionWrapper>

        <div className="grid grid-cols-1 gap-6">
          {reports.map((report, index) => (
            <MotionWrapper key={report.id} animation="fadeIn" delay={0.1 * (index + 1)}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{report.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>نوع: {report.type}</span>
                        <span>التاريخ: {report.date}</span>
                        <span>النتائج: {report.findings}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          report.status === 'معتمد' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {report.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
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
