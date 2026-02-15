'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BarChart, ClipboardList, Clock, Briefcase, Settings, Home, Menu, X, BrainCircuit, Users, BookOpen } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'الرئيسية', href: '/dashboard', icon: Home },
    { name: 'إدارة المراجعة الداخلية', href: '/dashboard/audit', icon: ClipboardList },
    { name: 'أداة تقييم الشركات', href: '/dashboard/evaluation', icon: BarChart },
    { name: 'أدوات الذكاء الاصطناعي', href: '/dashboard/ai-tools', icon: BrainCircuit },
    { name: 'بنك الأسئلة (CIA)', href: '/dashboard/question-bank', icon: BookOpen },
    { name: 'المقابلات الوظيفية', href: '/dashboard/interviews', icon: Users },
    { name: 'تنظيم الأعمال (السكرتارية)', href: '/dashboard/business-org', icon: Briefcase },
    { name: 'الساعات المعتمدة', href: '/dashboard/credit-hours', icon: Clock },
    { name: 'الاستشارات', href: '/dashboard/consulting', icon: Briefcase },
    { name: 'لوحة الإدارة', href: '/dashboard/admin', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans" dir="rtl">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b p-4 flex justify-between items-center z-50 fixed w-full top-0">
        <h1 className="text-xl font-bold text-blue-900">منصة خُطى</h1>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="text-gray-600 focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 right-0 z-40 w-64 bg-white border-l border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen md:sticky md:top-0
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-6 border-b border-gray-100 hidden md:block">
          <h1 className="text-2xl font-bold text-blue-900">منصة خُطى</h1>
          <p className="text-sm text-gray-500 mt-1">للتدريب والاستشارات</p>
        </div>

        <nav className="p-4 space-y-1 mt-16 md:mt-0 overflow-y-auto h-[calc(100vh-140px)]">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors group
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <item.icon 
                  className={`ml-3 h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500'}`} 
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 absolute bottom-0 w-full bg-white">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold ml-3">
              أ
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">أحمد محمد</p>
              <p className="text-xs text-gray-500">مدير النظام</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto h-screen p-4 md:p-8 pt-20 md:pt-8 bg-gray-50">
        {children}
      </main>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

    </div>
  );
}
