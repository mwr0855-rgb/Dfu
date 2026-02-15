'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Settings,
  BarChart3,
  FileText,
  Shield,
  Bell,
  Search,
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/primitives';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'instructor' | 'student' | 'reviewer';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
}

interface CPDRequest {
  id: string;
  userName: string;
  articleTitle: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  hours: number;
}

const sampleUsers: AdminUser[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    role: 'instructor',
    status: 'active',
    joinDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'فاطمة علي',
    email: 'fatima@example.com',
    role: 'student',
    status: 'active',
    joinDate: '2024-02-01',
  },
];

const sampleCPDRequests: CPDRequest[] = [
  {
    id: '1',
    userName: 'محمود حسن',
    articleTitle: 'أساسيات المراجعة الداخلية',
    status: 'pending',
    submittedDate: '2024-02-10',
    hours: 2,
  },
  {
    id: '2',
    userName: 'ليلى محمد',
    articleTitle: 'تحليل المخاطر المتقدم',
    status: 'approved',
    submittedDate: '2024-02-05',
    hours: 3,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    } as any,
  },
} as any;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index?: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      damping: 20,
      stiffness: 300,
    },
  }),
};

const getRoleLabel = (role: string) => {
  const roles: Record<string, string> = {
    admin: 'مسؤول',
    instructor: 'مدرب',
    student: 'طالب',
    reviewer: 'مراجع',
  };
  return roles[role] || role;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'from-green-500 to-green-600';
    case 'inactive':
      return 'from-gray-500 to-gray-600';
    case 'suspended':
      return 'from-red-500 to-red-600';
    case 'approved':
      return 'from-green-500 to-green-600';
    case 'pending':
      return 'from-amber-500 to-amber-600';
    case 'rejected':
      return 'from-red-500 to-red-600';
    default:
      return 'from-gray-500 to-gray-600';
  }
};

const getStatusLabel = (status: string) => {
  const statuses: Record<string, string> = {
    active: 'نشط',
    inactive: 'غير نشط',
    suspended: 'معلق',
    approved: 'موافق عليه',
    pending: 'قيد الانتظار',
    rejected: 'مرفوض',
  };
  return statuses[status] || status;
};

export default function AdminDashboardEnhanced() {
  const [activeTab, setActiveTab] = useState<'users' | 'cpd' | 'courses' | 'reports'>('users');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Container size="xl" className="py-12">
      {/* Header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
              لوحة تحكم الإدارة
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              إدارة شاملة للمستخدمين والمحتوى والطلبات والتقارير
            </p>
          </div>
          <Button size="lg">
            <Plus className="w-4 h-4" />
            إضافة جديد
          </Button>
        </div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { icon: Users, label: 'المستخدمين', value: '1,234', color: 'from-indigo-500 to-indigo-600' },
            { icon: FileText, label: 'الكورسات', value: '45', color: 'from-purple-500 to-purple-600' },
            { icon: Bell, label: 'طلبات CPD', value: '23', color: 'from-amber-500 to-amber-600' },
            { icon: BarChart3, label: 'التقارير', value: '156', color: 'from-green-500 to-green-600' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} text-white mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stat.value}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="mb-8 flex gap-2 border-b border-neutral-200 dark:border-neutral-700 overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[
          { id: 'users', label: 'إدارة المستخدمين', icon: Users },
          { id: 'cpd', label: 'طلبات الساعات المعتمدة', icon: Award },
          { id: 'courses', label: 'إدارة الكورسات', icon: FileText },
          { id: 'reports', label: 'التقارير والإحصائيات', icon: BarChart3 },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-all border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className="mb-6 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          placeholder="بحث..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Users Management */}
        {activeTab === 'users' && (
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-700/50">
                      <th className="px-6 py-3 text-right text-sm font-semibold text-neutral-900 dark:text-white">الاسم</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-neutral-900 dark:text-white">البريد الإلكتروني</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-neutral-900 dark:text-white">الدور</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-neutral-900 dark:text-white">الحالة</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-neutral-900 dark:text-white">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleUsers.map((user) => (
                      <tr key={user.id} className="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors">
                        <td className="px-6 py-4 text-sm text-neutral-900 dark:text-white">{user.name}</td>
                        <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">{user.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300">
                            {getRoleLabel(user.role)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getStatusColor(user.status)}`}
                          >
                            {getStatusLabel(user.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors">
                              <Eye className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                            </button>
                            <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors">
                              <Edit2 className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                            </button>
                            <button className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* CPD Requests */}
        {activeTab === 'cpd' && (
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {sampleCPDRequests.map((request) => (
              <motion.div
                key={request.id}
                variants={itemVariants}
                className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">
                      {request.userName}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {request.articleTitle}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getStatusColor(request.status)}`}
                  >
                    {getStatusLabel(request.status)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                  <span>{request.submittedDate}</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{request.hours} ساعات</span>
                </div>

                {request.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary">
                      <CheckCircle2 className="w-4 h-4" />
                      موافقة
                    </Button>
                    <Button size="sm" variant="secondary" className="text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      رفض
                    </Button>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Courses Management */}
        {activeTab === 'courses' && (
          <motion.div
            className="bg-white dark:bg-neutral-800 rounded-lg p-8 border border-neutral-200 dark:border-neutral-700 text-center"
            variants={itemVariants}
          >
            <FileText className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
              إدارة الكورسات
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              إضافة وتعديل وحذف الكورسات والمحتوى
            </p>
            <Button>
              <Plus className="w-4 h-4" />
              إضافة كورس جديد
            </Button>
          </motion.div>
        )}

        {/* Reports & Statistics */}
        {activeTab === 'reports' && (
          <motion.div
            className="bg-white dark:bg-neutral-800 rounded-lg p-8 border border-neutral-200 dark:border-neutral-700 text-center"
            variants={itemVariants}
          >
            <BarChart3 className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
              التقارير والإحصائيات
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              عرض شامل للإحصائيات والتقارير التحليلية
            </p>
            <Button>
              <BarChart3 className="w-4 h-4" />
              عرض التقارير
            </Button>
          </motion.div>
        )}
      </motion.div>
    </Container>
  );
}

// Import Award icon
import { Award } from 'lucide-react';
