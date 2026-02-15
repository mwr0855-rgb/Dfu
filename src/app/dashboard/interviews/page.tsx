'use client';

import { useState } from 'react';
import { 
  Users, Award, Target, FileText, Clock, CheckCircle, XCircle,
  Play, Pause, ChevronRight, ChevronLeft, Star, Download, 
  Briefcase, TrendingUp, BarChart3, Calendar, Video, Brain,
  AlertTriangle, MessageSquare, Mic
} from 'lucide-react';

interface Question {
  id: number;
  text: string;
  type: 'technical' | 'behavioral' | 'scenario';
  options?: string[];
  correctAnswer?: number;
}

interface Assessment {
  category: string;
  score: number;
  maxScore: number;
  status: 'excellent' | 'good' | 'needs_improvement' | 'weak';
}

export default function InterviewsPage() {
  const [selectedPath, setSelectedPath] = useState<'accountant' | 'auditor' | null>(null);
  const [currentPhase, setCurrentPhase] = useState<'setup' | 'technical' | 'behavioral' | 'scenario' | 'results'>('setup');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isStarted, setIsStarted] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    targetPosition: '',
    experience: '',
    company: ''
  });

  const technicalQuestions: Question[] = [
    {
      id: 1,
      text: 'ما هو الفرق بين المخصص والاحتياطي في المحاسبة؟',
      type: 'technical',
      options: [
        'المخصص يُخصم من الأرباح والاحتياطي يُوزع من الأرباح',
        'لا فرق بينهما',
        'المخصص للأصول والاحتياطي للخصوم',
        'المخصص اختياري والاحتياطي إلزامي'
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      text: 'أي من القوائم المالية التالية توضح المركز المالي للشركة في لحظة معينة؟',
      type: 'technical',
      options: [
        'قائمة الدخل',
        'قائمة التدفقات النقدية',
        'الميزانية العمومية',
        'قائمة التغيرات في حقوق الملكية'
      ],
      correctAnswer: 2
    },
    {
      id: 3,
      text: 'ما هي طريقة الجرد المناسبة للمخزون سريع التلف؟',
      type: 'technical',
      options: [
        'LIFO - الوارد أخيراً صادر أولاً',
        'FIFO - الوارد أولاً صادر أولاً',
        'المتوسط المرجح',
        'التكلفة المعيارية'
      ],
      correctAnswer: 1
    },
    {
      id: 4,
      text: 'ما هو الهدف الرئيسي من إعداد التسوية البنكية؟',
      type: 'technical',
      options: [
        'تحديد رصيد النقدية الفعلي',
        'إعداد قائمة الدخل',
        'حساب الضرائب',
        'تقييم أداء الموظفين'
      ],
      correctAnswer: 0
    },
    {
      id: 5,
      text: 'أي من الأصول التالية يُعتبر أصل غير ملموس؟',
      type: 'technical',
      options: [
        'المباني',
        'المخزون',
        'الشهرة',
        'الأثاث'
      ],
      correctAnswer: 2
    }
  ];

  const behavioralQuestions: Question[] = [
    {
      id: 6,
      text: 'كيف تتعامل مع ضغط العمل في نهاية الشهر/السنة المالية؟',
      type: 'behavioral',
      options: [
        'أعمل ساعات إضافية بدون تخطيط',
        'أرتب الأولويات وأضع جدول زمني واضح',
        'أطلب مساعدة الزملاء دائماً',
        'أتجاهل بعض المهام الأقل أهمية'
      ],
      correctAnswer: 1
    },
    {
      id: 7,
      text: 'اكتشفت خطأ محاسبي كبير ارتكبه زميلك، ماذا تفعل؟',
      type: 'behavioral',
      options: [
        'أتجاهل الخطأ',
        'أبلغ المدير مباشرة دون إخباره',
        'أناقش الموضوع مع زميلي أولاً ثم نصححه معاً',
        'أصحح الخطأ بنفسي دون إخبار أحد'
      ],
      correctAnswer: 2
    },
    {
      id: 8,
      text: 'طُلب منك العمل على نظام محاسبي جديد لم تستخدمه من قبل، كيف تتصرف؟',
      type: 'behavioral',
      options: [
        'أرفض المهمة',
        'أتعلم النظام ذاتياً وأطلب التدريب إن لزم',
        'أطلب من زميل آخر القيام بالمهمة',
        'أستخدم النظام القديم'
      ],
      correctAnswer: 1
    }
  ];

  const scenarioQuestions: Question[] = [
    {
      id: 9,
      text: 'شركة تواجه عجز نقدي رغم تحقيق أرباح محاسبية، ما السبب المحتمل؟',
      type: 'scenario',
      options: [
        'زيادة المبيعات',
        'تراكم المستحقات وبطء التحصيل',
        'انخفاض المصروفات',
        'زيادة رأس المال'
      ],
      correctAnswer: 1
    },
    {
      id: 10,
      text: 'لاحظت وجود فرق كبير بين رصيد المخزون الدفتري والفعلي، ما الإجراء الأول؟',
      type: 'scenario',
      options: [
        'تعديل الرصيد الدفتري مباشرة',
        'إبلاغ الشرطة بسرقة',
        'التحقق من صحة الجرد ومراجعة حركات المخزون',
        'فصل أمين المخزن'
      ],
      correctAnswer: 2
    }
  ];

  const allQuestions = [...technicalQuestions, ...behavioralQuestions, ...scenarioQuestions];

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const calculateResults = () => {
    let technicalScore = 0;
    let behavioralScore = 0;
    let scenarioScore = 0;

    technicalQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) technicalScore++;
    });

    behavioralQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) behavioralScore++;
    });

    scenarioQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) scenarioScore++;
    });

    const totalScore = technicalScore + behavioralScore + scenarioScore;
    const totalQuestions = allQuestions.length;
    const percentage = (totalScore / totalQuestions) * 100;

    const assessments: Assessment[] = [
      {
        category: 'المعرفة الفنية',
        score: technicalScore,
        maxScore: technicalQuestions.length,
        status: technicalScore >= 4 ? 'excellent' : technicalScore >= 3 ? 'good' : technicalScore >= 2 ? 'needs_improvement' : 'weak'
      },
      {
        category: 'المهارات السلوكية',
        score: behavioralScore,
        maxScore: behavioralQuestions.length,
        status: behavioralScore >= 2 ? 'excellent' : behavioralScore >= 1 ? 'good' : 'needs_improvement'
      },
      {
        category: 'حل المشكلات',
        score: scenarioScore,
        maxScore: scenarioQuestions.length,
        status: scenarioScore >= 2 ? 'excellent' : scenarioScore >= 1 ? 'good' : 'needs_improvement'
      }
    ];

    let readinessLevel = '';
    let readinessColor = '';
    if (percentage >= 80) {
      readinessLevel = 'جاهز تماماً';
      readinessColor = 'green';
    } else if (percentage >= 60) {
      readinessLevel = 'جاهز بشكل جيد';
      readinessColor = 'blue';
    } else if (percentage >= 40) {
      readinessLevel = 'يحتاج تطوير';
      readinessColor = 'yellow';
    } else {
      readinessLevel = 'غير جاهز';
      readinessColor = 'red';
    }

    return {
      totalScore,
      totalQuestions,
      percentage,
      assessments,
      readinessLevel,
      readinessColor,
      recommendations: getRecommendations(percentage, assessments)
    };
  };

  const getRecommendations = (percentage: number, assessments: Assessment[]) => {
    const recommendations = [];
    
    if (percentage < 80) {
      recommendations.push('مراجعة أساسيات المحاسبة والمراجعة');
    }
    
    const technicalAssessment = assessments.find(a => a.category === 'المعرفة الفنية');
    if (technicalAssessment && technicalAssessment.status !== 'excellent') {
      recommendations.push('التركيز على الجوانب الفنية والمعايير المحاسبية');
    }

    const behavioralAssessment = assessments.find(a => a.category === 'المهارات السلوكية');
    if (behavioralAssessment && behavioralAssessment.status !== 'excellent') {
      recommendations.push('تحسين مهارات التواصل والعمل الجماعي');
    }

    const scenarioAssessment = assessments.find(a => a.category === 'حل المشكلات');
    if (scenarioAssessment && scenarioAssessment.status !== 'excellent') {
      recommendations.push('التدرب على حل المشكلات العملية');
    }

    return recommendations;
  };

  const renderSetup = () => (
    <div className="max-w-3xl mx-auto">
      {/* Path Selection */}
      {!selectedPath ? (
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">اختر المسار الوظيفي</h2>
            <p className="text-gray-600">حدد المسار الذي تريد التقييم فيه</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => setSelectedPath('accountant')}
              className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all text-right"
            >
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">محاسب مالي</h3>
              <p className="text-gray-600 text-sm">يقيس الفهم المالي والتحليل المحاسبي ومعرفة المعايير</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">قوائم مالية</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">تحليل مالي</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">محاسبة</span>
              </div>
            </button>

            <button
              onClick={() => setSelectedPath('auditor')}
              className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-200 hover:border-purple-500 hover:shadow-xl transition-all text-right"
            >
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">مراجع داخلي</h3>
              <p className="text-gray-600 text-sm">يقيس عقلية المخاطر والحكم المهني ومعايير المراجعة</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">رقابة داخلية</span>
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">إدارة مخاطر</span>
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">تدقيق</span>
              </div>
            </button>
          </div>
        </div>
      ) : (
        /* User Info Form */
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <FileText className="ml-2 text-blue-600" size={24} />
            بيانات المتقدم
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اسم المتدرب *</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="أدخل اسمك الكامل"
                value={userInfo.name}
                onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الوظيفة المستهدفة</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="مثال: محاسب أول، مراجع داخلي"
                value={userInfo.targetPosition}
                onChange={(e) => setUserInfo({...userInfo, targetPosition: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">سنوات الخبرة</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                value={userInfo.experience}
                onChange={(e) => setUserInfo({...userInfo, experience: e.target.value})}
              >
                <option value="">اختر...</option>
                <option value="0-1">0-1 سنة</option>
                <option value="2-3">2-3 سنوات</option>
                <option value="4-5">4-5 سنوات</option>
                <option value="6+">6+ سنوات</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الشركة (اختياري)</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="اسم الشركة المتقدم إليها"
                value={userInfo.company}
                onChange={(e) => setUserInfo({...userInfo, company: e.target.value})}
              />
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => setSelectedPath(null)}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              رجوع
            </button>
            <button
              onClick={() => {
                if (userInfo.name) {
                  setCurrentPhase('technical');
                  setIsStarted(true);
                }
              }}
              disabled={!userInfo.name}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Play size={20} className="ml-2" />
              ابدأ التقييم
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderQuestion = () => {
    const currentPhaseQuestions = 
      currentPhase === 'technical' ? technicalQuestions :
      currentPhase === 'behavioral' ? behavioralQuestions :
      scenarioQuestions;

    const question = currentPhaseQuestions[currentQuestion];
    const questionIndex = allQuestions.findIndex(q => q.id === question?.id);

    if (!question) return null;

    return (
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>السؤال {questionIndex + 1} من {allQuestions.length}</span>
            <span>{Math.round((questionIndex / allQuestions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${(questionIndex / allQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Phase Indicator */}
        <div className="flex justify-center gap-4 mb-8">
          {['technical', 'behavioral', 'scenario'].map((phase, idx) => (
            <div 
              key={phase}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                currentPhase === phase 
                  ? 'bg-blue-600 text-white' 
                  : idx < ['technical', 'behavioral', 'scenario'].indexOf(currentPhase)
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
              }`}
            >
              {idx < ['technical', 'behavioral', 'scenario'].indexOf(currentPhase) && (
                <CheckCircle size={16} className="ml-1" />
              )}
              {phase === 'technical' && 'أسئلة فنية'}
              {phase === 'behavioral' && 'أسئلة سلوكية'}
              {phase === 'scenario' && 'سيناريوهات'}
            </div>
          ))}
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className={`p-4 text-white ${
            question.type === 'technical' ? 'bg-blue-600' :
            question.type === 'behavioral' ? 'bg-purple-600' :
            'bg-amber-600'
          }`}>
            <span className="text-sm opacity-80">
              {question.type === 'technical' && 'سؤال فني'}
              {question.type === 'behavioral' && 'سؤال سلوكي'}
              {question.type === 'scenario' && 'سيناريو عملي'}
            </span>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">{question.text}</h3>

            <div className="space-y-3">
              {question.options?.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(question.id, idx)}
                  className={`w-full p-4 rounded-xl text-right transition-all ${
                    answers[question.id] === idx
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <span className="font-bold ml-2">{String.fromCharCode(65 + idx)}.</span>
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-gray-50 border-t flex justify-between">
            <button
              onClick={() => {
                if (currentQuestion > 0) {
                  setCurrentQuestion(currentQuestion - 1);
                } else if (currentPhase === 'behavioral') {
                  setCurrentPhase('technical');
                  setCurrentQuestion(technicalQuestions.length - 1);
                } else if (currentPhase === 'scenario') {
                  setCurrentPhase('behavioral');
                  setCurrentQuestion(behavioralQuestions.length - 1);
                }
              }}
              disabled={currentPhase === 'technical' && currentQuestion === 0}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 flex items-center"
            >
              <ChevronRight size={18} className="ml-1" />
              السابق
            </button>

            <button
              onClick={() => {
                const phaseQuestions = 
                  currentPhase === 'technical' ? technicalQuestions :
                  currentPhase === 'behavioral' ? behavioralQuestions :
                  scenarioQuestions;

                if (currentQuestion < phaseQuestions.length - 1) {
                  setCurrentQuestion(currentQuestion + 1);
                } else if (currentPhase === 'technical') {
                  setCurrentPhase('behavioral');
                  setCurrentQuestion(0);
                } else if (currentPhase === 'behavioral') {
                  setCurrentPhase('scenario');
                  setCurrentQuestion(0);
                } else {
                  setCurrentPhase('results');
                }
              }}
              disabled={answers[question.id] === undefined}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              {currentPhase === 'scenario' && currentQuestion === scenarioQuestions.length - 1 
                ? 'عرض النتائج'
                : 'التالي'
              }
              <ChevronLeft size={18} className="mr-1" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const results = calculateResults();

    return (
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Report Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
            <Award className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">تقرير الجاهزية المهنية</h2>
            <p className="opacity-80">تقييم شامل لمهاراتك وجاهزيتك للمقابلات الوظيفية</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-3xl font-bold text-blue-600">{Math.round(results.percentage)}%</p>
                <p className="text-sm text-gray-600">النتيجة الكلية</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-3xl font-bold text-gray-800">{results.totalScore}/{results.totalQuestions}</p>
                <p className="text-sm text-gray-600">الإجابات الصحيحة</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className={`text-xl font-bold ${
                  results.readinessColor === 'green' ? 'text-green-600' :
                  results.readinessColor === 'blue' ? 'text-blue-600' :
                  results.readinessColor === 'yellow' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>{results.readinessLevel}</p>
                <p className="text-sm text-gray-600">تصنيف الجاهزية</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-xl font-bold text-gray-800">{userInfo.name}</p>
                <p className="text-sm text-gray-600">المتقدم</p>
              </div>
            </div>

            {/* Assessment Breakdown */}
            <h3 className="font-bold text-gray-800 mb-4">تفاصيل التقييم</h3>
            <div className="space-y-4">
              {results.assessments.map((assessment, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">{assessment.category}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      assessment.status === 'excellent' ? 'bg-green-100 text-green-700' :
                      assessment.status === 'good' ? 'bg-blue-100 text-blue-700' :
                      assessment.status === 'needs_improvement' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {assessment.status === 'excellent' ? 'ممتاز' :
                       assessment.status === 'good' ? 'جيد' :
                       assessment.status === 'needs_improvement' ? 'يحتاج تحسين' :
                       'ضعيف'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${
                        assessment.status === 'excellent' ? 'bg-green-500' :
                        assessment.status === 'good' ? 'bg-blue-500' :
                        assessment.status === 'needs_improvement' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${(assessment.score / assessment.maxScore) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1 text-left">{assessment.score}/{assessment.maxScore}</p>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            {results.recommendations.length > 0 && (
              <div className="mt-6 bg-amber-50 p-4 rounded-xl border border-amber-200">
                <h3 className="font-bold text-amber-800 mb-3 flex items-center">
                  <AlertTriangle size={18} className="ml-2" />
                  توصيات التحسين
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {results.recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="p-4 bg-gray-50 border-t flex gap-4">
            <button className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-blue-700 flex items-center justify-center">
              <Download size={18} className="ml-2" />
              تحميل التقرير PDF
            </button>
            <button 
              onClick={() => {
                setCurrentPhase('setup');
                setCurrentQuestion(0);
                setAnswers({});
                setSelectedPath(null);
                setIsStarted(false);
              }}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              إعادة التقييم
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-8 font-sans min-h-screen bg-gradient-to-br from-gray-50 to-blue-50" dir="rtl">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
          <Briefcase className="text-blue-600 ml-3" size={32} />
          باقة التأهيل والاعتماد الوظيفي
        </h1>
        <p className="text-gray-600">محاكاة مقابلات العمل الحقيقية مع تقرير احترافي عن جاهزيتك المهنية</p>
      </div>

      {/* Features Banner */}
      {!isStarted && (
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center">
              <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">محاكاة واقعية</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center">
              <Brain className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">تقييم موضوعي</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center">
              <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">تقرير احترافي</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center">
              <TrendingUp className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">توصيات تطوير</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {currentPhase === 'setup' && renderSetup()}
      {(currentPhase === 'technical' || currentPhase === 'behavioral' || currentPhase === 'scenario') && renderQuestion()}
      {currentPhase === 'results' && renderResults()}
    </div>
  );
}
