export default function InterviewsPage() {
  return (
    <div className="p-8 font-sans" dir="rtl">
      <h1 className="text-3xl font-bold mb-6">المقابلات الوظيفية</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-purple-600">
          <h2 className="text-2xl font-bold mb-4">للشركات</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>نشر وظائف شاغرة في المراجعة والمالية.</li>
            <li>بنك أسئلة اختبارات فنية (MCQ).</li>
            <li>جدولة مقابلات Live عبر Zoom.</li>
            <li>تقييم المرشحين آلياً.</li>
          </ul>
          <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">لوحة تحكم الشركات</button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-600">
          <h2 className="text-2xl font-bold mb-4">للأفراد (المحاسبين والمراجعين)</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>بناء ملف مهني (Portfolio).</li>
            <li>إجراء اختبارات تجريبية لتحديد المستوى.</li>
            <li>حضور مقابلات افتراضية.</li>
            <li>الحصول على شارات مهنية.</li>
          </ul>
          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">دخول كباحث عن عمل</button>
        </div>
      </div>
    </div>
  );
}
