'use client';

import { useState } from 'react';
import { Award, Clock, CheckCircle, FileText, QrCode, Shield, BookOpen, Users, Target, ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';

const packages = [
  {
    name: 'باقة المهني المشغول',
    hours: 10,
    features: ['محتوى مختصر ومركز', 'شهادة فورية بعد الاعتماد', 'أسئلة تطبيقية عملية', 'كود تحقق QR'],
    popular: false,
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'باقة التميز المهني',
    hours: 20,
    features: ['تنوع تخصصي شامل', 'دعم فني متخصص', 'شهادات معتمدة', 'تقارير أداء مفصلة', 'استشارة مهنية قصيرة'],
    popular: true,
    color: 'from-purple-500 to-purple-600',
  },
  {
    name: 'باقة القيادة المهنية',
    hours: 40,
    features: ['تخصص متقدم + أخلاقيات', 'استشارة مهنية شاملة', 'شهادات متعددة', 'دعم فني أولوية', 'تقارير تحليلية متقدمة', 'وصول لمحتوى حصري'],
    popular: false,
    color: 'from-amber-500 to-amber-600',
  },
];

const targetAudience = [
  { icon: Shield, title: 'المراجعين الداخليين', desc: 'CIA - IIA' },
  { icon: FileText, title: 'المحاسبين', desc: 'SOCPA - CPA - CMA' },
  { icon: Target, title: 'مدراء المشاريع', desc: 'PMP - PRINCE2' },
  { icon: Users, title: 'موظفي الجودة والحوكمة', desc: 'ISO - COSO' },
];

const certModels = [
  {
    title: 'النموذج الأول: الإجابة على أسئلة مهنية',
    desc: 'اختر مجالك (مراجعة - محاسبة - VAT - إدارة - حوكمة) واحصل على 5-10 أسئلة تحليلية عملية. أجب كتابةً وتُصدر الشهادة بعد الاعتماد.',
    hours: '1-2 ساعة معتمدة',
    icon: BookOpen,
  },
  {
    title: 'النموذج الثاني: كتابة مقال مهني',
    desc: 'اختر موضوعاً مهنياً واكتب مقالاً تحليلياً قصيراً يُظهر خبرتك العملية. يتم تقييمه من خبراء متخصصين.',
    hours: '2-3 ساعات معتمدة',
    icon: FileText,
  },
];

export default function CertifiedHoursPage() {
  const [selectedModel, setSelectedModel] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" dir="rtl">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/5 to-transparent" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            خطى للاعتماد المهني والتطوير المستمر
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            الساعات المعتمدة والشهادات المهنية
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            احصل على ساعاتك المعتمدة بدون حضور دورات طويلة. من خلال الإجابة على أسئلة تطبيقية أو كتابة مقال مهني قصير، وثّق خبرتك العملية وحوّلها إلى ساعات تطوير معتمدة.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/subscribe" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl">
              ابدأ الآن
            </Link>
            <Link href="/contact" className="border-2 border-purple-300 text-purple-700 dark:text-purple-300 px-8 py-3 rounded-xl font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all">
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
            كيف تحصل على ساعاتك المعتمدة؟
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            نموذج مبتكر للتطوير المهني المستمر يعتمد على التفكير والتحليل المهني
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {certModels.map((model, i) => (
              <div
                key={i}
                onClick={() => setSelectedModel(i)}
                className={`p-8 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedModel === i
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg'
                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/40 rounded-xl">
                    <model.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{model.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{model.desc}</p>
                    <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-800/40 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-lg text-sm">
                      <Clock className="w-4 h-4" />
                      {model.hours}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">الفئات المستهدفة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {targetAudience.map((item, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl text-center shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Details */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">شكل الشهادة المعتمدة</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">كل شهادة تحتوي على العناصر التالية</p>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { icon: '👤', text: 'اسم المتدرب' },
                { icon: '📅', text: 'التاريخ' },
                { icon: '🏷️', text: 'شعار خطى (عربي/إنجليزي)' },
                { icon: '📋', text: 'عنوان البرنامج' },
                { icon: '⏱️', text: 'عدد الساعات المعتمدة' },
                { icon: '🔐', text: 'كود تحقق QR' },
                { icon: '💼', text: 'المجال المهني' },
                { icon: '#️⃣', text: 'رقم شهادة فريد' },
                { icon: '✍️', text: 'توقيع وختم خطى' },
                { icon: '🖨️', text: 'قابلة للطباعة في أي وقت' },
                { icon: '⚡', text: 'إصدار تلقائي فوري' },
                { icon: '🔍', text: 'صفحة تحقق عامة' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">باقات الساعات المعتمدة</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">اختر الباقة المناسبة لاحتياجاتك المهنية</p>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <div key={i} className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border ${pkg.popular ? 'border-purple-500 shadow-lg scale-105' : 'border-gray-200 dark:border-gray-700'}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-3 h-3" /> الأكثر شيوعاً
                  </div>
                )}
                <div className={`w-16 h-16 bg-gradient-to-br ${pkg.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <span className="text-white text-2xl font-bold">{pkg.hours}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{pkg.name}</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {pkg.hours} <span className="text-base font-normal text-gray-500">ساعة معتمدة</span>
                </p>
                <ul className="space-y-3 mt-6 mb-8">
                  {pkg.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/subscribe" className={`block text-center py-3 rounded-xl font-medium transition-all ${pkg.popular ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white'}`}>
                  اشترك الآن
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">جدّد ترخيصك الآن</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">ساعات معتمدة... بدون تعقيد. طوّر مهنتك بخطى واثقة</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            ساعات تطوير مهني قابلة للاحتساب وفق متطلبات الجهات المهنية المختلفة
          </p>
          <Link href="/subscribe" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-xl font-medium text-lg transition-all shadow-lg hover:shadow-xl">
            احصل على ساعاتك المعتمدة
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
