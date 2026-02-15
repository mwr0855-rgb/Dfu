'use client';

import { useState } from 'react';

// Admin Dashboard - Based on 'صلاحيات الادمن.docx'
export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="flex h-screen bg-gray-100 font-sans" dir="rtl">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8 text-center">لوحة الإدارة</h2>
        <nav className="space-y-4">
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full text-right p-3 rounded ${activeTab === 'users' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            👥 إدارة المستخدمين
          </button>
          <button 
            onClick={() => setActiveTab('courses')}
            className={`w-full text-right p-3 rounded ${activeTab === 'courses' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            📚 إدارة الدورات
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            className={`w-full text-right p-3 rounded ${activeTab === 'content' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            📂 إدارة المحتوى والملفات
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full text-right p-3 rounded ${activeTab === 'settings' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            ⚙️ الإعدادات العامة
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        {activeTab === 'users' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">إدارة المتدربين والعملاء</h2>
              <button className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
                + إضافة متدرب جديد
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full text-right">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 border-b">الاسم</th>
                    <th className="p-4 border-b">البريد الإلكتروني</th>
                    <th className="p-4 border-b">نوع الحساب</th>
                    <th className="p-4 border-b">الدورات المسجلة</th>
                    <th className="p-4 border-b">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 border-b">أحمد محمد</td>
                    <td className="p-4 border-b">ahmed@example.com</td>
                    <td className="p-4 border-b"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">شركة</span></td>
                    <td className="p-4 border-b">3</td>
                    <td className="p-4 border-b space-x-2 space-x-reverse">
                      <button className="text-blue-600 hover:underline">تعديل</button>
                      <button className="text-red-600 hover:underline">حظر</button>
                    </td>
                  </tr>
                  {/* More rows... */}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">إدارة الدورات التدريبية</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
                + إضافة دورة جديدة
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Course Card */}
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl">زمالة المراجع الداخلي (CIA)</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">نشط</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">دورة شاملة للأجزاء الثلاثة...</p>
                <div className="space-y-2">
                  <button className="w-full bg-gray-100 text-gray-800 py-2 rounded text-sm hover:bg-gray-200">تعديل المحتوى</button>
                  <button className="w-full bg-gray-100 text-gray-800 py-2 rounded text-sm hover:bg-gray-200">إدارة الملفات المرفقة</button>
                  <button className="w-full border border-red-200 text-red-600 py-2 rounded text-sm hover:bg-red-50">إغلاق التسجيل</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">إدارة الملفات والمحتوى</h2>
            <div className="bg-white p-8 rounded-lg shadow border-2 border-dashed border-gray-300 text-center">
              <div className="text-4xl mb-4">📂</div>
              <h3 className="text-xl font-bold mb-2">منطقة الرفع والسحب</h3>
              <p className="text-gray-500 mb-6">يمكنك رفع ملفات Word, Excel, PDF هنا وتعيينها لدورات محددة.</p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700">
                اختر ملفات لرفعها
              </button>
            </div>
            
            <div className="mt-8">
              <h3 className="font-bold mb-4">آخر الملفات المرفوعة</h3>
              <ul className="bg-white rounded-lg shadow divide-y">
                <li className="p-4 flex justify-between items-center">
                  <span className="flex items-center">📄 <span className="mr-2">محاور كورس المراجعة.docx</span></span>
                  <span className="text-sm text-gray-500">منذ ساعتين</span>
                </li>
                <li className="p-4 flex justify-between items-center">
                  <span className="flex items-center">📊 <span className="mr-2">تقييم الشركات.xlsx</span></span>
                  <span className="text-sm text-gray-500">أمس</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
