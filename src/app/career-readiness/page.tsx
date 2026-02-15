'use client';

import { useState } from 'react';
import { Briefcase, Target, FileText, CheckCircle, Clock, BarChart3, User, ArrowLeft, Star, Shield, Brain, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const tracks = [
  {
    id: 'accountant',
    title: 'محاسب مالي',
    desc: 'يقيس الفهم المالي والتحليل',
    icon: BarChart3,
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'auditor',
    title: 'مراجع داخلي',
    desc: 'يقيس عقلية المخاطر والحكم المهني',
    icon: Shield,
    color: 'from-purple-500 to-purple-600',
  },
];

const phases = [
  {
    title: 'المرحلة A: أسئلة فنية',
    desc: '10 أسئلة اختيار من متعدد + 5 أسئلة سيناريو',
    icon: Brain,
    weight: '30%',
    weightLabel: 'المعرفة الفنية',
  },
  {
    title: 'المرحلة B: أسئلة سلوكية',
    desc: 'كيف تتصرف؟ ماذا تفعل لو؟ احكي موقف حقيقي',
    icon: MessageSquare,
    weight: '25%',
    weightLabel: 'التفكير التحليلي',
  },
  {
    title: 'المرحلة C: حالة عملية',
    desc: 'مشكلة مالية، خطأ محاسبي، قرار إداري - 10 دقائق',
    icon: Target,
    weight: '25%+20%',
    weightLabel: 'عقلية المخاطر + السلوك',
  },
];

const graduatePackages = [
  {
    name: 'باقة "انطلاقة"',
    subtitle: 'دليل الخريج الذكي',
    price: 'مجانية',
    features: [
      'جلسة توجيه مهني فردية (30 دقيقة)',
      'عبر Zoom مع خبير متخصص',
      'تحديد المسار المهني المناسب',
      'نصائح عملية لسوق العمل',
    ],
    cta: 'احجز موعدك مجاناً',
    color: 'border-green-500',
    badge: 'مجاني',
  },
  {
    name: 'باقة "استعد للنجاح"',
    subtitle: 'مقابلة عمل واقعية',
    price: '$5',
    features: [
      'مقابلة حقيقية 45 دقيقة عبر Zoom',
      'أسئلة فعلية من كبرى الشركات (Big 4)',
      'تقييم فوري لأدائك',
      'تقرير مكتوب بتوصيات مخصصة',
      'نماذج إجابات احترافية',
    ],
    cta: 'ابدأ التقييم',
    color: 'border-purple-500',
    badge: '$5 فقط',
  },
];

export default function CareerReadinessPage() {
  const [selectedTrack, setSelectedTrack] = useState('accountant');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" dir="rtl">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Briefcase className="w-4 h-4" />
            باقة التأهيل والاعتماد الوظيفي
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            محاكاة مقابلات العمل الاحترافية
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4 leading-relaxed">
            هذه الباقة تحاكي مقابلات العمل الحقيقية وتقيس طريقة التفكير، الحكم المهني، والسلوك ثم تمنحك تقريراً تنفيذياً واضحاً عن جاهزيتك المهنية.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {['محاكاة واقعية', 'تقييم موضوعي', 'تقرير احترافي', 'عملي 100%'].map((tag, i) => (
              <span key={i} className="bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Track Selection */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">اختر مسارك المهني</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-10">حدد التخصص الذي تريد تقييم جاهزيتك فيه</p>
          <div className="grid md:grid-cols-2 gap-6">
            {tracks.map((track) => (
              <div
                key={track.id}
                onClick={() => setSelectedTrack(track.id)}
                className={`p-8 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedTrack === track.id
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg'
                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                }`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${track.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <track.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{track.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{track.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Phases */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">مراحل التقييم</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {phases.map((phase, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/40 rounded-xl flex items-center justify-center">
                    <phase.icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-purple-600 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded">{phase.weight}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{phase.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scoring System */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">نظام التقييم الذكي</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-10">بعد الانتهاء تحصل على تقرير احترافي شامل</p>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  معايير التقييم
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'المعرفة الفنية', value: 30 },
                    { label: 'التفكير التحليلي', value: 25 },
                    { label: 'عقلية المخاطر', value: 25 },
                    { label: 'السلوك والتواصل', value: 20 },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                        <span className="font-bold text-purple-600">{item.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-purple-600 rounded-full h-2" style={{ width: `${item.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  محتويات التقرير
                </h3>
                <ul className="space-y-3">
                  {[
                    'تصنيف جاهزية التوظيف (جاهز / جاهز جزئياً / غير جاهز)',
                    'ملخص تنفيذي مهني',
                    'نقاط القوة التفصيلية',
                    'نقاط التحسين مع توصيات',
                    'مقارنة بمعايير السوق',
                    'خطة تطوير مخصصة',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Graduate Packages */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">باقات خريجي الجامعات</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">الشهادة تفتح لك الباب... لكن المهارة تجعلك تبقى!</p>
          <div className="grid md:grid-cols-2 gap-8">
            {graduatePackages.map((pkg, i) => (
              <div key={i} className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border-2 ${pkg.color}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${i === 0 ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                    {pkg.badge}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{pkg.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">{pkg.subtitle}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/subscribe" className={`block text-center py-3 rounded-xl font-medium transition-all ${i === 0 ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}>
                  {pkg.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
            * الباقات متاحة للخريجين الجدد خلال السنة الأولى بعد التخرج
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            80% من الخريجين يفشلون في المقابلات ليس لضعف مؤهلاتهم... بل لأنهم لم يتدربوا على السيناريو الحقيقي!
          </p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">هل أنت مستعد لتحويل شهادتك إلى وظيفة أحلامك؟</h2>
          <Link href="/subscribe" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-xl font-medium text-lg transition-all shadow-lg hover:shadow-xl">
            ابدأ التقييم الآن
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
