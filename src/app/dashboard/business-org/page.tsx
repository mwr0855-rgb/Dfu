'use client';

export default function BusinessOrgPage() {
  return (
    <div className="p-8 font-sans" dir="rtl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">تنظيم الأعمال (السكرتارية التنفيذية)</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          أدر أعمالك بذكاء. نوفر لك خدمات سكرتارية تنفيذية عن بُعد لتنظيم جداولك، اجتماعاتك، ومراسلاتك باحترافية.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Service 1 */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-orange-600 text-2xl">📅</div>
          <h3 className="text-xl font-bold mb-2">إدارة المواعيد</h3>
          <p className="text-gray-500 mb-4 text-sm">تنظيم الجدول اليومي، حجز الاجتماعات، وإرسال التذكيرات الآلية.</p>
          <button className="text-blue-600 font-bold text-sm hover:underline">طلب الخدمة &larr;</button>
        </div>

        {/* Service 2 */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-green-600 text-2xl">✉️</div>
          <h3 className="text-xl font-bold mb-2">إدارة المراسلات</h3>
          <p className="text-gray-500 mb-4 text-sm">صياغة الإيميلات الرسمية، الرد على العملاء، وتصنيف البريد الوارد.</p>
          <button className="text-blue-600 font-bold text-sm hover:underline">طلب الخدمة &larr;</button>
        </div>

        {/* Service 3 */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-purple-600 text-2xl">📂</div>
          <h3 className="text-xl font-bold mb-2">الأرشفة الإلكترونية</h3>
          <p className="text-gray-500 mb-4 text-sm">تنظيم الملفات السحابية، وفهرسة الوثائق لسهولة الوصول إليها.</p>
          <button className="text-blue-600 font-bold text-sm hover:underline">طلب الخدمة &larr;</button>
        </div>
      </div>

      <div className="mt-12 bg-gray-900 text-white rounded-xl p-8 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-2">باقة السكرتير الخاص</h3>
          <p className="text-gray-400">احصل على سكرتير مخصص لك يعمل معك 8 ساعات يومياً عن بُعد.</p>
        </div>
        <button className="mt-4 md:mt-0 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold">
          اشترك الآن (2500 ر.س/شهر)
        </button>
      </div>
    </div>
  );
}
