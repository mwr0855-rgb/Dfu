'use client';
import { useState, useMemo } from 'react';

export default function CompanyEvaluationPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    size: 'small', // small, medium, large
    type: 'commercial', // commercial, industrial, service
  });

  const sections = [
    {
      id: 'hr',
      title: 'الموارد البشرية (HR)',
      questions: [
        { id: 'hr_1', text: 'هل يوجد هيكل تنظيمي معتمد؟', tip: 'يجب أن يكون معتمداً من مجلس الإدارة' },
        { id: 'hr_2', text: 'هل توجد لائحة جزاءات ومكافآت؟', tip: 'تطبيق فعلي للائحة' },
        { id: 'hr_3', text: 'هل يتم تقييم الأداء بشكل دوري؟', tip: 'ربع سنوي أو نصف سنوي' },
      ]
    },
    {
      id: 'finance',
      title: 'الإدارة المالية',
      questions: [
        { id: 'fin_1', text: 'هل يتم إعداد ميزانية تقديرية سنوية؟', tip: 'قبل بداية السنة المالية' },
        { id: 'fin_2', text: 'هل يتم إغلاق الحسابات شهرياً؟', tip: 'في موعد أقصاه 5 أيام من الشهر التالي' },
        { id: 'fin_3', text: 'هل توجد رقابة فعالة على المصروفات؟', tip: 'نظام اعتماد للصرف' },
      ]
    },
    {
      id: 'audit',
      title: 'المراجعة الداخلية والرقابة',
      questions: [
        { id: 'aud_1', text: 'هل توجد إدارة مستقلة للمراجعة؟', tip: 'تتبع لجنة المراجعة مباشرة' },
        { id: 'aud_2', text: 'هل يتم تنفيذ خطة مراجعة سنوية؟', tip: 'معتمدة ومخاطر محددة' },
        { id: 'aud_3', text: 'هل يتم متابعة الملاحظات السابقة؟', tip: 'سجل متابعة دوري' },
      ]
    }
  ];

  const handleAnswer = (qId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const results = useMemo(() => {
    let totalScore = 0;
    let maxPossibleScore = 0;

    sections.forEach(section => {
      section.questions.forEach(q => {
        maxPossibleScore += 2;
        if (answers[q.id] !== undefined) {
          totalScore += answers[q.id];
        }
      });
    });

    const percentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
    
    let status = '';
    let colorClass = '';
    let recommendation = '';

    if (percentage >= 90) {
      status = 'ناضج جداً (Excellent)';
      colorClass = 'bg-green-100 text-green-800 border-green-500';
      recommendation = 'استمر في الحفاظ على هذا المستوى، ركز على الابتكار والتحسين المستمر.';
    } else if (percentage >= 70) {
      status = 'جيد (Good)';
      colorClass = 'bg-yellow-100 text-yellow-800 border-yellow-500';
      recommendation = 'الأداء جيد، لكن هناك ثغرات في التوثيق أو التطبيق تحتاج للمراجعة.';
    } else if (percentage >= 50) {
      status = 'ضعيف (Weak)';
      colorClass = 'bg-orange-100 text-orange-800 border-orange-500';
      recommendation = 'هناك مخاطر تشغيلية ومالية عالية. يجب إعادة هيكلة العمليات الأساسية فوراً.';
    } else {
      status = 'غير فعال (Ineffective)';
      colorClass = 'bg-red-100 text-red-800 border-red-500';
      recommendation = 'حالة حرجة تتطلب تدخل استشاري فوري لبناء الأنظمة من الصفر.';
    }

    return { percentage, status, colorClass, recommendation, totalScore, maxPossibleScore };
  }, [answers, sections]);

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen font-sans" dir="rtl">
      
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">أداة تقييم نضج الشركات</h1>
        <p className="text-gray-600">نظام ذكي لتقييم الأداء المؤسسي بناءً على معايير المراجعة الداخلية</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 border-b pb-2">بيانات الشركة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اسم الشركة</label>
                <input 
                  type="text" 
                  className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
                  placeholder="أدخل اسم شركتك..."
                  value={companyInfo.name}
                  onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">حجم الشركة</label>
                <select 
                  className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                  value={companyInfo.size}
                  onChange={(e) => setCompanyInfo({...companyInfo, size: e.target.value})}
                >
                  <option value="small">صغيرة</option>
                  <option value="medium">متوسطة</option>
                  <option value="large">كبيرة</option>
                </select>
              </div>
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <span className="w-1 h-6 bg-blue-600 rounded-l ml-2"></span>
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.questions.map((q) => (
                  <div key={q.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <label className="text-gray-700 font-medium block">{q.text}</label>
                      <div className="group relative inline-block">
                        <span className="text-blue-500 cursor-help text-xs bg-blue-50 px-2 py-1 rounded-full mx-2">ℹ️ توضيح</span>
                        <div className="hidden group-hover:block absolute left-0 bottom-full mb-2 w-64 bg-gray-800 text-white text-xs rounded p-2 z-10 shadow-lg">
                          {q.tip}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <button 
                        onClick={() => handleAnswer(q.id, 2)}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                          answers[q.id] === 2 
                            ? 'bg-green-600 text-white shadow-md transform scale-105' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        ✅ نعم (مطبق)
                      </button>
                      
                      <button 
                        onClick={() => handleAnswer(q.id, 1)}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                          answers[q.id] === 1 
                            ? 'bg-yellow-500 text-white shadow-md transform scale-105' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        ⚠️ جزئي (تحسين)
                      </button>

                      <button 
                        onClick={() => handleAnswer(q.id, 0)}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                          answers[q.id] === 0 
                            ? 'bg-red-600 text-white shadow-md transform scale-105' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        ❌ لا (غير مطبق)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            
            <div className={`bg-white p-6 rounded-lg shadow-lg border-2 transition-all duration-500 ${results.colorClass}`}>
              <h3 className="text-lg font-bold mb-2 text-center">نتيجة التقييم</h3>
              
              <div className="text-center font-bold text-lg mb-2 text-4xl">
                {Math.round(results.percentage)}%
              </div>
              
              <div className="text-center font-bold text-lg mb-2">
                {results.status}
              </div>
              <div className="text-center text-sm mb-4 opacity-80">
                النقاط: {results.totalScore} / {results.maxPossibleScore}
              </div>

              <div className="bg-white/50 p-3 rounded text-sm italic border border-black/10">
                <strong>التوصية التلقائية:</strong>
                <br />
                {results.recommendation}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded flex items-center justify-center transition-colors">
                📄 تصدير التقرير PDF
              </button>
              <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded flex items-center justify-center transition-colors">
                💾 حفظ كمسودة
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
