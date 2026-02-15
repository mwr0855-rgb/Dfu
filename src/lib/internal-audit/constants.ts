/**
 * ثوابت نظام إدارة المراجعة الداخلية
 * Internal Audit Management System Constants
 */

import type { Department, Risk, AuditProgram } from './types';

// ==================== الإدارات ====================
export const DEPARTMENTS: Department[] = [
  {
    id: 'dept-001',
    name: 'المشتريات',
    nameEn: 'Procurement',
    manager: 'أحمد محمد',
    riskCount: 12,
    lastAuditDate: '2024-09-15',
    nextAuditDate: '2025-03-15',
    auditFrequency: 'نصف سنوي',
    priority: 'عالية'
  },
  {
    id: 'dept-002',
    name: 'المبيعات',
    nameEn: 'Sales',
    manager: 'فاطمة أحمد',
    riskCount: 10,
    lastAuditDate: '2024-10-01',
    nextAuditDate: '2025-04-01',
    auditFrequency: 'نصف سنوي',
    priority: 'عالية'
  },
  {
    id: 'dept-003',
    name: 'المخازن',
    nameEn: 'Warehousing',
    manager: 'محمود علي',
    riskCount: 15,
    lastAuditDate: '2024-08-20',
    nextAuditDate: '2025-02-20',
    auditFrequency: 'نصف سنوي',
    priority: 'عالية'
  },
  {
    id: 'dept-004',
    name: 'الخزينة والبنوك',
    nameEn: 'Treasury & Banking',
    manager: 'سارة خالد',
    riskCount: 18,
    lastAuditDate: '2024-11-01',
    nextAuditDate: '2025-02-01',
    auditFrequency: 'ربع سنوي',
    priority: 'عالية'
  },
  {
    id: 'dept-005',
    name: 'الأجور والمرتبات',
    nameEn: 'Payroll',
    manager: 'عمر حسن',
    riskCount: 8,
    lastAuditDate: '2024-07-15',
    nextAuditDate: '2025-01-15',
    auditFrequency: 'نصف سنوي',
    priority: 'متوسطة'
  },
  {
    id: 'dept-006',
    name: 'الأصول الثابتة',
    nameEn: 'Fixed Assets',
    manager: 'ليلى عبدالله',
    riskCount: 6,
    lastAuditDate: '2024-05-10',
    nextAuditDate: '2025-05-10',
    auditFrequency: 'سنوي',
    priority: 'منخفضة'
  },
  {
    id: 'dept-007',
    name: 'المصروفات',
    nameEn: 'Expenses',
    manager: 'يوسف إبراهيم',
    riskCount: 9,
    lastAuditDate: '2024-09-01',
    nextAuditDate: '2025-03-01',
    auditFrequency: 'نصف سنوي',
    priority: 'متوسطة'
  },
  {
    id: 'dept-008',
    name: 'نظم المعلومات',
    nameEn: 'Information Systems',
    manager: 'نور الدين محمد',
    riskCount: 14,
    lastAuditDate: '2024-10-15',
    nextAuditDate: '2025-04-15',
    auditFrequency: 'نصف سنوي',
    priority: 'عالية'
  },
  {
    id: 'dept-009',
    name: 'الامتثال والحوكمة',
    nameEn: 'Compliance & Governance',
    manager: 'رانيا سعيد',
    riskCount: 11,
    lastAuditDate: '2024-11-10',
    nextAuditDate: '2025-02-10',
    auditFrequency: 'ربع سنوي',
    priority: 'عالية'
  },
  {
    id: 'dept-010',
    name: 'الموارد البشرية',
    nameEn: 'Human Resources',
    manager: 'خالد محمود',
    riskCount: 7,
    lastAuditDate: '2024-06-20',
    nextAuditDate: '2025-06-20',
    auditFrequency: 'سنوي',
    priority: 'متوسطة'
  }
];

