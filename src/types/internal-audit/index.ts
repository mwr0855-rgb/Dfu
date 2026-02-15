// ============================================
// أنواع نظام المراجعة الداخلية الشامل
// Internal Audit Management System Types
// ============================================

/**
 * مستويات المخاطر
 */
export enum RiskLevel {
  LOW = 'منخفض',
  MEDIUM = 'متوسط',
  HIGH = 'مرتفع',
  CRITICAL = 'حرج'
}

/**
 * حالة المراجعة
 */
export enum AuditStatus {
  PLANNED = 'مخطط',
  IN_PROGRESS = 'قيد التنفيذ',
  UNDER_REVIEW = 'قيد المراجعة',
  COMPLETED = 'مكتمل',
  CANCELLED = 'ملغى'
}

/**
 * أولوية المراجعة
 */
export enum AuditPriority {
  LOW = 'منخفضة',
  MEDIUM = 'متوسطة',
  HIGH = 'عالية'
}

/**
 * أنواع الدورات
 */
export enum CycleType {
  PROCUREMENT = 'المشتريات',
  SALES = 'المبيعات',
  INVENTORY = 'المخازن',
  CASH_BANK = 'الخزينة والبنوك',
  PAYROLL = 'الأجور والمرتبات',
  FIXED_ASSETS = 'الأصول الثابتة',
  EXPENSES = 'المصروفات',
  IT_SYSTEMS = 'نظم المعلومات',
  COMPLIANCE_GOVERNANCE = 'الامتثال والحوكمة'
}

/**
 * أنواع المخاطر
 */
export enum RiskType {
  STRATEGIC = 'استراتيجية',
  OPERATIONAL = 'تشغيلية',
  FINANCIAL = 'مالية',
  COMPLIANCE = 'امتثال',
  REPUTATIONAL = 'سمعة',
  FRAUD = 'احتيال'
}

/**
 * حالة الملاحظة
 */
export enum ObservationStatus {
  OPEN = 'مفتوحة',
  IN_PROGRESS = 'قيد المعالجة',
  RESOLVED = 'محلولة',
  CLOSED = 'مغلقة',
  OVERDUE = 'متأخرة'
}

/**
 * خطورة الملاحظة
 */
export enum ObservationSeverity {
  LOW = 'منخفضة',
  MEDIUM = 'متوسطة',
  HIGH = 'عالية',
  CRITICAL = 'حرجة'
}

/**
 * واجهة المخاطرة
 */
export interface Risk {
  id: string;
  code: string;
  title: string;
  description: string;
  category: RiskType;
  cycle: CycleType;
  likelihood: number; // 1-5
  impact: number; // 1-5
  riskScore: number; // likelihood * impact
  riskLevel: RiskLevel;
  inherentRisk: number;
  residualRisk: number;
  controls: Control[];
  mitigationStrategies: string[];
  redFlags: string[];
  lastAssessed: Date;
  nextReviewDate: Date;
  owner: string;
}

/**
 * واجهة الضابط الرقابي
 */
export interface Control {
  id: string;
  code: string;
  title: string;
  description: string;
  type: 'وقائي' | 'كشفي' | 'تصحيحي';
  category: 'يدوي' | 'آلي' | 'نصف آلي';
  frequency: string;
  effectiveness: 'ضعيف' | 'متوسط' | 'قوي';
  testingProcedures: string[];
  evidenceRequired: string[];
  owner: string;
  implementationDate: Date;
  lastTested: Date;
  nextTestDate: Date;
}

/**
 * واجهة خطة المراجعة السنوية
 */
export interface AnnualAuditPlan {
  id: string;
  year: number;
  title: string;
  description: string;
  objectives: string[];
  scope: string;
  audits: AuditAssignment[];
  totalBudgetHours: number;
  riskBasedApproach: boolean;
  approvedBy: string;
  approvalDate: Date;
  lastModified: Date;
  status: 'مسودة' | 'معتمدة' | 'قيد التنفيذ' | 'مكتملة';
}

/**
 * واجهة مهمة المراجعة
 */
export interface AuditAssignment {
  id: string;
  code: string;
  title: string;
  cycle: CycleType;
  objectives: string[];
  scope: string;
  riskLevel: RiskLevel;
  priority: AuditPriority;
  status: AuditStatus;
  plannedStartDate: Date;
  plannedEndDate: Date;
  actualStartDate?: Date;
  actualEndDate?: Date;
  budgetHours: number;
  actualHours?: number;
  team: AuditorAssignment[];
  keyRisks: Risk[];
  auditProcedures: AuditProcedure[];
  observations: Observation[];
  reportId?: string;
  quarter: number;
}

/**
 * واجهة عضو فريق المراجعة
 */
export interface AuditorAssignment {
  auditorId: string;
  auditorName: string;
  role: 'قائد الفريق' | 'مراجع أول' | 'مراجع' | 'مراجع متدرب';
  allocatedHours: number;
  actualHours?: number;
}

