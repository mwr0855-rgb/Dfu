'use client';

import { useState } from 'react';
import { Cloud, File, Folder, HardDrive, Trash2, Edit2, DownloadCloud } from 'lucide-react';

export default function MyFilesPage() {
  const [activeView, setActiveView] = useState('grid');
  const [totalSize, setTotalSize] = useState(1.2); // GB
  const maxStorage = 5; // GB

  const files = [
    { name: 'دراسة جدوى - مشروع أ.docx', size: '2.5 MB', type: 'doc' },
    { name: 'تقرير المراجعة الربع سنوي.pdf', size: '15.0 MB', type: 'pdf' },
    { name: 'تحليل مالي 2025.xlsx', size: '5.1 MB', type: 'xls' },
    { name: 'عرض تقديمي للإدارة.pptx', size: '8.3 MB', type: 'ppt' },
    { name: 'صورة الهوية.jpg', size: '1.2 MB', type: 'img' },
  ];

  const storagePercentage = (totalSize / maxStorage) * 100;

  return (
    <div className="p-8 font-sans h-full bg-gray-50 flex flex-col" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ملفاتي (My Files)</h1>
          <p className="text-gray-500 mt-1">مساحتك السحابية الخاصة للعمل والتعلم.</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4 space-x-reverse">
          <HardDrive className="text-blue-600 w-8 h-8" />
          <div>
            <div className="text-sm font-bold text-gray-700 mb-1">المساحة المستخدمة</div>
            <div className="w-48 bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div 
                className={`h-2.5 rounded-full ${storagePercentage > 80 ? 'bg-red-500' : 'bg-green-500'}`} 
                style={{ width: `${storagePercentage}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1 text-left ltr">{totalSize} GB / {maxStorage} GB</div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-t-lg border-b border-gray-200 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex space-x-2 space-x-reverse">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center text-sm font-bold transition-colors shadow-sm">
            <Cloud className="w-4 h-4 ml-2" />
            رفع ملف جديد
          </button>
          <button className="text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-md flex items-center text-sm transition-colors border border-transparent hover:border-gray-300">
            <Folder className="w-4 h-4 ml-2 text-yellow-500" />
            مجلد جديد
          </button>
        </div>
        
        <div className="flex bg-gray-100 rounded p-1">
          <button 
            onClick={() => setActiveView('grid')}
            className={`p-2 rounded ${activeView === 'grid' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
          >
            Grid
          </button>
          <button 
            onClick={() => setActiveView('list')}
            className={`p-2 rounded ${activeView === 'list' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
          >
            List
          </button>
        </div>
      </div>

      {/* File Area */}
      <div className="bg-white p-6 rounded-b-lg shadow-sm border border-gray-200 min-h-[500px]">
        {activeView === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {files.map((file, idx) => (
              <div key={idx} className="group relative border border-gray-100 rounded-lg p-4 hover:bg-blue-50 hover:border-blue-200 transition-all cursor-pointer flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-3 text-2xl group-hover:bg-white group-hover:shadow-sm transition-all">
                  {file.type === 'doc' && '📄'}
                  {file.type === 'pdf' && '📕'}
                  {file.type === 'xls' && '📊'}
                  {file.type === 'ppt' && '📽️'}
                  {file.type === 'img' && '🖼️'}
                </div>
                <h3 className="text-sm font-medium text-gray-700 truncate w-full mb-1">{file.name}</h3>
                <p className="text-xs text-gray-400">{file.size}</p>
                
                {/* Overlay Actions */}
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 space-x-reverse bg-white/90 p-1 rounded shadow-sm border border-gray-200 backdrop-blur-sm">
                  <button className="p-1 hover:text-blue-600" title="تعديل"><Edit2 size={14} /></button>
                  <button className="p-1 hover:text-green-600" title="تحميل"><DownloadCloud size={14} /></button>
                  <button className="p-1 hover:text-red-600" title="حذف"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
            
            {/* Empty State placeholder */}
            {[...Array(5)].map((_, i) => (
              <div key={`empty-${i}`} className="border-2 border-dashed border-gray-100 rounded-lg p-4 flex items-center justify-center text-gray-300">
                <span className="text-2xl opacity-20">+</span>
              </div>
            ))}
          </div>
        ) : (
          <table className="w-full text-right">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="pb-3 font-normal text-sm">الاسم</th>
                <th className="pb-3 font-normal text-sm">الحجم</th>
                <th className="pb-3 font-normal text-sm">النوع</th>
                <th className="pb-3 font-normal text-sm">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {files.map((file, idx) => (
                <tr key={idx} className="hover:bg-gray-50 group">
                  <td className="py-3 flex items-center">
                    <span className="mr-3 text-xl">
                      {file.type === 'doc' && '📄'}
                      {file.type === 'pdf' && '📕'}
                      {file.type === 'xls' && '📊'}
                    </span>
                    <span className="text-gray-700 font-medium mr-2">{file.name}</span>
                  </td>
                  <td className="py-3 text-gray-500 text-sm ltr text-right">{file.size}</td>
                  <td className="py-3 text-gray-500 text-sm uppercase">{file.type}</td>
                  <td className="py-3">
                    <div className="flex space-x-2 space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-gray-400 hover:text-blue-600"><Edit2 size={16} /></button>
                      <button className="text-gray-400 hover:text-green-600"><DownloadCloud size={16} /></button>
                      <button className="text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