// ==================== المخاطر الرئيسية ====================
export const KEY_RISKS: Risk[] = [
  {
    id: 'risk-001',
    code: 'PROC-001',
    title: 'عدم وجود فصل واضح للمهام في دورة المشتريات',
    description: 'نفس الموظف يقوم بطلب الشراء والموافقة واستلام البضاعة مما يزيد من خطر الاحتيال',
    category: 'تشغيلية',
    department: 'المشتريات',
    impact: 'عالي',
    likelihood: 'مرتفع',
    riskLevel: 'عالي',
    riskScore: 20,
    inherentRisk: 20,
    residualRisk: 12,
    controls: [],
    owner: 'أحمد محمد',
    status: 'تحت المراقبة',
    identifiedDate: '2024-01-15',
    lastReviewDate: '2024-11-01',
    nextReviewDate: '2025-02-01'
  },
  {
    id: 'risk-002',
    code: 'SALES-001',
    title: 'عدم وجود نظام آلي لمراقبة الديون المتأخرة',
    description: 'زيادة نسبة الديون المعدومة بسبب عدم المتابعة الدورية للعملاء المتأخرين',
    category: 'مالية',
    department: 'المبيعات',
    impact: 'عالي',
    likelihood: 'متوسط',
    riskLevel: 'عالي',
    riskScore: 16,
    inherentRisk: 16,
    residualRisk: 10,
    controls: [],
    owner: 'فاطمة أحمد',
    status: 'مفتوح',
    identifiedDate: '2024-02-10',
    lastReviewDate: '2024-10-15',
    nextReviewDate: '2025-01-15'
  },
  {
    id: 'risk-003',
    code: 'INV-001',
    title: 'عدم دقة المخزون الفعلي مع السجلات المحاسبية',
    description: 'وجود فروقات كبيرة بين المخزون الفعلي والسجلات بسبب ضعف نظام الجرد الدوري',
    category: 'تشغيلية',
    department: 'المخازن',
    impact: 'حرج',
    likelihood: 'مرتفع',
    riskLevel: 'حرج',
    riskScore: 25,
    inherentRisk: 25,
    residualRisk: 15,
    controls: [],
    owner: 'محمود علي',
    status: 'مفتوح',
    identifiedDate: '2024-01-20',
    lastReviewDate: '2024-11-10',
    nextReviewDate: '2025-02-10'
  },
  {
    id: 'risk-004',
    code: 'TREAS-001',
    title: 'غياب المطابقات البنكية الشهرية',
    description: 'عدم إجراء مطابقات دورية للحسابات البنكية مما يؤدي لعدم اكتشاف الأخطاء والاحتيال',
    category: 'مالية',
    department: 'الخزينة والبنوك',
    impact: 'حرج',
    likelihood: 'متوسط',
    riskLevel: 'عالي',
    riskScore: 20,
    inherentRisk: 20,
    residualRisk: 8,
    controls: [],
    owner: 'سارة خالد',
    status: 'مغلق',
    identifiedDate: '2024-03-01',
    lastReviewDate: '2024-11-20',
    nextReviewDate: '2025-02-20'
  },
  {
    id: 'risk-005',
    code: 'PAY-001',
    title: 'عدم وجود آلية لمراجعة الموظفين الوهميين',
    description: 'احتمالية وجود موظفين وهميين على كشوف الرواتب دون مراجعة دورية',
    category: 'تشغيلية',
    department: 'الأجور والمرتبات',
    impact: 'عالي',
    likelihood: 'محتمل',
    riskLevel: 'متوسط',
    riskScore: 12,
    inherentRisk: 16,
    residualRisk: 8,
    controls: [],
    owner: 'عمر حسن',
    status: 'تحت المراقبة',
    identifiedDate: '2024-02-15',
    lastReviewDate: '2024-10-20',
    nextReviewDate: '2025-04-20'
  },
  {
    id: 'risk-006',
    code: 'IT-001',
    title: 'ضعف سياسات النسخ الاحتياطي',
    description: 'عدم وجود إجراءات منتظمة للنسخ الاحتياطي واستعادة البيانات في حالات الطوارئ',
    category: 'تقنية',
    department: 'نظم المعلومات',
    impact: 'حرج',
    likelihood: 'متوسط',
    riskLevel: 'عالي',
    riskScore: 20,
    inherentRisk: 25,
    residualRisk: 12,
    controls: [],
    owner: 'نور الدين محمد',
    status: 'مفتوح',
    identifiedDate: '2024-01-10',
    lastReviewDate: '2024-11-05',
    nextReviewDate: '2025-02-05'
  },
  {
    id: 'risk-007',
    code: 'COMP-001',
    title: 'عدم الامتثال لمتطلبات حماية البيانات الشخصية',
    description: 'عدم وجود سياسات واضحة لحماية البيانات الشخصية وفقاً للأنظمة المحلية والدولية',
    category: 'امتثال',
    department: 'الامتثال والحوكمة',
    impact: 'حرج',
    likelihood: 'مرتفع',
    riskLevel: 'حرج',
    riskScore: 25,
    inherentRisk: 25,
    residualRisk: 10,
    controls: [],
    owner: 'رانيا سعيد',
    status: 'تحت المراقبة',
    identifiedDate: '2024-03-20',
    lastReviewDate: '2024-12-01',
    nextReviewDate: '2025-03-01'
  },
  {
    id: 'risk-008',
    code: 'FA-001',
    title: 'عدم إجراء جرد دوري للأصول الثابتة',
    description: 'عدم وجود جرد سنوي للأصول الثابتة مما يؤدي لعدم دقة السجلات',
    category: 'مالية',
    department: 'الأصول الثابتة',
    impact: 'متوسط',
    likelihood: 'مرتفع',
    riskLevel: 'متوسط',
    riskScore: 12,
    inherentRisk: 15,
    residualRisk: 8,
    controls: [],
    owner: 'ليلى عبدالله',
    status: 'مفتوح',
    identifiedDate: '2024-04-10',
    lastReviewDate: '2024-10-10',
    nextReviewDate: '2025-04-10'
  }
];

