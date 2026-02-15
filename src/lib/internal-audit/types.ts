/**
 * أنواع البيانات لنظام إدارة المراجعة الداخلية
 * Internal Audit Management System Types
 */

// ==================== أنواع المخاطر ====================
export type RiskLevel = 'منخفض' | 'متوسط' | 'عالي' | 'حرج';
export type RiskCategory = 
  | 'استراتيجية' 
  | 'تشغيلية' 
  | 'مالية' 
  | 'امتثال' 
  | 'تقنية' 
  | 'سمعة';

export type RiskImpact = 'منخفض' | 'متوسط' | 'عالي' | 'حرج';
export type RiskLikelihood = 'نادر' | 'محتمل' | 'متوسط' | 'مرتفع' | 'شبه مؤكد';

export interface Risk {
  id: string;
  code: string;
  title: string;
  description: string;
  category: RiskCategory;
  department: string;
  impact: RiskImpact;
  likelihood: RiskLikelihood;
  riskLevel: RiskLevel;
  riskScore: number; // 1-25
  inherentRisk: number;
  residualRisk: number;
  controls: Control[];
  owner: string;
  status: 'مفتوح' | 'تحت المراقبة' | 'مغلق';
  identifiedDate: string;
  lastReviewDate: string;
  nextReviewDate: string;
  mitigationPlan?: string;
  notes?: string;
}

// ==================== الضوابط ====================
export type ControlType = 'وقائية' | 'كاشفة' | 'تصحيحية';
export type ControlEffectiveness = 'ضعيف' | 'متوسط' | 'قوي' | 'ممتاز';

export interface Control {
  id: string;
  riskId: string;
  code: string;
  description: string;
  type: ControlType;
  frequency: string;
  owner: string;
  effectiveness: ControlEffectiveness;
  testingDate?: string;
  testingResult?: 'فعال' | 'غير فعال' | 'يحتاج تحسين';
  notes?: string;
}

// ==================== الإدارات ====================
export type DepartmentName = 
  | 'المشتريات'
  | 'المبيعات'
  | 'المخازن'
  | 'الخزينة والبنوك'
  | 'الأجور والمرتبات'
  | 'الأصول الثابتة'
  | 'المصروفات'
  | 'نظم المعلومات'
  | 'الامتثال والحوكمة'
  | 'الموارد البشرية'
  | 'المالية'
  | 'العمليات'
  | 'التسويق';

export interface Department {
  id: string;
  name: DepartmentName;
  nameEn: string;
  manager: string;
  riskCount: number;
  lastAuditDate?: string;
  nextAuditDate?: string;
  auditFrequency: 'شهري' | 'ربع سنوي' | 'نصف سنوي' | 'سنوي';
  priority: 'عالية' | 'متوسطة' | 'منخفضة';
}

// ==================== خطط المراجعة ====================
export type AuditType = 'مالية' | 'تشغيلية' | 'امتثال' | 'تقنية' | 'أداء';
export type AuditStatus = 'مجدولة' | 'جارية' | 'مكتملة' | 'ملغاة' | 'مؤجلة';
export type AuditPriority = 'عالية' | 'متوسطة' | 'منخفضة';

export interface AuditPlan {
  id: string;
  code: string;
  title: string;
  department: DepartmentName;
  type: AuditType;
  priority: AuditPriority;
  status: AuditStatus;
  scheduledStartDate: string;
  scheduledEndDate: string;
  actualStartDate?: string;
  actualEndDate?: string;
  leadAuditor: string;
  teamMembers: string[];
  objectives: string[];
  scope: string;
  risksToAddress: string[];
  estimatedHours: number;
  actualHours?: number;
  budget?: number;
  actualCost?: number;
  findings?: Finding[];
  report?: AuditReport;
  createdDate: string;
  createdBy: string;
  lastModified: string;
  notes?: string;
}

// ==================== نتائج المراجعة ====================
export type FindingSeverity = 'حرج' | 'عالي' | 'متوسط' | 'منخفض' | 'ملاحظة';
export type FindingStatus = 'مفتوح' | 'قيد المعالجة' | 'مغلق' | 'متأخر';

export interface Finding {
  id: string;
  auditPlanId: string;
  code: string;
  title: string;
  description: string;
  severity: FindingSeverity;
  status: FindingStatus;
  category: string;
  relatedRisk?: string;
  affectedProcess: string;
  identifiedDate: string;
  dueDate: string;
  responsible: string;
  recommendation: string;
  managementResponse?: string;
  actionPlan?: string;
  completionDate?: string;
  verificationDate?: string;
  verifiedBy?: string;
  evidence?: string[];
  impact: string;
  rootCause?: string;
  notes?: string;
}

// ==================== تقارير المراجعة ====================
export type ReportType = 'مبدئي' | 'نهائي' | 'متابعة' | 'ربع سنوي' | 'سنوي';

