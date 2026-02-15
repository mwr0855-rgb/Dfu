'use client';

export default function ConsultingPage() {
  return (
    <div className="p-8 font-sans" dir="rtl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">خدمات الاستشارات المهنية</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          احصل على استشارات متخصصة من خبراء معتمدين في المراجعة الداخلية، الإدارة المالية، وتطوير الأعمال.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Individuals Consulting */}
        <div className="bg-white rounded-lg shadow-lg border-t-4 border-blue-500 overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">استشارات الأفراد</h2>
            <p className="text-gray-500 mb-6">تطوير المسار المهني وحل المشكلات الفنية.</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition cursor-pointer border border-transparent hover:border-blue-200">
                <div>
                  <h3 className="font-bold text-blue-900">جلسة توجيه مهني (One-on-One)</h3>
                  <p className="text-sm text-gray-500">60 دقيقة | عبر Zoom</p>
                </div>
                <span className="font-bold text-blue-600">300 ر.س</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition cursor-pointer border border-transparent hover:border-blue-200">
                <div>
                  <h3 className="font-bold text-blue-900">مراجعة السيرة الذاتية (CV Review)</h3>
                  <p className="text-sm text-gray-500">تحليل وتطوير ملفك المهني</p>
                </div>
                <span className="font-bold text-blue-600">150 ر.س</span>
              </div>
            </div>
            
            <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700">
              حجز موعد الآن
            </button>
          </div>
        </div>

        {/* Corporate Consulting */}
        <div className="bg-white rounded-lg shadow-lg border-t-4 border-gray-800 overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">استشارات الشركات</h2>
            <p className="text-gray-500 mb-6">حلول مؤسسية للارتقاء بالأداء والامتثال.</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer border border-transparent hover:border-gray-300">
                <div>
                  <h3 className="font-bold text-gray-900">تأسيس إدارة المراجعة الداخلية</h3>
                  <p className="text-sm text-gray-500">هيكلة كاملة + أدلة سياسات</p>
                </div>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">طلب عرض سعر</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer border border-transparent hover:border-gray-300">
                <div>
                  <h3 className="font-bold text-gray-900">تقييم المخاطر (Risk Assessment)</h3>
                  <p className="text-sm text-gray-500">ورش عمل + سجل مخاطر</p>
                </div>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">طلب عرض سعر</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-gray-800 text-white py-3 rounded font-bold hover:bg-gray-900">
              تواصل معنا للأعمال
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-blue-50 rounded-xl p-8 text-center border border-blue-100">
        <h3 className="text-xl font-bold text-blue-900 mb-2">هل تحتاج باقة مخصصة؟</h3>
        <p className="text-gray-600 mb-6">يمكننا تصميم باقة استشارية تناسب حجم ونشاط منشأتك تماماً.</p>
        <button className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-full font-bold hover:bg-blue-50">
          تحدث مع مستشار
        </button>
      </div>
    </div>
  );
}
