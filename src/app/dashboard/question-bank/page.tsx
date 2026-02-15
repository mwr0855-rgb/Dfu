'use client';

export default function QuestionBankPage() {
  return (
    <div className="p-8 font-sans" dir="rtl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">بنك الأسئلة (CIA Exam Prep)</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          اختبر معلوماتك من خلال أكثر من 3000 سؤال اختيار من متعدد (MCQ) تحاكي اختبار زمالة المراجع الداخلي (CIA).
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
        <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">الأجزاء المتاحة</h2>
          <span className="text-xs bg-blue-500 bg-opacity-50 px-3 py-1 rounded">التحديث: 2026</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse">
          {/* Part 1 */}
          <div className="p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
            <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600">الجزء الأول</h3>
            <p className="text-gray-500 mb-6 text-sm">أساسيات التدقيق الداخلي</p>
            <div className="text-4xl font-bold text-blue-100 mb-2">125</div>
            <p className="text-gray-400 text-xs mb-6">سؤال</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 w-full">بدء الاختبار</button>
          </div>

          {/* Part 2 */}
          <div className="p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
            <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-green-600">الجزء الثاني</h3>
            <p className="text-gray-500 mb-6 text-sm">ممارسة التدقيق الداخلي</p>
            <div className="text-4xl font-bold text-green-100 mb-2">100</div>
            <p className="text-gray-400 text-xs mb-6">سؤال</p>
            <button className="bg-green-600 text-white px-6 py-2 rounded-full font-bold hover:bg-green-700 w-full">بدء الاختبار</button>
          </div>

          {/* Part 3 */}
          <div className="p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
            <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600">الجزء الثالث</h3>
            <p className="text-gray-500 mb-6 text-sm">عناصر المعرفة للتدقيق الداخلي</p>
            <div className="text-4xl font-bold text-purple-100 mb-2">100</div>
            <p className="text-gray-400 text-xs mb-6">سؤال</p>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-full font-bold hover:bg-purple-700 w-full">بدء الاختبار</button>
          </div>
        </div>

      </div>

      <div className="mt-12">
        <h3 className="font-bold text-xl mb-6">سجل اختباراتك السابقة</h3>
        <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
          <table className="w-full text-right">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="p-4">اسم الاختبار</th>
                <th className="p-4">التاريخ</th>
                <th className="p-4">النتيجة</th>
                <th className="p-4">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-4">اختبار تجريبي - الجزء الأول</td>
                <td className="p-4 text-gray-500">10 فبراير 2026</td>
                <td className="p-4"><span className="text-green-600 font-bold">85%</span></td>
                <td className="p-4"><button className="text-blue-600 text-sm hover:underline">مراجعة الإجابات</button></td>
              </tr>
              <tr>
                <td className="p-4">اختبار عشوائي - 20 سؤال</td>
                <td className="p-4 text-gray-500">08 فبراير 2026</td>
                <td className="p-4"><span className="text-red-600 font-bold">60%</span></td>
                <td className="p-4"><button className="text-blue-600 text-sm hover:underline">مراجعة الإجابات</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
