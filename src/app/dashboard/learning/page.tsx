'use client';

import { useState } from 'react';
import { Folder, FileText, Video, Download, PlayCircle } from 'lucide-react';

export default function MyLearningPage() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const courses = [
    { 
      id: 1, 
      title: 'زمالة المراجع الداخلي (CIA) - الجزء الأول', 
      progress: 65,
      modules: [
        {
          title: 'الوحدة الأولى: أساسيات التدقيق',
          files: [
            { name: 'ملخص المعايير.pdf', type: 'pdf' },
            { name: 'شرح الفيديو الأول.mp4', type: 'video' },
            { name: 'ورقة عمل المخاطر.xlsx', type: 'excel' }
          ]
        },
        {
          title: 'الوحدة الثانية: الاستقلالية والموضوعية',
          files: [
            { name: 'حالات عملية.docx', type: 'word' },
            { name: 'اختبار قصير.pdf', type: 'pdf' }
          ]
        }
      ]
    },
    { 
      id: 2, 
      title: 'دورة التحليل المالي المتقدم', 
      progress: 30,
      modules: []
    }
  ];

  return (
    <div className="p-8 font-sans" dir="rtl">
      <h1 className="text-3xl font-bold mb-8">دوراتي التعليمية</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Course List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="font-bold text-gray-700 mb-4">الدورات المسجلة</h2>
          {courses.map(course => (
            <div 
              key={course.id}
              onClick={() => setSelectedCourse(course.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedCourse === course.id 
                  ? 'bg-blue-50 border-blue-500 shadow-md' 
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <h3 className="font-bold text-blue-900 mb-2">{course.title}</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
              </div>
              <p className="text-xs text-gray-500 text-left">{course.progress}% مكتمل</p>
            </div>
          ))}
        </div>

        {/* Course Content (File Tree) */}
        <div className="lg:col-span-2">
          {selectedCourse ? (
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 h-[600px] flex flex-col">
              <div className="p-6 border-b border-gray-100 bg-gray-50 rounded-t-lg flex justify-between items-center">
                <h2 className="text-xl font-bold">شجرة ملفات الدورة</h2>
                <button className="text-sm bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50">
                  تحميل الكل (.zip)
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1">
                {courses.find(c => c.id === selectedCourse)?.modules.map((module, idx) => (
                  <div key={idx} className="mb-6">
                    <div className="flex items-center mb-3">
                      <Folder className="text-yellow-500 ml-2" size={20} />
                      <h3 className="font-bold text-gray-800">{module.title}</h3>
                    </div>
                    
                    <div className="mr-6 space-y-2 border-r-2 border-gray-100 pr-4">
                      {module.files.map((file, fIdx) => (
                        <div key={fIdx} className="flex items-center justify-between group p-2 hover:bg-blue-50 rounded transition-colors">
                          <div className="flex items-center">
                            {file.type === 'video' ? <Video size={16} className="text-red-500 ml-2" /> : <FileText size={16} className="text-blue-500 ml-2" />}
                            <span className="text-sm text-gray-700">{file.name}</span>
                          </div>
                          <div className="flex space-x-2 space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity">
                            {file.type === 'video' && (
                              <button className="text-gray-500 hover:text-red-600" title="تشغيل">
                                <PlayCircle size={16} />
                              </button>
                            )}
                            <button className="text-gray-500 hover:text-blue-600" title="تحميل">
                              <Download size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300">
              اختر دورة لاستعراض محتوياتها
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