/**
 * واجهة إجراء المراجعة
 */
export interface AuditProcedure {
  id: string;
  code: string;
  title: string;
  description: string;
  relatedRisks: string[]; // Risk IDs
  relatedControls: string[]; // Control IDs
  testingSteps: string[];
  requiredDocuments: string[];
  sampleSize: number;
  testingMethod: 'فحص' | 'مقابلة' | 'ملاحظة' | 'تحليل بيانات' | 'إعادة أداء';
  expectedEvidence: string[];
  completionStatus: 'لم يبدأ' | 'قيد التنفيذ' | 'مكتمل';
  assignedTo: string;
  completedBy?: string;
  completionDate?: Date;
  workpaperReference?: string;
}

/**
 * واجهة الملاحظة
 */
export interface Observation {
  id: string;
  code: string;
  auditId: string;
  title: string;
  description: string;
  condition: string; // ما تم العثور عليه
  criteria: string; // ما يجب أن يكون
  cause: string; // السبب الجذري
  effect: string; // التأثير المحتمل
  severity: ObservationSeverity;
  category: 'ضعف رقابي' | 'عدم امتثال' | 'احتيال محتمل' | 'فرصة تحسين';
  relatedRisks: string[];
  recommendations: Recommendation[];
  status: ObservationStatus;
  identifiedDate: Date;
  reportedDate: Date;
  targetResolutionDate: Date;
  actualResolutionDate?: Date;
  managementResponse?: ManagementResponse;
  followUpActions: FollowUpAction[];
}

/**
 * واجهة التوصية
 */
export interface Recommendation {
  id: string;
  description: string;
  priority: 'منخفضة' | 'متوسطة' | 'عالية' | 'حرجة';
  responsibleParty: string;
  targetImplementationDate: Date;
  estimatedCost?: number;
  expectedBenefit: string;
}

/**
 * واجهة استجابة الإدارة
 */
export interface ManagementResponse {
  responseDate: Date;
  respondent: string;
  position: string;
  agreed: boolean;
  comments: string;
  actionPlan: string;
  implementationDate: Date;
  resourcesRequired: string[];
}

/**
 * واجهة إجراء المتابعة
 */
export interface FollowUpAction {
  id: string;
  actionDate: Date;
  performedBy: string;
  status: 'مفتوح' | 'قيد التنفيذ' | 'مكتمل' | 'متأخر';
  findings: string;
  evidenceCollected: string[];
  percentComplete: number;
  nextFollowUpDate?: Date;
}

/**
 * واجهة تقرير المراجعة
 */
export interface AuditReport {
  id: string;
  auditId: string;
  reportNumber: string;
  reportDate: Date;
  reportType: 'نهائي' | 'مرحلي' | 'موجز تنفيذي';
  title: string;
  executiveSummary: ExecutiveSummary;
  background: string;
  objectives: string[];
  scope: string;
  methodology: string;
  findings: Observation[];
  overallConclusion: string;
  auditOpinion: 'مرضي' | 'مرضي مع ملاحظات' | 'غير مرضي' | 'سلبي';
  keyRisksIdentified: Risk[];
  recommendations: Recommendation[];
  acknowledgements: string;
  appendices: Appendix[];
  preparedBy: string;
  reviewedBy: string;
  approvedBy: string;
  distributionList: string[];
}

/**
 * واجهة الملخص التنفيذي
 */
export interface ExecutiveSummary {
  purpose: string;
  keyFindings: string[];
  majorObservations: number;
  criticalIssues: number;
  overallRating: 'ممتاز' | 'جيد' | 'مقبول' | 'ضعيف';
  managementAttentionRequired: string[];
}

/**
 * واجهة الملحق
 */
export interface Appendix {
  id: string;
  title: string;
  description: string;
  type: 'جدول' | 'مخطط' | 'مستند' | 'قائمة';
  content: any;
}

/**
 * واجهة مصفوفة المخاطر والضوابط
 */
export interface RiskControlMatrix {
  id: string;
  cycle: CycleType;
  process: string;
  subProcess: string;
  risks: Risk[];
  controls: Control[];
  controlGaps: ControlGap[];
  lastUpdated: Date;
  updatedBy: string;
}

/**
 * واجهة فجوة الضابط
 */
export interface ControlGap {
  id: string;
  riskId: string;
  description: string;
  severity: 'منخفضة' | 'متوسطة' | 'عالية' | 'حرجة';
  recommendedControl: string;
  priority: number;
  estimatedImplementationTime: string;
  status: 'محددة' | 'قيد المعالجة' | 'معالجة';
}

/**
 * واجهة مؤشرات الأداء الرئيسية للمراجعة
 */
export interface AuditKPI {
  id: string;
  name: string;
  description: string;
  category: 'كفاءة' | 'فعالية' | 'جودة' | 'أثر';
  targetValue: number;
  actualValue: number;
  unit: string;
  period: 'شهري' | 'ربع سنوي' | 'سنوي';
  trend: 'صاعد' | 'ثابت' | 'هابط';
  status: 'أخضر' | 'أصفر' | 'أحمر';
  lastCalculated: Date;
}

