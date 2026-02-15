'use client';

import { useState, useMemo } from 'react';
import { 
  Building2, BarChart3, TrendingUp, AlertTriangle, CheckCircle, 
  Target, Download, Save, RefreshCw, ChevronDown, ChevronRight,
  Shield, Users, DollarSign, FileText, Settings, Lock, Database,
  PieChart, Activity, Zap, Award, Clock, Calendar
} from 'lucide-react';

interface Question {
  id: string;
  text: string;
  tip: string;
  weight: number; // 1-5
  isCritical?: boolean; // affects risk/fraud scores
}

interface Section {
  id: string;
  title: string;
  icon: any;
  color: string;
  questions: Question[];
}

export default function CompanyEvaluationPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    size: 'medium',
    type: 'commercial',
    sector: 'retail'
  });
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    governance: true
  });
  const [showReport, setShowReport] = useState(false);

  const sections: Section[] = [
    {
      id: 'governance',
      title: 'الحوكمة المؤسسية',
      icon: Shield,
      color: 'blue',
      questions: [
        { id: 'gov_1', text: 'هل يوجد مجلس إدارة معتمد يجتمع بانتظام؟', tip: 'اجتماعات شهرية أو ربع سنوية على الأقل', weight: 5 },
        { id: 'gov_2', text: 'هل توجد لجان منبثقة عن المجلس (مراجعة/مكافآت)؟', tip: 'لجان فعالة ومستقلة', weight: 4 },
        { id: 'gov_3', text: 'هل يوجد ميثاق حوكمة معتمد ومُفعّل؟', tip: 'وثيقة رسمية معتمدة', weight: 4 },
        { id: 'gov_4', text: 'هل يتم إعداد تقارير دورية لمجلس الإدارة؟', tip: 'تقارير شهرية أو ربع سنوية', weight: 3 },
        { id: 'gov_5', text: 'هل توجد آلية للإفصاح والشفافية؟', tip: 'نظام للإفصاح عن المعلومات الجوهرية', weight: 4 }
      ]
    },
    {
      id: 'internal_control',
      title: 'الرقابة الداخلية',
      icon: Lock,
      color: 'purple',
      questions: [
        { id: 'ic_1', text: 'هل يوجد فصل واضح بين الصلاحيات؟', tip: 'Segregation of Duties', weight: 5, isCritical: true },
        { id: 'ic_2', text: 'هل توجد سياسات وإجراءات موثقة لكل إدارة؟', tip: 'دليل سياسات معتمد', weight: 4 },
        { id: 'ic_3', text: 'هل يتم مراجعة الصلاحيات دورياً؟', tip: 'كل 6 أشهر على الأقل', weight: 4, isCritical: true },
        { id: 'ic_4', text: 'هل توجد ضوابط على الوصول للأنظمة المالية؟', tip: 'كلمات مرور قوية وصلاحيات محددة', weight: 5, isCritical: true },
        { id: 'ic_5', text: 'هل يتم التسوية البنكية بشكل منتظم؟', tip: 'شهرياً وخلال أول 5 أيام', weight: 4 },
        { id: 'ic_6', text: 'هل يوجد جرد دوري للمخزون والأصول؟', tip: 'جرد سنوي على الأقل', weight: 4 }
      ]
    },
    {
      id: 'internal_audit',
      title: 'المراجعة الداخلية',
      icon: FileText,
      color: 'green',
      questions: [
        { id: 'ia_1', text: 'هل توجد إدارة مستقلة للمراجعة الداخلية؟', tip: 'تتبع لجنة المراجعة مباشرة', weight: 5 },
        { id: 'ia_2', text: 'هل يتم إعداد خطة مراجعة سنوية؟', tip: 'مبنية على تقييم المخاطر', weight: 5 },
        { id: 'ia_3', text: 'هل يتم متابعة تنفيذ ملاحظات المراجعة؟', tip: 'سجل متابعة دوري', weight: 4 },
        { id: 'ia_4', text: 'هل فريق المراجعة مؤهل ومعتمد؟', tip: 'CIA, CPA, SOCPA', weight: 3 },
        { id: 'ia_5', text: 'هل يتم رفع التقارير للجنة المراجعة؟', tip: 'بشكل مباشر وبدون تدخل الإدارة التنفيذية', weight: 4 }
      ]
    },
    {
      id: 'finance',
      title: 'الإدارة المالية',
      icon: DollarSign,
      color: 'amber',
      questions: [
        { id: 'fin_1', text: 'هل يتم إعداد ميزانية تقديرية سنوية؟', tip: 'قبل بداية السنة المالية', weight: 4 },
        { id: 'fin_2', text: 'هل يتم إغلاق الحسابات شهرياً؟', tip: 'خلال أول 10 أيام من الشهر التالي', weight: 4 },
        { id: 'fin_3', text: 'هل يتم إعداد قوائم مالية دورية؟', tip: 'شهرية أو ربع سنوية', weight: 4 },
        { id: 'fin_4', text: 'هل توجد رقابة فعالة على المصروفات؟', tip: 'نظام اعتماد للصرف متعدد المستويات', weight: 5 },
        { id: 'fin_5', text: 'هل يتم مراجعة القوائم من مراجع خارجي؟', tip: 'مراجع محاسبي قانوني', weight: 4 },
        { id: 'fin_6', text: 'هل توجد سياسة واضحة للديون والائتمان؟', tip: 'حدود ائتمانية ومتابعة للتحصيل', weight: 4 }
      ]
    },
    {
      id: 'hr',
      title: 'الموارد البشرية',
      icon: Users,
      color: 'teal',
      questions: [
        { id: 'hr_1', text: 'هل يوجد هيكل تنظيمي معتمد؟', tip: 'معتمد من مجلس الإدارة ومحدث', weight: 4 },
        { id: 'hr_2', text: 'هل توجد لائحة جزاءات ومكافآت مفعّلة؟', tip: 'تطبيق فعلي وعادل', weight: 3 },
        { id: 'hr_3', text: 'هل يتم تقييم الأداء بشكل دوري؟', tip: 'سنوياً على الأقل', weight: 3 },
        { id: 'hr_4', text: 'هل توجد خطة تدريب وتطوير للموظفين؟', tip: 'ميزانية تدريب سنوية', weight: 2 },
        { id: 'hr_5', text: 'هل يوجد نظام للتوظيف والاستقطاب؟', tip: 'إجراءات موثقة', weight: 3 }
      ]
    },
    {
      id: 'operations',
      title: 'العمليات التشغيلية',
      icon: Settings,
      color: 'orange',
      questions: [
        { id: 'ops_1', text: 'هل توجد إجراءات موثقة للعمليات الأساسية؟', tip: 'SOPs معتمدة', weight: 4 },
        { id: 'ops_2', text: 'هل يتم قياس مؤشرات الأداء التشغيلي؟', tip: 'KPIs محددة ومتابعة', weight: 3 },
        { id: 'ops_3', text: 'هل توجد خطة لاستمرارية الأعمال؟', tip: 'BCP معتمدة ومختبرة', weight: 4 },
        { id: 'ops_4', text: 'هل يتم إدارة الموردين بشكل فعال؟', tip: 'تقييم دوري للموردين', weight: 3 },
        { id: 'ops_5', text: 'هل توجد ضوابط على جودة المنتجات/الخدمات؟', tip: 'نظام جودة معتمد', weight: 3 }
      ]
    },
    {
      id: 'compliance',
      title: 'الامتثال والتشريعات',
      icon: Award,
      color: 'red',
      questions: [
        { id: 'comp_1', text: 'هل الشركة ملتزمة بأنظمة الزكاة والضريبة؟', tip: 'تقديم الإقرارات في موعدها', weight: 5 },
        { id: 'comp_2', text: 'هل توجد تراخيص سارية لمزاولة النشاط؟', tip: 'سجل تجاري، تراخيص بلدية', weight: 5 },
        { id: 'comp_3', text: 'هل الشركة ملتزمة بأنظمة العمل؟', tip: 'التأمينات، عقود العمل', weight: 4 },
        { id: 'comp_4', text: 'هل يوجد مستشار قانوني؟', tip: 'داخلي أو خارجي', weight: 2 },
        { id: 'comp_5', text: 'هل توجد سياسة لمكافحة غسيل الأموال؟', tip: 'للقطاعات المالية', weight: 3 }
      ]
    },
    {
      id: 'it_security',
      title: 'أمن المعلومات والتقنية',
      icon: Database,
      color: 'indigo',
      questions: [
        { id: 'it_1', text: 'هل يوجد نظام نسخ احتياطي للبيانات؟', tip: 'نسخ يومية واختبار استعادة', weight: 5, isCritical: true },
        { id: 'it_2', text: 'هل توجد سياسة لأمن المعلومات؟', tip: 'معتمدة ومفعّلة', weight: 4, isCritical: true },
        { id: 'it_3', text: 'هل يتم تحديث الأنظمة والبرامج بانتظام؟', tip: 'تحديثات أمنية دورية', weight: 4 },
        { id: 'it_4', text: 'هل يوجد نظام حماية من الفيروسات؟', tip: 'برامج مكافحة محدثة', weight: 4 },
        { id: 'it_5', text: 'هل يتم تدريب الموظفين على الأمن السيبراني؟', tip: 'توعية دورية', weight: 3 }
      ]
    }
  ];

  const handleAnswer = (qId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const results = useMemo(() => {
    let totalWeightedScore = 0;
    let maxWeightedScore = 0;
    let criticalScore = 0;
    let maxCriticalScore = 0;
    const sectionScores: Record<string, { score: number; max: number; percentage: number }> = {};

    sections.forEach(section => {
      let sectionScore = 0;
      let sectionMax = 0;

      section.questions.forEach(q => {
        const weight = q.weight;
        const maxPoints = 2 * weight;
        sectionMax += maxPoints;
        maxWeightedScore += maxPoints;

        if (q.isCritical) {
          maxCriticalScore += maxPoints;
        }

        if (answers[q.id] !== undefined) {
          const score = answers[q.id] * weight;
          sectionScore += score;
          totalWeightedScore += score;

          if (q.isCritical) {
            criticalScore += score;
          }
        }
      });

      sectionScores[section.id] = {
        score: sectionScore,
        max: sectionMax,
        percentage: sectionMax > 0 ? (sectionScore / sectionMax) * 100 : 0
      };
    });

    const overallPercentage = maxWeightedScore > 0 ? (totalWeightedScore / maxWeightedScore) * 100 : 0;
    const riskPercentage = maxCriticalScore > 0 ? 100 - ((criticalScore / maxCriticalScore) * 100) : 0;

    // Maturity Level
    let maturityLevel = '';
    let maturityColor = '';
    if (overallPercentage >= 80) {
      maturityLevel = 'ناضج (Mature)';
      maturityColor = 'green';
    } else if (overallPercentage >= 60) {
      maturityLevel = 'متطور (Developing)';
      maturityColor = 'blue';
    } else if (overallPercentage >= 40) {
      maturityLevel = 'أساسي (Basic)';
      maturityColor = 'yellow';
    } else {
      maturityLevel = 'غير ناضج (Immature)';
      maturityColor = 'red';
    }

    // Risk Level
    let riskLevel = '';
    let riskColor = '';
    if (riskPercentage <= 20) {
      riskLevel = 'منخفض';
      riskColor = 'green';
    } else if (riskPercentage <= 40) {
      riskLevel = 'متوسط';
      riskColor = 'yellow';
    } else if (riskPercentage <= 60) {
      riskLevel = 'مرتفع';
      riskColor = 'orange';
    } else {
      riskLevel = 'حرج';
      riskColor = 'red';
    }

    // Pain Score (0-100)
    const painScore = Math.round(100 - overallPercentage);

    // Fraud Exposure
    let fraudExposure = '';
    if (riskPercentage <= 30) {
      fraudExposure = 'ضعيف';
    } else if (riskPercentage <= 60) {
      fraudExposure = 'متوسط';
    } else {
      fraudExposure = 'خطير';
    }

    return {
      overallPercentage,
      maturityLevel,
      maturityColor,
      riskLevel,
      riskColor,
      riskPercentage,
      painScore,
      fraudExposure,
      sectionScores,
      totalWeightedScore,
      maxWeightedScore
    };
  }, [answers, sections]);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; light: string }> = {
      blue: { bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-500', light: 'bg-blue-50' },
      purple: { bg: 'bg-purple-600', text: 'text-purple-600', border: 'border-purple-500', light: 'bg-purple-50' },
      green: { bg: 'bg-green-600', text: 'text-green-600', border: 'border-green-500', light: 'bg-green-50' },
      amber: { bg: 'bg-amber-600', text: 'text-amber-600', border: 'border-amber-500', light: 'bg-amber-50' },
      teal: { bg: 'bg-teal-600', text: 'text-teal-600', border: 'border-teal-500', light: 'bg-teal-50' },
      orange: { bg: 'bg-orange-600', text: 'text-orange-600', border: 'border-orange-500', light: 'bg-orange-50' },
      red: { bg: 'bg-red-600', text: 'text-red-600', border: 'border-red-500', light: 'bg-red-50' },
      indigo: { bg: 'bg-indigo-600', text: 'text-indigo-600', border: 'border-indigo-500', light: 'bg-indigo-50' },
      yellow: { bg: 'bg-yellow-600', text: 'text-yellow-600', border: 'border-yellow-500', light: 'bg-yellow-50' }
    };
    return colors[color] || colors.blue;
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = sections.reduce((acc, s) => acc + s.questions.length, 0);

  return (
    <div className="p-4 md:p-8 font-sans min-h-screen bg-gradient-to-br from-gray-50 to-blue-50" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <BarChart3 className="text-blue-600 ml-3" size={32} />
          أداة تقييم نضج الشركات
        </h1>
        <p className="text-gray-600">نظام ذكي لتقييم الأداء المؤسسي بناءً على معايير المراجعة الداخلية والحوكمة</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Company Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <h2 className="font-bold text-lg flex items-center">
                <Building2 className="ml-2" size={20} />
                بيانات الشركة
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اسم الشركة</label>
                <input 
                  type="text" 
                  className="w-full border-gray-300 rounded-lg shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
                  placeholder="أدخل اسم الشركة..."
                  value={companyInfo.name}
                  onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">حجم الشركة</label>
                <select 
                  className="w-full border-gray-300 rounded-lg shadow-sm p-2 border"
                  value={companyInfo.size}
                  onChange={(e) => setCompanyInfo({...companyInfo, size: e.target.value})}
                >
                  <option value="small">صغيرة (أقل من 50 موظف)</option>
                  <option value="medium">متوسطة (50-250 موظف)</option>
                  <option value="large">كبيرة (أكثر من 250 موظف)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">نوع النشاط</label>
                <select 
                  className="w-full border-gray-300 rounded-lg shadow-sm p-2 border"
                  value={companyInfo.type}
                  onChange={(e) => setCompanyInfo({...companyInfo, type: e.target.value})}
                >
                  <option value="commercial">تجارية</option>
                  <option value="industrial">صناعية</option>
                  <option value="service">خدمية</option>
                  <option value="financial">مالية</option>
                  <option value="nonprofit">غير ربحية</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">القطاع</label>
                <select 
                  className="w-full border-gray-300 rounded-lg shadow-sm p-2 border"
                  value={companyInfo.sector}
                  onChange={(e) => setCompanyInfo({...companyInfo, sector: e.target.value})}
                >
                  <option value="retail">تجزئة</option>
                  <option value="manufacturing">تصنيع</option>
                  <option value="construction">مقاولات</option>
                  <option value="healthcare">رعاية صحية</option>
                  <option value="technology">تقنية</option>
                  <option value="realestate">عقارات</option>
                </select>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">تقدم التقييم</span>
              <span className="text-sm font-bold text-blue-600">{answeredCount} / {totalQuestions} سؤال</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Evaluation Sections */}
          {sections.map((section) => {
            const sectionResult = results.sectionScores[section.id];
            const colorClasses = getColorClasses(section.color);
            const Icon = section.icon;

            return (
              <div key={section.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors`}
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-lg ${colorClasses.light} flex items-center justify-center ml-3`}>
                      <Icon className={colorClasses.text} size={20} />
                    </div>
                    <div className="text-right">
                      <h3 className="font-bold text-gray-800">{section.title}</h3>
                      <p className="text-xs text-gray-500">{section.questions.length} أسئلة</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-left ml-4">
                      <p className={`text-lg font-bold ${colorClasses.text}`}>
                        {Math.round(sectionResult?.percentage || 0)}%
                      </p>
                    </div>
                    {expandedSections[section.id] ? 
                      <ChevronDown className="text-gray-400" size={20} /> : 
                      <ChevronRight className="text-gray-400" size={20} />
                    }
                  </div>
                </button>

                {expandedSections[section.id] && (
                  <div className={`p-4 border-t ${colorClasses.light} border-opacity-50`}>
                    <div className="space-y-4">
                      {section.questions.map((q) => (
                        <div key={q.id} className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <div className="flex items-center mb-1">
                                {q.isCritical && (
                                  <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full ml-2">
                                    حرج
                                  </span>
                                )}
                                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                                  وزن: {q.weight}/5
                                </span>
                              </div>
                              <label className="text-gray-800 font-medium block">{q.text}</label>
                            </div>
                          </div>
                          
                          <p className="text-xs text-gray-500 mb-3 bg-gray-50 p-2 rounded">
                            💡 {q.tip}
                          </p>
                          
                          <div className="flex space-x-2 space-x-reverse">
                            <button 
                              onClick={() => handleAnswer(q.id, 2)}
                              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                                answers[q.id] === 2 
                                  ? 'bg-green-600 text-white shadow-md scale-105' 
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              ✅ نعم (مطبق)
                            </button>
                            
                            <button 
                              onClick={() => handleAnswer(q.id, 1)}
                              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                                answers[q.id] === 1 
                                  ? 'bg-yellow-500 text-white shadow-md scale-105' 
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              ⚠️ جزئي
                            </button>

                            <button 
                              onClick={() => handleAnswer(q.id, 0)}
                              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                                answers[q.id] === 0 
                                  ? 'bg-red-600 text-white shadow-md scale-105' 
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              ❌ لا
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sidebar - Results */}
        <div className="lg:col-span-4">
          <div className="sticky top-8 space-y-6">
            
            {/* Overall Score */}
            <div className={`bg-white rounded-xl shadow-lg border-2 overflow-hidden ${
              results.maturityColor === 'green' ? 'border-green-500' :
              results.maturityColor === 'blue' ? 'border-blue-500' :
              results.maturityColor === 'yellow' ? 'border-yellow-500' :
              'border-red-500'
            }`}>
              <div className={`p-4 text-white ${
                results.maturityColor === 'green' ? 'bg-green-600' :
                results.maturityColor === 'blue' ? 'bg-blue-600' :
                results.maturityColor === 'yellow' ? 'bg-yellow-600' :
                'bg-red-600'
              }`}>
                <h3 className="font-bold text-lg text-center">نتيجة التقييم</h3>
              </div>
              
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {Math.round(results.overallPercentage)}%
                  </div>
                  <div className={`text-lg font-bold ${
                    results.maturityColor === 'green' ? 'text-green-600' :
                    results.maturityColor === 'blue' ? 'text-blue-600' :
                    results.maturityColor === 'yellow' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {results.maturityLevel}
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Risk Level */}
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 flex items-center">
                      <AlertTriangle size={16} className="ml-2" />
                      مستوى المخاطر
                    </span>
                    <span className={`font-bold ${
                      results.riskColor === 'green' ? 'text-green-600' :
                      results.riskColor === 'yellow' ? 'text-yellow-600' :
                      results.riskColor === 'orange' ? 'text-orange-600' :
                      'text-red-600'
                    }`}>
                      {results.riskLevel}
                    </span>
                  </div>

                  {/* Pain Score */}
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 flex items-center">
                      <Activity size={16} className="ml-2" />
                      مؤشر الألم (Pain Score)
                    </span>
                    <span className="font-bold text-gray-800">{results.painScore}/100</span>
                  </div>

                  {/* Fraud Exposure */}
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 flex items-center">
                      <Shield size={16} className="ml-2" />
                      مؤشر الاحتيال
                    </span>
                    <span className={`font-bold ${
                      results.fraudExposure === 'ضعيف' ? 'text-green-600' :
                      results.fraudExposure === 'متوسط' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {results.fraudExposure}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Scores Heat Map */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <PieChart size={18} className="ml-2 text-blue-600" />
                خريطة المخاطر
              </h3>
              <div className="space-y-2">
                {sections.map(section => {
                  const score = results.sectionScores[section.id]?.percentage || 0;
                  let bgColor = 'bg-red-500';
                  if (score >= 80) bgColor = 'bg-green-500';
                  else if (score >= 60) bgColor = 'bg-yellow-500';
                  else if (score >= 40) bgColor = 'bg-orange-500';
                  
                  return (
                    <div key={section.id} className="flex items-center">
                      <span className="text-xs text-gray-600 w-28 truncate">{section.title}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-4 mr-2 overflow-hidden">
                        <div 
                          className={`h-4 ${bgColor} transition-all duration-500`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-700 w-10 text-left">
                        {Math.round(score)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 space-y-3">
              <button 
                onClick={() => setShowReport(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
              >
                <FileText size={18} className="ml-2" />
                عرض التقرير الكامل
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors">
                <Download size={18} className="ml-2" />
                تصدير PDF
              </button>
              <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors">
                <Save size={18} className="ml-2" />
                حفظ كمسودة
              </button>
              <button 
                onClick={() => setAnswers({})}
                className="w-full border border-red-300 hover:bg-red-50 text-red-600 font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
              >
                <RefreshCw size={18} className="ml-2" />
                إعادة التقييم
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">تقرير التقييم الشامل</h2>
              <button 
                onClick={() => setShowReport(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Company Info */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-2">معلومات الشركة</h3>
                <p><strong>الاسم:</strong> {companyInfo.name || 'غير محدد'}</p>
                <p><strong>الحجم:</strong> {companyInfo.size === 'small' ? 'صغيرة' : companyInfo.size === 'medium' ? 'متوسطة' : 'كبيرة'}</p>
                <p><strong>التاريخ:</strong> {new Date().toLocaleDateString('ar-SA')}</p>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-600">{Math.round(results.overallPercentage)}%</p>
                  <p className="text-sm text-gray-600">النضج الكلي</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-red-600">{results.painScore}</p>
                  <p className="text-sm text-gray-600">مؤشر الألم</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-yellow-600">{results.riskLevel}</p>
                  <p className="text-sm text-gray-600">مستوى المخاطر</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-purple-600">{results.fraudExposure}</p>
                  <p className="text-sm text-gray-600">مؤشر الاحتيال</p>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-bold text-amber-800 mb-3 flex items-center">
                  <Zap className="ml-2" size={18} />
                  التوصيات العاجلة (خطة 90 يوم)
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {results.overallPercentage < 50 && (
                    <>
                      <li>إنشاء وحدة مراجعة داخلية مستقلة</li>
                      <li>وضع سياسات وإجراءات موثقة لجميع العمليات</li>
                      <li>تفعيل نظام الفصل بين الصلاحيات</li>
                    </>
                  )}
                  {results.overallPercentage >= 50 && results.overallPercentage < 70 && (
                    <>
                      <li>تحسين آليات الرقابة الداخلية</li>
                      <li>تدريب الموظفين على الالتزام بالسياسات</li>
                      <li>تفعيل نظام متابعة ملاحظات المراجعة</li>
                    </>
                  )}
                  {results.overallPercentage >= 70 && (
                    <>
                      <li>التركيز على التحسين المستمر</li>
                      <li>تطوير أدوات تحليل البيانات</li>
                      <li>تعزيز برامج التوعية بالمخاطر</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Section Details */}
              <div>
                <h3 className="font-bold text-gray-800 mb-4">تفاصيل التقييم حسب المحور</h3>
                <div className="space-y-3">
                  {sections.map(section => {
                    const score = results.sectionScores[section.id];
                    return (
                      <div key={section.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-800">{section.title}</span>
                          <span className={`font-bold ${
                            score.percentage >= 70 ? 'text-green-600' :
                            score.percentage >= 50 ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {Math.round(score.percentage)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className={`h-2 rounded-full ${
                              score.percentage >= 70 ? 'bg-green-500' :
                              score.percentage >= 50 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${score.percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
