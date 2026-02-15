'use client';

import { useState } from 'react';
import { 
  Folder, FileText, Plus, Calendar, Users, Target, 
  AlertTriangle, CheckCircle, Clock, Download, Upload,
  Eye, Edit3, Trash2, BarChart3, PieChart, TrendingUp,
  Building2, FileSpreadsheet, FileCheck, Send, Archive,
  Filter, Search, ChevronDown, ChevronRight, Star,
  Shield, Activity, Briefcase, ClipboardList
} from 'lucide-react';

interface Project {
  id: number;
  name: string;
  client: string;
  status: 'planning' | 'executing' | 'reporting' | 'completed';
  startDate: string;
  endDate: string;
  progress: number;
  riskLevel: 'low' | 'medium' | 'high';
  assignedTo: string;
  files: ProjectFile[];
}

interface ProjectFile {
  id: number;
  name: string;
  type: 'plan' | 'workpaper' | 'report' | 'evidence';
  size: string;
  lastModified: string;
  version: number;
}

export default function AuditManagementPage() {
  const [activeTab, setActiveTab] = useState<'projects' | 'plans' | 'workpapers' | 'reports' | 'tracking'>('projects');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const projects: Project[] = [
    {
      id: 1,
      name: 'مراجعة المشتريات والمخازن',
      client: 'شركة الفيصل للتجارة',
      status: 'executing',
      startDate: '2025-01-15',
      endDate: '2025-02-28',
      progress: 65,
      riskLevel: 'high',
      assignedTo: 'أحمد محمد',
      files: [
        { id: 1, name: 'خطة المراجعة المعتمدة.docx', type: 'plan', size: '2.5 MB', lastModified: '2025-01-16', version: 2 },
        { id: 2, name: 'برنامج المراجعة.xlsx', type: 'workpaper', size: '1.8 MB', lastModified: '2025-01-20', version: 1 },
        { id: 3, name: 'أوراق عمل الاختبارات.xlsx', type: 'workpaper', size: '3.2 MB', lastModified: '2025-02-01', version: 3 },
      ]
    },
    {
      id: 2,
      name: 'مراجعة الموارد البشرية',
      client: 'مجموعة النور',
      status: 'planning',
      startDate: '2025-02-01',
      endDate: '2025-03-15',
      progress: 20,
      riskLevel: 'medium',
      assignedTo: 'سارة أحمد',
      files: [
        { id: 4, name: 'مسودة خطة المراجعة.docx', type: 'plan', size: '1.5 MB', lastModified: '2025-02-02', version: 1 },
      ]
    },
    {
      id: 3,
      name: 'مراجعة الخزينة والبنوك',
      client: 'شركة الأمل للمقاولات',
      status: 'reporting',
      startDate: '2024-12-01',
      endDate: '2025-01-31',
      progress: 90,
      riskLevel: 'high',
      assignedTo: 'محمد علي',
      files: [
        { id: 5, name: 'التقرير النهائي (مسودة).docx', type: 'report', size: '4.5 MB', lastModified: '2025-01-28', version: 2 },
        { id: 6, name: 'ملخص الملاحظات.pdf', type: 'report', size: '1.2 MB', lastModified: '2025-01-29', version: 1 },
      ]
    },
    {
      id: 4,
      name: 'مراجعة نظم المعلومات',
      client: 'شركة التقنية الحديثة',
      status: 'completed',
      startDate: '2024-10-01',
      endDate: '2024-12-15',
      progress: 100,
      riskLevel: 'medium',
      assignedTo: 'خالد العمري',
      files: [
        { id: 7, name: 'التقرير النهائي المعتمد.pdf', type: 'report', size: '5.8 MB', lastModified: '2024-12-15', version: 3 },
      ]
    }
  ];

  const auditPlanSections = [
    {
      id: 'purchases',
      title: 'دورة المشتريات',
      objectives: ['التحقق من وجود سياسة معتمدة للمشتريات', 'مراجعة صلاحيات الاعتماد', 'فحص عينة من أوامر الشراء'],
      risks: ['تضخم الأسعار', 'تفضيل موردين محددين', 'غياب المنافسة'],
      tests: ['فحص 30 أمر شراء', 'مقارنة الأسعار بالسوق', 'التحقق من التصاريح']
    },
    {
      id: 'sales',
      title: 'دورة المبيعات',
      objectives: ['مراجعة سياسة الائتمان', 'التحقق من صحة التسعير', 'فحص التحصيلات'],
      risks: ['ديون معدومة', 'تسعير خاطئ', 'عمولات غير مستحقة'],
      tests: ['فحص 50 فاتورة مبيعات', 'مراجعة حسابات العملاء', 'تأكيد الأرصدة']
    },
    {
      id: 'inventory',
      title: 'دورة المخازن',
      objectives: ['التحقق من دقة الجرد', 'مراجعة إجراءات الاستلام والصرف', 'تقييم الرقابة الداخلية'],
      risks: ['سرقة مخزون', 'تالف وراكد', 'فروقات جردية'],
      tests: ['جرد فعلي مفاجئ', 'مطابقة الكروت', 'فحص التالف']
    },
    {
      id: 'treasury',
      title: 'دورة الخزينة والبنوك',
      objectives: ['التحقق من التسويات البنكية', 'مراجعة صلاحيات الصرف', 'فحص المعلقات'],
      risks: ['اختلاس', 'شيكات مرتجعة', 'قروض غير مصرح بها'],
      tests: ['جرد الصندوق', 'تأكيدات بنكية', 'فحص التسويات']
    },
    {
      id: 'hr',
      title: 'دورة الأجور والمرتبات',
      objectives: ['التحقق من صحة الرواتب', 'مراجعة الحضور والانصراف', 'فحص المستحقات'],
      risks: ['موظفين وهميين', 'أجر زائد', 'استقطاعات خاطئة'],
      tests: ['مطابقة كشف الرواتب', 'فحص عينة ملفات', 'تأكيد مع الموظفين']
    },
    {
      id: 'assets',
      title: 'دورة الأصول الثابتة',
      objectives: ['التحقق من وجود الأصول', 'مراجعة الإهلاكات', 'فحص التصرفات'],
      risks: ['أصول مفقودة', 'إهلاك خاطئ', 'استخدام شخصي'],
      tests: ['جرد الأصول', 'مراجعة السجل', 'فحص التأمين']
    }
  ];

  const observations = [
    { id: 1, title: 'عدم وجود سياسة معتمدة للمشتريات', severity: 'high', status: 'open', dueDate: '2025-02-15' },
    { id: 2, title: 'ضعف الفصل بين الصلاحيات', severity: 'high', status: 'in_progress', dueDate: '2025-02-20' },
    { id: 3, title: 'تأخر التسويات البنكية', severity: 'medium', status: 'closed', dueDate: '2025-01-30' },
    { id: 4, title: 'غياب جرد دوري للمخزون', severity: 'medium', status: 'open', dueDate: '2025-03-01' },
  ];

  const statusColors = {
    planning: 'bg-blue-100 text-blue-800',
    executing: 'bg-yellow-100 text-yellow-800',
    reporting: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800'
  };

  const statusLabels = {
    planning: 'التخطيط',
    executing: 'التنفيذ',
    reporting: 'إعداد التقرير',
    completed: 'مكتمل'
  };

  const riskColors = {
    low: 'text-green-600 bg-green-100',
    medium: 'text-yellow-600 bg-yellow-100',
    high: 'text-red-600 bg-red-100'
  };

  const riskLabels = {
    low: 'منخفض',
    medium: 'متوسط',
    high: 'مرتفع'
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const renderProjectsTab = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">إجمالي المشاريع</p>
              <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
            </div>
            <Briefcase className="text-blue-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">قيد التنفيذ</p>
              <p className="text-2xl font-bold text-yellow-600">{projects.filter(p => p.status === 'executing').length}</p>
            </div>
            <Activity className="text-yellow-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">مخاطر عالية</p>
              <p className="text-2xl font-bold text-red-600">{projects.filter(p => p.riskLevel === 'high').length}</p>
            </div>
            <AlertTriangle className="text-red-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">مكتملة</p>
              <p className="text-2xl font-bold text-green-600">{projects.filter(p => p.status === 'completed').length}</p>
            </div>
            <CheckCircle className="text-green-600" size={32} />
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">المشاريع النشطة</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors flex items-center">
            <Plus size={16} className="ml-2" />
            مشروع جديد
          </button>
        </div>
        
        <div className="divide-y">
          {projects.map(project => (
            <div 
              key={project.id} 
              className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${selectedProject === project.id ? 'bg-blue-50' : ''}`}
              onClick={() => setSelectedProject(project.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Building2 className="text-gray-400 ml-2" size={18} />
                    <h4 className="font-bold text-gray-900">{project.name}</h4>
                    <span className={`mr-3 px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                      {statusLabels[project.status]}
                    </span>
                    <span className={`mr-2 px-2 py-1 rounded-full text-xs font-medium ${riskColors[project.riskLevel]}`}>
                      خطر {riskLabels[project.riskLevel]}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{project.client}</p>
                  
                  <div className="flex items-center text-xs text-gray-500 space-x-4 space-x-reverse mb-2">
                    <span className="flex items-center">
                      <Calendar size={12} className="ml-1" />
                      {project.startDate} - {project.endDate}
                    </span>
                    <span className="flex items-center">
                      <Users size={12} className="ml-1" />
                      {project.assignedTo}
                    </span>
                    <span className="flex items-center">
                      <FileText size={12} className="ml-1" />
                      {project.files.length} ملف
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        project.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{project.progress}% مكتمل</p>
                </div>
                
                <div className="flex space-x-2 space-x-reverse">
                  <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-blue-600">
                    <Eye size={18} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-green-600">
                    <Edit3 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPlansTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <h3 className="font-bold text-lg">خطة المراجعة السنوية المبنية على المخاطر</h3>
          <p className="text-blue-100 text-sm mt-1">Risk-Based Annual Audit Plan</p>
        </div>
        
        <div className="p-4">
          {auditPlanSections.map(section => (
            <div key={section.id} className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center">
                  <ClipboardList className="text-blue-600 ml-3" size={20} />
                  <span className="font-bold text-gray-800">{section.title}</span>
                </div>
                {expandedSections[section.id] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </button>
              
              {expandedSections[section.id] && (
                <div className="p-4 space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-800 mb-2 flex items-center">
                      <Target size={16} className="ml-2" />
                      أهداف المراجعة
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {section.objectives.map((obj, idx) => (
                        <li key={idx}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-2 flex items-center">
                      <AlertTriangle size={16} className="ml-2" />
                      المخاطر الجوهرية
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {section.risks.map((risk, idx) => (
                        <li key={idx}>{risk}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2 flex items-center">
                      <CheckCircle size={16} className="ml-2" />
                      اختبارات المراجعة
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {section.tests.map((test, idx) => (
                        <li key={idx}>{test}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWorkpapersTab = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
        <h3 className="font-bold text-gray-800">أوراق العمل والأدلة</h3>
        <div className="flex space-x-2 space-x-reverse">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 flex items-center">
            <Upload size={16} className="ml-2" />
            رفع ملف
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 flex items-center">
            <Folder size={16} className="ml-2" />
            مجلد جديد
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-4 space-x-4 space-x-reverse">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="البحث في أوراق العمل..."
              className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg"
            />
          </div>
          <button className="border border-gray-300 px-4 py-2 rounded-lg flex items-center hover:bg-gray-50">
            <Filter size={16} className="ml-2" />
            تصفية
          </button>
        </div>
        
        {/* File Tree Structure */}
        <div className="border border-gray-200 rounded-lg divide-y">
          {projects.map(project => (
            <div key={project.id}>
              <button
                onClick={() => toggleSection(`wp-${project.id}`)}
                className="w-full p-3 hover:bg-gray-50 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Folder className="text-yellow-500 ml-3" size={20} />
                  <span className="font-medium text-gray-800">{project.name}</span>
                  <span className="text-xs text-gray-500 mr-2">({project.files.length} ملف)</span>
                </div>
                {expandedSections[`wp-${project.id}`] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>
              
              {expandedSections[`wp-${project.id}`] && (
                <div className="bg-gray-50 p-3 mr-8 border-r-2 border-gray-200">
                  {project.files.map(file => (
                    <div key={file.id} className="flex items-center justify-between p-2 hover:bg-white rounded-lg group">
                      <div className="flex items-center">
                        <FileText className="text-blue-500 ml-3" size={16} />
                        <div>
                          <p className="text-sm font-medium text-gray-700">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            {file.size} • v{file.version} • آخر تعديل: {file.lastModified}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-1 space-x-reverse opacity-0 group-hover:opacity-100">
                        <button className="p-1 hover:bg-blue-100 rounded text-gray-500 hover:text-blue-600">
                          <Eye size={14} />
                        </button>
                        <button className="p-1 hover:bg-green-100 rounded text-gray-500 hover:text-green-600">
                          <Download size={14} />
                        </button>
                        <button className="p-1 hover:bg-purple-100 rounded text-gray-500 hover:text-purple-600">
                          <Send size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReportsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all text-right">
          <FileCheck className="text-blue-600 mb-3" size={32} />
          <h3 className="font-bold text-gray-800 mb-1">تقرير مراجعة جديد</h3>
          <p className="text-sm text-gray-500">إنشاء تقرير مراجعة احترافي</p>
        </button>
        
        <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-green-300 transition-all text-right">
          <FileSpreadsheet className="text-green-600 mb-3" size={32} />
          <h3 className="font-bold text-gray-800 mb-1">ملخص تنفيذي</h3>
          <p className="text-sm text-gray-500">تقرير مختصر للإدارة العليا</p>
        </button>
        
        <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-purple-300 transition-all text-right">
          <Archive className="text-purple-600 mb-3" size={32} />
          <h3 className="font-bold text-gray-800 mb-1">أرشيف التقارير</h3>
          <p className="text-sm text-gray-500">التقارير السابقة والمعتمدة</p>
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-bold text-gray-800">التقارير الأخيرة</h3>
        </div>
        
        <div className="divide-y">
          {projects.filter(p => p.status === 'reporting' || p.status === 'completed').map(project => (
            <div key={project.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-800">{project.name}</h4>
                  <p className="text-sm text-gray-500">{project.client}</p>
                </div>
                <div className="flex space-x-2 space-x-reverse">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700">
                    عرض
                  </button>
                  <button className="border border-gray-300 px-3 py-1 rounded-lg text-sm hover:bg-gray-50">
                    تصدير PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTrackingTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b bg-gradient-to-r from-amber-500 to-orange-500 text-white">
          <h3 className="font-bold text-lg">متابعة تنفيذ التوصيات</h3>
          <p className="text-amber-100 text-sm mt-1">Follow-up on Audit Recommendations</p>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-red-600">{observations.filter(o => o.status === 'open').length}</p>
              <p className="text-sm text-gray-600">مفتوحة</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-yellow-600">{observations.filter(o => o.status === 'in_progress').length}</p>
              <p className="text-sm text-gray-600">قيد التنفيذ</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-green-600">{observations.filter(o => o.status === 'closed').length}</p>
              <p className="text-sm text-gray-600">مغلقة</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {observations.map(obs => (
              <div key={obs.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      {obs.severity === 'high' && <AlertTriangle className="text-red-500 ml-2" size={18} />}
                      {obs.severity === 'medium' && <AlertTriangle className="text-yellow-500 ml-2" size={18} />}
                      <h4 className="font-bold text-gray-800">{obs.title}</h4>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 space-x-4 space-x-reverse">
                      <span className="flex items-center">
                        <Calendar size={14} className="ml-1" />
                        الموعد النهائي: {obs.dueDate}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    obs.status === 'open' ? 'bg-red-100 text-red-700' :
                    obs.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {obs.status === 'open' ? 'مفتوحة' : obs.status === 'in_progress' ? 'قيد التنفيذ' : 'مغلقة'}
                  </span>
                </div>
              </div>
            ))}
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
          <Shield className="text-blue-600 ml-3" size={32} />
          إدارة المراجعة الداخلية
        </h1>
        <p className="text-gray-600">نظام متكامل لإدارة مهام المراجعة الداخلية وفقاً لأفضل الممارسات الدولية</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-1 inline-flex">
        {[
          { id: 'projects', label: 'المشاريع', icon: Briefcase },
          { id: 'plans', label: 'خطط المراجعة', icon: Target },
          { id: 'workpapers', label: 'أوراق العمل', icon: FileText },
          { id: 'reports', label: 'التقارير', icon: FileCheck },
          { id: 'tracking', label: 'متابعة التوصيات', icon: Activity }
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
      {activeTab === 'projects' && renderProjectsTab()}
      {activeTab === 'plans' && renderPlansTab()}
      {activeTab === 'workpapers' && renderWorkpapersTab()}
      {activeTab === 'reports' && renderReportsTab()}
      {activeTab === 'tracking' && renderTrackingTab()}
    </div>
  );
}
