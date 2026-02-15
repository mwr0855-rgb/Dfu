'use client';

import { useState, useEffect } from 'react';
import { 
  BookOpen, Clock, CheckCircle, XCircle, Award, Target,
  Play, Pause, RefreshCw, ChevronRight, ChevronLeft, 
  BarChart3, Trophy, Star, Flag, HelpCircle, FileText,
  Download, Share2, AlertTriangle, Zap, Brain
} from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  part: 1 | 2 | 3;
  domain: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface ExamResult {
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  timeTaken: string;
  partScores: { part: number; correct: number; total: number }[];
}

export default function QuestionBankPage() {
  const [activeTab, setActiveTab] = useState<'practice' | 'exam' | 'history'>('practice');
  const [selectedPart, setSelectedPart] = useState<1 | 2 | 3 | null>(null);
  const [examMode, setExamMode] = useState<'practice' | 'timed' | 'mini'>('practice');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const questions: Question[] = [
    // Part 1 Questions
    {
      id: 1,
      text: 'ما هو الهدف الرئيسي للتدقيق الداخلي وفقاً لمعايير IIA؟',
      options: [
        'اكتشاف الاحتيال والأخطاء',
        'إضافة قيمة وتحسين عمليات المنظمة',
        'التأكد من الالتزام بالقوانين فقط',
        'إعداد القوائم المالية'
      ],
      correctAnswer: 1,
      explanation: 'وفقاً لتعريف IIA، التدقيق الداخلي هو نشاط استشاري مستقل وموضوعي يهدف لإضافة قيمة وتحسين عمليات المنظمة.',
      part: 1,
      domain: 'الأساسيات',
      difficulty: 'easy'
    },
    {
      id: 2,
      text: 'أي من التالي يُعد من متطلبات الاستقلالية التنظيمية للتدقيق الداخلي؟',
      options: [
        'أن يتبع المدقق للمدير المالي',
        'أن يتبع المدقق لمجلس الإدارة أو لجنة التدقيق',
        'أن يتبع المدقق للمدير التنفيذي',
        'أن يعمل المدقق بدوام جزئي'
      ],
      correctAnswer: 1,
      explanation: 'الاستقلالية التنظيمية تتطلب تبعية نشاط التدقيق الداخلي لمستوى يمكّنه من أداء مسؤولياته، وعادة يكون لمجلس الإدارة أو لجنة التدقيق.',
      part: 1,
      domain: 'الاستقلالية والموضوعية',
      difficulty: 'medium'
    },
    {
      id: 3,
      text: 'ما هي المكونات الخمسة لإطار COSO للرقابة الداخلية؟',
      options: [
        'التخطيط، التنفيذ، المراقبة، التقييم، التحسين',
        'بيئة الرقابة، تقييم المخاطر، أنشطة الرقابة، المعلومات والاتصال، المراقبة',
        'الهدف، الإجراءات، المخرجات، التغذية الراجعة، التصحيح',
        'السياسات، الإجراءات، الموظفين، التقنية، التقارير'
      ],
      correctAnswer: 1,
      explanation: 'إطار COSO يتكون من: بيئة الرقابة، تقييم المخاطر، أنشطة الرقابة، المعلومات والاتصال، والمراقبة.',
      part: 1,
      domain: 'الرقابة الداخلية',
      difficulty: 'medium'
    },
    // Part 2 Questions
    {
      id: 4,
      text: 'أي من التالي يمثل المرحلة الأولى في عملية تخطيط مهمة التدقيق؟',
      options: [
        'جمع الأدلة',
        'فهم العميل والعمليات محل التدقيق',
        'إعداد التقرير النهائي',
        'اختيار العينات'
      ],
      correctAnswer: 1,
      explanation: 'فهم العميل والعمليات محل التدقيق هي المرحلة الأولى لتحديد نطاق ومخاطر المهمة.',
      part: 2,
      domain: 'تخطيط المهمة',
      difficulty: 'easy'
    },
    {
      id: 5,
      text: 'ما هو الغرض الرئيسي من أوراق العمل في التدقيق الداخلي؟',
      options: [
        'تلبية متطلبات الجهات الرقابية فقط',
        'توثيق العمل المنجز ودعم استنتاجات المدقق',
        'إعداد القوائم المالية',
        'تقييم أداء الموظفين'
      ],
      correctAnswer: 1,
      explanation: 'أوراق العمل توثق المعلومات المحصلة والتحليلات المنجزة وتدعم نتائج واستنتاجات المدقق.',
      part: 2,
      domain: 'تنفيذ المهمة',
      difficulty: 'medium'
    },
    {
      id: 6,
      text: 'عند اكتشاف ملاحظة جوهرية أثناء التدقيق، ما هو التصرف الصحيح؟',
      options: [
        'تأجيل الإبلاغ حتى نهاية المهمة',
        'إبلاغ الإدارة المعنية فوراً',
        'تجاهلها إذا كانت خارج نطاق المهمة',
        'التواصل مع المراجع الخارجي أولاً'
      ],
      correctAnswer: 1,
      explanation: 'الملاحظات الجوهرية يجب إبلاغ الإدارة المعنية بها فوراً لاتخاذ الإجراءات التصحيحية المناسبة.',
      part: 2,
      domain: 'إعداد التقارير',
      difficulty: 'hard'
    },
    // Part 3 Questions
    {
      id: 7,
      text: 'أي من النسب المالية التالية تقيس قدرة الشركة على سداد التزاماتها قصيرة الأجل؟',
      options: [
        'نسبة الدين إلى حقوق الملكية',
        'نسبة التداول (السيولة)',
        'معدل دوران الأصول',
        'هامش الربح الصافي'
      ],
      correctAnswer: 1,
      explanation: 'نسبة التداول (الأصول المتداولة / الخصوم المتداولة) تقيس قدرة الشركة على سداد التزاماتها قصيرة الأجل.',
      part: 3,
      domain: 'التحليل المالي',
      difficulty: 'easy'
    },
    {
      id: 8,
      text: 'ما هو الخطر الرئيسي المرتبط بعدم الفصل بين الواجبات في نظم المعلومات؟',
      options: [
        'بطء معالجة البيانات',
        'احتمالية التلاعب والاحتيال',
        'ارتفاع تكاليف التشغيل',
        'صعوبة التدريب'
      ],
      correctAnswer: 1,
      explanation: 'عدم الفصل بين الواجبات يزيد من احتمالية التلاعب والاحتيال لأن نفس الشخص يمكنه إدخال وتعديل واعتماد المعاملات.',
      part: 3,
      domain: 'أمن المعلومات',
      difficulty: 'medium'
    },
    {
      id: 9,
      text: 'وفقاً لإطار COBIT، ما هو الهدف الرئيسي من حوكمة تقنية المعلومات؟',
      options: [
        'تقليل تكاليف تقنية المعلومات',
        'ضمان توافق تقنية المعلومات مع أهداف الأعمال',
        'زيادة سرعة الأنظمة',
        'توظيف المزيد من الفنيين'
      ],
      correctAnswer: 1,
      explanation: 'حوكمة تقنية المعلومات تهدف لضمان توافق استثمارات وخدمات التقنية مع الأهداف الاستراتيجية للمنظمة.',
      part: 3,
      domain: 'حوكمة تقنية المعلومات',
      difficulty: 'hard'
    },
    {
      id: 10,
      text: 'أي من التالي يُعد مؤشراً على احتمال وجود احتيال مالي؟',
      options: [
        'زيادة المبيعات بنسبة 10%',
        'نمو غير متوقع في الإيرادات مع انخفاض التدفقات النقدية',
        'انخفاض معدل دوران الموظفين',
        'استقرار هامش الربح'
      ],
      correctAnswer: 1,
      explanation: 'التناقض بين نمو الإيرادات وانخفاض التدفقات النقدية قد يشير إلى تضخم في المبيعات أو مشاكل في التحصيل أو احتيال محتمل.',
      part: 3,
      domain: 'اكتشاف الاحتيال',
      difficulty: 'hard'
    }
  ];

  const partDescriptions = {
    1: {
      title: 'أساسيات التدقيق الداخلي',
      englishTitle: 'Essentials of Internal Auditing',
      topics: ['المعايير والأخلاقيات', 'الاستقلالية والموضوعية', 'الكفاءة المهنية', 'إدارة المخاطر والرقابة', 'الحوكمة'],
      questionCount: 125,
      duration: '2.5 ساعة'
    },
    2: {
      title: 'ممارسة التدقيق الداخلي',
      englishTitle: 'Practice of Internal Auditing',
      topics: ['إدارة نشاط التدقيق', 'تخطيط المهمة', 'تنفيذ المهمة', 'إعداد التقارير', 'المتابعة'],
      questionCount: 100,
      duration: '2 ساعة'
    },
    3: {
      title: 'المعرفة التجارية والتقنية',
      englishTitle: 'Business Knowledge for Internal Auditing',
      topics: ['العمليات التجارية', 'التحليل المالي', 'أمن المعلومات', 'تقنية المعلومات', 'اكتشاف الاحتيال'],
      questionCount: 100,
      duration: '2 ساعة'
    }
  };

  const filteredQuestions = selectedPart 
    ? questions.filter(q => q.part === selectedPart)
    : questions;

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isTimerRunning) {
      setShowResults(true);
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answerIndex }));
  };

  const toggleFlag = (questionIndex: number) => {
    setFlaggedQuestions(prev => 
      prev.includes(questionIndex) 
        ? prev.filter(q => q !== questionIndex)
        : [...prev, questionIndex]
    );
  };

  const calculateResults = (): ExamResult => {
    let correct = 0;
    const partScores: { part: number; correct: number; total: number }[] = [
      { part: 1, correct: 0, total: 0 },
      { part: 2, correct: 0, total: 0 },
      { part: 3, correct: 0, total: 0 }
    ];

    filteredQuestions.forEach((q, idx) => {
      const isCorrect = answers[idx] === q.correctAnswer;
      if (isCorrect) {
        correct++;
        partScores[q.part - 1].correct++;
      }
      partScores[q.part - 1].total++;
    });

    return {
      totalQuestions: filteredQuestions.length,
      correctAnswers: correct,
      percentage: (correct / filteredQuestions.length) * 100,
      timeTaken: formatTime(examMode === 'timed' ? (selectedPart ? 1800 - timeRemaining : 3600 - timeRemaining) : 0),
      partScores
    };
  };

  const startExam = (mode: 'practice' | 'timed' | 'mini') => {
    setExamMode(mode);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setFlaggedQuestions([]);
    
    if (mode === 'timed') {
      setTimeRemaining(selectedPart ? 1800 : 3600); // 30 min per part or 60 min total
      setIsTimerRunning(true);
    } else if (mode === 'mini') {
      setTimeRemaining(600); // 10 min for mini exam
      setIsTimerRunning(true);
    }
  };

  const renderPartSelection = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-2">بنك أسئلة زمالة المراجع الداخلي (CIA)</h2>
        <p className="text-indigo-100">أكثر من 2000 سؤال تدريبي مع شرح مفصل لكل إجابة</p>
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <span className="text-sm">📝 3 أجزاء</span>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <span className="text-sm">⏱️ اختبارات موقوتة</span>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <span className="text-sm">📊 تحليل الأداء</span>
          </div>
        </div>
      </div>

      {/* Part Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {([1, 2, 3] as const).map(part => {
          const info = partDescriptions[part];
          return (
            <div 
              key={part}
              onClick={() => setSelectedPart(part)}
              className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:border-indigo-500 overflow-hidden cursor-pointer transition-all hover:shadow-xl"
            >
              <div className={`p-4 text-white ${
                part === 1 ? 'bg-blue-600' : part === 2 ? 'bg-purple-600' : 'bg-amber-600'
              }`}>
                <p className="text-sm opacity-80">الجزء {part}</p>
                <h3 className="text-lg font-bold">{info.title}</h3>
                <p className="text-xs opacity-70">{info.englishTitle}</p>
              </div>
              
              <div className="p-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">المحاور الرئيسية:</p>
                  <div className="flex flex-wrap gap-1">
                    {info.topics.map((topic, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between text-sm text-gray-500 border-t pt-3">
                  <span className="flex items-center">
                    <HelpCircle size={14} className="ml-1" />
                    {info.questionCount} سؤال
                  </span>
                  <span className="flex items-center">
                    <Clock size={14} className="ml-1" />
                    {info.duration}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Exam Modes */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">أنماط التدريب</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => startExam('practice')}
            className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-right"
          >
            <BookOpen className="text-blue-600 mb-2" size={24} />
            <h4 className="font-bold text-gray-800">تدريب حر</h4>
            <p className="text-sm text-gray-500">تدرب بدون وقت محدد مع الشرح التفصيلي</p>
          </button>
          
          <button
            onClick={() => startExam('timed')}
            className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all text-right"
          >
            <Clock className="text-purple-600 mb-2" size={24} />
            <h4 className="font-bold text-gray-800">اختبار موقوت</h4>
            <p className="text-sm text-gray-500">محاكاة الاختبار الحقيقي</p>
          </button>
          
          <button
            onClick={() => startExam('mini')}
            className="p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-right"
          >
            <Zap className="text-green-600 mb-2" size={24} />
            <h4 className="font-bold text-gray-800">اختبار سريع</h4>
            <p className="text-sm text-gray-500">10 أسئلة في 10 دقائق</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderQuestion = () => {
    const question = filteredQuestions[currentQuestion];
    if (!question) return null;

    return (
      <div className="max-w-4xl mx-auto">
        {/* Header Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex justify-between items-center">
          <button
            onClick={() => {
              setSelectedPart(null);
              setIsTimerRunning(false);
            }}
            className="text-gray-600 hover:text-gray-800"
          >
            ← العودة
          </button>
          
          <div className="flex items-center gap-4">
            {(examMode === 'timed' || examMode === 'mini') && (
              <div className={`px-4 py-2 rounded-lg font-mono font-bold ${
                timeRemaining < 60 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
              }`}>
                <Clock size={16} className="inline ml-2" />
                {formatTime(timeRemaining)}
              </div>
            )}
            
            <span className="text-gray-500">
              {currentQuestion + 1} / {filteredQuestions.length}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Question Header */}
          <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                question.part === 1 ? 'bg-blue-100 text-blue-700' :
                question.part === 2 ? 'bg-purple-100 text-purple-700' :
                'bg-amber-100 text-amber-700'
              }`}>
                الجزء {question.part}
              </span>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                {question.domain}
              </span>
              <span className={`px-2 py-1 rounded text-xs ${
                question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {question.difficulty === 'easy' ? 'سهل' : question.difficulty === 'medium' ? 'متوسط' : 'صعب'}
              </span>
            </div>
            
            <button
              onClick={() => toggleFlag(currentQuestion)}
              className={`p-2 rounded-lg transition-colors ${
                flaggedQuestions.includes(currentQuestion)
                  ? 'bg-red-100 text-red-600'
                  : 'hover:bg-gray-100 text-gray-400'
              }`}
            >
              <Flag size={18} />
            </button>
          </div>

          {/* Question Text */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">{question.text}</h3>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, idx) => {
                const isSelected = answers[currentQuestion] === idx;
                const isCorrect = idx === question.correctAnswer;
                const showAnswer = showExplanation && answers[currentQuestion] !== undefined;
                
                return (
                  <button
                    key={idx}
                    onClick={() => !showExplanation && handleAnswer(idx)}
                    disabled={showExplanation}
                    className={`w-full p-4 rounded-xl text-right transition-all border-2 ${
                      showAnswer
                        ? isCorrect
                          ? 'bg-green-50 border-green-500 text-green-800'
                          : isSelected
                            ? 'bg-red-50 border-red-500 text-red-800'
                            : 'border-gray-200 text-gray-600'
                        : isSelected
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-800'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-bold ml-2">{String.fromCharCode(65 + idx)}.</span>
                    {option}
                    {showAnswer && isCorrect && (
                      <CheckCircle className="inline mr-2 text-green-600" size={18} />
                    )}
                    {showAnswer && isSelected && !isCorrect && (
                      <XCircle className="inline mr-2 text-red-600" size={18} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <h4 className="font-bold text-blue-800 mb-2 flex items-center">
                  <Brain size={18} className="ml-2" />
                  الشرح
                </h4>
                <p className="text-blue-700">{question.explanation}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="p-4 bg-gray-50 border-t flex justify-between">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 flex items-center"
            >
              <ChevronRight size={18} className="ml-1" />
              السابق
            </button>

            <div className="flex gap-2">
              {examMode === 'practice' && answers[currentQuestion] !== undefined && (
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium"
                >
                  {showExplanation ? 'إخفاء الشرح' : 'عرض الشرح'}
                </button>
              )}
            </div>

            <button
              onClick={() => {
                if (currentQuestion === filteredQuestions.length - 1) {
                  setShowResults(true);
                  setIsTimerRunning(false);
                } else {
                  setCurrentQuestion(currentQuestion + 1);
                  setShowExplanation(false);
                }
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 flex items-center"
            >
              {currentQuestion === filteredQuestions.length - 1 ? 'إنهاء الاختبار' : 'التالي'}
              <ChevronLeft size={18} className="mr-1" />
            </button>
          </div>
        </div>

        {/* Question Navigator */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h4 className="font-bold text-gray-700 mb-3">الأسئلة</h4>
          <div className="flex flex-wrap gap-2">
            {filteredQuestions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentQuestion(idx);
                  setShowExplanation(false);
                }}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                  idx === currentQuestion
                    ? 'bg-indigo-600 text-white'
                    : answers[idx] !== undefined
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : flaggedQuestions.includes(idx)
                        ? 'bg-red-100 text-red-700 border border-red-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const results = calculateResults();
    const passed = results.percentage >= 60;

    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className={`p-8 text-white text-center ${passed ? 'bg-green-600' : 'bg-red-600'}`}>
            {passed ? (
              <Trophy className="w-16 h-16 mx-auto mb-4" />
            ) : (
              <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
            )}
            <h2 className="text-2xl font-bold mb-2">
              {passed ? 'مبروك! لقد اجتزت الاختبار' : 'لم تجتز الاختبار'}
            </h2>
            <p className="opacity-80">
              {passed ? 'أداء ممتاز، استمر في التدريب' : 'تحتاج إلى مزيد من المراجعة'}
            </p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-4xl font-bold text-gray-900">{Math.round(results.percentage)}%</p>
                <p className="text-sm text-gray-600">النتيجة</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-4xl font-bold text-green-600">{results.correctAnswers}</p>
                <p className="text-sm text-gray-600">إجابات صحيحة</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-4xl font-bold text-red-600">{results.totalQuestions - results.correctAnswers}</p>
                <p className="text-sm text-gray-600">إجابات خاطئة</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-2xl font-bold text-gray-700">{results.timeTaken || '--:--'}</p>
                <p className="text-sm text-gray-600">الوقت المستغرق</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowResults(false);
                  setSelectedPart(null);
                }}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700"
              >
                اختبار جديد
              </button>
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setShowExplanation(true);
                }}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50"
              >
                مراجعة الإجابات
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-8 font-sans min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <BookOpen className="text-indigo-600 ml-3" size={32} />
          بنك الأسئلة (CIA)
        </h1>
        <p className="text-gray-600">تدرب على أسئلة زمالة المراجع الداخلي المعتمد</p>
      </div>

      {/* Content */}
      {showResults ? (
        renderResults()
      ) : selectedPart !== null || Object.keys(answers).length > 0 ? (
        renderQuestion()
      ) : (
        renderPartSelection()
      )}
    </div>
  );
}
