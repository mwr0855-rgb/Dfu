'use client';

import { useState } from 'react';
import { 
  Folder, FileText, Video, Download, PlayCircle, 
  ChevronDown, ChevronRight, Music, File, 
  Edit3, Eye, ExternalLink, Search, Filter,
  Calendar, Clock, Award, BookOpen, Users, Star
} from 'lucide-react';

interface FileItem {
  name: string;
  type: 'pdf' | 'word' | 'excel' | 'video' | 'podcast' | 'ppt';
  size: string;
  duration?: string;
  videoUrl?: string;
}

interface Module {
  title: string;
  expanded?: boolean;
  files: FileItem[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
  instructor: string;
  duration: string;
  totalLessons: number;
  completedLessons: number;
  image: string;
  modules: Module[];
  certificate?: boolean;
  startDate: string;
  endDate?: string;
  lifetimeAccess?: boolean;
  companyLogo?: string;
  companyName?: string;
}

const FileIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'pdf':
      return <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center text-red-600 text-xs font-bold">PDF</div>;
    case 'word':
      return <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-600 text-xs font-bold">DOC</div>;
    case 'excel':
      return <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center text-green-600 text-xs font-bold">XLS</div>;
    case 'video':
      return <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center text-purple-600"><Video size={16} /></div>;
    case 'podcast':
      return <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center text-orange-600"><Music size={16} /></div>;
    case 'ppt':
      return <div className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center text-yellow-700 text-xs font-bold">PPT</div>;
    default:
      return <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-600"><File size={16} /></div>;
  }
};

