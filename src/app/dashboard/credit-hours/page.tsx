'use client';

import { useState } from 'react';
import { 
  Clock, Award, CheckCircle, BookOpen, Calendar, Play,
  Download, CreditCard, Star, Trophy, Target, FileText,
  ChevronRight, Lock, Unlock, Users, BarChart3, Gift
} from 'lucide-react';

interface Package {
  id: number;
  name: string;
  hours: number;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  color: string;
}

interface CompletedCourse {
  id: number;
  title: string;
  hours: number;
  completedDate: string;
  certificateIssued: boolean;
  score: number;
}

export default function CreditHoursPage() {
  const [activeTab, setActiveTab] = useState<'packages' | 'my-hours' | 'activities'>('packages');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const packages: Package[] = [
    {
      id: 1,
      name: 'الباقة الأساسية',
      hours: 10,
      price: 500,
      description: 'مثالية للمبتدئين في مجال التعليم المستمر',
      features: [
        '10 ساعات معتمدة',
        'شهادة إتمام لكل نشاط',
        'وصول لمحتوى الأنشطة لمدة 3 أشهر',
        'دعم فني عبر البريد الإلكتروني'
      ],
      color: 'blue'
    },
    {
      id: 2,
      name: 'الباقة المتقدمة',
      hours: 25,
      price: 1000,
      description: 'الأكثر طلباً للمحترفين',
      features: [
        '25 ساعة معتمدة',
        'شهادة إتمام معتمدة',
        'وصول لمحتوى الأنشطة لمدة 6 أشهر',
        'دعم فني مباشر',
        'اختبارات تقييم متقدمة'
      ],
      popular: true,
      color: 'purple'
    },
    {
      id: 3,
      name: 'الباقة الاحترافية',
      hours: 50,
      price: 1800,
      description: 'للمتخصصين الراغبين في التميز',
      features: [
        '50 ساعة معتمدة',
        'شهادة إتمام معتمدة ومصدقة',
        'وصول مدى الحياة للمحتوى',
        'دعم فني على مدار الساعة',
        'جلسات استشارية مع الخبراء',
        'أولوية في الدورات الجديدة'
      ],
      color: 'amber'
    }
  ];

  const activities = [
    {
      id: 1,
      title: 'معايير المراجعة الداخلية الدولية - تحديث 2025',
      type: 'webinar',
      hours: 2,
      status: 'available',
      instructor: 'د. محمد أبو المجد',
      date: '2025-02-20'
    },
    {
      id: 2,
      title: 'إدارة مخاطر الاحتيال',
      type: 'course',
      hours: 4,
      status: 'available',
      instructor: 'أ. سارة العمري',
      date: '2025-02-25'
    },
    {
      id: 3,
      title: 'التحليل المالي باستخدام Excel',
      type: 'workshop',
      hours: 3,
      status: 'coming_soon',
      instructor: 'أ. أحمد السعيد',
      date: '2025-03-05'
    },
    {
      id: 4,
      title: 'أساسيات حوكمة الشركات',
      type: 'course',
      hours: 5,
      status: 'available',
      instructor: 'د. خالد الفيصل',
      date: '2025-03-10'
    }
  ];

  const completedCourses: CompletedCourse[] = [
    { id: 1, title: 'أساسيات المراجعة الداخلية', hours: 4, completedDate: '2025-01-15', certificateIssued: true, score: 92 },
    { id: 2, title: 'إعداد القوائم المالية', hours: 3, completedDate: '2025-01-28', certificateIssued: true, score: 88 },
  ];

  const userStats = {
    totalHours: 7,
    remainingHours: 18,
    completedActivities: 2,
    certificates: 2,
    currentPackage: 'الباقة المتقدمة'
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; light: string; gradient: string }> = {
      blue: { bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-500', light: 'bg-blue-50', gradient: 'from-blue-600 to-blue-700' },
      purple: { bg: 'bg-purple-600', text: 'text-purple-600', border: 'border-purple-500', light: 'bg-purple-50', gradient: 'from-purple-600 to-indigo-600' },
      amber: { bg: 'bg-amber-600', text: 'text-amber-600', border: 'border-amber-500', light: 'bg-amber-50', gradient: 'from-amber-500 to-orange-500' },
      green: { bg: 'bg-green-600', text: 'text-green-600', border: 'border-green-500', light: 'bg-green-50', gradient: 'from-green-600 to-green-700' }
    };
    return colors[color] || colors.blue;
  };

  const renderPackagesTab = () => (
    <div className="space-y-8">
      {/* Info Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-2">نظام الساعات المهنية المعتمدة</h2>
        <p className="text-blue-100 mb-4">
          احصل على ساعات معتمدة من خلال إتمام الأنشطة والدورات، واجتياز الاختبارات، وحضور الفعاليات المهنية.
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <span className="text-sm">✓ شهادات معتمدة</span>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <span className="text-sm">✓ اختبارات تقييم</span>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <span className="text-sm">✓ محتوى متجدد</span>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map(pkg => {
          const colorClasses = getColorClasses(pkg.color);
          return (
            <div 
              key={pkg.id} 
              className={`bg-white rounded-2xl shadow-lg border-2 overflow-hidden transition-all hover:shadow-xl relative ${
                pkg.popular ? 'border-purple-500 scale-105' : 'border-gray-200'
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  الأكثر طلباً
                </div>
              )}
              
              <div className={`p-6 bg-gradient-to-r ${colorClasses.gradient} text-white`}>
                <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                <p className="text-white/80 text-sm">{pkg.description}</p>
              </div>
              
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">${pkg.price}</span>
                  </div>
                  <p className="text-gray-500 mt-1">{pkg.hours} ساعة معتمدة</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <CheckCircle size={16} className={`${colorClasses.text} ml-2 mt-0.5 flex-shrink-0`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => setSelectedPackage(pkg)}
                  className={`w-full py-3 rounded-xl font-bold transition-colors ${
                    pkg.popular 
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : `${colorClasses.light} ${colorClasses.text} hover:opacity-80`
                  }`}
                >
                  اشترك الآن
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">كيف يعمل نظام الساعات المعتمدة؟</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="text-blue-600" size={28} />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">1. اختر الباقة</h4>
            <p className="text-sm text-gray-600">حدد عدد الساعات المناسب لاحتياجاتك</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="text-purple-600" size={28} />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">2. شارك في الأنشطة</h4>
            <p className="text-sm text-gray-600">دورات، ويبينارات، ورش عمل</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="text-amber-600" size={28} />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">3. اجتز الاختبارات</h4>
            <p className="text-sm text-gray-600">اختبارات تقييم لكل نشاط</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-green-600" size={28} />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">4. احصل على الشهادة</h4>
            <p className="text-sm text-gray-600">شهادة معتمدة تلقائية</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMyHoursTab = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">الساعات المكتسبة</p>
              <p className="text-2xl font-bold text-blue-600">{userStats.totalHours}</p>
            </div>
            <Clock className="text-blue-600" size={28} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">الساعات المتبقية</p>
              <p className="text-2xl font-bold text-green-600">{userStats.remainingHours}</p>
            </div>
            <Target className="text-green-600" size={28} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">الأنشطة المكتملة</p>
              <p className="text-2xl font-bold text-purple-600">{userStats.completedActivities}</p>
            </div>
            <CheckCircle className="text-purple-600" size={28} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">الشهادات</p>
              <p className="text-2xl font-bold text-amber-600">{userStats.certificates}</p>
            </div>
            <Award className="text-amber-600" size={28} />
          </div>
        </div>
      </div>

      {/* Current Package */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-purple-200 text-sm">الباقة الحالية</p>
            <h3 className="text-xl font-bold">{userStats.currentPackage}</h3>
          </div>
          <div className="text-right">
            <p className="text-purple-200 text-sm">التقدم</p>
            <p className="text-lg font-bold">{userStats.totalHours} / 25 ساعة</p>
          </div>
        </div>
        <div className="mt-4 w-full bg-white/20 rounded-full h-3">
          <div 
            className="h-3 bg-white rounded-full transition-all"
            style={{ width: `${(userStats.totalHours / 25) * 100}%` }}
          />
        </div>
      </div>

      {/* Completed Activities */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-bold text-gray-800">الأنشطة المكتملة</h3>
        </div>
        
        <div className="divide-y">
          {completedCourses.map(course => (
            <div key={course.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center ml-4">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{course.title}</h4>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock size={14} className="ml-1" />
                      {course.hours} ساعات
                      <span className="mx-2">•</span>
                      <Calendar size={14} className="ml-1" />
                      {course.completedDate}
                      <span className="mx-2">•</span>
                      <Star size={14} className="ml-1 text-amber-500" />
                      {course.score}%
                    </div>
                  </div>
                </div>
                
                {course.certificateIssued && (
                  <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 flex items-center">
                    <Download size={16} className="ml-1" />
                    تحميل الشهادة
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderActivitiesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">الأنشطة المتاحة</h2>
        <div className="flex gap-2">
          <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">دورات</button>
          <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm">ويبينارات</button>
          <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm">ورش عمل</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activities.map(activity => (
          <div key={activity.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ml-3 ${
                    activity.type === 'webinar' ? 'bg-purple-100' :
                    activity.type === 'course' ? 'bg-blue-100' :
                    'bg-amber-100'
                  }`}>
                    {activity.type === 'webinar' && <Users className="text-purple-600" size={24} />}
                    {activity.type === 'course' && <BookOpen className="text-blue-600" size={24} />}
                    {activity.type === 'workshop' && <Target className="text-amber-600" size={24} />}
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      activity.type === 'webinar' ? 'bg-purple-100 text-purple-700' :
                      activity.type === 'course' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {activity.type === 'webinar' && 'ويبينار'}
                      {activity.type === 'course' && 'دورة'}
                      {activity.type === 'workshop' && 'ورشة عمل'}
                    </span>
                  </div>
                </div>
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                  {activity.hours} ساعات
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 mb-2">{activity.title}</h3>
              
              <div className="text-sm text-gray-500 space-y-1 mb-4">
                <p className="flex items-center">
                  <Users size={14} className="ml-2" />
                  {activity.instructor}
                </p>
                <p className="flex items-center">
                  <Calendar size={14} className="ml-2" />
                  {activity.date}
                </p>
              </div>
              
              <button 
                disabled={activity.status === 'coming_soon'}
                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center ${
                  activity.status === 'available'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                }`}
              >
                {activity.status === 'available' ? (
                  <>
                    <Play size={18} className="ml-2" />
                    ابدأ الآن
                  </>
                ) : (
                  <>
                    <Lock size={18} className="ml-2" />
                    قريباً
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 font-sans min-h-screen bg-gradient-to-br from-gray-50 to-blue-50" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Clock className="text-blue-600 ml-3" size={32} />
          الساعات المهنية المعتمدة
        </h1>
        <p className="text-gray-600">احصل على ساعات معتمدة لتطوير مسارك المهني والحصول على شهادات موثقة</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-1 inline-flex">
        {[
          { id: 'packages', label: 'الباقات', icon: Gift },
          { id: 'my-hours', label: 'ساعاتي', icon: Clock },
          { id: 'activities', label: 'الأنشطة', icon: BookOpen }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <tab.icon size={16} className="ml-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'packages' && renderPackagesTab()}
      {activeTab === 'my-hours' && renderMyHoursTab()}
      {activeTab === 'activities' && renderActivitiesTab()}

      {/* Purchase Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">تأكيد الاشتراك</h2>
            </div>
            
            <div className="p-6">
              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <h3 className="font-bold text-gray-800 mb-2">{selectedPackage.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{selectedPackage.description}</p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">${selectedPackage.price}</span>
                  <span className="text-gray-500 mr-2">/ {selectedPackage.hours} ساعة</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <h4 className="font-medium text-gray-700">يشمل:</h4>
                <ul className="space-y-2">
                  {selectedPackage.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle size={14} className="text-green-600 ml-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-6 border-t flex gap-3">
              <button 
                onClick={() => setSelectedPackage(null)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-blue-700 flex items-center justify-center">
                <CreditCard size={18} className="ml-2" />
                الدفع الآن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
