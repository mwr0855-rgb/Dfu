'use client';

import { useState } from 'react';
import { 
  Brain, Sparkles, FileText, BarChart3, Shield, TrendingUp,
  Upload, Download, Send, RefreshCw, Copy, Check, AlertTriangle,
  FileSpreadsheet, PieChart, Zap, MessageSquare, Wand2, Target,
  Briefcase, Calculator, Search, Clock, Play, Loader2
} from 'lucide-react';

interface AITool {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  category: 'analysis' | 'assistant' | 'generator' | 'comparator';
  status: 'available' | 'coming_soon';
}

export default function AIToolsPage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const aiTools: AITool[] = [
    {
      id: 'financial-analyzer',
      name: 'محلل القوائم المالية',
      description: 'تحليل آلي للقوائم المالية وحساب النسب المالية وإصدار تقارير مفصلة',
      icon: BarChart3,
      color: 'blue',
      category: 'analysis',
      status: 'available'
    },
    {
      id: 'risk-analyzer',
      name: 'محلل المخاطر',
      description: 'تحليل ملفات Excel وتقارير لاكتشاف المخاطر والأنماط غير الطبيعية',
      icon: Shield,
      color: 'red',
      category: 'analysis',
      status: 'available'
    },
    {
      id: 'audit-assistant',
      name: 'مساعد المراجعة الذكي',
      description: 'مساعد يعرف ملفات العميل ويقدم توصيات ذكية بناءً على البيانات',
      icon: Brain,
      color: 'purple',
      category: 'assistant',
      status: 'available'
    },
    {
      id: 'summary-generator',
      name: 'مولد الملخصات التنفيذية',
      description: 'تحويل التقارير الطويلة إلى ملخصات تنفيذية احترافية',
      icon: FileText,
      color: 'green',
      category: 'generator',
      status: 'available'
    },
    {
      id: 'presentation-builder',
      name: 'منشئ العروض التقديمية',
      description: 'تحويل التقارير والبيانات إلى عروض PowerPoint احترافية',
      icon: Sparkles,
      color: 'amber',
      category: 'generator',
      status: 'available'
    },
    {
      id: 'file-comparator',
      name: 'مقارن الملفات الذكي',
      description: 'مقارنة الملفات والبيانات واكتشاف الفروقات بشكل تلقائي',
      icon: Target,
      color: 'indigo',
      category: 'comparator',
      status: 'available'
    },
    {
      id: 'predictive-dashboard',
      name: 'لوحة التوقعات',
      description: 'توقع المخاطر والفرص المستقبلية بناءً على البيانات التاريخية',
      icon: TrendingUp,
      color: 'cyan',
      category: 'analysis',
      status: 'coming_soon'
    },
    {
      id: 'marketing-generator',
      name: 'مولد المحتوى التسويقي',
      description: 'إنشاء منشورات وإيميلات تسويقية احترافية',
      icon: Wand2,
      color: 'pink',
      category: 'generator',
      status: 'available'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; light: string; gradient: string }> = {
      blue: { bg: 'bg-blue-600', text: 'text-blue-600', light: 'bg-blue-50', gradient: 'from-blue-600 to-blue-700' },
      red: { bg: 'bg-red-600', text: 'text-red-600', light: 'bg-red-50', gradient: 'from-red-600 to-red-700' },
      purple: { bg: 'bg-purple-600', text: 'text-purple-600', light: 'bg-purple-50', gradient: 'from-purple-600 to-indigo-600' },
      green: { bg: 'bg-green-600', text: 'text-green-600', light: 'bg-green-50', gradient: 'from-green-600 to-green-700' },
      amber: { bg: 'bg-amber-600', text: 'text-amber-600', light: 'bg-amber-50', gradient: 'from-amber-500 to-orange-500' },
      indigo: { bg: 'bg-indigo-600', text: 'text-indigo-600', light: 'bg-indigo-50', gradient: 'from-indigo-600 to-purple-600' },
      cyan: { bg: 'bg-cyan-600', text: 'text-cyan-600', light: 'bg-cyan-50', gradient: 'from-cyan-600 to-cyan-700' },
      pink: { bg: 'bg-pink-600', text: 'text-pink-600', light: 'bg-pink-50', gradient: 'from-pink-600 to-rose-600' }
    };
    return colors[color] || colors.blue;
  };

  const handleProcess = async () => {
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setOutputText(`تم تحليل البيانات بنجاح!

النتائج الرئيسية:
───────────────────────────
✅ تم فحص ${Math.floor(Math.random() * 1000) + 100} سجل
📊 نسبة السيولة: ${(Math.random() * 2 + 1).toFixed(2)}
📈 معدل الربحية: ${(Math.random() * 30 + 10).toFixed(1)}%
⚠️ عدد المخاطر المكتشفة: ${Math.floor(Math.random() * 10)}

التوصيات:
───────────────────────────
1. مراجعة سياسة الائتمان الحالية
2. تحسين دورة التحصيل
3. تعزيز الرقابة على المصروفات
4. تحديث نظام إدارة المخزون

ملاحظات إضافية:
───────────────────────────
تم إنشاء هذا التحليل باستخدام الذكاء الاصطناعي
يُنصح بمراجعة النتائج مع فريق متخصص
      `);
      setIsProcessing(false);
    }, 3000);
  };

  const selectedToolData = aiTools.find(t => t.id === selectedTool);

  return (
    <div className="p-4 md:p-8 font-sans min-h-screen bg-gradient-to-br from-gray-50 to-purple-50" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Brain className="text-purple-600 ml-3" size={32} />
          أدوات الذكاء الاصطناعي
        </h1>
        <p className="text-gray-600">أدوات متقدمة مدعومة بالذكاء الاصطناعي للتحليل المالي والمراجعة</p>
      </div>

      {/* AI Tools Grid */}
      {!selectedTool ? (
        <>
          {/* Features Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-bold mb-2">قوة الذكاء الاصطناعي في يديك</h2>
                <p className="text-purple-100">
                  أدوات متطورة لتحليل البيانات، اكتشاف المخاطر، وإنشاء التقارير الاحترافية
                </p>
              </div>
              <div className="flex gap-4">
                <div className="bg-white/20 px-4 py-2 rounded-lg text-center">
                  <Zap size={24} className="mx-auto mb-1" />
                  <span className="text-sm">تحليل فوري</span>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-lg text-center">
                  <Shield size={24} className="mx-auto mb-1" />
                  <span className="text-sm">آمن 100%</span>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-lg text-center">
                  <Clock size={24} className="mx-auto mb-1" />
                  <span className="text-sm">24/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 mb-6 flex-wrap">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
              جميع الأدوات
            </button>
            <button className="bg-white text-gray-600 px-4 py-2 rounded-lg text-sm border hover:bg-gray-50">
              أدوات التحليل
            </button>
            <button className="bg-white text-gray-600 px-4 py-2 rounded-lg text-sm border hover:bg-gray-50">
              المساعدات الذكية
            </button>
            <button className="bg-white text-gray-600 px-4 py-2 rounded-lg text-sm border hover:bg-gray-50">
              مولدات المحتوى
            </button>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiTools.map(tool => {
              const colorClasses = getColorClasses(tool.color);
              const Icon = tool.icon;
              
              return (
                <div
                  key={tool.id}
                  onClick={() => tool.status === 'available' && setSelectedTool(tool.id)}
                  className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer ${
                    tool.status === 'coming_soon' ? 'opacity-60' : ''
                  }`}
                >
                  <div className={`h-2 bg-gradient-to-r ${colorClasses.gradient}`} />
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 ${colorClasses.light} rounded-xl flex items-center justify-center`}>
                        <Icon className={colorClasses.text} size={24} />
                      </div>
                      {tool.status === 'coming_soon' && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          قريباً
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-bold text-gray-800 mb-2">{tool.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                    
                    <button
                      disabled={tool.status === 'coming_soon'}
                      className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                        tool.status === 'available'
                          ? `${colorClasses.light} ${colorClasses.text} hover:opacity-80`
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {tool.status === 'available' ? 'استخدام الأداة' : 'قريباً'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Tool Interface */
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => {
              setSelectedTool(null);
              setInputText('');
              setOutputText('');
              setUploadedFile(null);
            }}
            className="mb-6 text-gray-600 hover:text-gray-800 flex items-center"
          >
            ← العودة لقائمة الأدوات
          </button>

          {selectedToolData && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Tool Header */}
              <div className={`p-6 bg-gradient-to-r ${getColorClasses(selectedToolData.color).gradient} text-white`}>
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center ml-4">
                    <selectedToolData.icon size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedToolData.name}</h2>
                    <p className="text-white/80">{selectedToolData.description}</p>
                  </div>
                </div>
              </div>

              {/* Tool Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Input Section */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                      <Upload size={18} className="ml-2 text-gray-500" />
                      المدخلات
                    </h3>
                    
                    {/* File Upload */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        رفع ملف (Excel, PDF, Word)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                        <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                        <p className="text-gray-600">اسحب الملف هنا أو انقر للاختيار</p>
                        <p className="text-xs text-gray-400 mt-1">الحد الأقصى: 10 MB</p>
                        <input
                          type="file"
                          className="hidden"
                          accept=".xlsx,.xls,.pdf,.docx,.doc"
                          onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                        />
                      </div>
                      {uploadedFile && (
                        <div className="mt-2 bg-blue-50 p-3 rounded-lg flex items-center justify-between">
                          <span className="text-blue-700 text-sm">{uploadedFile.name}</span>
                          <button onClick={() => setUploadedFile(null)} className="text-red-500 text-sm">
                            حذف
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Text Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        أو أدخل النص للتحليل
                      </label>
                      <textarea
                        className="w-full border border-gray-300 rounded-xl p-4 h-40 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="أدخل البيانات أو النص المراد تحليله..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                      />
                    </div>

                    {/* Process Button */}
                    <button
                      onClick={handleProcess}
                      disabled={isProcessing || (!inputText && !uploadedFile)}
                      className="w-full mt-4 bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="animate-spin ml-2" size={20} />
                          جاري التحليل...
                        </>
                      ) : (
                        <>
                          <Sparkles size={20} className="ml-2" />
                          تحليل بالذكاء الاصطناعي
                        </>
                      )}
                    </button>
                  </div>

                  {/* Output Section */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                      <FileText size={18} className="ml-2 text-gray-500" />
                      النتائج
                    </h3>
                    
                    <div className="bg-gray-50 rounded-xl p-4 h-80 overflow-y-auto border border-gray-200">
                      {isProcessing ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                          <Loader2 className="animate-spin mb-4" size={40} />
                          <p>جاري معالجة البيانات...</p>
                          <p className="text-sm mt-2">قد يستغرق هذا بضع ثوانٍ</p>
                        </div>
                      ) : outputText ? (
                        <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                          {outputText}
                        </pre>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                          <Brain size={40} className="mb-4" />
                          <p>النتائج ستظهر هنا</p>
                          <p className="text-sm mt-2">ارفع ملف أو أدخل نص للبدء</p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    {outputText && (
                      <div className="flex gap-2 mt-4">
                        <button className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 flex items-center justify-center">
                          <Copy size={16} className="ml-1" />
                          نسخ
                        </button>
                        <button className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg text-sm font-medium hover:bg-green-200 flex items-center justify-center">
                          <Download size={16} className="ml-1" />
                          تصدير PDF
                        </button>
                        <button className="flex-1 bg-amber-100 text-amber-700 py-2 rounded-lg text-sm font-medium hover:bg-amber-200 flex items-center justify-center">
                          <FileSpreadsheet size={16} className="ml-1" />
                          تصدير Excel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tips Section */}
              <div className="p-6 bg-purple-50 border-t">
                <h4 className="font-bold text-purple-800 mb-2 flex items-center">
                  <AlertTriangle size={16} className="ml-2" />
                  نصائح للحصول على أفضل النتائج
                </h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• تأكد من أن البيانات كاملة ومنظمة</li>
                  <li>• استخدم ملفات Excel بصيغة منسقة</li>
                  <li>• راجع النتائج مع فريق متخصص قبل اتخاذ القرارات</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Stats */}
      {!selectedTool && (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">التحليلات اليوم</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
              <BarChart3 className="text-blue-600" size={28} />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">الملفات المعالجة</p>
                <p className="text-2xl font-bold text-green-600">1,234</p>
              </div>
              <FileText className="text-green-600" size={28} />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">المخاطر المكتشفة</p>
                <p className="text-2xl font-bold text-red-600">45</p>
              </div>
              <AlertTriangle className="text-red-600" size={28} />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">التقارير المُنشأة</p>
                <p className="text-2xl font-bold text-purple-600">89</p>
              </div>
              <Sparkles className="text-purple-600" size={28} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