// ==================== مصفوفة تقييم المخاطر ====================
export const RISK_MATRIX_CONFIG = {
  impact: {
    منخفض: 1,
    متوسط: 2,
    عالي: 3,
    حرج: 4
  },
  likelihood: {
    نادر: 1,
    محتمل: 2,
    متوسط: 3,
    مرتفع: 4,
    'شبه مؤكد': 5
  },
  levels: {
    منخفض: { min: 1, max: 5, color: '#10b981' },
    متوسط: { min: 6, max: 11, color: '#f59e0b' },
    عالي: { min: 12, max: 16, color: '#ef4444' },
    حرج: { min: 17, max: 20, color: '#7f1d1d' }
  }
};

// ==================== معايير التقييم ====================
export const AUDIT_RATING_CRITERIA = {
  ممتاز: {
    min: 90,
    max: 100,
    description: 'نظام رقابة داخلية قوي وفعال مع مخاطر منخفضة',
    color: '#10b981'
  },
  جيد: {
    min: 75,
    max: 89,
    description: 'نظام رقابة داخلية جيد مع بعض نقاط التحسين',
    color: '#3b82f6'
  },
  مقبول: {
    min: 60,
    max: 74,
    description: 'نظام رقابة داخلية يحتاج لتحسينات جوهرية',
    color: '#f59e0b'
  },
  ضعيف: {
    min: 0,
    max: 59,
    description: 'نظام رقابة داخلية ضعيف مع مخاطر عالية',
    color: '#ef4444'
  }
};

