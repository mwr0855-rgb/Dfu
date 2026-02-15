'use client';

import { useState } from 'react';
import { 
  Users, BookOpen, Settings, BarChart3, Plus, Search, Filter,
  Edit3, Trash2, Eye, Send, Mail, Phone, Calendar, Clock,
  CheckCircle, XCircle, UserPlus, FolderPlus, Link, Download,
  Upload, Copy, ExternalLink, Lock, Unlock, ChevronDown, ChevronRight,
  Building2, Award, CreditCard, Activity, TrendingUp, Bell, Shield
} from 'lucide-react';

interface Trainee {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'active' | 'inactive' | 'pending';
  courses: number[];
  joinDate: string;
  storageUsed: number; // in GB
  lifetimeAccess: boolean;
}

interface Course {
  id: number;
  title: string;
  category: string;
  duration: string;
  enrolledCount: number;
  status: 'active' | 'draft' | 'archived';
  startDate: string;
  endDate?: string;
  price: number;
}

export default function AdminPanelPage() {
  const [activeTab, setActiveTab] = useState<'trainees' | 'courses' | 'content' | 'reports' | 'settings'>('trainees');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTrainee, setSelectedTrainee] = useState<Trainee | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const trainees: Trainee[] = [
    { id: 1, name: 'أحمد محمد السعيد', email: 'ahmed@example.com', phone: '0501234567', company: 'شركة الفيصل', status: 'active', courses: [1, 2], joinDate: '2025-01-15', storageUsed: 2.5, lifetimeAccess: true },
    { id: 2, name: 'سارة عبدالله العمري', email: 'sara@example.com', phone: '0502345678', status: 'active', courses: [1], joinDate: '2025-01-20', storageUsed: 1.2, lifetimeAccess: false },
    { id: 3, name: 'خالد إبراهيم', email: 'khalid@example.com', phone: '0503456789', company: 'مجموعة النور', status: 'pending', courses: [], joinDate: '2025-02-01', storageUsed: 0, lifetimeAccess: false },
    { id: 4, name: 'فاطمة أحمد', email: 'fatima@example.com', phone: '0504567890', status: 'inactive', courses: [2], joinDate: '2024-12-01', storageUsed: 3.8, lifetimeAccess: true },
  ];

  const courses: Course[] = [
    { id: 1, title: 'زمالة المراجع الداخلي CIA - الجزء الأول', category: 'المراجعة الداخلية', duration: '40 ساعة', enrolledCount: 45, status: 'active', startDate: '2025-01-01', price: 2500 },
    { id: 2, title: 'التحليل المالي وإعداد القوائم المالية', category: 'التحليل المالي', duration: '25 ساعة', enrolledCount: 32, status: 'active', startDate: '2025-02-01', price: 1800 },
    { id: 3, title: 'إدارة وتشغيل المطاعم', category: 'إدارة الأعمال', duration: '30 ساعة', enrolledCount: 18, status: 'active', startDate: '2025-02-15', price: 2000 },
    { id: 4, title: 'إدارة المخازن والمستودعات', category: 'سلاسل الإمداد', duration: '20 ساعة', enrolledCount: 0, status: 'draft', startDate: '', price: 1500 },
  ];

  const stats = {
    totalTrainees: trainees.length,
    activeTrainees: trainees.filter(t => t.status === 'active').length,
    totalCourses: courses.length,
    activeCourses: courses.filter(c => c.status === 'active').length,
    totalRevenue: 125000,
    monthlyGrowth: 15
  };

  const statusColors = {
    active: 'bg-green-100 text-green-700',
    inactive: 'bg-gray-100 text-gray-700',
    pending: 'bg-yellow-100 text-yellow-700',
    draft: 'bg-gray-100 text-gray-700',
    archived: 'bg-red-100 text-red-700'
  };

  const statusLabels = {
    active: 'نشط',
    inactive: 'غير نشط',
    pending: 'في الانتظار',
    draft: 'مسودة',
    archived: 'مؤرشف'
  };

  const renderStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-xs">المتدربين</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalTrainees}</p>
          </div>
          <Users className="text-blue-600" size={28} />
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-xs">نشطين</p>
            <p className="text-2xl font-bold text-green-600">{stats.activeTrainees}</p>
          </div>
          <CheckCircle className="text-green-600" size={28} />
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-xs">الدورات</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
          </div>
          <BookOpen className="text-purple-600" size={28} />
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-xs">دورات نشطة</p>
            <p className="text-2xl font-bold text-purple-600">{stats.activeCourses}</p>
          </div>
          <Activity className="text-purple-600" size={28} />
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-xs">الإيرادات</p>
            <p className="text-2xl font-bold text-amber-600">${stats.totalRevenue.toLocaleString()}</p>
          </div>
          <CreditCard className="text-amber-600" size={28} />
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-xs">النمو الشهري</p>
            <p className="text-2xl font-bold text-green-600">+{stats.monthlyGrowth}%</p>
          </div>
          <TrendingUp className="text-green-600" size={28} />
        </div>
      </div>
    </div>
  );

  const renderTraineesTab = () => (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-wrap gap-4 justify-between items-center">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="البحث عن متدرب..."
              className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="border border-gray-300 px-4 py-2 rounded-lg flex items-center hover:bg-gray-50">
            <Filter size={16} className="ml-2" />
            تصفية
          </button>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 flex items-center"
          >
            <UserPlus size={16} className="ml-2" />
            إضافة متدرب
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 flex items-center">
            <Send size={16} className="ml-2" />
            إرسال رابط دعوة
          </button>
        </div>
      </div>

      {/* Trainees Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-right py-3 px-4 font-medium text-gray-600 text-sm">المتدرب</th>
              <th className="text-right py-3 px-4 font-medium text-gray-600 text-sm">التواصل</th>
              <th className="text-right py-3 px-4 font-medium text-gray-600 text-sm">الشركة</th>
              <th className="text-right py-3 px-4 font-medium text-gray-600 text-sm">الحالة</th>
              <th className="text-right py-3 px-4 font-medium text-gray-600 text-sm">الدورات</th>
              <th className="text-right py-3 px-4 font-medium text-gray-600 text-sm">التخزين</th>
              <th className="text-right py-3 px-4 font-medium text-gray-600 text-sm">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {trainees.filter(t => 
              t.name.includes(searchQuery) || 
              t.email.includes(searchQuery)
            ).map(trainee => (
              <tr key={trainee.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold ml-3">
                      {trainee.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{trainee.name}</p>
                      <p className="text-xs text-gray-500">انضم: {trainee.joinDate}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm">
                    <p className="text-gray-600 flex items-center">
                      <Mail size={12} className="ml-1" />
                      {trainee.email}
                    </p>
                    <p className="text-gray-500 flex items-center">
                      <Phone size={12} className="ml-1" />
                      {trainee.phone}
                    </p>
                  </div>
                </td>
                <td className="py-3 px-4">
                  {trainee.company ? (
                    <span className="flex items-center text-sm text-gray-600">
                      <Building2 size={14} className="ml-1" />
                      {trainee.company}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm">-</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[trainee.status]}`}>
                    {statusLabels[trainee.status]}
                  </span>
                  {trainee.lifetimeAccess && (
                    <span className="mr-2 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                      مدى الحياة
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                    {trainee.courses.length} دورات
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="w-20">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{trainee.storageUsed} GB</span>
                      <span>5 GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${trainee.storageUsed > 4 ? 'bg-red-500' : 'bg-green-500'}`}
                        style={{ width: `${(trainee.storageUsed / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-1 space-x-reverse">
                    <button className="p-2 hover:bg-blue-100 rounded-lg text-gray-500 hover:text-blue-600" title="عرض">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 hover:bg-green-100 rounded-lg text-gray-500 hover:text-green-600" title="تعديل">
                      <Edit3 size={16} />
                    </button>
                    <button className="p-2 hover:bg-purple-100 rounded-lg text-gray-500 hover:text-purple-600" title="رابط دخول">
                      <Link size={16} />
                    </button>
                    <button className="p-2 hover:bg-red-100 rounded-lg text-gray-500 hover:text-red-600" title="حذف">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCoursesTab = () => (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-wrap gap-4 justify-between items-center">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="البحث في الدورات..."
              className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 flex items-center">
            <Plus size={16} className="ml-2" />
            إضافة دورة
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">{course.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  course.status === 'active' ? 'bg-green-100 text-green-700' :
                  course.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {statusLabels[course.status]}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p className="flex items-center">
                  <BookOpen size={14} className="ml-2 text-gray-400" />
                  {course.category}
                </p>
                <p className="flex items-center">
                  <Clock size={14} className="ml-2 text-gray-400" />
                  {course.duration}
                </p>
                <p className="flex items-center">
                  <Users size={14} className="ml-2 text-gray-400" />
                  {course.enrolledCount} متدرب مسجل
                </p>
                <p className="flex items-center">
                  <CreditCard size={14} className="ml-2 text-gray-400" />
                  ${course.price}
                </p>
              </div>
              
              <div className="flex justify-between items-center border-t pt-4">
                <div className="flex space-x-1 space-x-reverse">
                  <button className="p-2 hover:bg-blue-100 rounded-lg text-gray-500 hover:text-blue-600">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 hover:bg-green-100 rounded-lg text-gray-500 hover:text-green-600">
                    <Edit3 size={16} />
                  </button>
                  <button className="p-2 hover:bg-purple-100 rounded-lg text-gray-500 hover:text-purple-600">
                    <Copy size={16} />
                  </button>
                </div>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                  إدارة المحتوى ←
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">إدارة محتوى الدورات</h3>
        
        <div className="space-y-4">
          {courses.filter(c => c.status === 'active').map(course => (
            <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-gray-800">{course.title}</h4>
                  <p className="text-sm text-gray-500">{course.category}</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-200">
                    <Upload size={14} className="inline ml-1" />
                    رفع ملفات
                  </button>
                  <button className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-purple-200">
                    <FolderPlus size={14} className="inline ml-1" />
                    إضافة محور
                  </button>
                  <button className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-200">
                    <ExternalLink size={14} className="inline ml-1" />
                    معاينة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-right">
          <Upload className="text-blue-600 mb-3" size={32} />
          <h3 className="font-bold text-gray-800 mb-1">رفع ملف جديد</h3>
          <p className="text-sm text-gray-500">Word, Excel, PDF, فيديو</p>
        </button>
        
        <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-right">
          <Copy className="text-green-600 mb-3" size={32} />
          <h3 className="font-bold text-gray-800 mb-1">نسخ ملفات</h3>
          <p className="text-sm text-gray-500">بين الدورات أو المتدربين</p>
        </button>
        
        <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-right">
          <Link className="text-purple-600 mb-3" size={32} />
          <h3 className="font-bold text-gray-800 mb-1">إضافة فيديو شرح</h3>
          <p className="text-sm text-gray-500">لمحور أو ملف محدد</p>
        </button>
      </div>
    </div>
  );

  const renderReportsTab = () => (
    <div className="space-y-6">
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4">الاشتراكات الشهرية</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
            [مخطط بياني للاشتراكات]
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4">توزيع المتدربين حسب الدورات</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
            [مخطط دائري]
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">التقارير المتاحة</h3>
        <div className="space-y-3">
          {[
            { title: 'تقرير المتدربين النشطين', type: 'Excel' },
            { title: 'تقرير الإيرادات الشهرية', type: 'PDF' },
            { title: 'تقرير التقدم في الدورات', type: 'Excel' },
            { title: 'تقرير استخدام المساحة التخزينية', type: 'PDF' },
          ].map((report, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
              <span className="font-medium text-gray-700">{report.title}</span>
              <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center">
                <Download size={14} className="ml-1" />
                تحميل {report.type}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">إعدادات المنصة</h3>
        
        <div className="space-y-4">
          {/* Page Controls */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-700 mb-3 flex items-center">
              <Shield size={18} className="ml-2 text-blue-600" />
              التحكم في الصفحات
            </h4>
            <div className="space-y-2">
              {[
                { name: 'صفحة الكورسات', enabled: true },
                { name: 'صفحة الزمالة CIA', enabled: true },
                { name: 'صفحة تقييم الشركات', enabled: true },
                { name: 'صفحة المقابلات الوظيفية', enabled: false },
                { name: 'صفحة الاستشارات', enabled: true },
              ].map((page, idx) => (
                <div key={idx} className="flex items-center justify-between py-2">
                  <span className="text-gray-700">{page.name}</span>
                  <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    page.enabled ? 'bg-blue-600' : 'bg-gray-300'
                  }`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      page.enabled ? 'translate-x-1' : 'translate-x-6'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Settings */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-700 mb-3 flex items-center">
              <Bell size={18} className="ml-2 text-green-600" />
              إعدادات الإشعارات
            </h4>
            <div className="space-y-2">
              {[
                { name: 'إشعار التسجيل الجديد', enabled: true },
                { name: 'إشعار إكمال الدورة', enabled: true },
                { name: 'إشعار الدفع', enabled: true },
              ].map((setting, idx) => (
                <div key={idx} className="flex items-center justify-between py-2">
                  <span className="text-gray-700">{setting.name}</span>
                  <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    setting.enabled ? 'bg-green-600' : 'bg-gray-300'
                  }`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      setting.enabled ? 'translate-x-1' : 'translate-x-6'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp Integration */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-700 mb-3">ربط الواتساب</h4>
            <div className="flex gap-4">
              <input 
                type="text" 
                placeholder="رقم الواتساب (مثال: 00201208550139)"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                defaultValue="00201208550139"
              />
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700">
                حفظ
              </button>
            </div>
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
          <Settings className="text-blue-600 ml-3" size={32} />
          لوحة تحكم الإدارة
        </h1>
        <p className="text-gray-600">إدارة المتدربين والدورات والمحتوى بشكل مركزي</p>
      </div>

      {/* Stats */}
      {renderStats()}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-1 inline-flex flex-wrap">
        {[
          { id: 'trainees', label: 'المتدربين', icon: Users },
          { id: 'courses', label: 'الدورات', icon: BookOpen },
          { id: 'content', label: 'المحتوى', icon: FolderPlus },
          { id: 'reports', label: 'التقارير', icon: BarChart3 },
          { id: 'settings', label: 'الإعدادات', icon: Settings }
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
      {activeTab === 'trainees' && renderTraineesTab()}
      {activeTab === 'courses' && renderCoursesTab()}
      {activeTab === 'content' && renderContentTab()}
      {activeTab === 'reports' && renderReportsTab()}
      {activeTab === 'settings' && renderSettingsTab()}

      {/* Add Trainee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">إضافة متدرب جديد</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل *</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="أدخل اسم المتدرب" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني *</label>
                <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="example@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف *</label>
                <input type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="05XXXXXXXX" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الشركة (اختياري)</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="اسم الشركة" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الدورات</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2" multiple>
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="lifetime" className="ml-2" />
                <label htmlFor="lifetime" className="text-sm text-gray-700">اشتراك مدى الحياة</label>
              </div>
            </div>

            <div className="p-6 border-t flex gap-3 justify-end">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">
                إضافة المتدرب
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
