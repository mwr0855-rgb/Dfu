'use client';

export default function AIToolsPage() {
  return (
    <div className="p-8 font-sans" dir="rtl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">أدوات الذكاء الاصطناعي (Beta)</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          مستقبل المراجعة هنا. حلل البيانات، استخرج المخاطر، وقارن السياسات في ثوانٍ.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Tool 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-transparent hover:border-purple-500 transition-colors cursor-pointer group">
          <div className="bg-purple-100 text-purple-600 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">🤖</div>
          <h3 className="text-lg font-bold mb-2">المراجع الآلي (AI Co-Auditor)</h3>
          <p className="text-gray-500 text-sm mb-4">صحح الأخطاء في التقارير واحصل على اقتراحات فورية للتحسين.</p>
          <span className="text-purple-600 text-xs font-bold bg-purple-50 px-2 py-1 rounded">قريباً</span>
        </div>

        {/* Tool 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-transparent hover:border-red-500 transition-colors cursor-pointer group">
          <div className="bg-red-100 text-red-600 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">⚠️</div>
          <h3 className="text-lg font-bold mb-2">تحليل المخاطر (AI Risk Analyzer)</h3>
          <p className="text-gray-500 text-sm mb-4">ارفع ملف Excel وسنقوم بتحديد نقاط الضعف والمخاطر المحتملة.</p>
          <span className="text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded">تجريبي</span>
        </div>

        {/* Tool 3 */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-transparent hover:border-blue-500 transition-colors cursor-pointer group">
          <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">📊</div>
          <h3 className="text-lg font-bold mb-2">المقارن الذكي (Document Compare)</h3>
          <p className="text-gray-500 text-sm mb-4">قارن بين نسختين من السياسات واستخرج الفروقات الجوهرية.</p>
          <span className="text-blue-600 text-xs font-bold bg-blue-50 px-2 py-1 rounded">متاح</span>
        </div>

      </div>

      <div className="mt-12 bg-gray-50 border border-gray-200 rounded p-6">
        <h3 className="font-bold text-lg mb-4">منطقة التجربة (Playground)</h3>
        <div className="bg-white border-2 border-dashed border-gray-300 rounded h-40 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50">
          <span className="text-4xl mb-2">📄</span>
          <p>اسحب ملفك هنا للتحليل (Word, PDF, Excel)</p>
          <p className="text-xs mt-2 text-gray-400">الحد الأقصى 10MB</p>
        </div>
      </div>
    </div>
  );
}