export interface AuditReport {
  id: string;
  auditPlanId: string;
  type: ReportType;
  title: string;
  executiveSummary: string;
  objectives: string[];
  scope: string;
  methodology: string;
  period: {
    from: string;
    to: string;
  };
  auditTeam: {
    lead: string;
    members: string[];
  };
  findings: Finding[];
  overallRating: 'ممتاز' | 'جيد' | 'مقبول' | 'ضعيف';
  keyRisks: string[];
  recommendations: string[];
  managementComments?: string;
  actionPlan?: ActionItem[];
  issueDate: string;
  approvedBy?: string;
  approvalDate?: string;
  distributionList: string[];
  attachments?: string[];
}

// ==================== خطة العمل ====================
export interface ActionItem {
  id: string;
  findingId: string;
  action: string;
  responsible: string;
  dueDate: string;
  status: 'لم يبدأ' | 'قيد التنفيذ' | 'مكتمل' | 'متأخر';
  completionPercentage: number;
  evidence?: string;
  notes?: string;
}

// ==================== برامج المراجعة ====================
export interface AuditProgram {
  id: string;
  cycle: string; // مثال: المشتريات، المبيعات
  objectives: string[];
  keyRisks: string[];
  procedures: AuditProcedure[];
  requiredDocuments: string[];
  redFlags: string[];
  estimatedDuration: number;
  createdBy: string;
  createdDate: string;
  lastUpdated: string;
  version: string;
}

export interface AuditProcedure {
  id: string;
  step: number;
  description: string;
  riskAddressed: string;
  testingMethod: string;
  sampleSize?: string;
  expectedEvidence: string;
  acceptanceCriteria: string;
  notes?: string;
}

// ==================== التحليل المالي ====================
export interface FinancialAnalysis {
  id: string;
  companyName: string;
  period: {
    from: string;
    to: string;
  };
  incomeStatement?: IncomeStatement;
  balanceSheet?: BalanceSheet;
  cashFlowStatement?: CashFlowStatement;
  ratios: FinancialRatios;
  analysis: {
    horizontalAnalysis?: any;
    verticalAnalysis?: any;
    trendAnalysis?: any;
  };
  strengths: string[];
  weaknesses: string[];
  redFlags: string[];
  recommendations: string[];
  overallScore: number; // 0-100
  riskRating: 'منخفض' | 'متوسط' | 'مرتفع';
  generatedDate: string;
  generatedBy: string;
}

export interface IncomeStatement {
  revenue: number;
  costOfRevenue: number;
  grossProfit: number;
  operatingExpenses: number;
  operatingIncome: number;
  netIncome: number;
  ebitda?: number;
}

export interface BalanceSheet {
  totalAssets: number;
  currentAssets: number;
  nonCurrentAssets: number;
  totalLiabilities: number;
  currentLiabilities: number;
  nonCurrentLiabilities: number;
  equity: number;
}

export interface CashFlowStatement {
  operatingCashFlow: number;
  investingCashFlow: number;
  financingCashFlow: number;
  netCashFlow: number;
  freeCashFlow?: number;
}

export interface FinancialRatios {
  liquidity: {
    currentRatio: number;
    quickRatio: number;
    cashRatio: number;
  };
  profitability: {
    grossProfitMargin: number;
    operatingProfitMargin: number;
    netProfitMargin: number;
    roa: number;
    roe: number;
  };
  activity: {
    inventoryTurnover: number;
    receivablesTurnover: number;
    payablesTurnover: number;
    assetTurnover: number;
  };
  leverage: {
    debtToEquity: number;
    debtRatio: number;
    interestCoverage: number;
  };
  cashFlow: {
    operatingCashFlowRatio: number;
    freeCashFlow: number;
    cashConversionCycle: number;
  };
}

// ==================== لوحة المعلومات ====================
export interface DashboardMetrics {
  totalRisks: number;
  highRisks: number;
  criticalRisks: number;
  totalAudits: number;
  completedAudits: number;
  ongoingAudits: number;
  scheduledAudits: number;
  overdueActions: number;
  openFindings: number;
  criticalFindings: number;
  auditCoverage: number; // percentage
  avgCompletionTime: number; // days
  budgetUtilization: number; // percentage
}

export interface TrendData {
  period: string;
  value: number;
}

// ==================== المستخدمون ====================
export type UserRole = 
  | 'مدير المراجعة' 
  | 'مراجع أول' 
  | 'مراجع' 
  | 'مدقق متدرب'
  | 'إدارة عليا'
  | 'مدير إدارة';

export interface AuditUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  certifications?: string[];
  activeAudits: number;
  completedAudits: number;
  performance: number; // 0-100
}

// ==================== الإعدادات ====================
export interface AuditSettings {
  fiscalYearStart: string;
  fiscalYearEnd: string;
  riskThresholds: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  auditFrequencies: {
    [key: string]: string;
  };
  approvalWorkflow: boolean;
  notifications: {
    email: boolean;
    inApp: boolean;
    sms: boolean;
  };
  reportTemplates: {
    [key: string]: string;
  };
  complianceStandards: string[];
}
