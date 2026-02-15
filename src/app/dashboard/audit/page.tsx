export default function AuditPage() {
  return (
    <div className="p-8 font-sans" dir="rtl">
      <h1 className="text-3xl font-bold mb-6">إدارة المراجعة الداخلية</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-bold mb-2">خطط المراجعة</h2>
          <p className="text-gray-600 mb-4">إعداد ومتابعة خطة المراجعة السنوية المبنية على المخاطر.</p>
          <button className="text-blue-600 font-bold hover:underline">عرض الخطط &larr;</button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-bold mb-2">أوراق العمل</h2>
          <p className="text-gray-600 mb-4">توثيق إجراءات المراجعة والأدلة والاختبارات.</p>
          <button className="text-blue-600 font-bold hover:underline">إدارة الملفات &larr;</button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-bold mb-2">التقارير النهائية</h2>
          <p className="text-gray-600 mb-4">إصدار تقارير المراجعة ومشاركتها مع العملاء.</p>
          <button className="text-blue-600 font-bold hover:underline">إنشاء تقرير &larr;</button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-bold text-lg mb-2">ملفات المشروع</h3>
        <p>هنا ستظهر شجرة الملفات الخاصة بكل مشروع (Word, Excel, PDF) كما هو مطلوب في المواصفات.</p>
        <div className="mt-4 bg-white p-4 border border-gray-300 rounded h-64 flex items-center justify-center text-gray-400">
          [مساحة شجرة الملفات التفاعلية]
        </div>
      </div>
    </div>
  );
}
