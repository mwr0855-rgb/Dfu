'use client';

export default function CreditHoursPage() {
  return (
    <div className="p-8 font-sans" dir="rtl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">الساعات المهنية المعتمدة (CPE)</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          احصل على ساعات التطوير المهني المستمر المعتمدة لتجديد زمالاتك المهنية (CIA, CPA, CMA) بكل سهولة ومرونة.
        </p>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Basic Package */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden">
          <div className="bg-blue-50 p-6 text-center border-b border-blue-100">
            <h3 className="text-xl font-bold text-blue-900">باقة الأساسيات</h3>
            <div className="text-4xl font-bold text-blue-600 my-4">10 <span className="text-lg text-gray-500 font-normal">ساعات</span></div>
            <p className="text-gray-500 text-sm">مناسبة لتجديد المتطلبات السنوية البسيطة</p>
          </div>
          <div className="p-6">
            <ul className="space-y-3 mb-6 text-gray-600 text-sm">
              <li className="flex items-center">✅ 3 كورسات قصيرة</li>
              <li className="flex items-center">✅ اختبارات فورية</li>
              <li className="flex items-center">✅ شهادة إلكترونية فورية</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-bold">
              اشترك الآن
            </button>
          </div>
        </div>

        {/* Standard Package */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border-2 border-blue-600 transform scale-105 overflow-hidden relative">
          <div className="absolute top-0 right-0 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-bl">الأكثر طلباً</div>
          <div className="bg-blue-600 p-6 text-center text-white">
            <h3 className="text-xl font-bold">باقة المحترف</h3>
            <div className="text-4xl font-bold my-4">20 <span className="text-lg text-blue-100 font-normal">ساعة</span></div>
            <p className="text-blue-100 text-sm">تغطي معظم متطلبات التجديد السنوي</p>
          </div>
          <div className="p-6">
            <ul className="space-y-3 mb-6 text-gray-600 text-sm">
              <li className="flex items-center">✅ 6 كورسات متنوعة</li>
              <li className="flex items-center">✅ وصول لمكتبة المراجع</li>
              <li className="flex items-center">✅ شهادة معتمدة دولياً</li>
              <li className="flex items-center">✅ دعم فني 24/7</li>
            </ul>
            <button className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-900 font-bold">
              اشترك الآن
            </button>
          </div>
        </div>

        {/* Premium Package */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden">
          <div className="bg-purple-50 p-6 text-center border-b border-purple-100">
            <h3 className="text-xl font-bold text-purple-900">باقة الخبير</h3>
            <div className="text-4xl font-bold text-purple-600 my-4">40 <span className="text-lg text-gray-500 font-normal">ساعة</span></div>
            <p className="text-gray-500 text-sm">شاملة لكل ما تحتاجه لتطوير مسارك المهني</p>
          </div>
          <div className="p-6">
            <ul className="space-y-3 mb-6 text-gray-600 text-sm">
              <li className="flex items-center">✅ وصول غير محدود للكورسات</li>
              <li className="flex items-center">✅ ورش عمل تفاعلية (Live)</li>
              <li className="flex items-center">✅ استشارة مهنية مجانية</li>
            </ul>
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 font-bold">
              اشترك الآن
            </button>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">كيف تحصل على شهادتك؟</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600 font-bold text-xl">1</div>
            <h3 className="font-bold">اختر الباقة</h3>
            <p className="text-sm text-gray-500">سجل في الباقة المناسبة لاحتياجاتك.</p>
          </div>
          <div>
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600 font-bold text-xl">2</div>
            <h3 className="font-bold">شاهد المحتوى</h3>
            <p className="text-sm text-gray-500">احضر الفيديوهات واقرأ المواد العلمية.</p>
          </div>
          <div>
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600 font-bold text-xl">3</div>
            <h3 className="font-bold">اجتز الاختبار</h3>
            <p className="text-sm text-gray-500">أجب على أسئلة الاختيار من متعدد بنجاح.</p>
          </div>
          <div>
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-green-600 font-bold text-xl">4</div>
            <h3 className="font-bold">استلم الشهادة</h3>
            <p className="text-sm text-gray-500">حمل شهادتك فوراً بصيغة PDF.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