// ==================== برامج المراجعة النموذجية ====================
export const AUDIT_PROGRAMS: Partial<AuditProgram>[] = [
  {
    id: 'prog-001',
    cycle: 'المشتريات',
    objectives: [
      'التحقق من وجود فصل واضح للمهام في دورة المشتريات',
      'مراجعة آلية اختيار الموردين وتقييمهم',
      'التأكد من وجود أوامر شراء معتمدة لجميع المشتريات',
      'مراجعة دقة التسعير والكميات',
      'التحقق من استلام البضائع ومطابقتها مع أوامر الشراء'
    ],
    keyRisks: [
      'مشتريات غير معتمدة أو وهمية',
      'مواطأة مع الموردين',
      'تضخيم الأسعار',
      'استلام بضائع دون المواصفات',
      'فوترة مزدوجة'
    ],
    redFlags: [
      'فواتير بدون أوامر شراء معتمدة',
      'أوامر شراء مجزأة لتجنب حدود الصلاحيات',
      'موردين جدد بدون تقييم',
      'تجاوزات متكررة في الميزانية',
      'مشتريات من موردين من نفس العائلة'
    ]
  },
  {
    id: 'prog-002',
    cycle: 'المبيعات',
    objectives: [
      'التحقق من دقة تسجيل الإيرادات',
      'مراجعة آلية الائتمان والتحصيل',
      'التأكد من صحة الخصومات الممنوحة',
      'مراجعة الديون المشكوك في تحصيلها',
      'التحقق من دقة الفواتير والأسعار'
    ],
    keyRisks: [
      'تسجيل إيرادات وهمية',
      'منح خصومات غير معتمدة',
      'عدم المتابعة الفعالة للديون',
      'تلاعب في الأسعار',
      'إلغاء فواتير بدون موافقة'
    ]
  }
];

// ==================== قوائم المستندات المطلوبة ====================
export const REQUIRED_DOCUMENTS = {
  المشتريات: [
    'طلبات الشراء المعتمدة',
    'أوامر الشراء',
    'عقود الموردين',
    'فواتير الشراء',
    'محاضر الاستلام',
    'سجل تقييم الموردين'
  ],
  المبيعات: [
    'عروض الأسعار',
    'عقود البيع',
    'فواتير البيع',
    'سندات التسليم',
    'كشوفات الحسابات',
    'سياسة الائتمان'
  ],
  المخازن: [
    'محاضر الجرد',
    'بطاقات الصنف',
    'تقارير الحركة',
    'أذون الصرف',
    'أذون الاستلام',
    'تقارير العهدة'
  ]
};

// ==================== مؤشرات الأداء الرئيسية ====================
export const AUDIT_KPIS = [
  {
    id: 'kpi-001',
    name: 'معدل إنجاز خطة المراجعة السنوية',
    target: 95,
    formula: '(عدد المراجعات المنجزة / عدد المراجعات المخططة) × 100'
  },
  {
    id: 'kpi-002',
    name: 'نسبة النتائج الحرجة المغلقة',
    target: 90,
    formula: '(النتائج الحرجة المغلقة / إجمالي النتائج الحرجة) × 100'
  },
  {
    id: 'kpi-003',
    name: 'متوسط وقت إغلاق النتائج',
    target: 30,
    unit: 'يوم'
  },
  {
    id: 'kpi-004',
    name: 'نسبة تغطية المراجعة للمخاطر الحرجة',
    target: 100,
    formula: '(المخاطر الحرجة المغطاة / إجمالي المخاطر الحرجة) × 100'
  }
];

// ==================== معايير الامتثال ====================
export const COMPLIANCE_STANDARDS = [
  {
    id: 'std-001',
    name: 'معايير المراجعة الداخلية الدولية (IIA)',
    nameEn: 'International Standards for the Professional Practice of Internal Auditing',
    description: 'معايير معهد المدققين الداخليين الدولي'
  },
  {
    id: 'std-002',
    name: 'إطار COSO للرقابة الداخلية',
    nameEn: 'COSO Internal Control Framework',
    description: 'إطار عمل الرقابة الداخلية من لجنة المنظمات الراعية'
  },
  {
    id: 'std-003',
    name: 'معيار ISO 31000 لإدارة المخاطر',
    nameEn: 'ISO 31000 Risk Management',
    description: 'المعيار الدولي لإدارة المخاطر'
  },
  {
    id: 'std-004',
    name: 'معيار ISO 27001 لأمن المعلومات',
    nameEn: 'ISO 27001 Information Security',
    description: 'معيار إدارة أمن المعلومات'
  }
];
