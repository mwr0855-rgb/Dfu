'use client';

import { useState } from 'react';
import { MotionWrapper } from '@/components/ui/motion/MotionWrapper';
import { Upload, TrendingUp, TrendingDown, FileText, DollarSign, BarChart3, PieChart, Download } from 'lucide-react';

export default function FinancialAnalysisPage() {
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setLoading(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        companyName: 'شركة الابتكار التجارية',
        period: { from: '2024-01-01', to: '2024-12-31' },
        overallScore: 78,
        riskRating: 'متوسط',
        ratios: {
          liquidity: { currentRatio: 1.8, quickRatio: 1.2, cashRatio: 0.6 },
          profitability: { grossProfitMargin: 32.5, netProfitMargin: 12.3, roa: 8.5, roe: 15.2 },
          leverage: { debtToEquity: 0.8, debtRatio: 0.45, interestCoverage: 5.2 }
        },
        strengths: [
          'نسبة سيولة جيدة تدل على قدرة قوية على الوفاء بالالتزامات القصيرة الأجل',
          'هامش ربح صافي جيد 12.3% يفوق متوسط القطاع',
          'عائد جيد على حقوق الملكية 15.2%'
        ],
        weaknesses: [
          'نسبة المديونية مرتفعة نسبياً قد تشكل ضغطاً على التدفقات النقدية',
          'تراجع طفيف في هامش الربح التشغيلي مقارنة بالعام الماضي'
        ],
        redFlags: [
          'زيادة في مستوى المخزون قد تشير إلى بطء في الدورة التشغيلية',
          'تزايد في فترة تحصيل المستحقات - احتمالية وجود ديون متعثرة'
        ]
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="container mx-auto max-w-7xl">
        <MotionWrapper animation="slideDown" delay={0.1}>
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
              التحليل المالي الذكي
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              تحليل تلقائي للقوائم المالية بالذكاء الاصطناعي - AI-Powered Financial Analysis
            </p>
          </div>
        </MotionWrapper>

        {!analysisResult ? (
          <MotionWrapper animation="scaleIn" delay={0.2}>
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                قم برفع القوائم المالية
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                قم برفع قائمة الدخل، الميزانية العمومية، أو قائمة التدفقات النقدية بصيغة Excel، CSV، أو PDF
                وسيقوم النظام الذكي بتحليلها تلقائياً وحساب جميع النسب المالية
              </p>
              <label className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold cursor-pointer hover:shadow-2xl hover:scale-105 transition-all">
                <Upload className="w-5 h-5" />
                اختر الملفات
                <input 
                  type="file" 
                  accept=".xlsx,.xls,.csv,.pdf" 
                  multiple 
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </MotionWrapper>
        ) : (
          <div className="space-y-6">
            {/* Overall Score */}
            <MotionWrapper animation="scaleIn" delay={0.2}>
              <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-3xl p-8 shadow-2xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{analysisResult.companyName}</h2>
                    <p className="text-white/80">
                      الفترة: {analysisResult.period.from} إلى {analysisResult.period.to}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-2">{analysisResult.overallScore}</div>
                    <div className="text-lg">من 100</div>
                    <div className="mt-2 px-4 py-2 bg-white/20 rounded-full">
                      تصنيف المخاطر: {analysisResult.riskRating}
                    </div>
                  </div>
                </div>
              </div>
            </MotionWrapper>

            {/* Financial Ratios */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MotionWrapper animation="fadeIn" delay={0.3}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    نسب السيولة
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">النسبة الجارية</span>
                        <span className="text-sm font-bold">{analysisResult.ratios.liquidity.currentRatio}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '90%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">النسبة السريعة</span>
                        <span className="text-sm font-bold">{analysisResult.ratios.liquidity.quickRatio}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '60%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionWrapper>

              <MotionWrapper animation="fadeIn" delay={0.4}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    نسب الربحية
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">هامش الربح الإجمالي</span>
                        <span className="text-sm font-bold">{analysisResult.ratios.profitability.grossProfitMargin}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '65%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">هامش الربح الصافي</span>
                        <span className="text-sm font-bold">{analysisResult.ratios.profitability.netProfitMargin}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '50%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionWrapper>

              <MotionWrapper animation="fadeIn" delay={0.5}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-orange-600" />
                    نسب المديونية
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">الدين إلى حقوق الملكية</span>
                        <span className="text-sm font-bold">{analysisResult.ratios.leverage.debtToEquity}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{width: '40%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">نسبة الدين</span>
                        <span className="text-sm font-bold">{analysisResult.ratios.leverage.debtRatio}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{width: '45%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionWrapper>
            </div>

            {/* Analysis Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MotionWrapper animation="fadeIn" delay={0.6}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-green-600 mb-4">نقاط القوة 💪</h3>
                  <ul className="space-y-3">
                    {analysisResult.strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </MotionWrapper>

              <MotionWrapper animation="fadeIn" delay={0.7}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-orange-600 mb-4">نقاط الضعف ⚠️</h3>
                  <ul className="space-y-3">
                    {analysisResult.weaknesses.map((weakness: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <span className="text-orange-600 font-bold">!</span>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </MotionWrapper>
            </div>

            {/* Red Flags */}
            <MotionWrapper animation="fadeIn" delay={0.8}>
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
                  🚩 علامات تحذيرية (Red Flags)
                </h3>
                <ul className="space-y-2">
                  {analysisResult.redFlags.map((flag: string, index: number) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                      <span className="text-red-600">●</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </MotionWrapper>

            {/* Actions */}
            <MotionWrapper animation="fadeIn" delay={0.9}>
              <div className="flex gap-4">
                <button className="flex-1 bg-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  تحميل التقرير المفصل (PDF)
                </button>
                <button className="flex-1 bg-green-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5" />
                  تحميل التقرير التنفيذي
                </button>
                <button 
                  onClick={() => setAnalysisResult(null)}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-4 rounded-xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  تحليل جديد
                </button>
              </div>
            </MotionWrapper>
          </div>
        )}
      </div>
    </div>
  );
}