export default function MyLearningPage() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [editingFileName, setEditingFileName] = useState<string | null>(null);
  const [customFileNames, setCustomFileNames] = useState<Record<string, string>>({});
  const [viewMode, setViewMode] = useState<'tree' | 'grid'>('tree');

  const courses: Course[] = [
    { 
      id: 1, 
      title: 'زمالة المراجع الداخلي (CIA) - الجزء الأول', 
      description: 'تأهيل شامل للجزء الأول من شهادة CIA مع حالات عملية',
      progress: 65,
      instructor: 'د. محمد أبو المجد',
      duration: '40 ساعة',
      totalLessons: 32,
      completedLessons: 21,
      image: '🎓',
      startDate: '2025-01-15',
      certificate: true,
      modules: [
        {
          title: 'المحور الأول: تأسيس إدارة المراجعة الداخلية',
          files: [
            { name: 'المفهوم والدور الاستراتيجي للمراجعة الداخلية.pdf', type: 'pdf', size: '2.5 MB' },
            { name: 'المعايير والكفاءات ومنهجية التدقيق.docx', type: 'word', size: '1.8 MB' },
            { name: 'أخلاقيات المهنة.pdf', type: 'pdf', size: '1.2 MB' },
            { name: 'شرح فيديو - تأسيس الإدارة.mp4', type: 'video', size: '150 MB', duration: '45:00' },
            { name: 'ميثاق المراجعة الداخلية.xlsx', type: 'excel', size: '500 KB' }
          ]
        },
        {
          title: 'المحور الثاني: إعداد خطة المراجعة السنوية',
          files: [
            { name: 'مفهوم المراجعة المبنية على المخاطر.pdf', type: 'pdf', size: '3.1 MB' },
            { name: 'خطوات إعداد الخطة السنوية.docx', type: 'word', size: '2.2 MB' },
            { name: 'مصفوفة المخاطر - نموذج عملي.xlsx', type: 'excel', size: '800 KB' },
            { name: 'شرح فيديو - الخطة السنوية.mp4', type: 'video', size: '180 MB', duration: '52:00' },
            { name: 'بودكاست - نصائح عملية.mp3', type: 'podcast', size: '25 MB', duration: '30:00' }
          ]
        },
        {
          title: 'المحور الثالث: إعداد برنامج المراجعة',
          files: [
            { name: 'خطوات برنامج المهمة.pdf', type: 'pdf', size: '2.0 MB' },
            { name: 'ملف أوراق العمل.docx', type: 'word', size: '1.5 MB' },
            { name: 'عرض تقديمي - برنامج المراجعة.pptx', type: 'ppt', size: '5.0 MB' }
          ]
        },
        {
          title: 'المحور الرابع: تنفيذ إجراءات المراجعة',
          files: [
            { name: 'خطوات جمع الأدلة.pdf', type: 'pdf', size: '1.8 MB' },
            { name: 'أدوات وأساليب المراجعة.docx', type: 'word', size: '2.1 MB' },
            { name: 'نموذج التحقق من الضوابط.xlsx', type: 'excel', size: '600 KB' }
          ]
        },
        {
          title: 'المحور الخامس: تحليل النتائج وتقييم المخاطر',
          files: [
            { name: 'التمييز بين الملاحظة والنتيجة.pdf', type: 'pdf', size: '1.5 MB' },
            { name: 'تقييم فعالية الرقابة الداخلية.docx', type: 'word', size: '1.9 MB' }
          ]
        },
        {
          title: 'المحور السادس: إعداد التقارير',
          files: [
            { name: 'مكونات تقرير المراجعة.pdf', type: 'pdf', size: '2.3 MB' },
            { name: 'نموذج تقرير مراجعة احترافي.docx', type: 'word', size: '1.7 MB' },
            { name: 'شرح فيديو - كتابة التقارير.mp4', type: 'video', size: '120 MB', duration: '38:00' }
          ]
        },
        {
          title: 'المحور السابع: متابعة تنفيذ التوصيات',
          files: [
            { name: 'آلية وضع خطة عمل للتوصيات.pdf', type: 'pdf', size: '1.4 MB' },
            { name: 'سجل متابعة التوصيات.xlsx', type: 'excel', size: '450 KB' }
          ]
        }
      ]
    },
    { 
      id: 2, 
      title: 'دورة التحليل المالي وإعداد القوائم المالية', 
      description: 'إتقان التحليل المالي وقراءة القوائم المالية بشكل احترافي',
      progress: 30,
      instructor: 'أ. أحمد السعيد',
      duration: '25 ساعة',
      totalLessons: 20,
      completedLessons: 6,
      image: '📊',
      startDate: '2025-02-01',
      certificate: true,
      modules: [
        {
          title: 'المقدمة والأهداف',
          files: [
            { name: 'أهمية التحليل المالي.pdf', type: 'pdf', size: '1.8 MB' },
            { name: 'العلاقة بين التحليل والتخطيط.docx', type: 'word', size: '1.2 MB' }
          ]
        },
        {
          title: 'مدخل إلى القوائم المالية',
          files: [
            { name: 'أنواع القوائم المالية.pdf', type: 'pdf', size: '2.5 MB' },
            { name: 'شرح فيديو - قراءة القوائم.mp4', type: 'video', size: '200 MB', duration: '55:00' }
          ]
        }
      ]
    },
    { 
      id: 3, 
      title: 'دورة إدارة وتشغيل المطاعم', 
      description: 'تأهيل متكامل لإدارة المطاعم باحترافية عالية',
      progress: 0,
      instructor: 'أ. خالد العمري',
      duration: '30 ساعة',
      totalLessons: 24,
      completedLessons: 0,
      image: '🍽️',
      startDate: '2025-02-20',
      certificate: true,
      lifetimeAccess: true,
      companyName: 'مطاعم الفيصل',
      companyLogo: '🏢',
      modules: [
        {
          title: 'مفهوم إدارة وتشغيل المطاعم',
          files: [
            { name: 'الفرق بين الإدارة التشغيلية والاستراتيجية.pdf', type: 'pdf', size: '2.0 MB' },
            { name: 'عوامل نجاح وفشل المطاعم.docx', type: 'word', size: '1.5 MB' }
          ]
        }
      ]
    }
  ];

  const toggleModule = (moduleIndex: number) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleIndex]: !prev[moduleIndex]
    }));
  };

  const handleFileNameEdit = (originalName: string, newName: string) => {
    setCustomFileNames(prev => ({
      ...prev,
      [originalName]: newName
    }));
    setEditingFileName(null);
  };

  const getDisplayFileName = (originalName: string) => {
    return customFileNames[originalName] || originalName;
  };

  const selectedCourseData = courses.find(c => c.id === selectedCourse);

  const filteredCourses = courses.filter(course => 
    course.title.includes(searchQuery) || 
    course.description.includes(searchQuery)
  );

  return (
    <div className="p-4 md:p-8 font-sans min-h-screen bg-gradient-to-br from-gray-50 to-blue-50" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">دوراتي التعليمية</h1>
        <p className="text-gray-600">مساحتك الشخصية للتعلم والتطوير المهني - مثل كانفا للتصميمات</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Course List - Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          {/* Search & Filter */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="البحث في الدورات..."
                className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <h2 className="font-bold text-gray-700 flex items-center">
            <BookOpen className="ml-2 text-blue-600" size={20} />
            الدورات المسجلة ({filteredCourses.length})
          </h2>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {filteredCourses.map(course => (
              <div 
                key={course.id}
                onClick={() => setSelectedCourse(course.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                  selectedCourse === course.id 
                    ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-400 shadow-lg transform scale-[1.02]' 
                    : 'bg-white border-gray-200 hover:bg-gray-50 hover:shadow-md'
                }`}
              >
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="text-4xl">{course.image}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-1 truncate">{course.title}</h3>
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">{course.description}</p>
                    
                    {/* Company Branding for Lifetime Access */}
                    {course.lifetimeAccess && course.companyName && (
                      <div className="flex items-center text-xs text-green-600 mb-2 bg-green-50 px-2 py-1 rounded-full w-fit">
                        <span className="ml-1">{course.companyLogo}</span>
                        {course.companyName} - اشتراك مدى الحياة
                      </div>
                    )}

                    <div className="flex items-center text-xs text-gray-500 mb-2 space-x-3 space-x-reverse">
                      <span className="flex items-center">
                        <Users size={12} className="ml-1" />
                        {course.instructor}
                      </span>
                      <span className="flex items-center">
                        <Clock size={12} className="ml-1" />
                        {course.duration}
                      </span>
                    </div>

                    <div className="relative pt-1">
                      <div className="flex mb-1 items-center justify-between">
                        <span className="text-xs font-semibold text-blue-700">
                          {course.completedLessons}/{course.totalLessons} درس
                        </span>
                        <span className="text-xs font-semibold text-blue-700">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200">
                        <div
                          style={{ width: `${course.progress}%` }}
                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${
                            course.progress === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                          }`}
                        />
                      </div>
                    </div>

                    {course.certificate && (
                      <div className="flex items-center mt-2 text-xs text-amber-600">
                        <Award size={12} className="ml-1" />
                        شهادة معتمدة عند الإتمام
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Content - Main Area */}
        <div className="lg:col-span-8">
          {selectedCourseData ? (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Course Header */}
              <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-4xl mb-2">{selectedCourseData.image}</div>
                    <h2 className="text-2xl font-bold mb-2">{selectedCourseData.title}</h2>
                    <p className="text-blue-100 text-sm">{selectedCourseData.description}</p>
                  </div>
                  <div className="flex space-x-2 space-x-reverse">
                    <button 
                      onClick={() => setViewMode(viewMode === 'tree' ? 'grid' : 'tree')}
                      className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                      title="تغيير طريقة العرض"
                    >
                      {viewMode === 'tree' ? '▦' : '☰'}
                    </button>
                    <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center">
                      <Download size={16} className="ml-2" />
                      تحميل الكل
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <span className="bg-white/20 px-3 py-1 rounded-full flex items-center">
                    <Calendar size={14} className="ml-1" />
                    بدأت: {selectedCourseData.startDate}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full flex items-center">
                    <Clock size={14} className="ml-1" />
                    {selectedCourseData.duration}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full flex items-center">
                    <BookOpen size={14} className="ml-1" />
                    {selectedCourseData.modules.length} محاور
                  </span>
                </div>
              </div>
              
              {/* File Tree Content */}
              <div className="p-6 max-h-[600px] overflow-y-auto">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <Folder className="text-yellow-500 ml-2" size={20} />
                  شجرة ملفات الدورة
                  <span className="text-xs text-gray-500 mr-2 font-normal">
                    (يمكنك تعديل أسماء الملفات على نسختك الخاصة)
                  </span>
                </h3>

                {viewMode === 'tree' ? (
                  <div className="space-y-3">
                    {selectedCourseData.modules.map((module, moduleIdx) => (
                      <div key={moduleIdx} className="border border-gray-200 rounded-xl overflow-hidden">
                        {/* Module Header */}
                        <button
                          onClick={() => toggleModule(moduleIdx)}
                          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-indigo-50 transition-colors"
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center ml-3">
                              <Folder className="text-yellow-600" size={18} />
                            </div>
                            <span className="font-bold text-gray-800">{module.title}</span>
                            <span className="text-xs text-gray-500 mr-2 bg-gray-100 px-2 py-1 rounded-full">
                              {module.files.length} ملف
                            </span>
                          </div>
                          {expandedModules[moduleIdx] ? 
                            <ChevronDown className="text-gray-400" size={20} /> : 
                            <ChevronRight className="text-gray-400" size={20} />
                          }
                        </button>
                        
                        {/* Module Files */}
                        {expandedModules[moduleIdx] && (
                          <div className="bg-white border-t border-gray-100 p-4">
                            <div className="space-y-2 mr-4 border-r-2 border-gray-100 pr-4">
                              {module.files.map((file, fileIdx) => (
                                <div 
                                  key={fileIdx} 
                                  className="flex items-center justify-between group p-3 hover:bg-blue-50 rounded-lg transition-all border border-transparent hover:border-blue-200"
                                >
                                  <div className="flex items-center flex-1 min-w-0">
                                    <FileIcon type={file.type} />
                                    
                                    {editingFileName === `${moduleIdx}-${fileIdx}` ? (
                                      <input
                                        type="text"
                                        defaultValue={getDisplayFileName(file.name)}
                                        className="mr-3 flex-1 px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500"
                                        autoFocus
                                        onBlur={(e) => handleFileNameEdit(file.name, e.target.value)}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') {
                                            handleFileNameEdit(file.name, e.currentTarget.value);
                                          }
                                        }}
                                      />
                                    ) : (
                                      <span className="mr-3 text-sm text-gray-700 truncate flex-1">
                                        {getDisplayFileName(file.name)}
                                      </span>
                                    )}
                                    
                                    <span className="text-xs text-gray-400 mr-2">{file.size}</span>
                                    {file.duration && (
                                      <span className="text-xs text-purple-500 mr-2 bg-purple-50 px-2 py-0.5 rounded-full">
                                        {file.duration}
                                      </span>
                                    )}
                                  </div>
                                  
                                  <div className="flex items-center space-x-1 space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                      onClick={() => setEditingFileName(`${moduleIdx}-${fileIdx}`)}
                                      className="p-2 hover:bg-blue-100 rounded-lg text-gray-500 hover:text-blue-600 transition-colors"
                                      title="تعديل الاسم"
                                    >
                                      <Edit3 size={16} />
                                    </button>
                                    {file.type === 'video' && (
                                      <button 
                                        className="p-2 hover:bg-purple-100 rounded-lg text-gray-500 hover:text-purple-600 transition-colors"
                                        title="مشاهدة"
                                      >
                                        <PlayCircle size={16} />
                                      </button>
                                    )}
                                    <button 
                                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700 transition-colors"
                                      title="معاينة"
                                    >
                                      <Eye size={16} />
                                    </button>
                                    <button 
                                      className="p-2 hover:bg-green-100 rounded-lg text-gray-500 hover:text-green-600 transition-colors"
                                      title="تحميل"
                                    >
                                      <Download size={16} />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  // Grid View
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedCourseData.modules.flatMap((module, moduleIdx) => 
                      module.files.map((file, fileIdx) => (
                        <div 
                          key={`${moduleIdx}-${fileIdx}`}
                          className="bg-gray-50 rounded-xl p-4 hover:bg-blue-50 transition-all cursor-pointer border border-gray-200 hover:border-blue-300 hover:shadow-md group"
                        >
                          <div className="flex justify-center mb-3">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                              <FileIcon type={file.type} />
                            </div>
                          </div>
                          <h4 className="text-sm font-medium text-gray-800 text-center truncate mb-1">
                            {getDisplayFileName(file.name)}
                          </h4>
                          <p className="text-xs text-gray-500 text-center">{file.size}</p>
                          <div className="flex justify-center mt-3 space-x-1 space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1 hover:bg-blue-100 rounded text-gray-400 hover:text-blue-600">
                              <Eye size={14} />
                            </button>
                            <button className="p-1 hover:bg-green-100 rounded text-gray-400 hover:text-green-600">
                              <Download size={14} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Activity Tree Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center">
                    <Star className="text-yellow-500 ml-1" size={16} />
                    شجرة التعديلات: يتم حفظ جميع تعديلاتك على الأسماء تلقائياً
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    <ExternalLink size={14} className="ml-1" />
                    فتح في نافذة جديدة
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-300 h-[500px] flex flex-col items-center justify-center text-gray-400">
              <BookOpen size={64} className="mb-4 text-gray-300" />
              <h3 className="text-xl font-bold text-gray-500 mb-2">اختر دورة للبدء</h3>
              <p className="text-gray-400">اضغط على أي دورة من القائمة لاستعراض محتوياتها</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">إجمالي الدورات</p>
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <BookOpen className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">الدورات المكتملة</p>
              <p className="text-2xl font-bold text-green-600">{courses.filter(c => c.progress === 100).length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Award className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">قيد التقدم</p>
              <p className="text-2xl font-bold text-amber-600">{courses.filter(c => c.progress > 0 && c.progress < 100).length}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Clock className="text-amber-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">إجمالي الساعات</p>
              <p className="text-2xl font-bold text-purple-600">95</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Calendar className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
