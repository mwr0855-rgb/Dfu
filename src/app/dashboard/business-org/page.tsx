'use client';

import { useState } from 'react';
import { 
  Briefcase, Calendar, Clock, CheckSquare, Plus, Search,
  Bell, Mail, Phone, FileText, Users, Star, Filter,
  ChevronRight, Edit3, Trash2, Flag, Circle, CheckCircle,
  CalendarDays, MessageSquare, Video, Link, ExternalLink,
  Target, Award, BarChart3, ArrowRight
} from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
  category: string;
  assignee?: string;
}

interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: 'online' | 'in_person';
  attendees: string[];
  link?: string;
}

interface Package {
  id: number;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
}

export default function BusinessOrgPage() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'calendar' | 'packages'>('tasks');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddTask, setShowAddTask] = useState(false);

  const tasks: Task[] = [
    { id: 1, title: 'إعداد تقرير المراجعة الربع سنوي', description: 'تجميع وتحليل بيانات Q1', priority: 'high', status: 'in_progress', dueDate: '2025-02-20', category: 'تقارير' },
    { id: 2, title: 'متابعة ملاحظات المراجعة السابقة', description: 'التواصل مع الإدارات المعنية', priority: 'high', status: 'pending', dueDate: '2025-02-18', category: 'متابعات' },
    { id: 3, title: 'تحديث قاعدة بيانات العملاء', description: 'إضافة العملاء الجدد وتحديث البيانات', priority: 'medium', status: 'pending', dueDate: '2025-02-25', category: 'إدارية' },
    { id: 4, title: 'إعداد عرض تقديمي للإدارة', description: 'ملخص نتائج التدقيق', priority: 'medium', status: 'completed', dueDate: '2025-02-15', category: 'عروض' },
    { id: 5, title: 'أرشفة الملفات القديمة', description: 'تنظيم وأرشفة ملفات 2024', priority: 'low', status: 'pending', dueDate: '2025-03-01', category: 'إدارية' },
  ];

  const meetings: Meeting[] = [
    { id: 1, title: 'اجتماع متابعة المراجعة', date: '2025-02-18', time: '10:00', duration: '1 ساعة', type: 'online', attendees: ['أحمد محمد', 'سارة العمري'], link: 'https://zoom.us/j/123456' },
    { id: 2, title: 'اجتماع لجنة المراجعة', date: '2025-02-20', time: '14:00', duration: '2 ساعة', type: 'in_person', attendees: ['المدير المالي', 'رئيس المراجعة'] },
    { id: 3, title: 'عرض نتائج التقييم', date: '2025-02-22', time: '11:00', duration: '1.5 ساعة', type: 'online', attendees: ['العميل', 'فريق المراجعة'], link: 'https://teams.microsoft.com/l/meetup' },
  ];

  const packages: Package[] = [
    {
      id: 1,
      name: 'الباقة الأساسية',
      price: 300,
      period: 'شهرياً',
      features: [
        'إدارة 20 مهمة شهرياً',
        'تنظيم 5 اجتماعات',
        'متابعة المواعيد والتذكيرات',
        'تقارير شهرية بسيطة'
      ]
    },
    {
      id: 2,
      name: 'الباقة الاحترافية',
      price: 600,
      period: 'شهرياً',
      features: [
        'مهام غير محدودة',
        'تنظيم 15 اجتماعاً',
        'سكرتارية افتراضية 10 ساعات',
        'إعداد التقارير والمراسلات',
        'متابعة البريد الإلكتروني',
        'أولوية في الدعم الفني'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'الباقة المؤسسية',
      price: 1500,
      period: 'شهرياً',
      features: [
        'جميع مميزات الباقة الاحترافية',
        'سكرتارية افتراضية 30 ساعة',
        'إدارة الملفات والأرشفة',
        'التنسيق مع الجهات الخارجية',
        'إعداد العروض التقديمية',
        'حضور الاجتماعات نيابة عنك',
        'مدير حساب مخصص'
      ]
    }
  ];

  const priorityColors = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    low: 'bg-green-100 text-green-700 border-green-200'
  };

  const priorityLabels = {
    high: 'عاجل',
    medium: 'متوسط',
    low: 'منخفض'
  };

  const statusColors = {
    pending: 'text-gray-500',
    in_progress: 'text-blue-500',
    completed: 'text-green-500'
  };

  const filteredTasks = filterStatus === 'all' 
    ? tasks 
    : tasks.filter(t => t.status === filterStatus);

  const renderTasksTab = () => (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">إجمالي المهام</p>
              <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
            </div>
            <CheckSquare className="text-blue-600" size={28} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">قيد التنفيذ</p>
              <p className="text-2xl font-bold text-blue-600">{tasks.filter(t => t.status === 'in_progress').length}</p>
            </div>
            <Clock className="text-blue-600" size={28} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">مكتملة</p>
              <p className="text-2xl font-bold text-green-600">{tasks.filter(t => t.status === 'completed').length}</p>
            </div>
            <CheckCircle className="text-green-600" size={28} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">عاجلة</p>
              <p className="text-2xl font-bold text-red-600">{tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length}</p>
            </div>
            <Flag className="text-red-600" size={28} />
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-wrap gap-4 justify-between items-center">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="البحث في المهام..."
              className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg"
            />
          </div>
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['all', 'pending', 'in_progress', 'completed'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded-md text-sm ${
                  filterStatus === status ? 'bg-white shadow text-blue-600' : 'text-gray-600'
                }`}
              >
                {status === 'all' && 'الكل'}
                {status === 'pending' && 'معلقة'}
                {status === 'in_progress' && 'قيد التنفيذ'}
                {status === 'completed' && 'مكتملة'}
              </button>
            ))}
          </div>
        </div>
        <button 
          onClick={() => setShowAddTask(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 flex items-center"
        >
          <Plus size={18} className="ml-2" />
          مهمة جديدة
        </button>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="divide-y">
          {filteredTasks.map(task => (
            <div key={task.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <button className={`mt-1 ${statusColors[task.status]}`}>
                  {task.status === 'completed' ? (
                    <CheckCircle size={22} />
                  ) : (
                    <Circle size={22} />
                  )}
                </button>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-bold ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                      {task.title}
                    </h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${priorityColors[task.priority]}`}>
                      {priorityLabels[task.priority]}
                    </span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                      {task.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{task.description}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar size={12} className="ml-1" />
                    الموعد النهائي: {task.dueDate}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-blue-100 rounded-lg text-gray-500 hover:text-blue-600">
                    <Edit3 size={16} />
                  </button>
                  <button className="p-2 hover:bg-red-100 rounded-lg text-gray-500 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCalendarTab = () => (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-right flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
            <Video className="text-blue-600" size={28} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">جدولة اجتماع Zoom</h3>
            <p className="text-sm text-gray-500">إنشاء رابط اجتماع جديد</p>
          </div>
        </button>
        
        <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-right flex items-center gap-4">
          <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
            <MessageSquare className="text-green-600" size={28} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">إرسال دعوة واتساب</h3>
            <p className="text-sm text-gray-500">إرسال تذكير للحضور</p>
          </div>
        </button>
        
        <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-right flex items-center gap-4">
          <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
            <Mail className="text-purple-600" size={28} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">إرسال دعوة بريدية</h3>
            <p className="text-sm text-gray-500">إنشاء دعوة اجتماع</p>
          </div>
        </button>
      </div>

      {/* Upcoming Meetings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">الاجتماعات القادمة</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 flex items-center">
            <Plus size={16} className="ml-2" />
            اجتماع جديد
          </button>
        </div>
        
        <div className="divide-y">
          {meetings.map(meeting => (
            <div key={meeting.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-xl text-center min-w-[60px]">
                  <p className="text-xl font-bold">{meeting.date.split('-')[2]}</p>
                  <p className="text-xs">فبراير</p>
                </div>
                
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 mb-1">{meeting.title}</h4>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock size={14} className="ml-1" />
                      {meeting.time} ({meeting.duration})
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      meeting.type === 'online' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {meeting.type === 'online' ? 'أونلاين' : 'حضوري'}
                    </span>
                    <span className="flex items-center">
                      <Users size={14} className="ml-1" />
                      {meeting.attendees.length} مشاركين
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {meeting.link && (
                    <a 
                      href={meeting.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 flex items-center"
                    >
                      <ExternalLink size={14} className="ml-1" />
                      الانضمام
                    </a>
                  )}
                  <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                    <Edit3 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPackagesTab = () => (
    <div className="space-y-8">
      {/* Info Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-2">خدمة السكرتارية الإلكترونية</h2>
        <p className="text-blue-100 mb-4">
          دع فريقنا المتخصص يتولى تنظيم أعمالك ومهامك بينما تركز أنت على النمو والإنجاز
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <span className="text-sm">✓ تنظيم المهام</span>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <span className="text-sm">✓ جدولة الاجتماعات</span>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <span className="text-sm">✓ متابعة البريد</span>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <span className="text-sm">✓ إعداد التقارير</span>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map(pkg => (
          <div 
            key={pkg.id} 
            className={`bg-white rounded-2xl shadow-lg border-2 overflow-hidden ${
              pkg.popular ? 'border-blue-500 scale-105' : 'border-gray-200'
            }`}
          >
            {pkg.popular && (
              <div className="bg-blue-600 text-white text-center py-2 text-sm font-bold">
                الأكثر طلباً
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-gray-900">${pkg.price}</span>
                <span className="text-gray-500 mr-2">/ {pkg.period}</span>
              </div>
              
              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <CheckCircle size={16} className="text-green-600 ml-2 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 rounded-xl font-bold ${
                pkg.popular
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
                اشترك الآن
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Services Details */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">ما الذي نقدمه لك؟</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckSquare className="text-blue-600" size={28} />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">إدارة المهام</h4>
            <p className="text-sm text-gray-600">تنظيم ومتابعة جميع مهامك مع تذكيرات آلية</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-green-600" size={28} />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">جدولة الاجتماعات</h4>
            <p className="text-sm text-gray-600">تنسيق الاجتماعات وإرسال الدعوات والتذكيرات</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="text-purple-600" size={28} />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">إعداد التقارير</h4>
            <p className="text-sm text-gray-600">إعداد وتنسيق التقارير والمراسلات الاحترافية</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 font-sans min-h-screen bg-gradient-to-br from-gray-50 to-blue-50" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Briefcase className="text-blue-600 ml-3" size={32} />
          تنظيم الأعمال (السكرتارية الإلكترونية)
        </h1>
        <p className="text-gray-600">نظام متكامل لإدارة مهامك واجتماعاتك باحترافية</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-1 inline-flex">
        {[
          { id: 'tasks', label: 'المهام', icon: CheckSquare },
          { id: 'calendar', label: 'التقويم', icon: CalendarDays },
          { id: 'packages', label: 'الباقات', icon: Star }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <tab.icon size={16} className="ml-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'tasks' && renderTasksTab()}
      {activeTab === 'calendar' && renderCalendarTab()}
      {activeTab === 'packages' && renderPackagesTab()}

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">إضافة مهمة جديدة</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">عنوان المهمة *</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="أدخل عنوان المهمة" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24" placeholder="وصف المهمة..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الأولوية</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
                    <option value="high">عاجل</option>
                    <option value="medium">متوسط</option>
                    <option value="low">منخفض</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الموعد النهائي</label>
                  <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">التصنيف</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
                  <option value="reports">تقارير</option>
                  <option value="followups">متابعات</option>
                  <option value="admin">إدارية</option>
                  <option value="presentations">عروض</option>
                </select>
              </div>
            </div>

            <div className="p-6 border-t flex gap-3 justify-end">
              <button 
                onClick={() => setShowAddTask(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">
                إضافة المهمة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