/**
 * واجهة نموذج التحليل المالي
 */
export interface FinancialAnalysis {
  id: string;
  companyName: string;
  analysisDate: Date;
  period: string;
  currency: string;
  financialStatements: FinancialStatements;
  ratios: FinancialRatios;
  horizontalAnalysis?: HorizontalAnalysis;
  verticalAnalysis?: VerticalAnalysis;
  trendAnalysis?: TrendAnalysis;
  redFlags: string[];
  strengths: string[];
  weaknesses: string[];
  overallScore: number;
  riskRating: 'منخفض' | 'متوسط' | 'مرتفع';
  goingConcern: 'سليم' | 'مخاوف' | 'غير مستمر';
  recommendations: string[];
}

/**
 * واجهة القوائم المالية
 */
export interface FinancialStatements {
  incomeStatement?: IncomeStatement;
  balanceSheet?: BalanceSheet;
  cashFlowStatement?: CashFlowStatement;
}

/**
 * واجهة قائمة الدخل
 */
export interface IncomeStatement {
  revenue: number;
  costOfGoodsSold: number;
  grossProfit: number;
  operatingExpenses: number;
  operatingProfit: number;
  interestExpense: number;
  taxExpense: number;
  netIncome: number;
}

/**
 * واجهة الميزانية العمومية
 */
export interface BalanceSheet {
  currentAssets: number;
  nonCurrentAssets: number;
  totalAssets: number;
  currentLiabilities: number;
  nonCurrentLiabilities: number;
  totalLiabilities: number;
  equity: number;
  cash: number;
  inventory: number;
  receivables: number;
  payables: number;
}

/**
 * واجهة قائمة التدفقات النقدية
 */
export interface CashFlowStatement {
  operatingCashFlow: number;
  investingCashFlow: number;
  financingCashFlow: number;
  netCashFlow: number;
  beginningCash: number;
  endingCash: number;
}

/**
 * واجهة النسب المالية
 */
export interface FinancialRatios {
  liquidity: LiquidityRatios;
  profitability: ProfitabilityRatios;
  activity: ActivityRatios;
  leverage: LeverageRatios;
  cashFlow: CashFlowRatios;
}

/**
 * نسب السيولة
 */
export interface LiquidityRatios {
  currentRatio: number;
  quickRatio: number;
  cashRatio: number;
}

/**
 * نسب الربحية
 */
export interface ProfitabilityRatios {
  grossProfitMargin: number;
  operatingProfitMargin: number;
  netProfitMargin: number;
  returnOnAssets: number;
  returnOnEquity: number;
}

/**
 * نسب النشاط
 */
export interface ActivityRatios {
  inventoryTurnover: number;
  receivablesTurnover: number;
  payablesTurnover: number;
  assetTurnover: number;
  daysInventoryOutstanding: number;
  daysSalesOutstanding: number;
  daysPayableOutstanding: number;
}

/**
 * نسب المديونية
 */
export interface LeverageRatios {
  debtToEquity: number;
  debtRatio: number;
  interestCoverage: number;
  equityMultiplier: number;
}

/**
 * نسب التدفقات النقدية
 */
export interface CashFlowRatios {
  operatingCashFlowRatio: number;
  freeCashFlow: number;
  cashConversionCycle: number;
}

/**
 * واجهة التحليل الأفقي
 */
export interface HorizontalAnalysis {
  revenueGrowth: number;
  profitGrowth: number;
  assetGrowth: number;
  equityGrowth: number;
}

/**
 * واجهة التحليل الرأسي
 */
export interface VerticalAnalysis {
  costOfGoodsSoldPercentage: number;
  operatingExpensesPercentage: number;
  netIncomePercentage: number;
}

/**
 * واجهة تحليل الاتجاهات
 */
export interface TrendAnalysis {
  period: string[];
  revenue: number[];
  profit: number[];
  assets: number[];
}

/**
 * واجهة نموذج ورقة العمل
 */
export interface Workpaper {
  id: string;
  auditId: string;
  procedureId: string;
  reference: string;
  preparedBy: string;
  reviewedBy: string;
  preparedDate: Date;
  reviewedDate?: Date;
  title: string;
  objective: string;
  scope: string;
  testingPerformed: string[];
  findings: string;
  conclusion: string;
  attachments: string[];
  reviewNotes?: string;
}

/**
 * واجهة برنامج التدقيق الشامل
 */
export interface ComprehensiveAuditProgram {
  id: string;
  cycle: CycleType;
  objectives: string[];
  materialRisks: Risk[];
  potentialWeaknesses: string[];
  auditProcedures: AuditProcedure[];
  requiredDocuments: string[];
  fraudIndicators: string[];
  riskControlMatrix: RiskControlMatrix;
  estimatedHours: number;
  skillsRequired: string[];
}
